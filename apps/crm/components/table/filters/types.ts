import type { CellType } from "../types";

export type TextOperator =
  | "contains"
  | "not_contains"
  | "equals"
  | "not_equals"
  | "is_empty"
  | "is_not_empty";

export type NumberOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "is_empty"
  | "is_not_empty";

export type BadgeOperator =
  | "is"
  | "is_not"
  | "is_any_of"
  | "is_none_of"
  | "is_empty"
  | "is_not_empty";

export type Operator = TextOperator | NumberOperator | BadgeOperator;

export type Filter = {
  id: string;
  columnKey: string;
  operator: Operator;
  value: string | number | string[] | null;
};

export type View = {
  id: string;
  label: string;
  filters: Filter[];
  isSeed: boolean;
};

export type FilterableCellType = CellType;

export const operatorLabels: Record<Operator, string> = {
  contains: "contains",
  not_contains: "does not contain",
  equals: "equals",
  not_equals: "does not equal",
  is_empty: "is empty",
  is_not_empty: "is not empty",
  eq: "=",
  neq: "≠",
  gt: ">",
  gte: "≥",
  lt: "<",
  lte: "≤",
  is: "is",
  is_not: "is not",
  is_any_of: "is any of",
  is_none_of: "is none of",
};

export function operatorsFor(type: CellType): Operator[] {
  if (type === "number") {
    return ["eq", "neq", "gt", "gte", "lt", "lte", "is_empty", "is_not_empty"];
  }
  if (type === "badge" || type === "strength") {
    return ["is", "is_not", "is_any_of", "is_none_of", "is_empty", "is_not_empty"];
  }
  return ["equals", "not_equals", "contains", "not_contains", "is_empty", "is_not_empty"];
}

export function operatorNeedsValue(op: Operator): boolean {
  return op !== "is_empty" && op !== "is_not_empty";
}

export function operatorIsMulti(op: Operator): boolean {
  return op === "is_any_of" || op === "is_none_of";
}
