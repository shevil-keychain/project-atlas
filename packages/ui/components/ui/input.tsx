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
          "w-full rounded-lg bg-white border transition-all font-medium outline-none",
          "placeholder:text-stone-600",
          "hover:border-stone-600",
          "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
          inputSize === "large"
            ? "h-48 px-16 py-12 text-16 font-medium"
            : "h-40 px-12 py-8 text-14 font-medium",
          error
            ? "border-error-500 focus:border-error-500 focus:shadow-[0px_0px_0px_4px_var(--color-error-100)]"
            : "border-stone-500 focus:border-primary-brand-500 focus:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]",
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
