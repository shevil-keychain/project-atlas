"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type StepItem = {
  label: string
  disabled?: boolean
}

type StepState = "completed" | "active" | "upcoming" | "disabled"

export type StepsProps = {
  steps: StepItem[]
  currentStep: number
  onStepClick?: (index: number) => void
  className?: string
}

function getStepState(
  index: number,
  currentStep: number,
  isDisabled: boolean
): StepState {
  if (isDisabled) return "disabled"
  if (index < currentStep) return "completed"
  if (index === currentStep) return "active"
  return "upcoming"
}

export function Steps({ steps, currentStep, onStepClick, className }: StepsProps) {
  if (steps.length === 0) return null

  const bounded = Math.min(Math.max(currentStep, 0), steps.length - 1)

  return (
    <nav
      data-slot="steps"
      aria-label="Progress"
      className={cn(
        "flex w-full items-center justify-center border-b border-stone-300 bg-white px-6 py-3",
        className
      )}
    >
      <ol className="flex items-center gap-6">
        {steps.map((step, index) => {
          const state = getStepState(index, bounded, step.disabled === true)
          const isClickable = Boolean(onStepClick) && state !== "disabled"

          const pill = (
            <>
              <span
                data-slot="steps-badge"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium leading-[18px]",
                  state === "active"
                    ? "bg-primary-brand-100 text-primary-brand-700"
                    : state === "disabled"
                      ? "bg-stone-200 text-stone-500"
                      : "bg-stone-200 text-stone-800"
                )}
              >
                {index + 1}
              </span>
              <span
                data-slot="steps-label"
                className={cn(
                  "text-sm font-semibold leading-6 whitespace-nowrap",
                  state === "active" && "text-primary-brand-700",
                  state === "completed" && "text-foreground",
                  state === "upcoming" && "text-foreground",
                  state === "disabled" && "text-stone-500"
                )}
              >
                {step.label}
              </span>
            </>
          )

          const pillClasses = cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-[7px] transition-colors",
            state === "active" && "bg-primary-brand-50",
            state === "disabled" && "cursor-not-allowed"
          )

          return (
            <li key={`${step.label}-${index}`} data-slot="steps-item">
              {isClickable ? (
                <button
                  type="button"
                  className={cn(
                    pillClasses,
                    "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand-200 focus-visible:ring-offset-2"
                  )}
                  data-state={state}
                  aria-current={state === "active" ? "step" : undefined}
                  onClick={() => onStepClick?.(index)}
                >
                  {pill}
                </button>
              ) : (
                <div
                  className={pillClasses}
                  data-state={state}
                  aria-current={state === "active" ? "step" : undefined}
                >
                  {pill}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
