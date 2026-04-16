import { NextResponse } from "next/server"
import { extractJsonObjectFromText, hasGuidedFlowBlock } from "../../lib/guided-flow"
import {
  allSystemWorkerLabels,
  customWorkers,
  defaultWorker,
  workerOrchestratorGuide,
} from "../../lib/workers"

type ModelMessage = {
  role: "assistant" | "user"
  content: string
}

type LibraryEntry = {
  term: string
  instruction: string
}

type ChatRequest = {
  worker?: string
  messages?: ModelMessage[]
  libraryEntries?: LibraryEntry[]
  allowClarifyingAssumptions?: boolean
  previousWorkers?: string[]
  installedConnectors?: string[]
}

type ConnectorToolDef = {
  type: "function"
  name: string
  description: string
  parameters: {
    type: "object"
    properties: Record<string, { type: string; description: string }>
    required: string[]
  }
}

const connectorToolDefinitions: Record<string, ConnectorToolDef[]> = {
  slack: [
    {
      type: "function",
      name: "slack_send_message",
      description: "Send a message to a Slack channel or user",
      parameters: {
        type: "object",
        properties: {
          recipient: { type: "string", description: "Channel name or username to send to" },
          message: { type: "string", description: "The message content to send" },
        },
        required: ["recipient", "message"],
      },
    },
  ],
}

const getToolsForConnectors = (connectorIds: string[]): ConnectorToolDef[] =>
  connectorIds.flatMap((id) => connectorToolDefinitions[id] ?? [])

type SaveSuggestion = {
  term: string
  instruction: string
  reason?: string
}

type AssistantTurnResponse = {
  mode: "clarify" | "answer"
  message: string
  saveSuggestion: SaveSuggestion | null
}

type OpenAIContentPart = {
  text?: string
  type?: string
}

type ResponsesAPIOutput = {
  type: "reasoning" | "message"
  content?: OpenAIContentPart[]
  role?: string
  summary?: Array<{ type: string; text: string }>
}

type ResponsesAPIPayload = {
  output?: ResponsesAPIOutput[]
  error?: {
    code?: string | number | null
    message?: string
    type?: string | null
  }
  status?: string
  output_text?: string
}

type OpenAIResponsePayload = {
  choices?: Array<{
    message?: {
      content?: string | OpenAIContentPart[] | null
    }
  }>
  error?: {
    code?: string | number | null
    message?: string
    metadata?: {
      raw?: string
      provider_name?: string
      is_byok?: boolean
    }
    param?: string | null
    type?: string | null
  }
}

const fallbackAssistantMessage = "I hit an issue generating a response. Please try again."
const defaultOpenAIModel = "o4-mini"
const defaultOpenAIFallbackModels = ["gpt-4.1-mini", "gpt-4o-mini"]

const isReasoningModel = (model: string) =>
  /^o\d/i.test(model)
const maxOpenAIModels = 3
const enableQualityRetry = process.env.OPENAI_ENABLE_QUALITY_RETRY === "true"
const guidedFlowSubmissionPrefix = "Here are my selections:"
const semanticQuestionRegex =
  /\b(mean|means|stand for|refers to|what is|what does|when you say|do you mean|interpret)\b/i
const transactionalKeywordRegex =
  /\b(last|previous|next|quarter|month|week|day|date|range|window|ytd|year[- ]to[- ]date|season|daily|weekly|monthly|time period|cadence)\b/i
const affirmativeRegex = /^(yes|yep|yeah|correct|right|exactly|that is right|that's right)\b/i

const getOpenAIText = (payload: OpenAIResponsePayload) => {
  const content = payload.choices?.[0]?.message?.content
  if (typeof content === "string") {
    return content.trim()
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => part.text?.trim() ?? "")
      .filter(Boolean)
      .join("\n")
      .trim()
  }

  return ""
}

const getResponsesAPIText = (payload: ResponsesAPIPayload) => {
  if (payload.output_text) {
    return payload.output_text.trim()
  }

  if (!payload.output) return ""

  for (const item of payload.output) {
    if (item.type === "message" && item.content) {
      const text = item.content
        .filter((part) => part.type === "output_text")
        .map((part) => part.text?.trim() ?? "")
        .filter(Boolean)
        .join("\n")
        .trim()
      if (text) return text
    }
  }

  return ""
}

const getOpenAIErrorText = (rawText: string) => {
  const trimmed = rawText.trim()
  if (!trimmed) {
    return ""
  }

  try {
    const parsed = JSON.parse(trimmed) as OpenAIResponsePayload
    const message = parsed.error?.message?.trim()
    if (!message) {
      return trimmed
    }

    return message
  } catch {
    // Fallback to raw response text when the response is not JSON.
  }

  return trimmed
}

const normalizeOpenAIModel = (rawModel: string | undefined) => {
  const normalized = rawModel?.trim() ?? ""
  if (!normalized) {
    return defaultOpenAIModel
  }

  const withoutAutoPrefix = normalized.toLowerCase().startsWith("openrouter/auto")
    ? normalized.slice("openrouter/auto".length).trim()
    : normalized

  const withoutOpenAIProviderPrefix = withoutAutoPrefix.replace(/^openai\//i, "").trim()
  return withoutOpenAIProviderPrefix || defaultOpenAIModel
}

const parseOpenAIModelList = (rawModels: string | undefined) =>
  (rawModels ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean)

const dedupeOpenAIModels = (models: string[]) => Array.from(new Set(models)).slice(0, maxOpenAIModels)

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const isRetryableOpenAIFailure = (message: string) => {
  const normalized = message.toLowerCase()
  return (
    normalized.includes("openai request failed (429)") ||
    normalized.includes("openai request failed (500)") ||
    normalized.includes("openai request failed (502)") ||
    normalized.includes("openai request failed (503)") ||
    normalized.includes("openai request failed (504)") ||
    normalized.includes("rate limit") ||
    normalized.includes("too many requests") ||
    normalized.includes("temporarily unavailable") ||
    normalized.includes("overloaded") ||
    normalized.includes("server_error")
  )
}

const isFallbackEligibleOpenAIFailure = (message: string) => {
  const normalized = message.toLowerCase()
  return (
    isRetryableOpenAIFailure(message) ||
    normalized.includes("model not found") ||
    normalized.includes("no such model") ||
    normalized.includes("does not exist") ||
    normalized.includes("unsupported model") ||
    normalized.includes("invalid model")
  )
}

const normalizeLibraryEntries = (entries: ChatRequest["libraryEntries"]) => {
  if (!entries) {
    return []
  }

  return entries
    .filter((entry) => entry.term?.trim() && entry.instruction?.trim())
    .map((entry) => ({
      instruction: entry.instruction.trim(),
      term: entry.term.trim(),
    }))
}

const normalizeForCompare = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const isLikelyQuestion = (text: string) => {
  const normalized = text.trim()
  if (!normalized) {
    return false
  }

  return (
    normalized.includes("?") ||
    /^(what|which|when|where|who|how|can you|could you|would you|do you|is it|please specify|please provide)/i.test(
      normalized
    )
  )
}

const getLatestUserMessage = (messages: ModelMessage[]) => {
  const latest = messages[messages.length - 1]
  if (!latest || latest.role !== "user") {
    return null
  }

  return latest
}

const getMessageBeforeLatestUser = (messages: ModelMessage[]) => {
  if (messages.length < 2) {
    return null
  }

  return messages[messages.length - 2]
}

const isGuidedFlowSubmissionMessage = (content: string) =>
  content.trimStart().startsWith(guidedFlowSubmissionPrefix)

const shouldForceAnswerAfterClarification = (messages: ModelMessage[]) => {
  const latestUser = getLatestUserMessage(messages)
  const previousMessage = getMessageBeforeLatestUser(messages)

  if (previousMessage?.role === "assistant" && hasGuidedFlowBlock(previousMessage.content)) {
    return false
  }

  return Boolean(
    latestUser &&
      previousMessage?.role === "assistant" &&
      isLikelyQuestion(previousMessage.content)
  )
}

const isFollowUpToGuidedFlowSubmission = (messages: ModelMessage[]) => {
  const latestUser = getLatestUserMessage(messages)
  const previousMessage = getMessageBeforeLatestUser(messages)

  return Boolean(
    latestUser &&
      isGuidedFlowSubmissionMessage(latestUser.content) &&
      previousMessage?.role === "assistant" &&
      hasGuidedFlowBlock(previousMessage.content)
  )
}

const shouldRetryAsGuidedFlowFollowUp = (
  response: AssistantTurnResponse,
  messages: ModelMessage[]
) =>
  isFollowUpToGuidedFlowSubmission(messages) &&
  !hasGuidedFlowBlock(response.message) &&
  (response.mode === "clarify" || isLikelyQuestion(response.message))

const hasRequiredAnswerSections = (answer: string) => {
  const normalized = answer.toLowerCase()
  return ["summary", "key findings", "recommended actions"].every((section) =>
    normalized.includes(section)
  )
}

const isWeakAnswer = (answer: string, messages: ModelMessage[]) => {
  const normalizedAnswer = normalizeForCompare(answer)
  if (!normalizedAnswer) {
    return true
  }

  const latestUser = normalizeForCompare(getLatestUserMessage(messages)?.content ?? "")
  if (
    latestUser &&
    (normalizedAnswer === latestUser ||
      normalizedAnswer.includes(latestUser) ||
      latestUser.includes(normalizedAnswer))
  ) {
    return true
  }

  const wordCount = normalizedAnswer.split(" ").filter(Boolean).length
  const hasReportStructure = /\b(summary|overview|findings|analysis|recommend|next steps|actions)\b/i.test(
    answer
  )

  if (wordCount < 12) {
    return true
  }

  if (!hasReportStructure && wordCount < 24) {
    return true
  }

  return false
}

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim()

const stripWrapperQuotes = (value: string) =>
  value.replace(/^[\s"'`]+|[\s"'`]+$/g, "").trim()

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const normalizeSuggestionTerm = (rawTerm: string) => {
  const cleaned = collapseWhitespace(stripWrapperQuotes(rawTerm))
  if (!cleaned) {
    return ""
  }

  if (cleaned.length > 32) {
    return ""
  }

  if (/[.?!,:;]/.test(cleaned)) {
    return ""
  }

  const wordCount = cleaned.split(" ").filter(Boolean).length
  if (wordCount > 4) {
    return ""
  }

  if (/^(yes|no|correct|right|exactly)$/i.test(cleaned)) {
    return ""
  }

  return cleaned
}

const parseInstructionMapping = (instruction: string) => {
  const normalized = collapseWhitespace(instruction)
  const patterns = [
    /\binterpret\s+["'`]?([^"'`]{1,40})["'`]?\s+as\s+["'`]?([^"'`]{1,120})["'`]?/i,
    /\btreat\s+["'`]?([^"'`]{1,40})["'`]?\s+as\s+["'`]?([^"'`]{1,120})["'`]?/i,
    /\bmap\s+["'`]?([^"'`]{1,40})["'`]?\s+to\s+["'`]?([^"'`]{1,120})["'`]?/i,
    /["'`]?([^"'`]{1,40})["'`]?\s+(?:means|refers to|stands for)\s+["'`]?([^"'`]{1,120})["'`]?/i,
  ]

  for (const pattern of patterns) {
    const match = normalized.match(pattern)
    if (!match) {
      continue
    }

    const [, rawTerm, rawMeaning] = match
    return {
      meaning: collapseWhitespace(stripWrapperQuotes(rawMeaning)),
      term: collapseWhitespace(stripWrapperQuotes(rawTerm)),
    }
  }

  return null
}

const normalizeSuggestionMeaning = (rawMeaning: string, term: string) => {
  if (!rawMeaning) {
    return ""
  }

  let cleaned = collapseWhitespace(stripWrapperQuotes(rawMeaning))
  if (!cleaned) {
    return ""
  }

  if (term) {
    const escapedTerm = escapeRegExp(term)
    cleaned = cleaned.replace(
      new RegExp(`^["'\`]?${escapedTerm}["'\`]?\\s*(?:means|refers to|stands for|:|=)\\s*`, "i"),
      ""
    )
  }

  cleaned = cleaned
    .replace(/^interpret\s+["'`]?[^"'`]{1,40}["'`]?\s+as\s+/i, "")
    .replace(/^treat\s+["'`]?[^"'`]{1,40}["'`]?\s+as\s+/i, "")
    .replace(/^map\s+["'`]?[^"'`]{1,40}["'`]?\s+to\s+/i, "")
    .replace(/^(it|this|that)\s+(means|refers to|stands for|is)\s+/i, "")
    .replace(/^use\s+/i, "")
    .replace(/^you should interpret (it|this|that) as\s+/i, "")
    .replace(/^it should be treated as\s+/i, "")

  cleaned = collapseWhitespace(stripWrapperQuotes(cleaned))
  if (!cleaned) {
    return ""
  }

  const quotedValues = Array.from(cleaned.matchAll(/"([^"]+)"|'([^']+)'|`([^`]+)`/g))
    .map((match) => match[1] ?? match[2] ?? match[3] ?? "")
    .map((value) => collapseWhitespace(stripWrapperQuotes(value)))
    .filter(Boolean)
  const preferredQuotedValue = quotedValues.find(
    (value) => normalizeForCompare(value) !== normalizeForCompare(term)
  )
  if (preferredQuotedValue) {
    cleaned = preferredQuotedValue
  }

  cleaned = cleaned.split(/\n/)[0]?.trim() ?? cleaned
  cleaned = cleaned.split(/[.?!]\s+/)[0]?.trim() ?? cleaned
  cleaned = cleaned
    .replace(/\s+(?:and|but)\s+not\s+.*$/i, "")
    .replace(/\s+in\s+(?:all\s+)?future\s+.*$/i, "")
    .replace(/\s+for\s+(?:all\s+)?future\s+.*$/i, "")
    .replace(/\s+(?:in|within|for)\s+(?:our|the)\s+(?:support|ops|operations|context)\b.*$/i, "")
  cleaned = collapseWhitespace(stripWrapperQuotes(cleaned))

  const wordsBeforeLimit = cleaned.split(" ").filter(Boolean)
  if (wordsBeforeLimit.length > 6 && /\band\b/i.test(cleaned)) {
    cleaned = cleaned.split(/\band\b/i)[0]?.trim() ?? cleaned
  }

  const words = cleaned.split(" ").filter(Boolean)
  if (words.length > 12) {
    cleaned = words.slice(0, 12).join(" ")
  }

  if (!cleaned || cleaned.length > 96) {
    return ""
  }

  return cleaned
}

const getConversationCandidateTerm = (messages: ModelMessage[]) => {
  const latestUserMessage = getLatestUserMessage(messages)?.content ?? ""
  const quotedToken = latestUserMessage.match(/["'`]([A-Za-z][A-Za-z0-9_\- ]{0,31})["'`]/)?.[1]
  if (quotedToken) {
    return quotedToken
  }

  const latestAcronym = latestUserMessage.match(/\b[A-Z][A-Z0-9]{1,9}\b/g)?.[0]
  if (latestAcronym) {
    return latestAcronym
  }

  let assistantQuestion = ""
  let previousUserMessage = ""

  for (let index = messages.length - 2; index >= 0; index -= 1) {
    const message = messages[index]
    if (!assistantQuestion && message.role === "assistant") {
      assistantQuestion = message.content.trim()
      continue
    }

    if (assistantQuestion && message.role === "user") {
      previousUserMessage = message.content.trim()
      break
    }
  }

  return getCandidateTerm(assistantQuestion, previousUserMessage)
}

const buildNormalizedSuggestion = ({
  rawTerm,
  rawMeaning,
  rawReason,
  messages,
  libraryEntries,
}: {
  rawTerm: string
  rawMeaning: string
  rawReason?: string
  messages: ModelMessage[]
  libraryEntries: LibraryEntry[]
}): SaveSuggestion | null => {
  const termFromInput = normalizeSuggestionTerm(rawTerm)
  const termFromConversation = normalizeSuggestionTerm(getConversationCandidateTerm(messages))
  const term = termFromInput || termFromConversation

  if (!term || transactionalKeywordRegex.test(term)) {
    return null
  }

  const meaning = normalizeSuggestionMeaning(rawMeaning, term)
  if (!meaning || transactionalKeywordRegex.test(meaning)) {
    return null
  }

  if (normalizeForCompare(meaning) === normalizeForCompare(term)) {
    return null
  }

  const suggestion: SaveSuggestion = {
    instruction: `Interpret "${term}" as "${meaning}".`,
    reason: rawReason ? collapseWhitespace(stripWrapperQuotes(rawReason)) : `You clarified what "${term}" means.`,
    term,
  }

  const alreadyInLibrary = libraryEntries.some(
    (entry) =>
      entry.term.toLowerCase() === suggestion.term.toLowerCase() &&
      entry.instruction.toLowerCase() === suggestion.instruction.toLowerCase()
  )

  return alreadyInLibrary ? null : suggestion
}

const normalizeSaveSuggestion = (
  rawSuggestion: unknown,
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[]
): SaveSuggestion | null => {
  if (!rawSuggestion || typeof rawSuggestion !== "object") {
    return null
  }

  const suggestion = rawSuggestion as Record<string, unknown>
  const rawTerm = typeof suggestion.term === "string" ? suggestion.term : ""
  const rawInstruction =
    typeof suggestion.instruction === "string" ? suggestion.instruction : ""
  const rawReason = typeof suggestion.reason === "string" ? suggestion.reason : ""

  if (!rawTerm && !rawInstruction) {
    return null
  }

  const parsedMapping = parseInstructionMapping(rawInstruction)
  const candidateTerm = rawTerm || parsedMapping?.term || ""
  const candidateMeaning = parsedMapping?.meaning || rawInstruction

  return buildNormalizedSuggestion({
    libraryEntries,
    messages,
    rawMeaning: candidateMeaning,
    rawReason,
    rawTerm: candidateTerm,
  })
}

const getCandidateTerm = (question: string, previousUserMessage: string) => {
  const quotedToken = question.match(/["']([A-Za-z][A-Za-z0-9_-]{1,24})["']/)?.[1]
  if (quotedToken && quotedToken.length <= 24) {
    return quotedToken
  }

  const abbreviationInQuestion = question.match(/\b[A-Z][A-Z0-9]{1,9}\b/g)?.[0]
  if (abbreviationInQuestion) {
    return abbreviationInQuestion
  }

  const abbreviationInUserMessage = previousUserMessage.match(/\b[A-Z][A-Z0-9]{1,9}\b/g)?.[0]
  if (abbreviationInUserMessage) {
    return abbreviationInUserMessage
  }

  return ""
}

const getMeaningFromQuestion = (question: string) => {
  const doYouMeanMatch = question.match(/\bdo you mean\s+(.+?)(?:\?|$)/i)?.[1]
  if (doYouMeanMatch) {
    return doYouMeanMatch.trim()
  }

  const interpretAsMatch = question.match(/\binterpret(?:\s+it)?\s+as\s+(.+?)(?:\?|$)/i)?.[1]
  if (interpretAsMatch) {
    return interpretAsMatch.replace(/\s+or\s+something\s+else$/i, "").trim()
  }

  const meanMatch = question.match(/\b(?:means?|refers to|stands for)\s+(.+?)(?:\?|$)/i)?.[1]
  if (meanMatch) {
    return meanMatch.trim()
  }

  return ""
}

const buildFallbackSaveSuggestion = (
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[]
): SaveSuggestion | null => {
  const latestMessage = messages[messages.length - 1]
  if (!latestMessage || latestMessage.role !== "user") {
    return null
  }

  const userAnswer = latestMessage.content.trim()
  if (!userAnswer) {
    return null
  }

  let assistantQuestion = ""
  let previousUserMessage = ""
  for (let index = messages.length - 2; index >= 0; index -= 1) {
    const message = messages[index]
    if (!assistantQuestion && message.role === "assistant") {
      assistantQuestion = message.content.trim()
      continue
    }

    if (assistantQuestion && message.role === "user") {
      previousUserMessage = message.content.trim()
      break
    }
  }

  if (!assistantQuestion || !semanticQuestionRegex.test(assistantQuestion)) {
    return null
  }

  const term = getCandidateTerm(assistantQuestion, previousUserMessage)
  if (!term || transactionalKeywordRegex.test(term)) {
    return null
  }

  const explicitMeaning = affirmativeRegex.test(userAnswer)
    ? getMeaningFromQuestion(assistantQuestion)
    : userAnswer

  const meaning = explicitMeaning.trim()
  if (!meaning || transactionalKeywordRegex.test(meaning)) {
    return null
  }

  return buildNormalizedSuggestion({
    libraryEntries,
    messages,
    rawMeaning: meaning,
    rawReason: `You clarified what "${term}" means.`,
    rawTerm: term,
  })
}

const withFallbackSaveSuggestion = (
  response: AssistantTurnResponse,
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[]
) => {
  if (response.mode !== "answer" || response.saveSuggestion) {
    return response
  }

  return {
    ...response,
    saveSuggestion: buildFallbackSaveSuggestion(messages, libraryEntries),
  }
}

const parseAssistantTurn = (
  rawText: string,
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[]
): AssistantTurnResponse => {
  const cleanedText = rawText.replace(/```json|```/gi, "").trim()
  const extractedJson = extractJsonObjectFromText(cleanedText)

  if (!extractedJson) {
    return withFallbackSaveSuggestion(
      {
        message: cleanedText || fallbackAssistantMessage,
        mode: "answer",
        saveSuggestion: null,
      },
      messages,
      libraryEntries
    )
  }

  let parsed: Record<string, unknown> | null = null
  try {
    parsed = JSON.parse(extractedJson.jsonText) as Record<string, unknown>
  } catch {
    parsed = null
  }

  if (!parsed) {
    return withFallbackSaveSuggestion(
      {
        message: cleanedText || fallbackAssistantMessage,
        mode: "answer",
        saveSuggestion: null,
      },
      messages,
      libraryEntries
    )
  }

  const mode = parsed.mode === "clarify" ? "clarify" : "answer"
  const trailingText = cleanedText.slice(extractedJson.endIndex).trim()
  const message =
    typeof parsed.message === "string" && parsed.message.trim()
      ? [parsed.message.trim(), trailingText].filter(Boolean).join("\n\n")
      : trailingText || cleanedText || fallbackAssistantMessage

  return withFallbackSaveSuggestion(
    {
      message,
      mode,
      saveSuggestion:
        mode === "answer"
          ? normalizeSaveSuggestion(
              parsed.saveSuggestion ?? parsed.librarySuggestion,
              messages,
              libraryEntries
            )
          : null,
    },
    messages,
    libraryEntries
  )
}

const toAssistantErrorTurn = (message: string): AssistantTurnResponse => ({
  mode: "answer",
  message,
  saveSuggestion: null,
})

const getAssistantErrorMessage = ({
  error,
  model,
}: {
  error: unknown
  model: string
}) => {
  const rawMessage = error instanceof Error ? error.message : ""
  const normalized = rawMessage.toLowerCase()

  if (!rawMessage) {
    return "I couldn't generate a response due to an unknown service error. Please try again."
  }

  if (normalized.includes("missing openai_api_key")) {
    return "I couldn't generate a response because OPENAI_API_KEY is missing on the server."
  }

  if (
    normalized.includes("insufficient_quota") ||
    normalized.includes("insufficient credits") ||
    normalized.includes("billing") ||
    normalized.includes("quota") ||
    normalized.includes("402")
  ) {
    return "I couldn't generate a response because the OpenAI account has insufficient quota or billing access."
  }

  if (
    normalized.includes("429") ||
    normalized.includes("rate limit") ||
    normalized.includes("too many requests")
  ) {
    return "I couldn't generate a response because the OpenAI rate limit was exceeded. Please try again shortly."
  }

  if (
    normalized.includes("401") ||
    normalized.includes("unauthorized") ||
    normalized.includes("invalid api key")
  ) {
    return "I couldn't generate a response because the OpenAI API key is invalid or lacks permission."
  }

  if (
    (normalized.includes("404") && normalized.includes("openai request failed")) ||
    normalized.includes("model not found") ||
    normalized.includes("no such model")
  ) {
    return `I couldn't generate a response because the configured model "${model}" is unavailable.`
  }

  if (normalized.includes("failed to parse openai response")) {
    return "I couldn't generate a response because the OpenAI response could not be parsed."
  }

  if (normalized.includes("openai returned an empty response")) {
    return "I couldn't generate a response because OpenAI returned an empty result."
  }

  return `I couldn't generate a response because the AI service failed: ${rawMessage}`
}

const getUnmappedAcronym = (message: string, libraryEntries: LibraryEntry[]) => {
  const acronyms = message.match(/\b[A-Z][A-Z0-9]{1,9}\b/g) ?? []
  if (acronyms.length === 0) {
    return null
  }

  const mappedTerms = new Set(libraryEntries.map((entry) => entry.term.toLowerCase()))

  for (const acronym of acronyms) {
    if (transactionalKeywordRegex.test(acronym)) {
      continue
    }

    if (mappedTerms.has(acronym.toLowerCase())) {
      continue
    }

    return acronym
  }

  return null
}

const buildDeterministicTermClarification = (
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[]
): AssistantTurnResponse | null => {
  const latestUser = getLatestUserMessage(messages)
  if (!latestUser) {
    return null
  }

  const previousMessage = getMessageBeforeLatestUser(messages)
  if (
    previousMessage?.role === "assistant" &&
    (isLikelyQuestion(previousMessage.content) || hasGuidedFlowBlock(previousMessage.content))
  ) {
    return null
  }

  const acronym = getUnmappedAcronym(latestUser.content, libraryEntries)
  if (!acronym) {
    return null
  }

  return {
    mode: "clarify",
    message: `Could you clarify what "${acronym}" means in this context?`,
    saveSuggestion: null,
  }
}

const getSystemPrompt = (
  worker: string,
  libraryEntries: LibraryEntry[],
  allowClarifyingAssumptions: boolean,
  connectorIds: string[] = []
) => {
  const savedEntriesText =
    libraryEntries.length > 0
      ? libraryEntries
          .map((entry, index) => `${index + 1}. ${entry.term}: ${entry.instruction}`)
          .join("\n")
      : "No saved dictionary entries."

  return [
    `You are ${worker}, an AI worker inside Level AI, a contact center intelligence platform.`,
    "Give practical answers focused on analyzing customer conversations for support operations.",
    "Your data source is customer conversations between customers and support agents.",
    "Those conversations can be phone calls, chats, or emails, and you can rely on full transcripts plus conversation-linked metadata.",
    "Relevant context includes agent metadata (names, teams, skills), QA scores and rubrics, CSAT/NPS linked to conversations, timestamps and time periods, and auto-tagged categories or topics.",
    "You do not have access to separate survey data, social media, CRM systems, ticketing tools, product usage analytics, web behavior data, or external databases.",
    allowClarifyingAssumptions
      ? "When the task is ambiguous and the missing detail fits a bounded set of options, ask through a guided flow inside message instead of asking the user to type option codes."
      : "Do not ask clarification questions. If details are missing, make explicit assumptions and proceed.",
    allowClarifyingAssumptions
      ? "Bias toward not asking if the request is already clear enough or the answer can be inferred from the existing conversation context."
      : "Do not ask clarification questions even if multiple valid approaches exist.",
    "Never ask the user which data source to use. There is only one source of truth: customer conversations.",
    "When clarification is needed, ask only about variables that truly vary: time period, teams or agents, topics or categories, output format, specific metrics, or comparison type.",
    allowClarifyingAssumptions
      ? "If more than one independent, high-impact variable is missing and each has a bounded set of options, bundle them into a single guided_flow with 2 to 4 context-aware questions instead of asking only one question and waiting."
      : "If several variables are missing, do not ask for them; state assumptions and proceed.",
    allowClarifyingAssumptions
      ? "Follow the Cursor and Claude pattern: ask the minimum useful set of high-leverage questions, often more than one when scope, filters, comparison, or format are all unclear, but never pad the flow with low-value questions."
      : "Do not emulate multi-question guided flows when clarification is disabled.",
    allowClarifyingAssumptions
      ? "Prefer collecting all immediately knowable bounded preferences in the first guided_flow round. Use a follow-up guided_flow only when the user's selection creates a new branch that still needs detail, such as Custom range, Specific team, Specific category, or a vague Other answer."
      : "Do not ask follow-up guided flows.",
    'Good clarification targets include: "What time period?", "Which teams?", "Which topic areas?", "Which rubric areas?", "What comparison?", and "What format?".',
    allowClarifyingAssumptions
      ? 'For example, if the user asks for an analysis but leaves time period, audience/format, and segment or comparison unclear, ask 2 to 4 of those questions together in one guided_flow.'
      : "Do not ask grouped clarification examples.",
    'For time-period questions, prefer options like "Last 7 days", "Last 30 days", "Last 90 days", and "Custom range".',
    'If the user chooses "Custom range", ask them to provide the date range in free text before answering.',
    'For QA or coaching work, rubric-area options like "All", "Compliance", "Empathy", "Resolution", and "Custom" are good choices.',
    'For VoC or sentiment work, topic-area options like "All topics", "Specific category", and "Trending topics only" are good choices.',
    "Format choices should stay within chat-friendly outputs such as a summary, detailed breakdown, executive brief, or summary table.",
    "Metric choices should stay grounded in Level AI metrics such as CSAT, handle time, resolution rate, QA performance, and sentiment.",
    "Never ask about data sources, integration setup, configuration status, technical implementation details, NLP versus keyword matching, whether to include statistical analysis, export formats, or access to external systems.",
    allowClarifyingAssumptions
      ? 'If previous clarification context marks a variable as "Skipped", treat that as the user intentionally delegating that choice to you. Use best judgment and do not ask that same question or an equivalent paraphrase again in the same request.'
      : 'If previous clarification context marks a variable as "Skipped", still do not ask again.',
    allowClarifyingAssumptions
      ? "When the user's answer is still ambiguous or signals they want to specify something more precisely, ask a follow-up guided_flow before generating the response."
      : "If the user signals they want to specify something more precisely, do not ask a follow-up and instead state the assumption you are making.",
    'Examples of follow-up clarification: "Specific time period" means you should ask "What time period?" before answering.',
    'Examples of follow-up clarification: "Specific team" means you should ask which team before answering.',
    'Examples of follow-up clarification: "Custom metrics" means you should ask which metrics before answering.',
    'Examples of follow-up clarification: a vague "Other" answer means you should ask a clarifying follow-up before answering.',
    allowClarifyingAssumptions
      ? 'Rules: after the user replies with "Here are my selections:" from a guided_flow, any additional bounded follow-up must also be returned as a guided_flow inside message, not as a plain chat question.'
      : "Do not ask guided-flow follow-ups.",
    allowClarifyingAssumptions
      ? 'Rules: branching answers like "Specific category", "Specific team", "Custom metrics", "Custom range", and "Other" should normally trigger another guided_flow when the next clarification can still be expressed as bounded options.'
      : "Do not ask branching guided-flow follow-ups.",
    "Do not generate a response with assumptions when the user has explicitly indicated they want to specify something more precisely. Collect the exact detail first.",
    "Use saved dictionary entries as defaults when relevant so the user is not asked for repeated clarifications.",
    "Dictionary entries are semantic vocabulary mappings (acronym/jargon -> meaning), not transactional preferences.",
    "Never create dictionary entries for date ranges, time windows, report period, cadence, or other one-off parameters.",
    "If the latest user message clarifies an acronym/jargon meaning, include saveSuggestion.",
    'FORMATTING: the message field must use rich markdown. Use ## headings for sections, **bold** for emphasis, bullet lists (- item) and numbered lists (1. item), > blockquotes, `inline code`, and --- for separators. Structure long answers with clear headings and bullet points for readability.',
    "Respond with valid JSON only (no markdown fences) using this exact schema:",
    '{"mode":"clarify"|"answer","message":"string (markdown formatted)","saveSuggestion":{"term":"string","instruction":"string","reason":"string"}|null}',
    'Rules: mode="clarify" must set saveSuggestion to null.',
    'Rules: the entire response must still be a single valid JSON object. Do not place guided_flow outside the JSON object.',
    'Rules: for bounded clarification, put the guided flow inside the message string using escaped newlines, for example: {"mode":"clarify","message":"Choose the details below.\\n\\n```guided_flow\\n{\\"questions\\":[{\\"id\\":\\"unique-id\\",\\"question\\":\\"Question text\\",\\"header\\":\\"Short label\\",\\"options\\":[{\\"id\\":\\"option-id\\",\\"label\\":\\"Option text\\",\\"description\\":\\"One sentence\\"}],\\"multiSelect\\":false}]}\\n```","saveSuggestion":null}.',
    "Rules: guided_flow blocks must contain 1 to 5 questions and each question must contain 2 to 5 options.",
    "Rules: every guided_flow question must include a multiSelect boolean. Use false for single-select questions and true only when multiple options can be selected together.",
    "Rules: when several bounded clarifications are genuinely needed, prefer 2 to 4 questions in one guided_flow instead of defaulting to a single question.",
    "Rules: do not force multiple questions when only one missing detail materially affects the answer.",
    'Rules: do not ask the user to type codes like "1A" or "2B".',
    "Rules: use plain conversational clarification instead of guided_flow only when the answer must be fully open-ended, such as defining a new acronym or term in the user's own words.",
    'Rules: if the user replies with "Here are my selections:", treat the listed answers as resolved clarification context and continue the task normally.',
    'Rules: if any listed answer is "Skipped", treat that question as intentionally skipped and do not ask it again later in the same request.',
    'Rules: mode="answer" must provide the report and must not ask another clarification question.',
    'Rules: saveSuggestion must use semantic mapping wording like Interpret "TERM" as "MEANING".',
    "Saved dictionary entries:",
    savedEntriesText,
    ...(connectorIds.length > 0
      ? [
          "",
          "PLUGINS: You have access to installed plugin tools. When the user asks you to take an action that matches a plugin tool (e.g., 'send this to John on Slack', 'message the team'), use the appropriate tool function call.",
          "When using a plugin tool, ALSO return a JSON response with mode='answer' and a message confirming what you did.",
          `Installed plugins: ${connectorIds.join(", ")}.`,
        ]
      : []),
  ].join("\n")
}

const getGuidedFlowSubmissionPrompt = (basePrompt: string) =>
  [
    basePrompt,
    'The latest user message is a guided_flow submission that starts with "Here are my selections:".',
    'If you need any additional bounded clarification, you must return mode="clarify" and put the follow-up inside message as a new guided_flow block.',
    "Do not ask a bounded follow-up as plain prose, even if it is only one question.",
    "If the remaining clarification must truly be open-ended free text, you may ask it in plain chat. Otherwise, use guided_flow.",
    'If the user picked a branching answer like "Specific category", "Specific team", "Custom metrics", "Custom range", or "Other", prefer a 1-question guided_flow with 2 to 5 options.',
    'If you already have enough detail, return mode="answer" instead of asking another question.',
    'If you return mode="answer", message must use these markdown section headings exactly: "## Summary", "## Key findings", and "## Recommended actions".',
    "Under Key findings and Recommended actions, use bullet lists with 2 to 4 bullets each.",
    'Do not use numbered section titles like "1. Primary reasons" or "2. Recommendations".',
  ].join("\n")

const getGuidedFlowSubmissionRetryPrompt = (basePrompt: string) =>
  [
    getGuidedFlowSubmissionPrompt(basePrompt),
    "Your previous response did not follow the required guided-flow resolution format.",
    "If clarifying, return the follow-up as a guided_flow block.",
    'If answering, use the exact markdown headings "## Summary", "## Key findings", and "## Recommended actions".',
  ].join("\n")

type ResponsesAPIStreamEvent = {
  type: string
  delta?: string
  response?: ResponsesAPIPayload
}

const requestOpenAI = async ({
  apiKey,
  model,
  messages,
  systemPrompt,
  signal,
}: {
  apiKey: string
  model: string
  messages: ModelMessage[]
  systemPrompt: string
  signal: AbortSignal
}) => {
  const endpoint = "https://api.openai.com/v1/responses"
  const input = messages.map((message) => ({
    content: message.content,
    role: message.role,
  }))

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }

  const body: Record<string, unknown> = {
    model,
    input: [
      { role: "developer", content: systemPrompt },
      ...input,
    ],
    text: { format: { type: "json_object" } },
  }
  if (isReasoningModel(model)) {
    body.reasoning = { effort: "high" }
  }

  const response = await fetch(endpoint, {
    body: JSON.stringify(body),
    headers,
    method: "POST",
    signal,
  })

  if (!response.ok) {
    const errorText = getOpenAIErrorText(await response.text())
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`)
  }

  let payload: ResponsesAPIPayload
  try {
    payload = (await response.json()) as ResponsesAPIPayload
  } catch {
    throw new Error("Failed to parse OpenAI response.")
  }

  const rawText = getResponsesAPIText(payload)
  if (!rawText) {
    throw new Error("OpenAI returned an empty response.")
  }

  return rawText
}

const requestOpenAIWithRetries = async (args: Parameters<typeof requestOpenAI>[0]) => {
  const maxAttempts = 2

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await requestOpenAI(args)
    } catch (error) {
      const message = error instanceof Error ? error.message : ""
      const shouldRetry = isRetryableOpenAIFailure(message) && attempt < maxAttempts

      if (!shouldRetry) {
        throw error
      }

      await delay(600 * attempt)
    }
  }

  throw new Error("OpenAI retry flow exhausted.")
}

const requestOpenAIWithModelFallbacks = async ({
  apiKey,
  models,
  messages,
  systemPrompt,
  signal,
}: {
  apiKey: string
  models: string[]
  messages: ModelMessage[]
  systemPrompt: string
  signal: AbortSignal
}) => {
  const modelSet = dedupeOpenAIModels(models)
  const modelsToTry = modelSet.length > 0 ? modelSet : [defaultOpenAIModel]
  let lastError: unknown = null

  for (const model of modelsToTry) {
    try {
      return await requestOpenAIWithRetries({
        apiKey,
        messages,
        model,
        signal,
        systemPrompt,
      })
    } catch (error) {
      lastError = error
      const message = error instanceof Error ? error.message : ""
      if (!isFallbackEligibleOpenAIFailure(message)) {
        throw error
      }
    }
  }

  throw lastError ?? new Error("OpenAI model fallback flow exhausted.")
}

const requestOpenAIStream = async ({
  apiKey,
  model,
  messages,
  systemPrompt,
  signal,
  reasoningEffort = "medium",
  tools,
}: {
  apiKey: string
  model: string
  messages: ModelMessage[]
  systemPrompt: string
  signal: AbortSignal
  reasoningEffort?: "low" | "medium" | "high"
  tools?: ConnectorToolDef[]
}) => {
  const endpoint = "https://api.openai.com/v1/responses"
  const body: Record<string, unknown> = {
    model,
    input: [
      { role: "developer", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    text: { format: { type: "json_object" } },
    stream: true,
  }
  if (isReasoningModel(model)) {
    body.reasoning = { effort: reasoningEffort, summary: "detailed" }
  }
  if (tools && tools.length > 0) {
    body.tools = tools
  }

  const response = await fetch(endpoint, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    signal,
  })

  if (!response.ok) {
    const errorText = getOpenAIErrorText(await response.text())
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`)
  }

  if (!response.body) {
    throw new Error("OpenAI returned no response body for streaming request.")
  }

  return response
}

const createStreamingResponse = (
  openAIResponse: Response,
  messages: ModelMessage[],
  libraryEntries: LibraryEntry[],
  model: string
) => {
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      const reader = openAIResponse.body!.getReader()
      const decoder = new TextDecoder()
      let sseBuffer = ""
      let fullOutputText = ""
      let reasoningStartedAt: number | null = null
      let outputStartedAt: number | null = null
      let currentToolCallName = ""
      let currentToolCallArgs = ""

      const emit = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          sseBuffer += decoder.decode(value, { stream: true })

          while (true) {
            const eventEnd = sseBuffer.indexOf("\n\n")
            if (eventEnd === -1) break

            const rawEvent = sseBuffer.slice(0, eventEnd)
            sseBuffer = sseBuffer.slice(eventEnd + 2)

            let dataJson = ""
            for (const line of rawEvent.split("\n")) {
              if (line.startsWith("data: ")) {
                dataJson = line.slice(6).trim()
              }
            }

            if (!dataJson || dataJson === "[DONE]") continue

            let parsed: ResponsesAPIStreamEvent
            try {
              parsed = JSON.parse(dataJson) as ResponsesAPIStreamEvent
            } catch {
              continue
            }

            if (
              (parsed.type === "response.reasoning_summary_text.delta" ||
               parsed.type === "response.reasoning.delta") &&
              parsed.delta
            ) {
              if (!reasoningStartedAt) reasoningStartedAt = Date.now()
              emit({ type: "reasoning", content: parsed.delta })
            } else if (parsed.type === "response.output_text.delta" && parsed.delta) {
              if (!outputStartedAt) {
                outputStartedAt = Date.now()
                emit({ type: "reasoning_done" })
              }
              fullOutputText += parsed.delta
            } else if (parsed.type === "response.function_call_arguments.delta" && parsed.delta) {
              currentToolCallArgs += parsed.delta
            } else if (parsed.type === "response.output_item.added") {
              const item = (parsed as Record<string, unknown>).item as Record<string, unknown> | undefined
              if (item?.type === "function_call" && typeof item.name === "string") {
                currentToolCallName = item.name
                currentToolCallArgs = ""
              }
            } else if (parsed.type === "response.output_item.done") {
              const item = (parsed as Record<string, unknown>).item as Record<string, unknown> | undefined
              if (item?.type === "function_call" && currentToolCallName) {
                let args: Record<string, string> = {}
                try { args = JSON.parse(currentToolCallArgs) as Record<string, string> } catch {}
                emit({
                  type: "tool_call_request",
                  toolCallId: item.call_id ?? `tc_${Date.now()}`,
                  toolName: currentToolCallName,
                  args,
                })
                currentToolCallName = ""
                currentToolCallArgs = ""
              }
            } else if (parsed.type === "response.completed") {
              break
            } else if (parsed.type === "error") {
              const errorMessage = (parsed as Record<string, unknown>).message
              emit({
                type: "error",
                message: typeof errorMessage === "string" ? errorMessage : "Streaming error from OpenAI.",
              })
            }
          }
        }

        const assistantTurn = parseAssistantTurn(fullOutputText.trim(), messages, libraryEntries)
        emit({ type: "text", content: assistantTurn.message })

        const reasoningDurationSeconds =
          reasoningStartedAt && outputStartedAt
            ? Math.round((outputStartedAt - reasoningStartedAt) / 1000)
            : undefined

        emit({
          type: "finish",
          mode: assistantTurn.mode,
          saveSuggestion: assistantTurn.mode === "answer" ? assistantTurn.saveSuggestion : null,
          reasoningDurationSeconds,
        })
      } catch (error) {
        emit({
          type: "error",
          message: getAssistantErrorMessage({ error, model }),
        })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

const MENTION_MARKER = "\uFFF9"
const MENTION_END = "\uFFFA"

const allWorkerNames = [
  ...allSystemWorkerLabels,
  ...customWorkers.map((cw) => cw.label),
]

const extractMentionedWorkers = (messages: ModelMessage[]): string[] => {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
  if (!lastUserMessage) return []
  const regex = new RegExp(`${MENTION_MARKER}@(.+?)${MENTION_END}`, "g")
  const workers: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(lastUserMessage.content)) !== null) {
    if (allWorkerNames.includes(match[1])) {
      workers.push(match[1])
    }
  }
  return workers
}

const shouldOrchestrate = (): boolean => true

type OrchestrationPlanWorker = { name: string; question: string }
type OrchestrationPlan = {
  workers: OrchestrationPlanWorker[]
  order: "sequential" | "parallel"
}

const stripMentionMarkers = (text: string): string =>
  text.replace(new RegExp(`${MENTION_MARKER}@[^${MENTION_END}]+${MENTION_END}`, "g"), "").replace(/\s+/g, " ").trim()

const readOpenAIStream = async (
  response: Response,
  onReasoning: (delta: string) => void,
  onOutputDelta: (delta: string) => void
) => {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let sseBuffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    sseBuffer += decoder.decode(value, { stream: true })

    while (true) {
      const eventEnd = sseBuffer.indexOf("\n\n")
      if (eventEnd === -1) break

      const rawEvent = sseBuffer.slice(0, eventEnd)
      sseBuffer = sseBuffer.slice(eventEnd + 2)

      let dataJson = ""
      for (const line of rawEvent.split("\n")) {
        if (line.startsWith("data: ")) {
          dataJson = line.slice(6).trim()
        }
      }
      if (!dataJson || dataJson === "[DONE]") continue

      let parsed: ResponsesAPIStreamEvent
      try {
        parsed = JSON.parse(dataJson) as ResponsesAPIStreamEvent
      } catch {
        continue
      }

      if (
        (parsed.type === "response.reasoning_summary_text.delta" ||
         parsed.type === "response.reasoning.delta") &&
        parsed.delta
      ) {
        onReasoning(parsed.delta)
      } else if (parsed.type === "response.output_text.delta" && parsed.delta) {
        onOutputDelta(parsed.delta)
      } else if (parsed.type === "response.completed") {
        return
      }
    }
  }
}

const createOrchestrationStreamingResponse = async ({
  apiKey,
  model,
  messages,
  libraryEntries,
  mentionedWorkers,
  previousWorkers,
  activeWorker,
  signal,
  tools,
}: {
  apiKey: string
  model: string
  messages: ModelMessage[]
  libraryEntries: LibraryEntry[]
  mentionedWorkers: string[]
  previousWorkers: string[]
  activeWorker: string
  signal: AbortSignal
  tools?: ConnectorToolDef[]
}) => {
  const encoder = new TextEncoder()
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
  const userQuery = lastUserMessage?.content ?? ""
  const cleanQuery = stripMentionMarkers(userQuery)

  const readable = new ReadableStream({
    async start(controller) {
      const emit = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      try {
        let plan: OrchestrationPlan

        if (mentionedWorkers.length > 0) {
          // ── Fast path: user explicitly @mentioned workers — skip LLM planning ──
          plan = {
            workers: mentionedWorkers.map((w) => ({ name: w, question: cleanQuery })),
            order: "sequential",
          }
          emit({ type: "planning_done", durationSeconds: 0 })
        } else {
          // ── Phase 1: Master Planning (streaming with visible reasoning) ──

          const workerDescriptions = allWorkerNames
            .map((w) => `- ${w}: ${workerOrchestratorGuide[w] ?? "AI worker"}`)
            .join("\n")

          const isFollowUp = messages.length > 1
          const hasPreviousWorkers = previousWorkers.length > 0
          const hasActiveWorker = !!activeWorker

          const planPrompt = [
            "You are the master orchestrator for specialized AI workers in a contact center intelligence platform.",
            "You receive the full conversation history. Analyze the latest user message in context and decide which worker(s) to call.",
            "",
            "Available AI workers:",
            workerDescriptions,
            "",
            hasActiveWorker
              ? `The user is currently chatting with: ${activeWorker}.`
              : "No worker is currently selected — this is a fresh conversation.",
            "",
            hasPreviousWorkers
              ? `Workers used in the previous turn: ${previousWorkers.join(", ")}.`
              : "",
            "",
            "STRICT rules for choosing workers (you MUST follow these, no exceptions):",
            "",
            isFollowUp && hasPreviousWorkers
              ? [
                  `RULE 1 — FOLLOW-UP CONTINUITY (HIGHEST PRIORITY):`,
                  `This is a follow-up message in an ongoing conversation.`,
                  `Workers used in the previous turn: ${previousWorkers.join(", ")}.`,
                  `You MUST use exactly these same workers: ${previousWorkers.join(", ")}.`,
                  `Do NOT add new workers. Do NOT remove workers. Do NOT substitute different workers.`,
                  `The user is continuing the same topic — route their message to the same worker(s).`,
                ].join("\n")
              : hasActiveWorker
                ? [
                    `RULE 1 — PICK THE BEST-FIT WORKER:`,
                    `Read the worker descriptions above carefully. Pick the single worker whose expertise best matches the user's query.`,
                    `"${activeWorker}" is the user's current worker — use it if it fits, but if another worker is clearly a better match, use that one instead.`,
                    `Only add a second worker if the query genuinely spans two distinct domains (e.g. QA scores AND customer sentiment).`,
                  ].join("\n")
                : [
                    `RULE 1 — PICK THE BEST-FIT WORKER:`,
                    `Read the worker descriptions above carefully. Pick the single worker whose expertise best matches the user's query.`,
                    `Only add a second worker if the query genuinely spans two distinct domains (e.g. QA scores AND customer sentiment).`,
                  ].join("\n"),
            "",
            "RULE 2 — MINIMAL WORKERS: Use exactly 1 worker unless absolutely necessary. Never more than 3.",
            "",
            "RULE 3 — EXACT NAMES: Worker names must exactly match the available workers list above.",
            "",
            ...(tools && tools.length > 0
              ? [
                  "",
                  "RULE 4 — DIRECT ACTIONS (HIGHEST PRIORITY): If the user is asking to PERFORM AN ACTION like sending a Slack message, emailing, creating a ticket, etc. — do NOT route to any worker.",
                  'Instead return: {"direct_action":true,"workers":[],"order":"sequential"}',
                  "You handle actions yourself using plugin tools. Only route to workers for questions that need domain expertise.",
                  "Examples of direct actions: 'send this to John on Slack', 'message the team', 'share this on #general'.",
                  "",
                ]
              : []),
            "Respond with valid JSON only:",
            '{"workers":[{"name":"ExactWorkerName","question":"Specific sub-question tailored for this worker"}],"order":"sequential"}',
          ].join("\n")

          const planMessages: ModelMessage[] = messages.map((m) => ({
            role: m.role,
            content: stripMentionMarkers(m.content),
          }))

          const planResponse = await requestOpenAIStream({
            apiKey,
            model,
            messages: planMessages,
            systemPrompt: planPrompt,
            signal,
            reasoningEffort: "high",
          })

          let planOutputText = ""
          let planReasoningStart: number | null = null
          let planOutputStart: number | null = null

          await readOpenAIStream(
            planResponse,
            (delta) => {
              if (!planReasoningStart) planReasoningStart = Date.now()
              emit({ type: "planning_reasoning", content: delta })
            },
            (delta) => {
              if (!planOutputStart) planOutputStart = Date.now()
              planOutputText += delta
            }
          )

          const planReasoningDuration =
            planReasoningStart
              ? Math.max(1, Math.ceil(((planOutputStart ?? Date.now()) - planReasoningStart) / 1000))
              : undefined

          emit({ type: "planning_done", durationSeconds: planReasoningDuration })

          const rawPlanText = planOutputText.trim()

          if (!rawPlanText) {
            throw new Error("Master planner returned empty output.")
          }

          let planJson: OrchestrationPlan
          try {
            const extracted = extractJsonObjectFromText(rawPlanText)
            const textToParse = extracted?.jsonText ?? rawPlanText
            planJson = JSON.parse(textToParse) as OrchestrationPlan
          } catch {
            throw new Error(`Master planner returned invalid JSON: ${rawPlanText.slice(0, 200)}`)
          }

          const isDirectAction = (planJson as Record<string, unknown>).direct_action === true

          if (isDirectAction) {
            emit({ type: "orchestration_plan", workers: [] })

            const directPrompt = [
              "You are an AI assistant with access to plugin tools.",
              "The user asked you to perform an action. Use the appropriate tool to fulfill the request.",
              "Also provide a brief text confirmation of what you are doing.",
              "",
              "Respond with valid JSON only:",
              '{"mode":"answer","message":"Your brief confirmation here","saveSuggestion":null}',
            ].join("\n")

            const directResponse = await requestOpenAIStream({
              apiKey,
              model,
              messages: messages.map((m) => ({ role: m.role, content: stripMentionMarkers(m.content) })),
              systemPrompt: directPrompt,
              signal,
              tools,
            })

            let directOutputText = ""
            let directToolCallName = ""
            let directToolCallArgs = ""
            const directReader = directResponse.body!.getReader()
            const directDecoder = new TextDecoder()
            let directDone = false

            while (!directDone) {
              const { value: chunk, done } = await directReader.read()
              directDone = done
              if (!chunk) continue
              const text = directDecoder.decode(chunk, { stream: true })
              for (const line of text.split("\n")) {
                if (!line.startsWith("data: ") || line === "data: [DONE]") continue
                let parsed: Record<string, unknown>
                try { parsed = JSON.parse(line.slice(6)) as Record<string, unknown> } catch { continue }
                const pType = parsed.type as string

                if (pType === "response.output_text.delta" && parsed.delta) {
                  directOutputText += parsed.delta as string
                } else if (pType === "response.function_call_arguments.delta" && parsed.delta) {
                  directToolCallArgs += parsed.delta as string
                } else if (pType === "response.output_item.added") {
                  const item = parsed.item as Record<string, unknown> | undefined
                  if (item?.type === "function_call" && typeof item.name === "string") {
                    directToolCallName = item.name
                    directToolCallArgs = ""
                  }
                } else if (pType === "response.output_item.done") {
                  const item = parsed.item as Record<string, unknown> | undefined
                  if (item?.type === "function_call" && directToolCallName) {
                    let args: Record<string, string> = {}
                    try { args = JSON.parse(directToolCallArgs) as Record<string, string> } catch {}
                    emit({
                      type: "tool_call_request",
                      toolCallId: (item.call_id as string) ?? `tc_${Date.now()}`,
                      toolName: directToolCallName,
                      args,
                    })
                    directToolCallName = ""
                    directToolCallArgs = ""
                  }
                } else if (pType === "response.completed") {
                  directDone = true
                  break
                }
              }
            }

            if (directOutputText.trim()) {
              const turn = parseAssistantTurn(directOutputText.trim(), messages, libraryEntries)
              emit({ type: "text", content: turn.message })
            }

            emit({ type: "finish", mode: "answer", saveSuggestion: null })
            controller.close()
            return
          }

          if (!Array.isArray(planJson.workers) || planJson.workers.length === 0) {
            throw new Error("Master returned no workers in plan.")
          }

          plan = planJson
        }

        emit({
          type: "orchestration_plan",
          workers: plan.workers.map((w) => ({ name: w.name, question: w.question })),
        })

        // ── Phase 2: Worker Execution ──

        const workerResults: Array<{ name: string; question: string; response: string }> = []

        for (let i = 0; i < plan.workers.length; i++) {
          const worker = plan.workers[i]
          emit({ type: "worker_start", workerId: i, worker: worker.name, question: worker.question })

          const isFirstUserMessage = messages.filter((m) => m.role === "user").length <= 1
          const workerSystemPrompt = getSystemPrompt(worker.name, libraryEntries, isFirstUserMessage)
          const workerMessages: ModelMessage[] = [{ role: "user", content: worker.question }]
          const workerStartTime = Date.now()

          try {
            const workerResponse = await requestOpenAIStream({
              apiKey,
              model,
              messages: workerMessages,
              systemPrompt: workerSystemPrompt,
              signal,
              reasoningEffort: "high",
            })

            let workerOutputText = ""

            await readOpenAIStream(
              workerResponse,
              (delta) => emit({ type: "worker_reasoning", workerId: i, content: delta }),
              (delta) => { workerOutputText += delta }
            )

            const durationSeconds = Math.max(1, Math.ceil((Date.now() - workerStartTime) / 1000))
            const assistantTurn = parseAssistantTurn(workerOutputText.trim(), workerMessages, libraryEntries)
            workerResults.push({ name: worker.name, question: worker.question, response: assistantTurn.message })
            emit({ type: "worker_done", workerId: i, response: assistantTurn.message, durationSeconds })
          } catch (workerError) {
            const durationSeconds = Math.max(1, Math.ceil((Date.now() - workerStartTime) / 1000))
            const errMsg = workerError instanceof Error ? workerError.message : "Worker call failed."
            workerResults.push({ name: worker.name, question: worker.question, response: `Error: ${errMsg}` })
            emit({ type: "worker_done", workerId: i, response: `Error: ${errMsg}`, durationSeconds })
          }
        }

        // ── Phase 3: Synthesis (with tool support for plugins) ──

        const synthesisContext = workerResults
          .map((r) => `### ${r.name}\nQuestion: ${r.question}\nResponse: ${r.response}`)
          .join("\n\n")

        const pluginInstructions = tools && tools.length > 0
          ? [
              "",
              "PLUGINS: You have access to installed plugin tools. When the user asks you to take an action that matches a plugin tool (e.g., 'send this to John on Slack', 'message the team'), use the appropriate tool function call.",
              "When using a plugin tool, ALSO provide a text response confirming what you are doing.",
            ]
          : []

        const synthesisPrompt = workerResults.length === 1
          ? [
              "You are a master AI orchestrator presenting a result from a specialized AI worker.",
              "Present the worker's response as your own. Use markdown formatting.",
              "",
              "Worker result:",
              synthesisContext,
              "",
              ...pluginInstructions,
              "",
              "Respond with valid JSON only:",
              '{"mode":"answer","message":"Your markdown response here","saveSuggestion":null}',
            ].join("\n")
          : [
              "You are a master AI orchestrator synthesizing results from specialized AI workers.",
              "Below are the responses from each worker. Synthesize them into a cohesive, comprehensive answer.",
              "Use markdown formatting. Do not mention individual workers by name unless it adds clarity.",
              "",
              "Worker results:",
              synthesisContext,
              "",
              ...pluginInstructions,
              "",
              "Respond with valid JSON only:",
              '{"mode":"answer","message":"Your synthesized markdown response here","saveSuggestion":null}',
            ].join("\n")

        const synthResponse = await requestOpenAIStream({
          apiKey,
          model,
          messages: [{ role: "user", content: cleanQuery }],
          systemPrompt: synthesisPrompt,
          signal,
          tools,
        })

        let synthOutputText = ""
        let synthReasoningStart: number | null = null
        let synthOutputStart: number | null = null
        let currentToolCallName = ""
        let currentToolCallArgs = ""

        const synthReader = synthResponse.body!.getReader()
        const synthDecoder = new TextDecoder()
        let synthDone = false
        while (!synthDone) {
          const { value: chunk, done } = await synthReader.read()
          synthDone = done
          if (!chunk) continue
          const text = synthDecoder.decode(chunk, { stream: true })
          for (const line of text.split("\n")) {
            if (!line.startsWith("data: ") || line === "data: [DONE]") continue
            let parsed: Record<string, unknown>
            try { parsed = JSON.parse(line.slice(6)) as Record<string, unknown> } catch { continue }

            const pType = parsed.type as string

            if (
              (pType === "response.reasoning_summary_text.delta" ||
               pType === "response.reasoning.delta") &&
              parsed.delta
            ) {
              if (!synthReasoningStart) synthReasoningStart = Date.now()
              emit({ type: "reasoning", content: parsed.delta as string })
            } else if (pType === "response.output_text.delta" && parsed.delta) {
              if (!synthOutputStart) synthOutputStart = Date.now()
              synthOutputText += parsed.delta as string
            } else if (pType === "response.function_call_arguments.delta" && parsed.delta) {
              currentToolCallArgs += parsed.delta as string
            } else if (pType === "response.output_item.added") {
              const item = parsed.item as Record<string, unknown> | undefined
              if (item?.type === "function_call" && typeof item.name === "string") {
                currentToolCallName = item.name
                currentToolCallArgs = ""
              }
            } else if (pType === "response.output_item.done") {
              const item = parsed.item as Record<string, unknown> | undefined
              if (item?.type === "function_call" && currentToolCallName) {
                let args: Record<string, string> = {}
                try { args = JSON.parse(currentToolCallArgs) as Record<string, string> } catch {}
                emit({
                  type: "tool_call_request",
                  toolCallId: (item.call_id as string) ?? `tc_${Date.now()}`,
                  toolName: currentToolCallName,
                  args,
                })
                currentToolCallName = ""
                currentToolCallArgs = ""
              }
            } else if (pType === "response.completed") {
              synthDone = true
              break
            }
          }
        }

        if (synthOutputText.trim()) {
          const synthTurn = parseAssistantTurn(synthOutputText.trim(), messages, libraryEntries)
          emit({ type: "text", content: synthTurn.message })
        }

        const reasoningDurationSeconds =
          synthReasoningStart && synthOutputStart
            ? Math.round((synthOutputStart - synthReasoningStart) / 1000)
            : undefined

        emit({
          type: "finish",
          mode: "answer",
          saveSuggestion: null,
          reasoningDurationSeconds,
        })
      } catch (error) {
        emit({
          type: "error",
          message: getAssistantErrorMessage({ error, model }),
        })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

export async function POST(request: Request) {
  let body: ChatRequest
  try {
    body = (await request.json()) as ChatRequest
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const worker = body.worker?.trim()
  const messages =
    body.messages?.filter(
      (message) =>
        (message.role === "assistant" || message.role === "user") &&
        message.content?.trim()
    ) ?? []
  const libraryEntries = normalizeLibraryEntries(body.libraryEntries)
  const allowClarifyingAssumptions = body.allowClarifyingAssumptions !== false
  const previousWorkers = body.previousWorkers ?? []
  const installedConnectors = body.installedConnectors ?? []
  const connectorTools = getToolsForConnectors(installedConnectors)

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "at least one message is required." },
      { status: 400 }
    )
  }

  const deterministicClarification = allowClarifyingAssumptions
    ? buildDeterministicTermClarification(messages, libraryEntries)
    : null
  if (deterministicClarification) {
    return NextResponse.json(deterministicClarification)
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim()
  const primaryModel = normalizeOpenAIModel(process.env.OPENAI_MODEL ?? process.env.OPENROUTER_MODEL)
  const envFallbackModels = parseOpenAIModelList(
    process.env.OPENAI_FALLBACK_MODELS ?? process.env.OPENROUTER_FALLBACK_MODELS
  )
  const fallbackModels =
    envFallbackModels.length > 0
      ? envFallbackModels.map((model) => normalizeOpenAIModel(model))
      : defaultOpenAIFallbackModels
  const models = dedupeOpenAIModels([primaryModel, ...fallbackModels])
  const model = models[0] ?? defaultOpenAIModel
  const systemPrompt = getSystemPrompt(worker || defaultWorker, libraryEntries, allowClarifyingAssumptions, installedConnectors)

  if (!apiKey) {
    return NextResponse.json(
      toAssistantErrorTurn(
        "I couldn't generate a response because OPENAI_API_KEY is missing on the server."
      )
    )
  }

  try {
    const mentionedWorkers = extractMentionedWorkers(messages)
    if (shouldOrchestrate()) {
      return createOrchestrationStreamingResponse({
        apiKey: apiKey!,
        model,
        messages,
        libraryEntries,
        mentionedWorkers,
        previousWorkers,
        activeWorker: worker || "",
        signal: request.signal,
        tools: connectorTools.length > 0 ? connectorTools : undefined,
      })
    }

    const forceAnswer = shouldForceAnswerAfterClarification(messages)
    const shouldValidateGuidedFlowFollowUp =
      allowClarifyingAssumptions && isFollowUpToGuidedFlowSubmission(messages)

    let streamingPrompt = systemPrompt

    if (forceAnswer) {
      streamingPrompt = [
        systemPrompt,
        "You already asked a clarification question and the user answered.",
        "Do not ask any more questions.",
        'Return mode="answer" with a substantive report in message.',
        "message must include these markdown sections: Summary, Key findings, Recommended actions.",
        "Do not just restate the user's last sentence.",
      ].join("\n")
    } else if (shouldValidateGuidedFlowFollowUp) {
      streamingPrompt = getGuidedFlowSubmissionPrompt(systemPrompt)
    }

    try {
      const openAIResponse = await requestOpenAIStream({
        apiKey,
        model,
        messages,
        systemPrompt: streamingPrompt,
        signal: request.signal,
        tools: connectorTools.length > 0 ? connectorTools : undefined,
      })
      return createStreamingResponse(openAIResponse, messages, libraryEntries, model)
    } catch (streamError) {
      console.error("[ai-worker] Streaming failed, falling back to non-streaming.", streamError)
      const rawText = await requestOpenAIWithModelFallbacks({
        apiKey,
        messages,
        models,
        signal: request.signal,
        systemPrompt: streamingPrompt,
      })

      const assistantTurn = parseAssistantTurn(rawText, messages, libraryEntries)
      return NextResponse.json(assistantTurn)
    }
  } catch (error) {
    console.error("[ai-worker] OpenAI request failed.", error)
    return NextResponse.json(
      toAssistantErrorTurn(
        getAssistantErrorMessage({
          error,
          model,
        })
      )
    )
  }
}
