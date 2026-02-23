PRAGMA foreign_keys = ON;

BEGIN;

DELETE FROM week_alert_summary;
DELETE FROM evaluator_coverage_detail;
DELETE FROM agent_coverage_detail;
DELETE FROM rule_issue_summary;
DELETE FROM rule_runs;
DELETE FROM issue_catalog;
DELETE FROM rule_evaluators;
DELETE FROM rule_teams;
DELETE FROM rules;
DELETE FROM evaluators;
DELETE FROM agents;
DELETE FROM teams;
DELETE FROM sqlite_sequence WHERE name IN ('rule_runs', 'agent_coverage_detail', 'evaluator_coverage_detail');

INSERT INTO teams (team_id, team_name) VALUES
  (1, 'Legacy Escalations'),
  (2, 'Mortgage Support'),
  (3, 'Renewals'),
  (4, 'Savings Operations'),
  (5, 'Weekend Escalations'),
  (6, 'Claims Exceptions'),
  (7, 'Billing Support'),
  (8, 'Card Disputes'),
  (9, 'Onboarding'),
  (10, 'Overflow Bench');

WITH RECURSIVE nums(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 200
)
INSERT INTO agents (agent_id, agent_name, team_id, is_active)
SELECT
  n,
  printf('Agent %03d', n),
  ((n - 1) / 20) + 1,
  1
FROM nums;

WITH RECURSIVE nums(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 42
)
INSERT INTO evaluators (evaluator_id, evaluator_name, home_team_id, is_active)
SELECT
  n,
  printf('Evaluator %02d', n),
  ((n - 1) % 9) + 1,
  1
FROM nums;

INSERT INTO rules (rule_id, rule_name, rule_type, is_active) VALUES
  (1, 'Legacy Escalation QA', 'agent_evaluation', 1),
  (2, 'Mortgage Queue', 'agent_evaluation', 1),
  (3, 'Renewals - TL Review Batch', 'agent_evaluation', 1),
  (4, 'Savings Product - QA Rotation', 'agent_evaluation', 1),
  (5, 'Escalation Sweep - Weekend Priority', 'agent_evaluation', 1),
  (6, 'Claims Exception Queue', 'agent_evaluation', 1),
  (7, 'Billing QA', 'agent_evaluation', 1),
  (8, 'Card Disputes QA', 'agent_evaluation', 1),
  (9, 'Onboarding Calls QA', 'agent_evaluation', 1);

INSERT INTO rule_teams (rule_id, team_id)
SELECT r.rule_id, t.team_id
FROM rules r
JOIN teams t ON t.team_id <= 9
WHERE NOT (
  (r.rule_id = 1 AND t.team_id = 3) OR
  (r.rule_id = 4 AND t.team_id = 6) OR
  (r.rule_id = 7 AND t.team_id = 9)
);

WITH base_slots(slot) AS (
  VALUES (1), (2), (3), (4)
)
INSERT INTO rule_evaluators (rule_id, evaluator_id, workload_limit)
SELECT
  r.rule_id,
  ((r.rule_id - 1) * 4) + s.slot,
  20 + ((r.rule_id + s.slot) % 6)
FROM rules r
JOIN base_slots s;

INSERT INTO rule_evaluators (rule_id, evaluator_id, workload_limit) VALUES
  (2, 37, 24),
  (5, 38, 25),
  (8, 39, 23);

WITH RECURSIVE week_index(n, start_date) AS (
  SELECT 1, date('2025-09-29')
  UNION ALL
  SELECT n + 1, date(start_date, '+7 days')
  FROM week_index
  WHERE n < 23
),
week_bounds AS (
  SELECT
    n AS week_id,
    start_date,
    date(start_date, '+6 days') AS end_date,
    strftime('%m', start_date) AS start_month_num,
    strftime('%m', date(start_date, '+6 days')) AS end_month_num,
    CAST(strftime('%d', start_date) AS INTEGER) AS start_day_num,
    CAST(strftime('%d', date(start_date, '+6 days')) AS INTEGER) AS end_day_num
  FROM week_index
),
week_labels AS (
  SELECT
    wb.week_id,
    wb.start_date,
    wb.end_date,
    CASE wb.start_month_num
      WHEN '01' THEN 'Jan'
      WHEN '02' THEN 'Feb'
      WHEN '03' THEN 'Mar'
      WHEN '04' THEN 'Apr'
      WHEN '05' THEN 'May'
      WHEN '06' THEN 'Jun'
      WHEN '07' THEN 'Jul'
      WHEN '08' THEN 'Aug'
      WHEN '09' THEN 'Sep'
      WHEN '10' THEN 'Oct'
      WHEN '11' THEN 'Nov'
      ELSE 'Dec'
    END AS start_month_label,
    CASE wb.end_month_num
      WHEN '01' THEN 'Jan'
      WHEN '02' THEN 'Feb'
      WHEN '03' THEN 'Mar'
      WHEN '04' THEN 'Apr'
      WHEN '05' THEN 'May'
      WHEN '06' THEN 'Jun'
      WHEN '07' THEN 'Jul'
      WHEN '08' THEN 'Aug'
      WHEN '09' THEN 'Sep'
      WHEN '10' THEN 'Oct'
      WHEN '11' THEN 'Nov'
      ELSE 'Dec'
    END AS end_month_label,
    wb.start_month_num,
    wb.end_month_num,
    wb.start_day_num,
    wb.end_day_num
  FROM week_bounds wb
)
INSERT INTO week_snapshots (week_id, week_label, start_date, end_date, week_state, mode, is_default_expanded)
SELECT
  wl.week_id,
  CASE
    WHEN wl.start_month_num = wl.end_month_num
      THEN wl.start_month_label || ' ' || wl.start_day_num || '-' || wl.end_day_num
    ELSE wl.start_month_label || ' ' || wl.start_day_num || '-' || wl.end_month_label || ' ' || wl.end_day_num
  END AS week_label,
  wl.start_date,
  wl.end_date,
  CASE
    WHEN wl.start_date = '2026-03-02' THEN 'upcoming'
    WHEN wl.start_date = '2026-02-23' THEN 'in_progress'
    ELSE 'past'
  END AS week_state,
  CASE
    WHEN wl.start_date = '2026-03-02' THEN 'predicted'
    ELSE 'actual'
  END AS mode,
  CASE
    WHEN wl.start_date IN ('2026-03-02', '2026-02-23') THEN 1
    ELSE 0
  END AS is_default_expanded
FROM week_labels wl;

INSERT INTO issue_catalog (
  issue_code,
  label,
  hover_text,
  issue_group,
  scope,
  allowed_in_upcoming,
  counts_as_failure,
  allowed_on_rule_card,
  allowed_on_week_alert,
  allowed_in_sidesheet
) VALUES
  (
    'AGENT_NOT_IN_ANY_RULE',
    'Agent not in any rule',
    'This agent is not included in any active assignment rule.',
    'coverage',
    'cross_rule',
    1,
    1,
    0,
    1,
    1
  ),
  (
    'NO_CONVERSATIONS_IN_PERIOD',
    'No conversations in period',
    'Agent had zero conversations during the sampling window.',
    'coverage',
    'agent',
    0,
    1,
    1,
    0,
    1
  ),
  (
    'NO_MATCHING_CONVERSATIONS',
    'Conversations did not match filters',
    'Conversations existed but none matched the rule filters.',
    'coverage',
    'agent',
    1,
    1,
    1,
    1,
    1
  ),
  (
    'ALL_EVALUATORS_AT_CAPACITY',
    'All evaluators at capacity',
    'Eligible conversations existed but evaluator workload limits were reached.',
    'capacity',
    'rule',
    1,
    1,
    1,
    1,
    1
  ),
  (
    'EVALUATOR_UNAVAILABLE',
    'Evaluator unavailable',
    'Evaluator was unavailable or on leave.',
    'capacity',
    'evaluator',
    1,
    1,
    1,
    1,
    1
  ),
  (
    'RULE_DID_NOT_EXECUTE',
    'Rule did not execute',
    'Rule was scheduled but did not run due to a system error.',
    'system',
    'rule',
    0,
    1,
    1,
    0,
    1
  ),
  (
    'RULE_EXECUTION_INTERRUPTED',
    'Rule execution interrupted',
    'Rule started but timed out before processing all agents.',
    'system',
    'rule',
    0,
    1,
    1,
    0,
    1
  ),
  (
    'QUOTA_MET_BY_ANOTHER_RULE',
    'Quota met by another rule',
    'Agent goal was already satisfied by another rule.',
    'informational',
    'agent',
    1,
    0,
    0,
    0,
    1
  );

WITH run_base AS (
  SELECT
    w.week_id,
    r.rule_id,
    w.mode AS run_kind,
    w.start_date,
    w.end_date,
    (58 + ((w.week_id * 13 + r.rule_id * 7) % 35)) AS expected_assignments,
    CASE
      WHEN w.week_state = 'upcoming' THEN
        CASE
          WHEN ((w.week_id + r.rule_id) % 5) = 0 THEN (3 + ((w.week_id + r.rule_id) % 7))
          ELSE 0
        END
      ELSE
        CASE
          WHEN ((w.week_id + r.rule_id) % 13) = 0 THEN (58 + ((w.week_id * 13 + r.rule_id * 7) % 35))
          WHEN ((w.week_id + r.rule_id) % 4) = 0 THEN (2 + ((w.week_id + r.rule_id) % 9))
          ELSE 0
        END
    END AS missed_assignments
  FROM week_snapshots w
  CROSS JOIN rules r
)
INSERT INTO rule_runs (
  week_id,
  rule_id,
  run_kind,
  status,
  expected_assignments,
  assigned_assignments,
  ran_at,
  next_run_at,
  sampling_start_date,
  sampling_end_date
)
SELECT
  rb.week_id,
  rb.rule_id,
  rb.run_kind,
  CASE
    WHEN rb.run_kind = 'predicted' AND rb.missed_assignments = 0 THEN 'on_track'
    WHEN rb.run_kind = 'predicted' THEN 'at_risk'
    WHEN rb.missed_assignments = 0 THEN 'success'
    WHEN rb.missed_assignments = rb.expected_assignments THEN 'failed'
    ELSE 'partial'
  END AS status,
  rb.expected_assignments,
  MAX(rb.expected_assignments - rb.missed_assignments, 0),
  CASE
    WHEN rb.run_kind = 'actual'
      THEN datetime(rb.start_date, printf('+%d days', (rb.rule_id + rb.week_id) % 5), printf('+%d hours', 8 + (rb.rule_id % 9)))
    ELSE NULL
  END,
  CASE
    WHEN rb.run_kind = 'predicted'
      THEN datetime(rb.start_date, printf('+%d days', (rb.rule_id + 1) % 6), printf('+%d hours', 8 + (rb.rule_id % 8)))
    ELSE NULL
  END,
  date(rb.start_date, '-7 days'),
  date(rb.start_date, '-1 day')
FROM run_base rb;

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'RULE_DID_NOT_EXECUTE',
  rr.expected_assignments,
  0,
  'Rule did not execute due to a system error.'
FROM rule_runs rr
JOIN week_snapshots ws ON ws.week_id = rr.week_id
WHERE rr.status = 'failed'
  AND ws.week_state <> 'upcoming';

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'ALL_EVALUATORS_AT_CAPACITY',
  8 + ((rr.rule_id + rr.week_id) % 7),
  2 + (rr.rule_id % 3),
  printf('%d agents unassigned due to evaluator capacity reached', 8 + ((rr.rule_id + rr.week_id) % 7))
FROM rule_runs rr
JOIN week_snapshots ws ON ws.week_id = rr.week_id
WHERE (
  (rr.status = 'partial' AND ((rr.rule_id + rr.week_id) % 2) = 1) OR
  (rr.status = 'at_risk' AND ((rr.rule_id + rr.week_id) % 2) = 1)
);

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'NO_MATCHING_CONVERSATIONS',
  4 + ((rr.rule_id * rr.week_id) % 6),
  0,
  printf('%d agents had no matching conversations', 4 + ((rr.rule_id * rr.week_id) % 6))
FROM rule_runs rr
JOIN week_snapshots ws ON ws.week_id = rr.week_id
WHERE (
  (rr.status = 'partial' AND ((rr.rule_id + rr.week_id) % 2) = 0) OR
  (rr.status = 'at_risk' AND ((rr.rule_id + rr.week_id) % 2) = 0)
);

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'EVALUATOR_UNAVAILABLE',
  1 + ((rr.rule_id + rr.week_id) % 4),
  1 + ((rr.rule_id + rr.week_id) % 3),
  printf('%d agents unassigned due to evaluator unavailability', 1 + ((rr.rule_id + rr.week_id) % 4))
FROM rule_runs rr
WHERE rr.status IN ('partial', 'at_risk')
  AND ((rr.rule_id + rr.week_id) % 3) = 0;

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'NO_CONVERSATIONS_IN_PERIOD',
  1 + ((rr.rule_id * 2 + rr.week_id) % 5),
  0,
  printf('%d agents had no conversations in period', 1 + ((rr.rule_id * 2 + rr.week_id) % 5))
FROM rule_runs rr
JOIN week_snapshots ws ON ws.week_id = rr.week_id
WHERE rr.status = 'partial'
  AND ws.week_state <> 'upcoming'
  AND ((rr.rule_id + rr.week_id) % 5) = 0;

INSERT INTO rule_issue_summary (
  rule_run_id,
  issue_code,
  affected_agents_count,
  affected_evaluators_count,
  reason_line
)
SELECT
  rr.rule_run_id,
  'RULE_EXECUTION_INTERRUPTED',
  2 + ((rr.rule_id + rr.week_id) % 4),
  0,
  printf('%d agents not processed as the rule did not execute fully', 2 + ((rr.rule_id + rr.week_id) % 4))
FROM rule_runs rr
JOIN week_snapshots ws ON ws.week_id = rr.week_id
WHERE rr.status = 'partial'
  AND ws.week_state <> 'upcoming'
  AND ((rr.rule_id + rr.week_id) % 7) = 0;

WITH run_agents AS (
  SELECT
    rr.rule_run_id,
    rr.week_id,
    rr.rule_id,
    rr.run_kind,
    rr.status,
    a.agent_id,
    CASE
      WHEN rr.status = 'success' THEN 1
      WHEN rr.status = 'failed' THEN 0
      WHEN ((a.agent_id + rr.rule_id * 3 + rr.week_id * 5) % 11) = 0 THEN 0
      ELSE 1
    END AS assignments_made
  FROM rule_runs rr
  JOIN rule_teams rt ON rt.rule_id = rr.rule_id
  JOIN agents a ON a.team_id = rt.team_id
),
classified AS (
  SELECT
    ra.*,
    CASE
      WHEN ra.assignments_made = 1 THEN 'covered'
      WHEN ra.run_kind = 'predicted' THEN 'at_risk'
      ELSE 'not_covered'
    END AS coverage_state,
    CASE
      WHEN ra.assignments_made = 1 THEN NULL
      WHEN ra.status = 'failed' THEN 'RULE_DID_NOT_EXECUTE'
      WHEN ra.run_kind = 'actual' AND ((ra.agent_id + ra.rule_id + ra.week_id) % 5) = 0 THEN 'NO_CONVERSATIONS_IN_PERIOD'
      WHEN ((ra.agent_id + ra.rule_id + ra.week_id) % 3) = 0 THEN 'NO_MATCHING_CONVERSATIONS'
      WHEN ((ra.agent_id + ra.rule_id + ra.week_id) % 3) = 1 THEN 'ALL_EVALUATORS_AT_CAPACITY'
      ELSE 'EVALUATOR_UNAVAILABLE'
    END AS issue_code
  FROM run_agents ra
)
INSERT INTO agent_coverage_detail (
  week_id,
  rule_run_id,
  agent_id,
  coverage_state,
  issue_code,
  assignment_goal,
  assignments_made,
  eligible_conversations,
  matching_conversations,
  unassigned_conversations,
  last_covered_week_id,
  context_note
)
SELECT
  c.week_id,
  c.rule_run_id,
  c.agent_id,
  c.coverage_state,
  c.issue_code,
  1,
  COALESCE(c.assignments_made, 0),
  CASE
    WHEN c.issue_code IN ('NO_CONVERSATIONS_IN_PERIOD', 'RULE_DID_NOT_EXECUTE') THEN 0
    ELSE 2 + ((c.agent_id + c.rule_id) % 6)
  END,
  CASE
    WHEN c.issue_code IN ('NO_CONVERSATIONS_IN_PERIOD', 'NO_MATCHING_CONVERSATIONS', 'RULE_DID_NOT_EXECUTE') THEN 0
    ELSE 1 + ((c.agent_id + c.week_id) % 4)
  END,
  CASE
    WHEN c.issue_code IN ('ALL_EVALUATORS_AT_CAPACITY', 'EVALUATOR_UNAVAILABLE')
      THEN 1 + ((c.agent_id + c.rule_id + c.week_id) % 3)
    ELSE 0
  END,
  NULL,
  CASE
    WHEN c.issue_code = 'NO_MATCHING_CONVERSATIONS'
      THEN 'Conversations existed but did not match rule filters.'
    WHEN c.issue_code = 'NO_CONVERSATIONS_IN_PERIOD'
      THEN 'Agent had no conversations in the sampling window.'
    WHEN c.issue_code = 'ALL_EVALUATORS_AT_CAPACITY'
      THEN 'Eligible conversations could not be assigned due to evaluator workload limits.'
    WHEN c.issue_code = 'EVALUATOR_UNAVAILABLE'
      THEN 'Evaluator availability blocked assignment in this run.'
    WHEN c.issue_code = 'RULE_DID_NOT_EXECUTE'
      THEN 'Rule did not execute due to a system error.'
    ELSE NULL
  END
FROM classified c;

INSERT INTO agent_coverage_detail (
  week_id,
  rule_run_id,
  agent_id,
  coverage_state,
  issue_code,
  assignment_goal,
  assignments_made,
  eligible_conversations,
  matching_conversations,
  unassigned_conversations,
  context_note
)
SELECT
  ws.week_id,
  NULL,
  a.agent_id,
  CASE WHEN ws.week_state = 'upcoming' THEN 'at_risk' ELSE 'not_covered' END,
  'AGENT_NOT_IN_ANY_RULE',
  1,
  0,
  0,
  0,
  0,
  CASE
    WHEN ws.week_state = 'upcoming'
      THEN 'Agent is outside all active rule coverage for this upcoming week.'
    ELSE 'Agent was outside all active rules during this completed week.'
  END
FROM week_snapshots ws
JOIN agents a ON a.team_id = 10
WHERE ((a.agent_id + ws.week_id) % 3) <> 0;

INSERT INTO agent_coverage_detail (
  week_id,
  rule_run_id,
  agent_id,
  coverage_state,
  issue_code,
  assignment_goal,
  assignments_made,
  eligible_conversations,
  matching_conversations,
  unassigned_conversations,
  context_note
)
SELECT
  rr.week_id,
  rr.rule_run_id,
  ac.agent_id,
  'informational',
  'QUOTA_MET_BY_ANOTHER_RULE',
  1,
  1,
  1,
  1,
  0,
  'Coverage requirement already met by another rule in the same period.'
FROM rule_runs rr
JOIN (
  SELECT DISTINCT week_id, rule_run_id, agent_id
  FROM agent_coverage_detail
  WHERE coverage_state = 'covered'
) ac
  ON ac.week_id = rr.week_id
 AND ac.rule_run_id = rr.rule_run_id
WHERE rr.status IN ('success', 'partial', 'on_track', 'at_risk')
  AND (ac.agent_id % 53) = 0;

WITH run_evals AS (
  SELECT
    rr.rule_run_id,
    rr.week_id,
    rr.rule_id,
    rr.run_kind,
    rr.status,
    re.evaluator_id,
    re.workload_limit,
    CASE
      WHEN rr.status = 'success' THEN MAX(re.workload_limit - ((rr.week_id + re.evaluator_id) % 4), 0)
      WHEN rr.status = 'failed' THEN 0
      WHEN ((rr.week_id + rr.rule_id + re.evaluator_id) % 17) = 0 THEN 0
      ELSE MAX(re.workload_limit - (2 + ((rr.week_id + re.evaluator_id + rr.rule_id) % 7)), 0)
    END AS assignments_received
  FROM rule_runs rr
  JOIN rule_evaluators re ON re.rule_id = rr.rule_id
)
INSERT INTO evaluator_coverage_detail (
  week_id,
  rule_run_id,
  evaluator_id,
  evaluator_state,
  issue_code,
  workload_limit,
  assignments_received,
  context_note
)
SELECT
  re.week_id,
  re.rule_run_id,
  re.evaluator_id,
  CASE
    WHEN re.status = 'failed' THEN 'informational'
    WHEN re.run_kind = 'predicted' AND ((re.week_id + re.rule_id + re.evaluator_id) % 7) = 0 THEN 'at_risk'
    WHEN re.assignments_received = 0 THEN 'idle'
    ELSE 'active'
  END AS evaluator_state,
  CASE
    WHEN re.status = 'failed' THEN 'RULE_DID_NOT_EXECUTE'
    WHEN re.run_kind = 'predicted' AND ((re.week_id + re.rule_id + re.evaluator_id) % 7) = 0 THEN 'EVALUATOR_UNAVAILABLE'
    WHEN re.assignments_received = 0 THEN 'EVALUATOR_UNAVAILABLE'
    ELSE NULL
  END AS issue_code,
  re.workload_limit,
  re.assignments_received,
  CASE
    WHEN re.status = 'failed'
      THEN 'Rule did not execute; evaluator assignments were not processed.'
    WHEN re.run_kind = 'predicted' AND ((re.week_id + re.rule_id + re.evaluator_id) % 7) = 0
      THEN 'Evaluator has upcoming availability risk.'
    WHEN re.assignments_received = 0
      THEN 'Evaluator received zero assignments in this rule run.'
    ELSE NULL
  END
FROM run_evals re;

WITH agent_status AS (
  SELECT
    ac.week_id,
    ac.agent_id,
    MAX(CASE WHEN ac.coverage_state = 'covered' THEN 1 ELSE 0 END) AS has_any_coverage,
    MAX(CASE WHEN ac.issue_code = 'AGENT_NOT_IN_ANY_RULE' THEN 1 ELSE 0 END) AS is_not_in_any_rule,
    MAX(CASE WHEN ac.coverage_state IN ('not_covered', 'at_risk') THEN 1 ELSE 0 END) AS has_gap
  FROM agent_coverage_detail ac
  GROUP BY ac.week_id, ac.agent_id
)
INSERT INTO week_alert_summary (week_id, alert_code, entity_count)
SELECT
  ws.week_id,
  CASE WHEN ws.week_state = 'upcoming' THEN 'agents_at_risk' ELSE 'agents_not_covered' END AS alert_code,
  COUNT(*) AS entity_count
FROM week_snapshots ws
JOIN agent_status ast ON ast.week_id = ws.week_id
WHERE ast.is_not_in_any_rule = 1
   OR (ast.has_any_coverage = 0 AND ast.has_gap = 1)
GROUP BY ws.week_id, ws.week_state;

WITH evaluator_status AS (
  SELECT
    ec.week_id,
    ec.evaluator_id,
    MAX(CASE WHEN ec.evaluator_state = 'at_risk' THEN 1 ELSE 0 END) AS has_risk,
    MAX(CASE WHEN ec.assignments_received > 0 THEN 1 ELSE 0 END) AS has_workload
  FROM evaluator_coverage_detail ec
  GROUP BY ec.week_id, ec.evaluator_id
)
INSERT INTO week_alert_summary (week_id, alert_code, entity_count)
SELECT
  ws.week_id,
  CASE WHEN ws.week_state = 'upcoming' THEN 'evaluators_at_risk' ELSE 'evaluators_without_workload' END AS alert_code,
  CASE
    WHEN ws.week_state = 'upcoming' THEN SUM(CASE WHEN es.has_risk = 1 THEN 1 ELSE 0 END)
    ELSE SUM(CASE WHEN es.has_workload = 0 THEN 1 ELSE 0 END)
  END AS entity_count
FROM week_snapshots ws
JOIN evaluator_status es ON es.week_id = ws.week_id
GROUP BY ws.week_id, ws.week_state;

COMMIT;
