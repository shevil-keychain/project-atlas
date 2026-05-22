"use client";

import { useRef, useState, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Boxes, Factory, ShieldCheck } from "lucide-react";
import { cn } from "@level/ui/lib/utils";

type RowContext = {
  name: string;
  status: "Match" | "No match";
  industry?: string;
  categories?: string;
  certifications?: string;
  companyType?: string;
};

type Signal = { label: string; detail: string; icon: ReactNode };

function buildContent(row: RowContext): {
  intro: string;
  detail: string;
  signals: Signal[];
} {
  const primaryCategory = row.categories?.split(",")[0]?.trim() || "this category";
  const certs = row.certifications && row.certifications !== "" ? row.certifications : null;

  if (row.status === "Match") {
    return {
      intro: `${row.name} fits your manufacturing capabilities.`,
      detail:
        "Their category mix and certifications line up with what you produce. Worth prioritizing for outreach.",
      signals: [
        {
          icon: <Boxes size={14} className="text-icon-secondary" />,
          label: "Category overlap",
          detail: `Active in ${primaryCategory}, directly within your wheelhouse.`,
        },
        {
          icon: <Factory size={14} className="text-icon-secondary" />,
          label: "Format compatibility",
          detail: `Their product formats align with your existing lines in ${row.industry || "the segment"}.`,
        },
        {
          icon: <ShieldCheck size={14} className="text-icon-secondary" />,
          label: "Certifications",
          detail: certs
            ? `Required certifications met: ${certs}.`
            : "No additional certifications required for this category.",
        },
      ],
    };
  }

  return {
    intro: `${row.name} doesn't match your manufacturing capabilities.`,
    detail:
      "Their category mix or required certifications fall outside what you currently produce. Likely not a fit unless your capabilities expand.",
    signals: [
      {
        icon: <Boxes size={14} className="text-icon-secondary" />,
        label: "Category mismatch",
        detail: `${primaryCategory} sits outside your current production lines.`,
      },
      {
        icon: <Factory size={14} className="text-icon-secondary" />,
        label: "Format gap",
        detail: `Their formats in ${row.industry || "this segment"} would require new tooling or processes.`,
      },
      {
        icon: <ShieldCheck size={14} className="text-icon-secondary" />,
        label: "Certifications",
        detail: certs
          ? `Requires ${certs}, not yet certified on your end.`
          : "Certification requirements may need review before pursuing.",
      },
    ],
  };
}

export function CapabilityPopover({
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
                    {s.icon}
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
