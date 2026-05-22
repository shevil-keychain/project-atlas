"use client";

import { useRef, useState, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@level/ui/lib/utils";

type RowContext = {
  name: string;
  lastInteraction?: string;
  lastEmail?: string;
  lastCall?: string;
  website?: string;
  openDeals?: number;
};

type Variant = "risk" | "healthy";

type Reasoning = {
  intro: string;
  signals: { label: string; detail: string }[];
};

function buildReasoning(row: RowContext, variant: Variant): Reasoning {
  if (variant === "healthy") {
    return {
      intro: `${row.name} is engaged and moving forward. Recent signals are consistently positive.`,
      signals: [
        {
          label: `Call · ${row.lastCall || "recently"}`,
          detail: `Their team confirmed timelines and gave the green light on the proposed scope.`,
        },
        {
          label: `Email · ${row.lastEmail || "recently"}`,
          detail: `Thread shows fast turnaround and they looped in additional stakeholders on their side.`,
        },
        {
          label: row.openDeals && row.openDeals > 0 ? "Open deal" : "Pipeline",
          detail:
            row.openDeals && row.openDeals > 0
              ? `Deal is progressing on schedule with no open blockers.`
              : `No deal yet, but inbound engagement remains strong.`,
        },
      ],
    };
  }

  return {
    intro: `${row.name} is showing clear churn signals across recent conversations.`,
    signals: [
      {
        label: `Call · ${row.lastCall || "recent call"}`,
        detail: `Their procurement lead raised pricing concerns and flagged an internal budget freeze, saying they'd need to "loop in finance" before moving forward.`,
      },
      {
        label: `Email · ${row.lastEmail || "recent emails"}`,
        detail: `Thread mentioned pausing vendor decisions until next quarter; tone has cooled noticeably.`,
      },
      {
        label: row.openDeals && row.openDeals > 0 ? "Open deal" : "Pipeline",
        detail:
          row.openDeals && row.openDeals > 0
            ? `Deal hasn't progressed since the last touchpoint.`
            : `No active deal in pipeline.`,
      },
    ],
  };
}

export function RiskPopover({
  row,
  variant = "risk",
  children,
}: {
  row: RowContext;
  variant?: Variant;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { intro, signals } = buildReasoning(row, variant);

  function show() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (open) return;
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 500);
  }

  function scheduleHide() {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <span
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
          className="inline-flex items-center"
        >
          {children}
        </span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          collisionPadding={12}
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "z-40 w-[380px] rounded-lg bg-surface-card text-text-primary border border-border-default shadow-lg",
            "flex flex-col max-h-[420px] overflow-hidden",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        >
          <div className="flex items-center gap-20 px-16 pt-12 border-b border-border-default shrink-0">
            <span className="pb-10 text-14 font-semibold border-b-2 -mb-px border-border-focus text-text-primary">
              Reasoning
            </span>
            <span className="pb-10 text-14 font-semibold border-b-2 -mb-px border-transparent text-text-secondary">
              Sources
            </span>
          </div>

          <div className="p-16 flex-1 min-h-0 overflow-y-auto flex flex-col gap-12">
            <p className="text-14 font-semibold leading-20 text-text-primary">{intro}</p>
            <div className="flex flex-col">
              {signals.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-2 py-10",
                    i !== signals.length - 1 && "border-b border-border-default"
                  )}
                >
                  <span className="text-12 font-semibold text-text-secondary">{s.label}</span>
                  <span className="text-14 leading-20 text-text-primary">{s.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
