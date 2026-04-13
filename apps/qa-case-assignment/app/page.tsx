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
import { AlertToast } from "@level/ui/components/ui/alert-toast"
import { Badge } from "@level/ui/components/ui/badge"
import { Button } from "@level/ui/components/ui/button"
import { Card } from "@level/ui/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@level/ui/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu"
import { Input } from "@level/ui/components/ui/input"
import { Label } from "@level/ui/components/ui/label"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@level/ui/components/ui/modal"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"
import { Multiselect, type MultiselectOption } from "@level/ui/components/ui/multiselect"
import { EmptyState } from "@level/ui/components/ui/empty-state"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
} from "@level/ui/components/ui/sheet"
import { SimpleTooltip, TooltipProvider } from "@level/ui/components/ui/tooltip"
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
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@level/ui/components/ui/tabs"
import {
  Bell01,
  ChevronRight,
  DotsVertical,
  File01,
  PrivateCalibration,
  SearchMd,
  Settings01,
} from "@level/ui/components/icons"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import { ChevronDown, ChevronLeft, ExternalLink } from "lucide-react"
import {
  mockDbActivityByTab,
  mockDbOrderedActivityTabs,
  mockDbRuleSheetByRuleRowId,
} from "./data/mock-db-activity"

type SettingsSection = {
  heading?: string
  items: Array<{
    label: string
    active?: boolean
  }>
}

type AssignmentRule = {
  name: string
  createdBy: string
  creatorColor: string
  createdOn: string
  assignmentType: string
  lastAssignment: string
  status: string
}

type ActivityTab = `week_${number}`
type ActivityModeTab = "agent_evaluation" | "evaluator_calibration"
type ActivityRuleStatus = "success" | "partial" | "failed"
type CycleLength = "weekly" | "monthly"
type WeekdayValue =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

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

type ActivityRuleRow = {
  id: string
  name: string
  status: ActivityRuleStatus
  metric: string
  assignments: string
  note?: string
  issueCodeLabel?: IssueCodeLabel
  mainPageReasonLines?: string[]
  impactedAgents?: string[]
}

type ActivitySummary = {
  agentsNotInAnyRuleCount?: number
  agentsWithoutAssignment: number
  evaluatorsWithoutWorkload: number
}

type ActivityData = {
  tabLabel: string
  tabQualifier?: string
  summary: ActivitySummary
  rules: ActivityRuleRow[]
}

type ExecutionMetadataRow = {
  label: string
  value: string
}

type CoverageIssueType =
  | "not_in_rule"
  | "all_evaluators_capacity"
  | "no_matching_conversations"
  | "rule_execution_failed"

type CoverageIssue = {
  id: string
  agentName: string
  teamName?: string
  teamNames?: string[]
  issueType: CoverageIssueType
  ruleId?: string
  ruleName?: string
  lastCovered?: string
  dropReason?: string
  conversationContext?: string
  unassignedCount?: number
  evaluatorCapacitySummary?: string
}

type CoverageSheetDetails = {
  panel: "coverage"
  title: string
  subtitle: string
  issues: CoverageIssue[]
}

type RuleAgentWarningReason =
  | "no_matching_conversations"
  | "all_evaluators_capacity"
  | "no_conversations_in_period"
  | "evaluator_unavailable"
  | "rule_interrupted"

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

type RuleSheetDetails = {
  panel: "rule"
  ruleId: string
  title: string
  subtitle: string
  status: ActivityRuleStatus
  statusLabel: string
  progressLabel: string
  metadata: ExecutionMetadataRow[]
  reasonSummary?: string
  agentsWithoutQa: RuleAgentRow[]
  coveredAgents: RuleAgentRow[]
  quotaMetElsewhere: RuleAgentRow[]
  evaluatorsWithIssues: RuleEvaluatorRow[]
  activeEvaluators: RuleEvaluatorRow[]
}

type MockDbRuleSheetData = Omit<RuleSheetDetails, "panel" | "ruleId" | "title" | "subtitle">

type RunSheetView = CoverageSheetDetails | RuleSheetDetails

const ACTIVITY_TAB_COUNT = 40
const ACTIVITY_RULE_COUNT = 8
const ACTIVITY_TOTAL_RULE_SLOTS = ACTIVITY_TAB_COUNT * ACTIVITY_RULE_COUNT
const ACTIVITY_SUCCESS_RULE_COUNT = Math.round(ACTIVITY_TOTAL_RULE_SLOTS * 0.7)
const ACTIVITY_PARTIAL_RULE_COUNT = Math.round(ACTIVITY_TOTAL_RULE_SLOTS * 0.2)
const AGENT_POPULATION_COUNT = 240

const activityRuleNames = [
  "Legacy Escalation QA",
  "Mortgage Queue",
  "Renewals - TL Review Batch",
  "Savings Product - QA Rotation",
  "Escalation Sweep - Weekend Priority",
  "Claims Exception Queue",
  "Policy Renewal Audit",
  "Customer Retention Watchlist",
]

const activityRuleTargets = [60, 90, 84, 72, 66, 78, 96, 108]

const partialRuleNotes = [
  "Assignments fell short due to temporary evaluator load balancing",
  "A subset of conversations was deferred because eligibility checks timed out",
  "Some assignments were rescheduled while replacement evaluators were provisioned",
]

const RULE_EXECUTION_FAILED_LABEL = "Rule execution failed"

const issueCodeDescriptions: Record<string, string> = {
  "Agent not in any rule":
    "This agent isn't included in any active assignment rule — manually or through dynamic selection. Add them to a rule to ensure QA coverage.",
  "Insufficient matching conversations":
    "No eligible conversations matched this rule during the run window.",
  "Evaluators' workload limit reached":
    "Evaluator workload or availability constraints blocked assignment.",
  "Rule execution failed":
    "The rule did not complete successfully in this run.",
  "No conversations in period":
    "This agent had zero conversations during the sampling period. They may have been off or on leave.",
  "Conversations didn't match filters":
    "This agent had conversations, but none matched the rule's conditions (e.g., duration, tags, disposition). Review the rule's filters.",
  "All evaluators at capacity":
    "Eligible conversations existed for this agent, but every evaluator in the rule had already reached their workload limit.",
  "Evaluator unavailable":
    "This evaluator was marked as unavailable or on leave when the rule ran.",
  "Workload limit reached":
    "This evaluator has reached the workload limit configured for the rule in this run.",
  "Rule did not execute":
    "The rule was scheduled but did not run due to a system error.",
  "Rule execution interrupted":
    "The rule started but timed out before processing all agents.",
  "Quota met by another rule":
    "This agent's QA goal was already met by a different rule. Not a failure — they received QA.",
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

const partialIssueCodes: IssueCodeLabel[] = [
  "No conversations in period",
  "Conversations didn't match filters",
  "All evaluators at capacity",
  "Evaluator unavailable",
  "Rule execution interrupted",
  "Quota met by another rule",
  "Agent not in any rule",
]

const sampleAgentNames = [
  "Avery Cole",
  "Noah Patel",
  "Sofia Martinez",
  "Aisha Khan",
  "Liam Brooks",
  "Priya Nair",
  "Marcus Lee",
  "Riya Shah",
]

const cycleNotificationRecipients: MultiselectOption[] = [
  { value: "jordan", label: "Jordan" },
  { value: "sarah-k", label: "Sarah K" },
  { value: "avery-cole", label: "Avery Cole" },
  { value: "riya-shah", label: "Riya Shah" },
  { value: "rahul-verma", label: "Rahul Verma" },
]

const cycleLengthOptions: Array<{ value: CycleLength; label: string }> = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

const weeklyStartOptions: Array<{ value: WeekdayValue; label: string }> = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

const monthlyStartOptions: Array<{ value: string; label: string }> = [
  { value: "1", label: "1st" },
  { value: "5", label: "5th" },
  { value: "10", label: "10th" },
  { value: "15", label: "15th" },
  { value: "20", label: "20th" },
  { value: "25", label: "25th" },
]

function getRuleStatus(tabIndex: number, ruleIndex: number): ActivityRuleStatus {
  const globalIndex = tabIndex * ACTIVITY_RULE_COUNT + ruleIndex
  const shuffledIndex = (globalIndex * 73 + 19) % ACTIVITY_TOTAL_RULE_SLOTS

  if (shuffledIndex < ACTIVITY_SUCCESS_RULE_COUNT) {
    return "success"
  }

  if (shuffledIndex < ACTIVITY_SUCCESS_RULE_COUNT + ACTIVITY_PARTIAL_RULE_COUNT) {
    return "partial"
  }

  return "failed"
}

function getRuleMetric(status: ActivityRuleStatus, tabIndex: number, ruleIndex: number) {
  if (status === "success") {
    return 100
  }

  if (status === "partial") {
    return 85 + ((tabIndex + ruleIndex * 2) % 11)
  }

  return 0
}

function getRuleNote(status: ActivityRuleStatus, tabIndex: number, ruleIndex: number) {
  if (status === "partial") {
    return partialRuleNotes[(tabIndex + ruleIndex) % partialRuleNotes.length]
  }

  if (status === "failed") {
    return RULE_EXECUTION_FAILED_LABEL
  }

  return undefined
}

function getIssueCodeLabel(
  status: ActivityRuleStatus,
  tabIndex: number,
  ruleIndex: number
): IssueCodeLabel | undefined {
  if (status === "partial") {
    return partialIssueCodes[(tabIndex + ruleIndex) % partialIssueCodes.length]
  }

  if (status === "failed") {
    return RULE_EXECUTION_FAILED_LABEL
  }

  return undefined
}

function getMainPageReasonLines(
  status: ActivityRuleStatus,
  tabIndex: number,
  ruleIndex: number
): string[] {
  if (status === "partial") {
    const reasonKinds = ["no_conversations", "no_matching", "unavailable"] as const
    const firstReasonKind = reasonKinds[(tabIndex + ruleIndex) % reasonKinds.length]
    const secondReasonKind = reasonKinds[(tabIndex + ruleIndex + 2) % reasonKinds.length]
    const selectedReasonKinds =
      firstReasonKind === secondReasonKind
        ? [firstReasonKind]
        : [firstReasonKind, secondReasonKind]

    return selectedReasonKinds.map((reasonKind, index) => {
      const count = 2 + ((tabIndex + ruleIndex + index) % 6)
      if (reasonKind === "no_conversations") {
        return `${count} agents had no conversations in period`
      }
      if (reasonKind === "no_matching") {
        return `${count} agents had no matching conversations`
      }
      if (reasonKind === "unavailable") {
        return `${count} agents unassigned due to evaluator unavailability`
      }

      return `${count} agents unassigned due to evaluator unavailability`
    })
  }

  if (status === "failed") {
    return [RULE_EXECUTION_FAILED_LABEL]
  }

  return []
}

function isRuleExecutionFailureLine(reasonLine: string) {
  const normalizedReasonLine = reasonLine.trim().toLowerCase()
  return (
    normalizedReasonLine.includes("rule execution failed") ||
    normalizedReasonLine.includes("rule did not execute") ||
    normalizedReasonLine.includes("not processed")
  )
}

function normalizeFailedAssignments(assignments: string) {
  const [completedRawValue, targetRawValue] = assignments.split("/")
  if (!targetRawValue) {
    return assignments
  }

  const parsedTarget = Number.parseInt(targetRawValue.trim(), 10)
  if (!Number.isFinite(parsedTarget) || parsedTarget < 0) {
    return assignments
  }

  const hasCompletedValue = Number.isFinite(Number.parseInt((completedRawValue ?? "").trim(), 10))
  if (!hasCompletedValue) {
    return assignments
  }

  return `0/${parsedTarget}`
}

function parseAssignmentTarget(assignments: string) {
  const [, targetRawValue] = assignments.split("/")
  if (!targetRawValue) {
    return undefined
  }

  const parsedTarget = Number.parseInt(targetRawValue.trim(), 10)
  if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) {
    return undefined
  }

  return parsedTarget
}

function getRuleExecutionFailureSummary(assignments: string) {
  const target = parseAssignmentTarget(assignments)
  if (!target) {
    return RULE_EXECUTION_FAILED_LABEL
  }

  return `${target} ${target === 1 ? "agent" : "agents"}: ${RULE_EXECUTION_FAILED_LABEL.toLowerCase()}`
}

function normalizeRuleRow(rule: ActivityRuleRow): ActivityRuleRow {
  const reasonLines = rule.mainPageReasonLines ?? []
  const hasExecutionFailureReasonLine = reasonLines.some((reasonLine) =>
    isRuleExecutionFailureLine(reasonLine)
  )
  const hasExecutionFailureIssueCode =
    rule.issueCodeLabel === "Rule did not execute" || rule.issueCodeLabel === RULE_EXECUTION_FAILED_LABEL
  const shouldForceFailedRow =
    rule.status === "failed" || hasExecutionFailureReasonLine || hasExecutionFailureIssueCode

  if (shouldForceFailedRow) {
    const normalizedAssignments = normalizeFailedAssignments(rule.assignments)
    const failureSummary = getRuleExecutionFailureSummary(normalizedAssignments)

    return {
      ...rule,
      status: "failed",
      metric: "0%",
      assignments: normalizedAssignments,
      note: RULE_EXECUTION_FAILED_LABEL,
      issueCodeLabel: RULE_EXECUTION_FAILED_LABEL,
      mainPageReasonLines: [failureSummary],
    }
  }

  if (rule.status === "partial") {
    return {
      ...rule,
      mainPageReasonLines: reasonLines.filter(
        (reasonLine) => !isRuleExecutionFailureLine(reasonLine)
      ),
    }
  }

  return rule
}

function normalizeCurrentWeekRuleRow(rule: ActivityRuleRow): ActivityRuleRow {
  const reasonLinesWithoutExecutionFailure = (rule.mainPageReasonLines ?? []).filter(
    (reasonLine) => !isRuleExecutionFailureLine(reasonLine)
  )
  const hasExecutionFailureSignal =
    rule.status === "failed" ||
    rule.issueCodeLabel === "Rule did not execute" ||
    rule.issueCodeLabel === RULE_EXECUTION_FAILED_LABEL ||
    reasonLinesWithoutExecutionFailure.length !== (rule.mainPageReasonLines ?? []).length

  if (!hasExecutionFailureSignal) {
    return {
      ...rule,
      mainPageReasonLines: reasonLinesWithoutExecutionFailure,
    }
  }

  const target = parseAssignmentTarget(rule.assignments)
  const partialMetric = 92
  const completedAssignments = target
    ? Math.max(0, Math.min(target - 1, Math.round((target * partialMetric) / 100)))
    : undefined

  return {
    ...rule,
    status: "partial",
    metric: `${partialMetric}%`,
    assignments:
      target && completedAssignments !== undefined
        ? `${completedAssignments}/${target}`
        : rule.assignments,
    note: "Assignments still in progress for this week.",
    issueCodeLabel: "All evaluators at capacity",
    mainPageReasonLines: ["3 agents unassigned due to evaluator unavailability"],
  }
}

const fallbackOrderedActivityTabs: ActivityTab[] = Array.from(
  { length: ACTIVITY_TAB_COUNT },
  (_, index) => `week_${index + 1}` as ActivityTab
)

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

const assignmentRules: AssignmentRule[] = [
  {
    name: "Legacy Escalation QA",
    createdBy: "Priya Nair",
    creatorColor: "var(--color-secondary-red-500)",
    createdOn: "Nov 14, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 20, 2026 at 3:33 pm",
    status: "Active",
  },
  {
    name: "Billing QA",
    createdBy: "David Kim",
    creatorColor: "var(--color-secondary-blue-700)",
    createdOn: "Oct 18, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 16, 2026 at 8:58 pm",
    status: "Active",
  },
  {
    name: "Renewals - TL Review Batch",
    createdBy: "Sofia Martinez",
    creatorColor: "var(--color-secondary-purple-700)",
    createdOn: "Mar 7, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 16, 2026 at 9:01 pm",
    status: "Active",
  },
  {
    name: "Savings Product - QA Rotation",
    createdBy: "Marcus Lee",
    creatorColor: "var(--color-warning-700)",
    createdOn: "Feb 25, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 16, 2026 at 8:44 pm",
    status: "Active",
  },
  {
    name: "Escalation Sweep - Weekend Priority",
    createdBy: "Priya Nair",
    creatorColor: "var(--color-secondary-red-500)",
    createdOn: "Nov 14, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 20, 2026 at 3:33 pm",
    status: "Active",
  },
  {
    name: "Claims Exception Queue",
    createdBy: "Noah Patel",
    creatorColor: "var(--color-secondary-yellow-700)",
    createdOn: "Jan 12, 2025",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 15, 2026 at 10:11 am",
    status: "Active",
  },
  {
    name: "Policy Renewal Audit",
    createdBy: "Aisha Khan",
    creatorColor: "var(--color-primary-lime-700)",
    createdOn: "Dec 5, 2024",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 14, 2026 at 5:24 pm",
    status: "Active",
  },
  {
    name: "Customer Retention Watchlist",
    createdBy: "Liam Brooks",
    creatorColor: "var(--color-secondary-blue-600)",
    createdOn: "Sep 30, 2024",
    assignmentType: "Agent evaluation",
    lastAssignment: "Feb 13, 2026 at 7:42 pm",
    status: "Active",
  },
]

const activityTemplates: ActivitySummary[] = [
  {
    agentsNotInAnyRuleCount: 2,
    agentsWithoutAssignment: 2,
    evaluatorsWithoutWorkload: 1,
  },
  {
    agentsNotInAnyRuleCount: 1,
    agentsWithoutAssignment: 3,
    evaluatorsWithoutWorkload: 0,
  },
  {
    agentsNotInAnyRuleCount: 1,
    agentsWithoutAssignment: 1,
    evaluatorsWithoutWorkload: 0,
  },
  {
    agentsNotInAnyRuleCount: 0,
    agentsWithoutAssignment: 0,
    evaluatorsWithoutWorkload: 0,
  },
]

function getStatusIconPath(status: ActivityRuleStatus) {
  if (status === "success") {
    return "/status-icons/check-circle.svg"
  }

  if (status === "partial") {
    return "/status-icons/partial.svg"
  }

  return "/status-icons/alert-circle.svg"
}

function getStatusTooltip(status: ActivityRuleStatus) {
  if (status === "success") {
    return "Fully covered"
  }

  if (status === "partial") {
    return "Partially covered"
  }

  return "Not covered"
}

function getRuleStatusPriority(status: ActivityRuleStatus) {
  if (status === "failed") {
    return 0
  }

  if (status === "partial") {
    return 1
  }

  return 2
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

function getViaRuleFromAssignmentText(assignmentText?: string) {
  if (!assignmentText) {
    return undefined
  }

  const viaMatch = assignmentText.match(/\bvia\b\s+(.+)$/i)
  if (!viaMatch?.[1]) {
    return undefined
  }

  return viaMatch[1].replace(/^["']|["']$/g, "").trim()
}

function isGenericViaRuleName(ruleName?: string) {
  if (!ruleName) {
    return true
  }

  const normalizedRuleName = ruleName.trim().toLowerCase()
  return normalizedRuleName === "another rule"
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

function parseAssignmentProgress(assignments: string) {
  const [completedPart, targetPart] = assignments.split("/")
  const completed = Number.parseInt(completedPart ?? "0", 10)
  const target = Number.parseInt(targetPart ?? "0", 10)

  return {
    completed: Number.isFinite(completed) ? completed : 0,
    target: Number.isFinite(target) ? target : 0,
  }
}

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
  "Arjun",
  "Emma",
  "Ravi",
  "Olivia",
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

const evaluatorFirstNames = [
  "Sarah",
  "Mike",
  "Asha",
  "David",
  "Priyanka",
  "Omar",
  "Nora",
  "Lucas",
  "Mei",
  "Carlos",
  "Anita",
  "Brian",
  "Fatima",
  "Henry",
  "Isha",
  "Kevin",
  "Leah",
  "Marcus",
  "Nina",
  "Owen",
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
]

function getNormalizedAgentName(name: string) {
  return name.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase()
}

function getUniqueByAgentName<T>(items: T[], getName: (item: T) => string) {
  const seenNames = new Set<string>()
  return items.filter((item) => {
    const normalizedName = getNormalizedAgentName(getName(item))
    if (seenNames.has(normalizedName)) {
      return false
    }
    seenNames.add(normalizedName)
    return true
  })
}

function getCoverageAgentName(index: number) {
  const firstName = coverageAgentFirstNames[index % coverageAgentFirstNames.length]
  const lastName = coverageAgentLastNames[index % coverageAgentLastNames.length]
  return `${firstName} ${lastName}`
}

function getCoverageAgentTeam(index: number) {
  return coverageAgentTeams[index % coverageAgentTeams.length]
}

function getCoverageAgentTeams(index: number) {
  const teamCount = 1 + (index % 4)
  const startIndex = (index * 2) % coverageAgentTeams.length
  return Array.from({ length: teamCount }, (_, offset) => {
    const teamIndex = (startIndex + offset) % coverageAgentTeams.length
    return coverageAgentTeams[teamIndex]
  })
}

function getEvaluatorDisplayName(index: number) {
  const firstName = evaluatorFirstNames[index % evaluatorFirstNames.length]
  const lastName = evaluatorLastNames[index % evaluatorLastNames.length]
  return `${firstName} ${lastName}`
}

function getPersonDisplayName(name: string) {
  const trimmedName = name.trim()
  const agentMatch = /^Agent\s+(\d+)$/i.exec(trimmedName)
  if (agentMatch) {
    const numericIndex = Number.parseInt(agentMatch[1] ?? "1", 10)
    return getCoverageAgentName(Math.max(0, numericIndex - 1))
  }

  const evaluatorMatch = /^Evaluator\s+(\d+)$/i.exec(trimmedName)
  if (evaluatorMatch) {
    const numericIndex = Number.parseInt(evaluatorMatch[1] ?? "1", 10)
    return getEvaluatorDisplayName(Math.max(0, numericIndex - 1))
  }

  return trimmedName
}

function getCoverageIssueLabel(issueType: CoverageIssueType) {
  if (issueType === "rule_execution_failed") {
    return "Rule execution failed"
  }

  if (issueType === "not_in_rule") {
    return "Agent not in any rule"
  }

  if (issueType === "all_evaluators_capacity") {
    return "Evaluators' workload limit reached"
  }

  return "Insufficient matching conversations"
}

function getCoverageIssueCodeLabel(issue: CoverageIssue): IssueCodeLabel {
  if (issue.issueType === "rule_execution_failed") {
    return "Rule execution failed"
  }

  if (issue.issueType === "not_in_rule") {
    return "Agent not in any rule"
  }

  if (issue.issueType === "all_evaluators_capacity") {
    return "Evaluators' workload limit reached"
  }

  return "Insufficient matching conversations"
}

function getAgentsNotInAnyRuleTitle(issueCount: number) {
  return `${issueCount} ${issueCount === 1 ? "agent" : "agents"} not added to any rule`
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
  return label.includes("workload limit reached")
}

function getRuleAgentIssueCtaLabel(label: string) {
  if (isEvaluatorWorkloadIssueLabel(label)) {
    return "Adjust evaluators' workload"
  }

  if (label.includes("insufficient matching conversations")) {
    return "Adjust conversation filters"
  }

  return "Resolve"
}

function getAgentsNotInAnyRuleCardLabel(issueCount: number) {
  if (issueCount === 1) {
    return "1 agent not added to any rule"
  }

  return `${issueCount} agents not added to any rule`
}

function getRulesWithFailuresLabel(ruleCount: number) {
  if (ruleCount === 1) {
    return "1 rule with failure"
  }

  return `${ruleCount} rules with failures`
}

function getRulesRanSuccessfullyLabel(ruleCount: number) {
  if (ruleCount === 1) {
    return "1 successful rule"
  }

  return `${ruleCount} successful rules`
}

function getRuleAgentIssueCodeLabel(agent: RuleAgentRow): IssueCodeLabel | undefined {
  if (agent.issueCodeLabel) {
    return agent.issueCodeLabel
  }

  if (agent.status !== "warning") {
    return undefined
  }

  if (agent.warningReason === "rule_interrupted") {
    return "Rule execution failed"
  }

  if (agent.warningReason === "evaluator_unavailable") {
    return "Evaluators' workload limit reached"
  }

  if (agent.warningReason === "no_conversations_in_period") {
    return "Insufficient matching conversations"
  }

  if (agent.warningReason === "all_evaluators_capacity") {
    return "Evaluators' workload limit reached"
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
      evaluator.issueCodeLabel === "All evaluators at capacity" ||
      evaluator.issueCodeLabel === "Evaluators' workload limit reached"
    ) {
      return "Workload limit reached"
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

  return "Workload limit reached"
}

function getRuleStatusLabel(status: ActivityRuleStatus) {
  if (status === "success") {
    return "Success"
  }

  if (status === "partial") {
    return "Partial"
  }

  return "Failed"
}

function buildCoverageRunSheetDetails(activityData: ActivityData): CoverageSheetDetails {
  const requestedIssueCount = Math.max(0, activityData.summary.agentsNotInAnyRuleCount ?? 0)
  const selectedIssues = Array.from({ length: requestedIssueCount }, (_, index) => {
    const teamNames = getCoverageAgentTeams(index)

    return {
      id: `coverage-not-in-rule-${index + 1}`,
      agentName: getCoverageAgentName(index),
      teamName: teamNames[0] ?? getCoverageAgentTeam(index + 1),
      teamNames,
      issueType: "not_in_rule",
      lastCovered: "Feb 10-16",
    } satisfies CoverageIssue
  }).sort((leftIssue, rightIssue) => leftIssue.agentName.localeCompare(rightIssue.agentName))

  return {
    panel: "coverage",
    title: getAgentsNotInAnyRuleTitle(selectedIssues.length),
    subtitle: activityData.tabLabel,
    issues: selectedIssues,
  }
}

function buildRuleRunSheetDetails(
  rule: ActivityRuleRow,
  activityData: ActivityData,
  mode: ActivityModeTab
): RuleSheetDetails {
  const getFailedRunFallbackRows = () => {
    const failedAgents: RuleAgentRow[] = sampleAgentNames.map((agentName, index) => ({
      id: `failed-system-warning-${index + 1}`,
      name: agentName,
      status: "warning",
      warningReason: "rule_interrupted",
      issueCodeLabel: "Rule did not execute",
      detailText: "Rule did not execute due to a system error.",
    }))

    const failedEvaluators: RuleEvaluatorRow[] = [
      {
        id: "failed-evaluator-warning-1",
        name: "Mike Johnson",
        status: "warning",
        loadText: "0/24",
        issueCodeLabel: "Rule did not execute",
        detailText: "Rule did not execute due to a system error.",
      },
      {
        id: "failed-evaluator-warning-2",
        name: "Sarah Kim",
        status: "warning",
        loadText: "0/24",
        issueCodeLabel: "Rule did not execute",
        detailText: "Rule did not execute due to a system error.",
      },
      {
        id: "failed-evaluator-warning-3",
        name: "Amy Torres",
        status: "warning",
        loadText: "0/24",
        issueCodeLabel: "Rule did not execute",
        detailText: "Rule did not execute due to a system error.",
      },
    ]

    return { failedAgents, failedEvaluators }
  }

  const mockDbRuleSheet = (mockDbRuleSheetByRuleRowId as unknown as Record<string, MockDbRuleSheetData>)[
    rule.id
  ]
  if (mockDbRuleSheet) {
    const resolvedStatus = mockDbRuleSheet.status ?? rule.status
    const resolvedStatusLabel = mockDbRuleSheet.statusLabel ?? getRuleStatusLabel(resolvedStatus)
    const resolvedProgressLabel =
      mockDbRuleSheet.progressLabel ?? `${rule.metric} (${rule.assignments})`
    const { failedAgents, failedEvaluators } = getFailedRunFallbackRows()
    const isFailedRule = resolvedStatus === "failed"
    const resolvedAgentsWithoutQa = mockDbRuleSheet.agentsWithoutQa ?? []
    const resolvedEvaluatorsWithIssues = mockDbRuleSheet.evaluatorsWithIssues ?? []
    const resolvedActiveEvaluators = mockDbRuleSheet.activeEvaluators ?? []

    return {
      panel: "rule",
      ruleId: rule.id,
      title: rule.name,
      subtitle: `${resolvedStatusLabel} · ${resolvedProgressLabel}`,
      status: resolvedStatus,
      statusLabel: resolvedStatusLabel,
      progressLabel: resolvedProgressLabel,
      metadata: mockDbRuleSheet.metadata ?? [],
      reasonSummary: mockDbRuleSheet.reasonSummary,
      agentsWithoutQa:
        isFailedRule && resolvedAgentsWithoutQa.length === 0 ? failedAgents : resolvedAgentsWithoutQa,
      coveredAgents: mockDbRuleSheet.coveredAgents ?? [],
      quotaMetElsewhere: mockDbRuleSheet.quotaMetElsewhere ?? [],
      evaluatorsWithIssues:
        isFailedRule && resolvedEvaluatorsWithIssues.length === 0
          ? failedEvaluators
          : resolvedEvaluatorsWithIssues,
      activeEvaluators:
        isFailedRule && resolvedActiveEvaluators.length === 0 ? [] : resolvedActiveEvaluators,
    }
  }

  const { completed, target } = parseAssignmentProgress(rule.assignments)
  const missedAssignments = Math.max(target - completed, 0)
  const modeLabel = mode === "agent_evaluation" ? "Agent evaluation" : "Evaluator calibration"
  const sampledRange = activityData.tabLabel
  const runTimestamp = `Mon · ${sampledRange} · 9:02 AM EST`
  const scheduledTimestamp = `Mon · ${sampledRange} · 9:00 AM EST`

  let metadata: ExecutionMetadataRow[] = []
  let reasonSummary: string | undefined
  let agentsWithoutQa: RuleAgentRow[] = []
  let coveredAgents: RuleAgentRow[] = []
  let quotaMetElsewhere: RuleAgentRow[] = []
  let evaluatorsWithIssues: RuleEvaluatorRow[] = []
  let activeEvaluators: RuleEvaluatorRow[] = []

  const coveredAgentNames = [
    "Alice Park",
    "Bob Chen",
    "Maria Lopez",
    "Ethan Clark",
    "Mina Gupta",
    "Oscar Reed",
    "Nora James",
    "Leo Foster",
  ]

  if (rule.status === "success") {
    metadata = [
      { label: "Ran", value: runTimestamp },
      { label: "Sampled", value: sampledRange },
      { label: "Mode", value: modeLabel },
      { label: "Expected", value: `${target} assignments` },
      { label: "Made", value: `${completed}` },
    ]

    coveredAgents = coveredAgentNames.map((name, index) => ({
      id: `success-covered-agent-${index + 1}`,
      name,
      status: "success",
      assignmentText: "4/4 assigned",
    }))

    activeEvaluators = [
      {
        id: "success-evaluator-1",
        name: "Mike Johnson",
        status: "success",
        loadText: "20 assigned",
      },
      {
        id: "success-evaluator-2",
        name: "Sarah Kim",
        status: "success",
        loadText: "20 assigned",
      },
      {
        id: "success-evaluator-3",
        name: "Amy Torres",
        status: "success",
        loadText: "20 assigned",
      },
    ]
  } else if (rule.status === "partial") {
    metadata = [
      { label: "Ran", value: runTimestamp },
      { label: "Sampled", value: sampledRange },
      { label: "Mode", value: modeLabel },
      { label: "Expected", value: `${target} assignments` },
      { label: "Made", value: `${completed}` },
      { label: "Missed", value: `${missedAssignments}` },
    ]

    agentsWithoutQa = [
      {
        id: "partial-warning-1",
        name: "Jane Doe",
        status: "warning",
        warningReason: "no_matching_conversations",
        detailText: "8 conversations · none matched filters (duration > 10 min)",
      },
      {
        id: "partial-warning-2",
        name: "John Smith",
        status: "warning",
        warningReason: "no_matching_conversations",
        detailText: "0 conversations in period",
      },
      {
        id: "partial-warning-3",
        name: "Raj Patel",
        status: "warning",
        warningReason: "all_evaluators_capacity",
        detailText: "2 eligible conversations unassigned",
      },
      {
        id: "partial-warning-4",
        name: "Lisa Chen",
        status: "warning",
        warningReason: "all_evaluators_capacity",
        detailText: "2 eligible conversations unassigned",
      },
    ]

    const noMatchingCount = agentsWithoutQa.filter(
      (agent) => agent.warningReason === "no_matching_conversations"
    ).length
    const capacityCount = agentsWithoutQa.filter(
      (agent) => agent.warningReason === "all_evaluators_capacity"
    ).length

    reasonSummary = `${missedAssignments} assignments missed — ${noMatchingCount} no matching conversations, ${capacityCount} evaluator capacity reached`

    coveredAgents = coveredAgentNames.slice(0, 7).map((name, index) => ({
      id: `partial-covered-agent-${index + 1}`,
      name,
      status: "success",
      assignmentText: "4/4 assigned",
    }))

    quotaMetElsewhere = [
      {
        id: "partial-fyi-1",
        name: "Dan Wu",
        status: "fyi",
        assignmentText: "4/4 via \"Billing QA\"",
        viaRuleName: "Billing QA",
      },
    ]

    evaluatorsWithIssues = [
      {
        id: "partial-evaluator-warning-1",
        name: "Sarah Kim",
        status: "warning",
        loadText: "24/24",
        detailText: "Evaluator unavailable for part of this run window.",
        issueCodeLabel: "Evaluator unavailable",
      },
    ]

    activeEvaluators = [
      {
        id: "partial-evaluator-success-1",
        name: "Mike Johnson",
        status: "success",
        loadText: "22/24",
      },
      {
        id: "partial-evaluator-success-2",
        name: "Amy Torres",
        status: "success",
        loadText: "20/24",
      },
    ]
  } else {
    metadata = [
      { label: "Scheduled", value: scheduledTimestamp },
      { label: "Status", value: "Did not execute" },
      { label: "Mode", value: modeLabel },
      { label: "Expected", value: `${target} assignments` },
      { label: "Made", value: `${completed}` },
      { label: "Missed", value: `${missedAssignments}` },
    ]

    reasonSummary = "Rule did not execute — system error"
    const { failedAgents, failedEvaluators } = getFailedRunFallbackRows()
    agentsWithoutQa = failedAgents
    evaluatorsWithIssues = failedEvaluators
    activeEvaluators = []
  }

  const statusLabel = getRuleStatusLabel(rule.status)

  return {
    panel: "rule",
    ruleId: rule.id,
    title: rule.name,
    subtitle: `${statusLabel} · ${rule.metric} (${rule.assignments})`,
    status: rule.status,
    statusLabel,
    progressLabel: `${rule.metric} (${rule.assignments})`,
    metadata,
    reasonSummary,
    agentsWithoutQa,
    coveredAgents,
    quotaMetElsewhere,
    evaluatorsWithIssues,
    activeEvaluators,
  }
}

function getWeekStart(date: Date) {
  const start = new Date(date)
  const mondayOffset = (start.getDay() + 6) % 7
  start.setDate(start.getDate() - mondayOffset)
  start.setHours(0, 0, 0, 0)
  return start
}

function formatWeekRange(startDate: Date) {
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  const startMonth = startDate.toLocaleString("en-US", { month: "short" })
  const endMonth = endDate.toLocaleString("en-US", { month: "short" })
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}`
  }

  return `${startMonth} ${startDay}-${endMonth} ${endDay}`
}

function getWeekOffset(tabIndex: number) {
  if (tabIndex === 0) {
    return 1
  }

  if (tabIndex === 1) {
    return 0
  }

  return -(tabIndex - 1)
}

function getWeekQualifier(tabIndex: number) {
  if (tabIndex === 0) {
    return "Upcoming week"
  }

  if (tabIndex === 1) {
    return "Current week"
  }

  return undefined
}

const fallbackActivityByTab: Record<ActivityTab, ActivityData> = fallbackOrderedActivityTabs.reduce(
  (accumulator, tabKey, tabIndex) => {
    const currentWeekStart = getWeekStart(new Date())
    const weekStart = new Date(currentWeekStart)
    weekStart.setDate(currentWeekStart.getDate() + getWeekOffset(tabIndex) * 7)

    const summaryTemplate = activityTemplates[tabIndex % activityTemplates.length]
    const isUpcomingWeek = tabIndex === 0
    const isForcedGreenWeek = tabIndex === 1 || tabIndex === 2 || tabIndex === 3

    const summary = isForcedGreenWeek
      ? {
          ...summaryTemplate,
          agentsNotInAnyRuleCount: 0,
          agentsWithoutAssignment: 0,
          evaluatorsWithoutWorkload: 0,
        }
      : isUpcomingWeek
        ? {
            ...summaryTemplate,
            agentsNotInAnyRuleCount:
              (summaryTemplate.agentsNotInAnyRuleCount ?? 0) > 0
                ? summaryTemplate.agentsNotInAnyRuleCount
                : 2,
            agentsWithoutAssignment:
              summaryTemplate.agentsWithoutAssignment > 0
                ? summaryTemplate.agentsWithoutAssignment
                : 2,
          }
        : summaryTemplate

    accumulator[tabKey] = {
      tabLabel: formatWeekRange(weekStart),
      tabQualifier: getWeekQualifier(tabIndex),
      summary,
      rules: Array.from({ length: ACTIVITY_RULE_COUNT }, (_, ruleIndex) => {
        const status =
          summary.agentsWithoutAssignment === 0
            ? "success"
            : getRuleStatus(tabIndex, ruleIndex)
        const target = activityRuleTargets[ruleIndex]
        const metricValue = getRuleMetric(status, tabIndex, ruleIndex)
        const completedAssignments = Math.min(
          target,
          Math.max(0, Math.round((target * metricValue) / 100))
        )

        return {
          id: `rule-${tabIndex + 1}-${ruleIndex + 1}`,
          name: activityRuleNames[ruleIndex] ?? `Rule ${ruleIndex + 1}`,
          status,
          metric: `${metricValue}%`,
          assignments: `${completedAssignments}/${target}`,
          note: getRuleNote(status, tabIndex, ruleIndex),
          issueCodeLabel: getIssueCodeLabel(status, tabIndex, ruleIndex),
          mainPageReasonLines: getMainPageReasonLines(status, tabIndex, ruleIndex),
        }
      }),
    }

    return accumulator
  },
  {} as Record<ActivityTab, ActivityData>
)

const dbOrderedActivityTabs = mockDbOrderedActivityTabs as readonly ActivityTab[]

const orderedActivityTabs: ActivityTab[] =
  dbOrderedActivityTabs.length > 0
    ? [...dbOrderedActivityTabs]
    : fallbackOrderedActivityTabs

const rawActivityByTab: Record<ActivityTab, ActivityData> =
  Object.keys(mockDbActivityByTab).length > 0
    ? (mockDbActivityByTab as unknown as Record<ActivityTab, ActivityData>)
    : fallbackActivityByTab

const initialActivityByTab: Record<ActivityTab, ActivityData> = Object.fromEntries(
  Object.entries(rawActivityByTab).map(([tabKey, tabData]) => [
    tabKey,
    {
      ...tabData,
      rules:
        tabKey === orderedActivityTabs[1]
          ? tabData.rules.map((rule) => normalizeCurrentWeekRuleRow(normalizeRuleRow(rule)))
          : tabData.rules.map((rule) => normalizeRuleRow(rule)),
    },
  ])
) as Record<ActivityTab, ActivityData>

function SettingsSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border-subtle bg-surface-subtle px-8 py-16 lg:w-240 lg:border-b-0 lg:overflow-y-auto lg:px-8 lg:py-24">
      <div className="flex flex-col gap-20">
        {settingsSections.map((section) => (
          <div key={section.heading ?? "untitled"} className="space-y-8">
            {section.heading && (
              <p className="px-12 text-14 text-text-tertiary">{section.heading}</p>
            )}

            <div className="space-y-4">
              {section.items.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="default"
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

function AssignmentTable() {
  return (
    <Card className="mt-16 overflow-hidden rounded-xl border-border-subtle">
      <div className="overflow-x-auto">
        <Table className="min-w-720">
          <TableHeader className="bg-surface-card">
            <TableRow className="hover:bg-surface-card">
              <TableHead className="w-240 text-text-primary">Assignment rule name</TableHead>
              <TableHead className="w-240 text-text-primary">Created by</TableHead>
              <TableHead className="w-128 pr-16 text-text-primary">Created on</TableHead>
              <TableHead className="w-240 text-text-primary">Assignment type</TableHead>
              <TableHead className="w-240 text-text-primary">Last assignment</TableHead>
              <TableHead className="w-128 text-text-primary">Status</TableHead>
              <TableHead className="w-40 text-text-primary" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {assignmentRules.map((rule) => (
              <TableRow key={`${rule.name}-${rule.createdOn}`}>
                <TableCell>
                  <span className="block max-w-240 truncate text-text-primary font-semibold">
                    {rule.name}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-8">
                    <Avatar
                      name={rule.createdBy}
                      size="xs"
                      color={rule.creatorColor}
                    />
                    <span className="text-text-primary">{rule.createdBy}</span>
                  </div>
                </TableCell>

                <TableCell className="pr-16">
                  <span className="whitespace-nowrap text-text-primary">{rule.createdOn}</span>
                </TableCell>

                <TableCell>
                  <Badge
                    color="blue"
                    size="sm"
                    icon={<File01 size={14} className="text-icon-brand" />}
                  >
                    {rule.assignmentType}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="whitespace-nowrap text-text-primary">{rule.lastAssignment}</span>
                </TableCell>

                <TableCell>
                  <Badge
                    size="sm"
                    className="bg-surface-success-subtle text-text-success"
                  >
                    {rule.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
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
                        <DropdownMenuItem>Edit rule</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate rule</DropdownMenuItem>
                        <DropdownMenuItem>Pause rule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
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
          "mt-2 mb-2 w-4 shrink-0 self-stretch rounded-full",
          tone === "error" ? "bg-surface-error" : "bg-success-600"
        )}
      />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function CoverageIssueCard({
  issue,
  rules,
  onAddToRule,
  onViewRule,
  showIssueCodeBadge,
  canAddToRule,
}: {
  issue: CoverageIssue
  rules: ActivityRuleRow[]
  onAddToRule: (issueId: string, agentName: string, ruleName: string) => void
  onViewRule: (ruleId: string) => void
  showIssueCodeBadge: boolean
  canAddToRule: boolean
}) {
  const details: string[] = []
  const issueCodeLabel = showIssueCodeBadge ? getCoverageIssueCodeLabel(issue) : undefined
  const shouldShowTeams = issue.issueType === "not_in_rule"
  const issueAgentDisplayName = getPersonDisplayName(issue.agentName)
  const allTeamNames = issue.teamNames?.filter(Boolean) ?? (issue.teamName ? [issue.teamName] : [])
  const visibleTeamNames = allTeamNames.slice(0, 2)
  const hiddenTeamNames = allTeamNames.slice(2)

  if (issue.issueType === "all_evaluators_capacity") {
    if (issue.ruleName) {
      details.push(issue.ruleName)
    }
    details.push(`${issue.unassignedCount ?? 0} eligible conversations unassigned`)
    if (issue.evaluatorCapacitySummary) {
      details.push(issue.evaluatorCapacitySummary)
    }
  }

  if (issue.issueType === "no_matching_conversations") {
    if (issue.ruleName) {
      details.push(issue.ruleName)
    }
    if (issue.conversationContext) {
      details.push(issue.conversationContext)
    }
  }

  if (issue.issueType === "rule_execution_failed") {
    if (issue.ruleName) {
      details.push(issue.ruleName)
    }
    details.push("Rule did not execute due to a system error")
  }

  return (
    <div className="flex items-start justify-between gap-12 py-16">
      <div className="min-w-0 space-y-8">
        <div className="flex items-start gap-12">
          <Avatar name={issueAgentDisplayName} size="xs" />
          <div className="min-w-0">
            <p className="text-14 font-semibold text-text-primary">{issueAgentDisplayName}</p>
            {shouldShowTeams && allTeamNames.length > 0 && (
              <p className="text-12 font-medium text-text-secondary">
                {visibleTeamNames.join(", ")}
                {hiddenTeamNames.length > 0 && (
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
                )}
              </p>
            )}
            {issue.issueType === "not_in_rule" ? null : issueCodeLabel ? (
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
            ) : (
              <p className="text-12 font-medium text-text-tertiary">
                {getCoverageIssueLabel(issue.issueType)}
              </p>
            )}
          </div>
        </div>

        {issue.issueType !== "not_in_rule" && !issueCodeLabel && details.length > 0 && (
          <p className="pl-28 text-12 font-medium text-text-secondary">{details.join(" · ")}</p>
        )}
      </div>
      <div className="shrink-0 pl-8">
        {issue.issueType === "not_in_rule" && canAddToRule ? (
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
                  onClick={() => onAddToRule(issue.id, issueAgentDisplayName, rule.name)}
                >
                  {rule.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : issue.ruleId ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewRule(issue.ruleId!)}
            iconRight={<ChevronRight size={14} className="text-icon-secondary" />}
          >
            View rule
          </Button>
        ) : null}
      </div>
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
  const agentDisplayName = getPersonDisplayName(agent.name)
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
            <Avatar name={agentDisplayName} size="xs" />
            <div className="min-w-0">
              <p className="text-14 font-semibold text-text-primary">{agentDisplayName}</p>
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
              {showSupportingText && agent.detailText && !issueCodeLabel && (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{agent.detailText}</p>
              )}
              {showSupportingText && agent.status === "fyi" && viaRuleLabel && (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{viaRuleLabel}</p>
              )}
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
  const evaluatorDisplayName = getPersonDisplayName(evaluator.name)
  const workloadValue = getCompactLoadValue(evaluator.loadText)

  return (
    <div className="py-10">
      <div className="flex items-start justify-between gap-12">
        <div className="min-w-0">
          <div className="flex items-start gap-8">
            <Avatar name={evaluatorDisplayName} size="xs" />
            <div className="min-w-0">
              <p className="text-14 font-semibold text-text-primary">{evaluatorDisplayName}</p>
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
              {evaluator.detailText && !issueCodeLabel && (
                <p className="mt-4 text-12 font-medium text-text-tertiary">{evaluator.detailText}</p>
              )}
            </div>
          </div>
        </div>
        <p className="shrink-0 text-14 font-semibold text-text-primary">{workloadValue}</p>
      </div>
    </div>
  )
}

function ActivityPanel() {
  const [activityByTab, setActivityByTab] = React.useState<Record<ActivityTab, ActivityData>>(
    () => initialActivityByTab
  )
  const [activeActivityModeTab, setActiveActivityModeTab] =
    React.useState<ActivityModeTab>("agent_evaluation")
  const [activeActivityTab, setActiveActivityTab] = React.useState<ActivityTab>("week_1")
  const [sheetStack, setSheetStack] = React.useState<RunSheetView[]>([])
  const [activeRuleSheetTab, setActiveRuleSheetTab] = React.useState<
    "agents" | "evaluators" | "run_details"
  >("agents")
  const [expandedAgentSections, setExpandedAgentSections] = React.useState<string[]>([])
  const [showAllCoveredAgents, setShowAllCoveredAgents] = React.useState(false)
  const [showAllActiveEvaluators, setShowAllActiveEvaluators] = React.useState(false)
  const [showAllWeeks, setShowAllWeeks] = React.useState(false)
  const [expandedRunSections, setExpandedRunSections] = React.useState<string[]>([
    "rules-with-failures",
  ])
  const [dismissingCoverageIssueIds, setDismissingCoverageIssueIds] = React.useState<string[]>([])
  const [coverageSheetToast, setCoverageSheetToast] = React.useState<{
    title: string
    description: string
  } | null>(null)
  const coverageSheetToastTimeoutRef = React.useRef<number | null>(null)
  const activityData = activityByTab[activeActivityTab]
  const activeSheetView = sheetStack.at(-1) ?? null

  const openCoverageRunDetails = React.useCallback(() => {
    setSheetStack([buildCoverageRunSheetDetails(activityData)])
  }, [activityData])

  const openRuleRunDetails = React.useCallback(
    (rule: ActivityRuleRow) => {
      setSheetStack([buildRuleRunSheetDetails(rule, activityData, activeActivityModeTab)])
    },
    [activeActivityModeTab, activityData]
  )

  const openRuleFromCoverage = React.useCallback(
    (ruleId: string) => {
      const selectedRule = activityData.rules.find((rule) => rule.id === ruleId)
      if (!selectedRule) {
        return
      }

      setSheetStack((currentStack) => [
        ...currentStack,
        buildRuleRunSheetDetails(selectedRule, activityData, activeActivityModeTab),
      ])
    },
    [activeActivityModeTab, activityData]
  )

  const handleSheetBack = React.useCallback(() => {
    setSheetStack((currentStack) => {
      if (currentStack.length <= 1) {
        return []
      }

      return currentStack.slice(0, -1)
    })
  }, [])

  const handleAddAgentToRule = React.useCallback(
    (issueId: string, agentName: string, ruleName: string) => {
      setDismissingCoverageIssueIds((currentIds) =>
        currentIds.includes(issueId) ? currentIds : [...currentIds, issueId]
      )

      window.setTimeout(() => {
        setActivityByTab((currentActivityByTab) => {
          const currentActivityData = currentActivityByTab[activeActivityTab]
          if (!currentActivityData) {
            return currentActivityByTab
          }

          return {
            ...currentActivityByTab,
            [activeActivityTab]: {
              ...currentActivityData,
              summary: {
                ...currentActivityData.summary,
                agentsNotInAnyRuleCount: Math.max(
                  0,
                  (currentActivityData.summary.agentsNotInAnyRuleCount ?? 0) - 1
                ),
                agentsWithoutAssignment: Math.max(
                  0,
                  currentActivityData.summary.agentsWithoutAssignment - 1
                ),
              },
            },
          }
        })

        setSheetStack((currentStack) =>
          currentStack.map((view) => {
            if (view.panel !== "coverage") {
              return view
            }

            const nextIssues = view.issues.filter((issue) => issue.id !== issueId)
            const nextIssueCount = nextIssues.length

            return {
              ...view,
              issues: nextIssues,
              title: getAgentsNotInAnyRuleTitle(nextIssueCount),
            }
          })
        )
        setDismissingCoverageIssueIds((currentIds) => currentIds.filter((id) => id !== issueId))
      }, 220)

      setCoverageSheetToast({
        title: "Agent added to rule",
        description: `${agentName} was added to ${ruleName}.`,
      })

      if (coverageSheetToastTimeoutRef.current !== null) {
        window.clearTimeout(coverageSheetToastTimeoutRef.current)
      }

      coverageSheetToastTimeoutRef.current = window.setTimeout(() => {
        setCoverageSheetToast(null)
        coverageSheetToastTimeoutRef.current = null
      }, 5000)
    },
    [activeActivityTab]
  )

  React.useEffect(
    () => () => {
      if (coverageSheetToastTimeoutRef.current !== null) {
        window.clearTimeout(coverageSheetToastTimeoutRef.current)
      }
    },
    []
  )

  React.useEffect(() => {
    if (!activeSheetView || activeSheetView.panel !== "rule") {
      return
    }

    const initialExpandedAgentSections: string[] = []
    if (activeSheetView.agentsWithoutQa.length > 0) {
      initialExpandedAgentSections.push(
        ...activeSheetView.agentsWithoutQa.reduce((accumulator, agent) => {
          const sectionValue = getRuleAgentIssueSectionValue(getRuleAgentIssueGroupLabel(agent))
          if (!accumulator.includes(sectionValue)) {
            accumulator.push(sectionValue)
          }
          return accumulator
        }, [] as string[])
      )
    }
    if (activeSheetView.coveredAgents.length + activeSheetView.quotaMetElsewhere.length > 0) {
      initialExpandedAgentSections.push("agents-covered")
    }

    setActiveRuleSheetTab("agents")
    setExpandedAgentSections(initialExpandedAgentSections)
    setShowAllCoveredAgents(false)
    setShowAllActiveEvaluators(false)
  }, [activeSheetView])

  const handleRowKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    onActivate: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onActivate()
    }
  }
  const activeTabIndex = orderedActivityTabs.findIndex((tab) => tab === activeActivityTab)
  const isEvaluatorCalibrationMode = activeActivityModeTab === "evaluator_calibration"
  const isUpcomingWeek = activeTabIndex === 0
  const shouldShowIssueCodeBadges = true
  const hasMoreWeeks = orderedActivityTabs.length > 5
  const visibleOrderedActivityTabs = showAllWeeks
    ? orderedActivityTabs
    : orderedActivityTabs.slice(0, 5)
  const visibleActivityRules = React.useMemo(
    () =>
      [...activityData.rules].sort((leftRule, rightRule) => {
        const statusDelta =
          getRuleStatusPriority(leftRule.status) - getRuleStatusPriority(rightRule.status)

        if (statusDelta !== 0) {
          return statusDelta
        }

        return leftRule.name.localeCompare(rightRule.name)
      }),
    [activityData.rules]
  )
  const totalRulesCount = visibleActivityRules.length
  const successfulRulesCount = visibleActivityRules.filter((rule) => rule.status === "success").length
  const coveredAgentsCount = Math.max(
    AGENT_POPULATION_COUNT - activityData.summary.agentsWithoutAssignment,
    0
  )
  const agentCoveragePct =
    AGENT_POPULATION_COUNT > 0
      ? Math.round((coveredAgentsCount * 100) / AGENT_POPULATION_COUNT)
      : 100
  const assignmentTotals = visibleActivityRules.reduce(
    (accumulator, rule) => {
      const { completed, target } = parseAssignmentProgress(rule.assignments)
      return {
        completed: accumulator.completed + completed,
        target: accumulator.target + target,
      }
    },
    { completed: 0, target: 0 }
  )
  const assignmentsMadePct =
    assignmentTotals.target > 0
      ? Math.round((assignmentTotals.completed * 100) / assignmentTotals.target)
      : 100
  const metricCards = [
    {
      id: "agent-coverage",
      title: "Agent coverage",
      value: `${agentCoveragePct}%`,
      supportingText: `${coveredAgentsCount} / ${AGENT_POPULATION_COUNT}`,
      isComplete: agentCoveragePct === 100,
    },
    {
      id: "rule-success",
      title: "Successful rules",
      value: `${successfulRulesCount} / ${totalRulesCount}`,
      supportingText: undefined,
      isComplete: successfulRulesCount === totalRulesCount,
    },
    {
      id: "assignments-made",
      title: "Conversations assigned",
      value: `${assignmentsMadePct}%`,
      supportingText: `${assignmentTotals.completed} / ${assignmentTotals.target}`,
      isComplete: assignmentsMadePct === 100,
    },
  ] as const
  const agentsNotInAnyRuleCount = Math.max(activityData.summary.agentsNotInAnyRuleCount ?? 0, 0)
  const agentsNotInAnyRuleAvatarNames = Array.from(
    { length: agentsNotInAnyRuleCount },
    (_, index) => sampleAgentNames[index] ?? `Agent ${index + 1}`
  )
  const rulesWithFailures = visibleActivityRules.filter((rule) => rule.status !== "success")
  const successfulRules = visibleActivityRules.filter((rule) => rule.status === "success")
  const activeRuleSheet = activeSheetView && activeSheetView.panel === "rule" ? activeSheetView : null
  const uniqueCoveredAgents =
    activeRuleSheet
      ? getUniqueByAgentName(activeRuleSheet.coveredAgents, (agent) =>
          getPersonDisplayName(agent.name)
        )
      : []
  const groupedAgentsWithoutQa =
    activeRuleSheet?.agentsWithoutQa.reduce(
      (accumulator, agent) => {
        const label = getRuleAgentIssueGroupLabel(agent)
        const existingGroup = accumulator.find((group) => group.label === label)

        if (existingGroup) {
          existingGroup.agents.push(agent)
          return accumulator
        }

        accumulator.push({
          label,
          sectionValue: getRuleAgentIssueSectionValue(label),
          agents: [agent],
        })
        return accumulator
      },
      [] as Array<{ label: string; sectionValue: string; agents: RuleAgentRow[] }>
    ) ?? []
  const uniqueCoverageIssues =
    activeSheetView && activeSheetView.panel === "coverage"
      ? getUniqueByAgentName(activeSheetView.issues, (issue) =>
          getPersonDisplayName(issue.agentName)
        )
      : []
  const hasCoverageIssues = uniqueCoverageIssues.length > 0
  const quotaCoveredAgentsWithResolvedRule =
    activeRuleSheet
      ? activeRuleSheet.quotaMetElsewhere.map((agent) => {
          const viaRuleFromAssignment = getViaRuleFromAssignmentText(agent.assignmentText)
          const explicitViaRule =
            agent.viaRuleName && !isGenericViaRuleName(agent.viaRuleName)
              ? agent.viaRuleName
              : viaRuleFromAssignment && !isGenericViaRuleName(viaRuleFromAssignment)
                ? viaRuleFromAssignment
                : undefined

          if (explicitViaRule) {
            return {
              ...agent,
              viaRuleName: explicitViaRule,
            }
          }

          const fallbackRuleName = activityData.rules.find(
            (rule) => rule.id !== activeRuleSheet.ruleId
          )?.name

          if (!fallbackRuleName) {
            return agent
          }

          return {
            ...agent,
            viaRuleName: fallbackRuleName,
          }
        })
      : []
  const coveredAgentsIncludingQuota =
    activeRuleSheet
      ? getUniqueByAgentName(
          [...uniqueCoveredAgents, ...quotaCoveredAgentsWithResolvedRule],
          (agent) => getPersonDisplayName(agent.name)
        )
      : []
  const evaluatorWorkloadRows =
    activeRuleSheet
      ? getUniqueByAgentName(
          [...activeRuleSheet.evaluatorsWithIssues, ...activeRuleSheet.activeEvaluators],
          (evaluator) => getPersonDisplayName(evaluator.name)
        )
      : []
  const statusDisplayLabel =
    activeRuleSheet?.statusLabel?.trim() || (activeRuleSheet ? getRuleStatusLabel(activeRuleSheet.status) : "")
  const progressDisplayLabel =
    activeRuleSheet?.progressLabel?.trim() ||
    activeRuleSheet?.subtitle
      ?.split("·")
      .map((part) => part.trim())
      .filter(Boolean)[1] ||
    ""
  React.useEffect(() => {
    if (isEvaluatorCalibrationMode) {
      setSheetStack([])
    }
  }, [isEvaluatorCalibrationMode])

  React.useEffect(() => {
    setExpandedRunSections(["rules-with-failures"])
  }, [activeActivityTab, activeActivityModeTab])

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-16 lg:flex-row lg:overflow-hidden">
      <aside className="group flex w-full flex-col rounded-xl bg-surface-subtle p-0 lg:mr-32 lg:h-full lg:w-288 lg:shrink-0 lg:overflow-hidden">
        <Tabs
          value={activeActivityModeTab}
          onValueChange={(value) => setActiveActivityModeTab(value as ActivityModeTab)}
          className="pb-8"
        >
          <NeutralTabsList className="mt-16 mb-8 w-full p-4">
            <NeutralTabsTrigger value="agent_evaluation" className="h-36 flex-1 px-8 py-6 text-12">
              Agent evaluation
            </NeutralTabsTrigger>
            <NeutralTabsTrigger
              value="evaluator_calibration"
              className="h-36 flex-1 px-8 py-6 text-12"
            >
              Evaluator calibration
            </NeutralTabsTrigger>
          </NeutralTabsList>
        </Tabs>
        <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
          <Tabs
            value={activeActivityTab}
            onValueChange={(value) => setActiveActivityTab(value as ActivityTab)}
          >
            <NeutralTabsList className="flex w-full flex-col rounded-none bg-transparent p-0">
              {visibleOrderedActivityTabs.map((weekKey) => (
                <NeutralTabsTrigger
                  key={weekKey}
                  value={weekKey}
                  className="w-full justify-start whitespace-nowrap px-12 text-left data-[state=active]:bg-surface-muted data-[state=active]:shadow-none"
                >
                  <span className="block w-full">
                    <span className="block truncate">{activityByTab[weekKey].tabLabel}</span>
                    {activityByTab[weekKey].tabQualifier && (
                      <span className="mt-4 block text-12 text-text-tertiary">
                        {activityByTab[weekKey].tabQualifier}
                      </span>
                    )}
                  </span>
                </NeutralTabsTrigger>
              ))}
            </NeutralTabsList>
          </Tabs>
          {hasMoreWeeks && !showAllWeeks && (
            <div>
              <Button
                variant="ghost"
                size="default"
                className="w-full justify-start whitespace-nowrap px-12 text-left text-14 text-text-primary"
                onClick={() => setShowAllWeeks(true)}
              >
                <span className="inline-flex items-center gap-8">
                  <span>View more</span>
                  <ChevronDown size={16} className="text-icon-secondary" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </aside>

      <div className="scrollbar-hidden mt-24 min-h-0 min-w-0 flex-1 overflow-y-auto lg:mt-0 lg:h-full lg:pr-8">
        <div className="w-full lg:w-768 lg:max-w-768">
          <div className="sticky top-0 z-10 mt-24 bg-surface-subtle px-4 pb-24">
            <p className="w-full text-18 font-semibold text-text-primary">
              <span>{activityData.tabLabel}</span>
            </p>
          </div>

          <div className="w-full space-y-16">
          {isEvaluatorCalibrationMode ? (
            <Card className="w-full border-border-subtle">
              <EmptyState
                className="min-h-240"
                icon={<PrivateCalibration size={20} className="text-icon-secondary" />}
                title="No evaluator calibration added yet."
              />
            </Card>
          ) : (
            <>
              {(activeTabIndex === 0 || activeTabIndex === 1) && (
                <InlineAlert
                  className="w-full items-center gap-8 px-12 py-8 [&>div]:justify-center [&>span>svg]:size-16"
                  variant="info"
                  description={
                    <span className="text-12 font-medium text-secondary-blue-700">
                      {activeTabIndex === 0
                        ? "Predicted based on current rules and schedules. Changes to rules will update these predictions."
                        : "This week is in progress and not complete yet. Final coverage may change before the cycle ends."}
                    </span>
                  }
                />
              )}

              <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
                {metricCards.map((metricCard) => (
                  <Card key={metricCard.id} className="h-full border-border-subtle shadow-sm">
                    <div className="h-full p-4">
                      <div
                        className={cn(
                          "flex h-full flex-col items-center justify-start gap-8 rounded-lg px-16 py-24 text-center",
                          metricCard.isComplete ? "bg-surface-success-subtle" : "bg-surface-error-subtle"
                        )}
                      >
                        <p className="text-14 font-semibold text-text-primary">{metricCard.title}</p>
                        <p
                          className={cn(
                            "text-24 font-bold",
                            metricCard.isComplete ? "text-text-success" : "text-text-error"
                          )}
                        >
                          {metricCard.value}
                        </p>
                        {metricCard.supportingText ? (
                          <p className="text-14 font-medium text-text-secondary">
                            {metricCard.supportingText}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {agentsNotInAnyRuleCount > 0 && (
                <Card className="w-full border-border-subtle shadow-sm">
                  <div className="p-4">
                    <div
                      className="flex cursor-pointer items-center justify-between gap-12 rounded-lg px-16 py-16 focus-visible:outline-none"
                      role="button"
                      tabIndex={0}
                      onClick={openCoverageRunDetails}
                      onKeyDown={(event) => handleRowKeyDown(event, openCoverageRunDetails)}
                    >
                      <div className="flex min-w-0 flex-1 items-center justify-between gap-12">
                        <p className="truncate text-16 font-semibold text-text-primary">
                          {getAgentsNotInAnyRuleCardLabel(agentsNotInAnyRuleCount)}
                        </p>
                        <AvatarGroup names={agentsNotInAnyRuleAvatarNames} max={3} size="xs" />
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-icon-primary" />
                    </div>
                  </div>
                </Card>
              )}

              {rulesWithFailures.length > 0 && (
                <Card className="w-full border-border-subtle">
                  <Accordion
                    type="multiple"
                    value={expandedRunSections}
                    onValueChange={(value) => setExpandedRunSections(value as string[])}
                    className="w-full"
                  >
                    <AccordionItem value="rules-with-failures" className="border-none">
                      <AccordionTrigger className="px-16 py-16 text-16 font-semibold text-text-primary [&>svg]:text-icon-primary">
                        {getRulesWithFailuresLabel(rulesWithFailures.length)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div>
                          {rulesWithFailures.map((rule, index) => (
                            <div key={rule.id}>
                              {index > 0 && <div className="border-t border-border-subtle" />}

                              <div
                                className="flex cursor-pointer flex-col gap-16 px-16 py-16 hover:bg-surface-subtle focus-visible:outline-none lg:flex-row lg:items-center lg:justify-between"
                                role="button"
                                tabIndex={0}
                                onClick={() => openRuleRunDetails(rule)}
                                onKeyDown={(event) =>
                                  handleRowKeyDown(event, () => openRuleRunDetails(rule))
                                }
                              >
                                <div className="flex min-w-0 items-start gap-12">
                                  <SimpleTooltip content={getStatusTooltip(rule.status)} side="right">
                                    <span className="mt-2 inline-flex shrink-0">
                                      <Image
                                        src={getStatusIconPath(rule.status)}
                                        alt=""
                                        width={16}
                                        height={16}
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </SimpleTooltip>

                                  <div className="min-w-0 space-y-8">
                                    <p className="text-14 font-semibold text-text-primary">{rule.name}</p>

                                    {shouldShowIssueCodeBadges &&
                                    rule.mainPageReasonLines &&
                                    rule.mainPageReasonLines.length > 0 ? (
                                      <div className="flex flex-col gap-4">
                                        {rule.mainPageReasonLines.map((reasonLine, reasonLineIndex) => (
                                          <Badge
                                            key={`${rule.id}-${reasonLine}-${reasonLineIndex}`}
                                            color="gray"
                                            size="sm"
                                            className="w-fit"
                                          >
                                            {reasonLine}
                                          </Badge>
                                        ))}
                                      </div>
                                    ) : rule.note ? (
                                      <p className="text-12 font-medium text-text-secondary">{rule.note}</p>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="flex items-center gap-16 self-end lg:self-auto">
                                  <div className="text-right">
                                    {isUpcomingWeek ? (
                                      <>
                                        <p className="text-14 font-medium text-text-primary">{rule.metric}</p>
                                        <p className="text-12 font-medium text-text-tertiary">
                                          {`${rule.assignments} expected`}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-14 font-medium text-text-primary">{rule.metric}</p>
                                        <p className="text-12 font-medium text-text-tertiary">
                                          {rule.assignments}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <ChevronRight size={16} className="shrink-0 text-icon-primary" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              )}

              <Card className="w-full border-border-subtle">
                <Accordion
                  type="multiple"
                  value={expandedRunSections}
                  onValueChange={(value) => setExpandedRunSections(value as string[])}
                  className="w-full"
                >
                  <AccordionItem value="rules-success" className="border-none">
                    <AccordionTrigger className="px-16 py-16 text-16 font-semibold text-text-primary [&>svg]:text-icon-primary">
                      {getRulesRanSuccessfullyLabel(successfulRules.length)}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      {successfulRules.length > 0 ? (
                        <div>
                          {successfulRules.map((rule, index) => (
                            <div key={rule.id}>
                              {index > 0 && <div className="border-t border-border-subtle" />}

                              <div
                                className="flex cursor-pointer flex-col gap-16 px-16 py-16 hover:bg-surface-subtle focus-visible:outline-none lg:flex-row lg:items-center lg:justify-between"
                                role="button"
                                tabIndex={0}
                                onClick={() => openRuleRunDetails(rule)}
                                onKeyDown={(event) =>
                                  handleRowKeyDown(event, () => openRuleRunDetails(rule))
                                }
                              >
                                <div className="flex min-w-0 items-start gap-12">
                                  <SimpleTooltip content={getStatusTooltip(rule.status)} side="right">
                                    <span className="mt-2 inline-flex shrink-0">
                                      <Image
                                        src={getStatusIconPath(rule.status)}
                                        alt=""
                                        width={16}
                                        height={16}
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </SimpleTooltip>
                                  <p className="text-14 font-semibold text-text-primary">{rule.name}</p>
                                </div>

                                <div className="flex items-center gap-16 self-end lg:self-auto">
                                  <div className="text-right">
                                    {isUpcomingWeek ? (
                                      <>
                                        <p className="text-14 font-medium text-text-primary">{rule.metric}</p>
                                        <p className="text-12 font-medium text-text-tertiary">
                                          {`${rule.assignments} expected`}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-14 font-medium text-text-primary">{rule.metric}</p>
                                        <p className="text-12 font-medium text-text-tertiary">
                                          {rule.assignments}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <ChevronRight size={16} className="shrink-0 text-icon-primary" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="px-16 pb-16 text-12 font-medium text-text-tertiary">
                          No successful runs yet.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </>
          )}
        </div>
        </div>
      </div>

      <Sheet
        open={activeSheetView !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSheetStack([])
            setDismissingCoverageIssueIds([])
            setCoverageSheetToast(null)
            if (coverageSheetToastTimeoutRef.current !== null) {
              window.clearTimeout(coverageSheetToastTimeoutRef.current)
              coverageSheetToastTimeoutRef.current = null
            }
          }
        }}
      >
        {activeSheetView && (
          <SheetContent size="md">
            <SheetHeader
              description={
                activeSheetView.panel === "coverage" ? activeSheetView.subtitle : activityData.tabLabel
              }
              actions={
                activeSheetView.panel === "rule" ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    iconRight={<ExternalLink size={14} className="text-icon-secondary" />}
                  >
                    Rule setup
                  </Button>
                ) : undefined
              }
            >
              {activeSheetView.title}
            </SheetHeader>

            <SheetBody className="space-y-16">
              {sheetStack.length > 1 && (
                <div className="-mt-8">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Go back"
                    onClick={handleSheetBack}
                    iconLeft={<ChevronLeft size={16} className="text-icon-primary" />}
                  />
                </div>
              )}
              {activeSheetView.panel === "coverage" ? (
                hasCoverageIssues ? (
                  <div className="divide-y divide-border-subtle">
                    {uniqueCoverageIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className={cn(
                          "transform-gpu overflow-hidden transition-all duration-200 ease-out",
                          dismissingCoverageIssueIds.includes(issue.id)
                            ? "max-h-0 -translate-y-4 opacity-0"
                            : "max-h-256 translate-y-0 opacity-100"
                        )}
                      >
                        <CoverageIssueCard
                          issue={issue}
                          rules={visibleActivityRules}
                          onAddToRule={handleAddAgentToRule}
                          onViewRule={openRuleFromCoverage}
                          showIssueCodeBadge={false}
                          canAddToRule={isUpcomingWeek}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center">
                    <p className="text-14 font-medium text-text-secondary">No agents to review.</p>
                  </div>
                )
              ) : (
                <>
                  <div className="flex flex-col items-center gap-8 py-12 text-center">
                    <Image
                      src={getStatusIconPath(activeSheetView.status)}
                      alt=""
                      width={32}
                      height={32}
                      aria-hidden="true"
                    />
                    <p className="text-24 font-semibold text-text-primary">
                      {statusDisplayLabel}
                    </p>
                    <p className="text-14 font-medium text-text-secondary">
                      {progressDisplayLabel}
                    </p>
                  </div>

                  <Tabs
                    value={activeRuleSheetTab}
                    onValueChange={(value) =>
                      setActiveRuleSheetTab(value as "agents" | "evaluators" | "run_details")
                    }
                    className="space-y-12"
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
                        Run Details
                      </NeutralTabsTrigger>
                    </NeutralTabsList>

                    <TabsContent value="agents" className="mt-0">
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
                                {canResolveRuleAgentIssueGroup(group.label) && isUpcomingWeek ? (
                                  <Button
                                    variant="default"
                                    size="default"
                                    className="w-full"
                                    iconRight={<ExternalLink size={14} className="text-text-inverse" />}
                                  >
                                    {getRuleAgentIssueCtaLabel(group.label)}
                                  </Button>
                                ) : null}
                              </AccordionContent>
                            </AccordionItem>
                          ))
                        ) : (
                          <p className="text-12 font-medium text-text-tertiary">
                            No agents not covered.
                          </p>
                        )}

                        <AccordionItem
                          value="agents-covered"
                          className="rounded-xl border border-border-subtle"
                        >
                          <AccordionTrigger className="px-16 py-16 text-14 font-semibold text-text-primary [&>svg]:text-icon-primary">
                            {`Agents covered (${coveredAgentsIncludingQuota.length})`}
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
                                        showIssueCodeBadge={shouldShowIssueCodeBadges}
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

                            {!showAllCoveredAgents && coveredAgentsIncludingQuota.length > 5 && (
                              <Button
                                variant="linkSecondary"
                                className="h-auto p-0"
                                onClick={() => setShowAllCoveredAgents(true)}
                              >
                                +{coveredAgentsIncludingQuota.length - 5} more agents
                              </Button>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>

                    <TabsContent value="evaluators" className="mt-0">
                      <Card className="border-border-subtle">
                        <div className="space-y-12 px-16 py-16 text-text-primary">
                          <p className="text-14 font-semibold text-text-primary">Evaluator Workload</p>
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
                                  showIssueCodeBadge={shouldShowIssueCodeBadges}
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-12 font-medium text-text-tertiary">
                              No evaluator workload data for this run.
                            </p>
                          )}

                          {!showAllActiveEvaluators && evaluatorWorkloadRows.length > 5 && (
                            <Button
                              variant="linkSecondary"
                              className="h-auto p-0"
                              onClick={() => setShowAllActiveEvaluators(true)}
                            >
                              +{evaluatorWorkloadRows.length - 5} more evaluators
                            </Button>
                          )}
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="run_details" className="mt-16">
                      <RunMetadataSection rows={activeSheetView.metadata} />
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </SheetBody>
            {activeSheetView.panel === "coverage" && coverageSheetToast ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-24">
                <AlertToast
                  title={coverageSheetToast.title}
                  description={coverageSheetToast.description}
                  onClose={() => setCoverageSheetToast(null)}
                  slideFrom="bottom"
                  className="pointer-events-auto shadow-lg"
                />
              </div>
            ) : null}
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}

export default function Page() {
  const [activeTopTab, setActiveTopTab] = React.useState<"rules" | "activity">("activity")
  const [isSettingsModalOpen, setSettingsModalOpen] = React.useState(false)
  const [isNotificationModalOpen, setNotificationModalOpen] = React.useState(false)
  const [notificationRecipients, setNotificationRecipients] = React.useState<string[]>([
    "jordan",
    "sarah-k",
  ])
  const [cycleLength, setCycleLength] = React.useState<CycleLength>("weekly")
  const [weeklyStartDay, setWeeklyStartDay] = React.useState<WeekdayValue>("monday")
  const [monthlyStartDay, setMonthlyStartDay] = React.useState("1")
  const cycleLengthFieldId = React.useId()
  const startsOnFieldId = React.useId()

  const handleSaveNotifications = React.useCallback(() => {
    setNotificationModalOpen(false)
    toast({
      title: "Notifications saved",
      description: "Recipients have been updated.",
    })
  }, [])

  const handleSaveSettings = React.useCallback(() => {
    setSettingsModalOpen(false)
    toast({
      title: "Settings saved",
      description: "Cycle settings have been updated.",
    })
  }, [])

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

                <Tabs
                  value={activeTopTab}
                  onValueChange={(value) => setActiveTopTab(value as "rules" | "activity")}
                  className="mt-24 flex min-h-0 flex-1 flex-col"
                >
                  <div className="w-full border-b border-border-subtle">
                    <div className="flex items-center">
                      <UnderlinedTabsList className="gap-20 border-b-0">
                        <UnderlinedTabsTrigger value="rules">Rules</UnderlinedTabsTrigger>
                        <UnderlinedTabsTrigger value="activity">Runs</UnderlinedTabsTrigger>
                      </UnderlinedTabsList>
                      {activeTopTab === "activity" && (
                        <div className="ml-8 flex items-center gap-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-text-primary"
                            aria-label="Cycle settings"
                            onClick={() => setSettingsModalOpen(true)}
                            iconLeft={<Settings01 size={16} className="h-16 w-16 text-icon-primary" />}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-text-primary"
                            aria-label="Cycle alerts"
                            onClick={() => setNotificationModalOpen(true)}
                            iconLeft={<Bell01 size={16} className="h-16 w-16 text-icon-primary" />}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                <TabsContent value="rules" className="mt-16 min-h-0 flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 flex-col gap-12 sm:flex-row sm:items-center sm:gap-8 xl:flex-1">
                      <div className="relative w-256 shrink-0">
                        <SearchMd
                          size={16}
                          className="pointer-events-none absolute left-12 top-12 text-icon-tertiary"
                        />
                        <Input placeholder="Search" className="pl-40" />
                      </div>

                      <Select defaultValue="active">
                        <SelectTrigger className="w-full sm:w-240">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap items-center gap-8">
                      <Button variant="secondary">Manage replacement reasons</Button>
                      <Button>New rule</Button>
                    </div>
                  </div>

                  <AssignmentTable />
                </TabsContent>

                <TabsContent value="activity" className="mt-0 flex min-h-0 flex-1 overflow-hidden">
                  <ActivityPanel />
                </TabsContent>
                </Tabs>

                <Dialog open={isSettingsModalOpen} onOpenChange={setSettingsModalOpen}>
                  <DialogContent size="lg">
                    <DialogHeader className="border-none">QA cycle settings</DialogHeader>
                    <DialogBody className="space-y-24 py-24">
                      <p className="text-16 text-text-primary">
                        Coverage gaps and rule results are grouped by this cycle. Match it to your
                        team&apos;s QA schedule.
                      </p>

                      <div className="grid grid-cols-2 gap-16">
                        <div className="space-y-8">
                          <Label htmlFor={cycleLengthFieldId}>Cycle length</Label>
                          <Select
                            value={cycleLength}
                            onValueChange={(value) => setCycleLength(value as CycleLength)}
                          >
                            <SelectTrigger id={cycleLengthFieldId} className="w-full">
                              <SelectValue placeholder="Select cycle length" />
                            </SelectTrigger>
                            <SelectContent>
                              {cycleLengthOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-8">
                          <Label htmlFor={startsOnFieldId}>
                            {cycleLength === "weekly" ? "Starts on" : "Starts on day"}
                          </Label>
                          {cycleLength === "weekly" ? (
                            <Select
                              value={weeklyStartDay}
                              onValueChange={(value) => setWeeklyStartDay(value as WeekdayValue)}
                            >
                              <SelectTrigger id={startsOnFieldId} className="w-full">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {weeklyStartOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Select value={monthlyStartDay} onValueChange={setMonthlyStartDay}>
                              <SelectTrigger id={startsOnFieldId} className="w-full">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {monthlyStartOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>

                      <InlineAlert
                        variant="info"
                        description={
                          <span className="whitespace-pre-line text-14 font-medium text-secondary-blue-700">
                            An agent is marked as &quot;not covered&quot; only after this full cycle
                            completes.
                          </span>
                        }
                      />
                    </DialogBody>
                    <DialogFooter className="border-none">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSaveSettings}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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
                        <InlineAlert
                          variant="info"
                          description={
                            <span className="text-14 font-medium text-secondary-blue-700">
                              Recipients will receive an email on Saturday evening with a summary of
                              predicted coverage gaps
                            </span>
                          }
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
              </section>
            </div>
          </main>
        </div>
        <ToastContainer position="top-right" className="z-[60]" />
      </div>
    </TooltipProvider>
  )
}
