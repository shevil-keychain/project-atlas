"use client"

import { cn } from "@level/ui/lib/utils"
import { ChevronRight } from "@level/ui/components/icons"
import { useState } from "react"
import { Shimmer } from "./shimmer"
import { ReasoningBlock } from "./reasoning"
import { MessageResponse } from "./message"
import {
  workerIconByLabel,
  customWorkers,
} from "../../lib/workers"
import {
  AlertTriangle,
  SearchMd,
  Star04,
  User01,
} from "@level/ui/components/icons"

function getCustomWorkerIcon(iconName: string, color: string, size = 14) {
  switch (iconName) {
    case "alert-triangle":
      return <AlertTriangle size={size} color={color} />
    case "search":
      return <SearchMd size={size} color={color} />
    case "user":
      return <User01 size={size} color={color} />
    default:
      return <Star04 size={size} color={color} />
  }
}

function WorkerIcon({ worker, size = 20 }: { worker: string; size?: number }) {
  const cw = customWorkers.find((c) => c.label === worker)
  if (cw) {
    return (
      <span
        className={cn("flex shrink-0 items-center justify-center rounded", cw.iconBg)}
        style={{ width: size, height: size }}
      >
        {getCustomWorkerIcon(cw.iconName, cw.iconColor, Math.round(size * 0.6))}
      </span>
    )
  }
  return (
    <img
      src={workerIconByLabel[worker] ?? "/ai-worker-avatar.svg"}
      alt={`${worker} icon`}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}

type WorkerCallCardProps = {
  worker: string
  question: string
  status: "pending" | "running" | "done"
  reasoning: string
  response: string
}

export function WorkerCallCard({
  worker,
  question,
  status,
  reasoning,
  response,
}: WorkerCallCardProps) {
  const [expanded, setExpanded] = useState(false)

  const isPending = status === "pending"
  const isRunning = status === "running"
  const isDone = status === "done"

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        isPending && "border-border-subtle bg-surface-page opacity-60",
        isRunning && "border-border-subtle bg-surface-card",
        isDone && "cursor-pointer border-border-subtle bg-surface-card hover:border-border-moderate"
      )}
      onClick={isDone ? () => setExpanded((e) => !e) : undefined}
    >
      <div className="flex items-start gap-12 px-16 py-12">
        <WorkerIcon worker={worker} size={24} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-8">
            {isRunning ? (
              <Shimmer as="span" className="text-13 font-semibold" duration={4} spread={2}>
                {worker}
              </Shimmer>
            ) : (
              <span className="text-13 font-semibold text-text-primary">{worker}</span>
            )}
            {isDone && (
              <ChevronRight
                size={12}
                className={cn(
                  "ml-auto shrink-0 text-text-tertiary transition-transform duration-150",
                  expanded && "rotate-90"
                )}
              />
            )}
          </div>
          <p className="mt-2 line-clamp-2 text-12 text-text-secondary">{question}</p>

          {isRunning && reasoning && (
            <div className="mt-8 text-12 leading-[1.6] text-text-tertiary">
              <ReasoningBlock
                isStreaming={true}
                reasoning={reasoning}
              />
            </div>
          )}
        </div>
      </div>

      {expanded && isDone && reasoning && (
        <div className="border-t border-border-subtle px-16 py-12">
          <ReasoningBlock
            isStreaming={false}
            reasoning={reasoning}
          />
        </div>
      )}
    </div>
  )
}
