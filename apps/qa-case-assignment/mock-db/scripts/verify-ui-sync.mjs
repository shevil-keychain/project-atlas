#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(__dirname, "..", "..")
const dbPath = path.resolve(appRoot, "mock-db", "qa_case_assignment_mock.sqlite")
const dataPath = path.resolve(appRoot, "app", "data", "mock-db-activity.ts")

function query(sql) {
  const raw = execFileSync("sqlite3", ["-json", dbPath, sql], { encoding: "utf8" }).trim()
  return raw ? JSON.parse(raw) : []
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

function getReasonLineAgentCount(reasonLine) {
  const match = /^(\d+)\s+agents?:/i.exec(String(reasonLine).trim())
  if (!match?.[1]) {
    return 0
  }

  const parsedCount = Number.parseInt(match[1], 10)
  return Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 0
}

const data = require(dataPath)
const orderedTabs = data.mockDbOrderedActivityTabs
const activityByTab = data.mockDbActivityByTab
const ruleSheetByRuleRowId = data.mockDbRuleSheetByRuleRowId

const weeks = query(`
  SELECT ws.week_id
  FROM week_snapshots ws
  ORDER BY date(ws.start_date) DESC;
`)

const runs = query(`
  SELECT
    rr.rule_run_id,
    rr.week_id,
    rr.rule_id,
    rr.status,
    CAST(ROUND(rr.coverage_pct) AS INTEGER) AS rounded_coverage,
    rr.assigned_assignments,
    rr.expected_assignments
  FROM rule_runs rr
  JOIN rules r ON r.rule_id = rr.rule_id
  WHERE r.rule_type = 'agent_evaluation'
    AND r.is_active = 1
  ORDER BY rr.week_id DESC, rr.rule_id ASC;
`)

const agentCountsByRunId = query(`
  SELECT
    ac.rule_run_id,
    SUM(CASE WHEN ac.coverage_state IN ('not_covered', 'at_risk') THEN 1 ELSE 0 END) AS warning_agents,
    SUM(CASE WHEN ac.coverage_state = 'covered' THEN 1 ELSE 0 END) AS covered_agents,
    SUM(CASE
      WHEN ac.coverage_state = 'informational'
       AND ac.issue_code = 'QUOTA_MET_BY_ANOTHER_RULE'
      THEN 1 ELSE 0 END
    ) AS quota_agents
  FROM agent_coverage_detail ac
  WHERE ac.rule_run_id IS NOT NULL
  GROUP BY ac.rule_run_id;
`)

const evaluatorCountsByRunId = query(`
  SELECT
    ec.rule_run_id,
    SUM(CASE WHEN ec.evaluator_state IN ('at_risk', 'idle', 'informational') THEN 1 ELSE 0 END) AS warning_evaluators,
    SUM(CASE WHEN ec.evaluator_state = 'active' THEN 1 ELSE 0 END) AS active_evaluators
  FROM evaluator_coverage_detail ec
  WHERE ec.rule_run_id IS NOT NULL
  GROUP BY ec.rule_run_id;
`)

const agentCountsMap = new Map(
  agentCountsByRunId.map((row) => [
    Number(row.rule_run_id),
    {
      warningAgents: Number(row.warning_agents ?? 0),
      coveredAgents: Number(row.covered_agents ?? 0),
      quotaAgents: Number(row.quota_agents ?? 0),
    },
  ])
)

const evaluatorCountsMap = new Map(
  evaluatorCountsByRunId.map((row) => [
    Number(row.rule_run_id),
    {
      warningEvaluators: Number(row.warning_evaluators ?? 0),
      activeEvaluators: Number(row.active_evaluators ?? 0),
    },
  ])
)

let missingInActivity = 0
let missingInRuleSheet = 0
const mismatches = []

for (const run of runs) {
  const weekIndex = weeks.findIndex((week) => Number(week.week_id) === Number(run.week_id))
  if (weekIndex === -1) {
    mismatches.push(`run ${run.rule_run_id}: week ${run.week_id} missing in week_snapshots`)
    continue
  }

  const tabKey = orderedTabs[weekIndex]
  const rowId = `rule-${Number(run.week_id)}-${Number(run.rule_id)}`
  const activityRule = activityByTab?.[tabKey]?.rules?.find((rule) => rule.id === rowId)
  const ruleSheet = ruleSheetByRuleRowId?.[rowId]

  const expectedStatus = toUiStatus(run.status)
  const expectedMetric = `${Number(run.rounded_coverage)}%`
  const expectedAssignments = `${Number(run.assigned_assignments)}/${Number(run.expected_assignments)}`
  const expectedProgressLabel = `${expectedMetric} (${expectedAssignments})`

  if (!activityRule) {
    missingInActivity += 1
    mismatches.push(`${rowId}: missing in mockDbActivityByTab.${String(tabKey)}.rules`)
  } else {
    if (activityRule.status !== expectedStatus) {
      mismatches.push(
        `${rowId}: activity status mismatch (db=${expectedStatus}, ui=${activityRule.status})`
      )
    }

    if (activityRule.metric !== expectedMetric) {
      mismatches.push(
        `${rowId}: activity metric mismatch (db=${expectedMetric}, ui=${activityRule.metric})`
      )
    }

    if (activityRule.assignments !== expectedAssignments) {
      mismatches.push(
        `${rowId}: activity assignments mismatch (db=${expectedAssignments}, ui=${activityRule.assignments})`
      )
    }
  }

  if (!ruleSheet) {
    missingInRuleSheet += 1
    mismatches.push(`${rowId}: missing in mockDbRuleSheetByRuleRowId`)
  } else {
    if (ruleSheet.status !== expectedStatus) {
      mismatches.push(
        `${rowId}: sheet status mismatch (db=${expectedStatus}, ui=${ruleSheet.status})`
      )
    }

    if (ruleSheet.progressLabel !== expectedProgressLabel) {
      mismatches.push(
        `${rowId}: sheet progress mismatch (db=${expectedProgressLabel}, ui=${ruleSheet.progressLabel})`
      )
    }

    const agentCounts = agentCountsMap.get(Number(run.rule_run_id)) ?? {
      warningAgents: 0,
      coveredAgents: 0,
      quotaAgents: 0,
    }
    const evaluatorCounts = evaluatorCountsMap.get(Number(run.rule_run_id)) ?? {
      warningEvaluators: 0,
      activeEvaluators: 0,
    }

    const expectedWarningAgents = (activityRule?.mainPageReasonLines ?? []).reduce(
      (total, reasonLine) => total + getReasonLineAgentCount(reasonLine),
      0
    )
    const expectedCoveredAgents = Math.min(agentCounts.coveredAgents, 10)
    const expectedQuotaAgents = Math.min(agentCounts.quotaAgents, 6)
    const expectedActiveEvaluators = Math.min(evaluatorCounts.activeEvaluators, 8)

    if ((ruleSheet.agentsWithoutQa?.length ?? 0) !== expectedWarningAgents) {
      mismatches.push(
        `${rowId}: agentsWithoutQa count mismatch (db=${expectedWarningAgents}, ui=${ruleSheet.agentsWithoutQa?.length ?? 0})`
      )
    }

    if ((ruleSheet.coveredAgents?.length ?? 0) !== expectedCoveredAgents) {
      mismatches.push(
        `${rowId}: coveredAgents count mismatch (db=${expectedCoveredAgents}, ui=${ruleSheet.coveredAgents?.length ?? 0})`
      )
    }

    if ((ruleSheet.quotaMetElsewhere?.length ?? 0) !== expectedQuotaAgents) {
      mismatches.push(
        `${rowId}: quotaMetElsewhere count mismatch (db=${expectedQuotaAgents}, ui=${ruleSheet.quotaMetElsewhere?.length ?? 0})`
      )
    }

    if (expectedWarningAgents === 0 && (ruleSheet.evaluatorsWithIssues?.length ?? 0) !== 0) {
      mismatches.push(
        `${rowId}: evaluatorsWithIssues should be 0 when agentsWithoutQa is 0 (ui=${ruleSheet.evaluatorsWithIssues?.length ?? 0})`
      )
    }

    if (expectedWarningAgents > 0 && (ruleSheet.evaluatorsWithIssues?.length ?? 0) === 0) {
      mismatches.push(
        `${rowId}: evaluatorsWithIssues should be > 0 when agentsWithoutQa is > 0`
      )
    }

    if ((ruleSheet.activeEvaluators?.length ?? 0) !== expectedActiveEvaluators) {
      mismatches.push(
        `${rowId}: activeEvaluators count mismatch (db=${expectedActiveEvaluators}, ui=${ruleSheet.activeEvaluators?.length ?? 0})`
      )
    }
  }
}

const summary = {
  db: dbPath,
  generatedFile: dataPath,
  totals: {
    tabs: orderedTabs.length,
    weeks: weeks.length,
    runs: runs.length,
  },
  missingInActivity,
  missingInRuleSheet,
  mismatchCount: mismatches.length,
}

console.log(JSON.stringify(summary, null, 2))

if (mismatches.length > 0) {
  console.log("")
  console.log("Mismatches:")
  for (const mismatch of mismatches.slice(0, 50)) {
    console.log(`- ${mismatch}`)
  }
  process.exit(1)
}
