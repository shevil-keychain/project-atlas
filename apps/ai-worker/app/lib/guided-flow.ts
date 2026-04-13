export type GuidedFlowOption = {
  id: string
  label: string
  description?: string
}

export type GuidedFlowQuestion = {
  id: string
  question: string
  header: string
  options: GuidedFlowOption[]
  multiSelect: boolean
}

export type GuidedFlowPayload = {
  questions: GuidedFlowQuestion[]
}

export type StepAnswer = {
  selectedIds: string[]
  freeText?: string
}

export type GuidedFlowSubmission = {
  answers: Record<string, StepAnswer>
  additionalContext?: string
}

const guidedFlowBlockRegex = /```guided_flow\s*\r?\n([\s\S]*?)\r?\n```/
const guidedFlowBlockReplaceRegex = /```guided_flow[\s\S]*?```/
const guidedFlowInlineRegex = /guided_flow\b/
const maxQuestions = 5
const minQuestions = 1
const minOptions = 2
const maxOptions = 5

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0

const normalizeGuidedFlowOption = (option: unknown): GuidedFlowOption | null => {
  if (!option || typeof option !== "object") {
    return null
  }

  const candidate = option as Record<string, unknown>
  if (
    !isNonEmptyString(candidate.id) ||
    !isNonEmptyString(candidate.label) ||
    (candidate.description !== undefined && typeof candidate.description !== "string")
  ) {
    return null
  }

  return {
    description:
      typeof candidate.description === "string" && candidate.description.trim()
        ? candidate.description.trim()
        : undefined,
    id: candidate.id.trim(),
    label: candidate.label.trim(),
  }
}

const normalizeGuidedFlowQuestion = (question: unknown): GuidedFlowQuestion | null => {
  if (!question || typeof question !== "object") {
    return null
  }

  const questionCandidate = question as Record<string, unknown>
  if (
    !isNonEmptyString(questionCandidate.id) ||
    !isNonEmptyString(questionCandidate.question) ||
    !Array.isArray(questionCandidate.options) ||
    questionCandidate.options.length < minOptions ||
    questionCandidate.options.length > maxOptions
  ) {
    return null
  }

  const options = questionCandidate.options
    .map((option) => normalizeGuidedFlowOption(option))
    .filter((option): option is GuidedFlowOption => option !== null)

  if (options.length !== questionCandidate.options.length) {
    return null
  }

  return {
    header: isNonEmptyString(questionCandidate.header)
      ? questionCandidate.header.trim()
      : questionCandidate.question.trim(),
    id: questionCandidate.id.trim(),
    multiSelect:
      typeof questionCandidate.multiSelect === "boolean" ? questionCandidate.multiSelect : false,
    options,
    question: questionCandidate.question.trim(),
  }
}

const normalizeGuidedFlow = (data: unknown): GuidedFlowPayload | null => {
  if (!data || typeof data !== "object") {
    return null
  }

  const candidate = data as Record<string, unknown>
  if (
    !Array.isArray(candidate.questions) ||
    candidate.questions.length < minQuestions ||
    candidate.questions.length > maxQuestions
  ) {
    return null
  }

  const questions = candidate.questions
    .map((question) => normalizeGuidedFlowQuestion(question))
    .filter((question): question is GuidedFlowQuestion => question !== null)

  if (questions.length !== candidate.questions.length) {
    return null
  }

  return { questions }
}

export const isValidGuidedFlow = (data: unknown): data is GuidedFlowPayload => {
  return normalizeGuidedFlow(data) !== null
}

export const extractJsonObjectFromText = (raw: string, startIndex?: number) => {
  const jsonStartIndex = startIndex ?? raw.indexOf("{")
  if (jsonStartIndex < 0) {
    return null
  }

  let depth = 0
  let inString = false
  let isEscaped = false

  for (let index = jsonStartIndex; index < raw.length; index += 1) {
    const character = raw[index]

    if (inString) {
      if (isEscaped) {
        isEscaped = false
        continue
      }

      if (character === "\\") {
        isEscaped = true
        continue
      }

      if (character === "\"") {
        inString = false
      }

      continue
    }

    if (character === "\"") {
      inString = true
      continue
    }

    if (character === "{") {
      depth += 1
      continue
    }

    if (character === "}") {
      depth -= 1
      if (depth === 0) {
        return {
          endIndex: index + 1,
          jsonText: raw.slice(jsonStartIndex, index + 1),
        }
      }
    }
  }

  return null
}

export const parseGuidedFlowMessage = (raw: string) => {
  const text = raw.trim()
  const match = text.match(guidedFlowBlockRegex)
  if (!match) {
    const inlineMatch = text.match(guidedFlowInlineRegex)
    if (!inlineMatch || inlineMatch.index === undefined) {
      return { text }
    }

    const inlineJson = extractJsonObjectFromText(text, text.indexOf("{", inlineMatch.index))
    if (!inlineJson) {
      return { text }
    }

    try {
      const parsed = JSON.parse(inlineJson.jsonText) as unknown
      const normalizedGuidedFlow = normalizeGuidedFlow(parsed)
      if (!normalizedGuidedFlow) {
        return { text }
      }

      const rawLeadInText = text.slice(0, inlineMatch.index).trim()
      let leadInText = rawLeadInText

      const leadInJson = extractJsonObjectFromText(rawLeadInText)
      if (leadInJson && leadInJson.endIndex === rawLeadInText.length) {
        try {
          const parsedLeadIn = JSON.parse(leadInJson.jsonText) as { message?: unknown }
          if (typeof parsedLeadIn.message === "string" && parsedLeadIn.message.trim()) {
            leadInText = parsedLeadIn.message.trim()
          }
        } catch {
          // Keep the raw lead-in when it is not valid JSON.
        }
      }

      return {
        guidedFlow: normalizedGuidedFlow,
        text: leadInText,
      }
    } catch {
      return { text }
    }
  }

  try {
    const parsed = JSON.parse(match[1]) as unknown
    const normalizedGuidedFlow = normalizeGuidedFlow(parsed)
    if (!normalizedGuidedFlow) {
      return { text }
    }

    return {
      guidedFlow: normalizedGuidedFlow,
      text: text.replace(guidedFlowBlockReplaceRegex, "").trim(),
    }
  } catch {
    return { text }
  }
}

export const hasGuidedFlowBlock = (raw: string) => Boolean(parseGuidedFlowMessage(raw).guidedFlow)

export const getGuidedFlowAnswerSummary = (
  question: GuidedFlowQuestion,
  answer: StepAnswer | undefined
) => {
  if (!answer) {
    return ""
  }

  const optionLabels = answer.selectedIds
    .map((selectedId) => question.options.find((option) => option.id === selectedId)?.label ?? "")
    .filter(Boolean)
  const freeText = answer.freeText?.trim()

  return [...optionLabels, ...(freeText ? [freeText] : [])].join(", ")
}

export const formatGuidedFlowSubmission = (
  payload: GuidedFlowPayload,
  submission: GuidedFlowSubmission
) => {
  const lines = ["Here are my selections:", ""]

  payload.questions.forEach((question) => {
    const summary = getGuidedFlowAnswerSummary(question, submission.answers[question.id])
    lines.push(`${question.question}: ${summary || "Skipped"}`)
  })

  lines.push(
    "",
    'If a line is marked "Skipped", treat that as an intentional no-preference. Use your best judgment for that variable and do not ask that same clarification again in this request.'
  )

  const additionalContext = submission.additionalContext?.trim()
  if (additionalContext) {
    lines.push("", `Additional context: ${additionalContext}`)
  }

  return lines.join("\n")
}
