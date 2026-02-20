"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type ComboboxOption = {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  inputSize?: "default" | "large"
  error?: boolean
  disabled?: boolean
  emptyMessage?: string
  className?: string
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  inputSize = "default",
  error,
  disabled,
  emptyMessage = "No results found",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  const filtered = React.useMemo(() => {
    if (!search) return options
    const lower = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(lower))
  }, [options, search])

  React.useEffect(() => {
    if (open) {
      setSearch("")
      setHighlightedIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  function handleSelect(opt: ComboboxOption) {
    if (opt.disabled) return
    onValueChange?.(opt.value)
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const enabledItems = filtered.filter((o) => !o.disabled)
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, enabledItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      const item = enabledItems[highlightedIndex]
      if (item) handleSelect(item)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    setHighlightedIndex(-1)
  }, [search])

  React.useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-combobox-item]")
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex])

  const isLarge = inputSize === "large"

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          data-slot="combobox-trigger"
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg bg-white border transition-all font-medium outline-none text-left",
            "hover:border-stone-600",
            "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
            isLarge ? "h-12 px-4 py-3 text-base" : "h-10 px-3 py-2 text-sm",
            error
              ? "border-error-500 data-[state=open]:border-error-500 data-[state=open]:shadow-[0px_0px_0px_4px_#FAD5CC] focus-visible:border-error-500 focus-visible:shadow-[0px_0px_0px_4px_#FAD5CC]"
              : "border-stone-500 data-[state=open]:border-primary-brand-500 data-[state=open]:shadow-[0px_0px_0px_4px_#FFCB9B] focus-visible:border-primary-brand-500 focus-visible:shadow-[0px_0px_0px_4px_#FFCB9B]",
            className
          )}
        >
          <span className={cn("flex items-center gap-2 truncate [&_svg]:size-4", !selected && "text-stone-600")}>
            {selected?.icon}
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={cn("size-4 shrink-0 text-stone-600 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="combobox-content"
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
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full text-sm outline-none placeholder:text-stone-600 bg-transparent"
            />
          </div>
          <div ref={listRef} className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-stone-600 text-center">{emptyMessage}</p>
            ) : (
              filtered.map((opt) => {
                const enabledItems = filtered.filter((o) => !o.disabled)
                const enabledIdx = enabledItems.indexOf(opt)
                return (
                  <div key={opt.value} className="px-1.5 py-0.5">
                    <button
                      type="button"
                      data-combobox-item=""
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2 rounded-md text-sm font-semibold cursor-pointer outline-none transition-colors text-left",
                        "text-foreground",
                        opt.disabled && "text-stone-600 cursor-not-allowed",
                        value === opt.value && "bg-primary-brand-50 text-primary-brand-700",
                        enabledIdx === highlightedIndex && value !== opt.value && "bg-stone-100"
                      )}
                    >
                      <span className="flex items-center gap-2 [&_svg]:size-4">
                        {opt.icon}
                        {opt.label}
                      </span>
                      {value === opt.value && <Check className="size-4 shrink-0" />}
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

type ComboboxFieldProps = ComboboxProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
}

function ComboboxField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  inputSize = "default",
  className,
  ...props
}: ComboboxFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const isLarge = inputSize === "large"

  return (
    <div data-slot="combobox-field" className={cn("flex flex-col gap-1", className)}>
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

      <div className={cn(label && "mt-1")}>
        <Combobox
          inputSize={inputSize}
          error={hasError}
          disabled={disabled}
          {...props}
        />
      </div>

      {errorText ? (
        <p className={cn("mt-1 font-medium text-error-500", isLarge ? "text-sm" : "text-xs")}>
          {errorText}
        </p>
      ) : hintText ? (
        <p className={cn("mt-1 font-medium text-stone-700", isLarge ? "text-sm" : "text-xs")}>
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

export { Combobox, ComboboxField }
export type { ComboboxProps, ComboboxFieldProps, ComboboxOption }
