import type { TableSchema } from "@/components/table/types";
import type { Supplier } from "./discover.data";

export const discoverSchema: TableSchema<Supplier> = {
  title: "Discover",
  tabs: [
    {
      label: "All brands",
      value: "all-brands",
      seedFilters: [],
    },
    {
      label: "All snacks brands",
      value: "all-snacks-brands",
      seedFilters: [
        { columnKey: "categories", operator: "contains", value: "Snacks" },
      ],
    },
    {
      label: "Active snacks brands",
      value: "active-snacks-brands",
      seedFilters: [
        { columnKey: "categories", operator: "contains", value: "Snacks" },
        { columnKey: "sourcingActivity", operator: "is", value: "Active" },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Company", type: "logo-text", width: 240, sticky: true },
    { key: "website", label: "Website", type: "text", width: 200 },
    {
      key: "sourcingActivity",
      label: "Sourcing activity",
      type: "badge",
      width: 160,
      badgeMap: {
        Active: { label: "Active", variant: "green" },
        Inactive: { label: "Inactive", variant: "gray" },
      },
    },
    { key: "lastPlatformActivity", label: "Last platform activity", type: "text", width: 170, sortKind: "relative-time" },
    { key: "industry", label: "Industry", type: "text", width: 160 },
    { key: "categories", label: "Categories", type: "text", width: 260 },
    { key: "products", label: "Products", type: "number", width: 110 },
    { key: "revenue", label: "Revenue", type: "text", width: 140 },
    { key: "employees", label: "Employees", type: "text", width: 130 },
    { key: "certifications", label: "Certifications", type: "text", width: 260 },
  ],
};
