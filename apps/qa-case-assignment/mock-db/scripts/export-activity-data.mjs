#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(__dirname, "..", "..")
const dbPath = path.resolve(appRoot, "mock-db", "qa_case_assignment_mock.sqlite")
const outputPath = path.resolve(appRoot, "app", "data", "mock-db-activity.ts")

function query(sql) {
  const raw = execFileSync("sqlite3", ["-json", dbPath, sql], { encoding: "utf8" })
  const trimmed = raw.trim()
  return trimmed.length > 0 ? JSON.parse(trimmed) : []
}

const issueCatalogRows = query(`
  SELECT
    issue_code,
    label
  FROM issue_catalog;
`)

const issueLabelByCode = new Map(
  issueCatalogRows.map((row) => [String(row.issue_code), String(row.label)])
)

function toUiStatus(runStatus) {
  if (runStatus === "success" || runStatus === "on_track") {
    return "success"
  }

  if (runStatus === "failed") {
    return "failed"
  }

  return "partial"
}

function toStatusLabel(uiStatus) {
  if (uiStatus === "success") {
    return "Success"
  }

  if (uiStatus === "failed") {
    return "Failed"
  }

  return "Partial"
}

function toIssueCodeLabel(issueCode) {
  return issueLabelByCode.get(String(issueCode))
}

function getTimeOffDaysFromContextNote(contextNote) {
  if (!contextNote) {
    return 1
  }

  const dayMatch = String(contextNote).match(/(\d+)\s+days?/i)
  if (!dayMatch?.[1]) {
    return 1
  }

  const parsedDays = Number.parseInt(dayMatch[1], 10)
  return Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 1
}

function toEvaluatorIssueCodeLabel(issueCode, contextNote) {
  if (issueCode === "ALL_EVALUATORS_AT_CAPACITY") {
    return "Workload limit reached"
  }

  if (issueCode === "EVALUATOR_UNAVAILABLE") {
    const timeOffDays = getTimeOffDaysFromContextNote(contextNote)
    return `Time off for ${timeOffDays} days in the week`
  }

  if (issueCode === "RULE_DID_NOT_EXECUTE" || issueCode === "RULE_EXECUTION_INTERRUPTED") {
    return "Rule did not execute"
  }

  return undefined
}

function toRuleAgentWarningReason(issueCode) {
  if (issueCode === "NO_CONVERSATIONS_IN_PERIOD") {
    return "no_conversations_in_period"
  }

  if (issueCode === "NO_MATCHING_CONVERSATIONS") {
    return "no_matching_conversations"
  }

  if (issueCode === "EVALUATOR_UNAVAILABLE") {
    return "evaluator_unavailable"
  }

  if (issueCode === "RULE_EXECUTION_INTERRUPTED" || issueCode === "RULE_DID_NOT_EXECUTE") {
    return "rule_interrupted"
  }

  return "all_evaluators_capacity"
}

function toSentenceCaseLabel(value) {
  if (!value) {
    return ""
  }

  const raw = String(value).trim()
  if (raw.length === 0) {
    return raw
  }

  return `${raw.charAt(0).toLowerCase()}${raw.slice(1)}`
}

const countableIssueCodes = new Set([
  "NO_CONVERSATIONS_IN_PERIOD",
  "NO_MATCHING_CONVERSATIONS",
  "ALL_EVALUATORS_AT_CAPACITY",
  "EVALUATOR_UNAVAILABLE",
])

const executionIssueCodes = new Set(["RULE_DID_NOT_EXECUTE", "RULE_EXECUTION_INTERRUPTED"])

function isCountableIssueCode(issueCode) {
  return countableIssueCodes.has(String(issueCode))
}

function buildReasonLinesFromWarningAgents(warningAgentRows) {
  const reasonCountByLabel = new Map()

  for (const agentRow of warningAgentRows) {
    if (!isCountableIssueCode(agentRow.issue_code)) {
      continue
    }

    const issueLabel = toIssueCodeLabel(agentRow.issue_code)
    if (!issueLabel) {
      continue
    }

    const sentenceCaseLabel = toSentenceCaseLabel(issueLabel)
    reasonCountByLabel.set(
      sentenceCaseLabel,
      (reasonCountByLabel.get(sentenceCaseLabel) ?? 0) + 1
    )
  }

  return Array.from(reasonCountByLabel.entries()).map(([sentenceCaseLabel, count]) => {
    const noun = count === 1 ? "agent" : "agents"
    return `${count} ${noun}: ${sentenceCaseLabel}`
  })
}

function buildReasonLinesFromIssueSummary(runIssueItems) {
  return runIssueItems
    .filter((issueItem) => isCountableIssueCode(issueItem.issue_code))
    .map((issueItem) => {
      const count = Math.max(Number(issueItem.affected_agents_count ?? 0), 0)
      const issueLabel = toIssueCodeLabel(issueItem.issue_code)
      const sentenceCaseLabel = toSentenceCaseLabel(issueLabel)
      const noun = count === 1 ? "agent" : "agents"
      return `${count} ${noun}: ${sentenceCaseLabel}`
    })
    .filter(Boolean)
}

function inferCurrentWeekFallbackReasonLines(expectedAssignments) {
  const missedAssignments = Math.max(
    3,
    Math.min(8, Math.round(Math.max(Number(expectedAssignments ?? 0), 0) * 0.08))
  )

  return [`${missedAssignments} agents: evaluators' workload limit reached`]
}

function getReasonLineAgentCount(reasonLine) {
  const match = /^(\d+)\s+agents?:/i.exec(String(reasonLine).trim())
  if (!match?.[1]) {
    return 0
  }

  const parsedCount = Number.parseInt(match[1], 10)
  return Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 0
}

function distributeWarningTargets(runsForWeek, warningAgentsByRunId, requestedCount) {
  const targetsByRunId = new Map(
    runsForWeek.map((run) => [Number(run.rule_run_id), 0])
  )

  const runStats = runsForWeek
    .map((run) => {
      const runId = Number(run.rule_run_id)
      const availableCount = (warningAgentsByRunId.get(runId) ?? []).filter((agentRow) =>
        isCountableIssueCode(agentRow.issue_code)
      ).length

      return {
        runId,
        availableCount,
        isNonSuccess: toUiStatus(run.run_status) !== "success",
      }
    })
    .filter((runStat) => runStat.availableCount > 0)

  let remaining = Math.max(0, Math.floor(Number(requestedCount) || 0))
  if (remaining === 0 || runStats.length === 0) {
    return targetsByRunId
  }

  const primaryRuns = runStats.filter((runStat) => runStat.isNonSuccess)
  const fallbackRuns = runStats.filter((runStat) => !runStat.isNonSuccess)
  const orderedRuns = primaryRuns.length > 0 ? primaryRuns : fallbackRuns

  for (const runStat of orderedRuns) {
    if (remaining <= 0) {
      break
    }

    targetsByRunId.set(runStat.runId, 1)
    remaining -= 1
  }

  while (remaining > 0) {
    let allocatedThisPass = false

    for (const runStat of orderedRuns) {
      if (remaining <= 0) {
        break
      }

      const currentTarget = targetsByRunId.get(runStat.runId) ?? 0
      if (currentTarget >= runStat.availableCount) {
        continue
      }

      targetsByRunId.set(runStat.runId, currentTarget + 1)
      remaining -= 1
      allocatedThisPass = true
    }

    if (!allocatedThisPass) {
      break
    }
  }

  return targetsByRunId
}

function toMetadataTimestamp(value) {
  if (!value) {
    return "N/A"
  }

  return String(value).slice(0, 16)
}

function groupByRunId(rows) {
  const map = new Map()
  for (const row of rows) {
    const key = Number(row.rule_run_id)
    const current = map.get(key) ?? []
    current.push(row)
    map.set(key, current)
  }
  return map
}

const weeks = query(`
  SELECT
    ws.week_id,
    ws.week_label,
    ws.week_state,
    ws.start_date,
    COALESCE(SUM(CASE
      WHEN was.alert_code IN ('agents_not_covered', 'agents_at_risk')
      THEN was.entity_count ELSE 0
    END), 0) AS agents_without_assignment,
    COALESCE(SUM(CASE
      WHEN was.alert_code IN ('evaluators_without_workload', 'evaluators_at_risk')
      THEN was.entity_count ELSE 0
    END), 0) AS evaluators_without_workload
  FROM week_snapshots ws
  LEFT JOIN week_alert_summary was ON was.week_id = ws.week_id
  GROUP BY ws.week_id, ws.week_label, ws.week_state, ws.start_date
  ORDER BY date(ws.start_date) DESC;
`)

const runs = query(`
  SELECT
    rr.rule_run_id,
    rr.week_id,
    rr.rule_id,
    r.rule_name,
    rr.status AS run_status,
    rr.run_kind,
    rr.coverage_pct,
    rr.assigned_assignments,
    rr.expected_assignments,
    rr.ran_at,
    rr.next_run_at,
    ws.week_label
  FROM rule_runs rr
  JOIN rules r ON r.rule_id = rr.rule_id
  JOIN week_snapshots ws ON ws.week_id = rr.week_id
  WHERE r.rule_type = 'agent_evaluation' AND r.is_active = 1
  ORDER BY rr.week_id DESC, rr.rule_id ASC;
`)

const runIssues = query(`
  SELECT
    ris.rule_run_id,
    ris.issue_code,
    ris.affected_agents_count,
    ris.reason_line
  FROM rule_issue_summary ris
  ORDER BY ris.rule_run_id ASC, ris.issue_code ASC;
`)

const warningAgents = query(`
  WITH ranked AS (
    SELECT
      ac.rule_run_id,
      a.agent_id,
      a.agent_name,
      ac.issue_code,
      ac.context_note,
      ac.assignments_made,
      ac.assignment_goal,
      ROW_NUMBER() OVER (PARTITION BY ac.rule_run_id ORDER BY a.agent_id) AS rn
    FROM agent_coverage_detail ac
    JOIN agents a ON a.agent_id = ac.agent_id
    WHERE ac.rule_run_id IS NOT NULL
      AND ac.coverage_state IN ('not_covered', 'at_risk')
  )
  SELECT
    rule_run_id,
    agent_id,
    agent_name,
    issue_code,
    context_note,
    assignments_made,
    assignment_goal
  FROM ranked
  ORDER BY rule_run_id ASC, rn ASC;
`)

const coveredAgents = query(`
  WITH ranked AS (
    SELECT
      ac.rule_run_id,
      a.agent_id,
      a.agent_name,
      ac.assignments_made,
      ac.assignment_goal,
      ROW_NUMBER() OVER (PARTITION BY ac.rule_run_id ORDER BY a.agent_id) AS rn
    FROM agent_coverage_detail ac
    JOIN agents a ON a.agent_id = ac.agent_id
    WHERE ac.rule_run_id IS NOT NULL
      AND ac.coverage_state = 'covered'
  )
  SELECT
    rule_run_id,
    agent_id,
    agent_name,
    assignments_made,
    assignment_goal
  FROM ranked
  WHERE rn <= 10
  ORDER BY rule_run_id ASC, rn ASC;
`)

const quotaAgents = query(`
  WITH ranked AS (
    SELECT
      ac.rule_run_id,
      a.agent_id,
      a.agent_name,
      ac.context_note,
      ROW_NUMBER() OVER (PARTITION BY ac.rule_run_id ORDER BY a.agent_id) AS rn
    FROM agent_coverage_detail ac
    JOIN agents a ON a.agent_id = ac.agent_id
    WHERE ac.rule_run_id IS NOT NULL
      AND ac.coverage_state = 'informational'
      AND ac.issue_code = 'QUOTA_MET_BY_ANOTHER_RULE'
  )
  SELECT
    rule_run_id,
    agent_id,
    agent_name,
    context_note
  FROM ranked
  WHERE rn <= 6
  ORDER BY rule_run_id ASC, rn ASC;
`)

const warningEvaluators = query(`
  WITH ranked AS (
    SELECT
      ec.rule_run_id,
      e.evaluator_id,
      e.evaluator_name,
      ec.issue_code,
      ec.context_note,
      ec.assignments_received,
      ec.workload_limit,
      ROW_NUMBER() OVER (PARTITION BY ec.rule_run_id ORDER BY e.evaluator_id) AS rn
    FROM evaluator_coverage_detail ec
    JOIN evaluators e ON e.evaluator_id = ec.evaluator_id
    WHERE ec.evaluator_state IN ('at_risk', 'idle', 'informational')
  )
  SELECT
    rule_run_id,
    evaluator_id,
    evaluator_name,
    issue_code,
    context_note,
    assignments_received,
    workload_limit
  FROM ranked
  WHERE rn <= 8
  ORDER BY rule_run_id ASC, rn ASC;
`)

const activeEvaluators = query(`
  WITH ranked AS (
    SELECT
      ec.rule_run_id,
      e.evaluator_id,
      e.evaluator_name,
      ec.assignments_received,
      ec.workload_limit,
      ROW_NUMBER() OVER (PARTITION BY ec.rule_run_id ORDER BY e.evaluator_id) AS rn
    FROM evaluator_coverage_detail ec
    JOIN evaluators e ON e.evaluator_id = ec.evaluator_id
    WHERE ec.evaluator_state = 'active'
  )
  SELECT
    rule_run_id,
    evaluator_id,
    evaluator_name,
    assignments_received,
    workload_limit
  FROM ranked
  WHERE rn <= 8
  ORDER BY rule_run_id ASC, rn ASC;
`)

const notInAnyRuleCounts = query(`
  SELECT
    week_id,
    COUNT(*) AS not_in_any_rule_count
  FROM agent_coverage_detail
  WHERE rule_run_id IS NULL
    AND issue_code = 'AGENT_NOT_IN_ANY_RULE'
  GROUP BY week_id
  ORDER BY week_id DESC;
`)

const issuesByRunId = groupByRunId(runIssues)
const notInAnyRuleCountByWeekId = new Map(
  notInAnyRuleCounts.map((row) => [Number(row.week_id), Number(row.not_in_any_rule_count ?? 0)])
)
const runsByWeek = new Map()
for (const run of runs) {
  const key = Number(run.week_id)
  const current = runsByWeek.get(key) ?? []
  current.push(run)
  runsByWeek.set(key, current)
}

const warningAgentsByRunId = groupByRunId(warningAgents)
const coveredAgentsByRunId = groupByRunId(coveredAgents)
const quotaAgentsByRunId = groupByRunId(quotaAgents)
const warningEvaluatorsByRunId = groupByRunId(warningEvaluators)
const activeEvaluatorsByRunId = groupByRunId(activeEvaluators)

const orderedActivityTabs = []
const activityByTab = {}
const ruleSheetByRuleRowId = {}

weeks.forEach((week, weekIndex) => {
  const tabKey = `week_${weekIndex + 1}`
  orderedActivityTabs.push(tabKey)

  const qualifier =
    week.week_state === "upcoming"
      ? "Upcoming week"
      : week.week_state === "in_progress"
        ? "Current week"
        : undefined

  const weekRunRows = runsByWeek.get(Number(week.week_id)) ?? []
  const requestedCoverageGapCount =
    week.week_state === "upcoming" ? 10 : Number(week.agents_without_assignment ?? 0)
  const warningTargetsByRunId = distributeWarningTargets(
    weekRunRows,
    warningAgentsByRunId,
    requestedCoverageGapCount
  )

  const weekRuns = weekRunRows.map((run) => {
    const runId = Number(run.rule_run_id)
    const rawUiStatus = toUiStatus(run.run_status)
    const runIssueItems = issuesByRunId.get(runId) ?? []
    const expectedAssignments = Number(run.expected_assignments ?? 0)
    const assignedAssignments = Number(run.assigned_assignments ?? 0)
    const selectedWarningAgentSourceRows = (warningAgentsByRunId.get(runId) ?? [])
      .filter((agentRow) => isCountableIssueCode(agentRow.issue_code))
      .slice(0, warningTargetsByRunId.get(runId) ?? 0)
    const executionWarningAgentSourceRows = (warningAgentsByRunId.get(runId) ?? []).filter((agentRow) =>
      executionIssueCodes.has(String(agentRow.issue_code))
    )
    const hasRuleExecutionIssue = runIssueItems.some((issueItem) =>
      executionIssueCodes.has(String(issueItem.issue_code))
    )
    const isCurrentWeek = String(week.week_state) === "in_progress"
    const shouldForceFailed = hasRuleExecutionIssue && !isCurrentWeek
    const shouldConvertExecutionIssueForCurrentWeek = hasRuleExecutionIssue && isCurrentWeek

    let uiStatus = rawUiStatus
    let mainPageReasonLines = buildReasonLinesFromWarningAgents(selectedWarningAgentSourceRows)
    if (mainPageReasonLines.length === 0) {
      mainPageReasonLines = buildReasonLinesFromIssueSummary(runIssueItems)
    }

    let warningAgentRows = selectedWarningAgentSourceRows.map((agentRow, index) => ({
      id: `warning-agent-${runId}-${index + 1}`,
      name: agentRow.agent_name,
      status: "warning",
      warningReason: toRuleAgentWarningReason(agentRow.issue_code),
      assignmentText: `${Math.max(0, Math.min(Number(agentRow.assignments_made ?? 0), 2))}/2 assigned`,
      detailText:
        agentRow.context_note ??
        `${Math.max(0, Math.min(Number(agentRow.assignments_made ?? 0), 2))}/2 assigned`,
      issueCodeLabel: toIssueCodeLabel(agentRow.issue_code),
    }))

    if (shouldForceFailed) {
      uiStatus = "failed"
      mainPageReasonLines = ["Rule execution failed"]
      warningAgentRows = executionWarningAgentSourceRows.map((agentRow, index) => ({
        id: `warning-agent-${runId}-${index + 1}`,
        name: agentRow.agent_name,
        status: "warning",
        warningReason: "rule_interrupted",
        assignmentText: `${Math.max(0, Math.min(Number(agentRow.assignments_made ?? 0), 2))}/2 assigned`,
        detailText: agentRow.context_note ?? "Rule did not execute due to a system error.",
        issueCodeLabel: "Rule did not execute",
      }))
    }

    if (shouldConvertExecutionIssueForCurrentWeek) {
      uiStatus = "partial"
      if (mainPageReasonLines.length === 0) {
        mainPageReasonLines = inferCurrentWeekFallbackReasonLines(expectedAssignments)
      }
      if (warningAgentRows.length === 0) {
        const inferredWarningCount = Math.max(
          1,
          Math.min(executionWarningAgentSourceRows.length || 4, mainPageReasonLines.reduce(
            (total, reasonLine) => total + getReasonLineAgentCount(reasonLine),
            0
          ) || 4)
        )
        warningAgentRows = executionWarningAgentSourceRows.slice(0, inferredWarningCount).map((agentRow, index) => ({
          id: `warning-agent-${runId}-${index + 1}`,
          name: agentRow.agent_name,
          status: "warning",
          warningReason: "all_evaluators_capacity",
          assignmentText: "0/2 assigned",
          detailText: "Eligible conversations are still being assigned for this week.",
          issueCodeLabel: "All evaluators at capacity",
        }))
      }
    }

    const issueCodeLabel =
      uiStatus === "failed"
        ? "Rule execution failed"
        : warningAgentRows.length > 0
          ? warningAgentRows[0].issueCodeLabel
          : runIssueItems
              .filter((item) => !executionIssueCodes.has(String(item.issue_code)))
              .map((item) => toIssueCodeLabel(item.issue_code))
              .find(Boolean)

    const reasonLineMissedAssignments = mainPageReasonLines.reduce(
      (total, reasonLine) => total + getReasonLineAgentCount(reasonLine),
      0
    )
    const displayedMissedAssignments =
      shouldConvertExecutionIssueForCurrentWeek
        ? Math.max(reasonLineMissedAssignments, 0)
        : Math.max(
            reasonLineMissedAssignments,
            expectedAssignments - assignedAssignments,
            0
          )
    const inferredAssignedAssignments = Math.max(expectedAssignments - displayedMissedAssignments, 0)
    const displayedAssignedAssignments =
      shouldForceFailed
        ? 0
        : shouldConvertExecutionIssueForCurrentWeek && assignedAssignments === 0
          ? inferredAssignedAssignments
          : assignedAssignments
    const roundedCoverage = expectedAssignments > 0
      ? Math.round((displayedAssignedAssignments * 100) / expectedAssignments)
      : 100
    const assignments = `${displayedAssignedAssignments}/${expectedAssignments}`

    const statusLabel = toStatusLabel(uiStatus)
    const progressLabel = `${roundedCoverage}% (${assignments})`

    const coveredAgentRows = (coveredAgentsByRunId.get(runId) ?? []).map((agentRow, index) => ({
      id: `covered-agent-${runId}-${index + 1}`,
      name: agentRow.agent_name,
      status: "success",
      assignmentText: `${Math.max(0, Math.min(Number(agentRow.assignments_made ?? 2), 2))}/2 assigned`,
    }))

    const quotaRows = (quotaAgentsByRunId.get(runId) ?? []).map((agentRow, index) => ({
      id: `quota-agent-${runId}-${index + 1}`,
      name: agentRow.agent_name,
      status: "fyi",
      assignmentText: "2/2 via another rule",
      viaRuleName: "Another rule",
      detailText: agentRow.context_note ?? undefined,
      issueCodeLabel: "Quota met by another rule",
    }))
    const coveredAgentRowsForDisplay = uiStatus === "failed" ? [] : coveredAgentRows
    const quotaRowsForDisplay = uiStatus === "failed" ? [] : quotaRows

    const activeEvaluatorSourceRows = activeEvaluatorsByRunId.get(runId) ?? []
    const availableEvaluatorCount = activeEvaluatorSourceRows.length

    let warningEvaluatorRowsRaw = (warningEvaluatorsByRunId.get(runId) ?? []).map(
      (evaluatorRow, index) => {
        const workloadLimit = Number(evaluatorRow.workload_limit ?? 0)
        const safeAssignmentsReceived =
          String(evaluatorRow.issue_code) === "EVALUATOR_UNAVAILABLE"
            ? 0
            : Math.max(
                0,
                Math.min(
                  Number(evaluatorRow.assignments_received ?? 0),
                  workloadLimit,
                  Math.max(availableEvaluatorCount, 0)
                )
              )

        return {
          id: `warning-evaluator-${runId}-${index + 1}`,
          name: evaluatorRow.evaluator_name,
          status: "warning",
          loadText: `${safeAssignmentsReceived}/${workloadLimit}`,
          detailText: evaluatorRow.context_note ?? undefined,
          issueCodeLabel: toEvaluatorIssueCodeLabel(
            evaluatorRow.issue_code,
            evaluatorRow.context_note
          ),
        }
      }
    )

    if (uiStatus === "failed") {
      warningEvaluatorRowsRaw = (warningEvaluatorsByRunId.get(runId) ?? []).map((evaluatorRow, index) => ({
        id: `warning-evaluator-${runId}-${index + 1}`,
        name: evaluatorRow.evaluator_name,
        status: "warning",
        loadText: `0/${Number(evaluatorRow.workload_limit ?? 0)}`,
        detailText: evaluatorRow.context_note ?? "Rule did not execute due to a system error.",
        issueCodeLabel: "Rule did not execute",
      }))
    }

    if (uiStatus === "partial" && shouldConvertExecutionIssueForCurrentWeek) {
      warningEvaluatorRowsRaw = warningEvaluatorRowsRaw
        .filter((evaluatorRow) => evaluatorRow.issueCodeLabel !== "Rule did not execute")
      if (warningEvaluatorRowsRaw.length === 0) {
        const fallbackEvaluator = activeEvaluatorSourceRows[0] ?? (warningEvaluatorsByRunId.get(runId) ?? [])[0]
        if (fallbackEvaluator) {
          warningEvaluatorRowsRaw = [
            {
              id: `warning-evaluator-${runId}-fallback`,
              name: fallbackEvaluator.evaluator_name,
              status: "warning",
              loadText: `0/${Number(fallbackEvaluator.workload_limit ?? 0)}`,
              detailText: "Assignments are still being distributed for this week.",
              issueCodeLabel: "Workload limit reached",
            },
          ]
        }
      }
    }

    if (warningAgentRows.length > 0 && warningEvaluatorRowsRaw.length === 0) {
      const fallbackEvaluator = activeEvaluatorSourceRows[0]
      if (fallbackEvaluator) {
        warningEvaluatorRowsRaw = [
          {
            id: `warning-evaluator-${runId}-fallback`,
            name: fallbackEvaluator.evaluator_name,
            status: "warning",
            loadText: `0/${Number(fallbackEvaluator.workload_limit ?? 0)}`,
            detailText: "Workload limit reached for this evaluator in this rule run.",
            issueCodeLabel: "Workload limit reached",
          },
        ]
      }
    }

    const warningEvaluatorRows = warningAgentRows.length > 0 ? warningEvaluatorRowsRaw : []
    const activeEvaluatorRowsSource =
      uiStatus === "failed"
        ? []
        : activeEvaluatorSourceRows

    const activeEvaluatorRows = activeEvaluatorRowsSource.map((evaluatorRow, index) => ({
      id: `active-evaluator-${runId}-${index + 1}`,
      name: evaluatorRow.evaluator_name,
      status: "success",
      loadText: `${Number(evaluatorRow.assignments_received ?? 0)}/${Number(evaluatorRow.workload_limit ?? 0)}`,
    }))

    const reasonSummary =
      mainPageReasonLines.length > 0 ? mainPageReasonLines.join(" · ") : undefined

    ruleSheetByRuleRowId[`rule-${Number(run.week_id)}-${Number(run.rule_id)}`] = {
      status: uiStatus,
      statusLabel,
      progressLabel,
      metadata: [
        {
          label: run.run_kind === "predicted" ? "Scheduled" : "Ran",
          value:
            run.run_kind === "predicted"
              ? toMetadataTimestamp(run.next_run_at)
              : toMetadataTimestamp(run.ran_at),
        },
        { label: "Sampled", value: run.week_label },
        { label: "Mode", value: "Agent evaluation" },
        { label: "Expected", value: `${expectedAssignments} assignments` },
        { label: "Made", value: `${displayedAssignedAssignments}` },
        {
          label: "Missed",
          value: `${Math.max(expectedAssignments - displayedAssignedAssignments, 0)}`,
        },
      ],
      reasonSummary,
      agentsWithoutQa: warningAgentRows,
      coveredAgents: coveredAgentRowsForDisplay,
      quotaMetElsewhere: quotaRowsForDisplay,
      evaluatorsWithIssues: warningEvaluatorRows,
      activeEvaluators: activeEvaluatorRows,
    }

    return {
      id: `rule-${Number(week.week_id)}-${Number(run.rule_id)}`,
      name: run.rule_name,
      status: uiStatus,
      metric: `${roundedCoverage}%`,
      assignments,
      note: mainPageReasonLines[0],
      issueCodeLabel,
      mainPageReasonLines,
    }
  })

  const partialRuleAgentCount = weekRuns.reduce((total, ruleRow) => {
    if (ruleRow.status === "failed") return total
    return (
      total +
      (ruleRow.mainPageReasonLines ?? []).reduce(
        (lineTotal, reasonLine) => lineTotal + getReasonLineAgentCount(reasonLine),
        0
      )
    )
  }, 0)

  const failedRuleExpectedTotal = weekRuns.reduce((total, ruleRow) => {
    if (ruleRow.status !== "failed") return total
    const parts = (ruleRow.assignments ?? "0/0").split("/")
    return total + Math.max(Number(parts[1]) || 0, 0)
  }, 0)

  const ruleBasedUncoveredCount =
    Math.round(partialRuleAgentCount * 0.6) + Math.round(failedRuleExpectedTotal * 0.85)

  const notInAnyRuleCount = notInAnyRuleCountByWeekId.get(Number(week.week_id)) ?? 0
  const combinedUncoveredCount = notInAnyRuleCount + ruleBasedUncoveredCount

  activityByTab[tabKey] = {
    tabLabel: week.week_label,
    ...(qualifier ? { tabQualifier: qualifier } : {}),
    summary: {
      agentsNotInAnyRuleCount: notInAnyRuleCount,
      agentsWithoutAssignment: Math.max(combinedUncoveredCount, notInAnyRuleCount),
      evaluatorsWithoutWorkload: Number(week.evaluators_without_workload ?? 0),
    },
    rules: weekRuns,
  }
})

const fileContents = `// Auto-generated from apps/qa-case-assignment/mock-db/qa_case_assignment_mock.sqlite\n// Run: node apps/qa-case-assignment/mock-db/scripts/export-activity-data.mjs\n\nexport const mockDbOrderedActivityTabs = ${JSON.stringify(orderedActivityTabs, null, 2)} as const\n\nexport const mockDbActivityByTab = ${JSON.stringify(activityByTab, null, 2)} as const\n\nexport const mockDbRuleSheetByRuleRowId = ${JSON.stringify(ruleSheetByRuleRowId, null, 2)} as const\n`

mkdirSync(path.dirname(outputPath), { recursive: true })
writeFileSync(outputPath, fileContents)
console.log(`Generated ${outputPath}`)
