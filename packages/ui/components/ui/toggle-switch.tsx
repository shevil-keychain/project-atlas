"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function ToggleSwitch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="toggle-switch"
      className={cn(
        "peer inline-flex h-16 w-28 shrink-0 items-center rounded-full transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bg-stone-500",
        "hover:bg-stone-600",
        "data-[state=checked]:bg-primary-brand-500",
        "data-[state=checked]:hover:bg-primary-brand-400",
        "disabled:cursor-not-allowed",
        "disabled:data-[state=unchecked]:bg-stone-200 disabled:data-[state=unchecked]:hover:bg-stone-200",
        "disabled:data-[state=checked]:bg-primary-brand-200 disabled:data-[state=checked]:hover:bg-primary-brand-200",
        "group-hover:not-disabled:data-[state=unchecked]:bg-stone-600",
        "group-hover:not-disabled:data-[state=checked]:bg-primary-brand-400",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-12 rounded-full bg-white shadow-sm transition-transform",
          "translate-x-2 data-[state=checked]:translate-x-14"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { ToggleSwitch }
