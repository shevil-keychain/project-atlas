"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxWithLabel } from "@/components/ui/checkbox-with-label"
import { CheckboxCard } from "@/components/ui/checkbox-card"
import { Call } from "@/components/icons/channels/call"
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

export default function CheckboxDemoPage() {
  const [baseUnchecked, setBaseUnchecked] = React.useState(false)
  const [baseChecked, setBaseChecked] = React.useState<boolean | "indeterminate">(true)
  const [baseIndeterminate, setBaseIndeterminate] =
    React.useState<boolean | "indeterminate">("indeterminate")

  const [acceptTerms, setAcceptTerms] = React.useState(false)
  const [enableNotifications, setEnableNotifications] = React.useState(true)
  const [leftLabelOption, setLeftLabelOption] = React.useState(false)
  const [leftLabelWithSubtext, setLeftLabelWithSubtext] = React.useState(true)
  const [disabledOption, setDisabledOption] = React.useState(false)

  const [basicCard, setBasicCard] = React.useState(false)
  const [iconCard, setIconCard] = React.useState(true)
  const [imageCard, setImageCard] = React.useState(false)
  const [disabledCard, setDisabledCard] = React.useState(true)

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-16 py-40 sm:px-32">
      <div className="mx-auto max-w-6xl space-y-32">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-24 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-12 font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-8 text-30 font-bold tracking-tight text-foreground">
            Checkbox
          </h1>
          <p className="mt-8 max-w-2xl text-14 text-stone-700">
            Base checkbox, checkbox with label, and checkbox card patterns with
            consistent labels and spacing.
          </p>
          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Base States
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">6</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Label Patterns
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">5</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Card Variants
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">4</p>
            </div>
          </div>
        </header>

        <Section
          title="Base Checkbox States"
          description="Interactive examples for unchecked, checked, indeterminate, and disabled states."
        >
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <StateTile label="Unchecked">
              <Checkbox
                checked={baseUnchecked}
                onCheckedChange={(v) => setBaseUnchecked(v as boolean)}
              />
            </StateTile>
            <StateTile label="Checked">
              <Checkbox
                checked={baseChecked}
                onCheckedChange={(v) => setBaseChecked(v)}
              />
            </StateTile>
            <StateTile label="Indeterminate">
              <Checkbox
                checked={baseIndeterminate}
                onCheckedChange={(v) => setBaseIndeterminate(v)}
              />
            </StateTile>
            <StateTile label="Disabled">
              <Checkbox disabled />
            </StateTile>
            <StateTile label="Disabled Checked">
              <Checkbox disabled checked={true} />
            </StateTile>
            <StateTile label="Disabled Indeterminate">
              <Checkbox disabled checked="indeterminate" />
            </StateTile>
          </div>
        </Section>

        <Section
          title="Checkbox with Label"
          description="Labeled checkboxes with right and left label placement, subtext, and disabled behavior."
        >
          <Row label="Right Label">
            <CheckboxWithLabel
              label="Accept terms and conditions"
              checked={acceptTerms}
              onCheckedChange={(v) => setAcceptTerms(v as boolean)}
            />
            <CheckboxWithLabel
              label="Enable notifications"
              subtext="Receive email updates about your account activity"
              checked={enableNotifications}
              onCheckedChange={(v) => setEnableNotifications(v as boolean)}
            />
          </Row>
          <Row label="Left Label">
            <CheckboxWithLabel
              label="Label on the left"
              labelPosition="left"
              checked={leftLabelOption}
              onCheckedChange={(v) => setLeftLabelOption(v as boolean)}
            />
            <CheckboxWithLabel
              label="Left label with subtext"
              labelPosition="left"
              subtext="Additional description goes here"
              checked={leftLabelWithSubtext}
              onCheckedChange={(v) => setLeftLabelWithSubtext(v as boolean)}
            />
          </Row>
          <Row label="Disabled">
            <CheckboxWithLabel
              label="Disabled option"
              subtext="This option is not available"
              disabled
              checked={disabledOption}
              onCheckedChange={(v) => setDisabledOption(v as boolean)}
            />
          </Row>
        </Section>

        <Section
          title="Checkbox Cards"
          description="Card layout with checkbox controls, icons, and optional preview content."
        >
          <Row label="Selectable">
            <div className="grid gap-12 lg:grid-cols-2">
              <CheckboxCard
                label="Basic card"
                subtext="A simple checkbox card without an icon"
                checked={basicCard}
                onCheckedChange={(v) => setBasicCard(v as boolean)}
              />
              <CheckboxCard
                label="Card with icon"
                subtext="This card includes an icon on the left"
                icon={<Call size={16} color="white" />}
                checked={iconCard}
                onCheckedChange={(v) => setIconCard(v as boolean)}
              />
              <CheckboxCard
                label="Card with image"
                subtext="Includes a visual preview area below"
                icon={<Call size={16} color="white" />}
                checked={imageCard}
                onCheckedChange={(v) => setImageCard(v as boolean)}
                image={
                  <div className="flex h-24 items-center justify-center rounded-md bg-stone-200 text-14 text-stone-700">
                    Image placeholder
                  </div>
                }
              />
            </div>
          </Row>
          <Row label="Disabled">
            <CheckboxCard
              className="max-w-xl"
              label="Disabled card"
              subtext="This card is not selectable"
              icon={<Heart className="size-16 text-stone-600" />}
              disabled
              checked={disabledCard}
              onCheckedChange={(v) => setDisabledCard(v as boolean)}
            />
          </Row>
        </Section>
      </div>
    </div>
  )
}
