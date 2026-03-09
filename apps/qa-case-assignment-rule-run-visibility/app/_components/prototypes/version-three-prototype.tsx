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
import { AvatarGroup } from "@level/ui/components/ui/avatar-group"
import { Badge } from "@level/ui/components/ui/badge"
import { Button } from "@level/ui/components/ui/button"
import { Card } from "@level/ui/components/ui/card"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"
import { Multiselect, type MultiselectOption } from "@level/ui/components/ui/multiselect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@level/ui/components/ui/accordion"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
} from "@level/ui/components/ui/sheet"
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
import {
  NeutralTabsList,
  NeutralTabsTrigger,
  Tabs,
  TabsContent,
} from "@level/ui/components/ui/tabs"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { SimpleTooltip, TooltipProvider } from "@level/ui/components/ui/tooltip"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import {
  Bell01,
  DotsVertical,
  Edit03,
  SearchMd,
} from "@level/ui/components/icons"
import { ChevronRight, ExternalLink, X } from "lucide-react"

type SettingsSection = {
  heading?: string
  items: Array<{
    label: string
    active?: boolean
  }>
}

type Frequency = "daily" | "weekly" | "monthly"
type NotificationWeekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
type RuleStatus = "Active" | "Inactive"
type RunStatus = "success" | "partial" | "failed" | "scheduled"
type DetailTab = "agents" | "evaluators" | "run_details"

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

type RunCycleDetail = {
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

type RuleHistoryCycle = {
  id: string
  listLabel: string
  sampleWindow: string
  status: RunStatus
  percent: number
  completed: number
  expected: number
  isUpcoming: boolean
  detail: RunCycleDetail
}

type CoverageIssue = {
  id: string
  agentName: string
  teamName?: string
  teamNames?: string[]
}

type VersionThreeRule = {
  id: string
  name: string
  assignmentType: string
  frequency: Frequency
  status: RuleStatus
  cycles: RuleHistoryCycle[]
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

type CycleConfig = {
  id: string
  sourceId: string
  listLabel: string
  sampleWindow: string
  status: RunStatus
  percent: number
  completed: number
  expected: number
  isUpcoming?: boolean
}

type RuleConfig = {
  id: string
  name: string
  assignmentType: string
  frequency: Frequency
  status: RuleStatus
  cycles: CycleConfig[]
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
      { label: "QA case assignment rule run visibility", active: true },
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

const cycleNotificationRecipients: MultiselectOption[] = [
  { value: "jordan", label: "Jordan" },
  { value: "sarah-k", label: "Sarah K" },
  { value: "avery-cole", label: "Avery Cole" },
  { value: "riya-shah", label: "Riya Shah" },
  { value: "rahul-verma", label: "Rahul Verma" },
]

const notificationFrequencyOptions: Array<{ value: Frequency; label: string }> = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

const notificationWeekdayOptions: Array<{ value: NotificationWeekday; label: string }> = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

const notificationMonthlyDayOptions: Array<{ value: string; label: string }> = Array.from(
  { length: 31 },
  (_, index) => {
    const day = index + 1
    return {
      value: `${day}`,
      label: formatOrdinalDay(day),
    }
  }
)

const notificationTimeOptions: Array<{ value: string; label: string }> = Array.from(
  { length: 24 },
  (_, hour) => {
    const normalizedHour = hour % 12 === 0 ? 12 : hour % 12
    const period = hour >= 12 ? "PM" : "AM"
    const hourLabel = normalizedHour.toString().padStart(2, "0")
    return {
      value: `${hour.toString().padStart(2, "0")}:00`,
      label: `${hourLabel}:00 ${period}`,
    }
  }
)

function formatOrdinalDay(day: number) {
  const mod100 = day % 100
  if (mod100 >= 11 && mod100 <= 13) {
    return `${day}th`
  }

  const mod10 = day % 10
  if (mod10 === 1) {
    return `${day}st`
  }

  if (mod10 === 2) {
    return `${day}nd`
  }

  if (mod10 === 3) {
    return `${day}rd`
  }

  return `${day}th`
}

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

const coverageAgentFirstNames = [
  "Tom",
  "Priya",
  "Dan",
  "Avery",
  "Jordan",
  "Mia",
  "Ethan",
  "Lina",
  "Noah",
  "Sara",
  "Leo",
  "Nina",
]

const coverageAgentLastNames = [
  "Rivera",
  "Nair",
  "Wu",
  "Cole",
  "Morris",
  "Patel",
  "Johnson",
  "Chen",
  "Brooks",
  "Khan",
  "Diaz",
  "Singh",
]

const coverageAgentTeams = [
  "Sales team",
  "Support team",
  "Billing team",
  "Retention team",
  "Operations team",
]

function getCoverageAgentName(index: number) {
  const firstName = coverageAgentFirstNames[index % coverageAgentFirstNames.length]
  const lastName = coverageAgentLastNames[index % coverageAgentLastNames.length]
  return `${firstName} ${lastName}`
}

function getCoverageAgentTeams(index: number) {
  const teamCount = 1 + (index % 4)
  const startIndex = (index * 2) % coverageAgentTeams.length
  return Array.from({ length: teamCount }, (_, offset) => {
    const teamIndex = (startIndex + offset) % coverageAgentTeams.length
    return coverageAgentTeams[teamIndex]
  })
}

function buildInitialCoverageIssues() {
  return Array.from({ length: 10 }, (_, index) => {
    const teamNames = getCoverageAgentTeams(index)

    return {
      id: `coverage-not-in-rule-${index + 1}`,
      agentName: getCoverageAgentName(index),
      teamName: teamNames[0],
      teamNames,
    } satisfies CoverageIssue
  }).sort((leftIssue, rightIssue) => leftIssue.agentName.localeCompare(rightIssue.agentName))
}

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

type VersionThreeCycleScenario = {
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
  },
  "legacy-escalation": {
    agentOffset: 96,
    evaluatorOffset: 18,
    evaluatorCapacity: 18,
    defaultActiveEvaluators: 5,
  },
  "mortgage-queue": {
    agentOffset: 192,
    evaluatorOffset: 36,
    evaluatorCapacity: 18,
    defaultActiveEvaluators: 5,
  },
  "customer-retention": {
    agentOffset: 288,
    evaluatorOffset: 54,
    evaluatorCapacity: 8,
    defaultActiveEvaluators: 4,
  },
  "policy-renewal": {
    agentOffset: 336,
    evaluatorOffset: 72,
    evaluatorCapacity: 10,
    defaultActiveEvaluators: 4,
  },
} as const satisfies Record<
  string,
  {
    agentOffset: number
    evaluatorOffset: number
    evaluatorCapacity: number
    defaultActiveEvaluators: number
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
      `Coverage target was already met via ${viaRuleName ?? "another rule"} in this cycle.`,
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
  detailText = "Reached the assignment cap for this cycle."
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
    status: "Active",
    cycles: [
      {
        id: "billing-upcoming",
        sourceId: "rule-23-7",
        listLabel: "Mar 9, 9:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 95,
        completed: 86,
        expected: 91,
        isUpcoming: true,
      },
      {
        id: "billing-mar-2",
        sourceId: "rule-23-7",
        listLabel: "Mar 2, 9:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "partial",
        percent: 91,
        completed: 66,
        expected: 72,
      },
      {
        id: "billing-feb-23",
        sourceId: "rule-23-1",
        listLabel: "Feb 23, 9:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 71,
        expected: 71,
      },
      {
        id: "billing-feb-16",
        sourceId: "rule-23-2",
        listLabel: "Feb 16, 9:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 73,
        expected: 73,
      },
      {
        id: "billing-feb-9",
        sourceId: "rule-23-1",
        listLabel: "Feb 9, 9:00 AM",
        sampleWindow: "Feb 2-8",
        status: "success",
        percent: 100,
        completed: 68,
        expected: 68,
      },
      {
        id: "billing-feb-2",
        sourceId: "rule-22-4",
        listLabel: "Feb 2, 9:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 75,
        expected: 75,
      },
      {
        id: "billing-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 9:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 74,
        expected: 74,
      },
      {
        id: "billing-jan-19",
        sourceId: "rule-23-7",
        listLabel: "Jan 19, 9:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 69,
        expected: 69,
      },
      {
        id: "billing-jan-12",
        sourceId: "rule-23-1",
        listLabel: "Jan 12, 9:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 70,
        expected: 70,
      },
      {
        id: "billing-jan-5",
        sourceId: "rule-20-8",
        listLabel: "Jan 5, 9:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 71,
        expected: 71,
      },
      {
        id: "billing-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 9:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 69,
        expected: 69,
      },
    ],
  },
  {
    id: "legacy-escalation",
    name: "Legacy Escalation QA",
    assignmentType: "Agent evaluation",
    frequency: "weekly",
    status: "Active",
    cycles: [
      {
        id: "legacy-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 9, 11:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 100,
        completed: 84,
        expected: 84,
        isUpcoming: true,
      },
      {
        id: "legacy-mar-2",
        sourceId: "rule-23-1",
        listLabel: "Mar 2, 11:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "success",
        percent: 100,
        completed: 71,
        expected: 71,
      },
      {
        id: "legacy-feb-23",
        sourceId: "rule-23-1",
        listLabel: "Feb 23, 11:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 58,
        expected: 58,
      },
      {
        id: "legacy-feb-16",
        sourceId: "rule-23-1",
        listLabel: "Feb 16, 11:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 80,
        expected: 80,
      },
      {
        id: "legacy-feb-9",
        sourceId: "rule-23-1",
        listLabel: "Feb 9, 11:00 AM",
        sampleWindow: "Feb 2-8",
        status: "success",
        percent: 100,
        completed: 67,
        expected: 67,
      },
      {
        id: "legacy-feb-2",
        sourceId: "rule-23-1",
        listLabel: "Feb 2, 11:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 89,
        expected: 89,
      },
      {
        id: "legacy-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 11:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 76,
        expected: 76,
      },
      {
        id: "legacy-jan-19",
        sourceId: "rule-23-1",
        listLabel: "Jan 19, 11:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 73,
        expected: 73,
      },
      {
        id: "legacy-jan-12",
        sourceId: "rule-23-1",
        listLabel: "Jan 12, 11:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 74,
        expected: 74,
      },
      {
        id: "legacy-jan-5",
        sourceId: "rule-23-1",
        listLabel: "Jan 5, 11:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 82,
        expected: 82,
      },
      {
        id: "legacy-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 11:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 78,
        expected: 78,
      },
    ],
  },
  {
    id: "mortgage-queue",
    name: "Mortgage Queue",
    assignmentType: "Agent evaluation",
    frequency: "weekly",
    status: "Active",
    cycles: [
      {
        id: "mortgage-upcoming",
        sourceId: "rule-23-2",
        listLabel: "Mar 9, 10:00 AM",
        sampleWindow: "Mar 2-8",
        status: "scheduled",
        percent: 88,
        completed: 80,
        expected: 91,
        isUpcoming: true,
      },
      {
        id: "mortgage-mar-2",
        sourceId: "rule-23-2",
        listLabel: "Mar 2, 10:00 AM",
        sampleWindow: "Feb 23-Mar 1",
        status: "partial",
        percent: 92,
        completed: 84,
        expected: 91,
      },
      {
        id: "mortgage-feb-23",
        sourceId: "rule-22-4",
        listLabel: "Feb 23, 10:00 AM",
        sampleWindow: "Feb 16-22",
        status: "success",
        percent: 100,
        completed: 67,
        expected: 67,
      },
      {
        id: "mortgage-feb-16",
        sourceId: "rule-23-1",
        listLabel: "Feb 16, 10:00 AM",
        sampleWindow: "Feb 9-15",
        status: "success",
        percent: 100,
        completed: 74,
        expected: 74,
      },
      {
        id: "mortgage-feb-9",
        sourceId: "rule-20-8",
        listLabel: "Feb 9, 10:00 AM",
        sampleWindow: "Feb 2-8",
        status: "failed",
        percent: 0,
        completed: 0,
        expected: 70,
      },
      {
        id: "mortgage-feb-2",
        sourceId: "rule-23-7",
        listLabel: "Feb 2, 10:00 AM",
        sampleWindow: "Jan 26-Feb 1",
        status: "success",
        percent: 100,
        completed: 73,
        expected: 73,
      },
      {
        id: "mortgage-jan-26",
        sourceId: "rule-23-1",
        listLabel: "Jan 26, 10:00 AM",
        sampleWindow: "Jan 19-25",
        status: "success",
        percent: 100,
        completed: 68,
        expected: 68,
      },
      {
        id: "mortgage-jan-19",
        sourceId: "rule-22-4",
        listLabel: "Jan 19, 10:00 AM",
        sampleWindow: "Jan 12-18",
        status: "success",
        percent: 100,
        completed: 70,
        expected: 70,
      },
      {
        id: "mortgage-jan-12",
        sourceId: "rule-20-8",
        listLabel: "Jan 12, 10:00 AM",
        sampleWindow: "Jan 5-11",
        status: "success",
        percent: 100,
        completed: 66,
        expected: 66,
      },
      {
        id: "mortgage-jan-5",
        sourceId: "rule-23-2",
        listLabel: "Jan 5, 10:00 AM",
        sampleWindow: "Dec 29-Jan 4",
        status: "success",
        percent: 100,
        completed: 72,
        expected: 72,
      },
      {
        id: "mortgage-dec-29",
        sourceId: "rule-23-1",
        listLabel: "Dec 29, 10:00 AM",
        sampleWindow: "Dec 22-28",
        status: "success",
        percent: 100,
        completed: 71,
        expected: 71,
      },
    ],
  },
  {
    id: "customer-retention",
    name: "Customer Retention Watchlist",
    assignmentType: "Agent evaluation",
    frequency: "daily",
    status: "Active",
    cycles: [
      {
        id: "retention-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 10, 8:30 AM",
        sampleWindow: "Mar 9",
        status: "scheduled",
        percent: 100,
        completed: 24,
        expected: 24,
        isUpcoming: true,
      },
      {
        id: "retention-mar-9",
        sourceId: "rule-23-1",
        listLabel: "Mar 9, 8:30 AM",
        sampleWindow: "Mar 8",
        status: "success",
        percent: 100,
        completed: 23,
        expected: 23,
      },
      {
        id: "retention-mar-8",
        sourceId: "rule-23-2",
        listLabel: "Mar 8, 8:30 AM",
        sampleWindow: "Mar 7",
        status: "partial",
        percent: 96,
        completed: 22,
        expected: 23,
      },
      {
        id: "retention-mar-7",
        sourceId: "rule-23-1",
        listLabel: "Mar 7, 8:30 AM",
        sampleWindow: "Mar 6",
        status: "success",
        percent: 100,
        completed: 24,
        expected: 24,
      },
      {
        id: "retention-mar-6",
        sourceId: "rule-23-1",
        listLabel: "Mar 6, 8:30 AM",
        sampleWindow: "Mar 5",
        status: "success",
        percent: 100,
        completed: 20,
        expected: 20,
      },
      {
        id: "retention-mar-5",
        sourceId: "rule-23-7",
        listLabel: "Mar 5, 8:30 AM",
        sampleWindow: "Mar 4",
        status: "success",
        percent: 100,
        completed: 23,
        expected: 23,
      },
      {
        id: "retention-mar-4",
        sourceId: "rule-23-1",
        listLabel: "Mar 4, 8:30 AM",
        sampleWindow: "Mar 3",
        status: "success",
        percent: 100,
        completed: 22,
        expected: 22,
      },
      {
        id: "retention-mar-3",
        sourceId: "rule-23-1",
        listLabel: "Mar 3, 8:30 AM",
        sampleWindow: "Mar 2",
        status: "success",
        percent: 100,
        completed: 24,
        expected: 24,
      },
      {
        id: "retention-mar-2",
        sourceId: "rule-23-1",
        listLabel: "Mar 2, 8:30 AM",
        sampleWindow: "Mar 1",
        status: "success",
        percent: 100,
        completed: 21,
        expected: 21,
      },
      {
        id: "retention-mar-1",
        sourceId: "rule-23-2",
        listLabel: "Mar 1, 8:30 AM",
        sampleWindow: "Feb 28",
        status: "success",
        percent: 100,
        completed: 18,
        expected: 18,
      },
      {
        id: "retention-feb-28",
        sourceId: "rule-23-1",
        listLabel: "Feb 28, 8:30 AM",
        sampleWindow: "Feb 27",
        status: "success",
        percent: 100,
        completed: 19,
        expected: 19,
      },
      {
        id: "retention-feb-27",
        sourceId: "rule-23-1",
        listLabel: "Feb 27, 8:30 AM",
        sampleWindow: "Feb 26",
        status: "success",
        percent: 100,
        completed: 22,
        expected: 22,
      },
      {
        id: "retention-feb-26",
        sourceId: "rule-23-1",
        listLabel: "Feb 26, 8:30 AM",
        sampleWindow: "Feb 25",
        status: "success",
        percent: 100,
        completed: 20,
        expected: 20,
      },
    ],
  },
  {
    id: "policy-renewal",
    name: "Policy Renewal Audit",
    assignmentType: "Agent evaluation",
    frequency: "monthly",
    status: "Active",
    cycles: [
      {
        id: "policy-upcoming",
        sourceId: "rule-23-1",
        listLabel: "Mar 31, 2:00 PM",
        sampleWindow: "Mar 1-31",
        status: "scheduled",
        percent: 100,
        completed: 32,
        expected: 32,
        isUpcoming: true,
      },
      {
        id: "policy-feb",
        sourceId: "rule-23-1",
        listLabel: "Feb 28, 2:00 PM",
        sampleWindow: "Feb 1-28",
        status: "success",
        percent: 100,
        completed: 30,
        expected: 30,
      },
      {
        id: "policy-jan",
        sourceId: "rule-23-2",
        listLabel: "Jan 31, 2:00 PM",
        sampleWindow: "Jan 1-31",
        status: "partial",
        percent: 92,
        completed: 23,
        expected: 25,
      },
      {
        id: "policy-dec",
        sourceId: "rule-23-1",
        listLabel: "Dec 31, 2:00 PM",
        sampleWindow: "Dec 1-31",
        status: "success",
        percent: 100,
        completed: 28,
        expected: 28,
      },
      {
        id: "policy-nov",
        sourceId: "rule-22-4",
        listLabel: "Nov 30, 2:00 PM",
        sampleWindow: "Nov 1-30",
        status: "success",
        percent: 100,
        completed: 25,
        expected: 25,
      },
      {
        id: "policy-oct",
        sourceId: "rule-23-1",
        listLabel: "Oct 31, 2:00 PM",
        sampleWindow: "Oct 1-31",
        status: "success",
        percent: 100,
        completed: 24,
        expected: 24,
      },
      {
        id: "policy-sep",
        sourceId: "rule-23-1",
        listLabel: "Sep 30, 2:00 PM",
        sampleWindow: "Sep 1-30",
        status: "success",
        percent: 100,
        completed: 26,
        expected: 26,
      },
    ],
  },
]

function getAgentName(index: number) {
  const safeIndex = Math.max(index, 0)
  const firstNameIndex = safeIndex % agentFirstNames.length
  const cycleIndex = Math.floor(safeIndex / agentFirstNames.length)
  const firstName = agentFirstNames[firstNameIndex]
  const lastNameIndex = (firstNameIndex * 7 + cycleIndex) % agentLastNames.length
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
  const cycleIndex = Math.floor(safeIndex / evaluatorFirstNames.length)
  const firstName = evaluatorFirstNames[firstNameIndex]
  const lastName =
    evaluatorLastNames[(firstNameIndex * 5 + cycleIndex) % evaluatorLastNames.length]
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
    "This evaluator reached the assignment cap configured for the cycle.",
  "Workload limit reached":
    "This evaluator has reached the workload limit configured for the rule in this run.",
  "Rule did not execute":
    "The rule was scheduled but did not run due to a system error.",
  "Rule execution interrupted":
    "The rule started but timed out before processing all agents.",
  "Quota met by another rule":
    "This agent's QA goal was already met by a different rule. Not a failure - they received QA.",
  "No eligible conversations to assign":
    "No eligible conversations remained for this evaluator in the selected cycle.",
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

function getCycleStatusLabel(status: RunStatus, percent: number) {
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

function getCycleSummaryIconPath(cycle: RuleHistoryCycle) {
  if (cycle.isUpcoming) {
    const tone = getHistoryTone("success", cycle.percent)

    if (tone === "success") {
      return "/status-icons/check-circle.svg"
    }

    if (tone === "partial") {
      return "/status-icons/partial.svg"
    }

    return "/status-icons/x-circle.svg"
  }

  return getStatusIconPath(cycle.status, cycle.percent)
}

function getCycleSummaryTone(cycle: RuleHistoryCycle) {
  return cycle.isUpcoming
    ? getHistoryTone("success", cycle.percent)
    : getHistoryTone(cycle.status, cycle.percent)
}

function formatCycleRangeLabel(sampleWindow: string) {
  return sampleWindow.replace(/-/g, " - ")
}

function getAgentsNotInAnyRuleTitle(issueCount: number) {
  return `${issueCount} ${issueCount === 1 ? "agent" : "agents"} not added to any rule`
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
    detailText: "Awaiting follow-up on this cycle.",
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

const versionThreeCycleScenarios: Partial<Record<string, VersionThreeCycleScenario>> = {
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
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
        detailText: "No additional matched conversations were available to route in this cycle.",
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
        detailText: "No additional matched conversations were available to route in this cycle.",
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
        detailText: "No additional matched conversations were available to route in this cycle.",
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
        detailText: "No additional matched conversations were available to route in this cycle.",
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
        detailText: "Reached the assignment cap for this cycle.",
      },
    ],
    activeEvaluatorCount: 3,
  },
}

function buildCycleDetail(ruleId: string, config: CycleConfig): RunCycleDetail {
  const scenario = versionThreeCycleScenarios[config.id]
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
    statusLabel: getCycleStatusLabel(config.status, config.percent),
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

const versionThreeRules: VersionThreeRule[] = ruleConfigs.map((ruleConfig) => ({
  id: ruleConfig.id,
  name: ruleConfig.name,
  assignmentType: ruleConfig.assignmentType,
  frequency: ruleConfig.frequency,
  status: ruleConfig.status,
  cycles: ruleConfig.cycles.map((cycleConfig) => ({
    id: cycleConfig.id,
    listLabel: cycleConfig.listLabel,
    sampleWindow: cycleConfig.sampleWindow,
    status: cycleConfig.status,
    percent: cycleConfig.percent,
    completed: cycleConfig.completed,
    expected: cycleConfig.expected,
    isUpcoming: cycleConfig.isUpcoming ?? false,
    detail: buildCycleDetail(ruleConfig.id, cycleConfig),
  })),
}))

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

function CycleSummaryCell({
  cycle,
  actionLabel,
  onAction,
}: {
  cycle: RuleHistoryCycle
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex min-w-0 items-center gap-28">
      <div className="flex min-w-0 items-start gap-10">
        <CycleStatusIcon cycle={cycle} size="sm" className="mt-2" />
        <div className="min-w-0">
          <p className="truncate text-14 font-semibold text-text-primary">
            {formatCycleRangeLabel(cycle.sampleWindow)}
          </p>
          <p className="mt-4 text-12 font-medium text-text-secondary">
            {`${cycle.percent}% | ${cycle.completed}/${cycle.expected}`}
          </p>
        </div>
      </div>

      {actionLabel && onAction ? (
        <Button variant="default" size="sm" className="shrink-0" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

function CycleStatusIcon({
  cycle,
  size,
  className,
}: {
  cycle: RuleHistoryCycle
  size: "sm" | "md" | "lg"
  className?: string
}) {
  const tone = getCycleSummaryTone(cycle)
  const iconPath = tone === "failed" ? null : getCycleSummaryIconPath(cycle)

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

function CoverageIssueCard({
  issue,
  rules,
  onAddToRule,
}: {
  issue: CoverageIssue
  rules: VersionThreeRule[]
  onAddToRule: (issueId: string, ruleName: string) => void
}) {
  const allTeamNames = issue.teamNames?.filter(Boolean) ?? (issue.teamName ? [issue.teamName] : [])
  const visibleTeamNames = allTeamNames.slice(0, 2)
  const hiddenTeamNames = allTeamNames.slice(2)

  return (
    <div className="flex items-start justify-between gap-12 py-16">
      <div className="min-w-0 space-y-8">
        <div className="flex items-start gap-12">
          <Avatar name={issue.agentName} size="xs" />
          <div className="min-w-0">
            <p className="text-14 font-semibold text-text-primary">{issue.agentName}</p>
            {allTeamNames.length > 0 ? (
              <p className="text-12 font-medium text-text-secondary">
                {visibleTeamNames.join(", ")}
                {hiddenTeamNames.length > 0 ? (
                  <>
                    {visibleTeamNames.length > 0 ? ", " : ""}
                    <SimpleTooltip
                      side="bottom"
                      content={
                        <span className="block max-w-200 whitespace-normal">
                          {hiddenTeamNames.join(", ")}
                        </span>
                      }
                    >
                      <span className="cursor-default text-text-secondary hover:text-text-secondary">
                        +{hiddenTeamNames.length}
                      </span>
                    </SimpleTooltip>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            Add to rule
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {rules.map((rule) => (
            <DropdownMenuItem
              key={`${issue.id}-${rule.id}`}
              onClick={() => onAddToRule(issue.id, rule.name)}
            >
              {rule.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function RunMetadataSection({ rows }: { rows: ExecutionMetadataRow[] }) {
  return (
    <div className="space-y-16 px-20 py-20">
      {rows.map((row) => (
        <div key={`metadata-${row.label}`} className="space-y-6">
          <p className="text-12 font-medium text-text-secondary">{row.label}</p>
          <p className="text-14 font-medium text-text-primary">{row.value}</p>
        </div>
      ))}
    </div>
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

function RunHistoryModal({
  rule,
  selectedCycleId,
  activeTab,
  onClose,
  onSelectCycle,
  onSelectTab,
  onOpenRuleSetup,
}: {
  rule: VersionThreeRule | null
  selectedCycleId: string | null
  activeTab: DetailTab
  onClose: () => void
  onSelectCycle: (cycleId: string) => void
  onSelectTab: (tab: DetailTab) => void
  onOpenRuleSetup: (ruleName: string) => void
}) {
  const selectedCycle =
    rule?.cycles.find((cycle) => cycle.id === selectedCycleId) ?? rule?.cycles[0] ?? null

  const isUpcoming = selectedCycle?.isUpcoming ?? false
  const groupedAgentsWithoutQa = React.useMemo(
    () => (selectedCycle ? groupRuleAgentIssues(selectedCycle.detail.agentsWithoutQa) : []),
    [selectedCycle]
  )
  const coveredAgentsIncludingQuota = React.useMemo(
    () =>
      selectedCycle
        ? getUniqueByName(
            [...selectedCycle.detail.coveredAgents, ...selectedCycle.detail.quotaMetElsewhere],
            (agent) => agent.name
          )
        : [],
    [selectedCycle]
  )
  const evaluatorWorkloadRows = React.useMemo(
    () =>
      selectedCycle
        ? [...selectedCycle.detail.evaluatorsWithIssues, ...selectedCycle.detail.activeEvaluators]
        : [],
    [selectedCycle]
  )
  const [expandedAgentSections, setExpandedAgentSections] = React.useState<string[]>([])
  const [showAllCoveredAgents, setShowAllCoveredAgents] = React.useState(false)
  const [showAllActiveEvaluators, setShowAllActiveEvaluators] = React.useState(false)

  React.useEffect(() => {
    if (!selectedCycle) {
      setExpandedAgentSections([])
      setShowAllCoveredAgents(false)
      setShowAllActiveEvaluators(false)
      return
    }

    setExpandedAgentSections([
      ...groupedAgentsWithoutQa.map((group) => group.sectionValue),
      "agents-covered",
    ])
    setShowAllCoveredAgents(false)
    setShowAllActiveEvaluators(false)
  }, [groupedAgentsWithoutQa, selectedCycle?.id])

  if (!rule || !selectedCycle) {
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
            <h2 className="text-24 font-semibold tracking-tight text-text-primary">{`${rule.name} runs`}</h2>
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
            <div className="flex w-256 shrink-0 flex-col border-r border-border-subtle bg-surface-subtle">
              <div className="border-b border-border-subtle px-16 py-12">
                <p className="text-12 font-semibold text-text-secondary">All cycles</p>
              </div>
              <div className="flex-1 overflow-y-auto px-12 py-12">
                <div className="flex flex-col gap-8">
                  {rule.cycles.map((cycle) => {
                    const isSelected = cycle.id === selectedCycle.id

                    return (
                      <Button
                        key={cycle.id}
                        variant="ghost"
                        className={cn(
                          "h-auto w-full justify-start rounded-xl border px-12 py-12 text-left",
                          isSelected
                            ? "border-border-strong bg-surface-card hover:bg-surface-card"
                            : "border-transparent hover:bg-surface-card"
                        )}
                        onClick={() => onSelectCycle(cycle.id)}
                      >
                        <div className="flex w-full items-start justify-between gap-12">
                          <div className="flex min-w-0 items-start gap-8">
                            <CycleStatusIcon cycle={cycle} size="sm" className="mt-2" />
                            <div className="min-w-0">
                              <p className="truncate text-14 font-semibold text-text-primary">
                                {formatCycleRangeLabel(cycle.sampleWindow)}
                              </p>
                              <div className="mt-4 flex flex-wrap items-center gap-8">
                                <p className="text-12 font-medium text-text-secondary">
                                  {`${cycle.percent}% · ${cycle.completed}/${cycle.expected}`}
                                </p>
                                {cycle.isUpcoming ? (
                                  <Badge color="blue" size="sm">
                                    Upcoming
                                  </Badge>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-surface-page">
              <div className="mx-auto flex min-h-full w-full flex-col">
                <div className="border-b border-border-subtle px-24 py-24">
                  <div className="flex flex-col items-center gap-8 text-center">
                    <CycleStatusIcon cycle={selectedCycle} size="lg" />
                    <div className="flex flex-wrap items-center justify-center gap-8">
                      <span
                        className={cn(
                          "text-16 font-semibold",
                          getPercentTextClassName(selectedCycle.status, selectedCycle.percent)
                        )}
                      >
                        {selectedCycle.detail.statusLabel}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                      <p className="text-30 font-semibold text-text-primary">
                        {selectedCycle.detail.countLabel}
                      </p>
                      <p className="text-14 font-medium text-text-secondary">
                        {isUpcoming
                          ? `${selectedCycle.percent}% predicted success`
                          : `${selectedCycle.percent}% of expected assignments`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col px-24 py-20">
                  <Tabs
                    value={activeTab}
                    onValueChange={(value) => onSelectTab(value as DetailTab)}
                    className="flex flex-col"
                  >
                    <NeutralTabsList className="w-full p-4">
                      <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">
                        Agents
                      </NeutralTabsTrigger>
                      <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">
                        Evaluators
                      </NeutralTabsTrigger>
                      <NeutralTabsTrigger
                        value="run_details"
                        className="h-36 flex-1 px-8 py-6 text-12"
                      >
                        Run details
                      </NeutralTabsTrigger>
                    </NeutralTabsList>

                    <TabsContent value="agents" className="mt-16">
                      <Accordion
                        type="multiple"
                        value={expandedAgentSections}
                        onValueChange={(value) => setExpandedAgentSections(value as string[])}
                        className="space-y-12"
                      >
                        {groupedAgentsWithoutQa.length > 0 ? (
                          groupedAgentsWithoutQa.map((group) => (
                            <AccordionItem
                              key={group.sectionValue}
                              value={group.sectionValue}
                              className="rounded-xl border border-border-subtle"
                            >
                              <AccordionTrigger className="px-16 py-16 text-14 font-bold text-text-primary [&>svg]:text-icon-primary">
                                {`${group.agents.length} ${group.agents.length === 1 ? "agent" : "agents"}: ${group.label}`}
                              </AccordionTrigger>
                              <AccordionContent className="space-y-12 px-16 pb-16 text-text-primary">
                                <div className="divide-y divide-border-subtle">
                                  {group.agents.map((agent) => (
                                    <RuleAgentRowCard
                                      key={agent.id}
                                      agent={agent}
                                      showIssueCodeBadge={false}
                                      showSupportingText={false}
                                    />
                                  ))}
                                </div>
                                {canResolveRuleAgentIssueGroup(group.label) && isUpcoming ? (
                                  <Button
                                    variant="default"
                                    size="default"
                                    className="w-full"
                                    iconRight={
                                      <ExternalLink size={14} className="text-text-inverse" />
                                    }
                                    onClick={() => onOpenRuleSetup(rule.name)}
                                  >
                                    {getRuleAgentIssueCtaLabel(group.label)}
                                  </Button>
                                ) : null}
                              </AccordionContent>
                            </AccordionItem>
                          ))
                        ) : (
                          <p className="text-12 font-medium text-text-tertiary">No agents not covered.</p>
                        )}

                        <AccordionItem
                          value="agents-covered"
                          className="rounded-xl border border-border-subtle"
                        >
                          <AccordionTrigger className="px-16 py-16 text-14 font-semibold text-text-primary [&>svg]:text-icon-primary">
                            {selectedCycle.detail.coveredAgentsLabel}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-12 px-16 pb-16 text-text-primary">
                            {(showAllCoveredAgents
                              ? coveredAgentsIncludingQuota
                              : coveredAgentsIncludingQuota.slice(0, 5)
                            ).length > 0 ? (
                              <>
                                <SideSheetColumnHeader leftLabel="Name" rightLabel="Assign" />
                                <SideSheetStatusRail tone="success">
                                  <div className="divide-y divide-border-subtle">
                                    {(showAllCoveredAgents
                                      ? coveredAgentsIncludingQuota
                                      : coveredAgentsIncludingQuota.slice(0, 5)
                                    ).map((agent) => (
                                      <RuleAgentRowCard
                                        key={agent.id}
                                        agent={agent}
                                        showIssueCodeBadge={true}
                                      />
                                    ))}
                                  </div>
                                </SideSheetStatusRail>
                              </>
                            ) : (
                              <p className="text-12 font-medium text-text-tertiary">
                                No covered agents.
                              </p>
                            )}

                            {!showAllCoveredAgents && coveredAgentsIncludingQuota.length > 5 ? (
                              <Button
                                variant="linkSecondary"
                                className="h-auto p-0"
                                onClick={() => setShowAllCoveredAgents(true)}
                              >
                                +{coveredAgentsIncludingQuota.length - 5} more agents
                              </Button>
                            ) : null}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>

                    <TabsContent value="evaluators" className="mt-16">
                      <div className="pt-16">
                        <Card className="border-border-subtle shadow-none">
                          <div className="space-y-12 px-16 py-16 text-text-primary">
                            <p className="text-14 font-semibold text-text-primary">
                              {selectedCycle.detail.activeEvaluatorsLabel}
                            </p>
                            <SideSheetColumnHeader leftLabel="Evaluator" rightLabel="Workload" />

                            {(showAllActiveEvaluators
                              ? evaluatorWorkloadRows
                              : evaluatorWorkloadRows.slice(0, 5)
                            ).length > 0 ? (
                              <div className="divide-y divide-border-subtle">
                                {(showAllActiveEvaluators
                                  ? evaluatorWorkloadRows
                                  : evaluatorWorkloadRows.slice(0, 5)
                                ).map((evaluator) => (
                                  <RuleEvaluatorRowCard
                                    key={evaluator.id}
                                    evaluator={evaluator}
                                    showIssueCodeBadge={true}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="text-12 font-medium text-text-tertiary">
                                No evaluator workload data for this run.
                              </p>
                            )}

                            {!showAllActiveEvaluators && evaluatorWorkloadRows.length > 5 ? (
                              <Button
                                variant="linkSecondary"
                                className="h-auto p-0"
                                onClick={() => setShowAllActiveEvaluators(true)}
                              >
                                +{evaluatorWorkloadRows.length - 5} more evaluators
                              </Button>
                            ) : null}
                          </div>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="run_details" className="mt-16">
                      <RunMetadataSection rows={selectedCycle.detail.metadata} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default function VersionThreePrototype() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "inactive">("all")
  const [isNotificationModalOpen, setNotificationModalOpen] = React.useState(false)
  const [notificationRecipients, setNotificationRecipients] = React.useState<string[]>([
    "jordan",
    "sarah-k",
  ])
  const [notificationFrequency, setNotificationFrequency] = React.useState<Frequency>("weekly")
  const [notificationWeekday, setNotificationWeekday] = React.useState<NotificationWeekday>("saturday")
  const [notificationMonthDay, setNotificationMonthDay] = React.useState("1")
  const [notificationTime, setNotificationTime] = React.useState("18:00")
  const [coverageIssues, setCoverageIssues] = React.useState<CoverageIssue[]>(() =>
    buildInitialCoverageIssues()
  )
  const [isCoverageSheetOpen, setCoverageSheetOpen] = React.useState(false)
  const [activeRuleId, setActiveRuleId] = React.useState<string | null>(null)
  const [selectedCycleId, setSelectedCycleId] = React.useState<string | null>(null)
  const [activeDetailTab, setActiveDetailTab] = React.useState<DetailTab>("agents")
  const deferredSearchQuery = React.useDeferredValue(searchQuery.trim().toLowerCase())

  const filteredRules = versionThreeRules.filter((rule) => {
    const matchesSearch =
      deferredSearchQuery.length === 0 ||
      rule.name.toLowerCase().includes(deferredSearchQuery) ||
      rule.assignmentType.toLowerCase().includes(deferredSearchQuery)

    const matchesStatus =
      statusFilter === "all" || rule.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  const coverageAvatarNames = coverageIssues.map((issue) => issue.agentName)
  const ruleOptions = versionThreeRules.filter((rule) => rule.status === "Active")
  const notificationWeekdayLabel =
    notificationWeekdayOptions.find((option) => option.value === notificationWeekday)?.label ??
    "Saturday"
  const notificationMonthDayLabel =
    notificationMonthlyDayOptions.find((option) => option.value === notificationMonthDay)?.label ??
    "1st"
  const notificationTimeLabel =
    notificationTimeOptions.find((option) => option.value === notificationTime)?.label ?? "06:00 PM"
  const notificationScheduleSummary =
    notificationFrequency === "daily"
      ? `Recipients will receive an email daily at ${notificationTimeLabel} with a summary of predicted coverage gaps.`
      : notificationFrequency === "weekly"
        ? `Recipients will receive an email every ${notificationWeekdayLabel} at ${notificationTimeLabel} with a summary of predicted coverage gaps.`
        : `Recipients will receive an email on the ${notificationMonthDayLabel} of each month at ${notificationTimeLabel} with a summary of predicted coverage gaps.`

  const activeRule =
    versionThreeRules.find((rule) => rule.id === activeRuleId) ?? null

  const openRunHistory = (rule: VersionThreeRule, forceUpcoming = false) => {
    const upcomingCycle = rule.cycles.find((cycle) => cycle.isUpcoming) ?? null
    const latestCompletedCycle = rule.cycles.find((cycle) => !cycle.isUpcoming) ?? null
    const defaultCycle =
      forceUpcoming && upcomingCycle
        ? upcomingCycle
        : upcomingCycle && upcomingCycle.percent < 100
          ? upcomingCycle
          : latestCompletedCycle ?? upcomingCycle

    setActiveRuleId(rule.id)
    setSelectedCycleId(defaultCycle?.id ?? null)
    setActiveDetailTab("agents")
  }

  const handleCloseModal = () => {
    setActiveRuleId(null)
    setSelectedCycleId(null)
    setActiveDetailTab("agents")
  }

  const handleSaveNotifications = React.useCallback(() => {
    setNotificationModalOpen(false)
    toast({
      title: "Notifications saved",
      description: "Recipients and schedule have been updated.",
    })
  }, [])

  const handleOpenRuleSetup = (_ruleName: string) => {}

  const handleAddCoverageAgentToRule = (issueId: string, _ruleName: string) => {
    setCoverageIssues((currentIssues) => currentIssues.filter((issue) => issue.id !== issueId))
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-surface-page">
        <MainNav activeItem="Settings" />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar avatarInitial="A" avatarColor="var(--color-primary-lime-700)" />

          <main className="flex-1 overflow-hidden">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notifications"
                        onClick={() => setNotificationModalOpen(true)}
                        iconLeft={<Bell01 size={16} className="text-icon-primary" />}
                      />
                      <Button variant="secondary">Manage replacement reasons</Button>
                      <Button>New rule</Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-16 h-auto w-full justify-between rounded-xl border border-border-subtle bg-surface-card px-24 py-20 hover:bg-surface-card"
                    onClick={() => setCoverageSheetOpen(true)}
                  >
                    <span className="flex min-w-0 items-center gap-8">
                      <span className="shrink-0 text-18" aria-hidden="true">
                        ⚠️
                      </span>
                      <span className="truncate text-14 font-semibold text-text-primary">
                        {getAgentsNotInAnyRuleTitle(coverageIssues.length)}
                      </span>
                    </span>
                    <span className="flex items-center gap-12">
                      {coverageAvatarNames.length > 0 ? (
                        <AvatarGroup names={coverageAvatarNames} max={3} size="xs" />
                      ) : null}
                      <ChevronRight size={16} className="text-icon-secondary" />
                    </span>
                  </Button>

                  <Card className="mt-16 overflow-hidden rounded-xl border-border-subtle">
                    <div className="overflow-x-auto">
                      <Table className="min-w-max">
                        <TableHeader className="bg-surface-card">
                          <TableRow className="hover:bg-surface-card">
                            <TableHead className="w-256 text-text-primary">Rules</TableHead>
                            <TableHead className="w-128 text-text-primary">Status</TableHead>
                            <TableHead className="w-240 text-text-primary">Upcoming cycle</TableHead>
                            <TableHead className="w-240 text-text-primary">Last cycle</TableHead>
                            <TableHead className="w-240 text-right text-text-primary">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRules.length > 0 ? (
                            filteredRules.map((rule) => {
                              const upcomingCycle =
                                rule.cycles.find((cycle) => cycle.isUpcoming) ?? rule.cycles[0]
                              const latestCompletedCycle =
                                rule.cycles.find((cycle) => !cycle.isUpcoming) ?? rule.cycles[0]

                              return (
                                <TableRow key={rule.id}>
                                  <TableCell>
                                    <div className="flex flex-col gap-4">
                                      <span className="text-14 font-semibold text-text-primary">{rule.name}</span>
                                      <span className="text-12 font-medium text-text-secondary">
                                        {rule.assignmentType}
                                      </span>
                                    </div>
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

                                  <TableCell>
                                    <CycleSummaryCell
                                      cycle={upcomingCycle}
                                      actionLabel={upcomingCycle.percent < 100 ? "Resolve" : undefined}
                                      onAction={
                                        upcomingCycle.percent < 100
                                          ? () => openRunHistory(rule, true)
                                          : undefined
                                      }
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <CycleSummaryCell cycle={latestCompletedCycle} />
                                  </TableCell>

                                  <TableCell>
                                    <div className="flex items-center justify-end gap-4">
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => openRunHistory(rule)}
                                      >
                                        View history
                                      </Button>

                                      <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Edit ${rule.name}`}
                                        iconLeft={<Edit03 size={16} className="text-icon-secondary" />}
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
                  selectedCycleId={selectedCycleId}
                  activeTab={activeDetailTab}
                  onClose={handleCloseModal}
                  onSelectCycle={setSelectedCycleId}
                  onSelectTab={setActiveDetailTab}
                  onOpenRuleSetup={handleOpenRuleSetup}
                />

                <Dialog open={isNotificationModalOpen} onOpenChange={setNotificationModalOpen}>
                  <DialogContent size="lg">
                    <DialogHeader className="border-none">Notifications</DialogHeader>
                    <DialogBody className="space-y-24 py-24">
                      <p className="text-16 text-text-primary">
                        Get notified before each assignment cycle runs, so you can resolve coverage
                        gaps in advance.
                      </p>

                      <div className="space-y-24">
                        <p className="text-14 font-semibold text-text-primary">Notify</p>
                        <Multiselect
                          options={cycleNotificationRecipients}
                          value={notificationRecipients}
                          onValueChange={setNotificationRecipients}
                          placeholder="Search by name or role..."
                          searchPlaceholder="Search by name or role..."
                        />
                        <div className="space-y-12">
                          <p className="text-14 font-semibold text-text-primary">Send at</p>
                          <div
                            className={cn(
                              "grid gap-12",
                              notificationFrequency === "daily"
                                ? "sm:grid-cols-2"
                                : "sm:grid-cols-3"
                            )}
                          >
                            <div className="space-y-8">
                              <p className="text-12 font-medium text-text-secondary">Frequency</p>
                              <Select
                                value={notificationFrequency}
                                onValueChange={(value) => setNotificationFrequency(value as Frequency)}
                              >
                                <SelectTrigger aria-label="Notification frequency" className="w-full">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {notificationFrequencyOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {notificationFrequency === "weekly" ? (
                              <div className="space-y-8">
                                <p className="text-12 font-medium text-text-secondary">Day</p>
                                <Select
                                  value={notificationWeekday}
                                  onValueChange={(value) =>
                                    setNotificationWeekday(value as NotificationWeekday)
                                  }
                                >
                                  <SelectTrigger aria-label="Notification day" className="w-full">
                                    <SelectValue placeholder="Select day" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {notificationWeekdayOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : null}

                            {notificationFrequency === "monthly" ? (
                              <div className="space-y-8">
                                <p className="text-12 font-medium text-text-secondary">Day</p>
                                <Select
                                  value={notificationMonthDay}
                                  onValueChange={setNotificationMonthDay}
                                >
                                  <SelectTrigger aria-label="Notification day of month" className="w-full">
                                    <SelectValue placeholder="Select day" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {notificationMonthlyDayOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : null}

                            <div className="space-y-8">
                              <p className="text-12 font-medium text-text-secondary">Time</p>
                              <Select value={notificationTime} onValueChange={setNotificationTime}>
                                <SelectTrigger aria-label="Notification time" className="w-full">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {notificationTimeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <InlineAlert
                          variant="info"
                          description={notificationScheduleSummary}
                        />
                      </div>
                    </DialogBody>
                    <DialogFooter className="border-none">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSaveNotifications}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet open={isCoverageSheetOpen} onOpenChange={setCoverageSheetOpen}>
                  <SheetContent size="md">
                    <SheetHeader description="Agents currently outside all assignment rules.">
                      {getAgentsNotInAnyRuleTitle(coverageIssues.length)}
                    </SheetHeader>
                    <SheetBody>
                      {coverageIssues.length > 0 ? (
                        <div className="divide-y divide-border-subtle">
                          {coverageIssues.map((issue) => (
                            <CoverageIssueCard
                              key={issue.id}
                              issue={issue}
                              rules={ruleOptions}
                              onAddToRule={handleAddCoverageAgentToRule}
                            />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          className="min-h-240"
                          icon={<SearchMd size={20} className="text-icon-secondary" />}
                          title="No agents to review."
                        />
                      )}
                    </SheetBody>
                  </SheetContent>
                </Sheet>
              </section>
            </div>
          </main>
        </div>
        <ToastContainer position="top-right" className="z-[60]" />
      </div>
    </TooltipProvider>
  )
}
