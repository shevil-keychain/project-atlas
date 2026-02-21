"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Textarea, type TextareaProps } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type TextareaFieldProps = TextareaProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
  maxLength?: number
  showCount?: boolean
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      hintText,
      errorText,
      required,
      optional,
      maxLength,
      showCount,
      className,
      id: idProp,
      disabled,
      value: valueProp,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const hasError = !!errorText

    const [internalValue, setInternalValue] = React.useState(
      () => String(defaultValue ?? "")
    )

    const isControlled = valueProp !== undefined
    const currentLength = isControlled
      ? String(valueProp).length
      : internalValue.length

    const isOverLimit = maxLength !== undefined && currentLength > maxLength
    const isNearLimit =
      maxLength !== undefined && currentLength >= Math.floor(maxLength * 0.9)

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    return (
      <div
        data-slot="textarea-field"
        className={cn("flex flex-col gap-1", className)}
      >
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

        <Textarea
          ref={ref}
          id={id}
          error={hasError}
          disabled={disabled}
          className={cn(label && "mt-1")}
          maxLength={maxLength}
          value={isControlled ? valueProp : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          {...props}
        />

        {(errorText || hintText || showCount) && (
          <div className="mt-1 flex justify-between gap-2">
            {errorText ? (
              <p className="text-xs font-medium text-error-500">{errorText}</p>
            ) : hintText ? (
              <p className="text-xs font-medium text-stone-700">{hintText}</p>
            ) : (
              <span />
            )}

            {showCount && maxLength !== undefined && (
              <p
                className={cn(
                  "text-xs font-medium tabular-nums shrink-0",
                  isOverLimit || isNearLimit
                    ? "text-error-500 font-medium"
                    : "text-stone-700 font-medium"
                )}
              >
                {currentLength}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)
TextareaField.displayName = "TextareaField"

export { TextareaField }
export type { TextareaFieldProps }
