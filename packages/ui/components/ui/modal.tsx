"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title

type ModalScrollContextValue = {
  isScrollable: boolean
  setScrollable: (value: boolean) => void
}

const ModalScrollContext = React.createContext<ModalScrollContextValue>({
  isScrollable: false,
  setScrollable: () => {},
})

const sizePresets = {
  sm: "max-w-[480px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[900px]",
  full: "max-w-[calc(100vw-64px)]",
}

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  size?: keyof typeof sizePresets
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size = "md", children, ...props }, ref) => {
  const [isScrollable, setScrollable] = React.useState(false)

  return (
    <ModalScrollContext.Provider value={{ isScrollable, setScrollable }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "animate-in fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-200 z-50 -translate-x-1/2 -translate-y-40",
            "w-full bg-surface-card rounded-lg border border-border-subtle shadow-lg",
            "flex flex-col max-h-[85vh]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            sizePresets[size],
            className
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </ModalScrollContext.Provider>
  )
})
DialogContent.displayName = "DialogContent"

type DialogHeaderProps = {
  children: React.ReactNode
  description?: string
  className?: string
}

function DialogHeader({ children, description, className }: DialogHeaderProps) {
  const { isScrollable } = React.useContext(ModalScrollContext)
  return (
    <div
      className={cn(
        "flex items-center justify-between px-32 py-24",
        isScrollable && "border-b border-border-subtle",
        className
      )}
    >
      <div>
        <DialogPrimitive.Title className="text-xl font-bold tracking-tight text-text-primary">
          {children}
        </DialogPrimitive.Title>
        {description && (
          <DialogPrimitive.Description className="text-14 text-text-secondary mt-4">
            {description}
          </DialogPrimitive.Description>
        )}
      </div>
      <DialogPrimitive.Close className="size-40 rounded-lg hover:bg-interactive-secondary flex items-center justify-center">
        <X className="size-20" />
      </DialogPrimitive.Close>
    </div>
  )
}

function DialogBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const { setScrollable } = React.useContext(ModalScrollContext)

  React.useEffect(() => {
    const el = bodyRef.current
    if (!el) return

    const check = () => setScrollable(el.scrollHeight > el.clientHeight)
    check()

    const observer = new ResizeObserver(check)
    observer.observe(el)

    return () => observer.disconnect()
  }, [setScrollable])

  return (
    <div ref={bodyRef} className={cn("flex-1 overflow-y-auto px-32 py-8 text-text-primary", className)}>
      {children}
    </div>
  )
}

function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isScrollable } = React.useContext(ModalScrollContext)
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-12 px-32 py-32",
        isScrollable && "border-t border-border-subtle",
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
}
export type { DialogContentProps, DialogHeaderProps }
