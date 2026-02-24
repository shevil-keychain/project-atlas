"use client"

import * as React from "react"
import { useToast, dismissToast } from "@/hooks/use-toast"
import { AlertToast } from "@/components/ui/alert-toast"
import { cn } from "@/lib/utils"

type ToastPosition =
  | "top-center"
  | "top-right"
  | "bottom-center"
  | "bottom-right"

type ToastContainerProps = {
  position?: ToastPosition
  className?: string
}

const positionClasses: Record<ToastPosition, string> = {
  "top-center": "fixed top-16 left-1/2 -translate-x-1/2",
  "top-right": "fixed top-16 right-16",
  "bottom-center": "fixed bottom-40 left-1/2 -translate-x-1/2",
  "bottom-right": "fixed bottom-40 right-16",
}

function ToastContainer({
  position = "bottom-center",
  className,
}: ToastContainerProps) {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      data-slot="toast-container"
      className={cn(
        "z-50 flex flex-col gap-8",
        positionClasses[position],
        className,
      )}
    >
      {toasts.map((t) => (
        <AlertToast
          key={t.id}
          title={t.title}
          description={t.description}
          icon={t.icon}
          actionLabel={t.actionLabel}
          onAction={t.onAction}
          onClose={() => dismissToast(t.id)}
          slideFrom={position.startsWith("bottom") ? "bottom" : "top"}
        />
      ))}
    </div>
  )
}

export { ToastContainer }
export type { ToastContainerProps, ToastPosition }
