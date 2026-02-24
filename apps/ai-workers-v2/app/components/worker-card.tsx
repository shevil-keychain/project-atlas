"use client";

import { cn } from "@level/ui/lib/utils";
import { Badge } from "@level/ui/components/ui/badge";
import { Stars01 } from "@level/ui/components/icons";

export interface Worker {
  id: string;
  name: string;
  description: string;
  category: "Featured" | "Analytics" | "Custom";
}

export const workers: Worker[] = [
  {
    id: "exec-summary",
    name: "Executive Summary",
    description: "Deep CX research & exec reports",
    category: "Featured",
  },
  {
    id: "search-analyst",
    name: "Search Analyst",
    description: "Deep-dive single-agent analysis",
    category: "Featured",
  },
  {
    id: "coach",
    name: "Coach",
    description: "Agent coaching & performance",
    category: "Featured",
  },
  {
    id: "qa-analyst",
    name: "QA Analyst",
    description: "QA score analysis",
    category: "Featured",
  },
  {
    id: "team-analyst",
    name: "Team Analyst",
    description: "Team-level analytics",
    category: "Analytics",
  },
  {
    id: "voc-analyst",
    name: "VOC Analyst",
    description: "Voice of Customer analysis",
    category: "Analytics",
  },
  {
    id: "product-gaps",
    name: "Product Gaps",
    description: "Product gap identification",
    category: "Analytics",
  },
];

const workerIconPaths: Record<string, string> = {
  "exec-summary": "/worker-icons/executive-summary.png",
  "search-analyst": "/worker-icons/search-analyst.png",
  coach: "/worker-icons/coach.png",
  "qa-analyst": "/worker-icons/qa-analyst.png",
  "team-analyst": "/worker-icons/team-analyst.png",
  "voc-analyst": "/worker-icons/voc-analyst.png",
  "product-gaps": "/worker-icons/product-gaps.png",
};

const categoryColors: Record<string, "primary" | "blue" | "purple"> = {
  Featured: "primary",
  Analytics: "blue",
  Custom: "purple",
};

interface WorkerCardProps {
  worker: Worker;
  selected?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

export function WorkerCard({
  worker,
  selected,
  compact,
  onClick,
}: WorkerCardProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-[140px] shrink-0 flex-col items-center gap-8 rounded-xl border p-12 text-center transition-all",
          selected
            ? "border-primary-brand-300 bg-primary-brand-50 shadow-sm"
            : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
        )}
      >
        <div
          className={cn(
            "flex h-36 w-36 items-center justify-center rounded-lg",
            selected
              ? "bg-primary-brand-100 text-primary-brand-600"
              : "bg-stone-100 text-stone-500"
          )}
        >
          {workerIconPaths[worker.id] ? (
            <img
              src={workerIconPaths[worker.id]}
              alt={`${worker.name} icon`}
              className="h-20 w-20 object-contain"
            />
          ) : (
            <Stars01 size={18} />
          )}
        </div>
        <span className="text-12 font-semibold text-stone-800 leading-tight">
          {worker.name}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-12 rounded-xl border px-12 py-10 text-left transition-all",
        selected
          ? "border-primary-brand-300 bg-primary-brand-50 shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex h-36 w-36 shrink-0 items-center justify-center rounded-lg",
          selected
            ? "bg-primary-brand-100 text-primary-brand-600"
            : "bg-stone-100 text-stone-500"
        )}
      >
        {workerIconPaths[worker.id] ? (
          <img
            src={workerIconPaths[worker.id]}
            alt={`${worker.name} icon`}
            className="h-20 w-20 object-contain"
          />
        ) : (
          <Stars01 size={18} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-8">
          <span className="truncate text-14 font-semibold text-stone-800">
            {worker.name}
          </span>
          <Badge size="sm" color={categoryColors[worker.category] || "gray"}>
            {worker.category}
          </Badge>
        </div>
        <p className="mt-2 truncate text-12 text-stone-500">
          {worker.description}
        </p>
      </div>
    </button>
  );
}
