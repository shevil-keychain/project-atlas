"use client"

import { DemoPageShell } from "@/components/patterns/demo-page-shell"

export default function BoilerplatePage() {
  return (
    <DemoPageShell>
      <div className="mx-auto max-w-3xl p-10">
        <div className="rounded-xl border border-stone-300 bg-white p-6">
          <h1 className="text-2xl font-bold text-foreground">Page Boilerplate</h1>
          <p className="mt-2 text-sm text-stone-700">
            Use this layout when starting a new page: left `MainNav`, top `TopBar`,
            and `stone-100` page background.
          </p>
          <div className="mt-4 rounded-md bg-stone-100 p-4 text-xs text-stone-800">
            <pre className="whitespace-pre-wrap">{`import { DemoPageShell } from "@/components/patterns/demo-page-shell"

export default function NewPage() {
  return (
    <DemoPageShell>
      <div className="p-10">{/* page content */}</div>
    </DemoPageShell>
  )
}`}</pre>
          </div>
        </div>
      </div>
    </DemoPageShell>
  )
}

