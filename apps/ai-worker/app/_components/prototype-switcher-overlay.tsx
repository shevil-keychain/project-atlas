"use client"

import { useState, useEffect } from "react"
import { Card } from "@level/ui/components/ui/card"
import {
  NeutralTabsList,
  NeutralTabsTrigger,
  Tabs,
} from "@level/ui/components/ui/tabs"

type PrototypeOption = {
  value: string
  label: string
}

type PrototypeSwitcherOverlayProps = {
  value: string
  options: readonly PrototypeOption[]
  onValueChange: (value: string) => void
}

export function PrototypeSwitcherOverlay({
  value,
  options,
  onValueChange,
}: PrototypeSwitcherOverlayProps) {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className="fixed top-12 z-50 pl-[128px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <Card className="border-border-default bg-text-primary p-12 shadow-sm animate-in fade-in zoom-in-95 duration-150">
          <Tabs value={value} onValueChange={onValueChange}>
            <NeutralTabsList aria-label="AI Worker versions">
              {options.map((option) => (
                <NeutralTabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </NeutralTabsTrigger>
              ))}
            </NeutralTabsList>
          </Tabs>
        </Card>
      ) : (
        <div className="flex h-24 w-24 cursor-pointer items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-neutral-400 opacity-60 transition-opacity hover:opacity-100" />
        </div>
      )}
    </div>
  )
}
