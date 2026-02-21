"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  inputSize?: "default" | "large"
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "default", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="input"
        className={cn(
          "w-full rounded-lg bg-surface-card border transition-all font-medium outline-none text-text-primary",
          "placeholder:text-text-tertiary",
          "hover:border-border-strong",
          "disabled:bg-surface-muted disabled:border-border-subtle disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
          inputSize === "large"
            ? "h-48 px-16 py-12 text-16 font-medium"
            : "h-40 px-12 py-8 text-14 font-medium",
          error
            ? "border-border-error focus:border-border-error focus:shadow-[var(--shadow-focus-ring-error)]"
            : "border-border-strong focus:border-border-focus focus:shadow-[var(--shadow-focus-ring)]",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
export type { InputProps }
