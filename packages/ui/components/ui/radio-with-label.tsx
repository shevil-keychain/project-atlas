"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RadioGroupItem } from "@/components/ui/radio-group"

type RadioWithLabelProps = React.ComponentProps<typeof RadioGroupItem> & {
  label: string
  labelPosition?: "left" | "right"
  subtext?: string
}

function RadioWithLabel({
  label,
  labelPosition = "right",
  subtext,
  className,
  disabled,
  value,
  ...radioProps
}: RadioWithLabelProps) {
  return (
    <label
      data-slot="radio-with-label"
      className={cn(
        "group flex items-start gap-12 cursor-pointer select-none",
        labelPosition === "left" && "flex-row-reverse",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <RadioGroupItem
        value={value}
        disabled={disabled}
        className="mt-2"
        {...radioProps}
      />
      <div className="flex flex-col">
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
    </label>
  )
}

export { RadioWithLabel }
export type { RadioWithLabelProps }
