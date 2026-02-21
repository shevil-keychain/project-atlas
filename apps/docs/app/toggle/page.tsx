"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { ToggleWithLabel } from "@/components/ui/toggle-with-label"
import { ToggleCard } from "@/components/ui/toggle-card"
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
    <section className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-stone-700">{description}</p>
      </div>
      <div className="space-y-3">{children}</div>
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
    <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-5 sm:flex sm:items-start sm:gap-6">
      <p className="w-32 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
        {label}
      </p>
      <div className="mt-3 w-full space-y-5 sm:mt-0">{children}</div>
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
    <div className="flex min-h-[102px] flex-col items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-4">
      {children}
      <p className="text-sm font-medium text-stone-700">{label}</p>
    </div>
  )
}

export default function ToggleDemoPage() {
  const [baseUnchecked, setBaseUnchecked] = React.useState(false)
  const [baseChecked, setBaseChecked] = React.useState(true)

  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [leftLabelOption, setLeftLabelOption] = React.useState(false)
  const [leftLabelWithSubtext, setLeftLabelWithSubtext] = React.useState(true)
  const [disabledOption, setDisabledOption] = React.useState(false)

  const [basicCard, setBasicCard] = React.useState(false)
  const [iconCard, setIconCard] = React.useState(true)
  const [imageCard, setImageCard] = React.useState(false)
  const [disabledCard, setDisabledCard] = React.useState(true)

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Toggle Switch
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-700">
            Base toggle switch, labeled toggles, and card variants with consistent
            labels, spacing, and arrangement.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Base States
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">4</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Label Patterns
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">5</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Card Variants
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">4</p>
            </div>
          </div>
        </header>

        <Section
          title="Base Toggle States"
          description="Interactive examples for unchecked, checked, and disabled switch states."
        >
          <Row label="Preview">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StateTile label="Unchecked">
                <ToggleSwitch
                  checked={baseUnchecked}
                  onCheckedChange={setBaseUnchecked}
                />
              </StateTile>
              <StateTile label="Checked">
                <ToggleSwitch checked={baseChecked} onCheckedChange={setBaseChecked} />
              </StateTile>
              <StateTile label="Disabled">
                <ToggleSwitch disabled />
              </StateTile>
              <StateTile label="Disabled Checked">
                <ToggleSwitch disabled checked={true} />
              </StateTile>
            </div>
          </Row>
          <Row label="Interactive">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Auto-save drafts</span>
                <ToggleSwitch checked={baseUnchecked} onCheckedChange={setBaseUnchecked} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Email alerts</span>
                <ToggleSwitch checked={baseChecked} onCheckedChange={setBaseChecked} />
              </div>
            </div>
          </Row>
        </Section>

        <Section
          title="Toggle with Label"
          description="Right and left label alignment with optional subtext and disabled behavior."
        >
          <Row label="Right Label">
            <ToggleWithLabel
              label="Enable dark mode"
              checked={darkModeEnabled}
              onCheckedChange={(v) => setDarkModeEnabled(v as boolean)}
            />
            <ToggleWithLabel
              label="Enable notifications"
              subtext="Receive email updates about your account activity"
              checked={notificationsEnabled}
              onCheckedChange={(v) => setNotificationsEnabled(v as boolean)}
            />
          </Row>
          <Row label="Left Label">
            <ToggleWithLabel
              label="Label on the left"
              labelPosition="left"
              checked={leftLabelOption}
              onCheckedChange={(v) => setLeftLabelOption(v as boolean)}
            />
            <ToggleWithLabel
              label="Left label with subtext"
              labelPosition="left"
              subtext="Additional description goes here"
              checked={leftLabelWithSubtext}
              onCheckedChange={(v) => setLeftLabelWithSubtext(v as boolean)}
            />
          </Row>
          <Row label="Disabled">
            <ToggleWithLabel
              label="Disabled option"
              subtext="This option is not available"
              disabled
              checked={disabledOption}
              onCheckedChange={(v) => setDisabledOption(v as boolean)}
            />
          </Row>
        </Section>

        <Section
          title="Toggle Cards"
          description="Card layout with switch controls, icons, and optional preview content."
        >
          <Row label="Selectable">
            <div className="grid gap-3 lg:grid-cols-2">
              <ToggleCard
                label="Basic card"
                subtext="A simple toggle card without an icon"
                checked={basicCard}
                onCheckedChange={setBasicCard}
              />
              <ToggleCard
                label="Card with icon"
                subtext="This card includes an icon on the left"
                icon={<Call size={16} color="white" />}
                checked={iconCard}
                onCheckedChange={setIconCard}
              />
              <ToggleCard
                label="Card with image"
                subtext="Includes a visual preview area below"
                icon={<Call size={16} color="white" />}
                checked={imageCard}
                onCheckedChange={setImageCard}
                image={
                  <div className="flex h-24 items-center justify-center rounded-md bg-stone-200 text-sm text-stone-700">
                    Image placeholder
                  </div>
                }
              />
            </div>
          </Row>
          <Row label="Disabled">
            <ToggleCard
              className="max-w-xl"
              label="Disabled card"
              subtext="This card is not selectable"
              icon={<Heart className="size-4 text-stone-600" />}
              disabled
              checked={disabledCard}
              onCheckedChange={setDisabledCard}
            />
          </Row>
        </Section>
      </div>
    </div>
  )
}
