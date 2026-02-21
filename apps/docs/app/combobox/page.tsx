"use client"

import * as React from "react"
import { Database, BarChart3, Users, Settings, Globe, Zap, Shield, Code } from "lucide-react"
import { ComboboxField } from "@/components/ui/combobox"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "fr", label: "France" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "mx", label: "Mexico" },
  { value: "kr", label: "South Korea" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "nl", label: "Netherlands" },
  { value: "se", label: "Sweden" },
]

const dataSources = [
  { value: "database", label: "Database", icon: <Database /> },
  { value: "analytics", label: "Analytics", icon: <BarChart3 /> },
  { value: "crm", label: "CRM", icon: <Users /> },
  { value: "settings", label: "Settings", icon: <Settings /> },
  { value: "api", label: "External API", icon: <Globe /> },
  { value: "realtime", label: "Realtime Stream", icon: <Zap /> },
  { value: "secure", label: "Secure Vault", icon: <Shield /> },
  { value: "custom", label: "Custom Script", icon: <Code /> },
]

export default function ComboboxDemoPage() {
  const [basic, setBasic] = React.useState("")
  const [large, setLarge] = React.useState("")
  const [withIcons, setWithIcons] = React.useState("")
  const [errorVal, setErrorVal] = React.useState("")
  const [requiredVal, setRequiredVal] = React.useState("")

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Combobox</h1>
          <p className="mt-1 text-sm text-stone-700">
            Searchable dropdown select with filtering, keyboard navigation, and icon support.
          </p>
        </div>

        <Section title="Default Combobox">
          <ComboboxField
            label="Country"
            hintText="Type to search countries"
            placeholder="Choose a country"
            options={countries}
            value={basic}
            onValueChange={setBasic}
          />
        </Section>

        <Section title="Large Combobox">
          <ComboboxField
            label="Country"
            hintText="Large variant for prominent forms"
            placeholder="Select a country"
            inputSize="large"
            options={countries}
            value={large}
            onValueChange={setLarge}
          />
        </Section>

        <Section title="With Icons">
          <ComboboxField
            label="Data source"
            hintText="Where should we pull metrics from?"
            placeholder="Select a data source"
            options={dataSources}
            value={withIcons}
            onValueChange={setWithIcons}
          />
        </Section>

        <Section title="Error State">
          <ComboboxField
            label="Role"
            errorText="A role is required to continue"
            placeholder="Select a role"
            options={[
              { value: "admin", label: "Admin" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ]}
            value={errorVal}
            onValueChange={setErrorVal}
          />
        </Section>

        <Section title="Required">
          <ComboboxField
            label="Department"
            required
            placeholder="Select department"
            options={[
              { value: "engineering", label: "Engineering" },
              { value: "design", label: "Design" },
              { value: "product", label: "Product" },
              { value: "marketing", label: "Marketing" },
            ]}
            value={requiredVal}
            onValueChange={setRequiredVal}
          />
        </Section>

        <Section title="Disabled">
          <ComboboxField
            label="Plan"
            hintText="Contact support to change your plan"
            disabled
            value="enterprise"
            options={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
              { value: "enterprise", label: "Enterprise" },
            ]}
          />
        </Section>
      </div>
    </div>
  )
}
