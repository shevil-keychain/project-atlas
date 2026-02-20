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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function SpinnerDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Spinner</h1>
          <p className="mt-1 text-sm text-stone-700">
            Brand orange loading spinner and shimmer text effect.
          </p>
        </div>

        <Section title="Spinner Sizes">
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Section>

        <Section title="With Label">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-sm text-stone-700">Loading...</span>
          </div>
        </Section>

        <Section title="Shimmer Text">
          <ShimmerText className="text-sm">
            Loading content...
          </ShimmerText>
        </Section>

        <Section title="Full Loading State">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 py-12">
            <Spinner size="lg" />
            <span className="text-sm text-stone-700">Loading...</span>
            <ShimmerText className="text-sm">Please wait while we load.</ShimmerText>
          </div>
        </Section>


      </div>
    </div>
  )
}
