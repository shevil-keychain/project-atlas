import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium leading-none whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      color: {
        gray: "bg-stone-100 text-stone-800",
        primary: "bg-primary-lime-100 text-primary-lime-900",
        warning: "bg-secondary-yellow-100 text-secondary-yellow-800",
        error: "bg-error-50 text-error-600",
        blue: "bg-primary-sky-50 text-primary-sky-800",
        purple: "bg-secondary-purple-50 text-secondary-purple-800",
      },
      size: {
        sm: "text-xs px-2 py-1 gap-1 [&_svg]:size-3",
        md: "text-sm px-2.5 py-1 gap-1.5 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "md",
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode
  }

function Badge({ className, color, size, icon, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ color, size, className }))}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
