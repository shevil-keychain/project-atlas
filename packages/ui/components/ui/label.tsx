import * as React from "react"
import { cn } from "@/lib/utils"

type LabelProps = React.ComponentProps<"label"> & {
  required?: boolean
  optional?: boolean
  disabled?: boolean
  error?: boolean
}

function Label({
  children,
  className,
  required,
  optional,
  disabled,
  error,
  ...props
}: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-14 font-semibold leading-tight",
        error ? "text-error-500" : "text-foreground",
        disabled && "text-stone-600",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error-500 ml-2 font-medium">*</span>}
      {optional && (
        <span className="text-stone-600 font-medium ml-4">(optional)</span>
      )}
    </label>
  )
}

export { Label }
export type { LabelProps }
