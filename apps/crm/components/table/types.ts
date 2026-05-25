export type CellType = "logo-text" | "badge" | "text" | "number" | "avatar-text" | "strength";

export type BadgeVariant = "green" | "gray" | "yellow" | "red";

export type StrengthLevel = "very-weak" | "weak" | "moderate" | "strong" | "very-strong";

export type ColumnDef<TRow = Record<string, unknown>> = {
  key: keyof TRow & string;
  label: string;
  type: CellType;
  width?: number;
  sticky?: boolean;
  sortable?: boolean;
  sortKind?: "relative-time";
  badgeMap?: Record<string, { label: string; variant: BadgeVariant }>;
  strengthMap?: Record<string, { label: string; level: StrengthLevel }>;
};

export type DefaultSort = { key: string; dir: "asc" | "desc" };

import type { Filter } from "./filters/types";

export type SeedFilter = Omit<Filter, "id">;

export type TabDef = {
  label: string;
  value: string;
  filterKey?: string;
  filterValue?: unknown;
  seedFilters?: SeedFilter[];
};

export type TableSchema<TRow = Record<string, unknown>> = {
  title: string;
  addLabel?: string;
  tabs: TabDef[];
  columns: ColumnDef<TRow>[];
  defaultSort?: DefaultSort;
  highlightRow?: {
    key: string;
    equals: string | number | boolean;
    className: string;
  };
};
