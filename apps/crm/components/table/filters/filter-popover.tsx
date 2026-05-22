"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@level/ui/components/ui/button";
import { Input } from "@level/ui/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@level/ui/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@level/ui/components/ui/select";
import type { ColumnDef } from "../types";
import type { Filter, Operator } from "./types";
import { operatorLabels, operatorsFor, operatorNeedsValue, operatorIsMulti } from "./types";

type Props = {
  columns: ColumnDef[];
  onAdd: (filter: Filter) => void;
  activeCount: number;
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function FilterPopover({ columns, onAdd, activeCount }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"column" | "build">("column");
  const [column, setColumn] = useState<ColumnDef | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [textValue, setTextValue] = useState("");
  const [multiValues, setMultiValues] = useState<string[]>([]);
  const [columnSearch, setColumnSearch] = useState("");

  const filterableColumns = useMemo(() => {
    const query = columnSearch.trim().toLowerCase();
    if (!query) return columns;
    return columns.filter((c) => c.label.toLowerCase().includes(query));
  }, [columns, columnSearch]);

  function reset() {
    setStep("column");
    setColumn(null);
    setOperator(null);
    setTextValue("");
    setMultiValues([]);
    setColumnSearch("");
  }

  function close() {
    setOpen(false);
    reset();
  }

  const isEnum = column?.type === "badge" || column?.type === "strength";
  const enumOptions = column?.badgeMap
    ? Object.keys(column.badgeMap)
    : column?.strengthMap
      ? Object.keys(column.strengthMap)
      : [];
  const enumLabel = (opt: string) =>
    column?.badgeMap?.[opt]?.label ?? column?.strengthMap?.[opt]?.label ?? opt;

  function commit() {
    if (!column) return;
    if (isEnum) {
      if (multiValues.length === 0) return;
      onAdd({ id: makeId(), columnKey: column.key, operator: "is_any_of", value: multiValues });
      close();
      return;
    }
    if (!operator) return;
    const needsValue = operatorNeedsValue(operator);
    let value: Filter["value"] = null;
    if (needsValue) {
      if (operatorIsMulti(operator)) {
        if (multiValues.length === 0) return;
        value = multiValues;
      } else if (column.type === "number") {
        const n = Number(textValue);
        if (Number.isNaN(n) || textValue.trim() === "") return;
        value = n;
      } else {
        if (textValue.trim() === "") return;
        value = textValue.trim();
      }
    }
    onAdd({ id: makeId(), columnKey: column.key, operator, value });
    close();
  }

  const operators = column ? operatorsFor(column.type) : [];

  function toggleMulti(opt: string) {
    setMultiValues((prev) =>
      prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
    );
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-8 h-36 px-16 bg-surface-card border border-border-strong rounded-lg text-14 font-semibold text-text-primary leading-20 cursor-pointer hover:bg-surface-subtle transition-colors"
        >
          <SlidersHorizontal size={16} className="shrink-0 text-icon-secondary" />
          Filters
          {activeCount > 0 && (
            <span className="ml-4 inline-flex items-center justify-center h-20 min-w-20 px-6 rounded-full bg-surface-brand-subtle text-12 font-semibold text-text-brand">
              {activeCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-280 p-4 max-h-[420px] overflow-y-auto">
        {step === "column" && (
          <div className="flex flex-col">
            <div className="sticky top-0 bg-surface-card border-b border-border-default p-8">
              <Input
                autoFocus
                value={columnSearch}
                onChange={(e) => setColumnSearch(e.target.value)}
                placeholder="Search columns"
              />
            </div>
            <div className="max-h-280 overflow-y-auto py-4">
              {filterableColumns.length === 0 ? (
                <div className="px-12 py-12 text-13 font-medium text-text-tertiary">
                  No columns match
                </div>
              ) : (
                filterableColumns.map((c) => (
                  <DropdownMenuItem
                    key={c.key}
                    onSelect={(e) => {
                      e.preventDefault();
                      setColumn(c);
                      setOperator(operatorsFor(c.type)[0]);
                      setStep("build");
                    }}
                    className="cursor-pointer"
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </div>
        )}

        {step === "build" && column && (
          <div className="flex flex-col gap-12 p-12">
            <div className="text-14 font-semibold text-text-primary">{column.label}</div>

            {!isEnum && operator && (
              <Select
                value={operator}
                onValueChange={(v) => {
                  setOperator(v as Operator);
                  setTextValue("");
                  setMultiValues([]);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op} value={op}>
                      {operatorLabels[op]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {!isEnum && operator && operatorNeedsValue(operator) && (
              <Input
                autoFocus
                type={column.type === "number" ? "number" : "text"}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter value"
                onKeyDown={(e) => {
                  if (e.key === "Enter") commit();
                }}
              />
            )}

            {isEnum && (
              <div className="flex flex-col max-h-240 overflow-y-auto">
                {enumOptions.map((opt) => {
                  const selected = multiValues.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleMulti(opt)}
                      className="flex items-center justify-between gap-8 h-32 px-12 rounded-md text-14 font-medium text-left text-text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
                    >
                      <span className="truncate">{enumLabel(opt)}</span>
                      {selected && <Check size={16} className="shrink-0 text-icon-brand" />}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-end gap-8 pt-4">
              <Button variant="secondary" size="sm" onClick={close}>
                Cancel
              </Button>
              <Button size="sm" onClick={commit}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
