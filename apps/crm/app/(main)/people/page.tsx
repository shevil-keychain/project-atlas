import { TableShell } from "@/components/table/table-shell";
import { peopleSchema } from "@/data/people.schema";
import { people } from "@/data/people.data";

export default function ContactsPage() {
  return <TableShell schema={peopleSchema} data={people as Record<string, unknown>[]} selectable />;
}
