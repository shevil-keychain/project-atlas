import { NextResponse } from "next/server"

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
}

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
const defaultOpenAIModel = "gpt-5-mini"
const defaultOpenAIFallbackModels = ["gpt-4o-mini", "gpt-4.1-mini"]
const maxOpenAIModels = 3
const enableQualityRetry = process.env.OPENAI_ENABLE_QUALITY_RETRY === "true"
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

const shouldForceAnswerAfterClarification = (messages: ModelMessage[]) => {
  const latestUser = getLatestUserMessage(messages)
  const previousMessage = getMessageBeforeLatestUser(messages)

  return Boolean(
    latestUser &&
      previousMessage?.role === "assistant" &&
      isLikelyQuestion(previousMessage.content)
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
  const firstBrace = cleanedText.indexOf("{")
  const lastBrace = cleanedText.lastIndexOf("}")

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
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

  const jsonText = cleanedText.slice(firstBrace, lastBrace + 1)

  let parsed: Record<string, unknown> | null = null
  try {
    parsed = JSON.parse(jsonText) as Record<string, unknown>
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
  const message =
    typeof parsed.message === "string" && parsed.message.trim()
      ? parsed.message.trim()
      : cleanedText || fallbackAssistantMessage

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
  if (previousMessage?.role === "assistant" && isLikelyQuestion(previousMessage.content)) {
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
  allowClarifyingAssumptions: boolean
) => {
  const savedEntriesText =
    libraryEntries.length > 0
      ? libraryEntries
          .map((entry, index) => `${index + 1}. ${entry.term}: ${entry.instruction}`)
          .join("\n")
      : "No saved dictionary entries."

  return [
    `You are ${worker}. Give practical answers focused on analytics work in support operations.`,
    allowClarifyingAssumptions
      ? "Ask at most one clarification question, then provide the report in the next turn after the user answers."
      : "Do not ask clarification questions. If details are missing, make explicit assumptions and proceed.",
    "Use saved dictionary entries as defaults when relevant so the user is not asked for repeated clarifications.",
    "Dictionary entries are semantic vocabulary mappings (acronym/jargon -> meaning), not transactional preferences.",
    "Never create dictionary entries for date ranges, time windows, report period, cadence, or other one-off parameters.",
    "If the latest user message clarifies an acronym/jargon meaning, include saveSuggestion.",
    "Respond with valid JSON only (no markdown fences) using this exact schema:",
    '{"mode":"clarify"|"answer","message":"string","saveSuggestion":{"term":"string","instruction":"string","reason":"string"}|null}',
    'Rules: mode="clarify" must ask exactly one question and set saveSuggestion to null.',
    'Rules: mode="answer" must provide the report and must not ask another clarification question.',
    'Rules: saveSuggestion must use semantic mapping wording like Interpret "TERM" as "MEANING".',
    "Saved dictionary entries:",
    savedEntriesText,
  ].join("\n")
}

const getStreamingSystemPrompt = (
  worker: string,
  libraryEntries: LibraryEntry[],
  allowClarifyingAssumptions: boolean
) => {
  const basePrompt = getSystemPrompt(worker, libraryEntries, allowClarifyingAssumptions)
  return [
    basePrompt,
    "",
    "Before your JSON response, think through the request inside <thinking> tags.",
    "Example:",
    "<thinking>The user wants an analysis of refund intent drivers. I should examine key categories, volume trends, and outliers over the requested period.</thinking>",
    '{"mode":"answer","message":"...","saveSuggestion":null}',
  ].join("\n")
}

type OpenAIStreamChunk = {
  choices?: Array<{
    delta?: {
      content?: string
    }
    finish_reason?: string | null
  }>
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
  const endpoint = "https://api.openai.com/v1/chat/completions"
  const openAIMessages = [
    {
      content: systemPrompt,
      role: "system" as const,
    },
    ...messages.map((message) => ({
      content: message.content,
      role: message.role,
    })),
  ]
  const openAIMessagesWithInlineSystem = [
    {
      content: `System instructions:\n${systemPrompt}`,
      role: "user" as const,
    },
    ...messages.map((message) => ({
      content: message.content,
      role: message.role,
    })),
  ]

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }

  const buildRequestBody = (requestMessages: Array<{ role: "assistant" | "system" | "user"; content: string }>) => ({
    messages: requestMessages,
    model,
  })

  const requestWithBody = (body: unknown) =>
    fetch(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: "POST",
      signal,
    })

  let response = await requestWithBody({
    ...buildRequestBody(openAIMessages),
    response_format: {
      type: "json_object",
    },
  })

  if (!response.ok) {
    const errorText = getOpenAIErrorText(await response.text())
    const normalizedErrorText = errorText.toLowerCase()

    const shouldRetryForCompatibility =
      response.status === 400 &&
      (normalizedErrorText.includes("response_format") ||
        normalizedErrorText.includes("json_object") ||
        normalizedErrorText.includes("json mode") ||
        normalizedErrorText.includes("json schema") ||
        normalizedErrorText.includes("developer instruction is not enabled") ||
        normalizedErrorText.includes("system instruction is not enabled") ||
        normalizedErrorText.includes("system role"))

    if (!shouldRetryForCompatibility) {
      throw new Error(`OpenAI request failed (${response.status}): ${errorText}`)
    }

    response = await requestWithBody(buildRequestBody(openAIMessagesWithInlineSystem))

    if (!response.ok) {
      const retryErrorText = getOpenAIErrorText(await response.text())
      throw new Error(`OpenAI request failed (${response.status}): ${retryErrorText}`)
    }
  }

  let payload: OpenAIResponsePayload
  try {
    payload = (await response.json()) as OpenAIResponsePayload
  } catch {
    throw new Error("Failed to parse OpenAI response.")
  }

  const rawText = getOpenAIText(payload)
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
}: {
  apiKey: string
  model: string
  messages: ModelMessage[]
  systemPrompt: string
  signal: AbortSignal
}) => {
  const endpoint = "https://api.openai.com/v1/chat/completions"
  const response = await fetch(endpoint, {
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      model,
      stream: true,
    }),
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
      let fullText = ""
      let reasoningEmitted = ""
      let state: "pre_thinking" | "thinking" | "json" = "pre_thinking"

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

            for (const line of rawEvent.split("\n")) {
              if (!line.startsWith("data: ")) continue
              const data = line.slice(6).trim()
              if (data === "[DONE]") continue

              let content = ""
              try {
                const chunk = JSON.parse(data) as OpenAIStreamChunk
                content = chunk.choices?.[0]?.delta?.content ?? ""
              } catch {
                continue
              }

              if (!content) continue
              fullText += content

              if (state === "pre_thinking") {
                if (fullText.includes("<thinking>")) {
                  state = "thinking"
                  const afterTag = fullText.split("<thinking>").slice(1).join("")
                  if (afterTag && !afterTag.includes("</thinking>")) {
                    reasoningEmitted = afterTag
                    emit({ type: "reasoning", content: afterTag })
                  }
                } else if (fullText.length > 40 && !fullText.trimStart().startsWith("<")) {
                  state = "json"
                }
              } else if (state === "thinking") {
                if (fullText.includes("</thinking>")) {
                  const thinkingBlock =
                    fullText.split("<thinking>").slice(1).join("").split("</thinking>")[0] ?? ""
                  const newContent = thinkingBlock.slice(reasoningEmitted.length)
                  if (newContent) {
                    emit({ type: "reasoning", content: newContent })
                  }
                  state = "json"
                } else {
                  const thinkingBlock = fullText.split("<thinking>").slice(1).join("")
                  const newContent = thinkingBlock.slice(reasoningEmitted.length)
                  if (newContent) {
                    reasoningEmitted += newContent
                    emit({ type: "reasoning", content: newContent })
                  }
                }
              }
            }
          }
        }

        let jsonPart = fullText
        if (fullText.includes("</thinking>")) {
          jsonPart = fullText.split("</thinking>").slice(1).join("")
        }

        const parsed = parseAssistantTurn(jsonPart.trim(), messages, libraryEntries)
        emit({ type: "text", content: parsed.message })
        emit({
          type: "finish",
          mode: parsed.mode,
          saveSuggestion: parsed.mode === "answer" ? parsed.saveSuggestion : null,
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

  if (!worker || messages.length === 0) {
    return NextResponse.json(
      { error: "worker and at least one message are required." },
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
  const systemPrompt = getSystemPrompt(worker, libraryEntries, allowClarifyingAssumptions)

  if (!apiKey) {
    return NextResponse.json(
      toAssistantErrorTurn(
        "I couldn't generate a response because OPENAI_API_KEY is missing on the server."
      )
    )
  }

  try {
    const forceAnswer = shouldForceAnswerAfterClarification(messages)

    if (forceAnswer) {
      let assistantTurn: AssistantTurnResponse
      const strictAnswerPrompt = [
        systemPrompt,
        "You already asked a clarification question and the user answered.",
        "Do not ask any more questions.",
        'Return mode=\"answer\" with a substantive report in message.',
        "message must include these markdown sections: Summary, Key findings, Recommended actions.",
        "Do not just restate the user's last sentence.",
      ].join("\n")

      const forcedRawText = await requestOpenAIWithModelFallbacks({
        apiKey,
        messages,
        models,
        signal: request.signal,
        systemPrompt: strictAnswerPrompt,
      })

      assistantTurn = parseAssistantTurn(forcedRawText, messages, libraryEntries)

      const needsEnhancedAnswer =
        assistantTurn.mode === "clarify" ||
        isLikelyQuestion(assistantTurn.message) ||
        isWeakAnswer(assistantTurn.message, messages)

      if (enableQualityRetry && needsEnhancedAnswer) {
        const enhancedAnswerPrompt = [
          strictAnswerPrompt,
          "Your previous answer was too brief.",
          "Generate a fuller report (at least 3 bullets in Key findings and 3 bullets in Recommended actions).",
          "Use concrete details inferred from user context and worker role.",
        ].join("\n")

        const enhancedRawText = await requestOpenAIWithModelFallbacks({
          apiKey,
          messages,
          models,
          signal: request.signal,
          systemPrompt: enhancedAnswerPrompt,
        })

        assistantTurn = parseAssistantTurn(enhancedRawText, messages, libraryEntries)
      }

      return NextResponse.json(assistantTurn)
    } else {
      try {
        const streamingPrompt = getStreamingSystemPrompt(
          worker,
          libraryEntries,
          allowClarifyingAssumptions
        )
        const openAIResponse = await requestOpenAIStream({
          apiKey,
          model,
          messages,
          systemPrompt: streamingPrompt,
          signal: request.signal,
        })
        return createStreamingResponse(openAIResponse, messages, libraryEntries, model)
      } catch (streamError) {
        console.error("[ai-workers-codex-crazy] Streaming failed, falling back to non-streaming.", streamError)
        const rawText = await requestOpenAIWithModelFallbacks({
          apiKey,
          messages,
          models,
          signal: request.signal,
          systemPrompt,
        })

        const assistantTurn = parseAssistantTurn(rawText, messages, libraryEntries)
        return NextResponse.json(assistantTurn)
      }
    }
  } catch (error) {
    console.error("[ai-workers-codex-crazy] OpenAI request failed.", error)
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
