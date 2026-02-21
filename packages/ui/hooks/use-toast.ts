"use client"

import * as React from "react"

type Toast = {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  duration?: number
}

let toasts: Toast[] = []
let listeners: Array<() => void> = []
let idCounter = 0

function notify() {
  listeners.forEach((l) => l())
}

function toast(options: Omit<Toast, "id">): string {
  const id = String(++idCounter)
  const newToast = { ...options, id }
  toasts = [...toasts, newToast]
  notify()

  const duration = options.duration ?? 5000
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  return id
}

function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id)
  notify()
}

function useToast() {
  const [state, setState] = React.useState<Toast[]>(toasts)

  React.useEffect(() => {
    const listener = () => setState([...toasts])
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return { toasts: state, toast, dismissToast }
}

export { toast, dismissToast, useToast }
export type { Toast }
