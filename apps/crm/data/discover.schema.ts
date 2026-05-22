import type { TableSchema } from "@/components/table/types";
import type { Supplier } from "./discover.data";

export const discoverSchema: TableSchema<Supplier> = {
  title: "Discover",
  tabs: [
    {
      label: "All brands",
      value: "all-brands",
      seedFilters: [
        { columnKey: "companyType", operator: "is", value: "Brand" },
      ],
    },
    {
      label: "All snacks brands",
      value: "all-snacks-brands",
      seedFilters: [
        { columnKey: "companyType", operator: "is", value: "Brand" },
        { columnKey: "categories", operator: "contains", value: "Snacks" },
      ],
    },
    {
      label: "Active snacks brands",
      value: "active-snacks-brands",
      seedFilters: [
        { columnKey: "companyType", operator: "is", value: "Brand" },
        { columnKey: "categories", operator: "contains", value: "Snacks" },
        { columnKey: "sourcingActivity", operator: "is", value: "Active" },
      ],
    },
    {
      label: "High-growth snacks brands",
      value: "high-growth-snacks-brands",
      seedFilters: [
        { columnKey: "companyType", operator: "is", value: "Brand" },
        { columnKey: "categories", operator: "contains", value: "Snacks" },
        { columnKey: "growthRate", operator: "contains", value: "↑" },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Company", type: "logo-text", width: 240, sticky: true },
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
    {
      key: "capabilityMatch",
      label: "Capability match",
      type: "badge",
      width: 150,
      badgeMap: {
        Match: { label: "Match", variant: "green" },
        "No match": { label: "No match", variant: "gray" },
      },
    },
    { key: "companyType", label: "Company type", type: "text", width: 150 },
    { key: "industry", label: "Industry", type: "text", width: 160 },
    { key: "categories", label: "Categories", type: "text", width: 260 },
    { key: "products", label: "Products", type: "number", width: 110 },
    { key: "revenue", label: "Revenue", type: "text", width: 140 },
    { key: "employees", label: "Employees", type: "text", width: 130 },
    { key: "growthRate", label: "Growth rate", type: "text", width: 140 },
    { key: "certifications", label: "Certifications", type: "text", width: 260 },
    {
      key: "keychainMember",
      label: "Keychain member",
      type: "badge",
      width: 160,
      badgeMap: {
        Member: { label: "Member", variant: "green" },
        "Not a member": { label: "—", variant: "gray" },
      },
    },
    { key: "website", label: "Website", type: "text", width: 200 },
  ],
};
