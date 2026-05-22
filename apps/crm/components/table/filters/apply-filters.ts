import { parseRelativeDaysAgo } from "../relative-time";
import type { ColumnDef } from "../types";
import type { Filter } from "./types";

function isEmptyValue(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string" && v.trim() === "") return true;
  if (typeof v === "number" && Number.isNaN(v)) return true;
  return false;
}

function evalFilter(row: Record<string, unknown>, filter: Filter, col: ColumnDef): boolean {
  const raw = row[filter.columnKey];

  switch (filter.operator) {
    case "is_empty":
      return isEmptyValue(raw);
    case "is_not_empty":
      return !isEmptyValue(raw);
  }

  if (col.sortKind === "relative-time") {
    const days = parseRelativeDaysAgo(raw);
    const target = typeof filter.value === "number" ? filter.value : Number(filter.value);
    if (Number.isNaN(target)) return false;
    switch (filter.operator) {
      case "eq": return days === target;
      case "neq": return days !== target;
      case "gt": return days > target;
      case "gte": return days >= target;
      case "lt": return days < target;
      case "lte": return days <= target;
    }
  }

  if (col.type === "number") {
    const n = typeof raw === "number" ? raw : Number(raw);
    const target = typeof filter.value === "number" ? filter.value : Number(filter.value);
    if (Number.isNaN(n) || Number.isNaN(target)) return false;
    switch (filter.operator) {
      case "eq": return n === target;
      case "neq": return n !== target;
      case "gt": return n > target;
      case "gte": return n >= target;
      case "lt": return n < target;
      case "lte": return n <= target;
    }
  }

  if (col.type === "badge" || col.type === "strength") {
    const cell = String(raw ?? "");
    switch (filter.operator) {
      case "is": return cell === String(filter.value ?? "");
      case "is_not": return cell !== String(filter.value ?? "");
      case "is_any_of": {
        const arr = Array.isArray(filter.value) ? filter.value : [];
        return arr.includes(cell);
      }
      case "is_none_of": {
        const arr = Array.isArray(filter.value) ? filter.value : [];
        return !arr.includes(cell);
      }
    }
  }

  const haystack = String(raw ?? "").toLowerCase();
  const needle = String(filter.value ?? "").toLowerCase();
  switch (filter.operator) {
    case "contains": return haystack.includes(needle);
    case "not_contains": return !haystack.includes(needle);
    case "equals": return haystack === needle;
    case "not_equals": return haystack !== needle;
    case "is": return haystack === needle;
    case "is_not": return haystack !== needle;
    case "is_any_of": {
      const arr = Array.isArray(filter.value) ? filter.value : [];
      return arr.map((v) => String(v).toLowerCase()).includes(haystack);
    }
    case "is_none_of": {
      const arr = Array.isArray(filter.value) ? filter.value : [];
      return !arr.map((v) => String(v).toLowerCase()).includes(haystack);
    }
  }

  return true;
}

export function applyFilters(
  rows: Record<string, unknown>[],
  filters: Filter[],
  columns: ColumnDef[]
): Record<string, unknown>[] {
  const active = filters.filter((f) => {
    if (f.operator === "is_empty" || f.operator === "is_not_empty") return true;
    if (Array.isArray(f.value)) return f.value.length > 0;
    return f.value !== null && f.value !== undefined && String(f.value) !== "";
  });

  if (active.length === 0) return rows;

  const colByKey = new Map(columns.map((c) => [c.key, c]));

  return rows.filter((row) =>
    active.every((filter) => {
      const col = colByKey.get(filter.columnKey);
      if (!col) return true;
      return evalFilter(row, filter, col);
    })
  );
}
