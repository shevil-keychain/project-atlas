"use client";

import { Columns3, Search } from "lucide-react";
import { FilterPopover } from "./filters/filter-popover";
import type { ColumnDef } from "./types";
import type { Filter } from "./filters/types";

type Props = {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  columns: ColumnDef[];
  filters: Filter[];
  onAddFilter: (filter: Filter) => void;
};

export function TableControls({
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  columns,
  filters,
  onAddFilter,
}: Props) {
  return (
    <div className="flex items-center gap-16 w-full shrink-0">
      <div className="flex-1 min-w-0">
        <div className="relative w-full max-w-256">
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="flex h-40 w-full rounded-lg border border-border-strong bg-surface-card px-12 pr-40 text-14 font-medium text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-focus"
          />
          <Search
            size={20}
            className="absolute right-12 top-1/2 -translate-y-1/2 shrink-0 text-icon-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 shrink-0">
        <FilterPopover
          columns={columns}
          onAdd={onAddFilter}
          activeCount={filters.length}
        />
        <button
          type="button"
          className="flex items-center gap-8 h-36 px-16 bg-surface-card border border-border-strong rounded-lg text-14 font-semibold text-text-primary leading-20 cursor-pointer hover:bg-surface-subtle transition-colors"
        >
          <Columns3 size={16} className="shrink-0 text-icon-secondary" />
          Columns
        </button>
      </div>
    </div>
  );
}
