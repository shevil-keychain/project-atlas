"use client";

import { Tag } from "@level/ui/components/ui/tag";
import { Button } from "@level/ui/components/ui/button";
import type { ColumnDef } from "../types";
import type { Filter } from "./types";
import { operatorLabels } from "./types";

type Props = {
  filters: Filter[];
  columns: ColumnDef[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

function formatValue(filter: Filter, col?: ColumnDef): string {
  if (filter.value === null || filter.value === undefined) return "";
  if (Array.isArray(filter.value)) {
    const labels = filter.value.map((v) =>
      col?.badgeMap?.[v]?.label ?? String(v)
    );
    return labels.join(", ");
  }
  const raw = String(filter.value);
  return col?.badgeMap?.[raw]?.label ?? raw;
}

export function FilterChips({ filters, columns, onRemove, onClearAll }: Props) {
  if (filters.length === 0) return null;

  const colByKey = new Map(columns.map((c) => [c.key, c]));

  return (
    <div className="flex items-center flex-wrap gap-8">
      {filters.map((filter) => {
        const col = colByKey.get(filter.columnKey);
        const valueText = formatValue(filter, col);
        return (
          <Tag key={filter.id} onRemove={() => onRemove(filter.id)}>
            <span className="text-text-secondary">{col?.label ?? filter.columnKey}</span>
            <span className="text-text-tertiary">{operatorLabels[filter.operator]}</span>
            {valueText && <span className="text-text-primary">{valueText}</span>}
          </Tag>
        );
      })}
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
}
