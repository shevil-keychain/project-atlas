"use client"

import * as React from "react"
import { Database, BarChart3, Users, Settings } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectField,
} from "@/components/ui/select"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function SelectDemoPage() {
  const [basic, setBasic] = React.useState("")
  const [large, setLarge] = React.useState("")
  const [withIcons, setWithIcons] = React.useState("")
  const [errorVal, setErrorVal] = React.useState("")
  const [requiredVal, setRequiredVal] = React.useState("")
  const [optionalVal, setOptionalVal] = React.useState("")
  const [bare, setBare] = React.useState("")

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-xxl font-bold text-foreground">Select</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Dropdown select fields with search, icons, and form field wrapper.
          </p>
        </div>

        <Section title="Default Select">
          <SelectField
            label="Country"
            hintText="Select your country of residence"
            placeholder="Choose a country"
            value={basic}
            onValueChange={setBasic}
          >
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
          </SelectField>
        </Section>

        <Section title="Large Select">
          <SelectField
            label="Time zone"
            hintText="Used for scheduling and reports"
            placeholder="Select a time zone"
            inputSize="large"
            value={large}
            onValueChange={setLarge}
          >
            <SelectItem value="pst">Pacific Time (PT)</SelectItem>
            <SelectItem value="mst">Mountain Time (MT)</SelectItem>
            <SelectItem value="cst">Central Time (CT)</SelectItem>
            <SelectItem value="est">Eastern Time (ET)</SelectItem>
          </SelectField>
        </Section>

        <Section title="With Icons">
          <SelectField
            label="Data source"
            hintText="Where should we pull metrics from?"
            placeholder="Select a data source"
            value={withIcons}
            onValueChange={setWithIcons}
          >
            <SelectItem value="database" icon={<Database />}>Database</SelectItem>
            <SelectItem value="analytics" icon={<BarChart3 />}>Analytics</SelectItem>
            <SelectItem value="crm" icon={<Users />}>CRM</SelectItem>
            <SelectItem value="settings" icon={<Settings />}>Settings</SelectItem>
          </SelectField>
        </Section>

        <Section title="Error State">
          <SelectField
            label="Role"
            errorText="A role is required to continue"
            placeholder="Select a role"
            value={errorVal}
            onValueChange={setErrorVal}
          >
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectField>
        </Section>

        <Section title="Required & Optional">
          <div className="space-y-6">
            <SelectField
              label="Department"
              required
              placeholder="Select department"
              value={requiredVal}
              onValueChange={setRequiredVal}
            >
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectField>

            <SelectField
              label="Team"
              optional
              hintText="You can change this later"
              placeholder="Select team"
              value={optionalVal}
              onValueChange={setOptionalVal}
            >
              <SelectItem value="alpha">Alpha</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="gamma">Gamma</SelectItem>
            </SelectField>
          </div>
        </Section>

        <Section title="Disabled">
          <SelectField
            label="Plan"
            hintText="Contact support to change your plan"
            disabled
            defaultValue="enterprise"
          >
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectField>
        </Section>

        <Section title="Without Label">
          <div className="max-w-xs">
            <Select value={bare} onValueChange={setBare}>
              <SelectTrigger>
                <SelectValue placeholder="Pick a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>
      </div>
    </div>
  )
}
