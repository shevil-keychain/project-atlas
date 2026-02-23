"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type EmptyStateProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        className={cn(
          "flex w-full flex-col items-center justify-center gap-12 rounded-xl border border-border-subtle bg-surface-subtle px-24 py-32 text-center",
          className
        )}
        {...props}
      >
        <span
          className="flex size-48 shrink-0 items-center justify-center rounded-full bg-surface-page text-icon-secondary [&>svg]:size-24"
          aria-hidden
        >
          {icon}
        </span>
        <div className="flex flex-col items-center gap-4">
          <p className="text-18 font-semibold text-text-primary">{title}</p>
          {description != null ? (
            <p className="text-14 font-medium text-text-secondary">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState }
export type { EmptyStateProps }
