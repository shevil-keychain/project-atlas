"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@level/ui/lib/utils";
import { Checkbox } from "@level/ui/components/ui/checkbox";
import { CellRenderer } from "./cell-renderers";
import { parseRelativeDaysAgo } from "./relative-time";
import type { ColumnDef, DefaultSort, StrengthLevel } from "./types";

type Props = {
  columns: ColumnDef[];
  rows: Record<string, unknown>[];
  defaultSort?: DefaultSort;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onToggleRow?: (id: string) => void;
  onToggleAll?: (ids: string[], checked: boolean) => void;
  getRowClassName?: (row: Record<string, unknown>) => string | undefined;
};

type SortDir = "asc" | "desc";
type SortState = { key: string; dir: SortDir } | null;

const STRENGTH_ORDER: Record<StrengthLevel, number> = {
  "very-weak": 0,
  weak: 1,
  moderate: 2,
  strong: 3,
  "very-strong": 4,
};

const headerCell = "flex items-center h-36 px-16 bg-surface-subtle border-b border-border-strong";
const dataCell = "flex items-center h-48 px-16 border-b border-border-default bg-surface-card hover:bg-surface-subtle transition-colors";
const headerText = "text-12 font-bold text-text-primary leading-16 whitespace-nowrap";

function compareValues(a: unknown, b: unknown, col: ColumnDef): number {
  const aNull = a == null || a === "";
  const bNull = b == null || b === "";
  if (aNull && bNull) return 0;
  if (aNull) return 1;
  if (bNull) return -1;

  if (col.sortKind === "relative-time") {
    return parseRelativeDaysAgo(a) - parseRelativeDaysAgo(b);
  }
  if (col.type === "strength") {
    const aLevel = col.strengthMap?.[String(a)]?.level ?? "moderate";
    const bLevel = col.strengthMap?.[String(b)]?.level ?? "moderate";
    return STRENGTH_ORDER[aLevel] - STRENGTH_ORDER[bLevel];
  }
  if (col.type === "number") {
    return Number(a) - Number(b);
  }
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown size={12} className="text-icon-tertiary" />;
  return dir === "asc"
    ? <ArrowUp size={12} className="text-icon-primary" />
    : <ArrowDown size={12} className="text-icon-primary" />;
}

function HeaderLabel({
  column,
  sort,
  onToggle,
}: {
  column: ColumnDef;
  sort: SortState;
  onToggle: (key: string) => void;
}) {
  const active = sort?.key === column.key;
  return (
    <button
      type="button"
      onClick={() => onToggle(column.key)}
      className="flex items-center gap-6 min-w-0 cursor-pointer hover:text-text-primary"
    >
      <span className={headerText}>{column.label}</span>
      <SortIcon active={active} dir={active ? sort!.dir : "asc"} />
    </button>
  );
}

export function DataTable({
  columns,
  rows,
  defaultSort,
  selectable = false,
  selectedIds,
  onToggleRow,
  onToggleAll,
  getRowClassName,
}: Props) {
  const [sort, setSort] = useState<SortState>(defaultSort ?? null);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const cmp = compareValues(a[sort.key], b[sort.key], col);
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, columns]);

  const sticky = columns.find((column) => column.sticky);
  const scrollable = columns.filter((column) => !column.sticky);

  const pageIds = sortedRows.map((row) => String(row.id ?? ""));
  const selectedOnPage = selectable && selectedIds
    ? pageIds.filter((id) => id && selectedIds.has(id)).length
    : 0;
  const headerChecked: boolean | "indeterminate" =
    selectedOnPage === 0 ? false : selectedOnPage === pageIds.length ? true : "indeterminate";

  const SelectionHeader = selectable ? (
    <div
      className={cn(headerCell, "border-r border-border-strong shrink-0 justify-center")}
      style={{ width: 44, minWidth: 44 }}
    >
      <Checkbox
        checked={headerChecked}
        onCheckedChange={(checked) =>
          onToggleAll?.(pageIds.filter(Boolean), checked === true)
        }
        aria-label="Select all rows on this page"
        className="data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:hover:bg-black data-[state=checked]:hover:border-black data-[state=indeterminate]:bg-black data-[state=indeterminate]:border-black data-[state=indeterminate]:hover:bg-black data-[state=indeterminate]:hover:border-black"
      />
    </div>
  ) : null;

  if (sortedRows.length === 0) {
    return (
      <div className="bg-surface-card w-full">
        <div className="flex">
          {SelectionHeader}
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(headerCell, column.sticky ? "border-r border-border-strong" : "")}
              style={{ width: column.width ?? 160, minWidth: column.width ?? 160 }}
            >
              <HeaderLabel column={column} sort={sort} onToggle={toggleSort} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-64 text-14 font-medium text-text-tertiary">
          No data yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card w-full">
      <div className="flex overflow-x-auto">
        {selectable && (
          <div className="flex flex-col shrink-0 z-10" style={{ width: 44 }}>
            {SelectionHeader}
            {sortedRows.map((row, index) => {
              const id = String(row.id ?? "");
              const checked = !!id && !!selectedIds?.has(id);
              const rowCls = getRowClassName?.(row);
              return (
                <div
                  key={index}
                  className={cn(dataCell, "border-r border-border-default justify-center px-0", rowCls)}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => id && onToggleRow?.(id)}
                    aria-label="Select row"
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:hover:bg-black data-[state=checked]:hover:border-black"
                  />
                </div>
              );
            })}
          </div>
        )}

        {sticky && (
          <div className="flex flex-col shrink-0 z-10" style={{ width: sticky.width ?? 280 }}>
            <div className={cn(headerCell, "border-r border-border-strong")}>
              <HeaderLabel column={sticky} sort={sort} onToggle={toggleSort} />
            </div>
            {sortedRows.map((row, index) => {
              const rowCls = getRowClassName?.(row);
              return (
                <div key={index} className={cn(dataCell, "border-r border-border-default", rowCls)}>
                  <CellRenderer type={sticky.type} value={row[sticky.key]} col={sticky} row={row} />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex overflow-x-auto flex-1 relative">
          {scrollable.map((column) => (
            <div
              key={column.key}
              className="flex flex-col shrink-0"
              style={{ width: column.width ?? 160, minWidth: column.width ?? 160 }}
            >
              <div className={headerCell}>
                <HeaderLabel column={column} sort={sort} onToggle={toggleSort} />
              </div>
              {sortedRows.map((row, index) => {
                const rowCls = getRowClassName?.(row);
                return (
                  <div key={index} className={cn(dataCell, rowCls)}>
                    <CellRenderer type={column.type} value={row[column.key]} col={column} row={row} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
