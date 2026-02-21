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
      className={cn("p-12", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-16",
        month: "relative flex flex-col gap-16",
        month_caption: "relative flex h-40 items-center justify-center",
        caption_label: "text-14 font-semibold text-foreground",
        nav: "absolute inset-x-0 top-12 flex h-40 items-center justify-between px-16",
        button_previous: cn(
          "inline-flex items-center justify-center size-32 rounded-md border border-stone-400 bg-white text-stone-700 hover:bg-stone-100 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        button_next: cn(
          "inline-flex items-center justify-center size-32 rounded-md border border-stone-400 bg-white text-stone-700 hover:bg-stone-100 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        month_grid: "border-collapse",
        weekdays: "",
        weekday: "h-36 w-36 text-center align-middle font-medium text-12 text-stone-600",
        week: "",
        day: cn(
          "h-36 w-36 p-0 text-center align-middle text-14",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center size-36 rounded-md font-medium transition-colors",
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
            <ChevronLeft className="size-16" />
          ) : (
            <ChevronRight className="size-16" />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
export type { CalendarProps }
