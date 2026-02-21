"use client"

import { DemoPageShell } from "@/components/patterns/demo-page-shell"

export default function BoilerplatePage() {
  return (
    <DemoPageShell>
      <div className="mx-auto max-w-3xl p-40">
        <div className="rounded-xl border border-stone-300 bg-white p-24">
          <h1 className="text-24 font-bold text-foreground">Page Boilerplate</h1>
          <p className="mt-8 text-14 text-stone-700">
            Use this layout when starting a new page: left `MainNav`, top `TopBar`,
            and `stone-100` page background.
          </p>
          <div className="mt-16 rounded-md bg-stone-100 p-16 text-12 text-stone-800">
            <pre className="whitespace-pre-wrap">{`import { DemoPageShell } from "@/components/patterns/demo-page-shell"

export default function NewPage() {
  return (
    <DemoPageShell>
      <div className="p-40">{/* page content */}</div>
    </DemoPageShell>
  )
}`}</pre>
          </div>
        </div>
      </div>
    </DemoPageShell>
  )
}

