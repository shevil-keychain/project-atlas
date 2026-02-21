"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  React.ComponentProps<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-12", className)}
    {...props}
  />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentProps<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-stone-300 rounded-lg bg-white overflow-hidden",
      className,
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ReactNode
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-16 py-12 text-14 font-semibold text-foreground transition-colors outline-none [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-8">
        {icon}
        {children}
      </span>
      <ChevronDown className="size-16 shrink-0 text-stone-600 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentProps<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-16 pb-16 pt-0 text-14 text-black", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
