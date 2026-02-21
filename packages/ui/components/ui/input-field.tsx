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
      <div data-slot="input-field" className={cn("flex flex-col gap-4", className)}>
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

        <div className={cn("relative", label && "mt-4")}>
          {iconLeft && (
            <span
              className={cn(
                "absolute top-0 bottom-0 flex items-center text-stone-600 [&_svg]:size-16 font-medium",
                isLarge ? "left-16" : "left-12"
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
              iconLeft && (isLarge ? "pl-48" : "pl-40"),
              iconRight && (isLarge ? "pr-48" : "pr-40")
            )}
            {...props}
          />

          {iconRight && (
            <span
              className={cn(
                "absolute top-0 bottom-0 flex items-center [&_svg]:size-16",
                hasError ? "text-error-500 font-medium" : "text-stone-600 font-medium",
                isLarge ? "right-16" : "right-12"
              )}
            >
              {iconRight}
            </span>
          )}
        </div>

        {errorText ? (
          <p
            className={cn(
              "mt-4 font-medium text-error-500",
              isLarge ? "text-14 font-medium" : "text-12 font-medium"
            )}
          >
            {errorText}
          </p>
        ) : hintText ? (
          <p
            className={cn(
              "mt-4 font-medium text-stone-700",
              isLarge ? "text-14 font-medium" : "text-12 font-medium"
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
