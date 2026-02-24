"use client"

import { cn } from "@level/ui/lib/utils"
import { type CSSProperties, memo } from "react"

type ShimmerElement = "div" | "p" | "span"

export type TextShimmerProps = {
  children: string
  as?: ShimmerElement
  className?: string
  duration?: number
}

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 3,
}: TextShimmerProps) => {
  return (
    <>
      <style>{`
        @keyframes text-shimmer {
          from { background-position: 0% center; }
          to { background-position: 100% center; }
        }
      `}</style>
      <Component
        className={cn("inline-block bg-clip-text text-transparent", className)}
        style={
          {
            backgroundImage:
              "linear-gradient(90deg, var(--color-text-tertiary) 0%, var(--color-text-primary) 50%, var(--color-text-tertiary) 100%)",
            backgroundSize: "200% 100%",
            animation: `text-shimmer ${duration}s ease-in-out infinite alternate`,
          } as CSSProperties
        }
      >
        {children}
      </Component>
    </>
  )
}

export const Shimmer = memo(ShimmerComponent)
