"use client"

import * as React from "react"
import { Pagination } from "@/components/ui/pagination"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function PaginationDemoPage() {
  const [manyPage, setManyPage] = React.useState(1)
  const [manyPageSize, setManyPageSize] = React.useState(10)

  const [fewPage, setFewPage] = React.useState(1)
  const [fewPageSize, setFewPageSize] = React.useState(10)

  const [singlePage, setSinglePage] = React.useState(1)
  const [singlePageSize, setSinglePageSize] = React.useState(10)

  const [noNumbersPage, setNoNumbersPage] = React.useState(1)
  const [noNumbersPageSize, setNoNumbersPageSize] = React.useState(10)

  const [customPage, setCustomPage] = React.useState(1)
  const [customPageSize, setCustomPageSize] = React.useState(15)

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-3xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Pagination</h1>
          <p className="mt-1 text-sm text-stone-700">
            Page navigation with range label, numbered or arrow-only, and results per page selector.
          </p>
        </div>

        <Section title="Many Pages">
          <div className="rounded-lg border border-stone-300 bg-white">
            <div className="border-b border-stone-300 px-4 py-3">
              <p className="text-sm text-stone-600">225 items, 10 per page → 23 pages</p>
            </div>
            <Pagination
              currentPage={manyPage}
              totalPages={23}
              totalItems={225}
              pageSize={manyPageSize}
              onPageChange={setManyPage}
              onPageSizeChange={setManyPageSize}
              showPageNumbers
            />
          </div>
        </Section>

        <Section title="Few Pages">
          <div className="rounded-lg border border-stone-300 bg-white">
            <div className="border-b border-stone-300 px-4 py-3">
              <p className="text-sm text-stone-600">50 items, 10 per page → 5 pages, no ellipsis</p>
            </div>
            <Pagination
              currentPage={fewPage}
              totalPages={5}
              totalItems={50}
              pageSize={fewPageSize}
              onPageChange={setFewPage}
              onPageSizeChange={setFewPageSize}
              showPageNumbers
            />
          </div>
        </Section>

        <Section title="Single Page">
          <div className="rounded-lg border border-stone-300 bg-white">
            <div className="border-b border-stone-300 px-4 py-3">
              <p className="text-sm text-stone-600">8 items, 10 per page → only page 1</p>
            </div>
            <Pagination
              currentPage={singlePage}
              totalPages={1}
              totalItems={8}
              pageSize={singlePageSize}
              onPageChange={setSinglePage}
              onPageSizeChange={setSinglePageSize}
              showPageNumbers
            />
          </div>
        </Section>

        <Section title="Without Page Numbers">
          <div className="rounded-lg border border-stone-300 bg-white">
            <div className="border-b border-stone-300 px-4 py-3">
              <p className="text-sm text-stone-600">475 items, first / prev / next / last only</p>
            </div>
            <Pagination
              currentPage={noNumbersPage}
              totalPages={48}
              totalItems={475}
              pageSize={noNumbersPageSize}
              onPageChange={setNoNumbersPage}
              onPageSizeChange={setNoNumbersPageSize}
              showPageNumbers={false}
            />
          </div>
        </Section>

        <Section title="Custom Page Sizes">
          <div className="rounded-lg border border-stone-300 bg-white">
            <div className="border-b border-stone-300 px-4 py-3">
              <p className="text-sm text-stone-600">100 items, options 5 / 15 / 30, default 15</p>
            </div>
            <Pagination
              currentPage={customPage}
              totalPages={Math.ceil(100 / customPageSize)}
              totalItems={100}
              pageSize={customPageSize}
              onPageChange={setCustomPage}
              onPageSizeChange={setCustomPageSize}
              pageSizeOptions={[5, 15, 30]}
              showPageNumbers
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
