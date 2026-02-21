"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetClose = Dialog.Close

type SheetScrollContextValue = {
  isScrollable: boolean
  setScrollable: (value: boolean) => void
}

const SheetScrollContext = React.createContext<SheetScrollContextValue>({
  isScrollable: false,
  setScrollable: () => {},
})

const sizeClasses = {
  sm: "w-[400px]",
  md: "w-[524px]",
  lg: "w-[720px]",
} as const

type SheetContentProps = React.ComponentProps<typeof Dialog.Content> & {
  size?: "sm" | "md" | "lg"
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, size = "md", children, ...props }, ref) => {
  const [isScrollable, setScrollable] = React.useState(false)

  return (
    <SheetScrollContext.Provider value={{ isScrollable, setScrollable }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "animate-in fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <Dialog.Content
          ref={ref}
          className={cn(
            "fixed right-8 top-8 bottom-8 z-50 bg-surface-card border border-border-subtle shadow-xl rounded-lg",
            "flex flex-col",
            "animate-in slide-in-from-right duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </SheetScrollContext.Provider>
  )
})
SheetContent.displayName = "SheetContent"

function SheetHeader({
  children,
  description,
  className,
}: {
  children: React.ReactNode
  description?: string
  className?: string
}) {
  const { isScrollable } = React.useContext(SheetScrollContext)
  return (
    <div
      className={cn(
        "flex items-center justify-between px-32 py-24",
        isScrollable && "border-b border-border-subtle",
        className
      )}
    >
      <div>
        <Dialog.Title className="text-lg font-bold text-text-primary">
          {children}
        </Dialog.Title>
        {description && (
          <Dialog.Description className="mt-4 text-14 text-stone-700">
            {description}
          </Dialog.Description>
        )}
      </div>
      <Dialog.Close className="size-32 rounded-lg hover:bg-stone-100 flex items-center justify-center">
        <X className="size-20" />
      </Dialog.Close>
    </div>
  )
}

function SheetBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const { setScrollable } = React.useContext(SheetScrollContext)

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
    <div ref={bodyRef} className={cn("flex-1 overflow-y-auto px-24 py-16 text-foreground", className)}>
      {children}
    </div>
  )
}

function SheetFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isScrollable } = React.useContext(SheetScrollContext)
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-12 px-32 py-32",
        isScrollable && "border-t border-stone-300",
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
}
export type { SheetContentProps }
