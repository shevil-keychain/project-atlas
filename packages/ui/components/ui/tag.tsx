"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const tagVariants = cva(
  "rounded-full pl-12 pr-8 inline-flex items-center gap-6 text-12 py-4 font-medium bg-surface-muted text-text-primary [&_[data-tag-remove]:hover]:bg-stone-300"
)

export type TagProps = React.ComponentProps<"span"> & {
  onRemove: (e: React.MouseEvent) => void
  icon?: React.ReactNode
}

function Tag({
  className,
  onRemove,
  icon,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ className }))}
      {...props}
    >
      {icon && (
        <span className="inline-flex items-center justify-center [&_svg]:size-14 [&_svg]:shrink-0">
          {icon}
        </span>
      )}
      {children}
      <span
        role="button"
        tabIndex={0}
        data-tag-remove
        onClick={(e) => {
          e.stopPropagation()
          onRemove(e)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
            onRemove(e as unknown as React.MouseEvent)
          }
        }}
        className="size-20 rounded p-2 inline-flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Remove"
      >
        <X className="size-14" />
      </span>
    </span>
  )
}

export { Tag, tagVariants }
