"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { CalendarDays, ChevronDown } from "lucide-react"
import { format as formatDate } from "date-fns"
import { cn } from "../../lib/utils"
import { Label } from "./label"
import { Calendar } from "./calendar"
import type { DateRange } from "react-day-picker"

type DatePickerProps = {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  dateFormat?: string
  inputSize?: "default" | "large"
  error?: boolean
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  className?: string
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  dateFormat = "MMM d, yyyy",
  inputSize = "default",
  error,
  disabled,
  fromDate,
  toDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const isLarge = inputSize === "large"

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          data-slot="date-picker-trigger"
          className={cn(
            "flex w-full items-center justify-between gap-8 rounded-lg bg-white border transition-all font-medium outline-none text-left",
            "hover:border-stone-600",
            "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
            isLarge ? "h-48 px-16 py-12 text-16" : "h-40 px-12 py-8 text-14",
            error
              ? "border-error-500 data-[state=open]:border-error-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-error-100)] focus-visible:border-error-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-error-100)]"
              : "border-stone-500 data-[state=open]:border-primary-brand-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)] focus-visible:border-primary-brand-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]",
            className
          )}
        >
          <span className={cn("flex items-center gap-8", !value && "text-stone-600")}>
            <CalendarDays className="size-16 shrink-0" />
            {value ? formatDate(value, dateFormat) : placeholder}
          </span>
          <ChevronDown className={cn("size-16 shrink-0 text-stone-600 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="date-picker-content"
          sideOffset={4}
          align="start"
          className={cn(
            "z-50 bg-white rounded-lg border border-stone-500",
            "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(day) => {
              onValueChange?.(day)
              setOpen(false)
            }}
            disabled={(() => {
              const matchers: import("react-day-picker").Matcher[] = []
              if (fromDate) matchers.push({ before: fromDate })
              if (toDate) matchers.push({ after: toDate })
              return matchers.length > 0 ? matchers : undefined
            })()}
            defaultMonth={value}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

type DateRangePickerProps = {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  dateFormat?: string
  inputSize?: "default" | "large"
  error?: boolean
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  className?: string
}

function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Pick a date range",
  dateFormat = "MMM d, yyyy",
  inputSize = "default",
  error,
  disabled,
  fromDate,
  toDate,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const isLarge = inputSize === "large"

  const displayValue = value?.from
    ? value.to
      ? `${formatDate(value.from, dateFormat)} – ${formatDate(value.to, dateFormat)}`
      : formatDate(value.from, dateFormat)
    : null

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          data-slot="date-range-picker-trigger"
          className={cn(
            "flex w-full items-center justify-between gap-8 rounded-lg bg-white border transition-all font-medium outline-none text-left",
            "hover:border-stone-600",
            "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
            isLarge ? "h-48 px-16 py-12 text-16" : "h-40 px-12 py-8 text-14",
            error
              ? "border-error-500 data-[state=open]:border-error-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-error-100)] focus-visible:border-error-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-error-100)]"
              : "border-stone-500 data-[state=open]:border-primary-brand-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)] focus-visible:border-primary-brand-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]",
            className
          )}
        >
          <span className={cn("flex items-center gap-8", !displayValue && "text-stone-600")}>
            <CalendarDays className="size-16 shrink-0" />
            {displayValue || placeholder}
          </span>
          <ChevronDown className={cn("size-16 shrink-0 text-stone-600 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="date-range-picker-content"
          sideOffset={4}
          align="start"
          className={cn(
            "z-50 bg-white rounded-lg border border-stone-500",
            "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <Calendar
            mode="range"
            selected={value}
            onSelect={(range) => onValueChange?.(range)}
            numberOfMonths={2}
            disabled={(() => {
              const matchers: import("react-day-picker").Matcher[] = []
              if (fromDate) matchers.push({ before: fromDate })
              if (toDate) matchers.push({ after: toDate })
              return matchers.length > 0 ? matchers : undefined
            })()}
            defaultMonth={value?.from}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

type DatePickerFieldProps = DatePickerProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
}

function DatePickerField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  inputSize = "default",
  className,
  ...props
}: DatePickerFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const isLarge = inputSize === "large"

  return (
    <div data-slot="date-picker-field" className={cn("flex flex-col gap-4", className)}>
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

      <div className={cn(label && "mt-4")}>
        <DatePicker inputSize={inputSize} error={hasError} disabled={disabled} {...props} />
      </div>

      {errorText ? (
        <p className={cn("mt-4 font-medium text-error-500", isLarge ? "text-14" : "text-12")}>
          {errorText}
        </p>
      ) : hintText ? (
        <p className={cn("mt-4 font-medium text-stone-700", isLarge ? "text-14" : "text-12")}>
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

type DateRangePickerFieldProps = DateRangePickerProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
}

function DateRangePickerField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  inputSize = "default",
  className,
  ...props
}: DateRangePickerFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const isLarge = inputSize === "large"

  return (
    <div data-slot="date-range-picker-field" className={cn("flex flex-col gap-4", className)}>
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

      <div className={cn(label && "mt-4")}>
        <DateRangePicker inputSize={inputSize} error={hasError} disabled={disabled} {...props} />
      </div>

      {errorText ? (
        <p className={cn("mt-4 font-medium text-error-500", isLarge ? "text-14" : "text-12")}>
          {errorText}
        </p>
      ) : hintText ? (
        <p className={cn("mt-4 font-medium text-stone-700", isLarge ? "text-14" : "text-12")}>
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

export { DatePicker, DateRangePicker, DatePickerField, DateRangePickerField }
export type { DatePickerProps, DateRangePickerProps, DatePickerFieldProps, DateRangePickerFieldProps }
