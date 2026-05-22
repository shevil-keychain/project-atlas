import { TableShell } from "@/components/table/table-shell";
import { companiesSchema } from "@/data/companies.schema";
import { companies } from "@/data/companies.data";

export default function CompaniesPage() {
  return <TableShell schema={companiesSchema} data={companies as Record<string, unknown>[]} selectable />;
}
