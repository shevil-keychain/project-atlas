"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Shared types
 * -------------------------------------------------------------------------------------------------*/

type TabTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  icon?: React.ReactNode
  badge?: React.ReactNode
  subtext?: string
}

/* -------------------------------------------------------------------------------------------------
 * Root & Content (shared across all variants)
 * -------------------------------------------------------------------------------------------------*/

const Tabs = TabsPrimitive.Root

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentProps<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-16 focus-visible:outline-none", className)}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

/* -------------------------------------------------------------------------------------------------
 * Trigger inner layout (shared helper)
 * -------------------------------------------------------------------------------------------------*/

function TriggerContent({
  icon,
  badge,
  subtext,
  children,
}: Pick<TabTriggerProps, "icon" | "badge" | "subtext" | "children">) {
  return (
    <>
      <span className="inline-flex items-center gap-8">
        {icon && <span className="[&_svg]:size-16">{icon}</span>}
        <span>{children}</span>
        {badge}
      </span>
      {subtext && (
        <span className="block text-12 font-medium text-text-secondary">
          {subtext}
        </span>
      )}
    </>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Neutral Tabs (pill / segment style)
 * -------------------------------------------------------------------------------------------------*/

const NeutralTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentProps<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="neutral-tabs-list"
    className={cn(
      "inline-flex gap-4 rounded-lg bg-surface-sunken p-4",
      className,
    )}
    {...props}
  />
))
NeutralTabsList.displayName = "NeutralTabsList"

const NeutralTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, icon, badge, subtext, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="neutral-tabs-trigger"
    className={cn(
      "rounded-md px-16 py-8 text-14 font-semibold text-text-primary transition-colors",
      "hover:bg-surface-muted",
      "data-[state=active]:bg-surface-card data-[state=active]:text-text-primary data-[state=active]:shadow-sm",
      "disabled:cursor-not-allowed disabled:text-text-disabled",
      className,
    )}
    {...props}
  >
    <TriggerContent icon={icon} badge={badge} subtext={subtext}>
      {children}
    </TriggerContent>
  </TabsPrimitive.Trigger>
))
NeutralTabsTrigger.displayName = "NeutralTabsTrigger"

/* -------------------------------------------------------------------------------------------------
 * Brand Tabs
 * -------------------------------------------------------------------------------------------------*/

const BrandTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentProps<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="brand-tabs-list"
    className={cn("inline-flex gap-4 rounded-lg p-4", className)}
    {...props}
  />
))
BrandTabsList.displayName = "BrandTabsList"

const BrandTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, icon, badge, subtext, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="brand-tabs-trigger"
    className={cn(
      "rounded-md px-16 py-8 text-14 font-semibold text-text-primary transition-colors",
      "hover:bg-surface-brand-subtle",
      "data-[state=active]:bg-surface-brand-subtle data-[state=active]:text-text-brand",
      "disabled:cursor-not-allowed disabled:text-text-disabled",
      className,
    )}
    {...props}
  >
    <TriggerContent icon={icon} badge={badge} subtext={subtext}>
      {children}
    </TriggerContent>
  </TabsPrimitive.Trigger>
))
BrandTabsTrigger.displayName = "BrandTabsTrigger"

/* -------------------------------------------------------------------------------------------------
 * Underlined Tabs
 * -------------------------------------------------------------------------------------------------*/

const UnderlinedTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentProps<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="underlined-tabs-list"
    className={cn("inline-flex gap-12 border-b border-border-subtle", className)}
    {...props}
  />
))
UnderlinedTabsList.displayName = "UnderlinedTabsList"

const UnderlinedTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, icon, badge, subtext, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="underlined-tabs-trigger"
    className={cn(
      "-mb-px border-b-2 border-transparent py-8 text-14 font-semibold text-text-primary transition-colors",
      "hover:text-text-primary",
      "data-[state=active]:border-text-brand data-[state=active]:text-text-brand",
      "disabled:cursor-not-allowed disabled:text-text-disabled",
      className,
    )}
    {...props}
  >
    <TriggerContent icon={icon} badge={badge} subtext={subtext}>
      {children}
    </TriggerContent>
  </TabsPrimitive.Trigger>
))
UnderlinedTabsTrigger.displayName = "UnderlinedTabsTrigger"

/* -------------------------------------------------------------------------------------------------
 * Vertical Tabs
 * -------------------------------------------------------------------------------------------------*/

const VerticalTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentProps<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="vertical-tabs-list"
    className={cn("flex flex-col gap-4 p-4", className)}
    {...props}
  />
))
VerticalTabsList.displayName = "VerticalTabsList"

const VerticalTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, icon, badge, subtext, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="vertical-tabs-trigger"
    className={cn(
      "w-full rounded-md px-16 py-8 text-left text-14 font-semibold text-text-primary transition-colors",
      "hover:bg-interactive-secondary",
      "data-[state=active]:bg-surface-brand-subtle data-[state=active]:text-text-brand",
      "disabled:cursor-not-allowed disabled:text-text-disabled",
      className,
    )}
    {...props}
  >
    <TriggerContent icon={icon} badge={badge} subtext={subtext}>
      {children}
    </TriggerContent>
  </TabsPrimitive.Trigger>
))
VerticalTabsTrigger.displayName = "VerticalTabsTrigger"

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
  Tabs,
  TabsContent,
  NeutralTabsList,
  NeutralTabsTrigger,
  BrandTabsList,
  BrandTabsTrigger,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
  VerticalTabsList,
  VerticalTabsTrigger,
}

export type { TabTriggerProps }
