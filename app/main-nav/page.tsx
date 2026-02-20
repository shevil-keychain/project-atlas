"use client"

import { useState } from "react"
import { MainNav } from "@/components/patterns/main-nav"
import { BackButton } from "@/components/ui/back-button"

export default function MainNavPage() {
  const [active, setActive] = useState("Home")

  return (
    <div className="flex h-screen">
      <MainNav activeItem={active} onItemClick={setActive} />
      <div className="flex flex-1 items-center justify-center bg-stone-50">
        <div className="text-center font-medium">
          <BackButton />
          <h1 className="text-xxl font-bold tracking-tight text-stone-900 mb-2">
            Main Navigation Component
          </h1>
          <p className="text-stone-500 font-medium">
            Active item: <span className="font-semibold text-stone-800">{active}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
