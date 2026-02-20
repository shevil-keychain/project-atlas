"use client"

import { useState } from "react"
import { MainNav } from "@/components/patterns/main-nav"

export default function MainNavPage() {
  const [active, setActive] = useState("Home")

  return (
    <div className="flex h-screen">
      <MainNav activeItem={active} onItemClick={setActive} />
      <div className="flex flex-1 items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-2">
            Main Navigation Component
          </h1>
          <p className="text-stone-500">
            Active item: <span className="font-semibold text-stone-800">{active}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
