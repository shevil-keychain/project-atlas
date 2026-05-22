const RELATIVE_UNIT_DAYS: Record<string, number> = {
  day: 1,
  days: 1,
  week: 7,
  weeks: 7,
  month: 30,
  months: 30,
  year: 365,
  years: 365,
};

export function parseRelativeDaysAgo(value: unknown): number {
  const str = String(value ?? "").trim().toLowerCase();
  if (!str) return Number.POSITIVE_INFINITY;
  if (str === "today" || str === "just now") return 0;
  if (str === "yesterday") return 1;
  const match = str.match(/^(\d+)\s+(day|days|week|weeks|month|months|year|years)\s+ago$/);
  if (!match) return Number.POSITIVE_INFINITY;
  return Number(match[1]) * RELATIVE_UNIT_DAYS[match[2]];
}
