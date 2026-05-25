"use client";

import { cn } from "@level/ui/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@level/ui/components/ui/dropdown-menu";
import { Mail, Phone, FileText, Briefcase, MessageSquare, Reply as ReplyIcon } from "lucide-react";
import {
  CheckCircle,
  Clock,
  X,
  Link01,
  Eye,
  AlignLeft01,
  DotsVertical,
  User01,
} from "@level/ui/components/icons";
import type { Task } from "@/data/home/mockTasks";

function PersonAvatar({ imageUrl, name }: { imageUrl?: string; name: string }) {
  if (!imageUrl) {
    return (
      <div className="size-24 rounded-full bg-surface-subtle border border-border-default flex items-center justify-center shrink-0">
        <User01 size={14} className="text-icon-secondary" />
      </div>
    );
  }
  return (
    <div className="size-24 rounded-full overflow-hidden border border-border-default shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={name} className="size-full object-cover" />
    </div>
  );
}

function deriveDomainFromImageUrl(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;
  const m = imageUrl.match(/clearbit\.com\/([^?#/]+)/);
  return m?.[1];
}

function RecordVisual({ record }: { record: Task["linkedRecord"] }) {
  if (record.type === "person") {
    return <PersonAvatar imageUrl={record.imageUrl} name={record.name} />;
  }
  // company or deal — show company logo
  const domain = deriveDomainFromImageUrl(record.imageUrl);
  return <CompanyLogo website={domain} size="xs" />;
}

const recordTypeLabel: Record<Task["linkedRecord"]["type"], string> = {
  company: "Not in network",
  person: "Contact",
  deal: "Deal",
  signal: "Signal",
};

interface ActionDef {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}

const PRIMARY_ICON_MAP: Record<NonNullable<Task["primaryActionIcon"]>, React.ReactNode> = {
  mail: <Mail size={14} />,
  reply: <ReplyIcon size={14} />,
  message: <MessageSquare size={14} />,
  eye: <Eye size={14} />,
  briefcase: <Briefcase size={14} />,
  fileText: <FileText size={14} />,
  link: <Link01 size={14} />,
  phone: <Phone size={14} />,
};

function buildActions(
  task: Task,
  onDone: () => void,
  onDismiss: () => void
): { primary: ActionDef; snooze: ActionDef; more: ActionDef[] } {
  const doneAction: ActionDef = { label: "Mark done", icon: <CheckCircle size={13} />, onClick: onDone };
  const dismissAction: ActionDef = { label: "Dismiss", icon: <X size={13} />, onClick: onDismiss, destructive: true };
  const snoozeAction: ActionDef = { label: "Snooze", icon: <Clock size={13} /> };

  const defaults: Record<Task["taskType"], { primary: ActionDef; more: ActionDef[] }> = {
    followup: {
      primary: { label: "Send email", icon: <Mail size={14} /> },
      more: [{ label: "Log call", icon: <Phone size={13} /> }, doneAction, dismissAction],
    },
    signal: {
      primary: { label: "Send email", icon: <Mail size={14} /> },
      more: [{ label: "View signal", icon: <Eye size={13} /> }, doneAction, dismissAction],
    },
    deal_nudge: {
      primary: { label: "Open deal", icon: <Briefcase size={14} /> },
      more: [{ label: "Follow up", icon: <Mail size={13} /> }, doneAction, dismissAction],
    },
    job_change: {
      primary: { label: "Send message", icon: <MessageSquare size={14} /> },
      more: [{ label: "Add note", icon: <AlignLeft01 size={13} /> }, doneAction, dismissAction],
    },
    meeting_prep: {
      primary: { label: "Open brief", icon: <FileText size={14} /> },
      more: [doneAction, dismissAction],
    },
    self: {
      primary: { label: "Open record", icon: <Link01 size={14} /> },
      more: [doneAction, dismissAction],
    },
  };

  const config = defaults[task.taskType];
  const primary: ActionDef = task.primaryActionLabel
    ? {
        label: task.primaryActionLabel,
        icon: task.primaryActionIcon ? PRIMARY_ICON_MAP[task.primaryActionIcon] : config.primary.icon,
      }
    : config.primary;

  return { primary, snooze: snoozeAction, more: config.more };
}

interface TaskItemProps {
  task: Task;
  isActive: boolean;
  onActivate: () => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskItem({ task, isActive, onActivate, onStatusChange }: TaskItemProps) {
  const isDone = task.status === "done";
  if (task.status === "dismissed") return null;

  const onDone = () => onStatusChange(task.id, "done");
  const onDismiss = () => onStatusChange(task.id, "dismissed");
  const { primary, snooze, more } = buildActions(task, onDone, onDismiss);

  const destructiveItems = more.filter((a) => a.destructive);
  const normalItems = more.filter((a) => !a.destructive);

  return (
    <div
      className={cn(
        "relative bg-surface-card border-b border-border-default p-24 cursor-pointer transition-opacity",
        isDone && "opacity-50"
      )}
      onClick={onActivate}
    >
      {/* Active indicator — 4px dark bar on the left */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#111827]" />
      )}

      <div className="flex flex-col gap-16">
        {/* Entity row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-12">
            <RecordVisual record={task.linkedRecord} />
            <div className="flex items-baseline gap-[11px] text-12 leading-16">
              <span className="font-medium text-black">{task.linkedRecord.name}</span>
              <span className="font-normal text-[#6b7280]">
                {recordTypeLabel[task.linkedRecord.type]}
              </span>
            </div>
          </div>
          <span className="text-12 leading-16 text-black">Due today</span>
        </div>

        {/* Task title + context */}
        <div className="flex flex-col gap-4 text-14 leading-20 text-[#1f2937]">
          <p className={cn("font-semibold", isDone && "line-through text-text-secondary")}>
            {task.title}
          </p>
          <p className="font-normal">{task.context}</p>
        </div>

        {/* Action row — only on active card */}
        {isActive && !isDone && (
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="h-36 px-16 py-8 rounded-md bg-[#fde047] hover:bg-[#fcd734] border border-black/[0.06] text-14 leading-20 font-semibold text-black inline-flex items-center justify-center gap-8 transition-colors"
            >
              {primary.label}
            </button>
            <button
              type="button"
              className="h-36 px-16 py-8 rounded-md bg-white hover:bg-surface-subtle border border-[#d1d5db] text-14 leading-20 font-medium text-[#374151] inline-flex items-center justify-center gap-8 transition-colors"
            >
              {snooze.label}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="size-36 rounded-md bg-white hover:bg-surface-subtle border border-[#d1d5db] inline-flex items-center justify-center transition-colors"
                >
                  <DotsVertical size={14} className="text-[#374151]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {normalItems.map((action) => (
                  <DropdownMenuItem key={action.label} onClick={action.onClick} className="gap-8">
                    {action.icon}
                    {action.label}
                  </DropdownMenuItem>
                ))}
                {destructiveItems.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    {destructiveItems.map((action) => (
                      <DropdownMenuItem
                        key={action.label}
                        onClick={action.onClick}
                        className="gap-8 text-text-error"
                      >
                        {action.icon}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {isActive && isDone && (
          <div className="flex items-center gap-6">
            <CheckCircle size={14} className="text-icon-success" />
            <span className="text-12 font-medium text-text-success">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
}
