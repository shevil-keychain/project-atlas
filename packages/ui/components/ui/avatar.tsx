"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const AVATAR_COLORS = [
  "#9062CB", "#1A89B8", "#46A680", "#C75966", "#5A8D84",
  "#B97535", "#B09E3B", "#C9671D", "#6365F4", "#347D9B",
  "#469928", "#EA5F40", "#23A861", "#CF5C8C",
]

function hashNameToColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return ""
  if (trimmed.length === 1) return trimmed.toUpperCase()
  const parts = trimmed.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return trimmed.slice(0, 2).toUpperCase()
}

const sizeClasses = {
  xs: "size-24 text-[10.5px]",
  sm: "size-32 text-14",
  md: "size-40 text-[17.5px]",
  lg: "size-48 text-[21px]",
} as const

type AvatarProps = {
  name: string
  size?: "xs" | "sm" | "md" | "lg"
  color?: string
  className?: string
  src?: string
}

function Avatar({ name, size = "md", color, className, src }: AvatarProps) {
  const bgColor = color || hashNameToColor(name)
  const initials = getInitials(name)

  return (
    <span
      data-slot="avatar"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-text-inverse",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: src ? undefined : bgColor }}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="size-full rounded-full object-cover"
        />
      ) : (
        initials
      )}
    </span>
  )
}

export { Avatar, hashNameToColor, getInitials }
export type { AvatarProps }
