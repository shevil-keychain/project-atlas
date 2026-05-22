import type { TableSchema } from "@/components/table/types";
import type { Person } from "./people.data";

export const peopleSchema: TableSchema<Person> = {
  title: "People",
  addLabel: "Add person",
  defaultSort: { key: "lastInteraction", dir: "asc" },
  tabs: [
    { label: "All people", value: "all" },
    {
      label: "No recent contact",
      value: "no-recent-contact",
      seedFilters: [
        { columnKey: "lastInteraction", operator: "gt", value: 60 },
      ],
    },
    {
      label: "Weak connection",
      value: "weak-connection",
      seedFilters: [
        { columnKey: "relationshipStrength", operator: "is_any_of", value: ["Weak", "Very weak"] },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Name", type: "avatar-text", width: 200, sticky: true },
    { key: "company", label: "Company", type: "text", width: 180 },
    { key: "title", label: "Title", type: "text", width: 200 },
    { key: "seniority", label: "Seniority", type: "text", width: 170 },
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
    { key: "email", label: "Email", type: "text", width: 220 },
    { key: "phone", label: "Phone", type: "text", width: 160 },
    { key: "owner", label: "Owner", type: "avatar-text", width: 170 },
    { key: "source", label: "Source", type: "text", width: 140 },
    { key: "roleOnDeals", label: "Role on deals", type: "text", width: 200 },
    { key: "firstEmail", label: "First email", type: "text", width: 130 },
    { key: "lastEmail", label: "Last email", type: "text", width: 130 },
    { key: "emailCount", label: "# Emails", type: "number", width: 100 },
    { key: "firstCall", label: "First call", type: "text", width: 130 },
    { key: "lastCall", label: "Last call", type: "text", width: 130 },
    { key: "callCount", label: "# Calls", type: "number", width: 100 },
    { key: "lastInteraction", label: "Last interaction", type: "text", width: 150, sortKind: "relative-time" },
    { key: "interactions90d", label: "# Interactions", type: "number", width: 140 },
    { key: "openDeals", label: "Open deals", type: "number", width: 110 },
    { key: "added", label: "Added", type: "text", width: 130 },
  ],
};
