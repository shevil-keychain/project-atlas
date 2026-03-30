"use client"

import * as React from "react"
import Image from "next/image"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import {
  PageHeaderDescription,
  PageHeaderTitle,
} from "@level/ui/components/patterns/page-header"
import { Avatar } from "@level/ui/components/ui/avatar"
import { Badge } from "@level/ui/components/ui/badge"
import { Button } from "@level/ui/components/ui/button"
import { Card } from "@level/ui/components/ui/card"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@level/ui/components/ui/modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu"
import { EmptyState } from "@level/ui/components/ui/empty-state"
import { Input } from "@level/ui/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@level/ui/components/ui/table"
import { Spinner } from "@level/ui/components/ui/spinner"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { SimpleTooltip, TooltipProvider } from "@level/ui/components/ui/tooltip"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import {
  ChevronRight,
  DotsVertical,
  Edit02,
  InfoCircle,
  RefreshCw01,
  SearchMd,
} from "@level/ui/components/icons"
import {
  NeutralTabsList,
  NeutralTabsTrigger,
  Tabs,
  TabsContent,
} from "@level/ui/components/ui/tabs"
import { Calendar, Check, ChevronLeft, Clock, ExternalLink, Plus, X } from "lucide-react"
import { Label } from "@level/ui/components/ui/label"
import { Multiselect } from "@level/ui/components/ui/multiselect"
import { ToggleWithLabel } from "@level/ui/components/ui/toggle-with-label"

type SettingsSection = {
  heading?: string
  items: Array<{
    label: string
    active?: boolean
  }>
}

type Frequency = "daily" | "weekly" | "monthly"
type RuleStatus = "Active" | "Inactive"
type RunStatus = "success" | "partial" | "failed" | "scheduled"

type IssueCodeLabel =
  | "Agent not in any rule"
  | "Insufficient matching conversations"
  | "Evaluators' workload limit reached"
  | "Rule execution failed"
  | "No conversations in period"
  | "Conversations didn't match filters"
  | "All evaluators at capacity"
  | "Evaluator unavailable"
  | "Workload limit reached"
  | `Time off for ${number} days in the week`
  | "Rule did not execute"
  | "Rule execution interrupted"
  | "Quota met by another rule"
  | "No eligible conversations"
  | "No eligible conversations to assign"
  | "Evaluator quota full"

type RuleAgentWarningReason =
  | "no_matching_conversations"
  | "all_evaluators_capacity"
  | "no_conversations_in_period"
  | "evaluator_unavailable"
  | "rule_interrupted"

type ExecutionMetadataRow = {
  label: string
  value: string
}

type RuleAgentRow = {
  id: string
  name: string
  status: "warning" | "success" | "fyi"
  warningReason?: RuleAgentWarningReason
  issueCodeLabel?: IssueCodeLabel
  detailText?: string
  assignmentText?: string
  viaRuleName?: string
}

type RuleEvaluatorRow = {
  id: string
  name: string
  status: "warning" | "success"
  loadText: string
  issueCodeLabel?: IssueCodeLabel
  detailText?: string
}

type GroupedRuleAgentIssue = {
  sectionValue: string
  label: string
  agents: RuleAgentRow[]
}

type RunGoalDetail = {
  status: RunStatus
  statusLabel: string
  countLabel: string
  metadata: ExecutionMetadataRow[]
  agentsWithoutQa: RuleAgentRow[]
  coveredAgents: RuleAgentRow[]
  quotaMetElsewhere: RuleAgentRow[]
  coveredAgentsLabel: string
  evaluatorsWithIssues: RuleEvaluatorRow[]
  activeEvaluators: RuleEvaluatorRow[]
  activeEvaluatorsLabel: string
}

type RuleHistoryGoal = {
  id: string
  sourceId: string
  listLabel: string
  sampleWindow: string
  status: RunStatus
  percent: number
  completed: number
  expected: number
  isUpcoming: boolean
  hasPrediction: boolean
  runsLeft: number | null
  runBreakdown: number[] | null
  issues: string[]
  totalRuns: number | null
  detail: RunGoalDetail
}

type PredictionFreshnessState = {
  label: string
  isRefreshing: boolean
  errorMessage: string | null
  isRefreshDisabled: boolean
}


type VersionThreeRule = {
  id: string
  name: string
  assignmentType: string
  frequency: Frequency
  goalType: GoalType
  status: RuleStatus
  goals: RuleHistoryGoal[]
}

type SourceAgentRow = {
  id: string
  name: string
  assignmentText?: string
  detailText?: string
  viaRuleName?: string
  issueCodeLabel?: string
  warningReason?: string
}

type SourceEvaluatorRow = {
  id: string
  name: string
  loadText?: string
  detailText?: string
  issueCodeLabel?: string
}

type SourceRuleDetail = {
  agentsWithoutQa?: SourceAgentRow[]
  coveredAgents?: SourceAgentRow[]
  quotaMetElsewhere?: SourceAgentRow[]
  evaluatorsWithIssues?: SourceEvaluatorRow[]
  activeEvaluators?: SourceEvaluatorRow[]
}

type GoalConfig = {
  id: string
  sourceId: string
  listLabel: string
  sampleWindow: string
  status: RunStatus
  percent: number
  completed: number
  expected: number
  isUpcoming?: boolean
  hasPrediction?: boolean
  runsLeft?: number
  runBreakdown?: number[]
  issues?: string[]
  totalRuns?: number
}

type GoalType = "daily" | "weekly" | "monthly"

type RuleConfig = {
  id: string
  name: string
  assignmentType: string
  frequency: Frequency
  goalType: GoalType
  status: RuleStatus
  goals: GoalConfig[]
}

const settingsSections: SettingsSection[] = [
  {
    heading: "Organizational Unit Mgmt.",
    items: [
      { label: "Users" },
      { label: "Teams" },
      { label: "Roles and Permissions" },
      { label: "Report Sharing" },
      { label: "Custom fields" },
      { label: "QA case assignment", active: true },
      { label: "Notifications" },
      { label: "Audit Logs" },
      { label: "Business Week" },
    ],
  },
  {
    heading: "Alerts",
    items: [{ label: "Analytics alerts" }],
  },
  {
    heading: "Scripting Engine",
    items: [
      { label: "Conversation Tags" },
      { label: "Metric Tags" },
      { label: "Sentiment Tags" },
      { label: "Categories" },
      { label: "Rubric Builder" },
    ],
  },
  {
    heading: "Knowledge Center",
    items: [],
  },
]

const agentFirstNames = [
  "Avery",
  "Priya",
  "Jordan",
  "Mia",
  "Arjun",
  "Sofia",
  "Marcus",
  "Riya",
  "Leah",
  "Noah",
  "Emma",
  "Ravi",
  "Zara",
  "Ethan",
  "Nina",
  "Luca",
  "Talia",
  "Owen",
  "Maya",
  "Jonah",
]

const agentLastNames = [
  "Patel",
  "Brooks",
  "Cole",
  "Martinez",
  "Nair",
  "Kim",
  "Diaz",
  "Shah",
  "Johnson",
  "Chen",
  "Singh",
  "Morris",
  "Rivera",
  "Khan",
  "Walker",
  "Allen",
  "Turner",
  "Scott",
  "Torres",
  "Bailey",
]

const evaluatorFirstNames = [
  "Sarah",
  "David",
  "Aisha",
  "Omar",
  "Nora",
  "Lucas",
  "Mei",
  "Carlos",
  "Fatima",
  "Henry",
  "Isha",
  "Kevin",
  "Leah",
  "Marcus",
  "Elena",
  "Victor",
  "Julia",
  "Samir",
]

const evaluatorLastNames = [
  "Kim",
  "Johnson",
  "Patel",
  "Brown",
  "Lopez",
  "Singh",
  "Chen",
  "Davis",
  "Garcia",
  "Shah",
  "Williams",
  "Miller",
  "Rivera",
  "Khan",
  "Turner",
  "Scott",
  "Nguyen",
  "Clark",
]

type VersionThreeAgentIssueScenario = {
  count: number
  startIndex?: number
  warningReason: RuleAgentWarningReason
  issueCodeLabel: IssueCodeLabel
  detailText: string
}

type VersionThreeEvaluatorIssueScenario = {
  count: number
  startIndex?: number
  issueCodeLabel: IssueCodeLabel
  detailText: string
  loadMode?: "full" | "empty"
}

type GoalScenario = {
  coveredStartIndex?: number
  activeEvaluatorStartIndex?: number
  activeEvaluatorCount?: number
  activeEvaluatorLoads?: number[]
  issueGroups?: VersionThreeAgentIssueScenario[]
  evaluatorIssues?: VersionThreeEvaluatorIssueScenario[]
  quotaMetElsewhereCount?: number
  quotaMetElsewhereStartIndex?: number
  quotaMetElsewhereRuleName?: string
  quotaMetElsewhereDetailText?: string
}

const versionThreeRuleSeeds = {
  "billing-qa": {
    agentOffset: 0,
    evaluatorOffset: 0,
    evaluatorCapacity: 18,
    defaultActiveEvaluators: 5,
    agentCount: 24,
    agentQuota: 2,
  },
  "legacy-escalation": {
    agentOffset: 96,
    evaluatorOffset: 18,
    evaluatorCapacity: 18,
    defaultActiveEvaluators: 5,
    agentCount: 18,
    agentQuota: 2,
  },
  "mortgage-queue": {
    agentOffset: 192,
    evaluatorOffset: 36,
    evaluatorCapacity: 18,
    defaultActiveEvaluators: 5,
    agentCount: 28,
    agentQuota: 2,
  },
  "customer-retention": {
    agentOffset: 288,
    evaluatorOffset: 54,
    evaluatorCapacity: 8,
    defaultActiveEvaluators: 4,
    agentCount: 20,
    agentQuota: 2,
  },
  "policy-renewal": {
    agentOffset: 336,
    evaluatorOffset: 72,
    evaluatorCapacity: 10,
    defaultActiveEvaluators: 4,
    agentCount: 22,
    agentQuota: 2,
  },
} as const satisfies Record<
  string,
  {
    agentOffset: number
    evaluatorOffset: number
    evaluatorCapacity: number
    defaultActiveEvaluators: number
    agentCount: number
    agentQuota: number
  }
>

function getVersionThreeRuleSeed(ruleId: string) {
  return versionThreeRuleSeeds[ruleId as keyof typeof versionThreeRuleSeeds] ?? versionThreeRuleSeeds["billing-qa"]
}

function getRuleScopedAgentName(ruleId: string, index: number) {
  const seed = getVersionThreeRuleSeed(ruleId)
  return getAgentName(seed.agentOffset + index)
}

function getRuleScopedEvaluatorName(ruleId: string, index: number) {
  const seed = getVersionThreeRuleSeed(ruleId)
  return getEvaluatorName(seed.evaluatorOffset + index)
}

function distributeEvaluatorLoad(total: number, slotCount: number, capacity: number) {
  if (total <= 0 || slotCount <= 0) {
    return []
  }

  const baseLoad = Math.floor(total / slotCount)
  const remainder = total % slotCount

  return Array.from({ length: slotCount }, (_, index) =>
    Math.min(baseLoad + (index < remainder ? 1 : 0), capacity)
  ).filter((load) => load > 0)
}

function distributeAssignmentLoad(totalAssignments: number, agentCount: number, maxPerAgent = 2) {
  if (totalAssignments <= 0 || agentCount <= 0) {
    return []
  }

  const loads = Array.from({ length: agentCount }, () => 0)
  let remainingAssignments = totalAssignments
  let agentIndex = 0

  while (remainingAssignments > 0 && agentIndex < agentCount) {
    const remainingAgents = agentCount - agentIndex
    const minimumAssignmentsForLaterAgents = Math.max(remainingAgents - 1, 0)
    const assignableToCurrentAgent = Math.min(
      maxPerAgent,
      Math.max(remainingAssignments - minimumAssignmentsForLaterAgents, 1)
    )

    loads[agentIndex] = assignableToCurrentAgent
    remainingAssignments -= assignableToCurrentAgent
    agentIndex += 1
  }

  return loads.filter((load) => load > 0)
}

function distributeMissedAssignments(totalMissed: number, agentCount: number, maxPerAgent = 2) {
  if (totalMissed <= 0 || agentCount <= 0) {
    return []
  }

  const misses = Array.from({ length: agentCount }, () => 0)
  let remainingMisses = totalMissed

  for (let pass = 0; pass < maxPerAgent && remainingMisses > 0; pass += 1) {
    for (let index = 0; index < agentCount && remainingMisses > 0; index += 1) {
      misses[index] += 1
      remainingMisses -= 1
    }
  }

  return misses
}

function buildCoveredAgentRows(
  ruleId: string,
  prefix: string,
  assignmentCount: number,
  startIndex = 24
) {
  const agentLoads = distributeAssignmentLoad(assignmentCount, Math.ceil(Math.max(assignmentCount, 0) / 2))

  return agentLoads.map((load, index) => ({
    id: `${prefix}-covered-${index + 1}`,
    name: getRuleScopedAgentName(ruleId, startIndex + index),
    status: "success",
    assignmentText: `${load}/2 assigned`,
  })) satisfies RuleAgentRow[]
}

function buildQuotaMetElsewhereRows(
  ruleId: string,
  prefix: string,
  count: number,
  viaRuleName?: string,
  detailText?: string,
  startIndex = 120
) {
  return Array.from({ length: Math.max(count, 0) }, (_, index) => ({
    id: `${prefix}-quota-${index + 1}`,
    name: getRuleScopedAgentName(ruleId, startIndex + index),
    status: "fyi",
    assignmentText: "2/2 assigned",
    viaRuleName,
    detailText:
      detailText ??
      `Coverage target was already met via ${viaRuleName ?? "another rule"} in this goal.`,
  })) satisfies RuleAgentRow[]
}

function buildIssueAgentRows(
  ruleId: string,
  prefix: string,
  issueGroups: VersionThreeAgentIssueScenario[] = [],
  totalMissedAssignments?: number
) {
  const normalizedIssueGroups = issueGroups.filter((issueGroup) => issueGroup.count > 0)
  const baseAgentCount = normalizedIssueGroups.reduce((total, issueGroup) => total + issueGroup.count, 0)
  const targetAgentCount =
    typeof totalMissedAssignments === "number" && totalMissedAssignments > 0
      ? Math.min(
          Math.max(baseAgentCount, Math.ceil(totalMissedAssignments / 2)),
          totalMissedAssignments
        )
      : baseAgentCount

  const trimmedIssueGroups: VersionThreeAgentIssueScenario[] = []
  let remainingAgentSlots = targetAgentCount

  normalizedIssueGroups.forEach((issueGroup) => {
    if (remainingAgentSlots <= 0) {
      return
    }

    const nextCount = Math.min(issueGroup.count, remainingAgentSlots)
    trimmedIssueGroups.push({
      ...issueGroup,
      count: nextCount,
    })
    remainingAgentSlots -= nextCount
  })

  const issueAgents = trimmedIssueGroups.flatMap((issueGroup, issueGroupIndex) =>
    Array.from({ length: issueGroup.count }, (_, index) => ({
      id: `${prefix}-issue-${issueGroupIndex + 1}-${index + 1}`,
      name: getRuleScopedAgentName(ruleId, (issueGroup.startIndex ?? 0) + index),
      status: "warning" as const,
      warningReason: issueGroup.warningReason,
      issueCodeLabel: issueGroup.issueCodeLabel,
      detailText: issueGroup.detailText,
      assignmentText: "0/2 assigned",
    }))
  )

  if (typeof totalMissedAssignments !== "number" || totalMissedAssignments <= 0 || issueAgents.length === 0) {
    return issueAgents
  }

  const missedLoads = distributeMissedAssignments(totalMissedAssignments, issueAgents.length)

  return issueAgents.map((agent, index) => {
    const missedAssignments = missedLoads[index] ?? 1
    return {
      ...agent,
      assignmentText: `${Math.max(2 - missedAssignments, 0)}/2 assigned`,
    }
  }) satisfies RuleAgentRow[]
}

function buildEvaluatorIssueRows(
  ruleId: string,
  prefix: string,
  issueGroups: VersionThreeEvaluatorIssueScenario[] = [],
  capacity: number
) {
  return issueGroups.flatMap((issueGroup, issueGroupIndex) =>
    Array.from({ length: issueGroup.count }, (_, index) => {
      const isFullLoad = (issueGroup.loadMode ?? "full") === "full"
      return {
        id: `${prefix}-evaluator-issue-${issueGroupIndex + 1}-${index + 1}`,
        name: getRuleScopedEvaluatorName(ruleId, (issueGroup.startIndex ?? 0) + index),
        status: "warning",
        loadText: `${isFullLoad ? capacity : 0}/${capacity}`,
        issueCodeLabel: issueGroup.issueCodeLabel,
        detailText: issueGroup.detailText,
      }
    })
  ) satisfies RuleEvaluatorRow[]
}

function buildActiveEvaluatorRows(
  ruleId: string,
  prefix: string,
  loads: number[],
  capacity: number,
  startIndex = 0
) {
  return loads.map((load, index) => ({
    id: `${prefix}-evaluator-active-${index + 1}`,
    name: getRuleScopedEvaluatorName(ruleId, startIndex + index),
    status: "success",
    loadText: `${load}/${capacity}`,
  })) satisfies RuleEvaluatorRow[]
}

function markEvaluatorsAsQuotaFull(
  evaluators: RuleEvaluatorRow[],
  detailText = "Reached the assignment cap for this goal."
) {
  return evaluators.map((evaluator) => ({
    ...evaluator,
    status: "warning" as const,
    issueCodeLabel: "Evaluator quota full" as const,
    detailText,
  })) satisfies RuleEvaluatorRow[]
}

const ruleConfigs: RuleConfig[] = [
  {
    id: "billing-qa",
    name: "Billing QA",
    assignmentType: "Agent evaluation",
    frequency: "weekly",
    goalType: "weekly",
    status: "Active",
    goals: [
      {
        id: "billing-upcoming",
        sourceId: "rule-23-7",
        listLabel: "Mar 9, 9:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 96,
        completed: 46,
        expected: 48,
        isUpcoming: true,
        hasPrediction: false,
      },
      {
        id: "billing-mar-2",
        sourceId: "rule-23-7",
        listLabel: "Mar 2, 9:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "partial",
        percent: 92,
        completed: 44,
        expected: 48,
        runsLeft: 1,
        issues: ["Insufficient matching conversations"],
      },
      {
        id: "billing-feb-23",
        sourceId: "rule-23-1",
        listLabel: "Feb 23, 9:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 50,
        expected: 50,
        issues: ["Insufficient matching conversations"],
      },
      {
        id: "billing-feb-16",
        sourceId: "rule-23-2",
        listLabel: "Feb 16, 9:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 48,
        expected: 48,
      },
      {
        id: "billing-feb-9",
        sourceId: "rule-23-1",
        listLabel: "Feb 9, 9:00 AM",
        sampleWindow: "Feb 2-8",
        status: "success",
        percent: 100,
        completed: 46,
        expected: 46,
      },
      {
        id: "billing-feb-2",
        sourceId: "rule-22-4",
        listLabel: "Feb 2, 9:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 50,
        expected: 50,
      },
      {
        id: "billing-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 9:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 48,
        expected: 48,
      },
      {
        id: "billing-jan-19",
        sourceId: "rule-23-7",
        listLabel: "Jan 19, 9:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 46,
        expected: 46,
      },
      {
        id: "billing-jan-12",
        sourceId: "rule-23-1",
        listLabel: "Jan 12, 9:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 48,
        expected: 48,
      },
      {
        id: "billing-jan-5",
        sourceId: "rule-20-8",
        listLabel: "Jan 5, 9:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 50,
        expected: 50,
      },
      {
        id: "billing-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 9:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 48,
        expected: 48,
      },
    ],
  },
  {
    id: "legacy-escalation",
    name: "Legacy Escalation QA",
    assignmentType: "Agent evaluation",
    frequency: "weekly",
    goalType: "weekly",
    status: "Active",
    goals: [
      {
        id: "legacy-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 9, 11:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 100,
        completed: 38,
        expected: 38,
        isUpcoming: true,
      },
      {
        id: "legacy-mar-2",
        sourceId: "rule-23-1",
        listLabel: "Mar 2, 11:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "success",
        percent: 100,
        completed: 36,
        expected: 36,
      },
      {
        id: "legacy-feb-23",
        sourceId: "rule-23-1",
        listLabel: "Feb 23, 11:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 34,
        expected: 34,
      },
      {
        id: "legacy-feb-16",
        sourceId: "rule-23-1",
        listLabel: "Feb 16, 11:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 38,
        expected: 38,
      },
      {
        id: "legacy-feb-9",
        sourceId: "rule-23-1",
        listLabel: "Feb 9, 11:00 AM",
        sampleWindow: "Feb 2-8",
        status: "success",
        percent: 100,
        completed: 36,
        expected: 36,
      },
      {
        id: "legacy-feb-2",
        sourceId: "rule-23-1",
        listLabel: "Feb 2, 11:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 36,
        expected: 36,
      },
      {
        id: "legacy-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 11:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 34,
        expected: 34,
      },
      {
        id: "legacy-jan-19",
        sourceId: "rule-23-1",
        listLabel: "Jan 19, 11:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 38,
        expected: 38,
      },
      {
        id: "legacy-jan-12",
        sourceId: "rule-23-1",
        listLabel: "Jan 12, 11:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 36,
        expected: 36,
      },
      {
        id: "legacy-jan-5",
        sourceId: "rule-23-1",
        listLabel: "Jan 5, 11:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 36,
        expected: 36,
      },
      {
        id: "legacy-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 11:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 34,
        expected: 34,
      },
    ],
  },
  {
    id: "mortgage-queue",
    name: "Mortgage Queue",
    assignmentType: "Agent evaluation",
    frequency: "weekly",
    goalType: "weekly",
    status: "Active",
    goals: [
      {
        id: "mortgage-upcoming",
        sourceId: "rule-23-2",
        listLabel: "Mar 9, 10:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 89,
        completed: 50,
        expected: 56,
        isUpcoming: true,
      },
      {
        id: "mortgage-mar-2",
        sourceId: "rule-23-2",
        listLabel: "Mar 2, 10:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "partial",
        percent: 93,
        completed: 52,
        expected: 56,
        runsLeft: 0,
        issues: ["Insufficient matching conversations", "Evaluator workload limit reached"],
      },
      {
        id: "mortgage-feb-23",
        sourceId: "rule-22-4",
        listLabel: "Feb 23, 10:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 58,
        expected: 58,
        issues: ["Evaluator workload limit reached"],
      },
      {
        id: "mortgage-feb-16",
        sourceId: "rule-23-1",
        listLabel: "Feb 16, 10:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 56,
        expected: 56,
      },
      {
        id: "mortgage-feb-9",
        sourceId: "rule-20-8",
        listLabel: "Feb 9, 10:00 AM",
        sampleWindow: "Feb 2-8",
        status: "failed",
        percent: 0,
        completed: 0,
        expected: 54,
        issues: ["Insufficient matching conversations"],
      },
      {
        id: "mortgage-feb-2",
        sourceId: "rule-23-7",
        listLabel: "Feb 2, 10:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 56,
        expected: 56,
      },
      {
        id: "mortgage-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 10:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 58,
        expected: 58,
      },
      {
        id: "mortgage-jan-19",
        sourceId: "rule-22-4",
        listLabel: "Jan 19, 10:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 54,
        expected: 54,
      },
      {
        id: "mortgage-jan-12",
        sourceId: "rule-20-8",
        listLabel: "Jan 12, 10:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 56,
        expected: 56,
      },
      {
        id: "mortgage-jan-5",
        sourceId: "rule-23-2",
        listLabel: "Jan 5, 10:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 58,
        expected: 58,
      },
      {
        id: "mortgage-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 10:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 56,
        expected: 56,
      },
    ],
  },
  {
    id: "customer-retention",
    name: "Customer Retention Watchlist",
    assignmentType: "Agent evaluation",
    frequency: "daily",
    goalType: "daily",
    status: "Active",
    goals: [
      {
        id: "retention-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 10, 8:30 AM",
        sampleWindow: "Mar 9",
        status: "scheduled",
        percent: 100,
        completed: 40,
        expected: 40,
        isUpcoming: true,
      },
      {
        id: "retention-mar-9",
        sourceId: "rule-23-1",
        listLabel: "Mar 9, 8:30 AM",
        sampleWindow: "Mar 8",
        status: "success",
        percent: 100,
        completed: 40,
        expected: 40,
      },
      {
        id: "retention-mar-8",
        sourceId: "rule-23-2",
        listLabel: "Mar 8, 8:30 AM",
        sampleWindow: "Mar 7",
        status: "partial",
        percent: 95,
        completed: 38,
        expected: 40,
        issues: ["Evaluator workload limit reached"],
      },
      {
        id: "retention-mar-7",
        sourceId: "rule-23-1",
        listLabel: "Mar 7, 8:30 AM",
        sampleWindow: "Mar 6",
        status: "success",
        percent: 100,
        completed: 42,
        expected: 42,
      },
      {
        id: "retention-mar-6",
        sourceId: "rule-23-1",
        listLabel: "Mar 6, 8:30 AM",
        sampleWindow: "Mar 5",
        status: "success",
        percent: 100,
        completed: 38,
        expected: 38,
      },
      {
        id: "retention-mar-5",
        sourceId: "rule-23-7",
        listLabel: "Mar 5, 8:30 AM",
        sampleWindow: "Mar 4",
        status: "success",
        percent: 100,
        completed: 40,
        expected: 40,
      },
      {
        id: "retention-mar-4",
        sourceId: "rule-23-1",
        listLabel: "Mar 4, 8:30 AM",
        sampleWindow: "Mar 3",
        status: "success",
        percent: 100,
        completed: 42,
        expected: 42,
      },
      {
        id: "retention-mar-3",
        sourceId: "rule-23-1",
        listLabel: "Mar 3, 8:30 AM",
        sampleWindow: "Mar 2",
        status: "success",
        percent: 100,
        completed: 38,
        expected: 38,
      },
      {
        id: "retention-mar-2",
        sourceId: "rule-23-1",
        listLabel: "Mar 2, 8:30 AM",
        sampleWindow: "Mar 1",
        status: "success",
        percent: 100,
        completed: 40,
        expected: 40,
      },
      {
        id: "retention-mar-1",
        sourceId: "rule-23-2",
        listLabel: "Mar 1, 8:30 AM",
        sampleWindow: "Feb 28",
        status: "success",
        percent: 100,
        completed: 42,
        expected: 42,
      },
      {
        id: "retention-feb-28",
        sourceId: "rule-23-1",
        listLabel: "Feb 28, 8:30 AM",
        sampleWindow: "Feb 27",
        status: "success",
        percent: 100,
        completed: 38,
        expected: 38,
      },
      {
        id: "retention-feb-27",
        sourceId: "rule-23-1",
        listLabel: "Feb 27, 8:30 AM",
        sampleWindow: "Feb 26",
        status: "success",
        percent: 100,
        completed: 40,
        expected: 40,
      },
      {
        id: "retention-feb-26",
        sourceId: "rule-23-1",
        listLabel: "Feb 26, 8:30 AM",
        sampleWindow: "Feb 25",
        status: "success",
        percent: 100,
        completed: 42,
        expected: 42,
      },
    ],
  },
  {
    id: "policy-renewal",
    name: "Policy Renewal Audit",
    assignmentType: "Agent evaluation",
    frequency: "monthly",
    goalType: "monthly",
    status: "Active",
    goals: [
      {
        id: "policy-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 31, 2:00 PM",
        sampleWindow: "Mar 1-31",
        status: "scheduled",
        percent: 100,
        completed: 44,
        expected: 44,
        isUpcoming: true,
        hasPrediction: false,
        totalRuns: 4,
      },
      {
        id: "policy-feb",
        sourceId: "rule-23-1",
        listLabel: "Feb 28, 2:00 PM",
        sampleWindow: "Feb 1-28",
        status: "success",
        percent: 100,
        completed: 44,
        expected: 44,
        totalRuns: 4,
      },
      {
        id: "policy-jan",
        sourceId: "rule-23-2",
        listLabel: "Jan 31, 2:00 PM",
        sampleWindow: "Jan 1-31",
        status: "partial",
        percent: 91,
        completed: 40,
        expected: 44,
        totalRuns: 4,
        issues: ["Insufficient matching conversations", "Evaluator workload limit reached"],
      },
      {
        id: "policy-dec",
        sourceId: "rule-23-1",
        listLabel: "Dec 31, 2:00 PM",
        sampleWindow: "Dec 1-31",
        status: "success",
        percent: 100,
        completed: 42,
        expected: 42,
        totalRuns: 4,
      },
      {
        id: "policy-nov",
        sourceId: "rule-22-4",
        listLabel: "Nov 30, 2:00 PM",
        sampleWindow: "Nov 1-30",
        status: "success",
        percent: 100,
        completed: 46,
        expected: 46,
        totalRuns: 4,
      },
      {
        id: "policy-oct",
        sourceId: "rule-23-1",
        listLabel: "Oct 31, 2:00 PM",
        sampleWindow: "Oct 1-31",
        status: "success",
        percent: 100,
        completed: 44,
        expected: 44,
        totalRuns: 4,
      },
      {
        id: "policy-sep",
        sourceId: "rule-23-1",
        listLabel: "Sep 30, 2:00 PM",
        sampleWindow: "Sep 1-30",
        status: "success",
        percent: 100,
        completed: 44,
        expected: 44,
        totalRuns: 4,
      },
    ],
  },
]

function getAgentName(index: number) {
  const safeIndex = Math.max(index, 0)
  const firstNameIndex = safeIndex % agentFirstNames.length
  const nameIndex = Math.floor(safeIndex / agentFirstNames.length)
  const firstName = agentFirstNames[firstNameIndex]
  const lastNameIndex = (firstNameIndex * 7 + nameIndex) % agentLastNames.length
  const rawLastName = agentLastNames[lastNameIndex]
  const lastName =
    firstName === "Jordan" && rawLastName === "Walker"
      ? agentLastNames[(lastNameIndex + 1) % agentLastNames.length]
      : rawLastName
  return `${firstName} ${lastName}`
}

function getEvaluatorName(index: number) {
  const safeIndex = Math.max(index, 0)
  const firstNameIndex = safeIndex % evaluatorFirstNames.length
  const nameIndex = Math.floor(safeIndex / evaluatorFirstNames.length)
  const firstName = evaluatorFirstNames[firstNameIndex]
  const lastName =
    evaluatorLastNames[(firstNameIndex * 5 + nameIndex) % evaluatorLastNames.length]
  return `${firstName} ${lastName}`
}

function humanizeName(name: string) {
  const trimmedName = name.trim()
  const agentMatch = /^Agent\s+(\d+)$/i.exec(trimmedName)
  if (agentMatch?.[1]) {
    return getAgentName(Math.max(0, Number.parseInt(agentMatch[1], 10) - 1))
  }

  const evaluatorMatch = /^Evaluator\s+(\d+)$/i.exec(trimmedName)
  if (evaluatorMatch?.[1]) {
    return getEvaluatorName(Math.max(0, Number.parseInt(evaluatorMatch[1], 10) - 1))
  }

  return trimmedName
}

const issueCodeDescriptions: Record<string, string> = {
  "Agent not in any rule":
    "This agent isn't included in any active assignment rule - manually or through dynamic selection. Add them to a rule to ensure QA coverage.",
  "Insufficient matching conversations":
    "No eligible conversations matched this rule during the run window.",
  "Evaluators' workload limit reached":
    "Evaluator workload or availability constraints blocked assignment.",
  "Rule execution failed":
    "The rule did not complete successfully in this run.",
  "No conversations in period":
    "This agent had zero conversations during the sampling period. They may have been off or on leave.",
  "Conversations didn't match filters":
    "This agent had conversations, but none matched the rule's conditions. Review the rule's filters.",
  "All evaluators at capacity":
    "Eligible conversations existed for this agent, but every evaluator in the rule had already reached their workload limit.",
  "Evaluator unavailable":
    "This evaluator was marked as unavailable or on leave when the rule ran.",
  "Evaluator quota full":
    "This evaluator reached the assignment cap configured for the goal.",
  "Workload limit reached":
    "This evaluator has reached the workload limit configured for the rule in this run.",
  "Rule did not execute":
    "The rule was scheduled but did not run due to a system error.",
  "Rule execution interrupted":
    "The rule started but timed out before processing all agents.",
  "Quota met by another rule":
    "This agent's QA goal was already met by a different rule. Not a failure - they received QA.",
  "No eligible conversations to assign":
    "No eligible conversations remained for this evaluator in the selected goal.",
}

function getIssueCodeDescription(issueCodeLabel: string) {
  const staticDescription = issueCodeDescriptions[issueCodeLabel]
  if (staticDescription) {
    return staticDescription
  }

  const timeOffMatch = /^Time off for (\d+) days? in the week$/i.exec(issueCodeLabel)
  if (timeOffMatch?.[1]) {
    const parsedDays = Number.parseInt(timeOffMatch[1], 10)
    const dayCount = Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 1
    return `This evaluator is planned out for ${dayCount} ${dayCount === 1 ? "day" : "days"} in this week.`
  }

  return "No additional details available."
}

function getCompactLoadValue(loadText: string) {
  const normalizedValue = loadText.replace(/\s+assigned\b/gi, "").trim()
  const [numerator] = normalizedValue.split("/")
  return numerator?.trim() || normalizedValue
}

function getAssignmentDisplayParts(assignmentText?: string) {
  const ensureAssignmentFraction = (value: string) => {
    const normalized = value.trim()

    if (!normalized) {
      return "0/1"
    }

    if (normalized.includes("/")) {
      return normalized
    }

    if (/^\d+$/.test(normalized)) {
      return `${normalized}/1`
    }

    return normalized
  }

  if (!assignmentText) {
    return {
      count: "0/1",
      note: undefined,
    }
  }

  const normalizedValue = assignmentText.replace(/\s+assigned\b/gi, "").trim()
  const viaSplit = normalizedValue.split(" via ")

  if (viaSplit.length > 1) {
    return {
      count: ensureAssignmentFraction(viaSplit[0]?.trim() || "0/1"),
      note: `via ${viaSplit.slice(1).join(" via ").trim()}`,
    }
  }

  return {
    count: ensureAssignmentFraction(normalizedValue || "0/1"),
    note: undefined,
  }
}

function isGenericViaRuleName(ruleName?: string) {
  if (!ruleName) {
    return true
  }

  return ruleName.trim().toLowerCase() === "another rule"
}

function getTimeOffDaysFromText(text?: string) {
  if (!text) {
    return 1
  }

  const dayMatch = text.match(/(\d+)\s+days?/i)
  if (!dayMatch?.[1]) {
    return 1
  }

  const parsedDays = Number.parseInt(dayMatch[1], 10)
  return Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 1
}

function getNormalizedPersonName(name: string) {
  return name.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase()
}

function getUniqueByName<T>(items: T[], getName: (item: T) => string) {
  const seenNames = new Set<string>()
  return items.filter((item) => {
    const normalizedName = getNormalizedPersonName(getName(item))
    if (seenNames.has(normalizedName)) {
      return false
    }

    seenNames.add(normalizedName)
    return true
  })
}

function getHistoryTone(status: RunStatus, percent: number) {
  if (status === "failed" || percent < 80) {
    return "failed"
  }

  if (percent < 100) {
    return "partial"
  }

  return "success"
}

function getPercentTextClassName(status: RunStatus, percent: number) {
  const tone = getHistoryTone(status, percent)

  if (tone === "success") {
    return "text-text-success"
  }

  if (tone === "partial") {
    return "text-text-warning"
  }

  return "text-text-error"
}

function getCompletedStatusLabel(status: RunStatus) {
  if (status === "success") {
    return "Success"
  }

  if (status === "partial") {
    return "Partial"
  }

  if (status === "failed") {
    return "Failed"
  }

  return "Scheduled"
}

function getGoalStatusLabel(status: RunStatus, percent: number) {
  return getCompletedStatusLabel(getHistoryTone(status, percent))
}

function getStatusIconPath(status: RunStatus, percent: number) {
  const tone = getHistoryTone(status, percent)

  if (tone === "success") {
    return "/status-icons/check-circle.svg"
  }

  if (tone === "partial") {
    return "/status-icons/partial.svg"
  }

  return "/status-icons/x-circle.svg"
}

function getGoalSummaryIconPath(goal: RuleHistoryGoal) {
  if (goal.isUpcoming) {
    const tone = getHistoryTone("success", goal.percent)

    if (tone === "success") {
      return "/status-icons/check-circle.svg"
    }

    if (tone === "partial") {
      return "/status-icons/partial.svg"
    }

    return "/status-icons/x-circle.svg"
  }

  return getStatusIconPath(goal.status, goal.percent)
}

function getGoalSummaryTone(goal: RuleHistoryGoal) {
  return goal.isUpcoming
    ? getHistoryTone("success", goal.percent)
    : getHistoryTone(goal.status, goal.percent)
}

function formatGoalRangeLabel(sampleWindow: string) {
  return sampleWindow.replace(/-/g, " - ")
}

function formatGoalRangeFull(sampleWindow: string): string {
  const year = new Date().getFullYear()
  const parts = sampleWindow.split("-").map((s) => s.trim())

  if (parts.length < 2) {
    const start = parseDateLabel(parts[0]!)
    if (!start) return sampleWindow
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[start.getMonth()]} ${start.getDate()}, ${year}`
  }

  const startStr = parts[0]!
  const endStr = parts[1]!
  const startDate = parseDateLabel(startStr)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  if (!startDate) return sampleWindow.replace(/-/g, " - ")

  const endHasMonth = /^[A-Z][a-z]+/.test(endStr)
  let endDate: Date | null
  if (endHasMonth) {
    endDate = parseDateLabel(endStr)
  } else {
    const day = parseInt(endStr, 10)
    if (isNaN(day)) return sampleWindow.replace(/-/g, " - ")
    endDate = new Date(year, startDate.getMonth(), day)
  }

  if (!endDate) return sampleWindow.replace(/-/g, " - ")

  const startFormatted = `${months[startDate.getMonth()]} ${startDate.getDate()}, ${year}`
  const endFormatted = `${months[endDate.getMonth()]} ${endDate.getDate()}, ${year}`

  return `${startFormatted} - ${endFormatted}`
}

function isNotGeneratedUpcomingGoal(goal: RuleHistoryGoal) {
  return goal.isUpcoming && !goal.hasPrediction
}

function getSourceAgentWarningReason(agent: SourceAgentRow): RuleAgentWarningReason {
  if (
    agent.warningReason === "no_matching_conversations" ||
    agent.warningReason === "all_evaluators_capacity" ||
    agent.warningReason === "no_conversations_in_period" ||
    agent.warningReason === "evaluator_unavailable" ||
    agent.warningReason === "rule_interrupted"
  ) {
    return agent.warningReason
  }

  const normalizedIssue = agent.issueCodeLabel?.trim().toLowerCase() ?? ""
  const normalizedDetail = agent.detailText?.trim().toLowerCase() ?? ""

  if (normalizedIssue.includes("no conversations in period")) {
    return "no_conversations_in_period"
  }

  if (
    normalizedIssue.includes("all evaluators at capacity") ||
    normalizedIssue.includes("workload") ||
    normalizedIssue.includes("capacity")
  ) {
    return "all_evaluators_capacity"
  }

  if (
    normalizedIssue.includes("rule did not execute") ||
    normalizedIssue.includes("rule execution failed") ||
    normalizedDetail.includes("system error")
  ) {
    return "rule_interrupted"
  }

  return "no_matching_conversations"
}

function getDefaultAgentIssueCodeLabel(agent: SourceAgentRow): IssueCodeLabel | undefined {
  const normalizedIssue = agent.issueCodeLabel?.trim().toLowerCase() ?? ""

  if (normalizedIssue.includes("quota met by another rule")) {
    return "Quota met by another rule"
  }

  if (normalizedIssue.includes("no conversations in period")) {
    return "No conversations in period"
  }

  if (normalizedIssue.includes("rule did not execute")) {
    return "Rule did not execute"
  }

  if (normalizedIssue.includes("rule execution failed")) {
    return "Rule execution failed"
  }

  if (
    normalizedIssue.includes("insufficient matching conversations") ||
    normalizedIssue.includes("no eligible conversations")
  ) {
    return "Insufficient matching conversations"
  }

  if (
    normalizedIssue.includes("all evaluators at capacity") ||
    normalizedIssue.includes("capacity")
  ) {
    return "All evaluators at capacity"
  }

  if (normalizedIssue.includes("evaluator unavailable")) {
    return "Evaluator unavailable"
  }

  return undefined
}

function getDefaultEvaluatorIssueCodeLabel(evaluator: SourceEvaluatorRow): IssueCodeLabel {
  const normalizedIssue = evaluator.issueCodeLabel?.trim().toLowerCase() ?? ""
  const normalizedDetail = evaluator.detailText?.trim().toLowerCase() ?? ""

  if (
    normalizedIssue.includes("time off") ||
    normalizedIssue.includes("evaluator unavailable") ||
    normalizedDetail.includes("unavailable")
  ) {
    return "Evaluator unavailable"
  }

  if (
    normalizedIssue.includes("quota full") ||
    normalizedIssue.includes("workload") ||
    normalizedIssue.includes("capacity")
  ) {
    return "Evaluator quota full"
  }

  return "No eligible conversations to assign"
}

function getRuleAgentIssueCodeLabel(agent: RuleAgentRow): IssueCodeLabel | undefined {
  if (agent.issueCodeLabel) {
    return agent.issueCodeLabel
  }

  if (agent.status !== "warning") {
    return undefined
  }

  if (agent.warningReason === "rule_interrupted") {
    return "Rule did not execute"
  }

  if (agent.warningReason === "evaluator_unavailable") {
    return "Evaluator unavailable"
  }

  if (agent.warningReason === "no_conversations_in_period") {
    return "No conversations in period"
  }

  if (agent.warningReason === "all_evaluators_capacity") {
    return "All evaluators at capacity"
  }

  const detailText = agent.detailText?.toLowerCase() ?? ""
  if (detailText.includes("0 conversations")) {
    return "No conversations in period"
  }

  return "Insufficient matching conversations"
}

function getRuleEvaluatorIssueCodeLabel(
  evaluator: RuleEvaluatorRow
): IssueCodeLabel | undefined {
  if (evaluator.issueCodeLabel) {
    if (evaluator.issueCodeLabel === "Evaluator unavailable") {
      const timeOffDays = getTimeOffDaysFromText(evaluator.detailText)
      return `Time off for ${timeOffDays} days in the week`
    }

    if (
      evaluator.issueCodeLabel === "Evaluator quota full" ||
      evaluator.issueCodeLabel === "Evaluators' workload limit reached" ||
      evaluator.issueCodeLabel === "All evaluators at capacity" ||
      evaluator.issueCodeLabel === "Workload limit reached"
    ) {
      return "Evaluator quota full"
    }

    return evaluator.issueCodeLabel
  }

  if (evaluator.status !== "warning") {
    return undefined
  }

  const detailText = evaluator.detailText?.toLowerCase() ?? ""
  if (
    detailText.includes("time off") ||
    detailText.includes("unavailable") ||
    detailText.includes("leave")
  ) {
    const timeOffDays = getTimeOffDaysFromText(evaluator.detailText)
    return `Time off for ${timeOffDays} days in the week`
  }

  return "Evaluator quota full"
}

function getRuleAgentIssueGroupLabel(agent: RuleAgentRow) {
  return (getRuleAgentIssueCodeLabel(agent) ?? "Issue").toLowerCase()
}

function getRuleAgentIssueSectionValue(label: string) {
  return `agents-issue-${label.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase()}`
}

function canResolveRuleAgentIssueGroup(label: string) {
  return !label.includes("rule execution failed") && !label.includes("rule did not execute")
}

function isEvaluatorWorkloadIssueLabel(label: string) {
  return label.includes("workload limit reached") || label.includes("all evaluators at capacity")
}

function getRuleAgentIssueCtaLabel(label: string) {
  if (isEvaluatorWorkloadIssueLabel(label)) {
    return "Adjust evaluators' workload"
  }

  if (
    label.includes("insufficient matching conversations") ||
    label.includes("no eligible conversations")
  ) {
    return "Adjust conversation filters"
  }

  return "Resolve"
}

function groupRuleAgentIssues(agents: RuleAgentRow[]): GroupedRuleAgentIssue[] {
  const groups = new Map<string, RuleAgentRow[]>()

  agents.forEach((agent) => {
    const label = getRuleAgentIssueGroupLabel(agent)
    const existingAgents = groups.get(label) ?? []
    existingAgents.push(agent)
    groups.set(label, existingAgents)
  })

  return Array.from(groups.entries()).map(([label, groupedAgents]) => ({
    sectionValue: getRuleAgentIssueSectionValue(label),
    label,
    agents: groupedAgents,
  }))
}

function buildFallbackAgentRows(prefix: string, count: number): RuleAgentRow[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    name: getAgentName(index + 2),
    status: "warning",
    warningReason: "rule_interrupted",
    issueCodeLabel: "Rule did not execute",
    detailText: "Coverage was blocked before assignments completed.",
    assignmentText: "0/2",
  }))
}

function buildFallbackEvaluatorRows(prefix: string, count: number): RuleEvaluatorRow[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    name: getEvaluatorName(index + 2),
    status: "warning",
    loadText: "0/18",
    issueCodeLabel: "Evaluator unavailable",
    detailText: "Awaiting follow-up on this goal.",
  }))
}

function buildWarningAgentRow(agent: SourceAgentRow): RuleAgentRow {
  return {
    id: agent.id,
    name: humanizeName(agent.name),
    status: "warning",
    warningReason: getSourceAgentWarningReason(agent),
    issueCodeLabel: getDefaultAgentIssueCodeLabel(agent),
    detailText: agent.detailText,
    assignmentText: agent.assignmentText ?? "0/2",
    viaRuleName: agent.viaRuleName,
  }
}

function buildCoveredAgentRow(agent: SourceAgentRow): RuleAgentRow {
  return {
    id: agent.id,
    name: humanizeName(agent.name),
    status: "success",
    detailText: agent.detailText,
    assignmentText: agent.assignmentText ?? "2/2 assigned",
  }
}

function buildQuotaMetElsewhereRow(agent: SourceAgentRow): RuleAgentRow {
  return {
    id: agent.id,
    name: humanizeName(agent.name),
    status: "fyi",
    detailText:
      agent.detailText ||
      `Coverage requirement was already met via ${agent.viaRuleName ?? "another rule"}.`,
    assignmentText: agent.assignmentText ?? "2/2 assigned",
    viaRuleName: agent.viaRuleName,
  }
}

function buildWarningEvaluatorRow(evaluator: SourceEvaluatorRow): RuleEvaluatorRow {
  return {
    id: evaluator.id,
    name: humanizeName(evaluator.name),
    status: "warning",
    loadText: evaluator.loadText ?? "0/18",
    issueCodeLabel: getDefaultEvaluatorIssueCodeLabel(evaluator),
    detailText: evaluator.detailText,
  }
}

function buildActiveEvaluatorRow(evaluator: SourceEvaluatorRow): RuleEvaluatorRow {
  return {
    id: evaluator.id,
    name: humanizeName(evaluator.name),
    status: "success",
    loadText: evaluator.loadText ?? "18/18",
    detailText: evaluator.detailText,
  }
}

const goalScenarios: Partial<Record<string, GoalScenario>> = {
  "billing-upcoming": {
    issueGroups: [
      {
        count: 3,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 2,
        startIndex: 3,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 3,
  },
  "billing-mar-2": {
    issueGroups: [
      {
        count: 4,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 2,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "billing-feb-16": {
    issueGroups: [
      {
        count: 2,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
      {
        count: 2,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 3,
  },
  "billing-feb-2": {
    issueGroups: [
      {
        count: 5,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 4,
        startIndex: 5,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 3,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "billing-jan-19": {
    issueGroups: [
      {
        count: 4,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 3,
        startIndex: 6,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "billing-jan-5": {
    issueGroups: [
      {
        count: 4,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 6,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
      {
        count: 7,
        startIndex: 10,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "mortgage-upcoming": {
    issueGroups: [
      {
        count: 6,
        startIndex: 0,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
      {
        count: 5,
        startIndex: 6,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
    ],
    evaluatorIssues: [
      {
        count: 3,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "mortgage-mar-2": {
    issueGroups: [
      {
        count: 4,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 3,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 3,
  },
  "mortgage-feb-23": {
    issueGroups: [
      {
        count: 5,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 4,
        startIndex: 5,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "mortgage-feb-9": {
    issueGroups: [
      {
        count: 70,
        startIndex: 0,
        warningReason: "rule_interrupted",
        issueCodeLabel: "Rule did not execute",
        detailText: "The scheduled run did not execute, so assignments were not created for these agents.",
      },
    ],
    activeEvaluatorCount: 0,
    activeEvaluatorLoads: [],
  },
  "mortgage-feb-2": {
    issueGroups: [
      {
        count: 4,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
      {
        count: 2,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 3,
  },
  "mortgage-jan-19": {
    issueGroups: [
      {
        count: 6,
        startIndex: 5,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
      {
        count: 5,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
    ],
    evaluatorIssues: [
      {
        count: 2,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 2,
  },
  "mortgage-jan-12": {
    issueGroups: [
      {
        count: 66,
        startIndex: 0,
        warningReason: "rule_interrupted",
        issueCodeLabel: "Rule did not execute",
        detailText: "The scheduled run did not execute, so assignments were not created for these agents.",
      },
    ],
    activeEvaluatorCount: 0,
    activeEvaluatorLoads: [],
  },
  "mortgage-jan-5": {
    issueGroups: [
      {
        count: 3,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 3,
        issueCodeLabel: "No eligible conversations to assign",
        detailText: "No additional matched conversations were available to route in this goal.",
        loadMode: "empty",
      },
    ],
    activeEvaluatorCount: 4,
  },
  "retention-mar-8": {
    issueGroups: [
      {
        count: 1,
        startIndex: 0,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
    ],
    activeEvaluatorCount: 4,
  },
  "retention-mar-5": {
    issueGroups: [
      {
        count: 2,
        startIndex: 2,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 1,
        issueCodeLabel: "No eligible conversations to assign",
        detailText: "No additional matched conversations were available to route in this goal.",
        loadMode: "empty",
      },
    ],
    activeEvaluatorCount: 4,
  },
  "retention-mar-1": {
    issueGroups: [
      {
        count: 1,
        startIndex: 4,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 2,
        issueCodeLabel: "No eligible conversations to assign",
        detailText: "No additional matched conversations were available to route in this goal.",
        loadMode: "empty",
      },
    ],
    activeEvaluatorCount: 4,
  },
  "policy-jan": {
    issueGroups: [
      {
        count: 1,
        startIndex: 0,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
      {
        count: 1,
        startIndex: 1,
        warningReason: "no_matching_conversations",
        issueCodeLabel: "Insufficient matching conversations",
        detailText: "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 2,
        issueCodeLabel: "No eligible conversations to assign",
        detailText: "No additional matched conversations were available to route in this goal.",
        loadMode: "empty",
      },
    ],
    activeEvaluatorCount: 4,
  },
  "policy-nov": {
    issueGroups: [
      {
        count: 2,
        startIndex: 0,
        warningReason: "all_evaluators_capacity",
        issueCodeLabel: "All evaluators at capacity",
        detailText: "Eligible conversations matched this rule, but every available evaluator was already at quota.",
      },
      {
        count: 1,
        startIndex: 2,
        warningReason: "no_conversations_in_period",
        issueCodeLabel: "No conversations in period",
        detailText: "No conversations were available for this agent during the sampling window.",
      },
    ],
    evaluatorIssues: [
      {
        count: 1,
        startIndex: 0,
        issueCodeLabel: "Evaluator quota full",
        detailText: "Reached the assignment cap for this goal.",
      },
    ],
    activeEvaluatorCount: 3,
  },
}

function buildGoalDetail(ruleId: string, config: GoalConfig): RunGoalDetail {
  const scenario = goalScenarios[config.id]
  const effectiveScenario =
    config.status === "success" && config.completed >= config.expected ? undefined : scenario
  const ruleSeed = getVersionThreeRuleSeed(ruleId)
  const missedAssignments = Math.max(config.expected - config.completed, 0)
  const minimumIssueAgentCount = missedAssignments > 0 ? Math.ceil(missedAssignments / 2) : 0

  let agentsWithoutQa = buildIssueAgentRows(
    ruleId,
    config.id,
    effectiveScenario?.issueGroups,
    missedAssignments
  )

  if (agentsWithoutQa.length === 0 && missedAssignments > 0) {
    agentsWithoutQa = buildIssueAgentRows(ruleId, config.id, [
      {
        count: minimumIssueAgentCount,
        startIndex: 0,
        warningReason: config.status === "failed" ? "rule_interrupted" : "no_matching_conversations",
        issueCodeLabel:
          config.status === "failed" ? "Rule did not execute" : "Insufficient matching conversations",
        detailText:
          config.status === "failed"
            ? "The scheduled run did not execute, so assignments were not created for these agents."
            : "Conversations existed in the window, but they did not match the current rule filters.",
      },
    ], missedAssignments)
  }

  if (agentsWithoutQa.length < minimumIssueAgentCount) {
    agentsWithoutQa = [
      ...agentsWithoutQa,
      ...buildIssueAgentRows(ruleId, `${config.id}-fill`, [
        {
          count: minimumIssueAgentCount - agentsWithoutQa.length,
          startIndex: agentsWithoutQa.length + 40,
          warningReason: "no_matching_conversations",
          issueCodeLabel: "Insufficient matching conversations",
          detailText: "Conversations existed in the window, but they did not match the current rule filters.",
        },
      ]),
    ]
  }

  const quotaMetElsewhere = buildQuotaMetElsewhereRows(
    ruleId,
    config.id,
    effectiveScenario?.quotaMetElsewhereCount ?? 0,
    effectiveScenario?.quotaMetElsewhereRuleName,
    effectiveScenario?.quotaMetElsewhereDetailText,
    effectiveScenario?.quotaMetElsewhereStartIndex
  )

  const coveredAgents = buildCoveredAgentRows(
    ruleId,
    config.id,
    Math.max(config.completed - quotaMetElsewhere.length * 2, 0),
    effectiveScenario?.coveredStartIndex
  )

  const evaluatorIssues = buildEvaluatorIssueRows(
    ruleId,
    config.id,
    effectiveScenario?.evaluatorIssues,
    ruleSeed.evaluatorCapacity
  )

  const reservedAssignments = (effectiveScenario?.evaluatorIssues ?? []).reduce((total, evaluatorIssue) => {
    if (
      evaluatorIssue.issueCodeLabel === "Evaluator quota full" &&
      (evaluatorIssue.loadMode ?? "full") === "full"
    ) {
      return total + evaluatorIssue.count * ruleSeed.evaluatorCapacity
    }

    return total
  }, 0)

  const activeEvaluatorLoads =
    effectiveScenario?.activeEvaluatorLoads ??
    distributeEvaluatorLoad(
      Math.max(config.completed - reservedAssignments, 0),
      effectiveScenario?.activeEvaluatorCount ??
        (config.completed > 0
          ? Math.min(
              ruleSeed.defaultActiveEvaluators,
              Math.max(
                1,
                Math.ceil(Math.max(config.completed - reservedAssignments, 0) / ruleSeed.evaluatorCapacity)
              )
            )
          : 0),
      ruleSeed.evaluatorCapacity
    )

  const activeEvaluators = buildActiveEvaluatorRows(
    ruleId,
    config.id,
    activeEvaluatorLoads,
    ruleSeed.evaluatorCapacity,
    effectiveScenario?.activeEvaluatorStartIndex ?? evaluatorIssues.length + 1
  )

  const hasEvaluatorCapacityIssue =
    agentsWithoutQa.some((agent) => agent.warningReason === "all_evaluators_capacity") ||
    evaluatorIssues.some(
      (evaluator) =>
        evaluator.issueCodeLabel === "Evaluator quota full" ||
        evaluator.issueCodeLabel === "All evaluators at capacity"
    )

  const normalizedEvaluatorIssues = hasEvaluatorCapacityIssue
    ? markEvaluatorsAsQuotaFull(evaluatorIssues)
    : evaluatorIssues
  const normalizedActiveEvaluators = hasEvaluatorCapacityIssue
    ? markEvaluatorsAsQuotaFull(activeEvaluators)
    : activeEvaluators

  const metadata = config.isUpcoming
    ? [
        { label: "Next run", value: config.listLabel },
        { label: "Will sample from", value: config.sampleWindow },
        { label: "Expected assignments", value: `${config.expected}` },
      ]
    : [
        { label: "Ran", value: config.listLabel },
        { label: "Sampling period", value: config.sampleWindow },
        { label: "Expected", value: `${config.expected}` },
        { label: "Made", value: `${config.completed}` },
        { label: "Missed", value: `${missedAssignments}` },
      ]

  return {
    status: config.status,
    statusLabel: getGoalStatusLabel(config.status, config.percent),
    countLabel: config.isUpcoming
      ? `~${config.completed} of ${config.expected}`
      : `${config.completed}/${config.expected}`,
    metadata,
    agentsWithoutQa,
    coveredAgents,
    quotaMetElsewhere,
    coveredAgentsLabel: config.isUpcoming
      ? `Projected agents covered (${coveredAgents.length + quotaMetElsewhere.length})`
      : `Agents covered (${coveredAgents.length + quotaMetElsewhere.length})`,
    evaluatorsWithIssues: normalizedEvaluatorIssues,
    activeEvaluators: normalizedActiveEvaluators,
    activeEvaluatorsLabel: config.isUpcoming
      ? `Projected evaluator workload (${normalizedActiveEvaluators.length + normalizedEvaluatorIssues.length})`
      : `Evaluators with assignments (${normalizedActiveEvaluators.length + normalizedEvaluatorIssues.length})`,
  }
}

function buildRuleHistoryGoal(ruleId: string, config: GoalConfig): RuleHistoryGoal {
  return {
    id: config.id,
    sourceId: config.sourceId,
    listLabel: config.listLabel,
    sampleWindow: config.sampleWindow,
    status: config.status,
    percent: config.percent,
    completed: config.completed,
    expected: config.expected,
    isUpcoming: config.isUpcoming ?? false,
    hasPrediction: config.hasPrediction ?? true,
    runsLeft: config.runsLeft ?? null,
    runBreakdown: config.runBreakdown ?? null,
    issues: config.issues ?? [],
    totalRuns: config.totalRuns ?? null,
    detail: buildGoalDetail(ruleId, config),
  }
}

const versionThreeRules: VersionThreeRule[] = ruleConfigs.map((ruleConfig) => ({
  id: ruleConfig.id,
  name: ruleConfig.name,
  assignmentType: ruleConfig.assignmentType,
  frequency: ruleConfig.frequency,
  goalType: ruleConfig.goalType,
  status: ruleConfig.status,
  goals: ruleConfig.goals.map((goalConfig) => buildRuleHistoryGoal(ruleConfig.id, goalConfig)),
}))

const initialPredictionFreshnessByGoalId: Record<string, PredictionFreshnessState> = {
  "billing-upcoming": {
    label: "Predicted 3h ago",
    isRefreshing: false,
    errorMessage: null,
    isRefreshDisabled: false,
  },
  "legacy-upcoming": {
    label: "Predicted 2h ago",
    isRefreshing: false,
    errorMessage: null,
    isRefreshDisabled: false,
  },
  "mortgage-upcoming": {
    label: "Predicted 5h ago",
    isRefreshing: false,
    errorMessage: null,
    isRefreshDisabled: false,
  },
  "policy-upcoming": {
    label: "Predicted 5h ago",
    isRefreshing: false,
    errorMessage: null,
    isRefreshDisabled: false,
  },
  "retention-upcoming": {
    label: "Predicted 4h ago",
    isRefreshing: false,
    errorMessage: null,
    isRefreshDisabled: false,
  },
}

const refreshedUpcomingPredictionConfigByGoalId: Partial<
  Record<string, Pick<GoalConfig, "status" | "percent" | "completed" | "expected">>
> = {
  "billing-upcoming": {
    status: "scheduled",
    percent: 100,
    completed: 91,
    expected: 91,
  },
  "legacy-upcoming": {
    status: "scheduled",
    percent: 100,
    completed: 84,
    expected: 84,
  },
  "mortgage-upcoming": {
    status: "scheduled",
    percent: 94,
    completed: 86,
    expected: 91,
  },
  "policy-upcoming": {
    status: "scheduled",
    percent: 100,
    completed: 32,
    expected: 32,
  },
  "retention-upcoming": {
    status: "scheduled",
    percent: 100,
    completed: 24,
    expected: 24,
  },
}

const refreshFailureGoalIds = new Set<string>(["mortgage-upcoming"])

function SettingsSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border-subtle bg-surface-subtle px-8 py-16 lg:w-240 lg:border-b-0 lg:overflow-y-auto lg:px-8 lg:py-24">
      <div className="flex flex-col gap-20">
        {settingsSections.map((section) => (
          <div key={section.heading ?? "untitled"} className="space-y-8">
            {section.heading ? (
              <p className="px-12 text-14 text-text-tertiary">{section.heading}</p>
            ) : null}

            <div className="space-y-4">
              {section.items.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-semibold",
                    item.active
                      ? "bg-surface-brand-subtle text-text-brand hover:bg-surface-brand-subtle"
                      : "text-text-primary"
                  )}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

function GoalSummaryCell({
  goal,
  actionLabel,
  onAction,
  isGenerating,
  onGenerate,
}: {
  goal: RuleHistoryGoal
  actionLabel?: string
  onAction?: () => void
  isGenerating?: boolean
  onGenerate?: () => void
}) {
  const showNotGeneratedState = isNotGeneratedUpcomingGoal(goal)

  return (
    <div className="flex min-w-0 items-center justify-between gap-28">
      <div className="flex min-w-0 flex-1 items-start gap-10">
        {!showNotGeneratedState ? (
          <GoalStatusIcon goal={goal} size="sm" className="mt-2" />
        ) : (
          <span
            aria-hidden="true"
            className="mt-2 size-16 shrink-0 rounded-full border border-border-strong bg-surface-card"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-14 font-semibold text-text-primary">
            {formatGoalRangeLabel(goal.sampleWindow)}
          </p>
          <p
            className="mt-4 whitespace-nowrap text-12 font-medium text-text-secondary"
          >
            {showNotGeneratedState
              ? "No predictions yet"
              : `${goal.isUpcoming ? "Predicted " : ""}${goal.percent}% | ${goal.completed}/${goal.expected}`}
          </p>
        </div>
      </div>

      {showNotGeneratedState && onGenerate ? (
        <GeneratePredictionLink
          isGenerating={isGenerating ?? false}
          onClick={onGenerate}
          className="shrink-0 self-center"
        />
      ) : null}

      {actionLabel && onAction ? (
        <Button variant="default" size="sm" className="shrink-0 self-center" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

function GoalStatusIcon({
  goal,
  size,
  className,
}: {
  goal: RuleHistoryGoal
  size: "sm" | "md" | "lg"
  className?: string
}) {
  const tone = getGoalSummaryTone(goal)
  const iconPath = tone === "failed" ? null : getGoalSummaryIconPath(goal)

  if (tone === "failed") {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-surface-error",
          size === "lg" ? "size-24" : "size-16",
          className
        )}
      >
        <X
          size={size === "lg" ? 14 : 10}
          className="text-text-inverse"
        />
      </span>
    )
  }

  if (!iconPath) {
    return null
  }

  return (
    <Image
      src={iconPath}
      alt=""
      width={size === "lg" ? 24 : 16}
      height={size === "lg" ? 24 : 16}
      aria-hidden="true"
      className={cn(size === "lg" ? "size-24" : "size-16", className)}
    />
  )
}

function SideSheetColumnHeader({
  leftLabel,
  rightLabel,
}: {
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div className="flex items-center justify-between gap-12 px-4 text-12 font-medium text-text-tertiary">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  )
}

function SideSheetStatusRail({
  tone,
  children,
}: {
  tone: "error" | "success"
  children: React.ReactNode
}) {
  return (
    <div className="flex items-stretch gap-12">
      <div
        className={cn(
          "mb-2 mt-2 w-4 shrink-0 self-stretch rounded-full",
          tone === "error" ? "bg-surface-error" : "bg-success-600"
        )}
      />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function RuleAgentRowCard({
  agent,
  showIssueCodeBadge,
  showSupportingText = true,
}: {
  agent: RuleAgentRow
  showIssueCodeBadge: boolean
  showSupportingText?: boolean
}) {
  const issueCodeLabel = showIssueCodeBadge ? getRuleAgentIssueCodeLabel(agent) : undefined
  const assignmentParts = getAssignmentDisplayParts(agent.assignmentText)
  const viaRuleLabel =
    agent.viaRuleName && !isGenericViaRuleName(agent.viaRuleName)
      ? `via ${agent.viaRuleName}`
      : assignmentParts.note
  const warningLabel =
    agent.warningReason === "no_matching_conversations"
      ? "No matching conversations"
      : agent.warningReason === "no_conversations_in_period"
        ? "No conversations in period"
        : agent.warningReason === "evaluator_unavailable"
          ? "Evaluator unavailable"
          : agent.warningReason === "rule_interrupted"
            ? "Rule did not execute"
            : "All evaluators at capacity"

  return (
    <div className="py-10">
      <div className="flex items-start justify-between gap-12">
        <div className="min-w-0">
          <div className="flex items-start gap-8">
            <Avatar name={agent.name} size="xs" />
            <div className="min-w-0">
              <p className="text-14 font-semibold text-text-primary">{agent.name}</p>
              {showSupportingText && issueCodeLabel ? (
                <SimpleTooltip
                  side="bottom"
                  content={
                    <span className="block max-w-200 whitespace-normal">
                      {getIssueCodeDescription(issueCodeLabel)}
                    </span>
                  }
                >
                  <Badge color="gray" size="sm" className="mt-8 w-fit">
                    {issueCodeLabel}
                  </Badge>
                </SimpleTooltip>
              ) : showSupportingText && agent.status === "warning" ? (
                <p className="mt-4 text-12 font-medium text-text-secondary">{warningLabel}</p>
              ) : null}
              {showSupportingText && agent.detailText && !issueCodeLabel ? (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{agent.detailText}</p>
              ) : null}
              {showSupportingText && agent.status === "fyi" && viaRuleLabel ? (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{viaRuleLabel}</p>
              ) : null}
            </div>
          </div>
        </div>
        <p className="shrink-0 text-14 font-semibold text-text-primary">{assignmentParts.count}</p>
      </div>
    </div>
  )
}

function RuleEvaluatorRowCard({
  evaluator,
  showIssueCodeBadge,
}: {
  evaluator: RuleEvaluatorRow
  showIssueCodeBadge: boolean
}) {
  const issueCodeLabel = showIssueCodeBadge
    ? getRuleEvaluatorIssueCodeLabel(evaluator)
    : undefined
  const workloadValue = getCompactLoadValue(evaluator.loadText)

  return (
    <div className="py-10">
      <div className="flex items-start justify-between gap-12">
        <div className="min-w-0">
          <div className="flex items-start gap-8">
            <Avatar name={evaluator.name} size="xs" />
            <div className="min-w-0">
              <p className="text-14 font-semibold text-text-primary">{evaluator.name}</p>
              {issueCodeLabel ? (
                <SimpleTooltip
                  side="bottom"
                  content={
                    <span className="block max-w-200 whitespace-normal">
                      {getIssueCodeDescription(issueCodeLabel)}
                    </span>
                  }
                >
                  <Badge color="gray" size="sm" className="mt-8 w-fit">
                    {issueCodeLabel}
                  </Badge>
                </SimpleTooltip>
              ) : null}
              {evaluator.detailText && !issueCodeLabel ? (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{evaluator.detailText}</p>
              ) : null}
            </div>
          </div>
        </div>
        <p className="shrink-0 text-14 font-semibold text-text-primary">{workloadValue}</p>
      </div>
    </div>
  )
}

function GoalSidebar({
  rule,
  selectedGoalId,
  onSelectGoal,
}: {
  rule: VersionThreeRule
  selectedGoalId: string
  onSelectGoal: (goalId: string) => void
}) {
  const upcomingGoals = rule.goals.filter((c) => c.isUpcoming)
  const currentGoal = rule.goals.find((c) => !c.isUpcoming && c.runsLeft !== null && c.runsLeft > 0)
  const pastGoals = rule.goals.filter(
    (c) => !c.isUpcoming && (c.runsLeft === null || c.runsLeft === 0)
  )

  return (
    <div className="flex w-204 shrink-0 flex-col gap-16 px-8 py-24">
      {upcomingGoals.length > 0 && (
        <GoalSidebarSection label="Upcoming goal prediction">
          {upcomingGoals.map((goal) => (
            <GoalSidebarItem
              key={goal.id}
              goal={goal}
              isSelected={goal.id === selectedGoalId}
              onSelect={() => onSelectGoal(goal.id)}
            />
          ))}
        </GoalSidebarSection>
      )}
      {currentGoal && (
        <GoalSidebarSection label="Current goal">
          <GoalSidebarItem
            goal={currentGoal}
            isSelected={currentGoal.id === selectedGoalId}
            onSelect={() => onSelectGoal(currentGoal.id)}
          />
        </GoalSidebarSection>
      )}
      {pastGoals.length > 0 && (
        <GoalSidebarSection label="Past goals">
          {pastGoals.map((goal) => (
            <GoalSidebarItem
              key={goal.id}
              goal={goal}
              isSelected={goal.id === selectedGoalId}
              onSelect={() => onSelectGoal(goal.id)}
            />
          ))}
        </GoalSidebarSection>
      )}
    </div>
  )
}

function GoalSidebarSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-px">
      <div className="px-24">
        <p className="text-12 font-medium text-text-secondary">{label}</p>
      </div>
      <div className="flex flex-col gap-8 p-8">{children}</div>
    </div>
  )
}

function GoalSidebarItem({
  goal,
  isSelected,
  onSelect,
}: {
  goal: RuleHistoryGoal
  isSelected: boolean
  onSelect: () => void
}) {
  const isNotGenerated = isNotGeneratedUpcomingGoal(goal)
  const displayLabel = isNotGenerated
    ? "Not generated yet"
    : goal.runsLeft
      ? `${goal.percent}% (${goal.runsLeft} run${goal.runsLeft === 1 ? "" : "s"} left)`
      : `${goal.percent}%`

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-12 rounded-lg px-16 py-8 text-left transition-colors",
        isSelected ? "bg-surface-subtle" : "hover:bg-surface-subtle/50"
      )}
    >
      {isNotGenerated ? (
        <span
          aria-hidden="true"
          className="mt-px size-12 shrink-0 rounded-full border border-border-strong bg-surface-card"
        />
      ) : (
        <GoalStatusIcon goal={goal} size="sm" className="mt-px shrink-0" />
      )}
      <div className="min-w-0">
        <p className="truncate text-14 font-semibold text-text-primary">{displayLabel}</p>
        <p className="text-12 font-medium text-text-secondary">
          {formatGoalRangeLabel(goal.sampleWindow)}
        </p>
      </div>
    </button>
  )
}

function GoalHeroCard({
  goal,
  isUpcoming,
  showNotGenerated,
  freshness,
  onRefreshPrediction,
}: {
  goal: RuleHistoryGoal
  isUpcoming: boolean
  showNotGenerated: boolean
  freshness: PredictionFreshnessState | null
  onRefreshPrediction: () => void
}) {
  if (showNotGenerated) {
    return (
      <Card className="border-border-subtle shadow-none">
        <div className="flex flex-col items-center gap-8 rounded-lg p-16 text-center">
          <p className="text-16 font-bold text-text-primary">
            {formatGoalRangeFull(goal.sampleWindow)}
          </p>
          {freshness ? (
            <GeneratePredictionLink
              isGenerating={freshness.isRefreshing}
              onClick={onRefreshPrediction}
              className="text-14"
            />
          ) : (
            <p className="text-14 font-medium text-text-secondary">No predictions yet</p>
          )}
        </div>
      </Card>
    )
  }

  const isAchieved = goal.percent >= 100
  const isUpcomingBelow100 = isUpcoming && goal.percent < 100
  const isFailed = !isUpcoming && goal.percent < 100 && (goal.runsLeft === null || goal.runsLeft === 0)
  const isInProgress = !isUpcoming && goal.percent < 100 && goal.runsLeft != null && goal.runsLeft > 0

  const bannerBg = isAchieved
    ? "bg-[#f0faf5]"
    : isFailed || isUpcomingBelow100
      ? "bg-[#fff0ee]"
      : isInProgress
        ? "bg-[#fff5eb]"
        : "bg-surface-subtle"

  const percentColor = isAchieved
    ? "text-[#308060]"
    : isFailed || isUpcomingBelow100
      ? "text-[#d44332]"
      : isInProgress
        ? "text-[#c67a1a]"
        : "text-text-primary"

  return (
    <Card className="border-border-subtle shadow-none">
      <div className="p-8">
        <div
          className={cn(
            "flex flex-col items-center gap-16 overflow-hidden rounded-lg p-16",
            bannerBg
          )}
        >
          <p className="text-16 font-bold text-text-primary">
            {formatGoalRangeFull(goal.sampleWindow)}
          </p>
          <div className="flex flex-col items-center gap-12 text-center">
            <p className={cn("text-24 font-bold tracking-tight", percentColor)}>
              {goal.percent}%
            </p>
            <p className="text-14 font-medium text-text-secondary">
              {isUpcoming
                ? `~${goal.completed} of ${goal.expected} predicted`
                : `Assigned ${goal.completed}/${goal.expected}`}
            </p>
            {isInProgress && goal.runsLeft != null && goal.runsLeft > 0 && (
              <p className="text-14 font-semibold text-[#c67a1a]">
                {goal.runsLeft} run{goal.runsLeft === 1 ? "" : "s"} left in the goal
              </p>
            )}
            {isUpcoming && freshness ? (
              <PredictionFreshnessLine freshness={freshness} onRefresh={onRefreshPrediction} />
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )
}

function getIssueGroupDisplayLabel(label: string): string {
  if (isEvaluatorWorkloadIssueLabel(label)) return "Evaluator workload limit reached"
  if (label.toLowerCase().includes("insufficient matching conversations"))
    return "Insufficient matching conversations"
  if (label.toLowerCase().includes("no eligible conversations"))
    return "No eligible conversations"
  if (label.toLowerCase().includes("rule did not execute"))
    return "Rule did not execute"
  const first = label.charAt(0).toUpperCase()
  return first + label.slice(1)
}

function parseDateLabel(str: string): Date | null {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  }
  const parts = str.trim().split(/\s+/)
  if (parts.length < 2) return null
  const month = months[parts[0]!]
  const day = parseInt(parts[1]!, 10)
  if (month === undefined || isNaN(day)) return null
  const year = new Date().getFullYear()
  return new Date(year, month, day)
}

type RunDetailRow = {
  id: string
  dateLabel: string
  status: "completed" | "predicted" | "skipped" | "not-run-yet"
  issueBadges: string[]
  assignedPercent: number | null
  assignedCount: number | null
  goalTarget: number | null
}

type RunAgentDetail = {
  name: string
  assigned: number
  quota: number
  fulfilledInPriorRun: boolean
  issueBadge: string | null
}

type RunEvaluatorDetail = {
  name: string
  assigned: number
  capacity: number
  issueBadge: string | null
}

type RunExpandedDetails = {
  agents: RunAgentDetail[]
  evaluators: RunEvaluatorDetail[]
}

function generateAllRunExpandedDetails(
  ruleId: string,
  runs: RunDetailRow[]
): Record<string, RunExpandedDetails> {
  const seed = getVersionThreeRuleSeed(ruleId)
  const { agentCount, agentQuota, defaultActiveEvaluators, evaluatorCapacity } = seed

  const cumulativeAgentAssigned = new Array(agentCount).fill(0)
  const result: Record<string, RunExpandedDetails> = {}

  for (const run of runs) {
    if (run.status !== "completed" || run.assignedCount === null) {
      continue
    }

    const totalAssigned = run.assignedCount
    const hasInsufficientConversations = run.issueBadges.includes("Insufficient matching conversations")
    const hasEvaluatorWorkload = run.issueBadges.includes("Evaluator workload limit reached")

    const agents: RunAgentDetail[] = []
    let assignRemaining = totalAssigned

    for (let i = 0; i < agentCount; i++) {
      const alreadyFulfilled = cumulativeAgentAssigned[i]! >= agentQuota

      if (alreadyFulfilled) {
        agents.push({
          name: getRuleScopedAgentName(ruleId, i),
          assigned: agentQuota,
          quota: agentQuota,
          fulfilledInPriorRun: true,
          issueBadge: null,
        })
      } else {
        const needed = agentQuota - cumulativeAgentAssigned[i]!
        const canAssign = Math.min(needed, assignRemaining)
        agents.push({
          name: getRuleScopedAgentName(ruleId, i),
          assigned: canAssign,
          quota: agentQuota,
          fulfilledInPriorRun: false,
          issueBadge: null,
        })
        cumulativeAgentAssigned[i] = cumulativeAgentAssigned[i]! + canAssign
        assignRemaining -= canAssign
      }
    }

    const activeAgents = agents.filter((a) => !a.fulfilledInPriorRun && a.assigned < agentQuota)
    if (activeAgents.length > 0 && run.issueBadges.length > 0) {
      const workloadCount = hasEvaluatorWorkload ? Math.ceil(activeAgents.length / 2) : 0
      activeAgents.forEach((agent, idx) => {
        if (hasEvaluatorWorkload && idx < workloadCount) {
          agent.issueBadge = "Evaluator workload limit reached"
        } else if (hasInsufficientConversations) {
          agent.issueBadge = "Insufficient matching conversations"
        } else if (hasEvaluatorWorkload) {
          agent.issueBadge = "Evaluator workload limit reached"
        }
      })
    }

    const evaluators: RunEvaluatorDetail[] = []
    let evalRemaining = totalAssigned
    for (let i = 0; i < defaultActiveEvaluators; i++) {
      const share = Math.ceil(evalRemaining / (defaultActiveEvaluators - i))
      const actualAssign = Math.min(share, evalRemaining, evaluatorCapacity)
      evaluators.push({
        name: getRuleScopedEvaluatorName(ruleId, i),
        assigned: actualAssign,
        capacity: evaluatorCapacity,
        issueBadge: null,
      })
      evalRemaining -= actualAssign
    }

    if (hasEvaluatorWorkload) {
      evaluators.forEach((ev) => {
        if (ev.assigned >= ev.capacity) {
          ev.issueBadge = "Evaluator workload limit reached"
        }
      })
    }

    result[run.id] = { agents, evaluators }
  }

  return result
}

function generateDecayDistribution(totalPercent: number, numRuns: number): number[] {
  if (numRuns <= 0) return []
  const portions = [totalPercent]
  for (let i = 1; i < numRuns; i++) {
    portions.push(0)
  }
  return portions
}

function generateRunDates(
  startDate: Date,
  totalRuns: number,
  totalDays: number,
  months: string[],
  runTime: string,
): string[] {
  const dates: string[] = []
  const step = totalRuns >= totalDays ? 1 : Math.floor(totalDays / totalRuns)

  for (let i = 0; i < totalRuns; i++) {
    const dayOffset = totalRuns >= totalDays ? i : i * step
    const d = new Date(startDate)
    d.setDate(d.getDate() + dayOffset)
    dates.push(`${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${runTime}`)
  }

  return dates
}

function generateRunDetailRows(goal: RuleHistoryGoal): RunDetailRow[] {
  const parts = goal.sampleWindow.split("-").map((s) => s.trim())
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const hasIssues = goal.issues.length > 0
  const isAchieved = goal.percent >= 100

  const runTimeParts = goal.listLabel.match(/(\d{1,2}:\d{2}\s*[AP]M)/i)
  const runTime = runTimeParts ? runTimeParts[1]! : "9 AM"

  if (parts.length < 2) {
    if (goal.isUpcoming) {
      if (!goal.hasPrediction) {
        return [{
          id: "run-1",
          dateLabel: goal.listLabel,
          status: "not-run-yet",
          issueBadges: [],
          assignedPercent: null,
          assignedCount: null,
          goalTarget: goal.expected,
        }]
      }
      const predictedIssues = goal.issues.length > 0
        ? goal.issues
        : goal.percent < 100
          ? ["Insufficient matching conversations"]
          : []
      return [{
        id: "run-1",
        dateLabel: goal.listLabel,
        status: "predicted",
        issueBadges: predictedIssues,
        assignedPercent: goal.percent,
        assignedCount: goal.completed,
        goalTarget: goal.expected,
      }]
    }
    return [{
      id: "run-1",
      dateLabel: goal.listLabel,
      status: "completed",
      issueBadges: isAchieved ? [] : goal.issues,
      assignedPercent: goal.percent,
      assignedCount: goal.completed,
      goalTarget: goal.expected,
    }]
  }

  const startDate = parseDateLabel(parts[0]!)
  let endDate = parseDateLabel(parts[1]!)
  if (!endDate && startDate && parts[1]) {
    const dayOnly = parseInt(parts[1].trim(), 10)
    if (!isNaN(dayOnly)) {
      endDate = new Date(startDate.getFullYear(), startDate.getMonth(), dayOnly)
    }
  }
  if (!startDate || !endDate) {
    return [{
      id: "run-1",
      dateLabel: goal.listLabel,
      status: "completed",
      issueBadges: [],
      assignedPercent: goal.percent,
      assignedCount: goal.completed,
      goalTarget: goal.expected,
    }]
  }

  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const totalRuns = goal.totalRuns ?? totalDays
  const completedRuns = goal.runsLeft != null
    ? totalRuns - goal.runsLeft
    : isAchieved ? totalRuns : Math.max(1, totalRuns)

  const runDates = generateRunDates(startDate, totalRuns, totalDays, months, runTime)
  const rows: RunDetailRow[] = []

  if (goal.isUpcoming) {
    if (!goal.hasPrediction) {
      for (let i = 0; i < totalRuns; i++) {
        rows.push({
          id: `run-${i + 1}`,
          dateLabel: runDates[i]!,
          status: "not-run-yet",
          issueBadges: [],
          assignedPercent: null,
          assignedCount: null,
          goalTarget: goal.expected,
        })
      }
      return rows
    }

    const predictedIssues = goal.issues.length > 0
      ? goal.issues
      : goal.percent < 100
        ? ["Insufficient matching conversations"]
        : []
    const hasPredictedIssues = predictedIssues.length > 0

    if (!hasPredictedIssues) {
      rows.push({
        id: "run-1",
        dateLabel: runDates[0]!,
        status: "predicted",
        issueBadges: [],
        assignedPercent: 100,
        assignedCount: goal.expected,
        goalTarget: goal.expected,
      })
      for (let i = 1; i < totalRuns; i++) {
        rows.push({
          id: `run-${i + 1}`,
          dateLabel: runDates[i]!,
          status: "predicted",
          issueBadges: [],
          assignedPercent: 0,
          assignedCount: 0,
          goalTarget: goal.expected,
        })
      }
    } else {
      const distribution = generateDecayDistribution(goal.percent, totalRuns)
      let cumAssigned = 0
      for (let i = 0; i < totalRuns; i++) {
        const pct = distribution[i]!
        const assigned = i === totalRuns - 1
          ? goal.completed - cumAssigned
          : Math.round((pct / 100) * goal.expected)
        cumAssigned += assigned
        rows.push({
          id: `run-${i + 1}`,
          dateLabel: runDates[i]!,
          status: "predicted",
          issueBadges: predictedIssues,
          assignedPercent: pct,
          assignedCount: Math.max(0, assigned),
          goalTarget: goal.expected,
        })
      }
    }
    return rows
  }

  if (isAchieved && !hasIssues) {
    rows.push({
      id: "run-1",
      dateLabel: runDates[0]!,
      status: "completed",
      issueBadges: [],
      assignedPercent: 100,
      assignedCount: goal.completed,
      goalTarget: goal.expected,
    })
    for (let i = 1; i < totalRuns; i++) {
      rows.push({
        id: `run-${i + 1}`,
        dateLabel: runDates[i]!,
        status: "skipped",
        issueBadges: [],
        assignedPercent: null,
        assignedCount: null,
        goalTarget: goal.expected,
      })
    }
    return rows
  }

  if (isAchieved && hasIssues) {
    const issueRunCount = Math.min(completedRuns - 1, 2)
    const firstIssuePct = 35
    const secondIssuePct = issueRunCount > 1 ? 15 : 0
    const issuePercents = issueRunCount > 1 ? [firstIssuePct, secondIssuePct] : [firstIssuePct]
    const clearingPercent = 100 - firstIssuePct - secondIssuePct

    let cumAssigned = 0
    for (let i = 0; i < issueRunCount; i++) {
      const pct = issuePercents[i]!
      const assigned = Math.round((pct / 100) * goal.expected)
      cumAssigned += assigned
      rows.push({
        id: `run-${i + 1}`,
        dateLabel: runDates[i]!,
        status: "completed",
        issueBadges: goal.issues,
        assignedPercent: pct,
        assignedCount: assigned,
        goalTarget: goal.expected,
      })
    }

    const clearingAssigned = goal.completed - cumAssigned
    rows.push({
      id: `run-${issueRunCount + 1}`,
      dateLabel: runDates[issueRunCount]!,
      status: "completed",
      issueBadges: [],
      assignedPercent: clearingPercent,
      assignedCount: Math.max(0, clearingAssigned),
      goalTarget: goal.expected,
    })

    for (let i = issueRunCount + 1; i < totalRuns; i++) {
      rows.push({
        id: `run-${i + 1}`,
        dateLabel: runDates[i]!,
        status: "skipped",
        issueBadges: [],
        assignedPercent: null,
        assignedCount: null,
        goalTarget: null,
      })
    }
    return rows
  }

  const distribution = generateDecayDistribution(goal.percent, completedRuns)
  let cumAssigned = 0

  for (let i = 0; i < completedRuns; i++) {
    const pct = distribution[i]!
    const assigned = i === completedRuns - 1
      ? goal.completed - cumAssigned
      : Math.round((pct / 100) * goal.expected)
    cumAssigned += assigned

    rows.push({
      id: `run-${i + 1}`,
      dateLabel: runDates[i]!,
      status: "completed",
      issueBadges: goal.issues,
      assignedPercent: pct,
      assignedCount: assigned,
      goalTarget: goal.expected,
    })
  }

  for (let i = completedRuns; i < totalRuns; i++) {
    rows.push({
      id: `run-${i + 1}`,
      dateLabel: runDates[i]!,
      status: "not-run-yet",
      issueBadges: [],
      assignedPercent: null,
      assignedCount: null,
      goalTarget: goal.expected,
    })
  }

  return rows
}

function RunListView({
  rows,
  onSelectRun,
}: {
  rows: RunDetailRow[]
  onSelectRun: (runId: string) => void
}) {
  const allPredicted = rows.every((r) => r.status === "predicted" || r.status === "not-run-yet")

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1fr_1fr_auto_auto] items-center border-b border-border-subtle px-8 py-12">
        <p className="text-12 font-semibold text-text-secondary">{allPredicted ? "Predicted runs" : "Run details"}</p>
        <p className="text-12 font-semibold text-text-secondary">{allPredicted ? "Predicted issues" : "Issues"}</p>
        <p className="w-96 text-right text-12 font-semibold text-text-secondary">{allPredicted ? "Predicted assignment" : "Assignment"}</p>
        <div className="w-24" />
      </div>
      {rows.map((run) => {
        const isClickable = run.status === "completed"
        const isPredicted = run.status === "predicted"
        const hasData = run.status === "completed" || isPredicted

        return (
          <div
            key={run.id}
            className={`grid grid-cols-[1fr_1fr_auto_auto] items-center border-b border-border-subtle px-8 py-12 last:border-b-0 ${isClickable ? "cursor-pointer hover:bg-surface-subtle" : ""}`}
            onClick={isClickable ? () => onSelectRun(run.id) : undefined}
          >
            <p className={`text-14 font-medium ${isPredicted ? "text-text-secondary" : "text-text-primary"}`}>{run.dateLabel}</p>

            <div className="flex flex-wrap gap-4">
              {(run.status === "completed" || isPredicted) && run.issueBadges.length > 0 ? (
                run.issueBadges.map((badge, idx) => (
                  <Badge key={idx} color="gray" size="sm">
                    {badge}
                  </Badge>
                ))
              ) : (
                <span className="text-14 text-text-tertiary">&ndash;</span>
              )}
            </div>

            <div className="w-96 text-right">
              {hasData ? (
                <div className="flex flex-col items-end">
                  <p className={`text-14 font-medium ${isPredicted ? "text-text-secondary" : "text-text-primary"}`}>{run.assignedPercent}%</p>
                  <p className="text-12 text-text-secondary">
                    {run.assignedCount}/{run.goalTarget}
                  </p>
                </div>
              ) : run.status === "skipped" ? (
                <span className="text-14 text-text-tertiary">&ndash;</span>
              ) : (
                <p className="text-14 text-text-tertiary">Not run yet</p>
              )}
            </div>

            <div className="flex w-24 items-center justify-end">
              {isClickable && (
                <ChevronRight size={14} className="text-icon-tertiary" />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function RunDetailView({
  run,
  details,
  onBack,
}: {
  run: RunDetailRow
  details: RunExpandedDetails
  onBack: () => void
}) {
  const { agents, evaluators } = details
  const sortedAgents = [...agents].sort((a, b) => {
    if (a.issueBadge && !b.issueBadge) return -1
    if (!a.issueBadge && b.issueBadge) return 1
    if (!a.fulfilledInPriorRun && b.fulfilledInPriorRun) return -1
    if (a.fulfilledInPriorRun && !b.fulfilledInPriorRun) return 1
    return 0
  })
  const issueEvaluators = evaluators.filter((ev) => ev.issueBadge)
  const healthyEvaluators = evaluators.filter((ev) => !ev.issueBadge)
  const sortedEvaluators = [...issueEvaluators, ...healthyEvaluators]

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-6 text-14 font-medium text-text-primary hover:text-text-secondary"
        >
          <ChevronLeft size={16} className="text-icon-secondary" />
          {run.dateLabel}
        </button>
        {run.status === "completed" && run.assignedPercent !== null && (
          <div className="flex items-center gap-8">
            <span className="text-14 font-medium text-text-primary">{run.assignedPercent}%</span>
            <span className="text-12 text-text-secondary">
              {run.assignedCount}/{run.goalTarget}
            </span>
          </div>
        )}
      </div>

      <div className="px-8 pt-12">
        <Tabs defaultValue="agents" className="flex flex-col">
          <NeutralTabsList className="w-full p-4">
            <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">
              Agents ({agents.length})
            </NeutralTabsTrigger>
            <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">
              Evaluators ({evaluators.length})
            </NeutralTabsTrigger>
          </NeutralTabsList>

          <TabsContent value="agents" className="mt-12">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 items-center pb-8">
                <p className="text-12 font-semibold text-text-secondary">Agent</p>
                <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                <p className="text-12 font-semibold text-text-secondary">Status</p>
              </div>
              {sortedAgents.map((agent, idx) => (
                <div
                  key={`${agent.name}-${idx}`}
                  className="grid grid-cols-3 items-center border-t border-border-subtle py-8"
                >
                  <span className="truncate text-12 text-text-primary">
                    {agent.name}
                  </span>
                  <span className="text-12 text-text-secondary">
                    {agent.fulfilledInPriorRun
                      ? "Fulfilled in prior run"
                      : <span className="tabular-nums">{agent.assigned} / {agent.quota}</span>}
                  </span>
                  <div className="flex items-center">
                    {agent.fulfilledInPriorRun ? null : agent.issueBadge ? (
                      <Badge color="gray" size="sm">
                        {agent.issueBadge}
                      </Badge>
                    ) : agent.assigned >= agent.quota ? (
                      <Badge color="primary" size="sm">
                        Goal met
                      </Badge>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evaluators" className="mt-12">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 items-center pb-8">
                <p className="text-12 font-semibold text-text-secondary">Evaluator</p>
                <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                <p className="text-12 font-semibold text-text-secondary">Status</p>
              </div>
              {sortedEvaluators.map((ev) => (
                <div
                  key={ev.name}
                  className="grid grid-cols-3 items-center border-t border-border-subtle py-8"
                >
                  <span className="truncate text-12 text-text-primary">{ev.name}</span>
                  <span className="text-12 tabular-nums text-text-secondary">
                    {ev.assigned} / {ev.capacity}
                  </span>
                  <div className="flex items-center">
                    {ev.issueBadge ? (
                      <Badge color="gray" size="sm">
                        {ev.issueBadge}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function RunDetailsPanel({ goal, ruleId }: { goal: RuleHistoryGoal; ruleId: string }) {
  const rows = React.useMemo(() => generateRunDetailRows(goal), [goal])
  const allRunDetails = React.useMemo(() => generateAllRunExpandedDetails(ruleId, rows), [ruleId, rows])
  const [selectedRunId, setSelectedRunId] = React.useState<string | null>(null)

  const selectedRun = selectedRunId ? rows.find((r) => r.id === selectedRunId) ?? null : null

  if (selectedRun && allRunDetails[selectedRun.id]) {
    return (
      <RunDetailView
        run={selectedRun}
        details={allRunDetails[selectedRun.id]}
        onBack={() => setSelectedRunId(null)}
      />
    )
  }

  return <RunListView rows={rows} onSelectRun={setSelectedRunId} />
}

function RunHistoryModal({
  rule,
  selectedGoalId,
  onClose,
  onSelectGoal,
  onOpenRuleSetup,
  predictionFreshnessByGoalId,
  onRefreshUpcomingPrediction,
}: {
  rule: VersionThreeRule | null
  selectedGoalId: string | null
  onClose: () => void
  onSelectGoal: (goalId: string) => void
  onOpenRuleSetup: (ruleName: string) => void
  predictionFreshnessByGoalId: Record<string, PredictionFreshnessState>
  onRefreshUpcomingPrediction: (ruleId: string, goalId: string) => void
}) {
  const selectedGoal =
  rule?.goals.find((goal) => goal.id === selectedGoalId) ?? rule?.goals[0] ?? null

  const isUpcoming = selectedGoal?.isUpcoming ?? false
  const showSelectedGoalNotGeneratedState =
    selectedGoal ? isNotGeneratedUpcomingGoal(selectedGoal) : false
  const selectedGoalFreshness =
    selectedGoal ? predictionFreshnessByGoalId[selectedGoal.id] ?? null : null

  if (!rule || !selectedGoal) {
    return null
  }

  return (
    <Dialog open={Boolean(rule)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="xl"
        className="top-1/2 -translate-y-1/2 bg-surface-page shadow-md"
      >
        <div className="flex items-center justify-between gap-16 border-b border-border-subtle px-24 py-20">
          <div className="min-w-0">
            <DialogTitle className="text-20 font-bold tracking-tight text-text-primary">{rule.name}</DialogTitle>
          </div>
          <div className="flex items-center gap-8">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenRuleSetup(rule.name)}
              iconRight={<ExternalLink size={14} className="text-icon-secondary" />}
            >
              Rule setup
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close run history"
                iconLeft={<X size={16} className="text-icon-primary" />}
              />
            </DialogClose>
          </div>
        </div>

        <DialogBody className="flex min-h-0 overflow-hidden px-0 py-0">
          <div className="flex min-h-0 flex-1">
            <GoalSidebar
              rule={rule}
              selectedGoalId={selectedGoal.id}
              onSelectGoal={onSelectGoal}
            />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface-page">
              <div className="shrink-0 p-16 pb-0">
                <GoalHeroCard
                  goal={selectedGoal}
                  isUpcoming={isUpcoming}
                  showNotGenerated={showSelectedGoalNotGeneratedState}
                  freshness={selectedGoalFreshness}
                  onRefreshPrediction={() => onRefreshUpcomingPrediction(rule.id, selectedGoal.id)}
                />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-16">
                {showSelectedGoalNotGeneratedState ? (
                  <p className="py-24 text-center text-14 font-medium text-text-tertiary">
                    Generate a prediction to see run details.
                  </p>
                ) : (
                  <RunDetailsPanel goal={selectedGoal} ruleId={rule.id} />
                )}
              </div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function FigmaGoalCell({
  goal,
  onClick,
}: {
  goal: RuleHistoryGoal
  onClick?: () => void
}) {
  const showNotGenerated = isNotGeneratedUpcomingGoal(goal)
  const hasValue = !showNotGenerated

  const isAchieved = hasValue && goal.percent >= 100
  const isUpcomingBelow100 = hasValue && goal.isUpcoming && goal.percent < 100
  const isFailed = hasValue && !goal.isUpcoming && goal.percent < 100 && (goal.runsLeft === null || goal.runsLeft === 0)
  const isInProgress = hasValue && !goal.isUpcoming && goal.percent < 100 && goal.runsLeft != null && goal.runsLeft > 0

  const runsLeftSuffix =
    !goal.isUpcoming && goal.runsLeft != null
      ? ` (${goal.runsLeft} run${goal.runsLeft !== 1 ? "s" : ""} left)`
      : ""

  const displayText = hasValue
    ? `${goal.percent}%${runsLeftSuffix}`
    : "-"

  const cellBg = isFailed || isUpcomingBelow100
    ? "bg-[#fff0ee] hover:bg-[#ffe5e1]"
    : isInProgress
      ? "bg-[#fff5eb] hover:bg-[#ffeddb]"
      : "hover:bg-stone-100"

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group/cell flex w-full items-center justify-between rounded-lg px-12 py-10 text-left transition-colors",
          cellBg
        )}
      >
        <div className="flex flex-col">
          <p className="text-14 text-text-primary">{displayText}</p>
          <p className="text-12 text-text-secondary">{formatGoalRangeLabel(goal.sampleWindow)}</p>
        </div>
        <ChevronRight
          size={16}
          className="text-icon-tertiary opacity-0 transition-opacity group-hover/cell:opacity-100"
        />
      </button>
    </div>
  )
}

function UpcomingGoalTableHeader() {
  return (
    <div className="flex items-center gap-6">
      <span className="text-12 font-semibold text-text-primary">Upcoming goal prediction</span>
      <SimpleTooltip
        side="bottom"
        align="start"
        content={
          <span className="block max-w-240 whitespace-normal text-12 font-medium">
            Predictions are generated automatically 24 hours before each rule&apos;s scheduled run.
            Click into any cell for details or to refresh with the latest data.
          </span>
        }
      >
        <span className="inline-flex items-center text-icon-secondary">
          <InfoCircle size={16} className="text-icon-secondary" />
        </span>
      </SimpleTooltip>
    </div>
  )
}

function PredictionFreshnessLine({
  freshness,
  onRefresh,
}: {
  freshness: PredictionFreshnessState
  onRefresh: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-6 text-12 font-medium text-text-secondary">
          {freshness.isRefreshing ? <Spinner size="sm" className="text-icon-secondary" /> : null}
          <span>{freshness.isRefreshing ? "Refreshing..." : freshness.label}</span>
        </div>

        {!freshness.isRefreshing ? (
          <>
            <span className="text-12 font-medium text-text-tertiary">·</span>
            <Button
              type="button"
              variant="linkSecondary"
              className="h-auto p-0 text-12 font-medium text-text-secondary disabled:text-text-disabled disabled:no-underline"
              onClick={onRefresh}
              disabled={freshness.isRefreshDisabled}
              iconLeft={
                <RefreshCw01
                  size={14}
                  className={freshness.isRefreshDisabled ? "text-icon-tertiary" : "text-icon-secondary"}
                />
              }
            >
              Refresh
            </Button>
          </>
        ) : null}
      </div>

      {freshness.errorMessage ? (
        <InlineAlert
          variant="error"
          description={freshness.errorMessage}
          className="w-full max-w-256 text-left"
        />
      ) : null}
    </div>
  )
}

function GeneratePredictionLink({
  isGenerating,
  onClick,
  className,
}: {
  isGenerating: boolean
  onClick: () => void
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={cn("justify-start", className)}
      disabled={isGenerating}
      onClick={onClick}
      iconLeft={isGenerating ? <Spinner size="sm" className="text-icon-secondary" /> : undefined}
    >
      {isGenerating ? "Generating..." : "Generate"}
    </Button>
  )
}

type RuleSetupFormState = {
  ruleName: string
  assignmentType: "agent-evaluation" | "evaluator-calibration"
  assignmentMethod: "specific" | "shared-queue"
  startDate: string
  startTime: string
  repeatFrequency: string
  repeatDay: string
  assignFrom: string
  dueDate: string
  ends: string
  agentSelectionMode: "manual" | "dynamic"
  agentFilters: Array<{ field: string; operator: string; value: string }>
  evaluatorSelectionMode: "manual" | "dynamic"
  selectedEvaluators: string[]
  conditionFilters: Array<{ field: string; operator: string; value: string; unit?: string }>
  goalCount: string
  goalUnit: string
  goalPer: string
  goalFrequency: string
  stopAssigning: "this-rule" | "any-rule"
  workloadMode: "distribute-evenly" | "customize"
  autoAdjustWorkload: boolean
  rubricEnabled: boolean
  selectedRubric: string
  predictionLeadValue: string
  predictionLeadUnit: string
  notifyByEmail: boolean
  notifyRecipients: string[]
}

function getDefaultRuleSetupFormState(): RuleSetupFormState {
  return {
    ruleName: "",
    assignmentType: "agent-evaluation",
    assignmentMethod: "specific",
    startDate: "May 20, 2024",
    startTime: "9:00 AM",
    repeatFrequency: "Monthly",
    repeatDay: "On the 20th day",
    assignFrom: "Last 7 days",
    dueDate: "1 week from assignment",
    ends: "Never",
    agentSelectionMode: "dynamic",
    agentFilters: [
      { field: "Team name", operator: "Equals", value: "PSS Inbound" },
      { field: "Agent name", operator: "Does not equal", value: "5 agent names sel..." },
    ],
    evaluatorSelectionMode: "manual",
    selectedEvaluators: ["5 evaluators selected"],
    conditionFilters: [
      { field: "Conversation dura...", operator: "is more than", value: "10", unit: "mins" },
    ],
    goalCount: "2",
    goalUnit: "conversations",
    goalPer: "per agent",
    goalFrequency: "per week",
    stopAssigning: "this-rule",
    workloadMode: "distribute-evenly",
    autoAdjustWorkload: false,
    rubricEnabled: true,
    selectedRubric: "billing-qa-rubric",
    predictionLeadValue: "6",
    predictionLeadUnit: "hrs",
    notifyByEmail: true,
    notifyRecipients: ["jordan", "sarah-k"],
  }
}

function getRuleSetupFormStateFromRule(rule: VersionThreeRule): RuleSetupFormState {
  const base = getDefaultRuleSetupFormState()
  base.ruleName = rule.name
  base.assignmentType = rule.assignmentType === "Agent evaluation" ? "agent-evaluation" : "evaluator-calibration"
  base.repeatFrequency = rule.frequency === "daily" ? "Daily" : rule.frequency === "weekly" ? "Weekly" : "Monthly"
  return base
}

function FormSection({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-border-subtle shadow-none">
      <div className="p-24">
        <div className="mb-20 border-b border-border-subtle pb-14">
          <h3 className="text-16 font-bold text-text-primary">{title}</h3>
          {subtitle && <p className="mt-2 text-14 text-text-secondary">{subtitle}</p>}
        </div>
        <div className="space-y-24">{children}</div>
      </div>
    </Card>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-14 font-medium text-text-primary">{children}</Label>
}

function RadioOption({
  selected,
  onSelect,
  label,
  description,
}: {
  selected: boolean
  onSelect: () => void
  label: string
  description?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-start gap-12 text-left"
    >
      <span
        className={cn(
          "mt-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary-orange-600" : "border-neutral-300"
        )}
      >
        {selected && <span className="h-8 w-8 rounded-full bg-primary-orange-600" />}
      </span>
      <span>
        <span className="block text-14 font-medium text-text-primary">{label}</span>
        {description && (
          <span className="block text-14 text-text-secondary">{description}</span>
        )}
      </span>
    </button>
  )
}

function SegmentedToggle({
  options,
  value,
  onChange,
}: {
  options: Array<{ label: string; value: string }>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-border-default bg-surface-card p-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-16 py-8 text-14 font-medium transition-colors",
            value === opt.value
              ? "bg-primary-orange-600 text-white"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function FilterRow({
  filter,
  onChange,
  onRemove,
  showRemove,
}: {
  filter: { field: string; operator: string; value: string; unit?: string }
  onChange: (filter: { field: string; operator: string; value: string; unit?: string }) => void
  onRemove: () => void
  showRemove: boolean
}) {
  return (
    <div className="flex items-center gap-8">
      <Select value={filter.field} onValueChange={(v) => onChange({ ...filter, field: v })}>
        <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={filter.field}>{filter.field}</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filter.operator} onValueChange={(v) => onChange({ ...filter, operator: v })}>
        <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={filter.operator}>{filter.operator}</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-1 items-center gap-4">
        <Input
          value={filter.value}
          onChange={(e) => onChange({ ...filter, value: e.target.value })}
          className="flex-1"
        />
        {filter.unit && (
          <span className="shrink-0 text-14 text-text-secondary">{filter.unit}</span>
        )}
      </div>
      {showRemove && (
        <button type="button" onClick={onRemove} className="shrink-0 p-4 text-icon-secondary hover:text-icon-primary">
          <X size={16} />
        </button>
      )}
    </div>
  )
}

function NameAndTypeSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Name and type">
      <div className="space-y-8">
        <FieldLabel>Rule name</FieldLabel>
        <Input
          placeholder="Enter rule name"
          value={form.ruleName}
          onChange={(e) => onChange({ ruleName: e.target.value })}
        />
      </div>

      <div className="space-y-8">
        <FieldLabel>Assignment type</FieldLabel>
        <div className="grid grid-cols-2 gap-12">
          <button
            type="button"
            onClick={() => onChange({ assignmentType: "agent-evaluation" })}
            className={cn(
              "rounded-lg border p-24 text-left transition-colors",
              form.assignmentType === "agent-evaluation"
                ? "border-border-default bg-[#fff9f5]"
                : "border-border-default hover:border-border-strong"
            )}
          >
            <p className="text-14 font-semibold text-text-primary">Agent evaluation</p>
            <p className="mt-4 text-14 text-text-secondary">Evaluate the agents</p>
          </button>
          <button
            type="button"
            onClick={() => onChange({ assignmentType: "evaluator-calibration" })}
            className={cn(
              "rounded-lg border p-24 text-left transition-colors",
              form.assignmentType === "evaluator-calibration"
                ? "border-border-default bg-[#fff9f5]"
                : "border-border-default hover:border-border-strong"
            )}
          >
            <p className="text-14 font-semibold text-text-primary">Evaluator calibration</p>
            <p className="mt-4 text-14 text-text-secondary">Evaluate the evaluator</p>
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <FieldLabel>Assignment method</FieldLabel>
        <RadioOption
          selected={form.assignmentMethod === "specific"}
          onSelect={() => onChange({ assignmentMethod: "specific" })}
          label="Assign to specific evaluators"
          description="Conversations are automatically assigned to selected evaluators"
        />
        <RadioOption
          selected={form.assignmentMethod === "shared-queue"}
          onSelect={() => onChange({ assignmentMethod: "shared-queue" })}
          label="Place in a shared queue"
          description="Conversations will be visible to all the selected evaluators as 'Unassigned'"
        />
      </div>
    </FormSection>
  )
}

function ScheduleSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Schedule">
      <div className="space-y-8">
        <FieldLabel>Starts</FieldLabel>
        <div className="grid grid-cols-2 gap-8">
          <div className="relative">
            <Calendar size={16} className="pointer-events-none absolute left-12 top-12 text-icon-tertiary" />
            <Input value={form.startDate} onChange={(e) => onChange({ startDate: e.target.value })} className="pl-36" />
          </div>
          <div className="relative">
            <Clock size={16} className="pointer-events-none absolute left-12 top-12 text-icon-tertiary" />
            <Input value={form.startTime} onChange={(e) => onChange({ startTime: e.target.value })} className="pl-36" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <FieldLabel>Repeats</FieldLabel>
        <div className="grid grid-cols-2 gap-8">
          <Select value={form.repeatFrequency} onValueChange={(v) => onChange({ repeatFrequency: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={form.repeatDay} onValueChange={(v) => onChange({ repeatDay: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={form.repeatDay}>{form.repeatDay}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md bg-[#fff5eb] px-12 py-8">
          <p className="text-12 font-medium text-[#c67a1a]">
            Run monthly on the 20th day at 9:00 AM
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <FieldLabel>Assign conversations from</FieldLabel>
        <Select value={form.assignFrom} onValueChange={(v) => onChange({ assignFrom: v })}>
          <SelectTrigger className="w-1/2"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 1 day">Last 1 day</SelectItem>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 14 days">Last 14 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        <FieldLabel>Set due date</FieldLabel>
        <Select value={form.dueDate} onValueChange={(v) => onChange({ dueDate: v })}>
          <SelectTrigger className="w-1/2"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1 week from assignment">1 week from assignment</SelectItem>
            <SelectItem value="2 weeks from assignment">2 weeks from assignment</SelectItem>
            <SelectItem value="1 month from assignment">1 month from assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        <FieldLabel>Ends</FieldLabel>
        <Select value={form.ends} onValueChange={(v) => onChange({ ends: v })}>
          <SelectTrigger className="w-1/2"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Never">Never</SelectItem>
            <SelectItem value="After 1 month">After 1 month</SelectItem>
            <SelectItem value="After 3 months">After 3 months</SelectItem>
            <SelectItem value="On a specific date">On a specific date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FormSection>
  )
}

function AgentsSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  const addFilter = () => {
    onChange({
      agentFilters: [...form.agentFilters, { field: "Team name", operator: "Equals", value: "" }],
    })
  }

  const removeFilter = (index: number) => {
    onChange({ agentFilters: form.agentFilters.filter((_, i) => i !== index) })
  }

  const updateFilter = (index: number, updated: { field: string; operator: string; value: string }) => {
    const next = [...form.agentFilters]
    next[index] = updated
    onChange({ agentFilters: next })
  }

  return (
    <FormSection title="Agents" subtitle="Select who will be evaluated">
      <SegmentedToggle
        options={[
          { label: "Manual selection", value: "manual" },
          { label: "Dynamic selection", value: "dynamic" },
        ]}
        value={form.agentSelectionMode}
        onChange={(v) => onChange({ agentSelectionMode: v as "manual" | "dynamic" })}
      />

      {form.agentSelectionMode === "dynamic" && (
        <div className="space-y-12 rounded-lg border border-border-default p-16">
          <div className="flex items-center gap-8">
            <Badge color="gray" size="sm">And</Badge>
          </div>

          <div className="space-y-8">
            {form.agentFilters.map((filter, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="flex items-center gap-8">
                    <div className="h-px flex-1 bg-border-default" />
                    <Badge color="gray" size="sm">And</Badge>
                    <div className="h-px flex-1 bg-border-default" />
                  </div>
                )}
                <FilterRow
                  filter={filter}
                  onChange={(updated) => updateFilter(index, updated)}
                  onRemove={() => removeFilter(index)}
                  showRemove={form.agentFilters.length > 1}
                />
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-12">
            <button type="button" onClick={addFilter} className="flex items-center gap-4 text-14 font-medium text-text-secondary hover:text-text-primary">
              <Plus size={12} /> Add
            </button>
            <button type="button" className="flex items-center gap-4 text-14 font-medium text-text-secondary hover:text-text-primary">
              <Plus size={12} /> Add group
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-md bg-[#fff5eb] px-12 py-8">
        <p className="text-12 font-medium text-[#c67a1a]">32 active agents (Currently)</p>
        <button type="button" className="text-12 font-semibold text-primary-orange-600 hover:underline">View</button>
      </div>
    </FormSection>
  )
}

function EvaluatorsSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Evaluators" subtitle="Select who will be evaluating">
      <SegmentedToggle
        options={[
          { label: "Manual selection", value: "manual" },
          { label: "Dynamic selection", value: "dynamic" },
        ]}
        value={form.evaluatorSelectionMode}
        onChange={(v) => onChange({ evaluatorSelectionMode: v as "manual" | "dynamic" })}
      />

      {form.evaluatorSelectionMode === "manual" && (
        <Select value="5-evaluators" onValueChange={() => {}}>
          <SelectTrigger><SelectValue placeholder="Select evaluators" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="5-evaluators">5 evaluators selected</SelectItem>
          </SelectContent>
        </Select>
      )}
    </FormSection>
  )
}

function ConditionsSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  const addFilter = () => {
    onChange({
      conditionFilters: [...form.conditionFilters, { field: "Conversation dura...", operator: "is more than", value: "", unit: "mins" }],
    })
  }

  const removeFilter = (index: number) => {
    onChange({ conditionFilters: form.conditionFilters.filter((_, i) => i !== index) })
  }

  const updateFilter = (index: number, updated: { field: string; operator: string; value: string; unit?: string }) => {
    const next = [...form.conditionFilters]
    next[index] = updated
    onChange({ conditionFilters: next })
  }

  return (
    <FormSection title="Conditions" subtitle="Select the type of conversations to be assigned">
      <div className="space-y-8 rounded-lg border border-border-default p-16">
        {form.conditionFilters.map((filter, index) => (
          <FilterRow
            key={index}
            filter={filter}
            onChange={(updated) => updateFilter(index, updated)}
            onRemove={() => removeFilter(index)}
            showRemove={form.conditionFilters.length > 1}
          />
        ))}
        <div className="flex items-center gap-12">
          <button type="button" onClick={addFilter} className="flex items-center gap-4 text-14 font-medium text-text-secondary hover:text-text-primary">
            <Plus size={12} /> Add
          </button>
          <button type="button" className="flex items-center gap-4 text-14 font-medium text-text-secondary hover:text-text-primary">
            <Plus size={12} /> Add group
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md bg-[#fff5eb] px-12 py-8">
        <p className="text-12 font-medium text-[#c67a1a]">180 conversations found for the selected agents, conditions and date range</p>
        <button type="button" className="text-12 font-semibold text-primary-orange-600 hover:underline">View</button>
      </div>
    </FormSection>
  )
}

function GoalSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Goal" subtitle="Define the number of conversations to assign">
      <div className="flex items-center gap-8">
        <Input
          value={form.goalCount}
          onChange={(e) => onChange({ goalCount: e.target.value })}
          className="w-64"
        />
        <Select value={form.goalUnit} onValueChange={(v) => onChange({ goalUnit: v })}>
          <SelectTrigger className="w-160"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="conversations">conversations</SelectItem>
          </SelectContent>
        </Select>
        <Select value={form.goalPer} onValueChange={(v) => onChange({ goalPer: v })}>
          <SelectTrigger className="w-160"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="per agent">per agent</SelectItem>
            <SelectItem value="per evaluator">per evaluator</SelectItem>
          </SelectContent>
        </Select>
        <Select value={form.goalFrequency} onValueChange={(v) => onChange({ goalFrequency: v })}>
          <SelectTrigger className="w-128"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="per day">per day</SelectItem>
            <SelectItem value="per week">per week</SelectItem>
            <SelectItem value="per month">per month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-t border-border-default pt-24">
        <p className="text-14 text-text-primary">
          Stop assigning conversations if the agent&apos;s goal is already reached by:
        </p>
        <div className="mt-12 space-y-12">
          <RadioOption
            selected={form.stopAssigning === "this-rule"}
            onSelect={() => onChange({ stopAssigning: "this-rule" })}
            label="This rule"
          />
          <RadioOption
            selected={form.stopAssigning === "any-rule"}
            onSelect={() => onChange({ stopAssigning: "any-rule" })}
            label="Any rule"
          />
        </div>
      </div>
    </FormSection>
  )
}

function EvaluatorWorkloadSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <div className="space-y-8">
      <FormSection title="Evaluator workload" subtitle="Set distribution logic">
        <div className="grid grid-cols-2 gap-12">
          <button
            type="button"
            onClick={() => onChange({ workloadMode: "distribute-evenly" })}
            className={cn(
              "flex items-center gap-12 rounded-lg border p-24 text-left transition-colors",
              form.workloadMode === "distribute-evenly"
                ? "border-primary-orange-600 bg-[#fff9f5]"
                : "border-border-default hover:border-border-strong"
            )}
          >
            <span
              className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2",
                form.workloadMode === "distribute-evenly" ? "border-primary-orange-600" : "border-neutral-300"
              )}
            >
              {form.workloadMode === "distribute-evenly" && <span className="h-8 w-8 rounded-full bg-primary-orange-600" />}
            </span>
            <span className="text-14 font-medium text-text-primary">Distribute evenly</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ workloadMode: "customize" })}
            className={cn(
              "flex items-center gap-12 rounded-lg border p-24 text-left transition-colors",
              form.workloadMode === "customize"
                ? "border-primary-orange-600 bg-[#fff9f5]"
                : "border-border-default hover:border-border-strong"
            )}
          >
            <span
              className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2",
                form.workloadMode === "customize" ? "border-primary-orange-600" : "border-neutral-300"
              )}
            >
              {form.workloadMode === "customize" && <span className="h-8 w-8 rounded-full bg-primary-orange-600" />}
            </span>
            <span className="text-14 font-medium text-text-primary">Customize workload</span>
          </button>
        </div>

        <div className="rounded-md bg-[#fef9e7] px-12 py-8">
          <p className="text-14 font-medium text-[#c67a1a]">
            24 conversations per evaluator per week
          </p>
        </div>
      </FormSection>

      <Card className="border-border-subtle shadow-none">
        <div className="p-20">
          <ToggleWithLabel
            label="Auto-adjust workload"
            subtext="Automatically reassigns or reduces workload when an evaluator is on time off. Learn more"
            checked={form.autoAdjustWorkload}
            onCheckedChange={(v) => onChange({ autoAdjustWorkload: !!v })}
          />
        </div>
      </Card>
    </div>
  )
}

function RubricSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Rubric">
      <ToggleWithLabel
        label="Assign a default rubric for this assignment"
        checked={form.rubricEnabled}
        onCheckedChange={(v) => onChange({ rubricEnabled: !!v })}
      />

      {form.rubricEnabled && (
        <Select value={form.selectedRubric} onValueChange={(v) => onChange({ selectedRubric: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a rubric..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="billing-qa-rubric">Billing QA Rubric</SelectItem>
            <SelectItem value="escalation-rubric">Escalation Handling Rubric</SelectItem>
            <SelectItem value="compliance-rubric">Compliance Rubric</SelectItem>
            <SelectItem value="customer-satisfaction">Customer Satisfaction Rubric</SelectItem>
            <SelectItem value="sales-quality">Sales Quality Rubric</SelectItem>
          </SelectContent>
        </Select>
      )}
    </FormSection>
  )
}

const recipientOptions = [
  { value: "jordan", label: "Jordan" },
  { value: "sarah-k", label: "Sarah K" },
  { value: "alex-m", label: "Alex M" },
  { value: "priya-s", label: "Priya S" },
  { value: "mike-d", label: "Mike D" },
  { value: "lisa-w", label: "Lisa W" },
]

function PredictionsAndAlertsSection({
  form,
  onChange,
}: {
  form: RuleSetupFormState
  onChange: (updates: Partial<RuleSetupFormState>) => void
}) {
  return (
    <FormSection title="Upcoming goal prediction" subtitle="Get early warnings before coverage gaps happen">
      <div>
        <div className="flex items-center gap-12">
          <Input
            value={form.predictionLeadValue}
            onChange={(e) => onChange({ predictionLeadValue: e.target.value })}
            className="w-80"
          />
          <Select value={form.predictionLeadUnit} onValueChange={(v) => onChange({ predictionLeadUnit: v })}>
            <SelectTrigger className="w-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hrs">hrs</SelectItem>
              <SelectItem value="days">days</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-14 text-text-secondary">before each goal</span>
        </div>
      </div>

      <div>
        <ToggleWithLabel
          label="Notify by email"
          checked={form.notifyByEmail}
          onCheckedChange={(v) => onChange({ notifyByEmail: !!v })}
        />

        {form.notifyByEmail && (
          <div className="mt-16">
            <Multiselect
              options={recipientOptions}
              value={form.notifyRecipients}
              onValueChange={(v) => onChange({ notifyRecipients: v })}
              placeholder="Select recipients..."
            />
          </div>
        )}
      </div>
    </FormSection>
  )
}

type SetupGuideStep = {
  title: string
  summary: string
  completed: boolean
}

function SetupGuideSidebar({ steps }: { steps: SetupGuideStep[] }) {
  return (
    <div className="w-368 shrink-0">
      <p className="px-24 pb-8 text-14 font-bold text-text-primary uppercase tracking-wide">Setup guide</p>
      <div className="relative">
        <div className="absolute left-38 top-24 bottom-24 w-px bg-border-default" />
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-16 px-24 py-12">
            {step.completed ? (
              <div className="relative z-10 flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#2e7d32]">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="relative z-10 flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-border-default bg-white" />
            )}
            <div className="min-w-0 pt-2">
              <p className="text-14 font-semibold text-text-primary">{step.title}</p>
              <p className="mt-2 whitespace-pre-line text-12 text-text-secondary">{step.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RuleSetupHeader({
  ruleName,
  onBack,
  onSave,
  onActivate,
}: {
  ruleName: string
  onBack: () => void
  onSave: () => void
  onActivate: () => void
}) {
  return (
    <div className="flex items-center justify-between bg-surface-subtle px-24 py-16">
      <div className="space-y-8">
        <div className="flex items-center gap-6 text-14 text-text-secondary">
          <button type="button" onClick={onBack} className="hover:text-text-primary hover:underline">
            QA case assignment
          </button>
          <span>/</span>
          <span className="text-text-tertiary">Edit</span>
        </div>
        <div className="flex items-center gap-8">
          <h2 className="text-20 font-bold tracking-tight text-text-primary">
            {ruleName || "New rule"}
          </h2>
          <Badge color="warning" size="sm">Unsaved changes</Badge>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" iconLeft={<DotsVertical size={16} className="text-icon-primary" />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate rule</DropdownMenuItem>
            <DropdownMenuItem>Delete rule</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" onClick={onSave}>Save</Button>
        <Button onClick={onActivate}>Activate</Button>
      </div>
    </div>
  )
}

function RuleSetupPage({
  rule,
  onBack,
}: {
  rule: VersionThreeRule | null
  onBack: () => void
}) {
  const [form, setForm] = React.useState<RuleSetupFormState>(() =>
    rule ? getRuleSetupFormStateFromRule(rule) : getDefaultRuleSetupFormState()
  )

  const updateForm = React.useCallback((updates: Partial<RuleSetupFormState>) => {
    setForm((prev) => ({ ...prev, ...updates }))
  }, [])

  const handleSave = () => {
    toast({ title: "Rule saved", description: `"${form.ruleName}" has been saved.` })
  }

  const handleActivate = () => {
    toast({ title: "Rule activated", description: `"${form.ruleName}" is now active.` })
    onBack()
  }

  const guideSteps: SetupGuideStep[] = [
    {
      title: "Name and type",
      summary: `${form.ruleName || "Untitled"} (${form.assignmentType === "agent-evaluation" ? "Agent evaluation" : "Evaluator calibration"})`,
      completed: form.ruleName.length > 0,
    },
    {
      title: "Schedule",
      summary: `Run every Mon, Tue, Wed, Thu, Fri at ${form.startTime}\nAssign conversations of ${form.assignFrom}`,
      completed: true,
    },
    {
      title: "Agents",
      summary: "32 active agents (Currently)",
      completed: true,
    },
    {
      title: "Evaluators",
      summary: "4 evaluators selected",
      completed: true,
    },
    {
      title: "Conditions",
      summary: "Added",
      completed: form.conditionFilters.length > 0,
    },
    {
      title: "Goal",
      summary: `${form.goalCount} ${form.goalUnit} ${form.goalPer} ${form.goalFrequency}`,
      completed: form.goalCount.length > 0,
    },
    {
      title: "Evaluator workload",
      summary: "16 conversations per evaluator per week",
      completed: true,
    },
    {
      title: "Rubric",
      summary: form.rubricEnabled
        ? form.selectedRubric.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Off",
      completed: form.rubricEnabled && form.selectedRubric.length > 0,
    },
    {
      title: "Upcoming goal prediction",
      summary: `Predict ${form.predictionLeadValue} ${form.predictionLeadUnit} before${form.notifyByEmail ? ` · Alerts on` : ` · Alerts off`}`,
      completed: form.predictionLeadValue.length > 0,
    },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden bg-surface-subtle">
      <RuleSetupHeader
        ruleName={form.ruleName}
        onBack={onBack}
        onSave={handleSave}
        onActivate={handleActivate}
      />
      <div className="mx-auto flex min-h-0 max-w-[1080px] flex-1 gap-32 px-24">
        <div className="min-w-0 flex-1 overflow-y-auto py-24" style={{ maxWidth: 640 }}>
          <div className="space-y-16">
            <NameAndTypeSection form={form} onChange={updateForm} />
            <ScheduleSection form={form} onChange={updateForm} />
            <AgentsSection form={form} onChange={updateForm} />
            <EvaluatorsSection form={form} onChange={updateForm} />
            <ConditionsSection form={form} onChange={updateForm} />
            <GoalSection form={form} onChange={updateForm} />
            <EvaluatorWorkloadSection form={form} onChange={updateForm} />
            <div className="!my-24 border-t border-border-subtle" />
            <RubricSection form={form} onChange={updateForm} />
            <PredictionsAndAlertsSection form={form} onChange={updateForm} />
          </div>
        </div>
        <div className="hidden shrink-0 py-24 lg:block">
          <div className="sticky top-24">
            <SetupGuideSidebar steps={guideSteps} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VersionFourPrototype() {
  const [rules, setRules] = React.useState<VersionThreeRule[]>(() => versionThreeRules)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "inactive">("all")
  const [activeRuleId, setActiveRuleId] = React.useState<string | null>(null)
  const [selectedGoalId, setSelectedGoalId] = React.useState<string | null>(null)
  const [ruleSetupView, setRuleSetupView] = React.useState<string | null>(null)
  const [predictionFreshnessByGoalId, setPredictionFreshnessByGoalId] = React.useState<
    Record<string, PredictionFreshnessState>
  >(() => initialPredictionFreshnessByGoalId)
  const deferredSearchQuery = React.useDeferredValue(searchQuery.trim().toLowerCase())
  const refreshRequestTimeoutsRef = React.useRef<Record<string, number>>({})
  const refreshCooldownTimeoutsRef = React.useRef<Record<string, number>>({})

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      deferredSearchQuery.length === 0 ||
      rule.name.toLowerCase().includes(deferredSearchQuery) ||
      rule.assignmentType.toLowerCase().includes(deferredSearchQuery)

    const matchesStatus =
      statusFilter === "all" || rule.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  const activeRule =
    rules.find((rule) => rule.id === activeRuleId) ?? null

  const openRunHistory = (rule: VersionThreeRule, options?: { goalId?: string; forceUpcoming?: boolean }) => {
    const { goalId, forceUpcoming } = options ?? {}

    if (goalId) {
      setActiveRuleId(rule.id)
      setSelectedGoalId(goalId)
      return
    }

    const upcomingGoal = rule.goals.find((goal) => goal.isUpcoming) ?? null
    const latestCompletedGoal = rule.goals.find((goal) => !goal.isUpcoming) ?? null
    const defaultGoal =
      forceUpcoming && upcomingGoal
        ? upcomingGoal
        : latestCompletedGoal ?? upcomingGoal

    setActiveRuleId(rule.id)
    setSelectedGoalId(defaultGoal?.id ?? null)
  }

  const handleCloseModal = () => {
    setActiveRuleId(null)
    setSelectedGoalId(null)
  }

  const handleRefreshUpcomingPrediction = React.useCallback((ruleId: string, goalId: string) => {
    const goalRefreshConfig = refreshedUpcomingPredictionConfigByGoalId[goalId]
    if (!goalRefreshConfig) {
      return
    }

    if (refreshRequestTimeoutsRef.current[goalId] || refreshCooldownTimeoutsRef.current[goalId]) {
      return
    }

    setPredictionFreshnessByGoalId((currentState) => {
      const existingState = currentState[goalId]
      if (!existingState) {
        return currentState
      }

      return {
        ...currentState,
        [goalId]: {
          ...existingState,
          isRefreshing: true,
          errorMessage: null,
        },
      }
    })

    refreshRequestTimeoutsRef.current[goalId] = window.setTimeout(() => {
      delete refreshRequestTimeoutsRef.current[goalId]

      if (refreshFailureGoalIds.has(goalId)) {
        setPredictionFreshnessByGoalId((currentState) => {
          const existingState = currentState[goalId]
          if (!existingState) {
            return currentState
          }

          return {
            ...currentState,
            [goalId]: {
              ...existingState,
              isRefreshing: false,
              errorMessage: "Couldn't refresh. Try again later.",
            },
          }
        })
        return
      }

      setRules((currentRules) =>
        currentRules.map((rule) => {
          if (rule.id !== ruleId) {
            return rule
          }

          return {
            ...rule,
            goals: rule.goals.map((goal) => {
              if (goal.id !== goalId) {
                return goal
              }

              return buildRuleHistoryGoal(rule.id, {
                id: goal.id,
                sourceId: goal.sourceId,
                listLabel: goal.listLabel,
                sampleWindow: goal.sampleWindow,
                status: goalRefreshConfig.status,
                percent: goalRefreshConfig.percent,
                completed: goalRefreshConfig.completed,
                expected: goalRefreshConfig.expected,
                isUpcoming: goal.isUpcoming,
                hasPrediction: true,
                runsLeft: goal.runsLeft ?? undefined,
              })
            }),
          }
        })
      )

      setPredictionFreshnessByGoalId((currentState) => {
        const existingState = currentState[goalId]
        if (!existingState) {
          return currentState
        }

        return {
          ...currentState,
          [goalId]: {
            ...existingState,
            label: "Predicted just now",
            isRefreshing: false,
            errorMessage: null,
            isRefreshDisabled: true,
          },
        }
      })

      refreshCooldownTimeoutsRef.current[goalId] = window.setTimeout(() => {
        delete refreshCooldownTimeoutsRef.current[goalId]

        setPredictionFreshnessByGoalId((currentState) => {
          const existingState = currentState[goalId]
          if (!existingState) {
            return currentState
          }

          return {
            ...currentState,
            [goalId]: {
              ...existingState,
              label: "Predicted 5m ago",
              isRefreshDisabled: false,
            },
          }
        })
      }, 300000)
    }, 1200)
  }, [])

  React.useEffect(() => {
    const requestTimeouts = refreshRequestTimeoutsRef.current
    const cooldownTimeouts = refreshCooldownTimeoutsRef.current

    return () => {
      Object.values(requestTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      Object.values(cooldownTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [])

  const handleOpenRuleSetup = (ruleName: string) => {
    const matchedRule = rules.find((r) => r.name === ruleName)
    if (matchedRule) {
      setActiveRuleId(null)
      setRuleSetupView(matchedRule.id)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-surface-page">
        <MainNav activeItem="Settings" />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar avatarInitial="A" avatarColor="var(--color-primary-lime-700)" />

          <main className="flex-1 overflow-hidden">
            {ruleSetupView !== null ? (
              <div className="flex h-full min-h-0 flex-col bg-surface-page lg:flex-row">
                <SettingsSidebar />
                <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
                  <RuleSetupPage
                    rule={rules.find((r) => r.id === ruleSetupView) ?? null}
                    onBack={() => setRuleSetupView(null)}
                  />
                </div>
              </div>
            ) : (
            <div className="flex h-full min-h-0 flex-col bg-surface-page lg:flex-row">
              <SettingsSidebar />

              <section className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden bg-surface-subtle p-16 lg:p-24">
                <div className="space-y-8">
                  <PageHeaderTitle size="2xl">QA case assignment</PageHeaderTitle>
                  <PageHeaderDescription>
                    Manage interaction sampling and assignment automation rules for QA
                  </PageHeaderDescription>
                </div>

                <div className="mt-24 flex min-h-0 flex-1 flex-col">
                  <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 flex-col gap-12 sm:flex-row sm:items-center sm:gap-8 xl:flex-1">
                      <div className="relative w-256 shrink-0">
                        <SearchMd
                          size={16}
                          className="pointer-events-none absolute left-12 top-12 text-icon-tertiary"
                        />
                        <Input
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="pl-40"
                        />
                      </div>

                      <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as "all" | "active" | "inactive")}
                      >
                        <SelectTrigger className="w-full sm:w-240">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap items-center gap-8">
                      <Button variant="secondary">Manage replacement reasons</Button>
                      <Button onClick={() => setRuleSetupView("new")}>New rule</Button>
                    </div>
                  </div>

                  <Card className="mt-16 overflow-hidden rounded-xl border-border-subtle">
                    <div className="overflow-x-auto">
                      <Table className="min-w-max">
                        <TableHeader className="bg-surface-card">
                          <TableRow className="hover:bg-surface-card">
                            <TableHead className="w-256 text-text-primary">Rules</TableHead>
                            <TableHead className="w-128 text-text-primary">Status</TableHead>
                            <TableHead className="w-248 min-w-248 text-text-primary">
                              <div className="flex items-center gap-6">
                                <span className="text-12 font-bold text-text-primary">Upcoming goal prediction</span>
                                <SimpleTooltip
                                  side="bottom"
                                  align="start"
                                  content={
                                    <span className="block max-w-240 whitespace-normal text-12 font-medium">
                                      The next scheduled goal based on the rule&apos;s frequency. Shows predicted coverage before the goal begins.
                                    </span>
                                  }
                                >
                                  <span className="inline-flex items-center">
                                    <InfoCircle size={12} className="text-icon-secondary" />
                                  </span>
                                </SimpleTooltip>
                              </div>
                            </TableHead>
                            <TableHead className="w-248 min-w-248 text-text-primary">
                              <div className="flex items-center gap-6">
                                <span className="text-12 font-bold text-text-primary">Current goal</span>
                                <SimpleTooltip
                                  side="bottom"
                                  align="start"
                                  content={
                                    <span className="block max-w-240 whitespace-normal text-12 font-medium">
                                      The active goal currently in progress or the most recently completed goal. Shows actual coverage from rule runs.
                                    </span>
                                  }
                                >
                                  <span className="inline-flex items-center">
                                    <InfoCircle size={12} className="text-icon-secondary" />
                                  </span>
                                </SimpleTooltip>
                              </div>
                            </TableHead>
                            <TableHead className="w-240 text-right text-text-primary">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRules.length > 0 ? (
                            filteredRules.map((rule) => {
                              const upcomingGoal =
                                rule.goals.find((goal) => goal.isUpcoming) ?? rule.goals[0]
                              const latestCompletedGoal =
                                rule.goals.find((goal) => !goal.isUpcoming) ?? rule.goals[0]

                              return (
                                <TableRow key={rule.id} className="hover:bg-transparent">
                                  <TableCell>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenRuleSetup(rule.name)}
                                      className="flex flex-col gap-4 text-left"
                                    >
                                      <span className="text-14 font-semibold text-text-primary hover:underline">{rule.name}</span>
                                      <span className="text-12 font-medium text-text-secondary">
                                        {rule.assignmentType}
                                      </span>
                                    </button>
                                  </TableCell>

                                  <TableCell>
                                    <Badge
                                      size="sm"
                                      className={
                                        rule.status === "Active"
                                          ? "bg-surface-success-subtle text-text-success"
                                          : "bg-surface-sunken text-text-secondary"
                                      }
                                    >
                                      {rule.status}
                                    </Badge>
                                  </TableCell>

                                  <TableCell className="w-248 min-w-248 p-0">
                                    <FigmaGoalCell
                                      goal={upcomingGoal}
                                      onClick={() => openRunHistory(rule, { goalId: upcomingGoal.id })}
                                    />
                                  </TableCell>

                                  <TableCell className="w-248 min-w-248 p-0">
                                    <FigmaGoalCell
                                      goal={latestCompletedGoal}
                                      onClick={() => openRunHistory(rule, { goalId: latestCompletedGoal.id })}
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <div className="flex items-center justify-end gap-4">
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => openRunHistory(rule, { goalId: latestCompletedGoal.id })}
                                      >
                                        View history
                                      </Button>

                                      <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Edit ${rule.name}`}
                                        iconLeft={<Edit02 size={16} className="text-icon-secondary" />}
                                        onClick={() => handleOpenRuleSetup(rule.name)}
                                      />

                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label={`Open actions for ${rule.name}`}
                                            iconLeft={<DotsVertical size={16} className="text-icon-secondary" />}
                                          />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleOpenRuleSetup(rule.name)}>
                                            Edit rule
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>Duplicate rule</DropdownMenuItem>
                                          <DropdownMenuItem>More info</DropdownMenuItem>
                                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="px-0 py-0">
                                <EmptyState
                                  className="min-h-240"
                                  icon={<SearchMd size={20} className="text-icon-secondary" />}
                                  title="No rules match the current filters."
                                />
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </div>

                <RunHistoryModal
                  rule={activeRule}
                  selectedGoalId={selectedGoalId}
                  onClose={handleCloseModal}
                  onSelectGoal={setSelectedGoalId}
                  onOpenRuleSetup={handleOpenRuleSetup}
                  predictionFreshnessByGoalId={predictionFreshnessByGoalId}
                  onRefreshUpcomingPrediction={handleRefreshUpcomingPrediction}
                />



              </section>
            </div>
            )}
          </main>
        </div>
        <ToastContainer position="top-right" className="z-[60]" />
      </div>
    </TooltipProvider>
  )
}
