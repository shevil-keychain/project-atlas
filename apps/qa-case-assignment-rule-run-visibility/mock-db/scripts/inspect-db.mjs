#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(__dirname, "..", "..")
const dbPath = path.resolve(appRoot, "mock-db", "qa_case_assignment_mock.sqlite")

function query(sql) {
  const raw = execFileSync("sqlite3", ["-json", dbPath, sql], { encoding: "utf8" }).trim()
  return raw ? JSON.parse(raw) : []
}

function argValue(flag, fallback = undefined) {
  const argIndex = process.argv.indexOf(flag)
  if (argIndex === -1) {
    return fallback
  }

  return process.argv[argIndex + 1] ?? fallback
}

const weekIdArg = argValue("--week")
const ruleIdArg = argValue("--rule")
const limitArg = Number.parseInt(argValue("--limit", "10"), 10)
const asJson = process.argv.includes("--json")
const limit = Number.isFinite(limitArg) && limitArg > 0 ? limitArg : 10

const tables = query(`
  SELECT name
  FROM sqlite_master
  WHERE type = 'table'
  ORDER BY name ASC;
`)

const weeks = query(`
  SELECT
    ws.week_id,
    ws.week_label,
    ws.week_state,
    ws.start_date,
    ws.end_date
  FROM week_snapshots ws
  ORDER BY date(ws.start_date) DESC
  LIMIT ${limit};
`)

const runsWhere = []
if (weekIdArg) {
  runsWhere.push(`rr.week_id = ${Number(weekIdArg)}`)
}
if (ruleIdArg) {
  runsWhere.push(`rr.rule_id = ${Number(ruleIdArg)}`)
}
const runsFilter = runsWhere.length > 0 ? `WHERE ${runsWhere.join(" AND ")}` : ""

const runs = query(`
  SELECT
    rr.rule_run_id,
    rr.week_id,
    rr.rule_id,
    r.rule_name,
    rr.status,
    rr.run_kind,
    rr.coverage_pct,
    rr.assigned_assignments,
    rr.expected_assignments,
    rr.ran_at,
    rr.next_run_at
  FROM rule_runs rr
  JOIN rules r ON r.rule_id = rr.rule_id
  ${runsFilter}
  ORDER BY rr.week_id DESC, rr.rule_id ASC
  LIMIT ${limit};
`)

const issues = query(`
  SELECT
    ris.rule_run_id,
    ris.issue_code,
    ris.affected_agents_count,
    ris.reason_line
  FROM rule_issue_summary ris
  ${
    runs.length > 0
      ? `WHERE ris.rule_run_id IN (${runs.map((run) => Number(run.rule_run_id)).join(", ")})`
      : "WHERE 1 = 0"
  }
  ORDER BY ris.rule_run_id ASC, ris.issue_code ASC;
`)

const payload = {
  dbPath,
  filters: {
    weekId: weekIdArg ? Number(weekIdArg) : null,
    ruleId: ruleIdArg ? Number(ruleIdArg) : null,
    limit,
  },
  summary: {
    tableCount: tables.length,
    weekCount: weeks.length,
    runCount: runs.length,
    issueCount: issues.length,
  },
  tables,
  weeks,
  runs,
  issues,
}

if (asJson) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`)
  process.exit(0)
}

console.log(`Database: ${dbPath}`)
console.log("")
console.log(`Tables (${tables.length}):`)
console.log(tables.map((table) => `- ${table.name}`).join("\n"))
console.log("")
console.log(`Weeks (latest ${weeks.length}):`)
for (const week of weeks) {
  console.log(
    `- week_id=${week.week_id} | ${week.week_label} | state=${week.week_state} | ${week.start_date} -> ${week.end_date}`
  )
}
console.log("")
console.log(`Rule runs (${runs.length} shown):`)
for (const run of runs) {
  console.log(
    `- run_id=${run.rule_run_id} | week=${run.week_id} rule=${run.rule_id} | ${run.rule_name} | status=${run.status} | coverage=${Math.round(Number(run.coverage_pct ?? 0))}% | assignments=${run.assigned_assignments}/${run.expected_assignments}`
  )
}
if (runs.length > 0) {
  console.log("")
  console.log(`Issue summary rows (${issues.length}):`)
  for (const issue of issues) {
    console.log(
      `- run_id=${issue.rule_run_id} | ${issue.issue_code} | affected=${issue.affected_agents_count} | ${issue.reason_line ?? "no reason_line"}`
    )
  }
}

