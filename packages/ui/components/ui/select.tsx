"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  inputSize?: "default" | "large"
  error?: boolean
  icon?: React.ReactNode
}

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, inputSize = "default", error, icon, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      "flex w-full items-center justify-between gap-8 rounded-lg bg-white border transition-all font-medium outline-none",
      "text-foreground data-[placeholder]:text-stone-600",
      "hover:border-stone-600",
      "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
      inputSize === "large"
        ? "h-48 px-16 py-12 text-16 font-medium"
        : "h-40 px-12 py-8 text-14 font-medium",
      error
        ? "border-error-500 data-[state=open]:border-error-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-error-100)] focus-visible:border-error-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-error-100)]"
        : "border-stone-500 data-[state=open]:border-primary-brand-500 data-[state=open]:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)] focus-visible:border-primary-brand-500 focus-visible:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]",
      className
    )}
    {...props}
  >
    <span className="flex items-center gap-8 truncate [&_svg]:size-16 font-medium">
      {icon}
      {children}
    </span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-16 shrink-0 text-stone-600 transition-transform duration-200 data-[state=open]:rotate-180 font-medium" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentProps<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      position="popper"
      sideOffset={4}
      className={cn(
        "z-50 w-[var(--radix-select-trigger-width)] bg-white rounded-lg border border-stone-500 py-8",
        "shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = "SelectContent"

type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item> & {
  icon?: React.ReactNode
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, icon, ...props }, ref) => (
  <div className="px-6 py-2">
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        "flex items-center justify-between px-16 py-8 rounded-md text-14 font-semibold cursor-pointer outline-none transition-colors",
        "text-foreground font-medium",
        "data-[highlighted]:bg-stone-100",
        "data-[state=checked]:bg-primary-brand-50 data-[state=checked]:text-primary-brand-700",
        "data-[disabled]:text-stone-600 data-[disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-8 [&_svg]:size-16">
        {icon}
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <SelectPrimitive.ItemIndicator>
        <Check className="size-16" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  </div>
))
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentProps<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn(
      "px-22 py-6 text-12 font-semibold text-stone-600",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentProps<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("my-4 h-px bg-stone-400", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

type SelectFieldProps = {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
  disabled?: boolean
  inputSize?: "default" | "large"
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
  className?: string
}

function findSelectItemIcon(
  children: React.ReactNode,
  targetValue: string | undefined,
): React.ReactNode | undefined {
  if (!targetValue) return undefined

  let found: React.ReactNode | undefined

  React.Children.forEach(children, (child) => {
    if (found || !React.isValidElement(child)) return

    const props = child.props as {
      value?: string
      icon?: React.ReactNode
      children?: React.ReactNode
    }

    if (props.value === targetValue && props.icon) {
      found = props.icon
      return
    }

    if (props.children) {
      const nested = findSelectItemIcon(props.children, targetValue)
      if (nested) found = nested
    }
  })

  return found
}

function SelectField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  inputSize = "default",
  placeholder,
  value,
  onValueChange,
  defaultValue,
  children,
  className,
}: SelectFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText
  const isLarge = inputSize === "large"
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedValue = isControlled ? value : internalValue

  const selectedIcon = React.useMemo(
    () => findSelectItemIcon(children, selectedValue),
    [children, selectedValue],
  )

  function handleValueChange(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="select-field" className={cn("flex flex-col gap-4", className)}>
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

      <Select
        value={selectedValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={generatedId}
          inputSize={inputSize}
          error={hasError}
          icon={selectedIcon}
          disabled={disabled}
          className={cn(label && "mt-4")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>

      {errorText ? (
        <p className={cn("mt-4 font-medium text-error-500", isLarge ? "text-14 font-medium" : "text-12 font-medium")}>
          {errorText}
        </p>
      ) : hintText ? (
        <p className={cn("mt-4 font-medium text-stone-700", isLarge ? "text-14 font-medium" : "text-12 font-medium")}>
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectField,
}

export type { SelectTriggerProps, SelectItemProps, SelectFieldProps }
