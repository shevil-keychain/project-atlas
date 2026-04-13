import * as React from "react"

import { BackButton } from "@/components/ui/back-button"
import { EmptyState } from "@/components/ui/empty-state"
import { File01, Folder, SearchLg } from "@/components/icons"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-16">
      <h2 className="text-18 font-semibold text-text-primary">{title}</h2>
      {children}
    </div>
  )
}

export default function EmptyStateDemoPage() {
  return (
    <div className="min-h-screen bg-surface-page p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-text-primary">Empty State</h1>
          <p className="mt-4 text-14 font-medium text-text-secondary">
            Minimal empty-state pattern with an icon, headline, and optional
            subtext.
          </p>
        </div>

        <Section title="Headline only">
          <EmptyState icon={<Folder />} title="No folders yet" />
        </Section>

        <Section title="With optional subtext">
          <EmptyState
            icon={<SearchLg />}
            title="No results found"
            description="Try another keyword or clear one of the filters."
          />
        </Section>

        <Section title="Inside a card">
          <div className="rounded-lg border border-border-subtle bg-surface-card p-24">
            <EmptyState
              icon={<File01 />}
              title="No reports available"
              description="Generate your first report to see it listed here."
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
