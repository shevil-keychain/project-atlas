"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangular", width, height, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-stone-200 rounded-md animate-pulse",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded",
        className
      )}
      style={
        width !== undefined || height !== undefined
          ? { width: width ?? "100%", height, ...style }
          : style
      }
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  const widths = ["100%", "85%", "65%"]
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({
  size = 40,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <Skeleton
      variant="circular"
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border border-stone-300 rounded-lg overflow-hidden",
        className
      )}
    >
      <div className="p-2">
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
      <div className="px-4 py-3">
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard }
