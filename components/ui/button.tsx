import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-muted disabled:text-muted-foreground",
        secondary:
          "bg-white border border-border text-foreground hover:border-stone-600 disabled:text-muted-foreground disabled:border-border",
        ghost:
          "text-foreground hover:bg-accent disabled:text-muted-foreground",
        linkPrimary:
          "text-primary-brand-700 underline-offset-4 hover:underline disabled:text-muted-foreground disabled:no-underline",
        linkSecondary:
          "text-foreground underline underline-offset-4 hover:underline disabled:text-muted-foreground",
      },
      size: {
        sm: "h-8 text-sm px-3 rounded-md",
        default: "h-10 text-sm px-4 rounded-md",
        lg: "h-12 text-base px-6 rounded-md",
        icon: "size-9 rounded-md",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Comp>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
