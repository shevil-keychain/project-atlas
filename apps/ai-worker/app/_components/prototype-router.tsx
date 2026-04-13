"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { PrototypeSwitcherOverlay } from "./prototype-switcher-overlay"
import VersionOne from "./version-one"
import VersionTwo from "./version-two"

const prototypeOptions = [
  {
    value: "version-1",
    label: "Version 1",
  },
  {
    value: "version-2",
    label: "Version 2",
  },
] as const

type PrototypeKey = (typeof prototypeOptions)[number]["value"]

const DEFAULT_PROTOTYPE: PrototypeKey = "version-2"

function getPrototypeFromValue(value: string | null): PrototypeKey {
  if (prototypeOptions.some((option) => option.value === value)) {
    return value as PrototypeKey
  }

  return DEFAULT_PROTOTYPE
}

export function PrototypeRouter({
  initialPrototype,
}: {
  initialPrototype: PrototypeKey
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [activePrototype, setActivePrototype] = React.useState(initialPrototype)

  React.useEffect(() => {
    setActivePrototype(initialPrototype)
  }, [initialPrototype])

  const handlePrototypeChange = (nextValue: string) => {
    const nextPrototype = getPrototypeFromValue(nextValue)

    if (nextPrototype === activePrototype) {
      return
    }

    const nextSearchParams = new URLSearchParams(window.location.search)

    if (nextPrototype === DEFAULT_PROTOTYPE) {
      nextSearchParams.delete("prototype")
    } else {
      nextSearchParams.set("prototype", nextPrototype)
    }

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname

    setActivePrototype(nextPrototype)

    React.startTransition(() => {
      router.replace(nextUrl, { scroll: false })
    })
  }

  return (
    <>
      <PrototypeSwitcherOverlay
        value={activePrototype}
        options={prototypeOptions}
        onValueChange={handlePrototypeChange}
      />

      {activePrototype === "version-1" && <VersionOne />}
      {activePrototype === "version-2" && <VersionTwo />}
    </>
  )
}
