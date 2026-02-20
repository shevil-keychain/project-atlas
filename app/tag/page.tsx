"use client"

import { Tag } from "@/components/ui/tag"
import { Tag as TagIcon } from "lucide-react"
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

export default function TagDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-xxl font-bold text-foreground">Tag</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Pills for labels, filters, and removable chips.
          </p>
        </div>

        <Section title="Removable tags">
          <div className="flex flex-wrap gap-3">
            <Tag onRemove={() => {}}>Support</Tag>
            <Tag onRemove={() => {}}>Customer</Tag>
            <Tag onRemove={() => {}}>Billing</Tag>
          </div>
        </Section>

        <Section title="With icon + remove">
          <div className="flex flex-wrap gap-3">
            <Tag icon={<TagIcon />} onRemove={() => {}}>
              Support
            </Tag>
            <Tag icon={<TagIcon />} onRemove={() => {}}>
              Customer
            </Tag>
          </div>
        </Section>
      </div>
    </div>
  )
}
