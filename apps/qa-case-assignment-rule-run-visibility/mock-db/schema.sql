PRAGMA foreign_keys = ON;

BEGIN;

CREATE TABLE teams (
  team_id INTEGER PRIMARY KEY,
  team_name TEXT NOT NULL UNIQUE
);

CREATE TABLE agents (
  agent_id INTEGER PRIMARY KEY,
  agent_name TEXT NOT NULL,
  team_id INTEGER NOT NULL REFERENCES teams (team_id),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE INDEX idx_agents_team_id ON agents (team_id);

CREATE TABLE evaluators (
  evaluator_id INTEGER PRIMARY KEY,
  evaluator_name TEXT NOT NULL,
  home_team_id INTEGER NOT NULL REFERENCES teams (team_id),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE INDEX idx_evaluators_home_team_id ON evaluators (home_team_id);

CREATE TABLE rules (
  rule_id INTEGER PRIMARY KEY,
  rule_name TEXT NOT NULL UNIQUE,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('agent_evaluation', 'evaluator_calibration')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE rule_teams (
  rule_id INTEGER NOT NULL REFERENCES rules (rule_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams (team_id),
  PRIMARY KEY (rule_id, team_id)
);

CREATE INDEX idx_rule_teams_team_id ON rule_teams (team_id);

CREATE TABLE rule_evaluators (
  rule_id INTEGER NOT NULL REFERENCES rules (rule_id) ON DELETE CASCADE,
  evaluator_id INTEGER NOT NULL REFERENCES evaluators (evaluator_id),
  workload_limit INTEGER NOT NULL CHECK (workload_limit >= 1),
  PRIMARY KEY (rule_id, evaluator_id)
);

CREATE INDEX idx_rule_evaluators_eval_id ON rule_evaluators (evaluator_id);

CREATE TABLE week_snapshots (
  week_id INTEGER PRIMARY KEY,
  week_label TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  week_state TEXT NOT NULL CHECK (week_state IN ('upcoming', 'in_progress', 'past')),
  mode TEXT NOT NULL CHECK (mode IN ('predicted', 'actual')),
  is_default_expanded INTEGER NOT NULL DEFAULT 0 CHECK (is_default_expanded IN (0, 1)),
  CHECK (
    (week_state = 'upcoming' AND mode = 'predicted') OR
    (week_state IN ('in_progress', 'past') AND mode = 'actual')
  )
);

CREATE TABLE issue_catalog (
  issue_code TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  hover_text TEXT NOT NULL,
  issue_group TEXT NOT NULL CHECK (issue_group IN ('coverage', 'capacity', 'system', 'informational')),
  scope TEXT NOT NULL CHECK (scope IN ('agent', 'evaluator', 'rule', 'cross_rule')),
  allowed_in_upcoming INTEGER NOT NULL CHECK (allowed_in_upcoming IN (0, 1)),
  counts_as_failure INTEGER NOT NULL CHECK (counts_as_failure IN (0, 1)),
  allowed_on_rule_card INTEGER NOT NULL CHECK (allowed_on_rule_card IN (0, 1)),
  allowed_on_week_alert INTEGER NOT NULL CHECK (allowed_on_week_alert IN (0, 1)),
  allowed_in_sidesheet INTEGER NOT NULL CHECK (allowed_in_sidesheet IN (0, 1))
);

CREATE TABLE rule_runs (
  rule_run_id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_id INTEGER NOT NULL REFERENCES week_snapshots (week_id) ON DELETE CASCADE,
  rule_id INTEGER NOT NULL REFERENCES rules (rule_id),
  run_kind TEXT NOT NULL CHECK (run_kind IN ('predicted', 'actual')),
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'on_track', 'at_risk', 'success', 'partial', 'failed')),
  expected_assignments INTEGER NOT NULL CHECK (expected_assignments >= 0),
  assigned_assignments INTEGER NOT NULL CHECK (assigned_assignments >= 0 AND assigned_assignments <= expected_assignments),
  coverage_pct REAL GENERATED ALWAYS AS (
    CASE
      WHEN expected_assignments = 0 THEN 0
      ELSE ROUND((assigned_assignments * 100.0) / expected_assignments, 1)
    END
  ) STORED,
  ran_at TEXT,
  next_run_at TEXT,
  sampling_start_date TEXT NOT NULL,
  sampling_end_date TEXT NOT NULL,
  deleted_rule_snapshot_name TEXT,
  UNIQUE (week_id, rule_id),
  CHECK (
    (run_kind = 'predicted' AND status IN ('scheduled', 'on_track', 'at_risk') AND ran_at IS NULL) OR
    (run_kind = 'actual' AND status IN ('success', 'partial', 'failed') AND next_run_at IS NULL)
  )
);

CREATE INDEX idx_rule_runs_week_id ON rule_runs (week_id);
CREATE INDEX idx_rule_runs_rule_id ON rule_runs (rule_id);
CREATE INDEX idx_rule_runs_status ON rule_runs (status);

CREATE TABLE rule_issue_summary (
  rule_run_id INTEGER NOT NULL REFERENCES rule_runs (rule_run_id) ON DELETE CASCADE,
  issue_code TEXT NOT NULL REFERENCES issue_catalog (issue_code),
  affected_agents_count INTEGER NOT NULL DEFAULT 0 CHECK (affected_agents_count >= 0),
  affected_evaluators_count INTEGER NOT NULL DEFAULT 0 CHECK (affected_evaluators_count >= 0),
  reason_line TEXT NOT NULL,
  PRIMARY KEY (rule_run_id, issue_code)
);

CREATE TABLE agent_coverage_detail (
  agent_coverage_id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_id INTEGER NOT NULL REFERENCES week_snapshots (week_id) ON DELETE CASCADE,
  rule_run_id INTEGER REFERENCES rule_runs (rule_run_id) ON DELETE CASCADE,
  agent_id INTEGER NOT NULL REFERENCES agents (agent_id),
  coverage_state TEXT NOT NULL CHECK (coverage_state IN ('covered', 'not_covered', 'at_risk', 'informational')),
  issue_code TEXT REFERENCES issue_catalog (issue_code),
  assignment_goal INTEGER NOT NULL DEFAULT 1 CHECK (assignment_goal >= 0),
  assignments_made INTEGER NOT NULL DEFAULT 0 CHECK (assignments_made >= 0),
  eligible_conversations INTEGER NOT NULL DEFAULT 0 CHECK (eligible_conversations >= 0),
  matching_conversations INTEGER NOT NULL DEFAULT 0 CHECK (matching_conversations >= 0),
  unassigned_conversations INTEGER NOT NULL DEFAULT 0 CHECK (unassigned_conversations >= 0),
  last_covered_week_id INTEGER REFERENCES week_snapshots (week_id),
  context_note TEXT,
  CHECK (
    (coverage_state = 'covered' AND issue_code IS NULL) OR
    (coverage_state <> 'covered' AND issue_code IS NOT NULL)
  )
);

CREATE INDEX idx_agent_coverage_week_id ON agent_coverage_detail (week_id);
CREATE INDEX idx_agent_coverage_rule_run_id ON agent_coverage_detail (rule_run_id);
CREATE INDEX idx_agent_coverage_agent_id ON agent_coverage_detail (agent_id);
CREATE UNIQUE INDEX idx_agent_coverage_unique_scope
  ON agent_coverage_detail (week_id, COALESCE(rule_run_id, 0), agent_id, COALESCE(issue_code, ''));

CREATE TABLE evaluator_coverage_detail (
  evaluator_coverage_id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_id INTEGER NOT NULL REFERENCES week_snapshots (week_id) ON DELETE CASCADE,
  rule_run_id INTEGER NOT NULL REFERENCES rule_runs (rule_run_id) ON DELETE CASCADE,
  evaluator_id INTEGER NOT NULL REFERENCES evaluators (evaluator_id),
  evaluator_state TEXT NOT NULL CHECK (evaluator_state IN ('active', 'idle', 'at_risk', 'informational')),
  issue_code TEXT REFERENCES issue_catalog (issue_code),
  workload_limit INTEGER NOT NULL CHECK (workload_limit >= 0),
  assignments_received INTEGER NOT NULL CHECK (assignments_received >= 0 AND assignments_received <= workload_limit),
  context_note TEXT,
  CHECK (
    (evaluator_state = 'active' AND issue_code IS NULL) OR
    (evaluator_state <> 'active' AND issue_code IS NOT NULL)
  )
);

CREATE INDEX idx_eval_coverage_week_id ON evaluator_coverage_detail (week_id);
CREATE INDEX idx_eval_coverage_rule_run_id ON evaluator_coverage_detail (rule_run_id);
CREATE INDEX idx_eval_coverage_eval_id ON evaluator_coverage_detail (evaluator_id);
CREATE UNIQUE INDEX idx_eval_coverage_unique_scope
  ON evaluator_coverage_detail (week_id, rule_run_id, evaluator_id, COALESCE(issue_code, ''));

CREATE TABLE week_alert_summary (
  week_id INTEGER NOT NULL REFERENCES week_snapshots (week_id) ON DELETE CASCADE,
  alert_code TEXT NOT NULL CHECK (alert_code IN ('agents_not_covered', 'agents_at_risk', 'evaluators_without_workload', 'evaluators_at_risk')),
  entity_count INTEGER NOT NULL CHECK (entity_count >= 0),
  PRIMARY KEY (week_id, alert_code)
);

CREATE TRIGGER trg_rule_issue_guardrails
BEFORE INSERT ON rule_issue_summary
FOR EACH ROW
BEGIN
  SELECT CASE
    WHEN NEW.issue_code IN ('AGENT_NOT_IN_ANY_RULE', 'QUOTA_MET_BY_ANOTHER_RULE')
      THEN RAISE(ABORT, 'Cross-rule or informational issue cannot be inserted into rule_issue_summary')
  END;

  SELECT CASE
    WHEN (
      SELECT ws.week_state
      FROM rule_runs rr
      JOIN week_snapshots ws ON ws.week_id = rr.week_id
      WHERE rr.rule_run_id = NEW.rule_run_id
    ) = 'upcoming'
    AND NEW.issue_code IN ('RULE_DID_NOT_EXECUTE', 'RULE_EXECUTION_INTERRUPTED', 'NO_CONVERSATIONS_IN_PERIOD')
      THEN RAISE(ABORT, 'Upcoming runs cannot include system issues or no-conversations issue')
  END;
END;

CREATE TRIGGER trg_agent_coverage_guardrails
BEFORE INSERT ON agent_coverage_detail
FOR EACH ROW
BEGIN
  SELECT CASE
    WHEN NEW.issue_code = 'AGENT_NOT_IN_ANY_RULE' AND NEW.rule_run_id IS NOT NULL
      THEN RAISE(ABORT, 'AGENT_NOT_IN_ANY_RULE must be week-level (rule_run_id must be NULL)')
  END;

  SELECT CASE
    WHEN NEW.rule_run_id IS NULL AND NEW.issue_code <> 'AGENT_NOT_IN_ANY_RULE'
      THEN RAISE(ABORT, 'Only AGENT_NOT_IN_ANY_RULE is allowed for week-level agent rows')
  END;

  SELECT CASE
    WHEN (
      SELECT ws.week_state
      FROM week_snapshots ws
      WHERE ws.week_id = NEW.week_id
    ) = 'upcoming'
    AND NEW.issue_code IN ('RULE_DID_NOT_EXECUTE', 'RULE_EXECUTION_INTERRUPTED', 'NO_CONVERSATIONS_IN_PERIOD')
      THEN RAISE(ABORT, 'Upcoming week cannot contain system issues or no-conversations issue at agent level')
  END;
END;

CREATE TRIGGER trg_evaluator_coverage_guardrails
BEFORE INSERT ON evaluator_coverage_detail
FOR EACH ROW
BEGIN
  SELECT CASE
    WHEN (
      SELECT ws.week_state
      FROM rule_runs rr
      JOIN week_snapshots ws ON ws.week_id = rr.week_id
      WHERE rr.rule_run_id = NEW.rule_run_id
    ) = 'upcoming'
    AND NEW.issue_code IN ('RULE_DID_NOT_EXECUTE', 'RULE_EXECUTION_INTERRUPTED', 'NO_CONVERSATIONS_IN_PERIOD')
      THEN RAISE(ABORT, 'Upcoming week cannot contain invalid evaluator issues')
  END;
END;

COMMIT;
