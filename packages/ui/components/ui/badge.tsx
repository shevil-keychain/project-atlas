import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium leading-none whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      color: {
        gray: "bg-surface-sunken text-text-primary",
        error: "bg-surface-error-subtle text-text-error",
        // These variants use palette-specific tokens — no semantic equivalent exists for these brand expression colors
        primary: "bg-primary-lime-100 text-primary-lime-900",
        warning: "bg-secondary-yellow-100 text-secondary-yellow-800",
        blue: "bg-primary-sky-50 text-primary-sky-800",
        purple: "bg-secondary-purple-50 text-secondary-purple-800",
      },
      size: {
        sm: "text-12 px-8 py-4 gap-4 [&_svg]:size-12",
        md: "text-14 px-10 py-4 gap-6 [&_svg]:size-14",
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
