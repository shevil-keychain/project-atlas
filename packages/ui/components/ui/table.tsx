"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse caption-bottom text-14", className)}
    {...props}
  />
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={className} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={className} {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-stone-300 hover:bg-stone-50 transition-colors",
      "data-[state=selected]:bg-primary-brand-50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean
  sorted?: boolean
  sortDirection?: "asc" | "desc"
  onSort?: () => void
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      sortable,
      sorted,
      sortDirection,
      onSort,
      children,
      ...props
    },
    ref
  ) => {
    const baseClass =
      "text-left text-12 font-semibold text-stone-700 px-16 py-12"
    if (sortable) {
      const Icon =
        sortDirection === "asc"
          ? ChevronUp
          : sortDirection === "desc"
            ? ChevronDown
            : ChevronsUpDown
      return (
        <th
          ref={ref}
          className={cn(baseClass, className)}
          data-sorted={sorted ? "true" : undefined}
          {...props}
        >
          <button
            type="button"
            className="inline-flex items-center gap-6 hover:opacity-80"
            onClick={onSort}
          >
            {children}
            <Icon className="size-16 shrink-0" />
          </button>
        </th>
      )
    }
    return (
      <th
        ref={ref}
        className={cn(baseClass, className)}
        {...props}
      >
        {children}
      </th>
    )
  }
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-16 py-12 text-14 font-medium text-foreground", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-8 text-14 text-stone-600 text-left", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
