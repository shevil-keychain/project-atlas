"use client"

import { ChevronDown, HelpCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopBarProps {
  organizationName?: string
  avatarInitial?: string
  avatarColor?: string
  className?: string
}

export function TopBar({
  organizationName = "Organization",
  avatarInitial = "M",
  avatarColor = "#E0593E",
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between border-b border-stone-200 bg-white pl-4 pr-2 py-[2px]",
        className
      )}
    >
      {/* Organization switcher */}
      <button
        type="button"
        className="flex items-center gap-1 rounded-[4px] px-4 py-1.5 transition-colors hover:bg-stone-100"
      >
        <span className="text-sm font-normal text-stone-700">
          {organizationName}
        </span>
        <ChevronDown className="size-4 text-stone-700" />
      </button>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-stone-100"
          aria-label="Help"
        >
          <HelpCircle className="size-5 text-stone-700" />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-stone-100"
          aria-label="Notifications"
        >
          <Bell className="size-5 text-stone-700" />
        </button>

        <button
          type="button"
          className="flex size-8 items-center justify-center"
          aria-label="User menu"
        >
          <div
            className="flex size-7 items-center justify-center rounded-full"
            style={{ backgroundColor: avatarColor }}
          >
            <span className="text-sm font-normal leading-none text-white">
              {avatarInitial}
            </span>
          </div>
        </button>
      </div>
    </header>
  )
}
