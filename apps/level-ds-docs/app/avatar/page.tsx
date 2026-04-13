"use client"

import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

const colorNames = [
  "Alice Smith", "Bob Johnson", "Carol White", "David Brown", "Emma Davis",
  "Frank Miller", "Grace Wilson", "Henry Moore", "Iris Taylor", "Jack Anderson",
]

const groupOf3 = ["Alice Smith", "Bob Johnson", "Carol White"]
const groupOf5 = ["Alice Smith", "Bob Johnson", "Carol White", "David Brown", "Emma Davis"]
const groupOf8 = [
  "Alice Smith", "Bob Johnson", "Carol White", "David Brown",
  "Emma Davis", "Frank Miller", "Grace Wilson", "Henry Moore",
]

export default function AvatarDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Avatar</h1>
          <p className="mt-4 text-14 text-stone-700 font-medium">
            Colored circles with initials, supporting image fallback and group display.
          </p>
        </div>

        <Section title="Sizes">
          <div className="flex items-center gap-16">
            <Avatar name="John Doe" size="xs" />
            <Avatar name="John Doe" size="sm" />
            <Avatar name="John Doe" size="md" />
            <Avatar name="John Doe" size="lg" />
          </div>
          <div className="flex gap-24 text-14all text-stone-500 font-medium">
            <span>xs (24px)</span>
            <span>sm (32px)</span>
            <span>md (40px)</span>
            <span>lg (48px)</span>
          </div>
        </Section>

        <Section title="Color Variations">
          <div className="flex flex-wrap items-center gap-12">
            {colorNames.map((name) => (
              <div key={name} className="flex flex-col items-center gap-6">
                <Avatar name={name} />
                <span className="text-14all text-stone-500 font-medium">{name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Single Name">
          <div className="flex items-center gap-16">
            {["Admin", "System", "AI"].map((name) => (
              <div key={name} className="flex flex-col items-center gap-6">
                <Avatar name={name} />
                <span className="text-14all text-stone-500 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="With Image">
          <div className="flex items-center gap-16">
            <Avatar name="Jane Doe" src="https://i.pravatar.cc/80?u=1" />
            <Avatar name="John Smith" src="https://i.pravatar.cc/80?u=2" />
            <Avatar name="Alex Lee" src="https://i.pravatar.cc/80?u=3" size="lg" />
          </div>
        </Section>

        <Section title="Avatar Group">
          <div className="space-y-24">
            <div className="space-y-6">
              <p className="text-14 text-stone-500 font-medium">3 names, no overflow</p>
              <AvatarGroup names={groupOf3} max={3} />
            </div>
            <div className="space-y-6">
              <p className="text-14 text-stone-500 font-medium">5 names, max 3 — shows +2</p>
              <AvatarGroup names={groupOf5} max={3} />
            </div>
            <div className="space-y-6">
              <p className="text-14 text-stone-500 font-medium">8 names, max 4 — shows +4</p>
              <AvatarGroup names={groupOf8} max={4} />
            </div>
            <div className="space-y-6">
              <p className="text-14 text-stone-500 font-medium">Different sizes</p>
              <div className="flex items-center gap-24">
                <AvatarGroup names={groupOf5} max={3} size="xs" />
                <AvatarGroup names={groupOf5} max={3} size="sm" />
                <AvatarGroup names={groupOf5} max={3} size="md" />
                <AvatarGroup names={groupOf5} max={3} size="lg" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
