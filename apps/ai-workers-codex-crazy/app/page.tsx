"use client"

import { type MouseEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Card, CardBody } from "@level/ui/components/ui/card"
import { EmptyState } from "@level/ui/components/ui/empty-state"
import { Input } from "@level/ui/components/ui/input"
import { Dialog, DialogBody, DialogContent, DialogHeader } from "@level/ui/components/ui/modal"
import { Textarea } from "@level/ui/components/ui/textarea"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { ToggleWithLabel } from "@level/ui/components/ui/toggle-with-label"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import {
  ArrowUp,
  BarChart10,
  Bookmark,
  Edit05,
  LayoutLeft,
  LayersThree02,
  LinkExternal01,
  Microphone01,
  Plus,
  Sliders04,
  Star04,
  X,
  Zap,
} from "@level/ui/components/icons"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./components/ai-elements/conversation"
import { Message, MessageContent, MessageResponse } from "./components/ai-elements/message"
import { Shimmer } from "./components/ai-elements/shimmer"
import {
  defaultWorker,
  workerAlternativeRows,
  workerIconByLabel,
  workerSubtextByLabel,
} from "./lib/workers"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
  isStreaming?: boolean
  reasoning?: string
}

type ModelChatMessage = {
  role: "assistant" | "user"
  content: string
}

type SaveSuggestion = {
  term: string
  instruction: string
  reason?: string
}

type LibraryEntry = {
  id: string
  term: string
  instruction: string
  reason?: string
}

type AssistantTurnResponse = {
  mode: "clarify" | "answer"
  message: string
  saveSuggestion?: SaveSuggestion | null
}

type ChatThread = {
  id: string
  title: string
  worker: string
  ageLabel: string
  messages: ChatMessage[]
  pendingLibrarySuggestion: SaveSuggestion | null
}

const quickActions = [
  {
    label: "New chat",
    icon: <Edit05 size={16} className="text-icon-secondary" />,
  },
  {
    label: "All workers",
    icon: <Star04 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Automations",
    icon: <Zap size={16} className="text-icon-secondary" />,
  },
  {
    label: "Usage",
    icon: <BarChart10 size={16} className="text-icon-secondary" />,
    rightIcon: <LinkExternal01 size={16} className="text-icon-secondary" />,
    showRightIconOnHover: true,
  },
  {
    label: "Saved items",
    icon: <Bookmark size={16} className="text-icon-secondary" />,
  },
]

const railMinRatio = 0.18
const railMaxRatio = 0.46
const contentMinRatio = 0.4
const contentMaxRatio = 0.82
const defaultRailExpandedRatio = 0.24
const dictionaryPromptDelayMs = 3000

const getClampedRailRatio = (ratio: number) => {
  const minAllowedRatio = Math.max(railMinRatio, 1 - contentMaxRatio)
  const maxAllowedRatio = Math.min(railMaxRatio, 1 - contentMinRatio)
  if (minAllowedRatio > maxAllowedRatio) {
    return minAllowedRatio
  }

  return Math.min(maxAllowedRatio, Math.max(minAllowedRatio, ratio))
}

const initialThreadTitles = [
  "Analyze refund intent drivers for last 30 days",
  "Coach plan for reducing first response time",
  "QA audit of escalations with policy violations",
  "Executive summary for weekly support leadership review",
  "Find recurring billing complaint patterns in chat transcripts",
  "Coach script improvements for de-escalation outcomes",
  "QA analyst report on CSAT drops by queue",
  "Executive summary of top customer pain points",
]

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const buildAssistantReply = (worker: string, prompt: string) =>
  `I am ${worker}. I can help break this down. For \"${prompt}\", tell me the time range and metric you want prioritized, and I will generate a focused analysis.`

const getThreadTitle = (prompt: string) => {
  const normalized = prompt.trim()
  if (normalized.length <= 52) {
    return normalized
  }

  return `${normalized.slice(0, 49)}...`
}

const createUserMessage = (content: string): ChatMessage => ({
  content,
  id: createId(),
  role: "user",
})

const createAssistantMessage = (content: string): ChatMessage => ({
  content,
  id: createId(),
  role: "assistant",
})

const createStreamingMessage = (id: string): ChatMessage => ({
  content: "",
  id,
  isStreaming: true,
  reasoning: "",
  role: "assistant",
})

const createResolvedAssistantMessage = (id: string, content: string, reasoning?: string): ChatMessage => ({
  content,
  id,
  isStreaming: false,
  reasoning,
  role: "assistant",
})

function ThinkingMessage() {
  return (
    <Shimmer as="p" className="text-14 font-semibold" duration={4} spread={2}>
      Thinking
    </Shimmer>
  )
}

const extractErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) {
    return ""
  }

  const raw = error.message.trim()
  if (!raw) {
    return ""
  }

  try {
    const parsed = JSON.parse(raw) as { error?: unknown; message?: unknown }
    if (typeof parsed.error === "string" && parsed.error.trim()) {
      return parsed.error.trim()
    }
    if (typeof parsed.message === "string" && parsed.message.trim()) {
      return parsed.message.trim()
    }
  } catch {
    // Keep raw error message when it is not JSON.
  }

  return raw
}

const toDisplayableAssistantError = (error: unknown) => {
  const parsedMessage = extractErrorMessage(error)
  const normalized = parsedMessage.toLowerCase()

  if (!parsedMessage) {
    return "I couldn't generate a response due to an unknown error. Please try again."
  }

  if (normalized.includes("failed to fetch") || normalized.includes("networkerror")) {
    return "I couldn't generate a response because the network request failed. Please check your connection and try again."
  }

  return parsedMessage
}

const moveThreadToTop = (threads: ChatThread[], threadId: string) => {
  const selectedIndex = threads.findIndex((thread) => thread.id === threadId)
  if (selectedIndex > 0) {
    const [thread] = threads.splice(selectedIndex, 1)
    threads.unshift(thread)
  }

  return threads
}

const seedWorkers = ["Search analyst", "Coach", "Executive summary worker"] as const

const getSeedWorker = (title: string, index: number) => {
  const normalized = title.toLowerCase()
  if (normalized.includes("executive summary")) {
    return "Executive summary worker"
  }

  if (normalized.includes("coach")) {
    return "Coach"
  }

  return seedWorkers[index % seedWorkers.length]
}

const createSeedThread = (title: string, index: number): ChatThread => {
  const worker = getSeedWorker(title, index)

  return {
    ageLabel: "1d",
    id: `seed-${index}`,
    messages: [createUserMessage(title), createAssistantMessage(buildAssistantReply(worker, title))],
    pendingLibrarySuggestion: null,
    title,
    worker,
  }
}

const normalizeSaveSuggestion = (suggestion: SaveSuggestion | null | undefined): SaveSuggestion | null => {
  if (!suggestion) {
    return null
  }

  const term = suggestion.term.trim()
  const instruction = suggestion.instruction.trim()
  const reason = suggestion.reason?.trim()

  if (!term || !instruction) {
    return null
  }

  return {
    instruction,
    reason: reason || undefined,
    term,
  }
}

const semanticQuestionRegex =
  /\b(mean|means|stand for|refers to|what is|what does|when you say|do you mean|interpret|clarify)\b/i
const transactionalKeywordRegex =
  /\b(last|previous|next|quarter|month|week|day|date|range|window|ytd|year[- ]to[- ]date|season|daily|weekly|monthly|time period|cadence)\b/i
const affirmativeRegex = /^(yes|yep|yeah|correct|right|exactly|that is right|that's right)\b/i

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim()
const stripWrapperQuotes = (value: string) => value.replace(/^[\s"'`]+|[\s"'`]+$/g, "").trim()
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const normalizeForCompare = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const normalizeSuggestionTerm = (rawTerm: string) => {
  const cleaned = collapseWhitespace(stripWrapperQuotes(rawTerm))
  if (!cleaned) {
    return ""
  }

  if (cleaned.length > 32 || /[.?!,:;]/.test(cleaned)) {
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

const normalizeSuggestionMeaning = (rawMeaning: string, term: string) => {
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
    .replace(/^(it|this|that)\s+(means|refers to|stands for|is)\s+/i, "")
    .replace(/^you should interpret (it|this|that) as\s+/i, "")
    .replace(/^it should be treated as\s+/i, "")

  cleaned = collapseWhitespace(stripWrapperQuotes(cleaned))
  if (!cleaned) {
    return ""
  }

  cleaned = cleaned.split(/\n/)[0]?.trim() ?? cleaned
  cleaned = cleaned.split(/[.?!]\s+/)[0]?.trim() ?? cleaned
  cleaned = collapseWhitespace(stripWrapperQuotes(cleaned))

  const words = cleaned.split(" ").filter(Boolean)
  if (words.length > 12) {
    cleaned = words.slice(0, 12).join(" ")
  }

  if (!cleaned || cleaned.length > 96) {
    return ""
  }

  return cleaned
}

const getCandidateTermFromClarification = (assistantQuestion: string, previousUserMessage: string) => {
  const quotedToken = assistantQuestion.match(/["']([A-Za-z][A-Za-z0-9_-]{1,24})["']/)?.[1]
  if (quotedToken) {
    return quotedToken
  }

  const abbreviationInQuestion = assistantQuestion.match(/\b[A-Z][A-Z0-9]{1,9}\b/g)?.[0]
  if (abbreviationInQuestion) {
    return abbreviationInQuestion
  }

  const abbreviationInUserMessage = previousUserMessage.match(/\b[A-Z][A-Z0-9]{1,9}\b/g)?.[0]
  if (abbreviationInUserMessage) {
    return abbreviationInUserMessage
  }

  return ""
}

const getMeaningFromClarificationQuestion = (assistantQuestion: string) => {
  const doYouMeanMatch = assistantQuestion.match(/\bdo you mean\s+(.+?)(?:\?|$)/i)?.[1]
  if (doYouMeanMatch) {
    return doYouMeanMatch.trim()
  }

  const interpretAsMatch =
    assistantQuestion.match(/\binterpret(?:\s+it)?\s+as\s+(.+?)(?:\?|$)/i)?.[1]
  if (interpretAsMatch) {
    return interpretAsMatch.replace(/\s+or\s+something\s+else$/i, "").trim()
  }

  const meanMatch =
    assistantQuestion.match(/\b(?:means?|refers to|stands for)\s+(.+?)(?:\?|$)/i)?.[1]
  if (meanMatch) {
    return meanMatch.trim()
  }

  return ""
}

const buildProvisionalLibrarySuggestion = ({
  assistantQuestion,
  previousUserMessage,
  userAnswer,
  dictionaryEntries,
}: {
  assistantQuestion: string
  previousUserMessage: string
  userAnswer: string
  dictionaryEntries: LibraryEntry[]
}) => {
  if (!assistantQuestion || !semanticQuestionRegex.test(assistantQuestion)) {
    return null
  }

  const term = normalizeSuggestionTerm(
    getCandidateTermFromClarification(assistantQuestion, previousUserMessage)
  )
  if (!term || transactionalKeywordRegex.test(term)) {
    return null
  }

  const explicitMeaning = affirmativeRegex.test(userAnswer)
    ? getMeaningFromClarificationQuestion(assistantQuestion)
    : userAnswer
  const meaning = normalizeSuggestionMeaning(explicitMeaning, term)
  if (!meaning || transactionalKeywordRegex.test(meaning)) {
    return null
  }

  if (normalizeForCompare(meaning) === normalizeForCompare(term)) {
    return null
  }

  const suggestion: SaveSuggestion = {
    instruction: `Interpret "${term}" as "${meaning}".`,
    reason: `You clarified what "${term}" means.`,
    term,
  }

  const alreadyInDictionary = dictionaryEntries.some(
    (entry) =>
      entry.term.toLowerCase() === suggestion.term.toLowerCase() &&
      entry.instruction.toLowerCase() === suggestion.instruction.toLowerCase()
  )

  return alreadyInDictionary ? null : suggestion
}

const getProvisionalLibrarySuggestion = ({
  messages,
  userAnswer,
  dictionaryEntries,
}: {
  messages: ChatMessage[]
  userAnswer: string
  dictionaryEntries: LibraryEntry[]
}) => {
  if (!userAnswer.trim()) {
    return null
  }

  let assistantQuestion = ""
  let previousUserMessage = ""

  for (let index = messages.length - 1; index >= 0; index -= 1) {
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

  if (!assistantQuestion) {
    return null
  }

  return buildProvisionalLibrarySuggestion({
    assistantQuestion,
    dictionaryEntries,
    previousUserMessage,
    userAnswer,
  })
}

function ThreadRow({
  title,
  worker,
  ageLabel,
  isSelected,
  onSelect,
}: {
  title: string
  worker: string
  ageLabel: string
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-auto w-full justify-between gap-8 rounded-lg px-12 py-6",
        isSelected
          ? "bg-surface-muted hover:bg-surface-muted"
          : "hover:bg-interactive-secondary"
      )}
      onClick={onSelect}
    >
      <span className="flex min-w-0 items-center gap-8">
        <img
          src={workerIconByLabel[worker] ?? "/ai-worker-avatar.svg"}
          alt={`${worker} icon`}
          className="h-16 w-16 shrink-0 object-contain"
        />
        <span className="min-w-0 truncate text-14 text-text-primary">{title}</span>
      </span>
      <span className="shrink-0 text-12 text-text-tertiary">{ageLabel}</span>
    </Button>
  )
}

function RailActionButton({
  label,
  icon,
  rightIcon,
  showRightIconOnHover = false,
  isCollapsed,
  onClick,
}: {
  label: string
  icon: ReactNode
  rightIcon?: ReactNode
  showRightIconOnHover?: boolean
  isCollapsed: boolean
  onClick?: () => void
}) {
  const rightIconNode = rightIcon ? (
    <span
      className={cn(
        "ml-auto",
        showRightIconOnHover
          ? "opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          : "opacity-100"
      )}
    >
      {rightIcon}
    </span>
  ) : undefined

  return (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon-sm" : "sm"}
      className={cn(isCollapsed ? "" : "group w-full justify-start")}
      iconLeft={icon}
      iconRight={isCollapsed ? undefined : rightIconNode}
      aria-label={label}
      onClick={onClick}
    >
      {!isCollapsed ? label : null}
    </Button>
  )
}

function DictionarySavePrompt({
  suggestion,
  onApprove,
  onReject,
}: {
  suggestion: SaveSuggestion
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <Card className="border-border-default bg-surface-page shadow-sm">
      <CardBody className="flex flex-col px-24 py-24">
        <p className="text-16 font-bold text-text-primary">
          Save this clarification to your dictionary.
        </p>
        <p className="mt-8 text-14 text-text-secondary">
          This will be applicable to everyone in your organization.
        </p>

        <div className="mt-20 rounded-lg border border-success-100 bg-surface-success-subtle px-12 py-10">
          <p className="text-14 text-text-primary">
            <span className="font-semibold text-text-primary">{suggestion.term}:</span>{" "}
            {suggestion.instruction}
          </p>
        </div>

        <div className="mt-20 flex items-center justify-end gap-8">
          <Button variant="secondary" size="default" type="button" onClick={onReject}>
            Reject
          </Button>
          <Button variant="default" size="default" type="button" onClick={onApprove}>
            Add to dictionary
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

type StreamEvent =
  | { type: "reasoning"; content: string }
  | { type: "text"; content: string }
  | { type: "finish"; mode: "clarify" | "answer"; saveSuggestion?: { term: string; instruction: string; reason?: string } | null }
  | { type: "error"; message: string }

const parseSSEEvents = (chunk: string): Array<StreamEvent | null> => {
  const events: Array<StreamEvent | null> = []
  const parts = chunk.split("\n\n")
  for (const part of parts) {
    const trimmed = part.trim()
    if (!trimmed || !trimmed.startsWith("data: ")) continue
    const data = trimmed.slice(6)
    try {
      events.push(JSON.parse(data) as StreamEvent)
    } catch {
      // skip unparseable events
    }
  }
  return events
}

export default function Page() {
  const workerTransitionDurationMs = 350

  const [isRailCollapsed, setIsRailCollapsed] = useState(false)
  const [railExpandedRatio, setRailExpandedRatio] = useState(() =>
    getClampedRailRatio(defaultRailExpandedRatio)
  )
  const [isRailResizing, setIsRailResizing] = useState(false)
  const [isCursorInCanvas, setIsCursorInCanvas] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [activeWorker, setActiveWorker] = useState(defaultWorker)
  const [isWorkerContentVisible, setIsWorkerContentVisible] = useState(true)
  const [promptValue, setPromptValue] = useState("")
  const [chatPromptValue, setChatPromptValue] = useState("")
  const [isAssistantResponding, setIsAssistantResponding] = useState(false)
  const [recentThreads, setRecentThreads] = useState<ChatThread[]>(() =>
    initialThreadTitles.map(createSeedThread)
  )
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [dictionaryEntries, setDictionaryEntries] = useState<LibraryEntry[]>([])
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [allowClarifyingAssumptions, setAllowClarifyingAssumptions] = useState(true)

  const workerSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const assistantAbortControllerRef = useRef<AbortController | null>(null)
  const librarySuggestionTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const conversationRef = useRef<HTMLDivElement | null>(null)
  const splitLayoutRef = useRef<HTMLDivElement | null>(null)

  const scrollConversationToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!conversationRef.current) {
          return
        }

        conversationRef.current.scrollTo({
          top: conversationRef.current.scrollHeight,
          behavior: "smooth",
        })
      })
    })
  }, [])

  const selectedThread = useMemo(
    () => recentThreads.find((thread) => thread.id === selectedThreadId) ?? null,
    [recentThreads, selectedThreadId]
  )

  const isChatView = selectedThread !== null
  const selectedThreadChatName = useMemo(
    () =>
      selectedThread?.messages.find((message) => message.role === "user")?.content ??
      selectedThread?.title ??
      "",
    [selectedThread]
  )

  const handleCanvasPointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleRailResizeStart = (event: MouseEvent<HTMLButtonElement>) => {
    if (isRailCollapsed) {
      return
    }

    event.preventDefault()

    if (splitLayoutRef.current) {
      const layoutBounds = splitLayoutRef.current.getBoundingClientRect()
      if (layoutBounds.width > 0) {
        const nextRatio = getClampedRailRatio((event.clientX - layoutBounds.left) / layoutBounds.width)
        setRailExpandedRatio(nextRatio)
      }
    }

    setIsRailResizing(true)
  }

  useEffect(() => {
    return () => {
      if (workerSwapTimerRef.current) {
        clearTimeout(workerSwapTimerRef.current)
      }

      if (assistantAbortControllerRef.current) {
        assistantAbortControllerRef.current.abort()
        assistantAbortControllerRef.current = null
      }

      Object.values(librarySuggestionTimersRef.current).forEach((timer) => {
        clearTimeout(timer)
      })
      librarySuggestionTimersRef.current = {}
    }
  }, [])

  useEffect(() => {
    if (!isRailResizing) {
      return
    }

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (isRailCollapsed || !splitLayoutRef.current) {
        return
      }

      const layoutBounds = splitLayoutRef.current.getBoundingClientRect()
      if (layoutBounds.width <= 0) {
        return
      }

      const nextRatio = getClampedRailRatio((event.clientX - layoutBounds.left) / layoutBounds.width)
      setRailExpandedRatio(nextRatio)
    }

    const handleMouseUp = () => {
      setIsRailResizing(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isRailCollapsed, isRailResizing])

  useEffect(() => {
    if (isRailCollapsed && isRailResizing) {
      setIsRailResizing(false)
    }
  }, [isRailCollapsed, isRailResizing])

  const handleWorkerSelect = (worker: string) => {
    if (worker === activeWorker) {
      return
    }

    if (workerSwapTimerRef.current) {
      clearTimeout(workerSwapTimerRef.current)
    }

    setIsWorkerContentVisible(false)
    workerSwapTimerRef.current = setTimeout(() => {
      setActiveWorker(worker)
      setIsWorkerContentVisible(true)
      workerSwapTimerRef.current = null
    }, workerTransitionDurationMs)
  }

  const getWorkerRevealClass = (visibleDelayClass: string) =>
    cn(
      "transition-all duration-300 ease-out",
      isWorkerContentVisible
        ? `opacity-100 translate-y-0 ${visibleDelayClass}`
        : "opacity-0 translate-y-8 delay-0"
    )

  const updateStreamingMessage = (
    threadId: string,
    messageId: string,
    updater: (message: ChatMessage) => ChatMessage
  ) => {
    setRecentThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (thread.id !== threadId) return thread
        return {
          ...thread,
          messages: thread.messages.map((message) =>
            message.id === messageId ? updater(message) : message
          ),
        }
      })
    )
  }

  const clearLibrarySuggestionTimer = (threadId: string) => {
    const timer = librarySuggestionTimersRef.current[threadId]
    if (!timer) {
      return
    }

    clearTimeout(timer)
    delete librarySuggestionTimersRef.current[threadId]
  }

  const scheduleThreadLibrarySuggestion = (
    threadId: string,
    suggestion: SaveSuggestion | null
  ) => {
    clearLibrarySuggestionTimer(threadId)

    if (!suggestion) {
      setRecentThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === threadId
            ? { ...thread, pendingLibrarySuggestion: null }
            : thread
        )
      )
      return
    }

    librarySuggestionTimersRef.current[threadId] = setTimeout(() => {
      setRecentThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === threadId
            ? { ...thread, pendingLibrarySuggestion: suggestion }
            : thread
        )
      )
      delete librarySuggestionTimersRef.current[threadId]
    }, dictionaryPromptDelayMs)
  }

  const handleStreamResponse = async (
    response: Response,
    threadId: string,
    assistantMessageId: string,
    accumulatedReasoning: { value: string }
  ) => {
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let sseBuffer = ""
    let finishEvent: StreamEvent | null = null

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      sseBuffer += decoder.decode(value, { stream: true })

      while (true) {
        const eventEnd = sseBuffer.indexOf("\n\n")
        if (eventEnd === -1) break

        const rawEvent = sseBuffer.slice(0, eventEnd)
        sseBuffer = sseBuffer.slice(eventEnd + 2)

        for (const event of parseSSEEvents(rawEvent + "\n\n")) {
          if (!event) continue

          if (event.type === "reasoning") {
            accumulatedReasoning.value += event.content
            const currentReasoning = accumulatedReasoning.value
            updateStreamingMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              reasoning: currentReasoning,
            }))
          } else if (event.type === "text") {
            updateStreamingMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              content: event.content,
              isStreaming: false,
            }))
          } else if (event.type === "finish") {
            finishEvent = event
          } else if (event.type === "error") {
            updateStreamingMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              content: event.message,
              isStreaming: false,
            }))
          }
        }
      }
    }

    return finishEvent
  }

  const handleJsonResponse = async (
    response: Response,
    threadId: string,
    assistantMessageId: string,
    {
      preservePendingLibrarySuggestion = false,
    }: {
      preservePendingLibrarySuggestion?: boolean
    } = {}
  ) => {
    const payload = (await response.json()) as AssistantTurnResponse
    const assistantReply = payload.message?.trim()
    if (!assistantReply) {
      throw new Error("Assistant returned an empty response.")
    }

    const pendingLibrarySuggestion =
      payload.mode === "answer" ? normalizeSaveSuggestion(payload.saveSuggestion) : null

    setRecentThreads((currentThreads) => {
      const updatedThreads = currentThreads.map((thread) => {
        if (thread.id !== threadId) return thread

        let found = false
        const updatedMessages = thread.messages.map((message) => {
          if (message.id !== assistantMessageId) return message
          found = true
          return createResolvedAssistantMessage(assistantMessageId, assistantReply)
        })

        return {
          ...thread,
          ageLabel: "now",
          messages: found
            ? updatedMessages
            : [...updatedMessages, createResolvedAssistantMessage(assistantMessageId, assistantReply)],
        }
      })

      return moveThreadToTop(updatedThreads, threadId)
    })

    if (!preservePendingLibrarySuggestion) {
      scheduleThreadLibrarySuggestion(threadId, pendingLibrarySuggestion)
    }
  }

  const requestAssistantReply = async ({
    threadId,
    worker,
    messages,
    libraryEntries,
    assistantMessageId: providedAssistantMessageId,
    shouldInsertStreamingMessage = true,
    initialPendingLibrarySuggestion = null,
  }: {
    threadId: string
    worker: string
    messages: ModelChatMessage[]
    libraryEntries: LibraryEntry[]
    assistantMessageId?: string
    shouldInsertStreamingMessage?: boolean
    initialPendingLibrarySuggestion?: SaveSuggestion | null
  }) => {
    if (assistantAbortControllerRef.current) {
      assistantAbortControllerRef.current.abort()
    }

    const controller = new AbortController()
    const assistantMessageId = providedAssistantMessageId ?? createId()
    const preservePendingLibrarySuggestion = Boolean(initialPendingLibrarySuggestion)
    assistantAbortControllerRef.current = controller
    setIsAssistantResponding(true)

    if (shouldInsertStreamingMessage) {
      setRecentThreads((currentThreads) => {
        const updatedThreads = currentThreads.map((thread) => {
          if (thread.id !== threadId) return thread
          return {
            ...thread,
            ageLabel: "now",
            messages: [...thread.messages, createStreamingMessage(assistantMessageId)],
            pendingLibrarySuggestion: null,
          }
        })

        return moveThreadToTop(updatedThreads, threadId)
      })
    }

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          allowClarifyingAssumptions,
          libraryEntries: libraryEntries
            .map((entry) => ({
              instruction: entry.instruction.trim(),
              term: entry.term.trim(),
            }))
            .filter((entry) => entry.term && entry.instruction),
          messages,
          worker,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Assistant reply failed with status ${response.status}.`)
      }

      const contentType = response.headers.get("Content-Type") ?? ""

      if (contentType.includes("text/event-stream") && response.body) {
        const accumulatedReasoning = { value: "" }
        const finishEvent = await handleStreamResponse(
          response,
          threadId,
          assistantMessageId,
          accumulatedReasoning
        )

        if (finishEvent && finishEvent.type === "finish") {
          const pendingLibrarySuggestion =
            finishEvent.mode === "answer"
              ? normalizeSaveSuggestion(finishEvent.saveSuggestion)
              : null

          if (!preservePendingLibrarySuggestion) {
            scheduleThreadLibrarySuggestion(threadId, pendingLibrarySuggestion)
          }
        }
      } else {
        await handleJsonResponse(response, threadId, assistantMessageId, {
          preservePendingLibrarySuggestion,
        })
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setRecentThreads((currentThreads) =>
          currentThreads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  messages: thread.messages.filter((message) => message.id !== assistantMessageId),
                }
              : thread
          )
        )
        return
      }

      const errorMessage = toDisplayableAssistantError(error)

      setRecentThreads((currentThreads) => {
        const updatedThreads = currentThreads.map((thread) => {
          if (thread.id !== threadId) return thread

          let found = false
          const updatedMessages = thread.messages.map((message) => {
            if (message.id !== assistantMessageId) return message
            found = true
            return createResolvedAssistantMessage(assistantMessageId, errorMessage)
          })

          return {
            ...thread,
            ageLabel: "now",
            messages: found
              ? updatedMessages
              : [...updatedMessages, createResolvedAssistantMessage(assistantMessageId, errorMessage)],
            pendingLibrarySuggestion: thread.pendingLibrarySuggestion,
          }
        })

        return moveThreadToTop(updatedThreads, threadId)
      })
    } finally {
      if (assistantAbortControllerRef.current === controller) {
        assistantAbortControllerRef.current = null
        setIsAssistantResponding(false)
      }
    }
  }

  const createChatFromPrompt = (rawPrompt: string) => {
    const normalizedPrompt = rawPrompt.trim()
    if (!normalizedPrompt || isAssistantResponding) {
      return
    }

    const newThreadId = createId()
    const assistantMessageId = createId()
    const threadWorker = activeWorker

    const newThread: ChatThread = {
      ageLabel: "now",
      id: newThreadId,
      messages: [createUserMessage(normalizedPrompt), createStreamingMessage(assistantMessageId)],
      pendingLibrarySuggestion: null,
      title: getThreadTitle(normalizedPrompt),
      worker: threadWorker,
    }

    setRecentThreads((currentThreads) => [newThread, ...currentThreads])
    setSelectedThreadId(newThreadId)
    setPromptValue("")
    setChatPromptValue("")
    scrollConversationToBottom()
    void requestAssistantReply({
      threadId: newThreadId,
      worker: threadWorker,
      messages: [{ role: "user", content: normalizedPrompt }],
      libraryEntries: dictionaryEntries,
      assistantMessageId,
      shouldInsertStreamingMessage: false,
    })
  }

  const sendMessageToActiveThread = (rawPrompt: string) => {
    if (!selectedThread || isAssistantResponding) {
      return
    }

    const normalizedPrompt = rawPrompt.trim()
    if (!normalizedPrompt) {
      return
    }

    const targetThreadId = selectedThread.id
    const threadWorker = selectedThread.worker
    const nextModelMessages: ModelChatMessage[] = [
      ...selectedThread.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      { role: "user", content: normalizedPrompt },
    ]
    const provisionalLibrarySuggestion = getProvisionalLibrarySuggestion({
      dictionaryEntries,
      messages: selectedThread.messages,
      userAnswer: normalizedPrompt,
    })

    setRecentThreads((currentThreads) => {
      const updatedThreads = currentThreads.map((thread) => {
        if (thread.id !== targetThreadId) {
          return thread
        }

        return {
          ...thread,
          ageLabel: "now",
          messages: [
            ...thread.messages,
            createUserMessage(normalizedPrompt),
          ],
          pendingLibrarySuggestion: null,
          title: getThreadTitle(thread.messages[0]?.content ?? normalizedPrompt),
        }
      })

      return moveThreadToTop(updatedThreads, targetThreadId)
    })
    scheduleThreadLibrarySuggestion(targetThreadId, provisionalLibrarySuggestion)

    setChatPromptValue("")
    scrollConversationToBottom()
    void requestAssistantReply({
      threadId: targetThreadId,
      worker: threadWorker,
      messages: nextModelMessages,
      libraryEntries: dictionaryEntries,
      initialPendingLibrarySuggestion: provisionalLibrarySuggestion,
    })
  }

  const handleBackToWorkerSelection = () => {
    if (assistantAbortControllerRef.current) {
      assistantAbortControllerRef.current.abort()
      assistantAbortControllerRef.current = null
    }

    setIsAssistantResponding(false)
    setSelectedThreadId(null)
    setChatPromptValue("")
  }

  const handleThreadSelect = (threadId: string) => {
    setSelectedThreadId(threadId)
    setChatPromptValue("")

    const selected = recentThreads.find((thread) => thread.id === threadId)
    if (selected?.worker) {
      setActiveWorker(selected.worker)
    }
  }

  const clearThreadLibrarySuggestion = (threadId: string) => {
    clearLibrarySuggestionTimer(threadId)
    setRecentThreads((currentThreads) =>
      currentThreads.map((thread) =>
        thread.id === threadId
          ? { ...thread, pendingLibrarySuggestion: null }
          : thread
      )
    )
  }

  const handleApproveLibrarySuggestion = () => {
    if (!selectedThread) {
      return
    }

    const suggestion = normalizeSaveSuggestion(selectedThread.pendingLibrarySuggestion)
    if (!suggestion) {
      clearThreadLibrarySuggestion(selectedThread.id)
      return
    }

    const isExistingEntry = dictionaryEntries.some(
      (entry) => entry.term.toLowerCase() === suggestion.term.toLowerCase()
    )

    setDictionaryEntries((currentEntries) => {
      const existingIndex = currentEntries.findIndex(
        (entry) => entry.term.toLowerCase() === suggestion.term.toLowerCase()
      )

      const nextEntry: LibraryEntry = {
        id: existingIndex >= 0 ? currentEntries[existingIndex].id : createId(),
        instruction: suggestion.instruction,
        reason: suggestion.reason,
        term: suggestion.term,
      }

      if (existingIndex >= 0) {
        const updatedEntries = [...currentEntries]
        updatedEntries[existingIndex] = nextEntry
        return updatedEntries
      }

      return [nextEntry, ...currentEntries]
    })

    toast({
      title: isExistingEntry ? "Dictionary entry updated" : "Added to dictionary",
      description: suggestion.term,
    })

    clearThreadLibrarySuggestion(selectedThread.id)
  }

  const handleRejectLibrarySuggestion = () => {
    if (!selectedThread) {
      return
    }

    clearThreadLibrarySuggestion(selectedThread.id)
  }

  const handleRemoveDictionaryEntry = (entryId: string) => {
    setDictionaryEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    )
  }

  const handleAddDictionaryEntry = () => {
    setDictionaryEntries((currentEntries) => [
      ...currentEntries,
      {
        id: createId(),
        instruction: "",
        term: "",
      },
    ])
  }

  const handleDictionaryEntryChange = (
    entryId: string,
    field: "term" | "instruction",
    value: string
  ) => {
    setDictionaryEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              [field]: value,
            }
          : entry
      )
    )
  }

  return (
    <div className={cn("flex h-screen bg-surface-page", isRailResizing && "cursor-col-resize select-none")}>
      <MainNav activeItem="AI workers" />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar avatarInitial="JD" avatarColor="var(--color-secondary-purple-600)" />

        <main className="flex-1 overflow-auto">
          <div ref={splitLayoutRef} className="flex h-full min-h-0 overflow-hidden bg-surface-page">
            <aside
              style={isRailCollapsed ? undefined : { width: `${railExpandedRatio * 100}%` }}
              className={cn(
                "relative flex h-full min-h-0 shrink-0 flex-col bg-surface-subtle pb-20 pt-12",
                isRailResizing ? "transition-none" : "transition-[width] duration-300 ease-in-out",
                isRailCollapsed ? "w-56 px-12" : "px-8"
              )}
            >
              <div className="flex items-center justify-start">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(!isRailCollapsed && "ml-4")}
                  aria-label={isRailCollapsed ? "Expand panel" : "Collapse panel"}
                  onClick={() => setIsRailCollapsed((prev) => !prev)}
                  iconLeft={<LayoutLeft size={16} className="text-icon-secondary" />}
                />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {quickActions.map((item) => (
                  <RailActionButton
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    rightIcon={item.rightIcon}
                    showRightIconOnHover={item.showRightIconOnHover}
                    isCollapsed={isRailCollapsed}
                    onClick={item.label === "New chat" ? handleBackToWorkerSelection : undefined}
                  />
                ))}
              </div>

              <div
                className={cn(
                  "mt-16 min-h-0 flex-1 overflow-hidden transition-opacity duration-200 ease-in-out",
                  isRailCollapsed ? "pointer-events-none opacity-0" : "opacity-100"
                )}
              >
                <div className="h-full overflow-auto">
                  <p className="mb-8 px-8 text-12 text-text-tertiary">Recent chats</p>
                  <div className="mt-8 space-y-2">
                    {recentThreads.map((thread) => (
                      <ThreadRow
                        key={thread.id}
                        title={thread.title}
                        worker={thread.worker}
                        ageLabel={thread.ageLabel}
                        isSelected={thread.id === selectedThreadId}
                        onSelect={() => handleThreadSelect(thread.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex flex-col gap-4">
                  <RailActionButton
                    label="Dictionary"
                    icon={<LayersThree02 size={16} className="text-icon-secondary" />}
                    isCollapsed={isRailCollapsed}
                    onClick={() => setIsDictionaryOpen(true)}
                  />
                  <RailActionButton
                    label="Preferences"
                    icon={<Sliders04 size={16} className="text-icon-secondary" />}
                    isCollapsed={isRailCollapsed}
                    onClick={() => setIsPreferencesOpen(true)}
                  />
                </div>
              </div>

              {!isRailCollapsed ? (
                <button
                  type="button"
                  aria-label="Resize panel width"
                  aria-orientation="vertical"
                  className={cn(
                    "group absolute bottom-0 right-0 top-0 flex w-8 translate-x-1/2 cursor-col-resize items-center justify-center bg-transparent"
                  )}
                  onMouseDown={handleRailResizeStart}
                >
                  <span
                    className={cn(
                      "h-64 w-2 rounded-full transition-colors duration-150",
                      isRailResizing ? "bg-border-focus" : "bg-border-subtle group-hover:bg-border-strong"
                    )}
                  />
                </button>
              ) : null}
            </aside>

            <section
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-l border-border-subtle bg-surface-page"
              onMouseMove={isChatView ? undefined : handleCanvasPointerMove}
              onMouseEnter={isChatView ? undefined : () => setIsCursorInCanvas(true)}
              onMouseLeave={isChatView ? undefined : () => setIsCursorInCanvas(false)}
            >
              {isChatView && selectedThread ? (
                <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                  <div className="bg-surface-card px-24 py-16">
                    <div className="mx-auto flex w-full max-w-720 items-center gap-12">
                      <img
                        src={workerIconByLabel[selectedThread.worker] ?? "/ai-worker-avatar.svg"}
                        alt={`${selectedThread.worker} icon`}
                        className="h-32 w-32 object-contain"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-14 font-bold text-text-primary">{selectedThreadChatName}</p>
                        <p className="truncate text-12 text-text-secondary">{selectedThread.worker}</p>
                      </div>
                    </div>
                  </div>

                  <Conversation ref={conversationRef} className="min-h-0 flex-1">
                    <ConversationContent className="mx-auto w-full max-w-720 gap-32 py-24">
                      {selectedThread.messages.map((message) => (
                        <Message key={message.id} from={message.role}>
                          <MessageContent
                            className={cn(
                              message.role === "user"
                                ? "ml-auto w-fit max-w-11/12 rounded-3xl bg-surface-muted px-16 py-12 text-text-primary"
                                : "w-full rounded-none border-none bg-transparent px-0 py-0 text-text-primary"
                            )}
                          >
                            {message.isStreaming && message.role === "assistant" ? <ThinkingMessage /> : null}
                            {!message.isStreaming && message.content ? (
                              <MessageResponse className={message.role === "user" ? "w-auto" : "w-full"}>
                                {message.content}
                              </MessageResponse>
                            ) : null}
                          </MessageContent>
                        </Message>
                      ))}
                    </ConversationContent>

                    <ConversationScrollButton />
                  </Conversation>

                  <div className="bg-surface-card px-24 pb-40 pt-16">
                    {selectedThread.pendingLibrarySuggestion ? (
                      <div className="mx-auto mb-12 w-full max-w-720">
                        <DictionarySavePrompt
                          suggestion={selectedThread.pendingLibrarySuggestion}
                          onApprove={handleApproveLibrarySuggestion}
                          onReject={handleRejectLibrarySuggestion}
                        />
                      </div>
                    ) : null}

                    <form
                      className="mx-auto w-full max-w-720 rounded-xl border border-border-default bg-surface-page px-12 py-8 shadow-sm"
                      onSubmit={(event) => {
                        event.preventDefault()
                        sendMessageToActiveThread(chatPromptValue)
                      }}
                    >
                      <Textarea
                        value={chatPromptValue}
                        onChange={(event) => setChatPromptValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault()
                            sendMessageToActiveThread(chatPromptValue)
                          }
                        }}
                        placeholder={`Ask ${selectedThread.worker} anything, @ to add files, / for commands`}
                        className="h-72 min-h-72 resize-none border-none bg-transparent px-0 py-8 text-14 text-text-primary placeholder:text-text-tertiary focus:border-none focus:shadow-none hover:border-none"
                      />

                      <div className="mt-8 flex items-center justify-between gap-12 pt-8">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Add context"
                            iconLeft={<Plus size={16} className="text-icon-secondary" />}
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Voice input"
                            iconLeft={<Microphone01 size={16} className="text-icon-secondary" />}
                          />

                          <Button
                            variant="default"
                            size="icon-sm"
                            type="submit"
                            aria-label="Send message"
                            disabled={!chatPromptValue.trim() || isAssistantResponding}
                            iconLeft={
                              <ArrowUp
                                size={16}
                                className={cn(
                                  !chatPromptValue.trim() || isAssistantResponding
                                    ? "text-icon-tertiary"
                                    : "text-icon-primary"
                                )}
                              />
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pointer-events-none absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-surface-page opacity-100" />

                    <div
                      className={cn(
                        "absolute h-256 w-256 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-brand-subtle opacity-60 blur-3xl transition-opacity duration-300",
                        isCursorInCanvas ? "opacity-100" : "opacity-0"
                      )}
                      style={{ left: cursorPosition.x, top: cursorPosition.y }}
                    />
                  </div>

                  <div
                    className={cn(
                      "relative z-10 flex flex-1 items-center justify-center px-24",
                      !isWorkerContentVisible && "pointer-events-none"
                    )}
                  >
                    <div className="flex w-full max-w-720 flex-col items-center gap-12 text-center">
                      <img
                        src={workerIconByLabel[activeWorker] ?? "/ai-worker-avatar.svg"}
                        alt={`${activeWorker} icon`}
                        className={cn("h-48 w-48 object-contain", getWorkerRevealClass("delay-0"))}
                      />
                      <div className={cn("flex flex-col items-center", getWorkerRevealClass("delay-100"))}>
                        <p className="text-24 font-bold text-text-primary">{activeWorker}</p>
                        <p className="mx-auto mt-8 w-full max-w-360 break-words text-14 text-text-secondary">
                          {workerSubtextByLabel[activeWorker]}
                        </p>
                      </div>

                      <div className={cn("mt-32 flex w-full flex-col items-center gap-y-8 text-left", getWorkerRevealClass("delay-300"))}>
                        {workerAlternativeRows.map((row, rowIndex) => (
                          <div key={`worker-row-${rowIndex}`} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8">
                            {row.map((worker) => (
                              <Button
                                key={worker}
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleWorkerSelect(worker)}
                                className={cn(
                                  "h-auto shrink-0 rounded-full border py-8 pl-10 pr-12 backdrop-blur-md",
                                  worker === activeWorker
                                    ? "border-primary-brand-100 bg-primary-brand-50 hover:bg-primary-brand-50 active:bg-primary-brand-50"
                                    : "border-border-subtle bg-surface-card/60 hover:bg-surface-card/60"
                                )}
                              >
                                <span className="flex items-center gap-8">
                                  <img
                                    src={workerIconByLabel[worker] ?? "/ai-worker-avatar.svg"}
                                    alt={`${worker} icon`}
                                    className="h-16 w-16 object-contain"
                                  />
                                  <span
                                    className={cn(
                                      "whitespace-nowrap text-12",
                                      worker === activeWorker
                                        ? "font-semibold text-text-brand"
                                        : "font-medium text-text-primary"
                                    )}
                                  >
                                    {worker}
                                  </span>
                                </span>
                              </Button>
                            ))}
                          </div>
                        ))}
                      </div>

                      <Button variant="ghost" size="sm" className={cn("mt-12", getWorkerRevealClass("delay-500"))}>
                        Browse all workers
                      </Button>
                    </div>
                  </div>

                  <div className="relative z-10 px-24 pb-40">
                    <form
                      className="mx-auto mt-12 w-full max-w-720 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md"
                      onSubmit={(event) => {
                        event.preventDefault()
                        createChatFromPrompt(promptValue)
                      }}
                    >
                      <Textarea
                        value={promptValue}
                        onChange={(event) => setPromptValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault()
                            createChatFromPrompt(promptValue)
                          }
                        }}
                        placeholder={`Ask ${activeWorker} anything, @ to add files, / for commands`}
                        className="h-72 min-h-72 resize-none border-none bg-transparent px-0 py-8 text-14 text-text-primary placeholder:text-text-tertiary focus:border-none focus:shadow-none hover:border-none"
                      />

                      <div className="mt-8 flex items-center justify-between gap-12 pt-8">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Add context"
                            iconLeft={<Plus size={16} className="text-icon-secondary" />}
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Voice input"
                            iconLeft={<Microphone01 size={16} className="text-icon-secondary" />}
                          />

                          <Button
                            variant="default"
                            size="icon-sm"
                            type="submit"
                            aria-label="Send message"
                            disabled={!promptValue.trim() || isAssistantResponding}
                            iconLeft={
                              <ArrowUp
                                size={16}
                                className={cn(
                                  !promptValue.trim() || isAssistantResponding
                                    ? "text-icon-tertiary"
                                    : "text-icon-primary"
                                )}
                              />
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </section>
          </div>
        </main>

        <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
          <DialogContent size="sm">
            <DialogHeader description="Manage your personal preferences for AI workers">
              Preferences
            </DialogHeader>
            <DialogBody className="pb-24 pt-12">
              <ToggleWithLabel
                checked={allowClarifyingAssumptions}
                onCheckedChange={(checked) => setAllowClarifyingAssumptions(checked === true)}
                label="Allow AI workers to clarify assumptions"
                subtext="AI workers ask for clarification when details are missing or unclear, instead of making assumptions."
              />
            </DialogBody>
          </DialogContent>
        </Dialog>

        <Dialog open={isDictionaryOpen} onOpenChange={setIsDictionaryOpen}>
          <DialogContent size="lg">
            <DialogHeader description="Saved terms and clarifications reused across chats">
              Dictionary
            </DialogHeader>
            <DialogBody className="flex min-h-0 flex-col overflow-hidden pb-24 pt-12">
              {dictionaryEntries.length === 0 ? (
                <div className="min-h-0 flex-1">
                  <EmptyState
                    icon={<LayersThree02 />}
                    title="No dictionary entries yet"
                    description="Approve a clarification or add one manually to save it here."
                    className="h-256 rounded-lg border border-border-default bg-surface-page"
                  />
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-auto pr-4">
                  {dictionaryEntries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-stretch overflow-hidden rounded-lg border border-border-default bg-surface-page"
                    >
                      <div className="grid min-w-0 flex-1 grid-cols-10">
                        <div className="col-span-3 min-w-0">
                          <Input
                            value={entry.term}
                            onChange={(event) =>
                              handleDictionaryEntryChange(entry.id, "term", event.target.value)
                            }
                            placeholder="Title"
                            aria-label={`Dictionary title ${index + 1}`}
                            className="min-w-0 rounded-none border-0 bg-transparent focus:border-0 focus:shadow-none hover:border-0"
                          />
                        </div>
                        <div className="col-span-7 min-w-0 border-l border-border-default">
                          <Input
                            value={entry.instruction}
                            onChange={(event) =>
                              handleDictionaryEntryChange(entry.id, "instruction", event.target.value)
                            }
                            placeholder="Definition"
                            aria-label={`Dictionary definition ${index + 1}`}
                            className="min-w-0 rounded-none border-0 bg-transparent focus:border-0 focus:shadow-none hover:border-0"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-lg"
                        type="button"
                        className="h-40 w-40 rounded-none border-l border-border-default"
                        aria-label={`Remove dictionary entry ${index + 1}`}
                        onClick={() => handleRemoveDictionaryEntry(entry.id)}
                        iconLeft={<X size={16} className="text-icon-secondary" />}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-16">
                <Button
                  variant="secondary"
                  size="default"
                  type="button"
                  iconLeft={<Plus size={16} className="text-icon-secondary" />}
                  onClick={handleAddDictionaryEntry}
                >
                  Add
                </Button>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}
