import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-8 whitespace-nowrap text-14 font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-interactive-primary hover:bg-interactive-primary-hover text-text-inverse disabled:bg-surface-muted disabled:text-text-disabled",
        destructive:
          "bg-interactive-destructive hover:bg-interactive-destructive-hover text-text-inverse disabled:bg-surface-muted disabled:text-text-disabled",
        secondary:
          "bg-surface-card border border-border-default text-text-primary hover:bg-interactive-secondary hover:border-border-strong disabled:text-text-disabled disabled:border-border-subtle",
        ghost:
          "text-text-primary hover:bg-interactive-secondary disabled:text-text-disabled",
        linkPrimary:
          "text-text-brand underline-offset-4 hover:underline disabled:text-text-disabled disabled:no-underline",
        linkSecondary:
          "text-text-primary underline underline-offset-4 hover:underline disabled:text-text-disabled",
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
