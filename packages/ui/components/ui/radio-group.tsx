"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "../../lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-12", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer size-16 shrink-0 rounded-full border transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bg-white border-stone-600",
        "hover:border-stone-700",
        "data-[state=checked]:border-primary",
        "data-[state=checked]:hover:border-primary-brand-400",
        "disabled:cursor-not-allowed disabled:bg-stone-300 disabled:border-stone-300",
        "disabled:data-[state=checked]:bg-stone-400 disabled:data-[state=checked]:border-stone-400",
        "disabled:hover:bg-stone-300 disabled:hover:border-stone-300",
        "disabled:data-[state=checked]:hover:bg-stone-400 disabled:data-[state=checked]:hover:border-stone-400",
        "disabled:[&_svg]:fill-stone-600 disabled:[&_svg]:text-stone-600",
        "group-hover:not-disabled:data-[state=unchecked]:border-stone-700",
        "group-hover:not-disabled:data-[state=checked]:border-primary-brand-400",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-8 fill-primary text-primary font-medium" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
