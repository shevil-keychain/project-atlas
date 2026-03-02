"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

const overlapClasses = {
  xs: "-ml-4",
  sm: "-ml-6",
  md: "-ml-8",
  lg: "-ml-8",
} as const

const sizeClasses = {
  xs: "size-24 text-[10.5px]",
  sm: "size-32 text-14",
  md: "size-40 text-[17.5px]",
  lg: "size-48 text-[21px]",
} as const

type AvatarGroupProps = {
  names: string[]
  max?: number
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

function AvatarGroup({ names, max = 3, size = "md", className }: AvatarGroupProps) {
  const visible = names.slice(0, max)
  const overflowCount = names.length - max
  const hiddenNames = names.slice(max)

  return (
    <span
      data-slot="avatar-group"
      className={cn("inline-flex items-center", className)}
    >
      {visible.map((name, i) => (
        <Avatar
          key={name + i}
          name={name}
          size={size}
          className={cn("ring-2 ring-white", i > 0 && overlapClasses[size])}
        />
      ))}
      {overflowCount > 0 && (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full bg-text-primary font-semibold text-text-inverse ring-2 ring-white",
            sizeClasses[size],
            overlapClasses[size],
          )}
          title={hiddenNames.join(", ")}
        >
          +{overflowCount}
        </span>
      )}
    </span>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps }
