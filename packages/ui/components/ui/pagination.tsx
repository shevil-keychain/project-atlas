"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// AntD-style truncation: always 7 visible slots max (pages + ellipsis markers)
function getVisiblePages(
  current: number,
  total: number
): (number | "dots")[] {
  if (total <= 0) return []
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, "dots", total]
  if (current >= total - 3)
    return [1, "dots", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "dots", current - 1, current, current + 1, "dots", total]
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  showPageNumbers?: boolean
  className?: string
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  showPageNumbers = true,
  className,
}: PaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  const pages = getVisiblePages(currentPage, totalPages)

  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <div
      className={cn(
        "flex h-56 items-center justify-between border-t border-stone-300 bg-white px-16",
        className
      )}
    >
      <p className="text-12 font-medium text-foreground tabular-nums">
        Showing {start}–{end} of {totalItems}
      </p>

      <nav className="flex items-center gap-4" aria-label="Pagination">
        {showPageNumbers ? (
          <>
            <NavButton
              aria-label="Previous page"
              disabled={isFirst}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="size-20" />
            </NavButton>

            <div className="flex items-center gap-4">
              {pages.map((page, i) =>
                page === "dots" ? (
                  <span
                    key={`dots-${i}`}
                    className="inline-flex size-32 items-center justify-center text-14 text-stone-600 select-none"
                  >
                    ...
                  </span>
                ) : (
                  <PageButton
                    key={page}
                    page={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                  />
                )
              )}
            </div>

            <NavButton
              aria-label="Next page"
              disabled={isLast}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="size-20" />
            </NavButton>
          </>
        ) : (
          <>
            <NavButton
              aria-label="First page"
              disabled={isFirst}
              onClick={() => onPageChange(1)}
            >
              <ChevronsLeft className="size-20" />
            </NavButton>
            <NavButton
              aria-label="Previous page"
              disabled={isFirst}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="size-20" />
            </NavButton>
            <NavButton
              aria-label="Next page"
              disabled={isLast}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="size-20" />
            </NavButton>
            <NavButton
              aria-label="Last page"
              disabled={isLast}
              onClick={() => onPageChange(totalPages)}
            >
              <ChevronsRight className="size-20" />
            </NavButton>
          </>
        )}
      </nav>

      {onPageSizeChange && (
        <div className="flex items-center gap-8">
          <span className="text-12 font-medium text-foreground">
            Results per page
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger className="h-32 w-auto min-w-[56px] gap-4 border-stone-400 px-12 text-14 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-auto min-w-[var(--radix-select-trigger-width)]">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Internal sub-components                                           */
/* ------------------------------------------------------------------ */

function NavButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-32 items-center justify-center rounded-lg text-foreground transition-colors",
        "hover:bg-stone-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand-500",
        "disabled:pointer-events-none disabled:text-stone-400",
        className
      )}
      {...props}
    />
  )
}

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={`Page ${page}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex h-32 min-w-32 items-center justify-center rounded-lg px-8 text-14 font-medium tabular-nums transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand-500",
        active
          ? "bg-stone-200 text-foreground"
          : "text-foreground hover:bg-stone-100"
      )}
    >
      {page}
    </button>
  )
}
