"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InputFieldProps = InputProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hintText,
      errorText,
      required,
      optional,
      iconLeft,
      iconRight,
      inputSize = "default",
      className,
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const hasError = !!errorText
    const isLarge = inputSize === "large"

    return (
      <div data-slot="input-field" className={cn("flex flex-col gap-1", className)}>
        {label && (
          <Label
            htmlFor={id}
            required={required}
            optional={optional}
            disabled={disabled}
            error={hasError}
          >
            {label}
          </Label>
        )}

        <div className={cn("relative", label && "mt-1")}>
          {iconLeft && (
            <span
              className={cn(
                "absolute top-0 bottom-0 flex items-center text-stone-600 [&_svg]:size-4 font-medium",
                isLarge ? "left-4" : "left-3"
              )}
            >
              {iconLeft}
            </span>
          )}

          <Input
            ref={ref}
            id={id}
            inputSize={inputSize}
            error={hasError}
            disabled={disabled}
            className={cn(
              iconLeft && (isLarge ? "pl-12" : "pl-10"),
              iconRight && (isLarge ? "pr-12" : "pr-10")
            )}
            {...props}
          />

          {iconRight && (
            <span
              className={cn(
                "absolute top-0 bottom-0 flex items-center [&_svg]:size-4",
                hasError ? "text-error-500 font-medium" : "text-stone-600 font-medium",
                isLarge ? "right-4" : "right-3"
              )}
            >
              {iconRight}
            </span>
          )}
        </div>

        {errorText ? (
          <p
            className={cn(
              "mt-1 font-medium text-error-500",
              isLarge ? "text-sm font-medium" : "text-xs font-medium"
            )}
          >
            {errorText}
          </p>
        ) : hintText ? (
          <p
            className={cn(
              "mt-1 font-medium text-stone-700",
              isLarge ? "text-sm font-medium" : "text-xs font-medium"
            )}
          >
            {hintText}
          </p>
        ) : null}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
export type { InputFieldProps }
