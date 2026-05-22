"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "w-full rounded-lg bg-white border transition-all font-medium outline-none resize-y",
          "px-12 py-8 text-14 min-h-[80px] font-medium",
          "placeholder:text-stone-600",
          "hover:border-stone-600",
          "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600 disabled:resize-none",
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
Textarea.displayName = "Textarea"

export { Textarea }
export type { TextareaProps }
