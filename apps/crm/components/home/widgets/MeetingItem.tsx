import { cn } from "@level/ui/lib/utils";
import { File01 } from "@level/ui/components/icons";
import { Button } from "@level/ui/components/ui/button";
import type { Meeting } from "@/data/home/mockMeetings";

const TYPE_ACCENT: Record<string, string> = {
  qbr: "bg-surface-warning",
  intro: "bg-surface-success",
  pricing: "bg-surface-brand",
  internal: "bg-surface-muted",
  other: "bg-surface-brand-subtle",
};

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

interface MeetingItemProps {
  meeting: Meeting;
}

export function MeetingItem({ meeting }: MeetingItemProps) {
  const accentClass = TYPE_ACCENT[meeting.meetingType] ?? "bg-surface-brand-subtle";
  const duration = getDurationLabel(meeting.startAt, meeting.endAt);
  const externalAttendees = meeting.attendees.filter((a) => !a.internal);
  const internalAttendees = meeting.attendees.filter((a) => a.internal);
  const displayAttendees = [...externalAttendees, ...internalAttendees];
  const shownNames = displayAttendees.slice(0, 2).map((a) => a.name.split(" ")[0]);
  const extraCount = displayAttendees.length - 2;

  const subtitle = [
    meeting.linkedRecord?.name,
    displayAttendees.length > 0
      ? shownNames.join(", ") + (extraCount > 0 ? ` +${extraCount}` : "")
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex items-stretch hover:bg-surface-subtle cursor-pointer transition-colors border-b border-border-subtle last:border-0 group">
      {/* Time column with vertical timeline line on right edge */}
      <div className="relative flex flex-col items-end justify-center gap-2 px-16 py-14 shrink-0 w-72 border-r border-border-subtle">
        <span className="text-12 font-semibold text-text-primary tabular-nums">
          {formatTime(meeting.startAt)}
        </span>
        <span className="text-12 text-text-secondary tabular-nums">{duration}</span>
      </div>

      {/* Accent bar — full-height color stripe */}
      <div className={cn("w-3 self-stretch shrink-0", accentClass)} />

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 min-w-0 flex-1 px-12 py-14">
        <div className="flex items-center gap-6">
          <span className="text-14 font-semibold text-text-primary truncate flex-1">
            {meeting.title}
          </span>
          {meeting.hasBrief && (
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<File01 size={12} />}
              className="h-24 text-12 px-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Prep brief
            </Button>
          )}
        </div>
        {subtitle && (
          <span className="text-12 text-text-secondary truncate">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
