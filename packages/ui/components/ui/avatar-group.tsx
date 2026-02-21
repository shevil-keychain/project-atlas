"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

const overlapClasses = {
  xs: "-ml-1",
  sm: "-ml-1.5",
  md: "-ml-2",
  lg: "-ml-2",
} as const

const sizeClasses = {
  xs: "size-6 text-[10.5px]",
  sm: "size-8 text-sm",
  md: "size-10 text-[17.5px]",
  lg: "size-12 text-[21px]",
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
            "inline-flex shrink-0 items-center justify-center rounded-full bg-stone-200 font-semibold text-stone-700 ring-2 ring-white",
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
