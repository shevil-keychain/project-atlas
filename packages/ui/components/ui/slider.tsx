"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../lib/utils"
import { Label } from "./label"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  showValue?: boolean
  formatValue?: (value: number) => string
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue, formatValue, value, defaultValue, ...props }, ref) => {
  const currentValue = value ?? defaultValue ?? [0]
  const displayValues = Array.isArray(currentValue) ? currentValue : [currentValue]

  return (
    <div className="flex items-center gap-12">
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
          className
        )}
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-8 w-full grow overflow-hidden rounded-full bg-stone-300">
          <SliderPrimitive.Range className="absolute h-full bg-primary-brand-500 data-[disabled]:bg-stone-500" />
        </SliderPrimitive.Track>
        {displayValues.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block size-20 rounded-full border-2 border-primary-brand-500 bg-white shadow-sm transition-colors",
              "hover:border-primary-brand-600",
              "focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]",
              "disabled:border-stone-500 disabled:bg-stone-200"
            )}
          />
        ))}
      </SliderPrimitive.Root>
      {showValue && (
        <span className="text-14 font-semibold text-foreground tabular-nums min-w-[3ch] text-right">
          {displayValues.map((v) => formatValue ? formatValue(v) : v).join(" – ")}
        </span>
      )}
    </div>
  )
})
Slider.displayName = "Slider"

type SliderFieldProps = SliderProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
  showRange?: boolean
}

function SliderField({
  label,
  hintText,
  errorText,
  required,
  optional,
  showRange,
  disabled,
  min = 0,
  max = 100,
  formatValue,
  className,
  ...props
}: SliderFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const fmt = formatValue ?? ((v: number) => String(v))

  return (
    <div data-slot="slider-field" className={cn("flex flex-col gap-8", className)}>
      {(label || showRange) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label
              htmlFor={generatedId}
              required={required}
              optional={optional}
              disabled={disabled}
              error={hasError}
            >
              {label}
            </Label>
          )}
          {showRange && (
            <span className="text-12 font-medium text-stone-600 tabular-nums">
              {fmt(min)} – {fmt(max)}
            </span>
          )}
        </div>
      )}

      <Slider
        id={generatedId}
        min={min}
        max={max}
        disabled={disabled}
        formatValue={formatValue}
        {...props}
      />

      {errorText ? (
        <p className="text-12 font-medium text-error-500">{errorText}</p>
      ) : hintText ? (
        <p className="text-12 font-medium text-stone-700">{hintText}</p>
      ) : null}
    </div>
  )
}

export { Slider, SliderField }
export type { SliderProps, SliderFieldProps }
