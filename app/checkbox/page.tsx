"use client"

import * as React from "react"
import { Star, Zap, Heart } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxWithLabel } from "@/components/ui/checkbox-with-label"
import { CheckboxCard } from "@/components/ui/checkbox-card"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function CheckboxDemoPage() {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState<boolean | "indeterminate">(true)
  const [checked3, setChecked3] = React.useState<boolean | "indeterminate">("indeterminate")

  const [labelChecked1, setLabelChecked1] = React.useState(false)
  const [labelChecked2, setLabelChecked2] = React.useState(true)
  const [labelChecked3, setLabelChecked3] = React.useState(false)
  const [labelChecked4, setLabelChecked4] = React.useState(true)
  const [labelChecked5, setLabelChecked5] = React.useState(false)

  const [cardChecked1, setCardChecked1] = React.useState(false)
  const [cardChecked2, setCardChecked2] = React.useState(true)
  const [cardChecked3, setCardChecked3] = React.useState(false)
  const [cardChecked4, setCardChecked4] = React.useState(true)

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Checkbox</h1>
          <p className="mt-1 text-sm text-stone-700">
            Base checkbox, checkbox with label, and checkbox card components.
          </p>
        </div>

        {/* Base Checkboxes */}
        <Section title="Base Checkbox">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <Checkbox
                checked={checked1}
                onCheckedChange={(v) => setChecked1(v as boolean)}
              />
              <span className="text-xs text-stone-700">Unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox
                checked={checked2}
                onCheckedChange={(v) => setChecked2(v)}
              />
              <span className="text-xs text-stone-700">Checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox
                checked={checked3}
                onCheckedChange={(v) => setChecked3(v)}
              />
              <span className="text-xs text-stone-700">Indeterminate</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled />
              <span className="text-xs text-stone-700">Disabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled checked={true} />
              <span className="text-xs text-stone-700">Disabled checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled checked="indeterminate" />
              <span className="text-xs text-stone-700">Disabled indeterminate</span>
            </div>
          </div>
        </Section>

        {/* Checkbox with Label */}
        <Section title="Checkbox with Label">
          <div className="space-y-4">
            <CheckboxWithLabel
              label="Accept terms and conditions"
              checked={labelChecked1}
              onCheckedChange={(v) => setLabelChecked1(v as boolean)}
            />
            <CheckboxWithLabel
              label="Enable notifications"
              subtext="Receive email updates about your account activity"
              checked={labelChecked2}
              onCheckedChange={(v) => setLabelChecked2(v as boolean)}
            />
            <CheckboxWithLabel
              label="Label on the left"
              labelPosition="left"
              checked={labelChecked3}
              onCheckedChange={(v) => setLabelChecked3(v as boolean)}
            />
            <CheckboxWithLabel
              label="Left label with subtext"
              labelPosition="left"
              subtext="Additional description goes here"
              checked={labelChecked4}
              onCheckedChange={(v) => setLabelChecked4(v as boolean)}
            />
            <CheckboxWithLabel
              label="Disabled option"
              subtext="This option is not available"
              disabled
              checked={labelChecked5}
              onCheckedChange={(v) => setLabelChecked5(v as boolean)}
            />
          </div>
        </Section>

        {/* Checkbox Cards */}
        <Section title="Checkbox Card">
          <div className="space-y-3">
            <CheckboxCard
              label="Basic card"
              subtext="A simple checkbox card without an icon"
              checked={cardChecked1}
              onCheckedChange={(v) => setCardChecked1(v as boolean)}
            />
            <CheckboxCard
              label="Card with icon"
              subtext="This card has an icon on the left side"
              icon={<Star className="size-4 text-primary-brand-500" />}
              checked={cardChecked2}
              onCheckedChange={(v) => setCardChecked2(v as boolean)}
            />
            <CheckboxCard
              label="Card with image"
              subtext="Includes a preview area below"
              icon={<Zap className="size-4 text-primary-brand-500" />}
              checked={cardChecked3}
              onCheckedChange={(v) => setCardChecked3(v as boolean)}
              image={
                <div className="flex h-24 items-center justify-center rounded-md bg-stone-200 text-xs text-stone-700">
                  Image placeholder
                </div>
              }
            />
            <CheckboxCard
              label="Disabled card"
              subtext="This card is not selectable"
              icon={<Heart className="size-4 text-stone-600" />}
              disabled
              checked={cardChecked4}
              onCheckedChange={(v) => setCardChecked4(v as boolean)}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
