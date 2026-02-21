"use client"

import * as React from "react"
import { CheckCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

type AlertToastProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  onClose?: () => void
  className?: string
}

function AlertToast({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  onClose,
  className,
}: AlertToastProps) {
  const [closing, setClosing] = React.useState(false)

  function handleClose() {
    setClosing(true)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <div
      data-slot="alert-toast"
      className={cn(
        "flex min-h-[56px] max-w-[480px] items-center gap-3 rounded-lg bg-stone-800 p-4",
        closing
          ? "animate-[toast-fade-out_0.3s_ease-in_forwards]"
          : "animate-[toast-slide-in_0.3s_ease-out]",
        className,
      )}
      style={
        {
          "--tw-animate-duration": "0.3s",
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes toast-slide-in {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes toast-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      <span className="shrink-0 text-white font-medium">
        {icon ?? <CheckCircle size={16} />}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-white">{title}</span>
        {description && (
          <span className="text-xs font-medium text-stone-600">
            {description}
          </span>
        )}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100"
        >
          {actionLabel}
        </button>
      )}

      <button
        type="button"
        onClick={handleClose}
        className="shrink-0 text-white transition-colors hover:text-stone-400 font-medium"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export { AlertToast }
export type { AlertToastProps }
