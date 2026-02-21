"use client"

import * as React from "react"
import { MainNav } from "@/components/patterns/main-nav"
import { TopBar } from "@/components/patterns/top-bar"

type DemoPageShellProps = {
  children: React.ReactNode
}

export function DemoPageShell({ children }: DemoPageShellProps) {
  const [activeItem, setActiveItem] = React.useState("Home")

  return (
    <div className="flex min-h-screen bg-stone-100">
      <MainNav activeItem={activeItem} onItemClick={setActiveItem} className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-w-0 flex-1 bg-stone-100">{children}</main>
      </div>
    </div>
  )
}

