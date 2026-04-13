"use client"

import * as React from "react"
import { cn } from "@level/ui/lib/utils"
import {
  AlertTriangle,
  SearchMd,
  Star04,
  User01,
} from "@level/ui/components/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@level/ui/components/ui/tooltip"
import { workerIconByLabel, customWorkers } from "../lib/workers"

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

function SingleWorkerIcon({
  worker,
  size,
}: {
  worker: string
  size: number
}) {
  const cw = customWorkers.find((c) => c.label === worker)
  if (cw) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded",
          cw.iconBg
        )}
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

const sizeConfig = {
  sm: { icon: 16, gap: 2, badgeSize: 16, badgeText: 9, radius: 4, maxVisible: 2 },
  md: { icon: 32, gap: 4, badgeSize: 32, badgeText: 12, radius: 8, maxVisible: 2 },
} as const

type WorkerIconStackProps = {
  workers: string[]
  size: "sm" | "md"
  bgColor?: string
}

function IconWithTooltip({
  label,
  children,
}: {
  label: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex" role="img" tabIndex={0}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function WorkerIconStack({ workers, size, bgColor = "var(--color-surface-page)" }: WorkerIconStackProps) {
  const config = sizeConfig[size]

  if (workers.length === 0) {
    const dotSize = size === "md" ? 20 : config.icon
    return (
      <svg
        width={dotSize}
        height={dotSize}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-icon-tertiary"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    )
  }

  if (workers.length === 1) {
    return <SingleWorkerIcon worker={workers[0]} size={config.icon} />
  }

  const visible = workers.slice(0, config.maxVisible)
  const extra = workers.length - config.maxVisible
  const hiddenWorkers = workers.slice(config.maxVisible)

  return (
    <TooltipProvider delayDuration={200}>
      <span className="inline-flex shrink-0 items-center" style={{ gap: config.gap }}>
        {visible.map((worker) => (
          <IconWithTooltip key={worker} label={worker}>
            <span
              className="shrink-0 overflow-hidden"
              style={{ borderRadius: config.radius }}
            >
              <SingleWorkerIcon worker={worker} size={config.icon} />
            </span>
          </IconWithTooltip>
        ))}
        {extra > 0 && (
          <IconWithTooltip
            label={
              <div className="flex flex-col gap-2">
                {hiddenWorkers.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            }
          >
            <span
              className="flex shrink-0 items-center justify-center bg-surface-muted"
              style={{
                width: config.badgeSize,
                height: config.badgeSize,
                fontSize: config.badgeText,
                borderRadius: config.radius,
              }}
            >
              <span className="font-semibold leading-none text-text-secondary">
                +{extra}
              </span>
            </span>
          </IconWithTooltip>
        )}
      </span>
    </TooltipProvider>
  )
}
