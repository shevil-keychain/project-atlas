"use client";

import { useRef, useState, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Activity, FileSearch, Eye } from "lucide-react";
import { cn } from "@level/ui/lib/utils";

type RowContext = {
  name: string;
  status: "Active" | "Inactive";
  lastPlatformActivity?: string;
  industry?: string;
  categories?: string;
};

type Signal = { label: string; detail: string };

function buildContent(row: RowContext): { intro: string; detail: string; signals: Signal[] } {
  if (row.status === "Active") {
    return {
      intro: `${row.name} is actively sourcing on Keychain right now.`,
      detail:
        "They've shown clear buying intent through recent platform activity. A timely outreach has a higher chance of landing.",
      signals: [
        {
          label: "Recent RFQ",
          detail: `Posted an open RFQ ${row.lastPlatformActivity || "recently"} for capacity in ${row.industry || "their category"}.`,
        },
        {
          label: "Profile views",
          detail: "Viewed multiple co-manufacturer profiles in the last two weeks.",
        },
        {
          label: "Category fit",
          detail: `Their active sourcing matches your capabilities in ${row.categories?.split(",")[0]?.trim() || "this category"}.`,
        },
      ],
    };
  }

  return {
    intro: `${row.name} isn't showing active sourcing signals.`,
    detail:
      "They haven't posted RFQs or browsed supplier profiles recently. Reach out only if you have a strong reason to re-engage.",
    signals: [
      {
        label: "Last platform activity",
        detail: `Last seen on the platform ${row.lastPlatformActivity || "a while ago"}.`,
      },
      {
        label: "No open RFQs",
        detail: "No active requests for quotes in the last 90 days.",
      },
      {
        label: "Low engagement",
        detail: "Minimal browsing of supplier profiles or category pages.",
      },
    ],
  };
}

function SignalIcon({ i }: { i: number }) {
  if (i === 0) return <FileSearch size={14} className="text-icon-secondary" />;
  if (i === 1) return <Eye size={14} className="text-icon-secondary" />;
  return <Activity size={14} className="text-icon-secondary" />;
}

export function SourcingPopover({
  row,
  children,
}: {
  row: RowContext;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { intro, detail, signals } = buildContent(row);

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
            "flex flex-col max-h-[440px] overflow-hidden",
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
            <p className="text-14 leading-20 text-text-primary">{detail}</p>

            <div className="flex flex-col">
              {signals.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-2 py-10",
                    i !== signals.length - 1 && "border-b border-border-default"
                  )}
                >
                  <span className="flex items-center gap-6 text-12 font-semibold text-text-secondary">
                    <SignalIcon i={i} />
                    {s.label}
                  </span>
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
