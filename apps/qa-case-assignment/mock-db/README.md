# QA Case Assignment Mock DB

Use these commands from the repo root:

## 1) Regenerate UI data from SQLite

```bash
pnpm -C apps/qa-case-assignment run sync:mock-db-data
```

## 2) Verify DB -> UI mapping integrity

```bash
pnpm -C apps/qa-case-assignment run db:verify-sync
```

This checks:
- `rule_runs` -> `mockDbActivityByTab` rows
- `rule_runs` -> `mockDbRuleSheetByRuleRowId` rows
- Side-sheet list counts (agents/evaluators) against DB detail tables

It exits with a non-zero code when mismatches are found.

## 3) Inspect DB data quickly

```bash
pnpm -C apps/qa-case-assignment run db:inspect -- --limit 10
```

Filter to a specific side-sheet row:

```bash
pnpm -C apps/qa-case-assignment run db:inspect -- --week 23 --rule 7 --limit 20
```

JSON output:

```bash
pnpm -C apps/qa-case-assignment run db:inspect -- --week 23 --rule 7 --json
```
