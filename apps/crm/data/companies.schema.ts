import type { TableSchema } from "@/components/table/types";
import type { Company } from "./companies.data";

export const companiesSchema: TableSchema<Company> = {
  title: "Companies",
  addLabel: "Add company",
  defaultSort: { key: "lastInteraction", dir: "asc" },
  tabs: [
    { label: "All companies", value: "all" },
    {
      label: "Customers at risk",
      value: "customers-at-risk",
      seedFilters: [
        { columnKey: "status", operator: "is", value: "Customer" },
        { columnKey: "riskStatus", operator: "is", value: "At risk" },
      ],
    },
    {
      label: "Weak connection",
      value: "weak-connection",
      seedFilters: [
        { columnKey: "status", operator: "is", value: "Prospect" },
        { columnKey: "relationshipStrength", operator: "is_any_of", value: ["Weak", "Very weak"] },
      ],
    },
    {
      label: "Active deals",
      value: "active-deals",
      seedFilters: [
        { columnKey: "openDeals", operator: "gt", value: 0 },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Company", type: "logo-text", width: 240, sticky: true },
    {
      key: "relationshipStrength",
      label: "Connection strength",
      type: "strength",
      width: 180,
      strengthMap: {
        "Very weak": { label: "Very weak", level: "very-weak" },
        Weak: { label: "Weak", level: "weak" },
        Moderate: { label: "Moderate", level: "moderate" },
        Strong: { label: "Strong", level: "strong" },
        "Very strong": { label: "Very strong", level: "very-strong" },
      },
    },
    {
      key: "riskStatus",
      label: "Risk status",
      type: "badge",
      width: 140,
      badgeMap: {
        "At risk": { label: "At risk", variant: "red" },
        Healthy: { label: "Healthy", variant: "green" },
        "—": { label: "—", variant: "gray" },
      },
    },
    { key: "lastInteraction", label: "Last interaction", type: "text", width: 150, sortKind: "relative-time" },
    { key: "owner", label: "Owner", type: "avatar-text", width: 170 },
    { key: "companyType", label: "Company type", type: "text", width: 140 },
    {
      key: "status",
      label: "Status",
      type: "badge",
      width: 130,
      badgeMap: {
        Customer: { label: "Customer", variant: "green" },
        Prospect: { label: "Prospect", variant: "gray" },
        Churned: { label: "Churned", variant: "red" },
      },
    },
    { key: "industry", label: "Industry", type: "text", width: 150 },
    { key: "openDeals", label: "Open deals", type: "number", width: 110 },
    { key: "openLeads", label: "Open leads", type: "number", width: 110 },
    { key: "firstEmail", label: "First email", type: "text", width: 130 },
    { key: "lastEmail", label: "Last email", type: "text", width: 130 },
    { key: "emailCount", label: "# Emails", type: "number", width: 100 },
    { key: "firstCall", label: "First call", type: "text", width: 130 },
    { key: "lastCall", label: "Last call", type: "text", width: 130 },
    { key: "callCount", label: "# Calls", type: "number", width: 100 },
    { key: "interactions90d", label: "# Interactions", type: "number", width: 140 },
    { key: "source", label: "Source", type: "text", width: 130 },
    { key: "website", label: "Website", type: "text", width: 180 },
    { key: "added", label: "Added", type: "text", width: 130 },
  ],
};
