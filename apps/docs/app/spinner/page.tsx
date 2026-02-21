"use client"

import { Spinner, ShimmerText } from "@/components/ui/spinner"
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

export default function SpinnerDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Spinner</h1>
          <p className="mt-4 text-14 text-stone-700">
            Brand orange loading spinner and shimmer text effect.
          </p>
        </div>

        <Section title="Spinner Sizes">
          <div className="flex items-center gap-24">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Section>

        <Section title="With Label">
          <div className="flex items-center gap-8">
            <Spinner size="sm" />
            <span className="text-14 text-stone-700">Loading...</span>
          </div>
        </Section>

        <Section title="Shimmer Text">
          <ShimmerText className="text-14">
            Loading content...
          </ShimmerText>
        </Section>

        <Section title="Full Loading State">
          <div className="flex flex-col items-center justify-center gap-16 rounded-lg border border-stone-300 py-48">
            <Spinner size="lg" />
            <span className="text-14 text-stone-700">Loading...</span>
            <ShimmerText className="text-14">Please wait while we load.</ShimmerText>
          </div>
        </Section>


      </div>
    </div>
  )
}
