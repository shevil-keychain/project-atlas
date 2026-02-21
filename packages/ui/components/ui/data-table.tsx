"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Search, Columns3, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type DataTableColumn = {
  id: string
  header: string
  sortable?: boolean
  cell?: (row: Record<string, unknown>) => React.ReactNode
  accessorKey?: string
}

export type DataTableDensity = "compact" | "default" | "comfortable"

export interface DataTableProps {
  columns: DataTableColumn[]
  data: Record<string, unknown>[]
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  density?: DataTableDensity
  onDensityChange?: (d: DataTableDensity) => void
  pageSize?: number
  pageSizeOptions?: number[]
  onRowClick?: (row: Record<string, unknown>, index: number) => void
  onSelectionChange?: (selected: Set<string>) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  emptyMessage?: string
  totalCount?: number
  toolbarActions?: React.ReactNode
  visibleColumns?: string[]
  onVisibleColumnsChange?: (ids: string[]) => void
  itemLabel?: string
}

const densityPadding = {
  compact: "py-2",
  default: "py-3",
  comfortable: "py-4",
} as const

function getRowId(row: Record<string, unknown>, index: number): string {
  if (row.id !== undefined && row.id !== null) return String(row.id)
  return String(index)
}

function rowMatchesSearch(row: Record<string, unknown>, columns: DataTableColumn[], query: string): boolean {
  if (!query.trim()) return true
  const q = query.toLowerCase().trim()
  for (const col of columns) {
    const key = col.accessorKey ?? col.id
    const val = row[key]
    if (val !== undefined && val !== null && String(val).toLowerCase().includes(q)) return true
  }
  return false
}

export function DataTable({
  columns,
  data,
  searchable = false,
  searchPlaceholder,
  selectable = false,
  density = "default",
  onDensityChange,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  onRowClick,
  onSelectionChange,
  onSort,
  emptyMessage = "No results found",
  totalCount: totalCountProp,
  toolbarActions,
  visibleColumns: visibleColumnsProp,
  onVisibleColumnsChange,
  itemLabel = "items",
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const [selectedRowIds, setSelectedRowIds] = React.useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")

  const visibleColumns = visibleColumnsProp ?? columns.map((c) => c.id)
  const visibleCols = columns.filter((c) => visibleColumns.includes(c.id))

  const filteredData = React.useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data
    return data.filter((row) => rowMatchesSearch(row, columns, searchQuery))
  }, [data, searchable, searchQuery, columns])

  const totalCount = totalCountProp ?? filteredData.length
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const pageData = filteredData.slice(start, start + pageSize)

  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [currentPage, totalPages])

  const toggleSelectAll = () => {
    const ids = new Set<string>()
    if (selectedRowIds.size >= pageData.length) {
      setSelectedRowIds(ids)
      onSelectionChange?.(ids)
      return
    }
    pageData.forEach((row, i) => ids.add(getRowId(row, start + i)))
    setSelectedRowIds(ids)
    onSelectionChange?.(ids)
  }

  const toggleRow = (row: Record<string, unknown>, index: number) => {
    const id = getRowId(row, index)
    setSelectedRowIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      onSelectionChange?.(next)
      return next
    })
  }

  const handleSort = (key: string) => {
    const nextDir =
      sortKey === key ? (sortDirection === "asc" ? "desc" : "asc") : "asc"
    setSortKey(key)
    setSortDirection(nextDir)
    onSort?.(key, nextDir)
  }

  const allSelected =
    pageData.length > 0 &&
    pageData.every((row, i) => selectedRowIds.has(getRowId(row, start + i)))
  const someSelected = pageData.some((row, i) =>
    selectedRowIds.has(getRowId(row, start + i))
  )

  const pyClass = densityPadding[density]

  const toggleColumn = (id: string) => {
    const next = visibleColumns.includes(id)
      ? visibleColumns.filter((c) => c !== id)
      : [...visibleColumns, id]
    onVisibleColumnsChange?.(next)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap justify-between items-center gap-3 py-3 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-stone-700">
            About {totalCount} {itemLabel}
          </span>
          {toolbarActions}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-500 pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>
          )}
          {onVisibleColumnsChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon-sm">
                  <Columns3 className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {columns.map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={visibleColumns.includes(col.id)}
                    onCheckedChange={() => toggleColumn(col.id)}
                  >
                    {col.header}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {onDensityChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  {density === "compact"
                    ? "Compact"
                    : density === "comfortable"
                      ? "Comfortable"
                      : "Default"}
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(["compact", "default", "comfortable"] as const).map((d) => (
                  <DropdownMenuCheckboxItem
                    key={d}
                    checked={density === d}
                    onCheckedChange={() => onDensityChange(d)}
                  >
                    {d === "compact"
                      ? "Compact"
                      : d === "comfortable"
                        ? "Comfortable"
                        : "Default"}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="border border-stone-300 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className={cn("w-12", pyClass)}>
                  <Checkbox
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
              )}
              {visibleCols.map((col) => (
                <TableHead
                  key={col.id}
                  className={pyClass}
                  sortable={col.sortable}
                  sorted={sortKey === (col.accessorKey ?? col.id)}
                  sortDirection={sortKey === (col.accessorKey ?? col.id) ? sortDirection : undefined}
                  onSort={
                    col.sortable
                      ? () => handleSort(col.accessorKey ?? col.id)
                      : undefined
                  }
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleCols.length + (selectable ? 1 : 0)}
                  className={cn("text-center text-stone-600", pyClass)}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((row, i) => {
                const globalIndex = start + i
                const rowId = getRowId(row, globalIndex)
                const isSelected = selectedRowIds.has(rowId)
                return (
                  <TableRow
                    key={rowId}
                    data-state={isSelected ? "selected" : undefined}
                    onClick={() => onRowClick?.(row, globalIndex)}
                    className={onRowClick ? "cursor-pointer" : undefined}
                  >
                    {selectable && (
                      <TableCell
                        className={pyClass}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selectedRowIds.has(rowId)}
                          onCheckedChange={() => toggleRow(row, globalIndex)}
                        />
                      </TableCell>
                    )}
                    {visibleCols.map((col) => (
                      <TableCell key={col.id} className={pyClass}>
                        {col.cell
                          ? col.cell(row)
                          : String(
                              row[col.accessorKey ?? col.id] ?? ""
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {(totalPages > 1 || pageSizeOptions.length > 1) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={
            pageSizeOptions.length > 1
              ? (size) => {
                  setPageSize(size)
                  setCurrentPage(1)
                }
              : undefined
          }
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  )
}
