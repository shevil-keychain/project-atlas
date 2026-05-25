"use client";

import { Plus } from "@level/ui/components/icons";
import { AvatarGroup } from "@level/ui/components/ui/avatar-group";
import { Badge } from "@level/ui/components/ui/badge";
import { Button } from "@level/ui/components/ui/button";
import { WidgetCard } from "../WidgetCard";
import { mockMeetings, type Meeting } from "@/data/home/mockMeetings";
import { cn } from "@level/ui/lib/utils";

const TODAY = new Date("2026-05-25T00:00:00");
const DEMO_NOW = new Date("2026-05-25T09:15:00");

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getMeetingsForDay(meetings: Meeting[], date: Date): Meeting[] {
  return meetings
    .filter((m) => isSameDay(new Date(m.startAt), date))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
}

function getNowMeeting(meetings: Meeting[]): Meeting | null {
  return (
    meetings.find(
      (m) => DEMO_NOW >= new Date(m.startAt) && DEMO_NOW <= new Date(m.endAt)
    ) ?? null
  );
}

function getMinsLeft(endAt: string): number {
  return Math.max(
    0,
    Math.round((new Date(endAt).getTime() - DEMO_NOW.getTime()) / 60000)
  );
}

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getDurationLabel(startAt: string, endAt: string): string {
  const mins = Math.round(
    (new Date(endAt).getTime() - new Date(startAt).getTime()) / 60000
  );
  if (mins < 60) return `${mins}m`;
  const hrs = mins / 60;
  return hrs === Math.floor(hrs) ? `${hrs}h` : `${hrs.toFixed(1)}h`;
}

const TYPE_DOT: Record<string, string> = {
  qbr: "bg-surface-warning",
  intro: "bg-surface-success",
  pricing: "bg-surface-brand",
  internal: "bg-surface-muted",
  other: "bg-surface-brand-subtle",
};

export function CalendarWidget() {
  const selectedDate = TODAY;
  const dayMeetings = getMeetingsForDay(mockMeetings, selectedDate);
  const nowMeeting = isSameDay(selectedDate, TODAY) ? getNowMeeting(dayMeetings) : null;
  const upcomingMeetings = nowMeeting
    ? dayMeetings.filter((m) => m.id !== nowMeeting.id)
    : dayMeetings;
  const activeAttendeeNames = nowMeeting?.attendees.map((attendee) => attendee.name) ?? [];
  const extraMeetingsCount = Math.max(0, upcomingMeetings.length - 3);
  const visibleUpcomingMeetings = upcomingMeetings.slice(0, 3);

  return (
    <WidgetCard
      title="Calendar"
      headerActions={
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Add meeting"
          className="text-icon-primary"
        >
          <Plus size={20} />
        </Button>
      }
      className="rounded-xl"
      bodyClassName="p-24"
    >
      {nowMeeting && (
        <div className="flex gap-12 border-b border-border-subtle pb-24">
          <div className="w-4 rounded-full bg-surface-success shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center gap-8">
              <Badge color="purple" size="md">
                Now
              </Badge>
              <Badge color="gray" size="md">
                {getMinsLeft(nowMeeting.endAt)}m left
              </Badge>
            </div>
            <div className="flex items-start">
              <div className="min-w-0">
                <p className="truncate text-14 font-semibold text-text-primary">
                  {nowMeeting.title}
                </p>
                <p className="text-14 text-text-secondary">
                  {formatTime(nowMeeting.startAt)}
                  {nowMeeting.linkedRecord && ` · ${nowMeeting.linkedRecord.name}`}
                </p>
                {activeAttendeeNames.length > 0 && (
                  <AvatarGroup
                    names={activeAttendeeNames}
                    max={3}
                    size="xs"
                    className="mt-8"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {upcomingMeetings.length === 0 && !nowMeeting ? (
        <div className="flex items-center justify-center py-32 text-center text-14 text-text-secondary">
          No meetings. Use this time to reach out to cold accounts.
        </div>
      ) : (
        <div className={cn("flex flex-col gap-16", nowMeeting ? "pt-24" : "")}>
          {visibleUpcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center gap-12">
              <span
                className={cn(
                  "size-12 shrink-0 rounded-full",
                  TYPE_DOT[meeting.meetingType] ?? "bg-surface-brand-subtle"
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-14 font-semibold text-text-primary">
                  {meeting.title}
                </p>
                <p className="text-12 text-text-secondary">
                  {getDurationLabel(meeting.startAt, meeting.endAt)}
                  {meeting.linkedRecord && ` · ${meeting.linkedRecord.name}`}
                </p>
              </div>
              <span className="shrink-0 text-14 text-text-secondary">
                {formatTime(meeting.startAt)}
              </span>
            </div>
          ))}
          {extraMeetingsCount > 0 && (
            <div className="flex items-center justify-end gap-8 text-14 text-text-secondary">
              <span className="size-12 rounded-full bg-surface-brand" />
              <span className="size-12 rounded-full bg-surface-brand-subtle" />
              <span>{extraMeetingsCount} more</span>
            </div>
          )}
        </div>
      )}
    </WidgetCard>
  );
}
