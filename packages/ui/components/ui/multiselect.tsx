"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Tag } from "@/components/ui/tag"

type MultiselectOption = {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

type MultiselectProps = {
  options: MultiselectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  inputSize?: "default" | "large"
  error?: boolean
  disabled?: boolean
  maxDisplayedTags?: number
  emptyMessage?: string
  className?: string
}

function Multiselect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  inputSize = "default",
  error,
  disabled,
  maxDisplayedTags,
  emptyMessage = "No results found",
  className,
}: MultiselectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedOptions = options.filter((o) => value.includes(o.value))

  const filtered = React.useMemo(() => {
    if (!search) return options
    const lower = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(lower))
  }, [options, search])

  React.useEffect(() => {
    if (open) {
      setSearch("")
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  function toggleOption(opt: MultiselectOption) {
    if (opt.disabled) return
    const next = value.includes(opt.value)
      ? value.filter((v) => v !== opt.value)
      : [...value, opt.value]
    onValueChange?.(next)
  }

  function removeTag(val: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (disabled) return
    onValueChange?.(value.filter((v) => v !== val))
  }

  const isLarge = inputSize === "large"
  const displayedTags = maxDisplayedTags && selectedOptions.length > maxDisplayedTags
    ? selectedOptions.slice(0, maxDisplayedTags)
    : selectedOptions
  const overflowCount = maxDisplayedTags && selectedOptions.length > maxDisplayedTags
    ? selectedOptions.length - maxDisplayedTags
    : 0

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          data-slot="multiselect-trigger"
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg bg-white border transition-all font-medium outline-none text-left",
            "hover:border-stone-600",
            "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
            selectedOptions.length > 0
              ? cn("min-h-10 px-3 py-1.5", isLarge && "min-h-12 px-4 py-2")
              : cn(isLarge ? "h-12 px-4 py-3 text-base" : "h-10 px-3 py-2 text-sm"),
            error
              ? "border-error-500 data-[state=open]:border-error-500 data-[state=open]:shadow-[0px_0px_0px_4px_#FAD5CC] focus:border-error-500 focus:shadow-[0px_0px_0px_4px_#FAD5CC]"
              : "border-stone-500 data-[state=open]:border-primary-brand-500 data-[state=open]:shadow-[0px_0px_0px_4px_#FFCB9B] focus:border-primary-brand-500 focus:shadow-[0px_0px_0px_4px_#FFCB9B]",
            className
          )}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-stone-600 text-sm truncate">{placeholder}</span>
          ) : (
            <span className="flex flex-wrap gap-1 flex-1 items-center">
              {displayedTags.map((opt) => (
                <Tag
                  key={opt.value}
                  onRemove={(e) => removeTag(opt.value, e)}
                  className={disabled ? "opacity-60" : undefined}
                >
                  {opt.label}
                </Tag>
              ))}
              {overflowCount > 0 && (
                <span className="text-xs font-medium text-stone-600 px-1">
                  +{overflowCount} more
                </span>
              )}
            </span>
          )}
          <ChevronDown className={cn("size-4 shrink-0 text-stone-600 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="multiselect-content"
          sideOffset={4}
          align="start"
          className={cn(
            "z-50 w-[var(--radix-popover-trigger-width)] bg-white rounded-lg border border-stone-500",
            "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-stone-400">
            <Search className="size-4 shrink-0 text-stone-600" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full text-sm outline-none placeholder:text-stone-600 bg-transparent"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-stone-600 text-center">{emptyMessage}</p>
            ) : (
              filtered.map((opt) => {
                const checked = value.includes(opt.value)
                return (
                  <div key={opt.value} className="px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => toggleOption(opt)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2 rounded-md text-sm font-semibold cursor-pointer outline-none transition-colors text-left",
                        "text-foreground hover:bg-stone-100",
                        opt.disabled && "text-stone-600 cursor-not-allowed hover:bg-transparent",
                        checked && "bg-primary-brand-50 text-primary-brand-700"
                      )}
                    >
                      <span className="flex items-center gap-2 [&_svg]:size-5">
                        {opt.icon}
                        {opt.label}
                      </span>
                      {checked && <Check className="size-4 shrink-0" />}
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

type MultiselectFieldProps = MultiselectProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
}

function MultiselectField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  inputSize = "default",
  className,
  ...props
}: MultiselectFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const isLarge = inputSize === "large"

  return (
    <div data-slot="multiselect-field" className={cn("flex flex-col gap-1", className)}>
      {label && (
        <Label
          htmlFor={generatedId}
          required={required}
          optional={optional}
          disabled={disabled}
          error={hasError}
        >
          {label}
        </Label>
      )}

      <Multiselect
        inputSize={inputSize}
        error={hasError}
        disabled={disabled}
        {...props}
      />

      {errorText ? (
        <p className={cn("font-medium text-error-500", isLarge ? "text-sm" : "text-xs")}>
          {errorText}
        </p>
      ) : hintText ? (
        <p className={cn("font-medium text-stone-700", isLarge ? "text-sm" : "text-xs")}>
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

export { Multiselect, MultiselectField }
export type { MultiselectProps, MultiselectFieldProps, MultiselectOption }
