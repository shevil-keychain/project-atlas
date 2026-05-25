"use client";

import { useState } from "react";
import { cn } from "@level/ui/lib/utils";
import { Users01, InfoCircle } from "@level/ui/components/icons";
import { SimpleTooltip, TooltipProvider } from "@level/ui/components/ui/tooltip";
import { WidgetCard } from "../WidgetCard";
import { mockNetworkHealth } from "@/data/home/mockNetworkHealth";

type ViewMode = "me" | "team";

const VIEW_DATA = {
  me: {
    numerator: 85,
    denominator: 400,
    greenZoneFraction: 0.632,
    seed: 137,
  },
  team: {
    numerator: 168,
    denominator: 400,
    greenZoneFraction: 0.812,
    seed: 291,
  },
} as const;

function SegmentedControl({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="flex items-center gap-1 bg-surface-subtle rounded-lg p-1 border border-border-subtle">
      {(["me", "team"] as ViewMode[]).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            "px-8 py-2 rounded-md text-12 font-semibold cursor-pointer transition-all whitespace-nowrap",
            value === v
              ? "bg-surface-card text-text-primary shadow-sm border border-border-default"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {v === "me" ? "Personal" : "Team"}
        </button>
      ))}
    </div>
  );
}

// Left = not in network (light gray), right = highly engaged (dark green) — each step is darker in luminance
const LEGEND_COLORS = ["#d1d5db", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"];

function lerpColor(colors: string[], t: number): string {
  const scaled = t * (colors.length - 1);
  const i = Math.min(Math.floor(scaled), colors.length - 2);
  const f = scaled - i;
  const hex = (s: string) => [parseInt(s.slice(1,3),16), parseInt(s.slice(3,5),16), parseInt(s.slice(5,7),16)];
  const [r1,g1,b1] = hex(colors[i]);
  const [r2,g2,b2] = hex(colors[i+1]);
  return `rgb(${Math.round(r1+(r2-r1)*f)},${Math.round(g1+(g2-g1)*f)},${Math.round(b1+(b2-b1)*f)})`;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// viewBox 0 0 120 120, CX=60, SVG 360×360 → 3px per unit
const CX = 60;
const OUTER_R = CX * 0.97; // ~58, fills 120×120 edge-to-edge
const DOT_R   = 0.825; // 50% larger than original 0.55
const COL_STEP = DOT_R * 2 + 0.18; // gap scaled proportionally
const ROW_STEP = COL_STEP * (Math.sqrt(3) / 2);
const MAX_JITTER = 0.05;

type Dot = { x: number; y: number; t: number; r: number; opacity: number };

function buildDots(seed: number, greenZoneFraction: number): Dot[] {
  const rand = mulberry32(seed);
  const greenZoneR = OUTER_R * greenZoneFraction;
  const dots: Dot[] = [];
  const span = OUTER_R * 2;
  const rows = Math.ceil(span / ROW_STEP) + 2;
  const cols = Math.ceil(span / COL_STEP) + 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isOdd = row % 2 === 1;
      const bx = CX - OUTER_R + col * COL_STEP + (isOdd ? COL_STEP / 2 : 0);
      const by = CX - OUTER_R + row * ROW_STEP;
      const x  = bx + (rand() - 0.5) * MAX_JITTER;
      const y  = by + (rand() - 0.5) * MAX_JITTER;
      const dist = Math.sqrt((x - CX) ** 2 + (y - CX) ** 2);
      if (dist + DOT_R > OUTER_R) continue;

      const t = dist < greenZoneR
        ? Math.pow(1 - dist / greenZoneR, 1.8)
        : 0;

      const sizeBoost = 0.7 + t * 0.3;
      const r = Math.min(DOT_R, DOT_R * sizeBoost * (0.8 + rand() * 0.4));
      const opacity = 0.28 + t * 0.72 * (0.8 + rand() * 0.2);

      dots.push({ x, y, t, r, opacity });
    }
  }
  return dots;
}

const DOTS_CACHE: Record<ViewMode, Dot[]> = {
  me:   buildDots(VIEW_DATA.me.seed,   VIEW_DATA.me.greenZoneFraction),
  team: buildDots(VIEW_DATA.team.seed, VIEW_DATA.team.greenZoneFraction),
};

function DotMeterLegend() {
  const DOT_R = 2.25, STEP = DOT_R * 2 + 0.9;
  const WIDTH = 200, HEIGHT = DOT_R * 2;
  const count = Math.floor(WIDTH / STEP);
  return (
    <svg width={WIDTH} height={HEIGHT} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        // Left ~50% gray, right ~50% ramps through the green gradient
        const pos = i / (count - 1);
        const t = pos < 0.5 ? 0 : (pos - 0.5) * 2;
        return (
          <circle key={i} cx={i * STEP + DOT_R} cy={DOT_R} r={DOT_R}
            fill={lerpColor(LEGEND_COLORS, t)} />
        );
      })}
    </svg>
  );
}

export function NetworkHealthWidget() {
  const [view, setView] = useState<ViewMode>("me");
  const d = VIEW_DATA[view];
  const dots = DOTS_CACHE[view];

  const widgetTitle = (
    <TooltipProvider>
      <span className="flex items-center gap-6">
        Network coverage
        <SimpleTooltip
          title="Network coverage"
          description="The % of your target accounts where you have at least one active connection — a decision-maker you've emailed, called, or met."
          side="bottom"
          align="start"
          delayDuration={200}
        >
          <span className="text-icon-secondary cursor-default flex items-center">
            <InfoCircle size={13} />
          </span>
        </SimpleTooltip>
      </span>
    </TooltipProvider>
  );

  return (
    <WidgetCard
      icon={<Users01 size={16} />}
      title={widgetTitle}
      headerActions={<SegmentedControl value={view} onChange={setView} />}
      bodyClassName="flex flex-col"
    >
      <div className="px-20 pt-12 pb-20 flex flex-col flex-1 min-h-0">
        {/* Stats */}
        <div className="shrink-0">
          <p className="text-14 font-semibold text-text-primary">
            <span className="text-24 font-bold tabular-nums">{d.numerator}</span>
            <span className="text-14 font-semibold text-text-secondary mx-6">of {d.denominator} companies in your category are in your network</span>
          </p>
        </div>

        {/* Visualization — centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 120 120" width="380" height="380" aria-hidden="true">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x} cy={dot.y} r={dot.r}
                fill={lerpColor(LEGEND_COLORS, dot.t)}
                fillOpacity={dot.opacity}
              />
            ))}
          </svg>
        </div>

        {/* Legend — pinned to bottom */}
        <div className="shrink-0 flex justify-center pb-4">
          <div className="flex flex-col gap-4" style={{ width: 200 }}>
            <DotMeterLegend />
            <div className="flex justify-between">
              <span className="text-12 text-text-primary whitespace-nowrap">Not in network</span>
              <span className="text-12 text-text-primary whitespace-nowrap">Highly engaged</span>
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
