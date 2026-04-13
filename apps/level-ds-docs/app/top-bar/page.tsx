"use client"

import { TopBar } from "@/components/patterns/top-bar"
import { BackButton } from "@/components/ui/back-button"

export default function TopBarPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 items-center justify-center bg-stone-50">
        <div className="max-w-md text-center font-medium">
          <BackButton />
          <h1 className="mb-8 text-24 font-bold tracking-tight text-stone-900">
            Top Bar Component
          </h1>
          <p className="text-stone-500 font-medium">
            The top navigation bar with help, notifications, and user avatar.
          </p>
          <div className="mt-24 rounded-lg border border-stone-200 bg-white p-16 text-left text-14 text-stone-600 font-medium">
            <p className="mb-8 font-semibold text-stone-800">Configurable props</p>
            <ul className="list-inside list-disc space-y-4">
              <li><code className="text-stone-800 font-medium">avatarInitial</code> — defaults to &quot;M&quot;</li>
              <li><code className="text-stone-800 font-medium">avatarColor</code> — defaults to &quot;#E0593E&quot;</li>
              <li><code className="text-stone-800 font-medium">className</code> — merged onto the root element</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
