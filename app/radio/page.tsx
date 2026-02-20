"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioWithLabel } from "@/components/ui/radio-with-label"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function RadioDemoPage() {
  const [basicValue, setBasicValue] = React.useState("option-1")
  const [labelValue, setLabelValue] = React.useState("notifications")
  const [leftLabelValue, setLeftLabelValue] = React.useState("left-a")
  const [subtextValue, setSubtextValue] = React.useState("standard")
  const [showValue, setShowValue] = React.useState("alpha")

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Radio Group</h1>
          <p className="mt-1 text-sm text-stone-700">
            Base radio, radio with label, and radio with subtext components.
          </p>
        </div>

        {/* Basic Radio Group */}
        <Section title="Base Radio Group">
          <RadioGroup value={basicValue} onValueChange={setBasicValue}>
            <div className="flex flex-wrap items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                <RadioGroupItem value="option-1" />
                <span className="text-xs text-stone-700">Selected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RadioGroupItem value="option-2" />
                <span className="text-xs text-stone-700">Unselected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RadioGroupItem value="option-3" />
                <span className="text-xs text-stone-700">Unselected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RadioGroupItem value="disabled-off" disabled />
                <span className="text-xs text-stone-700">Disabled</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RadioGroupItem value="option-1" disabled />
                <span className="text-xs text-stone-700">Disabled selected</span>
              </div>
            </div>
          </RadioGroup>
        </Section>

        {/* Radio with Label — Right Position */}
        <Section title="Radio with Label (right)">
          <RadioGroup value={labelValue} onValueChange={setLabelValue}>
            <RadioWithLabel value="notifications" label="Enable notifications" />
            <RadioWithLabel value="digest" label="Daily digest" />
            <RadioWithLabel value="off" label="Turn off" />
          </RadioGroup>
        </Section>

        {/* Radio with Label — Left Position */}
        <Section title="Radio with Label (left)">
          <RadioGroup value={leftLabelValue} onValueChange={setLeftLabelValue}>
            <RadioWithLabel value="left-a" label="Option A" labelPosition="left" />
            <RadioWithLabel value="left-b" label="Option B" labelPosition="left" />
          </RadioGroup>
        </Section>

        {/* Radio with Label + Subtext */}
        <Section title="Radio with Label + Subtext">
          <RadioGroup value={subtextValue} onValueChange={setSubtextValue}>
            <RadioWithLabel
              value="standard"
              label="Standard shipping"
              subtext="Delivered in 5–7 business days"
            />
            <RadioWithLabel
              value="express"
              label="Express shipping"
              subtext="Delivered in 2–3 business days"
            />
            <RadioWithLabel
              value="overnight"
              label="Overnight shipping"
              subtext="Delivered next business day"
            />
          </RadioGroup>
        </Section>

        {/* Disabled Radio Items */}
        <Section title="Disabled States">
          <RadioGroup value="enabled" defaultValue="enabled">
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
            <RadioWithLabel
              value="disabled-checked"
              label="Locked selection"
              subtext="This option cannot be changed"
              disabled
            />
          </RadioGroup>
        </Section>

        {/* Show Selected Value */}
        <Section title="Selected Value">
          <RadioGroup value={showValue} onValueChange={setShowValue}>
            <RadioWithLabel value="alpha" label="Alpha" />
            <RadioWithLabel value="beta" label="Beta" />
            <RadioWithLabel value="gamma" label="Gamma" />
          </RadioGroup>
          <p className="text-sm text-stone-700">
            Selected: <span className="font-semibold text-foreground">{showValue}</span>
          </p>
        </Section>
      </div>
    </div>
  )
}
