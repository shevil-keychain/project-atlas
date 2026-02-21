"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

type CheckboxCardProps = {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean | "indeterminate") => void
  disabled?: boolean
  icon?: React.ReactNode
  image?: React.ReactNode
  label: string
  subtext?: string
  className?: string
}

function CheckboxCard({
  checked,
  onCheckedChange,
  disabled,
  icon,
  image,
  label,
  subtext,
  className,
}: CheckboxCardProps) {
  return (
    <label
      data-slot="checkbox-card"
      className={cn(
        "group flex flex-col rounded-lg border px-16 py-12 transition-colors cursor-pointer select-none",
        checked
          ? "border-primary-brand-100"
          : "border-border-subtle",
        disabled && "cursor-not-allowed opacity-70",
        className
      )}
    >
      <div className="flex items-start gap-12">
        {icon && (
          <div className="flex size-32 shrink-0 items-center justify-center rounded-[8px] bg-surface-muted">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              "text-14 font-semibold text-text-primary leading-tight",
              disabled && "text-text-tertiary"
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
        <Checkbox
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

export { CheckboxCard }
export type { CheckboxCardProps }
