"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  theme?: "light" | "dark"
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, theme = "dark", sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="tooltip-content"
      className={cn(
        "z-50 rounded-lg px-3 py-2 text-xs font-semibold",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        theme === "light"
          ? "bg-white text-foreground border border-stone-300 shadow-lg font-medium"
          : "bg-[#1B2432] text-white shadow-md font-medium",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        className={cn(
          theme === "light"
            ? "fill-white drop-shadow-sm"
            : "fill-[#1B2432]"
        )}
        width={8}
        height={4}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = "TooltipContent"

type SimpleTooltipProps = {
  children: React.ReactNode
  content?: React.ReactNode
  title?: string
  description?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  theme?: "light" | "dark"
  delayDuration?: number
}

function SimpleTooltip({
  children,
  content,
  title,
  description,
  side = "top",
  align = "center",
  theme = "dark",
  delayDuration,
}: SimpleTooltipProps) {
  const tooltipBody =
    title && description ? (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold">{title}</span>
        <span
          className={cn(
            "text-xs font-medium",
            theme === "dark" ? "text-stone-400 font-medium" : "text-stone-700 font-medium"
          )}
        >
          {description}
        </span>
      </div>
    ) : (
      content
    )

  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align} theme={theme}>
        {tooltipBody}
      </TooltipContent>
    </Tooltip>
  )
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
}
export type { TooltipContentProps, SimpleTooltipProps }
