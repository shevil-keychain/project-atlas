"use client"

import * as React from "react"
import { MultiselectField } from "@/components/ui/multiselect"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

const behaviors = [
  { value: "prompt-wrap", label: "Prompt wrap-up" },
  { value: "no-idle", label: "No idle tickets" },
  { value: "efficient-close", label: "Efficient closure" },
  { value: "qa-checklist", label: "QA checklist alignment" },
  { value: "applied-feedback", label: "Applied feedback" },
  { value: "policy-accurate", label: "Policy-accurate response" },
  { value: "empathy", label: "Empathy & rapport" },
  { value: "first-contact", label: "First contact resolution" },
  { value: "active-listen", label: "Active listening" },
  { value: "upsell", label: "Upselling technique" },
]

const teams = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
  { value: "delta", label: "Delta" },
  { value: "epsilon", label: "Epsilon" },
]

const skills = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "golang", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "scala", label: "Scala" },
]

export default function MultiselectDemoPage() {
  const [basic, setBasic] = React.useState<string[]>([])
  const [preselected, setPreselected] = React.useState<string[]>([
    "prompt-wrap", "no-idle", "efficient-close", "qa-checklist", "applied-feedback", "policy-accurate",
  ])
  const [searchable, setSearchable] = React.useState<string[]>([])
  const [errorVal, setErrorVal] = React.useState<string[]>([])
  const [overflow, setOverflow] = React.useState<string[]>(["react", "typescript", "python", "golang", "rust", "java", "swift", "kotlin"])

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Multiselect</h1>
          <p className="mt-1 text-sm text-stone-700">
            Multi-value selection with tags, search, and overflow. Based on the coaching behaviors Figma design.
          </p>
        </div>

        <Section title="Default">
          <MultiselectField
            label="Teams"
            hintText="Select one or more teams"
            placeholder="Choose teams"
            options={teams}
            value={basic}
            onValueChange={setBasic}
          />
        </Section>

        <Section title="With Pre-selected Items (Figma Reference)">
          <MultiselectField
            label="Coached behaviors"
            hintText="Select behaviors to track"
            placeholder="Choose behaviors"
            options={behaviors}
            value={preselected}
            onValueChange={setPreselected}
          />
        </Section>

        <Section title="Searchable (Many Items)">
          <MultiselectField
            label="Skills"
            hintText="Type to filter the list"
            placeholder="Search and select skills"
            options={skills}
            value={searchable}
            onValueChange={setSearchable}
          />
        </Section>

        <Section title="Error State">
          <MultiselectField
            label="Required tags"
            errorText="At least one tag is required"
            placeholder="Select tags"
            options={behaviors.slice(0, 5)}
            value={errorVal}
            onValueChange={setErrorVal}
          />
        </Section>

        <Section title="Disabled">
          <MultiselectField
            label="Locked behaviors"
            hintText="These cannot be changed"
            disabled
            options={behaviors.slice(0, 4)}
            value={["prompt-wrap", "no-idle"]}
          />
        </Section>

        <Section title="Overflow (+N more)">
          <MultiselectField
            label="Technologies"
            hintText="Shows max 4 tags, rest collapsed"
            placeholder="Select technologies"
            options={skills}
            value={overflow}
            onValueChange={setOverflow}
            maxDisplayedTags={4}
          />
        </Section>
      </div>
    </div>
  )
}
