"use client"

import * as React from "react"
import { Search, ChevronDown, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { InputField } from "@/components/ui/input-field"
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

export default function InputDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-xxl font-bold text-foreground">Input</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Text input fields with label, hint text, error state, and icon
            support.
          </p>
        </div>

        <Section title="Default Input">
          <InputField
            label="Email address"
            placeholder="you@example.com"
            hintText="We'll never share your email."
          />
        </Section>

        <Section title="Large Input">
          <InputField
            label="Full name"
            placeholder="Jane Doe"
            hintText="Enter your full legal name."
            inputSize="large"
          />
        </Section>

        <Section title="With Icons">
          <div className="space-y-6">
            <InputField
              label="Search"
              placeholder="Search..."
              hintText="Search across all records."
              iconLeft={<Search />}
            />
            <InputField
              label="Category"
              placeholder="Select a category"
              hintText="Choose from the dropdown."
              iconRight={<ChevronDown />}
            />
            <InputField
              label="Email"
              placeholder="you@company.com"
              hintText="Your work email address."
              iconLeft={<Mail />}
              iconRight={<ChevronDown />}
            />
          </div>
        </Section>

        <Section title="States">
          <div className="space-y-6">
            <InputField
              label="Placeholder"
              placeholder="Placeholder text"
              hintText="Default empty state."
            />
            <InputField
              label="Filled"
              defaultValue="john@example.com"
              hintText="Input with a value."
            />
            <InputField
              label="Disabled"
              placeholder="Cannot edit"
              hintText="This field is disabled."
              disabled
            />
            <InputField
              label="Focusable"
              placeholder="Click to focus"
              hintText="Click the input to see the focus ring."
            />
          </div>
        </Section>

        <Section title="Error State">
          <div className="space-y-6">
            <InputField
              label="Email address"
              defaultValue="invalid-email"
              errorText="Please enter a valid email address."
            />
            <InputField
              label="Password"
              type="password"
              defaultValue="123"
              errorText="Password must be at least 8 characters."
              inputSize="large"
            />
          </div>
        </Section>

        <Section title="Required & Optional">
          <div className="space-y-6">
            <InputField
              label="Company name"
              placeholder="Acme Inc."
              hintText="Your organization's legal name."
              required
            />
            <InputField
              label="Middle name"
              placeholder="(if applicable)"
              hintText="Only if it appears on your ID."
              optional
            />
          </div>
        </Section>

        <Section title="Without Label">
          <InputField
            placeholder="Enter a value..."
            hintText="This input has no label, just hint text."
          />
        </Section>
      </div>
    </div>
  )
}
