import type { TableSchema } from "../types";
import type { Filter, View } from "./types";

export function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function seedViewsFromSchema(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: TableSchema<any>
): View[] {
  return schema.tabs.map((tab) => {
    const filters: Filter[] = [];
    if (tab.seedFilters && tab.seedFilters.length > 0) {
      tab.seedFilters.forEach((sf, i) => {
        filters.push({ id: `seed-${tab.value}-${i}`, ...sf });
      });
    } else if (tab.filterKey && tab.filterValue !== undefined) {
      const col = schema.columns.find((c) => c.key === tab.filterKey);
      const isEnum = col?.type === "badge" || col?.type === "strength";
      filters.push({
        id: `seed-${tab.value}-${tab.filterKey}`,
        columnKey: tab.filterKey,
        operator: isEnum ? "is" : "equals",
        value:
          typeof tab.filterValue === "string" || typeof tab.filterValue === "number"
            ? (tab.filterValue as string | number)
            : String(tab.filterValue),
      });
    }
    return {
      id: `seed:${tab.value}`,
      label: tab.label,
      filters,
      isSeed: true,
    };
  });
}

function normalizeFilter(f: Filter): string {
  const v = Array.isArray(f.value) ? [...f.value].sort().join("|") : String(f.value ?? "");
  return `${f.columnKey}::${f.operator}::${v}`;
}

export function filtersEqual(a: Filter[], b: Filter[]): boolean {
  if (a.length !== b.length) return false;
  const aKeys = a.map(normalizeFilter).sort();
  const bKeys = b.map(normalizeFilter).sort();
  return aKeys.every((k, i) => k === bKeys[i]);
}

export function viewsStorageKey(title: string) {
  return `crm-views:${title}`;
}

export function loadViews(key: string, fallback: View[]): View[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as View[];
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveViews(key: string, views: View[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(views));
  } catch {
    // ignore quota errors
  }
}
