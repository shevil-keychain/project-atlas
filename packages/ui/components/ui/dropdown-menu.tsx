"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, align = "start", ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "z-50 min-w-[180px] bg-white rounded-lg border border-stone-500 py-4",
        "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    destructive?: boolean
  }
>(({ className, inset, destructive, children, ...props }, ref) => (
  <div className="px-6 py-2">
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center gap-8 px-16 py-8 rounded-md text-14 font-semibold cursor-pointer outline-none transition-colors",
        "[&_svg]:size-16",
        destructive
          ? "text-error-500 data-[highlighted]:bg-error-50"
          : "text-foreground data-[highlighted]:bg-stone-100",
        "data-[disabled]:text-stone-600 data-[disabled]:cursor-not-allowed",
        inset && "pl-32",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  </div>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <div className="px-6 py-2">
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex items-center gap-8 pl-32 pr-16 py-8 rounded-md text-14 font-semibold cursor-pointer outline-none transition-colors",
        "text-foreground data-[highlighted]:bg-stone-100",
        "data-[disabled]:text-stone-600 data-[disabled]:cursor-not-allowed",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-12 flex size-16 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-16" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  </div>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <div className="px-6 py-2">
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex items-center gap-8 pl-32 pr-16 py-8 rounded-md text-14 font-semibold cursor-pointer outline-none transition-colors",
        "text-foreground data-[highlighted]:bg-stone-100",
        "data-[disabled]:text-stone-600 data-[disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="absolute left-12 flex size-16 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-8 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  </div>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-22 py-6 text-12 font-semibold text-stone-600",
      inset && "pl-32",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("mx-6 my-4 h-px bg-stone-400", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <div className="px-6 py-2">
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex items-center gap-8 px-16 py-8 rounded-md text-14 font-semibold cursor-pointer outline-none transition-colors",
        "[&_svg]:size-16",
        "text-foreground data-[highlighted]:bg-stone-100 data-[state=open]:bg-stone-100",
        inset && "pl-32",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-16" />
    </DropdownMenuPrimitive.SubTrigger>
  </div>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[180px] bg-white rounded-lg border border-stone-500 py-4",
        "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
}
