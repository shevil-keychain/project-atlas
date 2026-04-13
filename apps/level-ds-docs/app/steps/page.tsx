"use client"

import * as React from "react"
import { Steps, type StepItem } from "@/components/ui/steps"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-16">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

const defaultSteps: StepItem[] = [
  { label: "Name and type" },
  { label: "Customer behavior" },
  { label: "Agent behavior" },
  { label: "Settings" },
]

export default function StepsDemoPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [clickStep, setClickStep] = React.useState(0)

  const stepsWithDisabled: StepItem[] = [
    { label: "Name and type" },
    { label: "Customer behavior" },
    { label: "Agent behavior" },
    { label: "Settings", disabled: true },
  ]

  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-3xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Steps</h1>
          <p className="mt-4 text-14 text-stone-700">
            Pill-based horizontal step indicator for multi-step flows.
          </p>
        </div>

        <Section title="Default (current step: 2)">
          <div className="overflow-hidden rounded-lg border border-stone-300">
            <Steps steps={defaultSteps} currentStep={currentStep} />
          </div>
          <div className="mt-12 flex items-center gap-8">
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentStep((prev) => Math.max(prev - 1, 0))
              }
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.min(prev + 1, defaultSteps.length - 1)
                )
              }
            >
              Next
            </Button>
            <p className="text-14 text-stone-700">
              Current index: {currentStep}
            </p>
          </div>
        </Section>

        <Section title="With click">
          <div className="overflow-hidden rounded-lg border border-stone-300">
            <Steps
              steps={defaultSteps}
              currentStep={clickStep}
              onStepClick={setClickStep}
            />
          </div>
          <p className="mt-8 text-14 text-stone-600">
            Click any step to navigate. Active: index {clickStep}.
          </p>
        </Section>

        <Section title="With disabled step">
          <div className="overflow-hidden rounded-lg border border-stone-300">
            <Steps steps={stepsWithDisabled} currentStep={1} />
          </div>
          <p className="mt-8 text-14 text-stone-600">
            The last step is disabled and cannot be clicked.
          </p>
        </Section>

        <Section title="All completed (last step active)">
          <div className="overflow-hidden rounded-lg border border-stone-300">
            <Steps steps={defaultSteps} currentStep={3} />
          </div>
        </Section>

        <Section title="First step active">
          <div className="overflow-hidden rounded-lg border border-stone-300">
            <Steps steps={defaultSteps} currentStep={0} />
          </div>
        </Section>
      </div>
    </div>
  )
}
