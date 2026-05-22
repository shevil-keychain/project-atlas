import { TableShell } from "@/components/table/table-shell";
import { discoverSchema } from "@/data/discover.schema";
import { suppliers } from "@/data/discover.data";

export default function DiscoverPage() {
  return <TableShell schema={discoverSchema} data={suppliers as Record<string, unknown>[]} selectable />;
}
