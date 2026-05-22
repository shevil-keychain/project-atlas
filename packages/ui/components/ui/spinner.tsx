"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const sizeMap = { sm: 16, md: 24, lg: 40 } as const

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg"
  className?: string
}

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const s = sizeMap[size]
  const r = s / 2 - 2
  const c = 2 * Math.PI * r
  const dash = c * 0.25
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      className={cn("animate-spin text-primary-brand-500", className)}
      {...props}
    >
      <circle
        cx={s / 2}
        cy={s / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
      />
    </svg>
  )
}

function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-stone-900) 0%, var(--color-stone-900) 30%, var(--color-stone-400) 50%, var(--color-stone-900) 70%, var(--color-stone-900) 100%)",
      }}
    >
      {children}
    </span>
  )
}

export { Spinner, ShimmerText }
