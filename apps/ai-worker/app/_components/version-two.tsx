"use client"

import { type MouseEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Card, CardBody } from "@level/ui/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu"
import { EmptyState } from "@level/ui/components/ui/empty-state"
import { Input } from "@level/ui/components/ui/input"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@level/ui/components/ui/modal"
import { Tabs, TabsContent, NeutralTabsList, NeutralTabsTrigger } from "@level/ui/components/ui/tabs"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { ToggleWithLabel } from "@level/ui/components/ui/toggle-with-label"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import { Check, Star, StarOff } from "lucide-react"
import {
  AlertTriangle,
  ArrowNarrowLeft,
  ArrowUp,
  ChevronDown,
  DotsVertical,
  Edit05,
  LayoutLeft,
  LayersThree02,
  Microphone01,
  Play,
  PlayCircle,
  Plus,
  SearchMd,
  PuzzlePiece01,
  Sliders04,
  Star04,
  Trash02,
  User01,
  X,
  Zap,
} from "@level/ui/components/icons"
import { GuidedFlowCard } from "../components/guided-flow-card"
import { PluginsPage } from "../components/plugins-page"
import { ConnectorActionCard, type ToolCallData, type ResolvedRecipient } from "../components/ai-elements/connector-action-card"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../components/ai-elements/conversation"
import { Message, MessageContent, MessageResponse } from "../components/ai-elements/message"
import {
  allSystemWorkerLabels,
  customWorkers,
  defaultWorker,
  getWorkerInputMode,
  insightsWorkerConfig,
  workerAlternativeRows,
  workerAuthorByLabel,
  workerIconByLabel,
  workerSubtextByLabel,
} from "../lib/workers"
import { MentionComposer, type MentionComposerHandle } from "../components/mention-composer"
import { ReasoningBlock } from "../components/ai-elements/reasoning"
import { OrchestrationView } from "../components/ai-elements/orchestration-view"
import { WorkerIconStack } from "../components/worker-icon-stack"
import { CoachForm } from "../components/coach-form"
import { TeamAnalystForm } from "../components/team-analyst-form"
import { InsightsWorkerLanding } from "../components/insights-worker-landing"
import {
  type GuidedFlowPayload,
  type GuidedFlowSubmission,
  formatGuidedFlowSubmission,
  hasGuidedFlowBlock,
  parseGuidedFlowMessage,
} from "../lib/guided-flow"

type ToolCallEntry = {
  id: string
  toolName: string
  args: Record<string, string>
  status: "pending" | "sending" | "approved" | "rejected" | "error"
  errorMessage?: string
  resolvedRecipient?: ResolvedRecipient
}

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
  isStreaming?: boolean
  reasoning?: string
  reasoningDone?: boolean
  reasoningDurationSeconds?: number
  orchestration?: OrchestrationState
  hidden?: boolean
  toolCalls?: ToolCallEntry[]
  guidedFlowState?:
    | {
        status: "cancelled"
      }
    | {
        status: "submitted"
        submission: GuidedFlowSubmission
      }
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
  isFavorite?: boolean
  title: string
  worker: string | null
  updatedAt: string
  messages: ChatMessage[]
  pendingLibrarySuggestion: SaveSuggestion | null
}

const MENTION_MARKER = "\uFFF9"
const MENTION_END = "\uFFFA"

function getThreadWorkers(thread: ChatThread): string[] {
  const workers = new Set<string>()
  if (thread.worker) workers.add(thread.worker)
  for (const msg of thread.messages) {
    if (msg.role !== "user") continue
    const regex = new RegExp(`${MENTION_MARKER}@(.+?)${MENTION_END}`, "g")
    let match: RegExpExecArray | null
    while ((match = regex.exec(msg.content)) !== null) {
      workers.add(match[1])
    }
  }
  return Array.from(workers)
}

type QuickAction = {
  label: string
  icon: ReactNode
  rightIcon?: ReactNode
  showRightIconOnHover?: boolean
}

const quickActions: QuickAction[] = [
  {
    label: "New chat",
    icon: <Edit05 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Automations",
    icon: <Zap size={16} className="text-icon-secondary" />,
  },
  {
    label: "Context & Rules",
    icon: <LayersThree02 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Plugins",
    icon: <PuzzlePiece01 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Preferences",
    icon: <Sliders04 size={16} className="text-icon-secondary" />,
  },
]

const getCustomWorkerIcon = (iconName: string, color: string, size = 14) => {
  switch (iconName) {
    case "alert-triangle":
      return <AlertTriangle size={size} color={color} />
    case "search":
      return <SearchMd size={size} color={color} />
    case "user":
      return <User01 size={size} color={color} />
    default:
      return <Star04 size={size} color={color} />
  }
}

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

type SeedThreadConfig = {
  title: string
  daysAgo: number
  minutesAgo?: number
  extraMentions?: string[]
}

const initialThreadSeeds: SeedThreadConfig[] = [
  {
    title: "Analyze refund intent drivers for last 30 days",
    daysAgo: 0,
  },
  {
    title: "Coach plan for reducing first response time",
    daysAgo: 1,
    extraMentions: ["QA analyst", "Team analyst"],
  },
  {
    title: "QA audit of escalations with policy violations",
    daysAgo: 1,
    minutesAgo: 45,
  },
  {
    title: "Executive summary for weekly support leadership review",
    daysAgo: 2,
    extraMentions: ["VoC analyst"],
  },
  {
    title: "Find recurring billing complaint patterns in chat transcripts",
    daysAgo: 3,
    extraMentions: ["Sentiment insights worker"],
  },
  {
    title: "Coach script improvements for de-escalation outcomes",
    daysAgo: 4,
  },
  {
    title: "QA analyst report on CSAT drops by queue",
    daysAgo: 5,
    extraMentions: ["iCSAT insights worker", "Team analyst"],
  },
  {
    title: "Executive summary of top customer pain points",
    daysAgo: 6,
  },
  {
    title: "Design QA case review for high-risk escalations",
    daysAgo: 7,
    extraMentions: ["Coach"],
  },
  {
    title: "Understand AI deflection trends by support channel",
    daysAgo: 8,
  },
  {
    title: "Understand QA failure reasons in onboarding queue",
    daysAgo: 9,
    extraMentions: ["Resolution insights worker", "Product gaps analyst", "VoC analyst"],
  },
  {
    title: "Check level AI worker handoff quality",
    daysAgo: 10,
  },
  {
    title: "Analyze customer objection drivers in renewals",
    daysAgo: 12,
  },
]

type ChatRecencyBucket = "today" | "yesterday" | "older"

const getNowTimestamp = () => new Date().toISOString()

const getStartOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const getThreadRecencyBucket = (updatedAt: string, now = new Date()): ChatRecencyBucket => {
  const updatedDate = new Date(updatedAt)
  if (Number.isNaN(updatedDate.getTime())) {
    return "older"
  }

  const todayStart = getStartOfDay(now)
  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)

  if (updatedDate >= todayStart) {
    return "today"
  }

  if (updatedDate >= yesterdayStart) {
    return "yesterday"
  }

  return "older"
}

const getThreadRecencyLabel = (bucket: ChatRecencyBucket) => {
  if (bucket === "today") {
    return "Today"
  }

  if (bucket === "yesterday") {
    return "Yesterday"
  }

  return "Older"
}

const formatThreadAgeLabel = (updatedAt: string, now = new Date()) => {
  const updatedDate = new Date(updatedAt)
  if (Number.isNaN(updatedDate.getTime())) {
    return ""
  }

  const diffMs = Math.max(0, now.getTime() - updatedDate.getTime())
  const diffMinutes = Math.floor(diffMs / 60000)
  if (diffMinutes < 1) {
    return "now"
  }

  const bucket = getThreadRecencyBucket(updatedAt, now)
  if (bucket === "today") {
    if (diffMinutes < 60) {
      return `${diffMinutes}m`
    }

    return `${Math.max(1, Math.floor(diffMinutes / 60))}h`
  }

  return `${Math.max(1, Math.floor(diffMs / 86400000))}d`
}

const createSeedTimestamp = ({
  daysAgo,
  minutesAgo = 0,
}: {
  daysAgo: number
  minutesAgo?: number
}) => {
  const timestamp = new Date()
  timestamp.setDate(timestamp.getDate() - daysAgo)
  timestamp.setMinutes(timestamp.getMinutes() - minutesAgo)
  return timestamp.toISOString()
}

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const buildAssistantReply = (worker: string, prompt: string) =>
  `I am ${worker}. I can help break this down. For \"${prompt}\", tell me the time range and metric you want prioritized, and I will generate a focused analysis.`

const stripMentions = (text: string) =>
  text.replace(new RegExp(`${MENTION_MARKER}@[^${MENTION_END}]+${MENTION_END}`, "g"), "").replace(/\s+/g, " ").trim()

const getThreadTitle = (prompt: string) => {
  const normalized = stripMentions(prompt)
  if (normalized.length <= 52) {
    return normalized
  }

  return `${normalized.slice(0, 49)}...`
}

const createUserMessage = (
  content: string,
  { hidden = false }: { hidden?: boolean } = {}
): ChatMessage => ({
  content,
  hidden,
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

const createSeedThread = (
  { title, daysAgo, minutesAgo = 0, extraMentions }: SeedThreadConfig,
  index: number
): ChatThread => {
  const worker = getSeedWorker(title, index)
  let userContent = title
  if (extraMentions?.length) {
    const mentions = extraMentions.map((w) => `${MENTION_MARKER}@${w}${MENTION_END}`).join(" ")
    userContent = `${mentions} ${title}`
  }

  return {
    id: `seed-${index}`,
    isFavorite: false,
    messages: [createUserMessage(userContent), createAssistantMessage(buildAssistantReply(worker, title))],
    pendingLibrarySuggestion: null,
    title,
    updatedAt: createSeedTimestamp({ daysAgo, minutesAgo }),
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

  if (hasGuidedFlowBlock(assistantQuestion)) {
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
  threadId,
  title,
  workers,
  ageLabel,
  isFavorite = false,
  isSelected,
  onSelect,
  onRename,
  onToggleFavorite,
  onDelete,
}: {
  threadId: string
  title: string
  workers: string[]
  ageLabel: string
  isFavorite?: boolean
  isSelected: boolean
  onSelect: () => void
  onRename: (threadId: string) => void
  onToggleFavorite: (threadId: string) => void
  onDelete: (threadId: string) => void
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-lg pr-4",
        isSelected ? "bg-surface-muted" : "hover:bg-interactive-secondary"
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-auto min-w-0 flex-1 justify-start gap-8 rounded-lg bg-transparent px-12 py-6 hover:bg-transparent"
        onClick={onSelect}
      >
        <WorkerIconStack workers={workers} size="sm" />
        <span className="min-w-0 truncate text-14 text-text-primary">{title}</span>
      </Button>

      <div className="relative h-32 w-32 shrink-0">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-12 text-text-tertiary opacity-100 transition-opacity duration-150 group-hover:opacity-0"
          )}
        >
          {ageLabel}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100"
              )}
              aria-label={`Open chat actions for ${title}`}
              iconLeft={<DotsVertical size={16} className="text-icon-secondary" />}
              onClick={(event) => event.stopPropagation()}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => {
                onRename(threadId)
              }}
            >
              <Edit05 size={16} />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                onToggleFavorite(threadId)
              }}
            >
              {isFavorite ? <StarOff size={16} /> : <Star size={16} />}
              {isFavorite ? "Remove favorite" : "Favorite"}
            </DropdownMenuItem>
            <DropdownMenuItem
              destructive
              onSelect={() => {
                onDelete(threadId)
              }}
            >
              <Trash02 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function ThreadSearchResultRow({
  title,
  workers,
  ageLabel,
  isFavorite = false,
  isSelected,
  onSelect,
}: {
  title: string
  workers: string[]
  ageLabel: string
  isFavorite?: boolean
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      className={cn(
        "h-auto w-full justify-start gap-10 rounded-lg px-10 py-8",
        isSelected ? "bg-surface-muted hover:bg-surface-muted" : "hover:bg-interactive-secondary"
      )}
      onClick={onSelect}
    >
      <WorkerIconStack workers={workers} size="sm" />
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-6">
          <span className="truncate text-14 font-semibold text-text-primary">{title}</span>
          {isFavorite ? <Star size={14} className="shrink-0 text-icon-secondary" /> : null}
        </span>
      </span>

      <span className="shrink-0 text-12 text-text-secondary">{ageLabel}</span>
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

type WorkerCall = {
  workerId: number
  worker: string
  question: string
  status: "pending" | "running" | "done"
  reasoning: string
  response: string
  durationSeconds?: number
}

type OrchestrationState = {
  workers: WorkerCall[]
  planningReasoning: string
  planningDone: boolean
  planningDurationSeconds?: number
}

type StreamEvent =
  | { type: "reasoning"; content: string }
  | { type: "reasoning_done" }
  | { type: "text"; content: string }
  | { type: "finish"; mode: "clarify" | "answer"; saveSuggestion?: { term: string; instruction: string; reason?: string } | null; reasoningDurationSeconds?: number }
  | { type: "error"; message: string }
  | { type: "planning_reasoning"; content: string }
  | { type: "planning_done"; durationSeconds?: number }
  | { type: "orchestration_plan"; workers: Array<{ name: string; question: string }> }
  | { type: "worker_start"; workerId: number; worker: string; question: string }
  | { type: "worker_reasoning"; workerId: number; content: string }
  | { type: "worker_done"; workerId: number; response: string; durationSeconds?: number }
  | { type: "tool_call_request"; toolCallId: string; toolName: string; args: Record<string, string> }

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

const welcomeGreetings = [
  "What can I help you find?",
  "What's on your mind today?",
  "Ready when you are",
  "Let's dig into the data",
]

export default function VersionTwo() {
  const workerTransitionDurationMs = 350

  const [greeting, setGreeting] = useState(welcomeGreetings[0])
  useEffect(() => {
    setGreeting(welcomeGreetings[Math.floor(Math.random() * welcomeGreetings.length)])
  }, [])
  const [isRailCollapsed, setIsRailCollapsed] = useState(false)
  const [railExpandedRatio, setRailExpandedRatio] = useState(() =>
    getClampedRailRatio(defaultRailExpandedRatio)
  )
  const [isRailResizing, setIsRailResizing] = useState(false)
  const [isCursorInCanvas, setIsCursorInCanvas] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [activeWorker, setActiveWorker] = useState<string | null>(null)
  const [isWorkerContentVisible, setIsWorkerContentVisible] = useState(true)
  const [promptValue, setPromptValue] = useState("")
  const [chatPromptValue, setChatPromptValue] = useState("")
  const [isAssistantResponding, setIsAssistantResponding] = useState(false)
  const [recentThreads, setRecentThreads] = useState<ChatThread[]>(() =>
    initialThreadSeeds.map(createSeedThread)
  )
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false)
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false)
  const [chatSearchValue, setChatSearchValue] = useState("")
  const [dictionaryEntries, setDictionaryEntries] = useState<LibraryEntry[]>([])
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isPluginsPageOpen, setIsPluginsPageOpen] = useState(false)
  const [installedConnectors, setInstalledConnectors] = useState<string[]>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("slack_token")) {
      return ["slack"]
    }
    return []
  })
  const [workerWelcomeMode, setWorkerWelcomeMode] = useState(false)
  const [workerWelcomeVisible, setWorkerWelcomeVisible] = useState(false)
  const [welcomeGridVisible, setWelcomeGridVisible] = useState(false)
  const [allowClarifyingAssumptions, setAllowClarifyingAssumptions] = useState(true)
  const [renameThreadId, setRenameThreadId] = useState<string | null>(null)
  const [renameThreadValue, setRenameThreadValue] = useState("")
  const [deleteThreadId, setDeleteThreadId] = useState<string | null>(null)
  const [forcePromptMode, setForcePromptMode] = useState(false)
  const [isBrowseWorkersOpen, setIsBrowseWorkersOpen] = useState(false)
  const [browseWorkerSearchValue, setBrowseWorkerSearchValue] = useState("")
  const [browseWorkerTab, setBrowseWorkerTab] = useState<"all" | "library" | "custom">("all")
  const [workerSearchQuery, setWorkerSearchQuery] = useState("")
  const [workerFilterTab, setWorkerFilterTab] = useState<"all" | "system" | "custom">("all")
  const [workerSortOption, setWorkerSortOption] = useState<"popularity" | "alphabetical" | "recent">("popularity")

  const workerSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const assistantAbortControllerRef = useRef<AbortController | null>(null)
  const librarySuggestionTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const conversationRef = useRef<HTMLDivElement | null>(null)
  const splitLayoutRef = useRef<HTMLDivElement | null>(null)
  const welcomeComposerRef = useRef<MentionComposerHandle | null>(null)
  const chatComposerRef = useRef<MentionComposerHandle | null>(null)

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
  const deleteThread = useMemo(
    () => recentThreads.find((thread) => thread.id === deleteThreadId) ?? null,
    [deleteThreadId, recentThreads]
  )
  const favoriteThreads = useMemo(
    () => recentThreads.filter((thread) => thread.isFavorite),
    [recentThreads]
  )
  const nonFavoriteThreads = useMemo(
    () => recentThreads.filter((thread) => !thread.isFavorite),
    [recentThreads]
  )
  const recentChatSections = useMemo(() => {
    const sections: Record<ChatRecencyBucket, ChatThread[]> = {
      older: [],
      today: [],
      yesterday: [],
    }

    nonFavoriteThreads.forEach((thread) => {
      sections[getThreadRecencyBucket(thread.updatedAt)].push(thread)
    })

    return (["today", "yesterday", "older"] as const)
      .map((bucket) => ({
        bucket,
        label: getThreadRecencyLabel(bucket),
        threads: sections[bucket],
      }))
      .filter((section) => section.threads.length > 0)
  }, [nonFavoriteThreads])
  const filteredThreads = useMemo(() => {
    const normalizedQuery = chatSearchValue.trim().toLowerCase()
    if (!normalizedQuery) {
      return recentThreads
    }

    return recentThreads.filter((thread) =>
      [
        thread.title,
        thread.worker ?? "",
        formatThreadAgeLabel(thread.updatedAt),
        getThreadRecencyLabel(getThreadRecencyBucket(thread.updatedAt)),
        workerSubtextByLabel[thread.worker ?? ""] ?? "",
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
    )
  }, [chatSearchValue, recentThreads])

  const filteredBrowseSystemWorkers = useMemo(() => {
    const q = browseWorkerSearchValue.trim().toLowerCase()
    if (!q) return allSystemWorkerLabels
    return allSystemWorkerLabels.filter(
      (w) =>
        w.toLowerCase().includes(q) ||
        (workerSubtextByLabel[w] ?? "").toLowerCase().includes(q)
    )
  }, [browseWorkerSearchValue])

  const filteredBrowseCustomWorkers = useMemo(() => {
    const q = browseWorkerSearchValue.trim().toLowerCase()
    if (!q) return customWorkers
    return customWorkers.filter(
      (cw) =>
        cw.label.toLowerCase().includes(q) ||
        cw.description.toLowerCase().includes(q) ||
        cw.author.toLowerCase().includes(q)
    )
  }, [browseWorkerSearchValue])

  const visibleBrowseSystemWorkers =
    browseWorkerTab === "custom" ? [] : filteredBrowseSystemWorkers
  const visibleBrowseCustomWorkers =
    browseWorkerTab === "library" ? [] : filteredBrowseCustomWorkers
  const hasBrowseResults =
    visibleBrowseSystemWorkers.length > 0 || visibleBrowseCustomWorkers.length > 0

  const activeCustomWorker = useMemo(
    () => customWorkers.find((cw) => cw.label === activeWorker) ?? null,
    [activeWorker]
  )

  const activeInputMode = forcePromptMode ? "prompt" : getWorkerInputMode(activeWorker ?? "")

  const orderedWorkerRows = useMemo(() => {
    if (!activeWorker) return workerAlternativeRows
    const allWorkers = workerAlternativeRows.flat()
    const isSystemWorker = allWorkers.includes(activeWorker)

    if (isSystemWorker) {
      return workerAlternativeRows
    }

    return [[activeWorker], ...workerAlternativeRows]
  }, [activeWorker])

  type WorkerTile = {
    label: string
    author: string
    description: string
    isCustom: boolean
    iconBg?: string
    iconColor?: string
    iconName?: string
  }

  const filteredWorkerTiles = useMemo(() => {
    const systemTiles: WorkerTile[] = allSystemWorkerLabels.map((label) => ({
      label,
      author: workerAuthorByLabel[label] ?? "Level AI",
      description: workerSubtextByLabel[label] ?? "",
      isCustom: false,
    }))

    const customTiles: WorkerTile[] = customWorkers.map((cw) => ({
      label: cw.label,
      author: cw.author,
      description: cw.description,
      isCustom: true,
      iconBg: cw.iconBg,
      iconColor: cw.iconColor,
      iconName: cw.iconName,
    }))

    let tiles: WorkerTile[] = []
    if (workerFilterTab === "all") tiles = [...systemTiles, ...customTiles]
    else if (workerFilterTab === "system") tiles = systemTiles
    else tiles = customTiles

    if (workerSearchQuery.trim()) {
      const query = workerSearchQuery.toLowerCase()
      tiles = tiles.filter((t) => t.label.toLowerCase().includes(query))
    }

    if (workerSortOption === "alphabetical") {
      tiles.sort((a, b) => a.label.localeCompare(b.label))
    }

    return tiles
  }, [workerFilterTab, workerSearchQuery, workerSortOption])

  const handleWorkerTileClick = (workerLabel: string) => {
    setActiveWorker(workerLabel)
    setForcePromptMode(false)
    setWorkerWelcomeMode(true)
    setWorkerWelcomeVisible(false)
  }

  const showWelcomeGrid = !selectedThread && !workerWelcomeMode

  useEffect(() => {
    if (showWelcomeGrid) {
      setWelcomeGridVisible(false)
      const timer = requestAnimationFrame(() => setWelcomeGridVisible(true))
      return () => cancelAnimationFrame(timer)
    }
  }, [showWelcomeGrid])

  useEffect(() => {
    if (workerWelcomeMode) {
      setWorkerWelcomeVisible(false)
      const timer = requestAnimationFrame(() => setWorkerWelcomeVisible(true))
      return () => cancelAnimationFrame(timer)
    }
  }, [workerWelcomeMode, activeWorker])

  const getGridRevealClass = (visibleDelayClass: string) =>
    cn(
      "transition-all duration-300 ease-out",
      welcomeGridVisible
        ? `opacity-100 translate-y-0 ${visibleDelayClass}`
        : "opacity-0 translate-y-8 delay-0"
    )

  const getWorkerWelcomeRevealClass = (visibleDelayClass: string) =>
    cn(
      "transition-all duration-300 ease-out",
      workerWelcomeVisible
        ? `opacity-100 translate-y-0 ${visibleDelayClass}`
        : "opacity-0 translate-y-8 delay-0"
    )

  const isChatView = selectedThread !== null
  const selectedThreadChatName = useMemo(
    () =>
      selectedThread?.title ??
      selectedThread?.messages.find((message) => message.role === "user")?.content ??
      "",
    [selectedThread]
  )
  const activeGuidedFlow = useMemo(() => {
    if (!selectedThread) {
      return null
    }

    for (let index = selectedThread.messages.length - 1; index >= 0; index -= 1) {
      const message = selectedThread.messages[index]
      if (message.role !== "assistant" || message.isStreaming || message.guidedFlowState) {
        continue
      }

      const parsedMessage = parseGuidedFlowMessage(message.content)
      if (parsedMessage.guidedFlow) {
        return {
          messageId: message.id,
          payload: parsedMessage.guidedFlow,
        }
      }
    }

    return null
  }, [selectedThread])

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
      setForcePromptMode(false)
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

  const updateThreadMessage = (
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

  const updateThread = (
    threadId: string,
    updater: (thread: ChatThread) => ChatThread
  ) => {
    setRecentThreads((currentThreads) =>
      currentThreads.map((thread) => (thread.id === threadId ? updater(thread) : thread))
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

          if (event.type === "planning_reasoning") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              const orch = msg.orchestration ?? { workers: [], planningReasoning: "", planningDone: false }
              return {
                ...msg,
                orchestration: { ...orch, planningReasoning: orch.planningReasoning + event.content },
              }
            })
          } else if (event.type === "planning_done") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              if (!msg.orchestration) return msg
              return {
                ...msg,
                orchestration: {
                  ...msg.orchestration,
                  planningDone: true,
                  planningDurationSeconds: event.durationSeconds,
                },
              }
            })
          } else if (event.type === "orchestration_plan") {
            const workers: WorkerCall[] = event.workers.map((w, i) => ({
              workerId: i,
              worker: w.name,
              question: w.question,
              status: "pending" as const,
              reasoning: "",
              response: "",
            }))
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              const orch = msg.orchestration ?? { workers: [], planningReasoning: "", planningDone: false }
              return {
                ...msg,
                orchestration: { ...orch, workers },
              }
            })

            const primaryWorker = event.workers[0]?.name
            if (primaryWorker) {
              setRecentThreads((threads) =>
                threads.map((t) =>
                  t.id === threadId && !t.worker ? { ...t, worker: primaryWorker } : t
                )
              )
              setActiveWorker((current) => current ?? primaryWorker)
            }
          } else if (event.type === "worker_start") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              if (!msg.orchestration) return msg
              const updatedWorkers = msg.orchestration.workers.map((w) =>
                w.workerId === event.workerId ? { ...w, status: "running" as const } : w
              )
              return { ...msg, orchestration: { ...msg.orchestration, workers: updatedWorkers } }
            })
          } else if (event.type === "worker_reasoning") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              if (!msg.orchestration) return msg
              const updatedWorkers = msg.orchestration.workers.map((w) =>
                w.workerId === event.workerId ? { ...w, reasoning: w.reasoning + event.content } : w
              )
              return { ...msg, orchestration: { ...msg.orchestration, workers: updatedWorkers } }
            })
          } else if (event.type === "worker_done") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => {
              if (!msg.orchestration) return msg
              const updatedWorkers = msg.orchestration.workers.map((w) =>
                w.workerId === event.workerId
                  ? { ...w, status: "done" as const, response: event.response, durationSeconds: event.durationSeconds }
                  : w
              )
              return { ...msg, orchestration: { ...msg.orchestration, workers: updatedWorkers } }
            })
          } else if (event.type === "tool_call_request") {
            const toolCallId = event.toolCallId
            updateThreadMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              toolCalls: [
                ...(msg.toolCalls ?? []),
                {
                  id: toolCallId,
                  toolName: event.toolName,
                  args: event.args,
                  status: "pending" as const,
                },
              ],
            }))

            if (event.toolName === "slack_send_message" && event.args.recipient) {
              const slackToken = localStorage.getItem("slack_token")
              if (slackToken) {
                fetch("/api/slack/resolve-user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token: slackToken, recipient: event.args.recipient }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    updateThreadMessage(threadId, assistantMessageId, (msg) => ({
                      ...msg,
                      toolCalls: msg.toolCalls?.map((tc) =>
                        tc.id === toolCallId
                          ? { ...tc, resolvedRecipient: data }
                          : tc
                      ),
                    }))
                  })
                  .catch(() => {})
              }
            }
          } else if (event.type === "reasoning") {
            accumulatedReasoning.value += event.content
            const currentReasoning = accumulatedReasoning.value
            updateThreadMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              reasoning: currentReasoning,
            }))
          } else if (event.type === "reasoning_done") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              reasoningDone: true,
            }))
          } else if (event.type === "text") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => ({
              ...msg,
              content: event.content,
              isStreaming: false,
            }))
          } else if (event.type === "finish") {
            finishEvent = event
            if (event.reasoningDurationSeconds != null) {
              updateThreadMessage(threadId, assistantMessageId, (msg) => ({
                ...msg,
                reasoningDurationSeconds: event.reasoningDurationSeconds,
              }))
            }
          } else if (event.type === "error") {
            updateThreadMessage(threadId, assistantMessageId, (msg) => ({
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
          updatedAt: getNowTimestamp(),
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

  const generateThreadTitle = async (threadId: string, userMessage: string) => {
    try {
      const response = await fetch("/api/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: stripMentions(userMessage) }),
      })
      if (!response.ok) return
      const { title } = (await response.json()) as { title?: string }
      if (!title) return
      setRecentThreads((threads) =>
        threads.map((t) => (t.id === threadId ? { ...t, title } : t))
      )
    } catch {
      // keep the fallback title
    }
  }

  const requestAssistantReply = async ({
    threadId,
    worker,
    messages,
    libraryEntries,
    previousWorkers = [],
    assistantMessageId: providedAssistantMessageId,
    shouldInsertStreamingMessage = true,
    initialPendingLibrarySuggestion = null,
  }: {
    threadId: string
    worker: string | null
    messages: ModelChatMessage[]
    libraryEntries: LibraryEntry[]
    previousWorkers?: string[]
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
            updatedAt: getNowTimestamp(),
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
          previousWorkers,
          worker,
          installedConnectors,
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
            updatedAt: getNowTimestamp(),
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
    const threadWorker = workerWelcomeMode ? activeWorker : null

    const newThread: ChatThread = {
      id: newThreadId,
      isFavorite: false,
      messages: [createUserMessage(normalizedPrompt), createStreamingMessage(assistantMessageId)],
      pendingLibrarySuggestion: null,
      title: getThreadTitle(normalizedPrompt),
      updatedAt: getNowTimestamp(),
      worker: threadWorker,
    }

    setRecentThreads((currentThreads) => [newThread, ...currentThreads])
    setSelectedThreadId(newThreadId)
    if (!workerWelcomeMode) setActiveWorker(null)
    setPromptValue("")
    setChatPromptValue("")
    setWorkerWelcomeMode(false)
    scrollConversationToBottom()
    void generateThreadTitle(newThreadId, normalizedPrompt)
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
    const lastAssistant = [...selectedThread.messages].reverse().find((m) => m.role === "assistant")
    const prevWorkers = lastAssistant?.orchestration?.workers.map((w) => w.worker).filter(Boolean) ?? []

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
          updatedAt: getNowTimestamp(),
          messages: [
            ...thread.messages,
            createUserMessage(normalizedPrompt),
          ],
          pendingLibrarySuggestion: null,
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
      previousWorkers: prevWorkers,
      initialPendingLibrarySuggestion: provisionalLibrarySuggestion,
    })
  }

  const handleGuidedFlowCancel = (messageId: string) => {
    if (!selectedThread) {
      return
    }

    updateThreadMessage(selectedThread.id, messageId, (message) => ({
      ...message,
      guidedFlowState: {
        status: "cancelled" as const,
      },
    }))
  }

  const handleGuidedFlowSubmit = (
    messageId: string,
    payload: GuidedFlowPayload,
    submission: GuidedFlowSubmission
  ) => {
    if (!selectedThread || isAssistantResponding) {
      return
    }

    const formattedResponse = formatGuidedFlowSubmission(payload, submission)
    const targetThreadId = selectedThread.id
    const threadWorker = selectedThread.worker
    const nextModelMessages: ModelChatMessage[] = [
      ...selectedThread.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      { role: "user", content: formattedResponse },
    ]
    const lastAssistantGF = [...selectedThread.messages].reverse().find((m) => m.role === "assistant")
    const prevWorkersGF = lastAssistantGF?.orchestration?.workers.map((w) => w.worker).filter(Boolean) ?? []

    setRecentThreads((currentThreads) => {
      const updatedThreads = currentThreads.map((thread) => {
        if (thread.id !== targetThreadId) {
          return thread
        }

        return {
          ...thread,
          updatedAt: getNowTimestamp(),
          messages: [
            ...thread.messages.map((message) =>
              message.id === messageId
                ? {
                    ...message,
                    guidedFlowState: {
                      status: "submitted" as const,
                      submission,
                    },
                  }
                : message
            ),
            createUserMessage(formattedResponse, { hidden: true }),
          ],
          pendingLibrarySuggestion: null,
        }
      })

      return moveThreadToTop(updatedThreads, targetThreadId)
    })

    scrollConversationToBottom()
    void requestAssistantReply({
      threadId: targetThreadId,
      worker: threadWorker,
      messages: nextModelMessages,
      libraryEntries: dictionaryEntries,
      previousWorkers: prevWorkersGF,
    })
  }

  const handleBackToWorkerSelection = () => {
    if (assistantAbortControllerRef.current) {
      assistantAbortControllerRef.current.abort()
      assistantAbortControllerRef.current = null
    }

    setIsAssistantResponding(false)
    setSelectedThreadId(null)
    setActiveWorker(null)
    setChatPromptValue("")
    setWorkerWelcomeMode(false)
    setIsPluginsPageOpen(false)
  }

  const handleBrowseWorkerSelect = (worker: string) => {
    if (worker !== activeWorker) {
      handleWorkerSelect(worker)
    }
    setIsBrowseWorkersOpen(false)
    setBrowseWorkerSearchValue("")
  }

  const handleCoachFormSubmit = (formData: {
    agentName: string
    dateRange: string
    focus: string
    filters: { id: string; field: string; operator: string; value: string }[]
  }) => {
    const agentPart = formData.agentName || "all agents"
    const filterSummary = formData.filters
      .map((f) => `${f.field} ${f.operator} ${f.value}`)
      .join(", ")

    const prompt = [
      `Build a coaching plan for ${agentPart}`,
      `based on conversations from ${formData.dateRange}`,
      `with focus on ${formData.focus}`,
      filterSummary ? `filtered by ${filterSummary}` : "",
    ]
      .filter(Boolean)
      .join(", ")
      .concat(".")

    createChatFromPrompt(prompt)
  }

  const handleTeamAnalystSubmit = (formData: { team: string; dateRange: string }) => {
    const teamPart = formData.team || "all teams"
    createChatFromPrompt(
      `Analyze team performance for ${teamPart} based on conversations from ${formData.dateRange}.`
    )
  }

  const handleInsightsAction = (action: string) => {
    if (!activeWorker) return
    const config = insightsWorkerConfig[activeWorker]
    if (!config) return
    createChatFromPrompt(`${action} for ${config.goalSubject}`)
  }

  const handleChatSearchOpen = () => {
    setChatSearchValue("")
    setIsChatSearchOpen(true)
  }

  const handleChatSearchOpenChange = (open: boolean) => {
    setIsChatSearchOpen(open)
    if (!open) {
      setChatSearchValue("")
    }
  }

  const handleThreadSelect = (threadId: string) => {
    setSelectedThreadId(threadId)
    setChatPromptValue("")
    setWorkerWelcomeMode(false)
    setIsPluginsPageOpen(false)

    const selected = recentThreads.find((thread) => thread.id === threadId)
    setActiveWorker(selected?.worker ?? null)
  }

  const handleChatSearchSelect = (threadId: string) => {
    handleThreadSelect(threadId)
    handleChatSearchOpenChange(false)
  }

  const handleThreadFavoriteToggle = (threadId: string) => {
    setRecentThreads((currentThreads) => {
      const updatedThreads = currentThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isFavorite: !thread.isFavorite,
            }
          : thread
      )

      return moveThreadToTop(updatedThreads, threadId)
    })
  }

  const confirmThreadDelete = (threadId: string) => {
    clearLibrarySuggestionTimer(threadId)

    const isDeletingSelectedThread = selectedThreadId === threadId
    const nextSelectedThread =
      recentThreads.find((thread) => thread.id !== threadId) ?? null

    if (isDeletingSelectedThread && assistantAbortControllerRef.current) {
      assistantAbortControllerRef.current.abort()
    }

    setRecentThreads((currentThreads) =>
      currentThreads.filter((thread) => thread.id !== threadId)
    )

    if (renameThreadId === threadId) {
      setRenameThreadId(null)
      setRenameThreadValue("")
    }

    if (!isDeletingSelectedThread) {
      return
    }

    setSelectedThreadId(nextSelectedThread?.id ?? null)
    setChatPromptValue("")

    if (nextSelectedThread?.worker) {
      setActiveWorker(nextSelectedThread.worker)
    }
  }

  const handleThreadDeleteRequest = (threadId: string) => {
    setDeleteThreadId(threadId)
  }

  const handleThreadDeleteClose = (open: boolean) => {
    if (open) {
      return
    }

    setDeleteThreadId(null)
  }

  const handleThreadDeleteConfirm = () => {
    if (!deleteThreadId) {
      return
    }

    confirmThreadDelete(deleteThreadId)
    setDeleteThreadId(null)
  }

  const handleThreadRenameOpen = (threadId: string) => {
    const thread = recentThreads.find((candidate) => candidate.id === threadId)
    if (!thread) {
      return
    }

    setRenameThreadId(threadId)
    setRenameThreadValue(thread.title)
  }

  const handleThreadRenameClose = (open: boolean) => {
    if (open) {
      return
    }

    setRenameThreadId(null)
    setRenameThreadValue("")
  }

  const handleThreadRenameSubmit = () => {
    if (!renameThreadId) {
      return
    }

    const normalizedTitle = renameThreadValue.trim()
    if (!normalizedTitle) {
      return
    }

    updateThread(renameThreadId, (thread) => ({
      ...thread,
      title: normalizedTitle,
    }))

    setRenameThreadId(null)
    setRenameThreadValue("")
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
                    onClick={
                      item.label === "New chat"
                        ? handleBackToWorkerSelection
                        : item.label === "All workers"
                          ? () => setIsBrowseWorkersOpen(true)
                          : item.label === "Context & Rules"
                            ? () => {}
                            : item.label === "Plugins"
                              ? () => { setIsPluginsPageOpen(true); setSelectedThreadId(null) }
                              : item.label === "Preferences"
                                ? () => setIsPreferencesOpen(true)
                                : undefined
                    }
                  />
                ))}
              </div>

              <div
                className={cn(
                  "mt-24 min-h-0 flex-1 overflow-hidden transition-opacity duration-200 ease-in-out",
                  isRailCollapsed ? "pointer-events-none opacity-0" : "opacity-100"
                )}
              >
                <div className="h-full overflow-auto scrollbar-hidden">
                  <p className="mb-8 px-8 text-12 font-semibold text-text-secondary">Favorites</p>
                  {favoriteThreads.length > 0 && (
                    <div className="space-y-2">
                      {favoriteThreads.map((thread) => (
                        <ThreadRow
                          key={thread.id}
                          threadId={thread.id}
                          title={thread.title}
                          workers={getThreadWorkers(thread)}
                          ageLabel={formatThreadAgeLabel(thread.updatedAt)}
                          isFavorite={thread.isFavorite}
                          isSelected={thread.id === selectedThreadId}
                          onSelect={() => handleThreadSelect(thread.id)}
                          onRename={handleThreadRenameOpen}
                          onToggleFavorite={handleThreadFavoriteToggle}
                          onDelete={handleThreadDeleteRequest}
                        />
                      ))}
                    </div>
                  )}

                  <div className="mb-8 mt-16 flex items-center justify-between px-8">
                    <p className="text-12 font-semibold text-text-secondary">Recents</p>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      type="button"
                      aria-label="Search chats"
                      className="text-icon-secondary"
                      iconLeft={<SearchMd size={16} className="text-icon-secondary" />}
                      onClick={handleChatSearchOpen}
                    />
                  </div>
                  <div className="space-y-16">
                    {recentChatSections.map((section) => (
                      <div key={section.bucket}>
                        <p className="mb-8 px-8 text-12 font-medium text-text-tertiary">
                          {section.label}
                        </p>
                        <div className="space-y-2">
                          {section.threads.map((thread) => (
                            <ThreadRow
                              key={thread.id}
                              threadId={thread.id}
                              title={thread.title}
                              workers={getThreadWorkers(thread)}
                              ageLabel={formatThreadAgeLabel(thread.updatedAt)}
                              isFavorite={thread.isFavorite}
                              isSelected={thread.id === selectedThreadId}
                              onSelect={() => handleThreadSelect(thread.id)}
                              onRename={handleThreadRenameOpen}
                              onToggleFavorite={handleThreadFavoriteToggle}
                              onDelete={handleThreadDeleteRequest}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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
              {isPluginsPageOpen ? (
                <PluginsPage
                  installedConnectors={installedConnectors}
                  onInstall={(id) => {
                    setInstalledConnectors((prev) =>
                      prev.includes(id) ? prev : [...prev, id]
                    )
                  }}
                  onUninstall={(id) => {
                    setInstalledConnectors((prev) => prev.filter((c) => c !== id))
                    if (id === "slack") localStorage.removeItem("slack_token")
                  }}
                />
              ) : isChatView && selectedThread ? (
                <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                  <div className="bg-surface-card px-24 py-16">
                    <div className="mx-auto flex w-full max-w-720 items-center gap-12">
                      <WorkerIconStack workers={getThreadWorkers(selectedThread)} size="md" />
                      <div className="min-w-0">
                        <p className="truncate text-14 font-bold text-text-primary">{selectedThreadChatName}</p>
                      </div>
                    </div>
                  </div>

                  <Conversation ref={conversationRef} className="min-h-0 flex-1">
                    <ConversationContent className="mx-auto w-full max-w-720 gap-32 py-24">
                      {selectedThread.messages
                        .filter((message) => !message.hidden)
                        .map((message) => {
                          const parsedAssistantMessage =
                            message.role === "assistant"
                              ? parseGuidedFlowMessage(message.content)
                              : null
                          const guidedFlow = parsedAssistantMessage?.guidedFlow
                          const messageText = parsedAssistantMessage?.text ?? message.content

                          return (
                            <Message key={message.id} from={message.role}>
                              <MessageContent
                                className={cn(
                                  message.role === "user"
                                    ? "ml-auto w-fit max-w-11/12 rounded-3xl bg-surface-muted px-16 py-12 text-text-primary"
                                    : "w-full rounded-none border-none bg-transparent px-0 py-0 text-text-primary"
                                )}
                              >
                                {message.orchestration ? (
                                  <OrchestrationView
                                    orchestration={message.orchestration}
                                    isStreaming={!!message.isStreaming}
                                    reasoning={message.reasoning ?? ""}
                                    reasoningDone={message.reasoningDone}
                                    reasoningDurationSeconds={message.reasoningDurationSeconds}
                                  />
                                ) : message.role === "assistant" && (message.isStreaming || message.reasoning) ? (
                                  <ReasoningBlock
                                    isStreaming={!!message.isStreaming}
                                    reasoning={message.reasoning ?? ""}
                                    reasoningDone={message.reasoningDone}
                                    durationSeconds={message.reasoningDurationSeconds}
                                  />
                                ) : null}
                                {message.toolCalls && message.toolCalls.length > 0 && (
                                  <div className="mt-8 space-y-8">
                                    {message.toolCalls.map((tc) => (
                                      <ConnectorActionCard
                                        key={tc.id}
                                        toolCall={tc}
                                        onApprove={async (id) => {
                                          const threadId = selectedThread!.id
                                          const msgId = message.id
                                          const call = message.toolCalls?.find((t) => t.id === id)
                                          if (!call) return

                                          updateThreadMessage(threadId, msgId, (msg) => ({
                                            ...msg,
                                            toolCalls: msg.toolCalls?.map((t) =>
                                              t.id === id ? { ...t, status: "sending" as const } : t
                                            ),
                                          }))

                                          if (call.toolName === "slack_send_message") {
                                            const token = localStorage.getItem("slack_token")
                                            if (!token) {
                                              updateThreadMessage(threadId, msgId, (msg) => ({
                                                ...msg,
                                                toolCalls: msg.toolCalls?.map((t) =>
                                                  t.id === id ? { ...t, status: "error" as const, errorMessage: "Slack is not connected. Install the Slack plugin first." } : t
                                                ),
                                              }))
                                              return
                                            }
                                            try {
                                              const res = await fetch("/api/slack/send", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                  token,
                                                  recipient: call.args.recipient,
                                                  message: call.args.message,
                                                }),
                                              })
                                              const data = await res.json()
                                              if (res.ok && data.ok) {
                                                updateThreadMessage(threadId, msgId, (msg) => ({
                                                  ...msg,
                                                  toolCalls: msg.toolCalls?.map((t) =>
                                                    t.id === id ? { ...t, status: "approved" as const } : t
                                                  ),
                                                }))
                                              } else {
                                                updateThreadMessage(threadId, msgId, (msg) => ({
                                                  ...msg,
                                                  toolCalls: msg.toolCalls?.map((t) =>
                                                    t.id === id ? { ...t, status: "error" as const, errorMessage: data.error || "Failed to send message" } : t
                                                  ),
                                                }))
                                              }
                                            } catch {
                                              updateThreadMessage(threadId, msgId, (msg) => ({
                                                ...msg,
                                                toolCalls: msg.toolCalls?.map((t) =>
                                                  t.id === id ? { ...t, status: "error" as const, errorMessage: "Network error" } : t
                                                ),
                                              }))
                                            }
                                          } else {
                                            updateThreadMessage(threadId, msgId, (msg) => ({
                                              ...msg,
                                              toolCalls: msg.toolCalls?.map((t) =>
                                                t.id === id ? { ...t, status: "approved" as const } : t
                                              ),
                                            }))
                                          }
                                        }}
                                        onReject={(id) => {
                                          updateThreadMessage(
                                            selectedThread!.id,
                                            message.id,
                                            (msg) => ({
                                              ...msg,
                                              toolCalls: msg.toolCalls?.map((t) =>
                                                t.id === id ? { ...t, status: "rejected" as const } : t
                                              ),
                                            })
                                          )
                                        }}
                                      />
                                    ))}
                                  </div>
                                )}
                                {!message.isStreaming && messageText ? (
                                  <MessageResponse
                                    className={message.role === "user" ? "w-auto" : "w-full"}
                                  >
                                    {messageText}
                                  </MessageResponse>
                                ) : null}
                                {!message.isStreaming &&
                                guidedFlow &&
                                activeGuidedFlow?.messageId !== message.id ? (
                                  <div className={cn(messageText ? "mt-16" : "")}>
                                    <GuidedFlowCard
                                      payload={guidedFlow}
                                      submission={
                                        message.guidedFlowState?.status === "submitted"
                                          ? message.guidedFlowState.submission
                                          : null
                                      }
                                      cancelled={message.guidedFlowState?.status === "cancelled"}
                                      disabled={isAssistantResponding}
                                      onCancel={() => handleGuidedFlowCancel(message.id)}
                                      onSubmit={(submission) =>
                                        handleGuidedFlowSubmit(message.id, guidedFlow, submission)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </MessageContent>
                            </Message>
                          )
                        })}
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

                    {activeGuidedFlow ? (
                      <div className="mx-auto w-full max-w-720">
                        <GuidedFlowCard
                          payload={activeGuidedFlow.payload}
                          disabled={isAssistantResponding}
                          onCancel={() => handleGuidedFlowCancel(activeGuidedFlow.messageId)}
                          onSubmit={(submission) =>
                            handleGuidedFlowSubmit(
                              activeGuidedFlow.messageId,
                              activeGuidedFlow.payload,
                              submission
                            )
                          }
                        />
                      </div>
                    ) : (
                      <form
                        className="mx-auto w-full max-w-720 rounded-xl border border-border-default bg-surface-page px-12 py-8 shadow-sm"
                        onSubmit={(event) => {
                          event.preventDefault()
                          sendMessageToActiveThread(chatPromptValue)
                        }}
                      >
                        <MentionComposer
                          ref={chatComposerRef}
                          value={chatPromptValue}
                          onChange={setChatPromptValue}
                          onSubmit={() => sendMessageToActiveThread(chatPromptValue)}
                          placeholder={`Ask ${selectedThread.worker} anything, @ to mention a worker`}
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
                    )}
                  </div>
                </div>
              ) : workerWelcomeMode ? (
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

                  <div className="relative z-10 flex items-center gap-8 px-16 py-12">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Back to workers"
                      onClick={() => setWorkerWelcomeMode(false)}
                      iconLeft={<ArrowNarrowLeft size={20} className="text-icon-secondary" />}
                    />
                  </div>

                  <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-auto">
                    <div className="flex flex-1 flex-col items-center justify-center px-24 py-32">
                      <div className="flex w-full max-w-720 flex-col items-center gap-12 text-center">
                        {activeCustomWorker ? (
                          <span
                            className={cn(
                              "flex h-48 w-48 items-center justify-center rounded-xl",
                              activeCustomWorker.iconBg,
                              getWorkerWelcomeRevealClass("delay-0")
                            )}
                          >
                            {getCustomWorkerIcon(activeCustomWorker.iconName, activeCustomWorker.iconColor, 24)}
                          </span>
                        ) : (
                          <img
                            src={workerIconByLabel[activeWorker!] ?? "/ai-worker-avatar.svg"}
                            alt={`${activeWorker} icon`}
                            className={cn("h-48 w-48 object-contain", getWorkerWelcomeRevealClass("delay-0"))}
                          />
                        )}
                        <div className={cn("flex flex-col items-center", getWorkerWelcomeRevealClass("delay-100"))}>
                          <p className="text-24 font-bold text-text-primary">{activeWorker}</p>
                          <p className="mx-auto mt-8 w-full max-w-360 break-words text-14 text-text-secondary">
                            {workerSubtextByLabel[activeWorker!]}
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className={cn("mt-4", getWorkerWelcomeRevealClass("delay-200"))}
                          iconLeft={<Play size={16} className="text-icon-secondary" />}
                          onClick={() => setIsHowToUseOpen(true)}
                        >
                          How to use
                        </Button>
                      </div>
                    </div>

                    <div className={cn("relative z-10 shrink-0 px-24 pb-40", getWorkerWelcomeRevealClass("delay-300"))}>
                      {activeInputMode === "form" && activeWorker === "Coach" ? (
                        <div className="mx-auto w-full max-w-720">
                          <CoachForm
                            onSubmit={handleCoachFormSubmit}
                            onWriteYourOwn={() => setForcePromptMode(true)}
                            disabled={isAssistantResponding}
                          />
                        </div>
                      ) : activeInputMode === "form" && activeWorker === "Team analyst" ? (
                        <div className="mx-auto w-full max-w-720">
                          <TeamAnalystForm
                            onSubmit={handleTeamAnalystSubmit}
                            disabled={isAssistantResponding}
                          />
                        </div>
                      ) : activeInputMode === "buttons" && activeWorker && insightsWorkerConfig[activeWorker] ? (
                        <div className="mx-auto w-full max-w-720">
                          <InsightsWorkerLanding
                            config={insightsWorkerConfig[activeWorker]}
                            onActionSelect={handleInsightsAction}
                            disabled={isAssistantResponding}
                          />
                        </div>
                      ) : (
                        <form
                          className="mx-auto mt-12 w-full max-w-720 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md"
                          onSubmit={(event) => {
                            event.preventDefault()
                            createChatFromPrompt(promptValue)
                          }}
                        >
                          <MentionComposer
                            ref={welcomeComposerRef}
                            value={promptValue}
                            onChange={setPromptValue}
                            onSubmit={() => createChatFromPrompt(promptValue)}
                            placeholder={`Ask ${activeWorker} anything, @ to mention a worker`}
                            dropdownDirection="up"
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
                      )}
                    </div>
                  </div>
                </>
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
                      "relative z-10 flex min-h-0 flex-1 flex-col overflow-auto",
                      !isWorkerContentVisible && "pointer-events-none"
                    )}
                  >
                    <div className="flex flex-col px-32 py-48">
                      <div className="mx-auto w-full max-w-[840px]">
                        <h1 className={cn("text-24 font-bold text-text-primary", getGridRevealClass("delay-0"))}>
                          Hi John 👋, {greeting}
                        </h1>

                        <form
                          className={cn("relative z-10 mt-20 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md", getGridRevealClass("delay-100"))}
                          onSubmit={(event) => {
                            event.preventDefault()
                            createChatFromPrompt(promptValue)
                          }}
                        >
                          <MentionComposer
                            ref={welcomeComposerRef}
                            value={promptValue}
                            onChange={setPromptValue}
                            onSubmit={() => createChatFromPrompt(promptValue)}
                            placeholder="Ask anything (mention @worker to use a specific AI worker)"
                          />

                          <div className="mt-8 flex items-center justify-between gap-12 pt-8">
                            <div className="flex items-center gap-4">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Add context"
                                iconLeft={<Plus size={16} className="text-icon-secondary" />}
                              />
                            </div>

                            <div className="flex items-center gap-4">
                              <Button
                                type="button"
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

                        <div className={cn("mt-48", getGridRevealClass("delay-200"))}>
                          <h2 className="text-16 font-semibold text-text-primary">Chat with...</h2>

                          <div className="mt-24 flex items-center gap-12">
                            <div className="relative min-w-0 flex-1">
                              <SearchMd
                                size={16}
                                color="var(--color-stone-600)"
                                className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2"
                              />
                              <Input
                                value={workerSearchQuery}
                                onChange={(event) => setWorkerSearchQuery(event.target.value)}
                                placeholder="Search"
                                aria-label="Search workers"
                                className="h-40 pl-36"
                              />
                            </div>

                            <Button
                              type="button"
                              variant="secondary"
                              size="default"
                              iconLeft={<Plus size={16} />}
                            >
                              Create
                            </Button>
                          </div>

                          <div className="mt-24 flex items-center justify-between">
                            <Tabs value={workerFilterTab} onValueChange={(v) => setWorkerFilterTab(v as typeof workerFilterTab)}>
                              <NeutralTabsList aria-label="Filter workers">
                                <NeutralTabsTrigger value="all">All workers</NeutralTabsTrigger>
                                <NeutralTabsTrigger value="system">Level AI workers</NeutralTabsTrigger>
                                <NeutralTabsTrigger value="custom">Custom workers</NeutralTabsTrigger>
                              </NeutralTabsList>
                            </Tabs>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button type="button" variant="secondary" size="sm">
                                  {workerSortOption === "popularity" && "By popularity"}
                                  {workerSortOption === "alphabetical" && "Alphabetical"}
                                  {workerSortOption === "recent" && "Recently used"}
                                  <ChevronDown size={16} className="ml-4 text-icon-secondary" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => setWorkerSortOption("popularity")}>
                                  By popularity
                                  {workerSortOption === "popularity" && <Check size={14} className="ml-auto text-text-brand" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setWorkerSortOption("alphabetical")}>
                                  Alphabetical
                                  {workerSortOption === "alphabetical" && <Check size={14} className="ml-auto text-text-brand" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setWorkerSortOption("recent")}>
                                  Recently used
                                  {workerSortOption === "recent" && <Check size={14} className="ml-auto text-text-brand" />}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className={cn("mt-40 -ml-20 -mr-20 grid grid-cols-3 gap-y-20", getGridRevealClass("delay-300"))}>
                            {filteredWorkerTiles.map((tile) => (
                              <button
                                key={tile.label}
                                type="button"
                                className="flex flex-col rounded-xl border border-transparent p-20 text-left transition-all duration-200 hover:border-border-default hover:bg-surface-card hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                                onClick={() => handleWorkerTileClick(tile.label)}
                              >
                                <div className="flex items-center gap-12">
                                  {tile.isCustom ? (
                                    <span
                                      className={cn(
                                        "flex h-40 w-40 shrink-0 items-center justify-center rounded-lg",
                                        tile.iconBg
                                      )}
                                    >
                                      {getCustomWorkerIcon(tile.iconName ?? "zap", tile.iconColor ?? "white", 20)}
                                    </span>
                                  ) : (
                                    <img
                                      src={workerIconByLabel[tile.label] ?? "/ai-worker-avatar.svg"}
                                      alt=""
                                      className="h-40 w-40 shrink-0 object-contain"
                                    />
                                  )}
                                  <div className="min-w-0 space-y-2">
                                    <p className="truncate text-14 font-semibold leading-snug text-text-primary">{tile.label}</p>
                                    <p className="text-12 text-text-tertiary">{tile.author}</p>
                                  </div>
                                </div>
                                <p className="mt-16 line-clamp-2 text-12 font-medium leading-relaxed text-text-secondary">{tile.description}</p>
                              </button>
                            ))}
                          </div>

                          {filteredWorkerTiles.length === 0 && (
                            <div className="mt-24 text-center">
                              <p className="text-14 text-text-tertiary">No workers match your search.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </main>

        <Dialog open={isChatSearchOpen} onOpenChange={handleChatSearchOpenChange}>
          <DialogContent size="lg" className="top-1/2 -translate-y-1/2">
            <DialogTitle className="sr-only">Search chats</DialogTitle>
            <div className="border-b border-border-subtle px-20 py-12">
              <div className="flex items-center gap-10">
                <div className="relative min-w-0 flex-1">
                  <SearchMd
                    size={18}
                    className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-icon-secondary"
                  />
                  <Input
                    autoFocus
                    inputSize="large"
                    value={chatSearchValue}
                    onChange={(event) => setChatSearchValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && filteredThreads.length > 0) {
                        event.preventDefault()
                        handleChatSearchSelect(filteredThreads[0].id)
                      }
                    }}
                    placeholder="Search chats"
                    aria-label="Search chats"
                    className="h-40 border-0 bg-transparent pl-40 pr-8 text-16 hover:border-0 focus:border-0 focus:shadow-none"
                  />
                </div>

                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    type="button"
                    aria-label="Close search"
                    iconLeft={<X size={18} className="text-icon-secondary" />}
                  />
                </DialogClose>
              </div>
            </div>

            <DialogBody className="max-h-408 px-16 pb-12 pt-12">
              {filteredThreads.length === 0 ? (
                <EmptyState
                  icon={<SearchMd size={24} className="text-icon-secondary" />}
                  title="No chats found"
                  description="Try a different chat title or worker name."
                  className="h-240 rounded-lg border border-border-default bg-surface-page"
                />
              ) : (
                <div className="flex min-h-0 flex-col gap-2">
                  {filteredThreads.map((thread) => (
                    <ThreadSearchResultRow
                      key={thread.id}
                      title={thread.title}
                      workers={getThreadWorkers(thread)}
                      ageLabel={formatThreadAgeLabel(thread.updatedAt)}
                      isFavorite={thread.isFavorite}
                      isSelected={thread.id === selectedThreadId}
                      onSelect={() => handleChatSearchSelect(thread.id)}
                    />
                  ))}
                </div>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>

        <Dialog open={isHowToUseOpen} onOpenChange={setIsHowToUseOpen}>
          <DialogContent size="full" className="top-1/2 -translate-y-1/2 h-full max-w-1020">
            <DialogHeader description={`This button will open a walkthrough video for ${activeWorker}.`}>
              How to use {activeWorker}
            </DialogHeader>
            <DialogBody className="min-h-0 pb-24 pt-12">
              <EmptyState
                icon={<PlayCircle size={28} className="text-icon-secondary" />}
                title="Video placeholder"
                description={`A walkthrough video for ${activeWorker} will open in this modal once it is added.`}
                className="h-full rounded-lg border border-border-default bg-surface-page"
              />
            </DialogBody>
            <DialogFooter className="pt-20">
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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

        <Dialog open={renameThreadId !== null} onOpenChange={handleThreadRenameClose}>
          <DialogContent size="sm">
            <DialogHeader>Rename chat</DialogHeader>
            <DialogBody className="pb-12 pt-12">
              <Input
                value={renameThreadValue}
                onChange={(event) => setRenameThreadValue(event.target.value)}
                placeholder="Enter chat name"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleThreadRenameSubmit()
                  }
                }}
              />
            </DialogBody>
            <DialogFooter className="pt-20">
              <Button variant="secondary" type="button" onClick={() => handleThreadRenameClose(false)}>
                Cancel
              </Button>
              <Button
                variant="default"
                type="button"
                onClick={handleThreadRenameSubmit}
                disabled={!renameThreadValue.trim()}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteThreadId !== null} onOpenChange={handleThreadDeleteClose}>
          <DialogContent size="sm">
            <DialogHeader>Delete chat?</DialogHeader>
            <DialogBody className="pb-12 pt-12">
              <p className="text-14 font-medium text-text-primary">
                This will permanently delete{" "}
                <span className="font-bold text-text-primary">{deleteThread?.title ?? "this chat"}</span>
                , are you sure you would like to proceed?
              </p>
            </DialogBody>
            <DialogFooter className="pt-20">
              <Button variant="secondary" type="button" onClick={() => handleThreadDeleteClose(false)}>
                Cancel
              </Button>
              <Button variant="destructive" type="button" onClick={handleThreadDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
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

        <Dialog
          open={isBrowseWorkersOpen}
          onOpenChange={(open) => {
            setIsBrowseWorkersOpen(open)
            if (!open) {
              setBrowseWorkerSearchValue("")
              setBrowseWorkerTab("all")
            }
          }}
        >
          <DialogContent size="lg" className="top-1/2 h-[85vh] -translate-y-1/2">
            <DialogTitle className="sr-only">Browse all workers</DialogTitle>
            <div className="border-b border-border-subtle px-20 py-12">
              <div className="flex items-center gap-10">
                <div className="relative min-w-0 flex-1">
                  <SearchMd
                    size={18}
                    className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-icon-secondary"
                  />
                  <Input
                    autoFocus
                    inputSize="large"
                    value={browseWorkerSearchValue}
                    onChange={(event) => setBrowseWorkerSearchValue(event.target.value)}
                    placeholder="Search workers"
                    aria-label="Search workers"
                    className="h-40 border-0 bg-transparent pl-40 pr-8 text-16 hover:border-0 focus:border-0 focus:shadow-none"
                  />
                </div>

                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    type="button"
                    aria-label="Close"
                    iconLeft={<X size={18} className="text-icon-secondary" />}
                  />
                </DialogClose>
              </div>
            </div>

            <Tabs
              value={browseWorkerTab}
              onValueChange={(v) => setBrowseWorkerTab(v as "all" | "library" | "custom")}
            >
              <div className="px-20 pt-8 pb-0">
                <NeutralTabsList>
                  <NeutralTabsTrigger value="all" className="text-12">
                    All workers
                  </NeutralTabsTrigger>
                  <NeutralTabsTrigger value="library" className="text-12">
                    Level AI library
                  </NeutralTabsTrigger>
                  <NeutralTabsTrigger value="custom" className="text-12">
                    Custom workers
                  </NeutralTabsTrigger>
                </NeutralTabsList>
              </div>
            </Tabs>

            <DialogBody className="min-h-0 flex-1 overflow-auto px-16 pb-16 pt-12">
              {!hasBrowseResults ? (
                <EmptyState
                  icon={<SearchMd size={24} className="text-icon-secondary" />}
                  title="No workers found"
                  description="Try a different search term."
                  className="h-240 rounded-lg border border-border-default bg-surface-page"
                />
              ) : (
                <div className="flex flex-col gap-12">
                  {visibleBrowseSystemWorkers.map((worker) => (
                    <Button
                      key={worker}
                      variant="ghost"
                      size="sm"
                      type="button"
                      className={cn(
                        "h-auto w-full justify-start gap-12 rounded-lg px-10 py-10",
                        worker === activeWorker
                          ? "bg-surface-brand-subtle hover:bg-surface-brand-subtle"
                          : "hover:bg-interactive-secondary"
                      )}
                      onClick={() => handleBrowseWorkerSelect(worker)}
                    >
                      <img
                        src={workerIconByLabel[worker] ?? "/ai-worker-avatar.svg"}
                        alt={`${worker} icon`}
                        className="h-32 w-32 shrink-0 object-contain"
                      />
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-14 font-semibold text-text-primary">
                          {worker}
                        </span>
                        <span className="mt-2 block truncate text-12 text-text-secondary">
                          {workerSubtextByLabel[worker]}
                        </span>
                      </span>
                      {worker === activeWorker && (
                        <Check size={16} className="shrink-0 text-text-brand" />
                      )}
                    </Button>
                  ))}

                  {visibleBrowseCustomWorkers.map((cw) => (
                    <Button
                      key={cw.label}
                      variant="ghost"
                      size="sm"
                      type="button"
                      className={cn(
                        "h-auto w-full justify-start gap-12 rounded-lg px-10 py-10",
                        cw.label === activeWorker
                          ? "bg-surface-brand-subtle hover:bg-surface-brand-subtle"
                          : "hover:bg-interactive-secondary"
                      )}
                      onClick={() => handleBrowseWorkerSelect(cw.label)}
                    >
                      <span
                        className={cn(
                          "flex h-32 w-32 shrink-0 items-center justify-center rounded-lg",
                          cw.iconBg
                        )}
                      >
                        {getCustomWorkerIcon(cw.iconName, cw.iconColor, 16)}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-14 font-semibold text-text-primary">
                          {cw.label}
                        </span>
                        <span className="mt-2 block truncate text-12 text-text-secondary">
                          {cw.description}
                        </span>
                      </span>
                      {cw.label === activeWorker && (
                        <Check size={16} className="shrink-0 text-text-brand" />
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}
