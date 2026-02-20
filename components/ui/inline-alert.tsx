"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

const inlineAlertVariants = cva(
  "w-full rounded-lg border px-4 py-3 flex flex-row items-start gap-3",
  {
    variants: {
      variant: {
        info:
          "bg-secondary-blue-50 border-secondary-blue-100 text-secondary-blue-700",
        success: "bg-success-50 border-success-100 text-success-700",
        warning:
          "bg-secondary-yellow-50 border-secondary-yellow-300 text-secondary-yellow-800",
        error: "bg-error-50 border-error-100 text-error-700",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const defaultIcons: Record<
  NonNullable<VariantProps<typeof inlineAlertVariants>["variant"]>,
  React.ReactNode
> = {
  info: <Info className="size-5 shrink-0" />,
  success: <CheckCircle className="size-5 shrink-0" />,
  warning: <AlertTriangle className="size-5 shrink-0" />,
  error: <AlertCircle className="size-5 shrink-0" />,
}

export type InlineAlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof inlineAlertVariants> & {
    title?: string
    description?: React.ReactNode
    icon?: React.ReactNode
    action?: { label: string; onClick: () => void }
    onDismiss?: () => void
  }

function InlineAlert({
  className,
  variant = "info",
  title,
  description,
  icon,
  action,
  onDismiss,
  ...props
}: InlineAlertProps) {
  const iconNode = icon ?? (variant ? defaultIcons[variant] : null)

  return (
    <div
      data-slot="inline-alert"
      role="alert"
      className={cn(inlineAlertVariants({ variant }), className)}
      {...props}
    >
      {iconNode && (
        <span className="shrink-0 [&>svg]:size-5" aria-hidden>
          {iconNode}
        </span>
      )}
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        {title != null && (
          <span className="text-sm font-semibold">{title}</span>
        )}
        {description != null && (
          <span className="text-xs font-medium">{description}</span>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 text-sm font-medium underline underline-offset-4 transition-colors hover:no-underline"
        >
          {action.label}
        </button>
      )}
      {onDismiss != null && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-1 transition-opacity hover:opacity-70"
          aria-label="Dismiss"
        >
          <X className="size-5" />
        </button>
      )}
    </div>
  )
}

export { InlineAlert, inlineAlertVariants }
