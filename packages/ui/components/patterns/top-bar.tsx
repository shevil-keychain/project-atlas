"use client"

import { HelpCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopBarProps {
  avatarInitial?: string
  avatarColor?: string
  className?: string
}

export function TopBar({
  avatarInitial = "M",
  avatarColor = "#E0593E",
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-end border-b border-stone-200 bg-white px-8 py-[2px]",
        className
      )}
    >
      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg p-8 transition-colors hover:bg-stone-100"
          aria-label="Help"
        >
          <HelpCircle className="size-20 text-black font-medium" />
        </button>

        <button
          type="button"
          className="rounded-lg p-8 transition-colors hover:bg-stone-100"
          aria-label="Notifications"
        >
          <Bell className="size-20 text-black font-medium" />
        </button>

        <button
          type="button"
          className="flex size-32 items-center justify-center"
          aria-label="User menu"
        >
          <div
            className="flex size-28 items-center justify-center rounded-full"
            style={{ backgroundColor: avatarColor }}
          >
            <span className="text-14 font-medium leading-none text-white">
              {avatarInitial}
            </span>
          </div>
        </button>
      </div>
    </header>
  )
}
