"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { ToggleSwitch } from "@/components/ui/toggle-switch"

type ToggleWithLabelProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label: string
  labelPosition?: "left" | "right"
  subtext?: string
}

function ToggleWithLabel({
  label,
  labelPosition = "right",
  subtext,
  className,
  disabled,
  id,
  ...switchProps
}: ToggleWithLabelProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      data-slot="toggle-with-label"
      className={cn(
        "group flex items-start gap-3 cursor-pointer select-none",
        labelPosition === "left" && "flex-row-reverse",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <ToggleSwitch
        id={inputId}
        disabled={disabled}
        className="mt-0.5"
        {...switchProps}
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm font-semibold text-foreground leading-tight",
            disabled && "text-stone-600"
          )}
        >
          {label}
        </span>
        {subtext && (
          <span
            className={cn(
              "text-xs font-medium text-stone-700 leading-tight mt-1.5",
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

export { ToggleWithLabel }
export type { ToggleWithLabelProps }
