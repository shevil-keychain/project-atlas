"use client"

import { TopBar } from "@/components/patterns/top-bar"

export default function TopBarPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 items-center justify-center bg-stone-50">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-stone-900">
            Top Bar Component
          </h1>
          <p className="text-stone-500">
            The top navigation bar with organization switcher, help, notifications, and user avatar.
          </p>
          <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4 text-left text-sm text-stone-600">
            <p className="mb-2 font-semibold text-stone-800">Configurable props</p>
            <ul className="list-inside list-disc space-y-1">
              <li><code className="text-stone-800">organizationName</code> — defaults to &quot;Organization&quot;</li>
              <li><code className="text-stone-800">avatarInitial</code> — defaults to &quot;M&quot;</li>
              <li><code className="text-stone-800">avatarColor</code> — defaults to &quot;#E0593E&quot;</li>
              <li><code className="text-stone-800">className</code> — merged onto the root element</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
