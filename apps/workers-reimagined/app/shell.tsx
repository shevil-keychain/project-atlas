"use client"

import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { LeftPanel } from "./components/left-panel"

const ACTIVE_NAV_ITEM = "AI workers"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-stone-100">
      <MainNav
        activeItem={ACTIVE_NAV_ITEM}
        onItemClick={() => {}}
        className="shrink-0"
      />
      <LeftPanel />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
