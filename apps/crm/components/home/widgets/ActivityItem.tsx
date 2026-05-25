import { CompanyLogo } from "@/components/company-logo";
import { CheckCircle, Phone01 } from "@level/ui/components/icons";
import { FileText } from "lucide-react";
import type { Activity, ActivityType } from "@/data/home/mockActivity";

function GmailLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M2 6.5 12 13l10-6.5V18a2 2 0 0 1-2 2h-2V10.5l-6 4-6-4V20H4a2 2 0 0 1-2-2V6.5Z" fill="#EA4335"/>
      <path d="M22 6.5V18a2 2 0 0 1-2 2h-2V10.5l4-4Z" fill="#FBBC04"/>
      <path d="M2 6.5 6 10.5V20H4a2 2 0 0 1-2-2V6.5Z" fill="#34A853"/>
      <path d="M2 6.5A2 2 0 0 1 4 4.5h1L12 9l7-4.5h1a2 2 0 0 1 2 2L12 13 2 6.5Z" fill="#4285F4"/>
      <path d="M6 10.5 12 13l-6 4v-6.5Z" fill="#C5221F"/>
    </svg>
  );
}

function GoogleMeetLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M15 8v8l5 3.5V4.5L15 8Z" fill="#00AC47"/>
      <path d="M3 7v10a2 2 0 0 0 2 2h10v-4H8V11L3 7Z" fill="#FFBA00"/>
      <path d="M3 7l5 4V7a2 2 0 0 1 2-2h5V3H5a2 2 0 0 0-2 2v2Z" fill="#00832D"/>
      <path d="M15 19v-4l5 4.5V19h-5Z" fill="#0066DA"/>
      <path d="M15 3v8h5V5a2 2 0 0 0-2-2h-3Z" fill="#E94235"/>
    </svg>
  );
}

function BrandBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-28 shrink-0 items-center justify-center rounded-full bg-surface-card border border-border-default">
      {children}
    </span>
  );
}

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-28 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-icon-secondary">
      {children}
    </span>
  );
}

function ActivityIcon({ type, website }: { type: ActivityType; website?: string }) {
  switch (type) {
    case "email_received":
    case "email_sent":
      return <BrandBadge><GmailLogo size={16} /></BrandBadge>;
    case "meeting_scheduled":
    case "meeting_completed":
      return <BrandBadge><GoogleMeetLogo size={14} /></BrandBadge>;
    case "signal":
      return <CompanyLogo website={website} size="xs" />;
    case "note_added":
      return <CircleIcon><FileText size={13} /></CircleIcon>;
    case "task_completed":
      return <CircleIcon><CheckCircle size={13} /></CircleIcon>;
    case "call_logged":
      return <CircleIcon><Phone01 size={13} /></CircleIcon>;
  }
}

export function relativeTime(isoStr: string): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const hasSubtitle = !!activity.subtitle;

  return (
    <div className={`flex gap-12 px-20 py-10 hover:bg-surface-subtle cursor-pointer transition-colors group ${hasSubtitle ? "items-start" : "items-center"}`}>
      <span className={hasSubtitle ? "mt-1" : ""}>
        <ActivityIcon type={activity.type} website={activity.linkedRecord.website} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-8">
          <span className="text-14 text-text-primary leading-20">
            {activity.title}
          </span>
          <span className="text-12 text-text-secondary shrink-0 tabular-nums pt-1">
            {relativeTime(activity.timestamp)}
          </span>
        </div>
        {hasSubtitle && (
          <span className="text-12 text-text-secondary leading-18 line-clamp-2">
            {activity.subtitle}
          </span>
        )}
        <span className="text-12 text-text-secondary">{activity.linkedRecord.name}</span>
      </div>
    </div>
  );
}
