"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select";

const DAYS = 365;
const MAX = 5;

// Deterministic, sparse activity over a year:
//  • Days 0–75: consistent moderate activity (Jun–Aug)
//  • Days 75–150: blank (Sep–Oct)
//  • Days 150–175: low activity burst (early Nov)
//  • Days 175–245: blank (Nov–Jan)
//  • Days 245–270: low activity burst (Feb)
//  • Days 270–365: blank (Mar–May)
const dailyCounts: number[] = Array.from({ length: DAYS }, (_, i) => {
  const rand = ((i * 9301 + 49297) % 233280) / 233280;
  if (i < 75) {
    // consistent moderate activity, with occasional rest days
    if (rand < 0.25) return 0;
    return Math.max(1, Math.round(rand * 3 + 1));
  }
  if (i >= 150 && i < 175) {
    // low burst
    if (rand < 0.55) return 0;
    return Math.max(1, Math.round(rand * 2));
  }
  if (i >= 245 && i < 270) {
    // low burst
    if (rand < 0.6) return 0;
    return Math.max(1, Math.round(rand * 2));
  }
  return 0;
});

const totals = {
  total: dailyCounts.reduce((a, b) => a + b, 0),
  emails: 142,
  calls: 38,
  meetings: 17,
  notes: 24,
};

const monthLabels = [
  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar", "Apr", "May",
];

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-12 text-text-secondary">{label}</span>
      <span className="text-18 font-semibold text-text-primary">{value}</span>
    </div>
  );
}

export function ActivityTimeline() {
  return (
    <section className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-16 border-b border-border-default px-20 py-16">
        <h3 className="text-14 font-semibold text-text-primary">Activity over the past year</h3>
        <div className="flex items-center gap-8">
          <Select defaultValue="all-team">
            <SelectTrigger className="h-32 w-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-team">Filter by team members</SelectItem>
              <SelectItem value="me">Just me</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="last-year">
            <SelectTrigger className="h-32 w-128">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last month</SelectItem>
              <SelectItem value="last-quarter">Last quarter</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-48 border-b border-border-default px-20 py-16">
        <SummaryStat label="Total activity" value={totals.total} />
        <SummaryStat label="Emails" value={totals.emails} />
        <SummaryStat label="Calls" value={totals.calls} />
        <SummaryStat label="Meetings" value={totals.meetings} />
        <SummaryStat label="Notes" value={totals.notes} />
      </div>

      {/* Chart */}
      <div className="flex flex-col gap-8 px-20 py-20">
        <div className="flex h-128 items-end">
          {dailyCounts.map((count, i) => {
            const heightPct = count === 0 ? 4 : (count / MAX) * 100;
            const color =
              count === 0
                ? "bg-border-subtle"
                : count === 1
                  ? "bg-warning-400"
                  : count === 2
                    ? "bg-warning-500"
                    : count === 3
                      ? "bg-success-300"
                      : count === 4
                        ? "bg-success-400"
                        : "bg-success-500";
            return (
              <div
                key={i}
                className={`flex-1 ${color}`}
                style={{ height: `${heightPct}%` }}
                title={`Day ${i + 1}: ${count} ${count === 1 ? "activity" : "activities"}`}
              />
            );
          })}
        </div>

        {/* Month axis */}
        <div className="flex">
          {monthLabels.map((m) => (
            <span key={m} className="flex-1 text-center text-12 text-text-tertiary">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
