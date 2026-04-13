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
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-12 z-50 flex justify-start pl-[128px]">
      <Card className="pointer-events-auto border-border-default bg-text-primary p-12 shadow-sm">
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
    </div>
  )
}
