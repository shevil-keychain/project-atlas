"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioWithLabel } from "@/components/ui/radio-with-label"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-stone-300/80 bg-white/90 p-24 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <div className="mb-20">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-4 text-14 text-stone-700">{description}</p>
      </div>
      <div className="space-y-12">{children}</div>
    </section>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-20 sm:flex sm:items-start sm:gap-24">
      <p className="w-128 shrink-0 text-12 font-semibold uppercase tracking-[0.14em] text-stone-600">
        {label}
      </p>
      <div className="mt-12 w-full space-y-20 sm:mt-0">{children}</div>
    </div>
  )
}

function StateTile({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[102px] flex-col items-center justify-center gap-12 rounded-xl border border-stone-200 bg-white px-16 py-16">
      {children}
      <p className="text-14 font-medium text-stone-700">{label}</p>
    </div>
  )
}

export default function RadioDemoPage() {
  const [basicValue, setBasicValue] = React.useState("option-1")
  const [notificationValue, setNotificationValue] =
    React.useState("notifications")
  const [leftLabelValue, setLeftLabelValue] = React.useState("left-a")
  const [shippingValue, setShippingValue] = React.useState("standard")
  const [showValue, setShowValue] = React.useState("alpha")

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-16 py-40 sm:px-32">
      <div className="mx-auto max-w-6xl space-y-32">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-24 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-12 font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-8 text-30 font-bold tracking-tight text-foreground">
            Radio Group
          </h1>
          <p className="mt-8 max-w-2xl text-14 text-stone-700">
            Base radio states plus label, subtext, and disabled usage patterns
            with consistent spacing and arrangement.
          </p>
          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Preview States
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">5</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Label Patterns
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">6</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Demo Groups
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">5</p>
            </div>
          </div>
        </header>

        <Section
          title="Base Radio States"
          description="Quick state preview plus an interactive basic radio group."
        >
          <Row label="Preview">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
              <StateTile label="Selected">
                <RadioGroup value="selected">
                  <RadioGroupItem value="selected" />
                </RadioGroup>
              </StateTile>
              <StateTile label="Unselected">
                <RadioGroup value="selected">
                  <RadioGroupItem value="unselected" />
                </RadioGroup>
              </StateTile>
              <StateTile label="Unchecked">
                <RadioGroup value="active">
                  <RadioGroupItem value="inactive" />
                </RadioGroup>
              </StateTile>
              <StateTile label="Disabled">
                <RadioGroup value="active">
                  <RadioGroupItem value="disabled-off" disabled />
                </RadioGroup>
              </StateTile>
              <StateTile label="Disabled Selected">
                <RadioGroup value="disabled-on">
                  <RadioGroupItem value="disabled-on" disabled />
                </RadioGroup>
              </StateTile>
            </div>
          </Row>
          <Row label="Interactive">
            <RadioGroup
              value={basicValue}
              onValueChange={setBasicValue}
              className="gap-20"
            >
              <RadioWithLabel value="option-1" label="Option 1" />
              <RadioWithLabel value="option-2" label="Option 2" />
              <RadioWithLabel value="option-3" label="Option 3" />
            </RadioGroup>
          </Row>
        </Section>

        <Section
          title="Radio with Label"
          description="Right and left label alignment with a consistent row structure."
        >
          <Row label="Right Label">
            <RadioGroup
              value={notificationValue}
              onValueChange={setNotificationValue}
              className="gap-20"
            >
              <RadioWithLabel value="notifications" label="Enable notifications" />
              <RadioWithLabel value="digest" label="Daily digest" />
              <RadioWithLabel value="off" label="Turn off notifications" />
            </RadioGroup>
          </Row>
          <Row label="Left Label">
            <RadioGroup
              value={leftLabelValue}
              onValueChange={setLeftLabelValue}
              className="gap-20"
            >
              <RadioWithLabel value="left-a" label="Option A" labelPosition="left" />
              <RadioWithLabel value="left-b" label="Option B" labelPosition="left" />
              <RadioWithLabel value="left-c" label="Option C" labelPosition="left" />
            </RadioGroup>
          </Row>
        </Section>

        <Section
          title="Radio with Subtext"
          description="Labeled radio options with supporting helper text."
        >
          <Row label="Shipping">
            <RadioGroup
              value={shippingValue}
              onValueChange={setShippingValue}
              className="gap-20"
            >
              <RadioWithLabel
                value="standard"
                label="Standard shipping"
                subtext="Delivered in 5-7 business days"
              />
              <RadioWithLabel
                value="express"
                label="Express shipping"
                subtext="Delivered in 2-3 business days"
              />
              <RadioWithLabel
                value="overnight"
                label="Overnight shipping"
                subtext="Delivered next business day"
              />
            </RadioGroup>
          </Row>
        </Section>

        <Section
          title="Disabled States"
          description="Examples for mixed availability and fully locked selections."
        >
          <Row label="Mixed">
            <RadioGroup value="enabled" className="gap-20">
              <RadioWithLabel
                value="enabled"
                label="Available option"
                subtext="This option is selectable"
              />
              <RadioWithLabel
                value="disabled-unchecked"
                label="Unavailable option"
                subtext="This option is not available"
                disabled
              />
            </RadioGroup>
          </Row>
          <Row label="Locked">
            <RadioGroup value="disabled-checked" className="gap-20">
              <RadioWithLabel
                value="enabled"
                label="Available option"
                subtext="Not currently selected"
              />
              <RadioWithLabel
                value="disabled-checked"
                label="Locked selection"
                subtext="This option cannot be changed"
                disabled
              />
            </RadioGroup>
          </Row>
        </Section>

        <Section
          title="Selected Value"
          description="Value output example for controlled radio groups."
        >
          <Row label="Selection">
            <RadioGroup value={showValue} onValueChange={setShowValue} className="gap-20">
              <RadioWithLabel value="alpha" label="Alpha" />
              <RadioWithLabel value="beta" label="Beta" />
              <RadioWithLabel value="gamma" label="Gamma" />
            </RadioGroup>
          </Row>
          <Row label="Output">
            <div className="rounded-lg border border-stone-200 bg-white px-16 py-12 text-14 text-stone-700">
              Selected value:{" "}
              <span className="font-semibold text-foreground">{showValue}</span>
            </div>
          </Row>
        </Section>
      </div>
    </div>
  )
}
