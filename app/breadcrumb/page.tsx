"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function BreadcrumbDemoPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Breadcrumb
          </h1>
          <p className="mt-2 text-sm text-stone-700">
            Composable breadcrumb with slash separator, link segments, and current
            page.
          </p>
        </header>

        <Section title="With links">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/#">Settings</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Section title="Current page only">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Section title="With ellipsis">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbEllipsis />
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/#">Settings</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>
      </div>
    </div>
  )
}
