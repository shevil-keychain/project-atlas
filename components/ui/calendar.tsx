"use client"

import * as React from "react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CalendarProps = DayPickerProps & {
  className?: string
}

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "relative flex flex-col gap-4",
        month_caption: "relative flex h-10 items-center justify-center",
        caption_label: "text-sm font-semibold text-foreground",
        nav: "absolute inset-x-0 top-3 flex h-10 items-center justify-between px-4",
        button_previous: cn(
          "inline-flex items-center justify-center size-8 rounded-md border border-stone-400 bg-white text-stone-700 hover:bg-stone-100 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        button_next: cn(
          "inline-flex items-center justify-center size-8 rounded-md border border-stone-400 bg-white text-stone-700 hover:bg-stone-100 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        month_grid: "border-collapse",
        weekdays: "",
        weekday: "h-9 w-9 text-center align-middle font-medium text-xs text-stone-600",
        week: "",
        day: cn(
          "h-9 w-9 p-0 text-center align-middle text-sm",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center size-9 rounded-md font-medium transition-colors",
          "hover:bg-stone-100 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand-200",
          "disabled:pointer-events-none disabled:opacity-50"
        ),
        selected: cn(
          "[&>button]:bg-primary-brand-500 [&>button]:text-white [&>button:hover]:bg-primary-brand-600",
          "[&>button]:focus-visible:ring-primary-brand-200"
        ),
        today: "[&>button]:bg-stone-100 [&>button]:text-foreground [&>button]:font-bold",
        outside: "text-stone-500 opacity-50",
        disabled: "text-stone-500 opacity-50",
        range_middle:
          "[&>button]:!bg-primary-brand-50 [&>button]:!text-primary-brand-700 [&>button]:rounded-none [&>button:hover]:!bg-primary-brand-50",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
export type { CalendarProps }
