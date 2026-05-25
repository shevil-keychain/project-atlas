"use client";

import { GripVertical, X } from "lucide-react";
import { Button } from "@level/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
} from "@level/ui/components/ui/sheet";
import { Plus } from "@level/ui/components/icons";

const CURRENT_WIDGETS = [
  {
    id: "network-health",
    label: "Network health",
    description: "At-a-glance read of your network's overall health — strong, healthy, and at-risk accounts with trend vs. last month.",
  },
  {
    id: "tasks",
    label: "Tasks",
    description: "Your single action surface — AI-generated nudges, self-created tasks, and teammate assignments, all ranked by priority.",
  },
  {
    id: "activity",
    label: "Activity",
    description: "Backward-looking feed of what's happened across your accounts: emails, calls, meetings, notes, and signals.",
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "Today's and upcoming meetings with attendee context and AI-generated prep briefs for external calls.",
  },
];

const AVAILABLE_WIDGETS = [
  { label: "Accounts ranked", description: "Your accounts sorted by relationship strength, tier, or recent activity." },
  { label: "People ranked", description: "Key contacts ranked by engagement level and last interaction recency." },
  { label: "Deals ranked", description: "Open deals sorted by close probability, deal size, or days since last touch." },
  { label: "Pipeline (visual)", description: "Kanban-style view of your deals across each stage of the pipeline." },
  { label: "Pipeline (metrics)", description: "Aggregate stats — total pipeline value, stage conversion rates, average deal age." },
  { label: "Forecast", description: "This quarter's commit, best-case, and pipeline coverage against your quota." },
  { label: "Open quotes", description: "All outstanding quotes with status, expiry dates, and follow-up actions." },
  { label: "My customers", description: "Active customer accounts with renewal dates, health scores, and upsell signals." },
  { label: "Goal / quota progress", description: "Progress toward your quarterly quota with pacing indicator and gap to goal." },
  { label: "Network composition", description: "Breakdown of your network by category, tier, and relationship stage." },
  { label: "Touches by channel", description: "Weekly outreach volume broken down by email, call, and meeting." },
  { label: "Recently viewed", description: "Quick jump back to the companies, contacts, and deals you visited recently." },
];

interface CustomizeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomizeDrawer({ open, onOpenChange }: CustomizeDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent size="sm">
        <SheetHeader>Customize</SheetHeader>

        <SheetBody>
          <div className="flex flex-col gap-24">
            {/* Current widgets */}
            <div className="flex flex-col gap-12">
              <p className="text-12 font-bold text-text-secondary uppercase tracking-wide">
                Current widgets
              </p>
              <div className="flex flex-col gap-4">
                {CURRENT_WIDGETS.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-start gap-10 px-12 py-10 rounded-lg border border-border-default bg-surface-card hover:bg-surface-subtle transition-colors"
                  >
                    <GripVertical size={16} className="text-icon-tertiary shrink-0 cursor-grab mt-2" />
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <span className="text-14 font-semibold text-text-primary">
                        {widget.label}
                      </span>
                      <span className="text-12 text-text-secondary leading-16">
                        {widget.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center size-24 rounded-md text-icon-secondary hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer shrink-0 mt-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add widget */}
            <div className="flex flex-col gap-12">
              <p className="text-12 font-bold text-text-secondary uppercase tracking-wide">
                Add widget
              </p>
              <div className="flex flex-col gap-4">
                {AVAILABLE_WIDGETS.map((widget) => (
                  <button
                    key={widget.label}
                    type="button"
                    className="flex items-start gap-10 px-12 py-10 rounded-lg border border-dashed border-border-default bg-surface-card hover:bg-surface-subtle hover:border-border-strong transition-colors text-left cursor-pointer"
                  >
                    <Plus size={14} className="text-icon-secondary shrink-0 mt-2" />
                    <div className="flex flex-col gap-2 min-w-0">
                      <span className="text-14 font-medium text-text-secondary">{widget.label}</span>
                      <span className="text-12 text-text-tertiary leading-16">{widget.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="ghost" size="sm" className="mr-auto text-text-secondary">
            Reset to defaults
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
