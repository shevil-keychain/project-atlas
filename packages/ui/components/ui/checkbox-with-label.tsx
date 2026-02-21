"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

type CheckboxWithLabelProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label: string
  labelPosition?: "left" | "right"
  subtext?: string
}

function CheckboxWithLabel({
  label,
  labelPosition = "right",
  subtext,
  className,
  disabled,
  id,
  ...checkboxProps
}: CheckboxWithLabelProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      data-slot="checkbox-with-label"
      className={cn(
        "group flex items-start gap-12 cursor-pointer select-none",
        labelPosition === "left" && "flex-row-reverse",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <Checkbox
        id={inputId}
        disabled={disabled}
        className="mt-2"
        {...checkboxProps}
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

export { CheckboxWithLabel }
export type { CheckboxWithLabelProps }
