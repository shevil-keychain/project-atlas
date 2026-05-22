"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "../../lib/utils"

function Checkbox({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      className={cn(
        "peer size-16 shrink-0 rounded-[4px] border transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bg-surface-card border-stone-600",
        "hover:border-stone-700",
        "data-[state=checked]:bg-interactive-primary data-[state=checked]:border-border-focus",
        "data-[state=checked]:hover:bg-primary-brand-400 data-[state=checked]:hover:border-primary-brand-400",
        "data-[state=indeterminate]:bg-interactive-primary data-[state=indeterminate]:border-border-focus",
        "data-[state=indeterminate]:hover:bg-primary-brand-400 data-[state=indeterminate]:hover:border-primary-brand-400",
        "disabled:cursor-not-allowed disabled:bg-stone-400 disabled:border-border-default",
        "disabled:data-[state=checked]:bg-stone-400 disabled:data-[state=checked]:border-border-default",
        "disabled:data-[state=indeterminate]:bg-stone-400 disabled:data-[state=indeterminate]:border-border-default",
        "disabled:hover:bg-stone-400 disabled:hover:border-border-default",
        "disabled:[&_svg]:text-text-secondary",
        "group-hover:not-disabled:data-[state=unchecked]:border-stone-700",
        "group-hover:not-disabled:data-[state=checked]:bg-primary-brand-400 group-hover:not-disabled:data-[state=checked]:border-primary-brand-400",
        "group-hover:not-disabled:data-[state=indeterminate]:bg-primary-brand-400 group-hover:not-disabled:data-[state=indeterminate]:border-primary-brand-400",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-text-inverse font-medium">
        {checked === "indeterminate" ? (
          <Minus className="size-12" />
        ) : (
          <Check className="size-12" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
