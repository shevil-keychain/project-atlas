"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { ToggleSwitch } from "./toggle-switch"

type ToggleCardProps = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  icon?: React.ReactNode
  image?: React.ReactNode
  label: string
  subtext?: string
  className?: string
}

function ToggleCard({
  checked,
  onCheckedChange,
  disabled,
  icon,
  image,
  label,
  subtext,
  className,
}: ToggleCardProps) {
  return (
    <label
      data-slot="toggle-card"
      className={cn(
        "group flex flex-col rounded-lg border px-16 py-12 transition-colors cursor-pointer select-none",
        checked
          ? "border-primary-brand-100"
          : "border-stone-300",
        disabled && "cursor-not-allowed opacity-70",
        className
      )}
    >
      <div className="flex items-start gap-12">
        {icon && (
          <div className="flex size-32 shrink-0 items-center justify-center rounded-[8px] bg-stone-200">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              "text-14 font-semibold text-foreground leading-tight",
              disabled && "text-stone-600"
            )}
          >
            {label}
          </span>
          {subtext && (
            <span
              className={cn(
                "text-12 font-medium text-stone-700 leading-tight mt-6",
                disabled && "text-stone-600"
              )}
            >
              {subtext}
            </span>
          )}
        </div>
        <ToggleSwitch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="mt-2"
        />
      </div>
      {image && (
        <div className="mt-12 overflow-hidden rounded-md">
          {image}
        </div>
      )}
    </label>
  )
}

export { ToggleCard }
export type { ToggleCardProps }
