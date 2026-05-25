"use client";

import { useState } from "react";
import { BarChart01 } from "@level/ui/components/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@level/ui/components/ui/dropdown-menu";
import { Button } from "@level/ui/components/ui/button";
import { ChevronDown } from "@level/ui/components/icons";
import { WidgetCard } from "../WidgetCard";
import { ActivityItem } from "./ActivityItem";
import { mockActivity, type Activity, type ActivityType } from "@/data/home/mockActivity";

type FilterOption = ActivityType | "all";

const FILTER_OPTIONS: Array<{ value: FilterOption; label: string }> = [
  { value: "all", label: "All activity" },
  { value: "email_received", label: "Emails" },
  { value: "call_logged", label: "Calls" },
  { value: "meeting_scheduled", label: "Meetings" },
  { value: "note_added", label: "Notes" },
  { value: "signal", label: "Signals" },
  { value: "task_completed", label: "Tasks completed" },
];

const EMAIL_TYPES: ActivityType[] = ["email_received", "email_sent"];
const MEETING_TYPES: ActivityType[] = ["meeting_scheduled", "meeting_completed"];

function matchesFilter(activityType: ActivityType, filter: FilterOption): boolean {
  if (filter === "all") return true;
  if (filter === "email_received") return EMAIL_TYPES.includes(activityType);
  if (filter === "meeting_scheduled") return MEETING_TYPES.includes(activityType);
  return activityType === filter;
}

function getDayLabel(isoStr: string): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const hours = diff / (1000 * 60 * 60);
  if (hours < 24) return "Today";
  if (hours < 48) return "Yesterday";
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function groupByDay(activities: Activity[]): Array<{ label: string; items: Activity[] }> {
  const groups = new Map<string, Activity[]>();
  for (const a of activities) {
    const label = getDayLabel(a.timestamp);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(a);
  }
  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
}

export function ActivityWidget() {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filtered = mockActivity.filter((a) => matchesFilter(a.type, filter));
  const groups = groupByDay(filtered);
  const activeLabel = FILTER_OPTIONS.find((o) => o.value === filter)?.label ?? "All activity";

  return (
    <WidgetCard
      icon={<BarChart01 size={16} />}
      title="Activity"
      headerActions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" iconRight={<ChevronDown size={12} />} className="h-28 text-12 px-10 text-text-secondary">
              {activeLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {FILTER_OPTIONS.map((opt) => (
              <DropdownMenuItem key={opt.value} onClick={() => setFilter(opt.value)}>
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      }
      bodyClassName="max-h-[480px]"
    >
      {groups.length === 0 ? (
        <div className="flex items-center justify-center px-20 py-32 text-14 text-text-tertiary">
          No activity yet.
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-12 px-20 py-8 sticky top-0 bg-surface-card z-10">
              <span className="text-12 font-semibold text-text-secondary uppercase tracking-wider">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-border-subtle" />
            </div>
            {group.items.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ))
      )}
    </WidgetCard>
  );
}
