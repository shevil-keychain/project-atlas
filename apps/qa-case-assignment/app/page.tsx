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
  SearchMd,
  Settings01,
} from "@level/ui/components/icons"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { toast } from "@level/ui/hooks/use-toast"
import { cn } from "@level/ui/lib/utils"
import { AlertTriangle, CheckCircle2, ChevronLeft, Info } from "lucide-react"
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
  | "No conversations in period"
  | "Conversations didn't match filters"
  | "All evaluators at capacity"
  | "Evaluator unavailable"
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

type CoverageIssue = {
  id: string
  agentName: string
  teamName: string
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

type MockDbRuleSheetData = Omit<RuleSheetDetails, "panel" | "title" | "subtitle">

type RunSheetView = CoverageSheetDetails | RuleSheetDetails

const ACTIVITY_TAB_COUNT = 40
const ACTIVITY_RULE_COUNT = 8
const ACTIVITY_TOTAL_RULE_SLOTS = ACTIVITY_TAB_COUNT * ACTIVITY_RULE_COUNT
const ACTIVITY_SUCCESS_RULE_COUNT = Math.round(ACTIVITY_TOTAL_RULE_SLOTS * 0.7)
const ACTIVITY_PARTIAL_RULE_COUNT = Math.round(ACTIVITY_TOTAL_RULE_SLOTS * 0.2)

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

const failedRuleNotes = [
  "Coverage dropped after evaluator availability fell below the required threshold",
  "Assignment prerequisites were unmet for multiple queue segments",
  "Execution missed target due to cascading eligibility conflicts",
]

const issueCodeDescriptions: Record<IssueCodeLabel, string> = {
  "Agent not in any rule":
    "This agent isn't included in any active assignment rule — manually or through dynamic selection. Add them to a rule to ensure QA coverage.",
  "No conversations in period":
    "This agent had zero conversations during the sampling period. They may have been off or on leave.",
  "Conversations didn't match filters":
    "This agent had conversations, but none matched the rule's conditions (e.g., duration, tags, disposition). Review the rule's filters.",
  "All evaluators at capacity":
    "Eligible conversations existed for this agent, but every evaluator in the rule had already reached their workload limit.",
  "Evaluator unavailable":
    "This evaluator was marked as unavailable or on leave when the rule ran.",
  "Rule did not execute":
    "The rule was scheduled but did not run due to a system error.",
  "Rule execution interrupted":
    "The rule started but timed out before processing all agents.",
  "Quota met by another rule":
    "This agent's QA goal was already met by a different rule. Not a failure — they received QA.",
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

const failedIssueCodes: IssueCodeLabel[] = [
  "All evaluators at capacity",
  "Rule did not execute",
  "Rule execution interrupted",
  "Conversations didn't match filters",
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
    return failedRuleNotes[(tabIndex + ruleIndex) % failedRuleNotes.length]
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
    return failedIssueCodes[(tabIndex + ruleIndex) % failedIssueCodes.length]
  }

  return undefined
}

function getMainPageReasonLines(
  status: ActivityRuleStatus,
  tabIndex: number,
  ruleIndex: number
): string[] {
  if (status === "partial") {
    const reasonKinds = ["no_conversations", "no_matching", "unavailable", "interrupted"] as const
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

      return `${count} agents not processed as the rule did not execute`
    })
  }

  if (status === "failed") {
    const failedReasonLines = [
      "All evaluators at capacity",
      "No matching conversations found",
      "Rule did not execute",
    ]

    return [failedReasonLines[(tabIndex + ruleIndex) % failedReasonLines.length]]
  }

  return []
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
      { label: "QA Case Assignment", active: true },
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
    agentsWithoutAssignment: 2,
    evaluatorsWithoutWorkload: 1,
  },
  {
    agentsWithoutAssignment: 3,
    evaluatorsWithoutWorkload: 0,
  },
  {
    agentsWithoutAssignment: 1,
    evaluatorsWithoutWorkload: 0,
  },
  {
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

function parseAssignmentProgress(assignments: string) {
  const [completedPart, targetPart] = assignments.split("/")
  const completed = Number.parseInt(completedPart ?? "0", 10)
  const target = Number.parseInt(targetPart ?? "0", 10)

  return {
    completed: Number.isFinite(completed) ? completed : 0,
    target: Number.isFinite(target) ? target : 0,
  }
}

const coverageIssueSortOrder: Record<CoverageIssueType, number> = {
  not_in_rule: 0,
  all_evaluators_capacity: 1,
  no_matching_conversations: 2,
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
  if (issueType === "not_in_rule") {
    return "Not in any rule"
  }

  if (issueType === "all_evaluators_capacity") {
    return "All evaluators at capacity"
  }

  return "No matching conversations"
}

function getCoverageIssueCodeLabel(issue: CoverageIssue): IssueCodeLabel {
  if (issue.issueType === "not_in_rule") {
    return "Agent not in any rule"
  }

  if (issue.issueType === "all_evaluators_capacity") {
    return "All evaluators at capacity"
  }

  return "Conversations didn't match filters"
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

  return "Conversations didn't match filters"
}

function getRuleEvaluatorIssueCodeLabel(
  evaluator: RuleEvaluatorRow
): IssueCodeLabel | undefined {
  if (evaluator.issueCodeLabel) {
    return evaluator.issueCodeLabel
  }

  if (evaluator.status !== "warning") {
    return undefined
  }

  const detailText = evaluator.detailText?.toLowerCase() ?? ""
  if (detailText.includes("unavailable") || detailText.includes("leave")) {
    return "Evaluator unavailable"
  }

  return "Evaluator unavailable"
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
  const requestedIssueCount = Math.max(0, activityData.summary.agentsWithoutAssignment)
  const capacityRule =
    activityData.rules.find((rule) => rule.status !== "success") ?? activityData.rules[0]
  const matchingRule =
    activityData.rules.find((rule) => rule.id !== capacityRule?.id) ??
    activityData.rules[1] ??
    capacityRule

  const issueTemplates: CoverageIssue[] = [
    {
      id: "coverage-not-in-rule",
      agentName: "Tom Rivera",
      teamName: "Sales team",
      issueType: "not_in_rule",
      lastCovered: "Feb 10-16",
      dropReason: "(was in \"Billing QA\" until Feb 14)",
    },
    {
      id: "coverage-capacity",
      agentName: "Priya Nair",
      teamName: "Support team",
      issueType: "all_evaluators_capacity",
      ruleId: capacityRule?.id,
      ruleName: capacityRule?.name,
      unassignedCount: 3,
      evaluatorCapacitySummary: "Sarah Kim 24/24 · Mike Johnson 24/24",
    },
    {
      id: "coverage-no-match",
      agentName: "Dan Wu",
      teamName: "Billing team",
      issueType: "no_matching_conversations",
      ruleId: matchingRule?.id,
      ruleName: matchingRule?.name,
      conversationContext:
        "6 conversations in period · none matched filters (duration > 10 min)",
    },
  ]

  const selectedIssues = Array.from({ length: requestedIssueCount }, (_, index) => {
    const template = issueTemplates[index % issueTemplates.length]
    return {
      ...template,
      id: `${template.id}-${index + 1}`,
      agentName: getCoverageAgentName(index),
      teamName: getCoverageAgentTeam(index),
    }
  }).sort((leftIssue, rightIssue) => {
    const issueOrderDifference =
      coverageIssueSortOrder[leftIssue.issueType] - coverageIssueSortOrder[rightIssue.issueType]

    if (issueOrderDifference !== 0) {
      return issueOrderDifference
    }

    return leftIssue.agentName.localeCompare(rightIssue.agentName)
  })

  return {
    panel: "coverage",
    title: `Agents not covered · ${activityData.tabLabel}`,
    subtitle: `${selectedIssues.length} ${selectedIssues.length === 1 ? "agent" : "agents"} received zero QA this week`,
    issues: selectedIssues,
  }
}

function buildRuleRunSheetDetails(
  rule: ActivityRuleRow,
  activityData: ActivityData,
  mode: ActivityModeTab
): RuleSheetDetails {
  const mockDbRuleSheet = (mockDbRuleSheetByRuleRowId as unknown as Record<string, MockDbRuleSheetData>)[
    rule.id
  ]
  if (mockDbRuleSheet) {
    return {
      panel: "rule",
      title: rule.name,
      subtitle: `${mockDbRuleSheet.statusLabel} · ${mockDbRuleSheet.progressLabel}`,
      ...mockDbRuleSheet,
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

    agentsWithoutQa = sampleAgentNames.slice(0, 6).map((agentName, index) => ({
      id: `failed-system-warning-${index + 1}`,
      name: agentName,
      status: "warning",
      warningReason: "rule_interrupted",
      issueCodeLabel: "Rule did not execute",
      detailText: "Rule did not execute due to a system error.",
    }))
  }

  const statusLabel = getRuleStatusLabel(rule.status)

  return {
    panel: "rule",
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
          agentsWithoutAssignment: 0,
          evaluatorsWithoutWorkload: 0,
        }
      : isUpcomingWeek
        ? {
            ...summaryTemplate,
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

const activityByTab: Record<ActivityTab, ActivityData> =
  Object.keys(mockDbActivityByTab).length > 0
    ? (mockDbActivityByTab as unknown as Record<ActivityTab, ActivityData>)
    : fallbackActivityByTab

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
    <Card className="border-border-subtle">
      <div className="px-16 py-12">
        <p className="text-12 font-semibold text-text-tertiary">Run details</p>
      </div>
      <div className="grid grid-cols-1 gap-12 px-16 pb-16 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={`metadata-${row.label}`} className="space-y-4">
            <p className="text-12 font-medium text-text-tertiary">{row.label}</p>
            <p className="text-14 font-semibold text-text-primary">{row.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CoverageIssueCard({
  issue,
  rules,
  onAddToRule,
  onViewRule,
  showIssueCodeBadge,
}: {
  issue: CoverageIssue
  rules: ActivityRuleRow[]
  onAddToRule: (agentName: string, ruleName: string) => void
  onViewRule: (ruleId: string) => void
  showIssueCodeBadge: boolean
}) {
  const details: string[] = []
  const issueCodeLabel = showIssueCodeBadge ? getCoverageIssueCodeLabel(issue) : undefined
  const issueAgentDisplayName = getPersonDisplayName(issue.agentName)

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

  return (
    <Card className="border-border-subtle">
      <div className="flex items-start justify-between gap-12 px-16 py-16">
        <div className="min-w-0 space-y-8">
          <div className="flex items-start gap-12">
            <AlertTriangle size={16} className="mt-2 shrink-0 text-icon-warning" />
            <div className="min-w-0">
              <p className="text-14 font-semibold text-text-primary">{issueAgentDisplayName}</p>
              <p className="text-12 font-medium text-text-tertiary">{issue.teamName}</p>
              {issueCodeLabel ? (
                <SimpleTooltip
                  side="bottom"
                  content={
                    <span className="block max-w-200 whitespace-normal">
                      {issueCodeDescriptions[issueCodeLabel]}
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

          {!issueCodeLabel && details.length > 0 && (
            <p className="pl-28 text-12 font-medium text-text-secondary">{details.join(" · ")}</p>
          )}
        </div>
        <div className="shrink-0 pl-8">
          {issue.issueType === "not_in_rule" ? (
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
                    onClick={() => onAddToRule(issueAgentDisplayName, rule.name)}
                  >
                    {rule.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : issue.ruleId ? (
            <Button
              variant="linkPrimary"
              className="h-auto p-0"
              onClick={() => onViewRule(issue.ruleId!)}
              iconRight={<ChevronRight size={14} className="text-icon-brand" />}
            >
              View rule
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

function RuleAgentRowCard({
  agent,
  showIssueCodeBadge,
}: {
  agent: RuleAgentRow
  showIssueCodeBadge: boolean
}) {
  const rowStyle =
    agent.status === "warning"
      ? "bg-surface-warning-subtle"
      : agent.status === "fyi"
        ? "bg-surface-brand-subtle"
        : "bg-surface-subtle"
  const issueCodeLabel = showIssueCodeBadge ? getRuleAgentIssueCodeLabel(agent) : undefined
  const agentDisplayName = getPersonDisplayName(agent.name)

  if (agent.status === "warning") {
    return (
      <div className={cn("rounded-lg px-12 py-10", rowStyle)}>
        <div className="flex items-start gap-12">
          <AlertTriangle size={16} className="mt-2 shrink-0 text-icon-warning" />
          <div className="min-w-0">
            <p className="text-14 font-semibold text-text-primary">{agentDisplayName}</p>
            {issueCodeLabel ? (
              <SimpleTooltip
                side="bottom"
                content={
                  <span className="block max-w-200 whitespace-normal">
                    {issueCodeDescriptions[issueCodeLabel]}
                  </span>
                }
              >
                <Badge color="gray" size="sm" className="mt-8 w-fit">
                  {issueCodeLabel}
                </Badge>
              </SimpleTooltip>
            ) : (
              <>
                <p className="text-14 font-semibold text-text-warning">
                  {agent.warningReason === "no_matching_conversations"
                    ? "No matching conversations"
                    : agent.warningReason === "no_conversations_in_period"
                      ? "No conversations in period"
                      : agent.warningReason === "evaluator_unavailable"
                        ? "Evaluator unavailable"
                        : agent.warningReason === "rule_interrupted"
                          ? "Rule did not execute"
                          : "All evaluators at capacity"}
                </p>
                {agent.detailText && <p className="text-12 text-text-secondary">{agent.detailText}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (agent.status === "fyi") {
    return (
      <div className={cn("rounded-lg px-12 py-10", rowStyle)}>
        <div className="flex items-start gap-12">
          <Info size={16} className="mt-2 shrink-0 text-icon-brand" />
          <div className="min-w-0">
            <p className="text-14 font-semibold text-text-primary">{agentDisplayName}</p>
            <p className="text-14 text-text-secondary">{agent.assignmentText}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg px-12 py-10", rowStyle)}>
      <div className="flex items-start gap-12">
        <CheckCircle2 size={16} className="mt-2 shrink-0 text-icon-success" />
        <div className="min-w-0">
          <p className="text-14 font-semibold text-text-primary">{agentDisplayName}</p>
          <p className="text-14 text-text-secondary">{agent.assignmentText}</p>
        </div>
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
  const rowStyle =
    evaluator.status === "warning" ? "bg-surface-warning-subtle" : "bg-surface-subtle"
  const issueCodeLabel = showIssueCodeBadge
    ? getRuleEvaluatorIssueCodeLabel(evaluator)
    : undefined
  const evaluatorDisplayName = getPersonDisplayName(evaluator.name)

  if (evaluator.status === "warning") {
    return (
      <div className={cn("rounded-lg px-12 py-10", rowStyle)}>
        <div className="flex items-start gap-12">
          <AlertTriangle size={16} className="mt-2 shrink-0 text-icon-warning" />
          <div className="min-w-0">
            <p className="text-14 font-semibold text-text-primary">
              {evaluatorDisplayName} · {evaluator.loadText}
            </p>
            {issueCodeLabel ? (
              <SimpleTooltip
                side="bottom"
                content={
                  <span className="block max-w-200 whitespace-normal">
                    {issueCodeDescriptions[issueCodeLabel]}
                  </span>
                }
              >
                <Badge color="gray" size="sm" className="mt-8 w-fit">
                  {issueCodeLabel}
                </Badge>
              </SimpleTooltip>
            ) : (
              evaluator.detailText && (
                <p className="text-12 text-text-secondary">{evaluator.detailText}</p>
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg px-12 py-10", rowStyle)}>
      <div className="flex items-start gap-12">
        <CheckCircle2 size={16} className="mt-2 shrink-0 text-icon-success" />
        <div className="min-w-0">
          <p className="text-14 font-semibold text-text-primary">
            {evaluatorDisplayName} · {evaluator.loadText}
          </p>
        </div>
      </div>
    </div>
  )
}

function ActivityPanel() {
  const [activeActivityModeTab, setActiveActivityModeTab] =
    React.useState<ActivityModeTab>("agent_evaluation")
  const [activeActivityTab, setActiveActivityTab] = React.useState<ActivityTab>("week_1")
  const [sheetStack, setSheetStack] = React.useState<RunSheetView[]>([])
  const [expandedRuleSections, setExpandedRuleSections] = React.useState<string[]>([])
  const [showAllCoveredAgents, setShowAllCoveredAgents] = React.useState(false)
  const [showAllActiveEvaluators, setShowAllActiveEvaluators] = React.useState(false)
  const [showAllQuotaAgents, setShowAllQuotaAgents] = React.useState(false)
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

  const handleAddAgentToRule = React.useCallback((agentName: string, ruleName: string) => {
    toast({
      title: "Agent added to rule",
      description: `${agentName} was added to ${ruleName}.`,
    })
  }, [])

  React.useEffect(() => {
    if (!activeSheetView || activeSheetView.panel !== "rule") {
      return
    }

    const initialExpandedSections: string[] = []

    if (activeSheetView.agentsWithoutQa.length > 0) {
      initialExpandedSections.push("agents")
    }

    if (activeSheetView.evaluatorsWithIssues.length > 0) {
      initialExpandedSections.push("evaluators")
    }

    setExpandedRuleSections(initialExpandedSections)
    setShowAllCoveredAgents(false)
    setShowAllActiveEvaluators(false)
    setShowAllQuotaAgents(false)
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
  const isUpcomingWeek = activeTabIndex === 0
  const isPastWeek = activeTabIndex >= 2
  const shouldShowIssueCodeBadges = true
  const visibleActivityRules = isUpcomingWeek
    ? (() => {
        const upcomingRules = activityData.rules.filter((rule) => rule.name !== "Mortgage Queue")
        const billingRuleIndex = upcomingRules.findIndex((rule) => rule.name === "Billing QA")

        if (billingRuleIndex <= 0) {
          return upcomingRules
        }

        const billingRule = upcomingRules[billingRuleIndex]
        const withoutBillingRule = upcomingRules.filter((_, index) => index !== billingRuleIndex)
        return [withoutBillingRule[0], billingRule, ...withoutBillingRule.slice(1)]
      })()
    : activityData.rules
  const agentsWithoutAssignment = activityData.summary.agentsWithoutAssignment
  const hasCoverageGap = agentsWithoutAssignment > 0
  const coverageIconPath = hasCoverageGap
    ? "/status-icons/alert-circle.svg"
    : "/status-icons/check-circle.svg"
  const coverageCopy = hasCoverageGap
    ? isUpcomingWeek
      ? `${agentsWithoutAssignment} ${agentsWithoutAssignment === 1 ? "agent" : "agents"} at risk of not being covered`
      : `${agentsWithoutAssignment} ${agentsWithoutAssignment === 1 ? "agent was not covered" : "agents were not covered"}`
    : isUpcomingWeek
      ? "All agents are on track for coverage"
      : isPastWeek
        ? "All agents were covered"
        : "All agents covered"
  const uniqueCoveredAgents =
    activeSheetView && activeSheetView.panel === "rule"
      ? getUniqueByAgentName(activeSheetView.coveredAgents, (agent) =>
          getPersonDisplayName(agent.name)
        )
      : []
  const uniqueCoverageIssues =
    activeSheetView && activeSheetView.panel === "coverage"
      ? getUniqueByAgentName(activeSheetView.issues, (issue) =>
          getPersonDisplayName(issue.agentName)
        )
      : []

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-16 lg:flex-row lg:overflow-hidden">
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
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Tabs
            value={activeActivityTab}
            onValueChange={(value) => setActiveActivityTab(value as ActivityTab)}
          >
            <NeutralTabsList className="flex w-full flex-col rounded-none bg-transparent p-0">
              {orderedActivityTabs.map((weekKey) => (
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
        </div>
      </aside>

      <div className="mt-24 min-w-0 flex-1 lg:mt-0 lg:h-full lg:overflow-y-auto lg:pr-8">
        <div className="sticky top-0 z-10 mt-24 bg-surface-subtle px-4 pb-24">
          <p className="w-full text-18 font-semibold text-text-primary">
            <span>{activityData.tabLabel}</span>
          </p>
        </div>

        <div className="space-y-16">
          {(activeTabIndex === 0 || activeTabIndex === 1) && (
            <InlineAlert
              className="w-full max-w-3xl"
              variant="info"
              description={
                <span className="text-14 font-medium text-secondary-blue-700">
                  {activeTabIndex === 0
                    ? "Predicted based on current rules and schedules. Changes to rules will update these predictions."
                    : `This week is in progress and not complete yet. Final coverage may change before the cycle ends. Current status: ${hasCoverageGap ? "Off track" : "On track"}.`}
                </span>
              }
            />
          )}

          <Card className="w-full max-w-3xl border-border-subtle shadow-sm">
            <div className="p-4">
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-12 rounded-lg px-16 py-16 focus-visible:outline-none",
                  hasCoverageGap ? "bg-surface-error-subtle" : "bg-surface-success-subtle"
                )}
                role="button"
                tabIndex={0}
                onClick={openCoverageRunDetails}
                onKeyDown={(event) => handleRowKeyDown(event, openCoverageRunDetails)}
              >
                <div className="flex min-w-0 items-center gap-12">
                  <SimpleTooltip
                    content={hasCoverageGap ? (isUpcomingWeek ? "At risk" : "Not covered") : "Covered"}
                    side="right"
                  >
                    <span className="inline-flex shrink-0">
                      <Image
                        src={coverageIconPath}
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                      />
                    </span>
                  </SimpleTooltip>
                  <p className="text-16 font-semibold text-text-primary">{coverageCopy}</p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-icon-secondary" />
              </div>
            </div>
          </Card>

          <Card className="w-full max-w-3xl border-border-subtle">
            <div className="border-b border-border-subtle px-16 py-12">
              <p className="text-12 font-semibold text-text-primary">
                {activeTabIndex === 0 ? "Rule-wise predictions" : "Rule-wise assignment"}
              </p>
            </div>

            <div>
              {visibleActivityRules.map((rule, index) => (
                <div key={rule.id}>
                  {index > 0 && <div className="border-t border-border-subtle" />}

                  <div
                    className="flex cursor-pointer flex-col gap-16 px-16 py-16 hover:bg-surface-subtle focus-visible:outline-none lg:flex-row lg:items-center lg:justify-between"
                    role="button"
                    tabIndex={0}
                    onClick={() => openRuleRunDetails(rule)}
                    onKeyDown={(event) => handleRowKeyDown(event, () => openRuleRunDetails(rule))}
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
                            {rule.mainPageReasonLines.map((reasonLine) => (
                              <Badge
                                key={`${rule.id}-${reasonLine}`}
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
                            <p className="text-12 font-medium text-text-tertiary">{rule.assignments}</p>
                          </>
                        )}
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-icon-secondary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Sheet
        open={activeSheetView !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSheetStack([])
          }
        }}
      >
        {activeSheetView && (
          <SheetContent size="md">
            <SheetHeader>
              <div className="flex items-center gap-8">
                {sheetStack.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="-ml-8"
                    aria-label="Go back"
                    onClick={handleSheetBack}
                    iconLeft={<ChevronLeft size={16} className="text-icon-primary" />}
                  />
                )}
                <span className="block truncate">{activeSheetView.title}</span>
              </div>
            </SheetHeader>

            <SheetBody className="space-y-16">
              {activeSheetView.panel === "coverage" ? (
                <>
                  <InlineAlert
                    variant={activeSheetView.issues.length > 0 ? "error" : "success"}
                    title={
                      uniqueCoverageIssues.length > 0
                        ? `${uniqueCoverageIssues.length} ${uniqueCoverageIssues.length === 1 ? "agent" : "agents"} ${isPastWeek ? "were not covered" : "not covered"}`
                        : isPastWeek
                          ? "All agents were covered"
                          : "All agents covered"
                    }
                    description={
                      activeSheetView.issues.length > 0
                        ? "Review impacted agents and adjust rules or evaluator capacity."
                        : "No follow-up action is required for this cycle."
                    }
                  />

                  {uniqueCoverageIssues.length > 0 && (
                    <div className="space-y-8">
                      <p className="text-12 font-semibold text-text-tertiary">Impacted agents</p>
                      <div className="space-y-8">
                        {uniqueCoverageIssues.map((issue) => (
                          <CoverageIssueCard
                            key={issue.id}
                            issue={issue}
                            rules={visibleActivityRules}
                            onAddToRule={handleAddAgentToRule}
                            onViewRule={openRuleFromCoverage}
                            showIssueCodeBadge={shouldShowIssueCodeBadges}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <InlineAlert
                    variant={
                      activeSheetView.status === "success"
                        ? "success"
                        : activeSheetView.status === "partial"
                          ? "warning"
                          : "error"
                    }
                    title={`${activeSheetView.statusLabel} · ${activeSheetView.progressLabel}`}
                    description={
                      activeSheetView.reasonSummary ??
                      "Assignments were completed without coverage gaps."
                    }
                  />

                  <Accordion
                    type="multiple"
                    value={expandedRuleSections}
                    onValueChange={(value) => setExpandedRuleSections(value as string[])}
                    className="gap-12"
                  >
                    <AccordionItem value="agents" className="rounded-xl border-border-subtle bg-surface-card">
                      <AccordionTrigger className="px-16 py-16 text-14 font-semibold text-text-primary hover:bg-surface-subtle">
                        {activeSheetView.agentsWithoutQa.length > 0
                          ? `Agents at risk (${activeSheetView.agentsWithoutQa.length})`
                          : "Agents (all covered)"}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-12 text-text-primary">
                        {activeSheetView.agentsWithoutQa.length > 0 && (
                          <>
                            <p className="text-12 font-semibold text-text-tertiary">Needs attention</p>
                            {activeSheetView.agentsWithoutQa.map((agent) => (
                              <RuleAgentRowCard
                                key={agent.id}
                                agent={agent}
                                showIssueCodeBadge={shouldShowIssueCodeBadges}
                              />
                            ))}
                          </>
                        )}

                        {activeSheetView.agentsWithoutQa.length > 0 &&
                          uniqueCoveredAgents.length > 0 && (
                            <div className="border-t border-border-subtle" />
                          )}

                        {uniqueCoveredAgents.length > 0 && (
                          <p className="text-12 font-semibold text-text-tertiary">Covered</p>
                        )}

                        {(showAllCoveredAgents
                          ? uniqueCoveredAgents
                          : uniqueCoveredAgents.slice(0, 5)
                        ).map((agent) => (
                          <RuleAgentRowCard
                            key={agent.id}
                            agent={agent}
                            showIssueCodeBadge={shouldShowIssueCodeBadges}
                          />
                        ))}

                        {!showAllCoveredAgents && uniqueCoveredAgents.length > 5 && (
                          <Button
                            variant="linkSecondary"
                            className="h-auto p-0"
                            onClick={() => setShowAllCoveredAgents(true)}
                          >
                            +{uniqueCoveredAgents.length - 5} more agents
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="evaluators"
                      className="rounded-xl border-border-subtle bg-surface-card"
                    >
                      <AccordionTrigger className="px-16 py-16 text-14 font-semibold text-text-primary hover:bg-surface-subtle">
                        {activeSheetView.evaluatorsWithIssues.length > 0
                          ? `Evaluators with constraints (${activeSheetView.evaluatorsWithIssues.length})`
                          : "Evaluators (all active)"}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-12 text-text-primary">
                        {activeSheetView.evaluatorsWithIssues.length > 0 && (
                          <>
                            <p className="text-12 font-semibold text-text-tertiary">Needs attention</p>
                            {activeSheetView.evaluatorsWithIssues.map((evaluator) => (
                              <RuleEvaluatorRowCard
                                key={evaluator.id}
                                evaluator={evaluator}
                                showIssueCodeBadge={shouldShowIssueCodeBadges}
                              />
                            ))}
                          </>
                        )}

                        {activeSheetView.evaluatorsWithIssues.length > 0 &&
                          activeSheetView.activeEvaluators.length > 0 && (
                            <div className="border-t border-border-subtle" />
                          )}

                        {activeSheetView.activeEvaluators.length > 0 && (
                          <p className="text-12 font-semibold text-text-tertiary">Available</p>
                        )}

                        {(showAllActiveEvaluators
                          ? activeSheetView.activeEvaluators
                          : activeSheetView.activeEvaluators.slice(0, 5)
                        ).map((evaluator) => (
                          <RuleEvaluatorRowCard
                            key={evaluator.id}
                            evaluator={evaluator}
                            showIssueCodeBadge={shouldShowIssueCodeBadges}
                          />
                        ))}

                        {!showAllActiveEvaluators && activeSheetView.activeEvaluators.length > 5 && (
                          <Button
                            variant="linkSecondary"
                            className="h-auto p-0"
                            onClick={() => setShowAllActiveEvaluators(true)}
                          >
                            +{activeSheetView.activeEvaluators.length - 5} more evaluators
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {activeSheetView.quotaMetElsewhere.length > 0 && (
                      <AccordionItem value="quota" className="rounded-xl border-border-subtle bg-surface-card">
                        <AccordionTrigger className="px-16 py-16 text-14 font-semibold text-text-primary hover:bg-surface-subtle">
                          Covered by other rules ({activeSheetView.quotaMetElsewhere.length})
                        </AccordionTrigger>
                        <AccordionContent className="space-y-12 text-text-primary">
                          {(showAllQuotaAgents
                            ? activeSheetView.quotaMetElsewhere
                            : activeSheetView.quotaMetElsewhere.slice(0, 5)
                          ).map((agent) => (
                            <RuleAgentRowCard
                              key={agent.id}
                              agent={agent}
                              showIssueCodeBadge={shouldShowIssueCodeBadges}
                            />
                          ))}

                          {!showAllQuotaAgents && activeSheetView.quotaMetElsewhere.length > 5 && (
                            <Button
                              variant="linkSecondary"
                              className="h-auto p-0"
                              onClick={() => setShowAllQuotaAgents(true)}
                            >
                              +{activeSheetView.quotaMetElsewhere.length - 5} more agents
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  <RunMetadataSection rows={activeSheetView.metadata} />
                </>
              )}
            </SheetBody>
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
                  <PageHeaderTitle size="2xl">QA Case Assignment</PageHeaderTitle>
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

                <TabsContent value="activity" className="mt-0 min-h-0 flex-1">
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
        <ToastContainer position="bottom-center" className="bottom-32" />
      </div>
    </TooltipProvider>
  )
}
