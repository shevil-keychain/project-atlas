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
            ? "h-12 px-4 py-3 text-base font-medium"
            : "h-10 px-3 py-2 text-sm font-medium",
          error
            ? "border-error-500 focus:border-error-500 focus:shadow-[0px_0px_0px_4px_#FAD5CC]"
            : "border-stone-500 focus:border-primary-brand-500 focus:shadow-[0px_0px_0px_4px_#FFCB9B]",
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
