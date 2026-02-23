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
  if (issueCode === "AGENT_NOT_IN_ANY_RULE") {
    return "Agent not in any rule"
  }

  if (issueCode === "NO_CONVERSATIONS_IN_PERIOD") {
    return "No conversations in period"
  }

  if (issueCode === "NO_MATCHING_CONVERSATIONS") {
    return "Conversations didn't match filters"
  }

  if (issueCode === "ALL_EVALUATORS_AT_CAPACITY") {
    return "All evaluators at capacity"
  }

  if (issueCode === "EVALUATOR_UNAVAILABLE") {
    return "Evaluator unavailable"
  }

  if (issueCode === "RULE_DID_NOT_EXECUTE") {
    return "Rule did not execute"
  }

  if (issueCode === "RULE_EXECUTION_INTERRUPTED") {
    return "Rule execution interrupted"
  }

  if (issueCode === "QUOTA_MET_BY_ANOTHER_RULE") {
    return "Quota met by another rule"
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

function toMainPageReasonLine(issueCode, affectedAgentsCount, uiStatus) {
  if (issueCode === "NO_CONVERSATIONS_IN_PERIOD") {
    return `${affectedAgentsCount} agents had no conversations in period`
  }

  if (issueCode === "NO_MATCHING_CONVERSATIONS") {
    return `${affectedAgentsCount} agents had no matching conversations`
  }

  if (issueCode === "EVALUATOR_UNAVAILABLE") {
    return `${affectedAgentsCount} agents unassigned due to evaluator unavailability`
  }

  if (issueCode === "RULE_EXECUTION_INTERRUPTED") {
    return `${affectedAgentsCount} agents not processed as the rule did not execute`
  }

  if (issueCode === "RULE_DID_NOT_EXECUTE") {
    return "Rule did not execute"
  }

  // Capacity tag was removed from partial/upcoming labels.
  if (issueCode === "ALL_EVALUATORS_AT_CAPACITY") {
    return uiStatus === "failed" ? "All evaluators at capacity" : undefined
  }

  return undefined
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
  WHERE rn <= 8
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

const issuesByRunId = groupByRunId(runIssues)
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

  const weekRuns = (runsByWeek.get(Number(week.week_id)) ?? []).map((run) => {
    const uiStatus = toUiStatus(run.run_status)
    const runIssueItems = issuesByRunId.get(Number(run.rule_run_id)) ?? []

    const mainPageReasonLines = runIssueItems
      .map((item) =>
        toMainPageReasonLine(item.issue_code, Number(item.affected_agents_count ?? 0), uiStatus)
      )
      .filter(Boolean)

    const issueCodeLabel = runIssueItems
      .map((item) => toIssueCodeLabel(item.issue_code))
      .find((label) => Boolean(label))

    const roundedCoverage = Math.round(Number(run.coverage_pct ?? 0))
    const assignments = `${Number(run.assigned_assignments ?? 0)}/${Number(run.expected_assignments ?? 0)}`

    const statusLabel = toStatusLabel(uiStatus)
    const progressLabel = `${roundedCoverage}% (${assignments})`

    const warningAgentRows = (warningAgentsByRunId.get(Number(run.rule_run_id)) ?? []).map(
      (agentRow, index) => ({
        id: `warning-agent-${Number(run.rule_run_id)}-${index + 1}`,
        name: agentRow.agent_name,
        status: "warning",
        warningReason: toRuleAgentWarningReason(agentRow.issue_code),
        detailText:
          agentRow.context_note ??
          `${Number(agentRow.assignments_made ?? 0)}/${Number(agentRow.assignment_goal ?? 1)} assigned`,
        issueCodeLabel: toIssueCodeLabel(agentRow.issue_code),
      })
    )

    const coveredAgentRows = (coveredAgentsByRunId.get(Number(run.rule_run_id)) ?? []).map(
      (agentRow, index) => ({
        id: `covered-agent-${Number(run.rule_run_id)}-${index + 1}`,
        name: agentRow.agent_name,
        status: "success",
        assignmentText: `${Number(agentRow.assignments_made ?? 0)}/${Number(agentRow.assignment_goal ?? 1)} assigned`,
      })
    )

    const quotaRows = (quotaAgentsByRunId.get(Number(run.rule_run_id)) ?? []).map(
      (agentRow, index) => ({
        id: `quota-agent-${Number(run.rule_run_id)}-${index + 1}`,
        name: agentRow.agent_name,
        status: "fyi",
        assignmentText: "1/1 via another rule",
        viaRuleName: "Another rule",
        detailText: agentRow.context_note ?? undefined,
        issueCodeLabel: "Quota met by another rule",
      })
    )

    const warningEvaluatorRows = (warningEvaluatorsByRunId.get(Number(run.rule_run_id)) ?? []).map(
      (evaluatorRow, index) => ({
        id: `warning-evaluator-${Number(run.rule_run_id)}-${index + 1}`,
        name: evaluatorRow.evaluator_name,
        status: "warning",
        loadText: `${Number(evaluatorRow.assignments_received ?? 0)}/${Number(evaluatorRow.workload_limit ?? 0)}`,
        detailText: evaluatorRow.context_note ?? undefined,
        issueCodeLabel: toIssueCodeLabel(evaluatorRow.issue_code),
      })
    )

    const activeEvaluatorRows = (activeEvaluatorsByRunId.get(Number(run.rule_run_id)) ?? []).map(
      (evaluatorRow, index) => ({
        id: `active-evaluator-${Number(run.rule_run_id)}-${index + 1}`,
        name: evaluatorRow.evaluator_name,
        status: "success",
        loadText: `${Number(evaluatorRow.assignments_received ?? 0)}/${Number(evaluatorRow.workload_limit ?? 0)}`,
      })
    )

    const reasonSummary =
      uiStatus === "failed"
        ? "Rule did not execute — system error"
        : runIssueItems.length > 0
          ? runIssueItems
              .map((issueItem) => issueItem.reason_line)
              .filter((reasonLine) => Boolean(reasonLine))
              .join(" · ")
          : undefined

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
        { label: "Expected", value: `${Number(run.expected_assignments ?? 0)} assignments` },
        { label: "Made", value: `${Number(run.assigned_assignments ?? 0)}` },
        {
          label: "Missed",
          value: `${Math.max(Number(run.expected_assignments ?? 0) - Number(run.assigned_assignments ?? 0), 0)}`,
        },
      ],
      reasonSummary,
      agentsWithoutQa: warningAgentRows,
      coveredAgents: coveredAgentRows,
      quotaMetElsewhere: quotaRows,
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

  activityByTab[tabKey] = {
    tabLabel: week.week_label,
    ...(qualifier ? { tabQualifier: qualifier } : {}),
    summary: {
      agentsWithoutAssignment: Number(week.agents_without_assignment ?? 0),
      evaluatorsWithoutWorkload: Number(week.evaluators_without_workload ?? 0),
    },
    rules: weekRuns,
  }
})

const fileContents = `// Auto-generated from apps/qa-case-assignment/mock-db/qa_case_assignment_mock.sqlite\n// Run: node apps/qa-case-assignment/mock-db/scripts/export-activity-data.mjs\n\nexport const mockDbOrderedActivityTabs = ${JSON.stringify(orderedActivityTabs, null, 2)} as const\n\nexport const mockDbActivityByTab = ${JSON.stringify(activityByTab, null, 2)} as const\n\nexport const mockDbRuleSheetByRuleRowId = ${JSON.stringify(ruleSheetByRuleRowId, null, 2)} as const\n`

mkdirSync(path.dirname(outputPath), { recursive: true })
writeFileSync(outputPath, fileContents)
console.log(`Generated ${outputPath}`)
