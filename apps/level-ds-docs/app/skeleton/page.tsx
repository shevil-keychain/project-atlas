"use client"

import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "@/components/ui/skeleton"
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

export default function SkeletonDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Skeleton</h1>
          <p className="mt-4 text-14 text-stone-700">
            Loading placeholders with pulse animation.
          </p>
        </div>

        <Section title="Text Lines">
          <SkeletonText />
        </Section>

        <Section title="Avatar">
          <div className="flex items-center gap-16">
            <SkeletonAvatar size={32} />
            <SkeletonAvatar size={40} />
            <SkeletonAvatar size={48} />
          </div>
        </Section>

        <Section title="Card Skeleton">
          <SkeletonCard className="max-w-sm" />
        </Section>

        <Section title="Table Row Skeleton">
          <div className="flex gap-16">
            <Skeleton className="h-40 flex-1" />
            <Skeleton className="h-40 flex-1" />
            <Skeleton className="h-40 flex-1" />
            <Skeleton className="h-40 w-20 shrink-0" />
          </div>
        </Section>

        <Section title="Full Page Skeleton">
          <div className="space-y-24">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-16">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <SkeletonText lines={5} className="max-w-md" />
          </div>
        </Section>
      </div>
    </div>
  )
}
