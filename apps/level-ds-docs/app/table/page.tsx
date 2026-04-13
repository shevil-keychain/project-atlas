"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function TableDemoPage() {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set())

  const sortableData = [
    { id: 1, name: "Alice Chen", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Carol Doe", email: "carol@example.com", role: "Viewer" },
  ]

  const toggleSort = () => {
    if (sortKey !== "name") {
      setSortKey("name")
      setSortDir("asc")
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    }
  }

  const allSelected =
    sortableData.length > 0 && selectedRows.size === sortableData.length
  const someSelected = selectedRows.size > 0
  const toggleSelectAll = () => {
    if (allSelected) setSelectedRows(new Set())
    else setSelectedRows(new Set(sortableData.map((r) => r.id)))
  }
  const toggleRow = (id: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const agentData = [
    {
      id: 1,
      name: "Alex Rivera",
      status: "Active" as const,
      statusColor: "primary" as const,
      date: "Feb 18, 2025",
    },
    {
      id: 2,
      name: "Jordan Lee",
      status: "Pending" as const,
      statusColor: "warning" as const,
      date: "Feb 17, 2025",
    },
    {
      id: 3,
      name: "Sam Taylor",
      status: "Inactive" as const,
      statusColor: "gray" as const,
      date: "Feb 16, 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-4xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Table</h1>
          <p className="mt-4 text-14 text-stone-700">
            Data tables with sortable headers, selection, and reusable
            primitives.
          </p>
        </div>

        <Section title="Basic Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice Chen</TableCell>
                <TableCell>alice@example.com</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Smith</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Editor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol Doe</TableCell>
                <TableCell>carol@example.com</TableCell>
                <TableCell>Viewer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        <Section title="With Sorting">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  sortable
                  sorted={sortKey === "name"}
                  sortDirection={sortKey === "name" ? sortDir : undefined}
                  onSort={toggleSort}
                >
                  name
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...sortableData]
                .sort((a, b) => {
                  if (sortKey !== "name") return 0
                  const cmp = a.name.localeCompare(b.name)
                  return sortDir === "asc" ? cmp : -cmp
                })
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="With Selection">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">
                  <Checkbox
                    checked={
                      allSelected
                        ? true
                        : someSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortableData.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={selectedRows.has(row.id) ? "selected" : undefined}
                >
                  <TableCell className="w-48">
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="With Avatars and Badges">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <div className="flex items-center gap-12">
                      <Avatar name={row.name} size="xs" />
                      <span>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={row.statusColor} size="sm">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="Striped Rows">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="even:bg-stone-50/50">
                <TableCell>Alice Chen</TableCell>
                <TableCell>alice@example.com</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow className="even:bg-stone-50/50">
                <TableCell>Bob Smith</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Editor</TableCell>
              </TableRow>
              <TableRow className="even:bg-stone-50/50">
                <TableCell>Carol Doe</TableCell>
                <TableCell>carol@example.com</TableCell>
                <TableCell>Viewer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        <Section title="Empty State">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-stone-500 py-32"
                >
                  No results found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </div>
    </div>
  )
}
