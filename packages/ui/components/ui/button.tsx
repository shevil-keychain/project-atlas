import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-8 whitespace-nowrap text-14 text-primary-foreground font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground",
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
        sm: "h-32 px-12 rounded-lg",
        default: "h-40 px-16 rounded-lg",
        lg: "h-48 px-24 rounded-lg text-16",
        icon: "size-36 rounded-lg",
        "icon-sm": "size-32 rounded-lg",
        "icon-lg": "size-40 rounded-lg",
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
    shortcut?: string
  }

function Kbd({ shortcut }: { shortcut: string }) {
  const keys = shortcut.split("+").map((k) => k.trim())
  return (
    <kbd className="ml-auto inline-flex items-center gap-2 text-12 font-medium opacity-60">
      {keys.map((key, i) => (
        <span
          key={i}
          className="inline-flex h-20 min-w-20 items-center justify-center rounded bg-white/10 px-4 font-mono text-[11px]"
        >
          {key}
        </span>
      ))}
    </kbd>
  )
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  shortcut,
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
      {shortcut && <Kbd shortcut={shortcut} />}
      {iconRight}
    </Comp>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
