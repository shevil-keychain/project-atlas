"use client"

import * as React from "react"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-16">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

const CHANNELS = ["Chat", "Call", "Email"] as const
const AGENTS = [
  "Alex Rivera",
  "Jordan Lee",
  "Sam Taylor",
  "Morgan Kim",
  "Casey Quinn",
  "Riley Jordan",
  "Jamie Blake",
]

function buildMockData(): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = []
  for (let i = 1; i <= 28; i++) {
    const date = new Date(2025, 1, 20 - (i % 15))
    rows.push({
      id: `conv-${i}`,
      conversationId: `CONV-${1000 + i}`,
      agentName: AGENTS[i % AGENTS.length],
      conversationDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      channel: CHANNELS[i % 3],
      duration: i % 4 === 0 ? "—" : `${5 + (i % 25)} mins`,
      qaScore: i % 5 === 0 ? "-" : 70 + (i % 28),
    })
  }
  return rows
}

const MOCK_DATA = buildMockData()

export default function DataTableDemoPage() {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([
    "conversationId",
    "agent",
    "date",
    "channel",
    "duration",
    "qaScore",
  ])
  const [density, setDensity] = React.useState<"compact" | "default" | "comfortable">("default")

  const sortedData = React.useMemo(() => {
    if (!sortKey) return MOCK_DATA
    return [...MOCK_DATA].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const aNum = typeof aVal === "number" ? aVal : Number(aVal)
      const bNum = typeof bVal === "number" ? bVal : Number(bVal)
      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum
      }
      const aStr = String(aVal ?? "")
      const bStr = String(bVal ?? "")
      const cmp = aStr.localeCompare(bStr)
      return sortDirection === "asc" ? cmp : -cmp
    })
  }, [sortKey, sortDirection])

  const columns: DataTableColumn[] = React.useMemo(
    () => [
      {
        id: "conversationId",
        header: "Conversation ID",
        accessorKey: "conversationId",
        sortable: true,
      },
      {
        id: "agent",
        header: "Agent",
        accessorKey: "agentName",
        cell: (row) => (
          <div className="flex items-center gap-8">
            <Avatar name={String(row.agentName)} size="xs" />
            <span className="font-medium">{String(row.agentName)}</span>
          </div>
        ),
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "conversationDate",
      },
      {
        id: "channel",
        header: "Channel",
        accessorKey: "channel",
        cell: (row) => (
          <Badge color="gray" size="sm">
            {String(row.channel)}
          </Badge>
        ),
      },
      {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
      },
      {
        id: "qaScore",
        header: "QA Score",
        accessorKey: "qaScore",
        sortable: true,
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-5xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Data Table</h1>
          <p className="mt-4 text-14 text-stone-700">
            Full data table with search, filters, bulk actions, column visibility,
            density, and pagination.
          </p>
        </div>

        <Section title="Conversations">
          <DataTable
            columns={columns}
            data={sortedData}
            searchable
            searchPlaceholder="Search conversations..."
            selectable
            density={density}
            onDensityChange={setDensity}
            pageSize={10}
            pageSizeOptions={[10, 25, 50]}
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={setVisibleColumns}
            onSort={(key, direction) => {
              setSortKey(key)
              setSortDirection(direction)
            }}
            itemLabel="conversations"
          />
        </Section>
      </div>
    </div>
  )
}
