"use client";

import { useRef, useState, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Phone, Mail, Users } from "lucide-react";
import { cn } from "@level/ui/lib/utils";
import type { StrengthLevel } from "./types";

type RowContext = {
  name: string;
  level: StrengthLevel;
  label: string;
  interactions90d?: number;
  lastCall?: string;
  lastEmail?: string;
  emailCount?: number;
  callCount?: number;
  openDeals?: number;
};

const REASONING: Record<StrengthLevel, { intro: string; detail: string }> = {
  "very-strong": {
    intro: "Top of the book. This relationship is in great shape.",
    detail:
      "Multiple stakeholders are engaging consistently across email and calls, and recent conversations have been substantive and forward-moving.",
  },
  strong: {
    intro: "Healthy momentum and steady two-way engagement.",
    detail:
      "Cadence is regular and responsive. Recent threads show clear interest and active follow-through from their side.",
  },
  moderate: {
    intro: "Engagement is steady but not standout.",
    detail:
      "Replies are timely when prompted, but you're carrying most of the cadence. A meaningful touchpoint would push this higher.",
  },
  weak: {
    intro: "Engagement has slowed and signals are mixed.",
    detail:
      "Replies are slower and shorter than they used to be, and recent calls didn't yield concrete next steps.",
  },
  "very-weak": {
    intro: "Conversation has gone largely quiet.",
    detail:
      "Only a small number of interactions recently, with long gaps between them. Few stakeholders are engaged.",
  },
};

const MINI_DAYS = 365;
const MINI_MAX = 5;

// Each profile maps a day index (0 = ~1 year ago, 364 = today) and a deterministic
// rand in [0,1) to a bar height 0..MINI_MAX. Patterns are narrative, not noise.
type ProfileFn = (i: number, rand: number) => number;

const noise = (rand: number, lo: number, hi: number) =>
  Math.max(1, Math.round(rand * (hi - lo) + lo));

const PROFILES: Record<StrengthLevel, ProfileFn> = {
  // Consistent strong engagement throughout the year, with a brief mid-year lull.
  "very-strong": (i, r) => {
    if (i >= 200 && i < 215 && r < 0.5) return 0;
    return noise(r, 2, 5);
  },

  // Strong opening burst → quiet → small bursts → recent re-engagement.
  strong: (i, r) => {
    if (i < 60) return noise(r, 2, 5);
    if (i >= 60 && i < 160) return 0;
    if (i >= 160 && i < 200) return r < 0.55 ? 0 : noise(r, 1, 2);
    if (i >= 200 && i < 280) return 0;
    if (i >= 280) {
      const ramp = (i - 280) / 84;
      return r < 0.3 ? 0 : noise(r, 1, Math.round(2 + ramp * 3));
    }
    return 0;
  },

  // Sparse but irregular clusters scattered across the year.
  moderate: (i, r) => {
    const inCluster =
      (i >= 18 && i < 34) ||
      (i >= 88 && i < 104) ||
      (i >= 168 && i < 178) ||
      (i >= 238 && i < 258) ||
      (i >= 318 && i < 338);
    if (!inCluster) return 0;
    return r < 0.45 ? 0 : noise(r, 1, 3);
  },

  // Strong early relationship → long silence → one small revisit → silence.
  weak: (i, r) => {
    if (i < 50) return noise(r, 2, 4);
    if (i >= 50 && i < 250) return 0;
    if (i >= 250 && i < 275) return r < 0.6 ? 0 : 1;
    return 0;
  },

  // Almost entirely silent, with one faint old blip.
  "very-weak": (i, r) => {
    if (i >= 100 && i < 110) return r < 0.7 ? 0 : 1;
    return 0;
  },
};

function buildMiniDailyCounts(level: StrengthLevel, seed: number): number[] {
  const profile = PROFILES[level];
  return Array.from({ length: MINI_DAYS }, (_, i) => {
    const rand = ((i * 9301 + 49297 + seed * 131) % 233280) / 233280;
    return profile(i, rand);
  });
}

function MiniYearActivity({ level, seed }: { level: StrengthLevel; seed: number }) {
  const counts = buildMiniDailyCounts(level, seed);
  return (
    <div className="flex flex-col gap-6">
      <span className="text-12 font-semibold text-text-secondary">Activity</span>
      <div className="flex h-32 items-end">
        {counts.map((c, i) => {
          const heightPct = c === 0 ? 6 : (c / MINI_MAX) * 100;
          const muted = c === 0;
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-sm",
                muted ? "bg-border-subtle" : "bg-secondary-yellow-600"
              )}
              style={{ height: `${heightPct}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-12">
      <span className="flex items-center gap-8 text-14 text-text-secondary">
        <span className="text-icon-secondary">{icon}</span>
        {label}
      </span>
      <span className="text-14 font-semibold text-text-primary">{value}</span>
    </div>
  );
}

export function StrengthPopover({
  row,
  children,
}: {
  row: RowContext;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { intro, detail } = REASONING[row.level];

  // Mock engaged-contacts count from open deals + email/call activity
  const engagedContacts = Math.max(
    1,
    Math.min(6, (row.openDeals ?? 0) + Math.round(((row.emailCount ?? 0) + (row.callCount ?? 0)) / 20))
  );

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

          <div className="p-16 flex-1 min-h-0 overflow-y-auto flex flex-col gap-14">
            <p className="text-14 font-semibold leading-20 text-text-primary">{intro}</p>
            <p className="text-14 leading-20 text-text-primary">{detail}</p>

            <div className="flex flex-col gap-12 pt-10 border-t border-border-default">
              <MiniYearActivity
                level={row.level}
                seed={(row.emailCount ?? 0) + (row.callCount ?? 0) + (row.openDeals ?? 0)}
              />
              <StatRow
                icon={<Phone size={14} />}
                label="Last call"
                value={row.lastCall && row.lastCall !== "-" ? row.lastCall : "-"}
              />
              <StatRow
                icon={<Mail size={14} />}
                label="Last email"
                value={row.lastEmail && row.lastEmail !== "-" ? row.lastEmail : "-"}
              />
              <StatRow
                icon={<Users size={14} />}
                label="Contacts engaged"
                value={`${engagedContacts} at this account`}
              />
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
