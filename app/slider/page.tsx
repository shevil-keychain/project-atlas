"use client"

import * as React from "react"
import { Slider, SliderField } from "@/components/ui/slider"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function SliderDemoPage() {
  const [basic, setBasic] = React.useState([50])
  const [range, setRange] = React.useState([25, 75])
  const [stepped, setStepped] = React.useState([40])
  const [labeled, setLabeled] = React.useState([60])
  const [price, setPrice] = React.useState([200, 800])

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Slider</h1>
          <p className="mt-1 text-sm text-stone-700">
            Range slider with single and dual thumb variants, step markers, value display, and form field wrapper.
          </p>
        </div>

        <Section title="Default">
          <SliderField
            label="Volume"
            hintText="Drag to adjust"
            value={basic}
            onValueChange={setBasic}
            showValue
          />
        </Section>

        <Section title="Range (Two Thumbs)">
          <SliderField
            label="Score range"
            hintText="Select a min and max score"
            value={range}
            onValueChange={setRange}
            showValue
            showRange
          />
        </Section>

        <Section title="With Steps">
          <SliderField
            label="Opacity"
            hintText="Moves in increments of 10"
            value={stepped}
            onValueChange={setStepped}
            step={10}
            showValue
            showRange
            formatValue={(v) => `${v}%`}
          />
        </Section>

        <Section title="With Value Label">
          <SliderField
            label="Confidence threshold"
            value={labeled}
            onValueChange={setLabeled}
            showValue
            formatValue={(v) => `${v}%`}
          />
        </Section>

        <Section title="Custom Range (0–1000)">
          <SliderField
            label="Price range"
            hintText="Filter products by price"
            min={0}
            max={1000}
            step={50}
            value={price}
            onValueChange={setPrice}
            showValue
            showRange
            formatValue={(v) => `$${v}`}
          />
        </Section>

        <Section title="Disabled">
          <SliderField
            label="Locked value"
            hintText="This cannot be changed"
            disabled
            value={[70]}
            showValue
          />
        </Section>

        <Section title="Without Label">
          <div className="max-w-sm">
            <Slider defaultValue={[33]} showValue />
          </div>
        </Section>
      </div>
    </div>
  )
}
