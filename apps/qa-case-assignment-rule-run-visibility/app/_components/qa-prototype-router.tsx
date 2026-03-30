"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { PrototypeSwitcherOverlay } from "./prototype-switcher-overlay"
import QaCaseAssignmentPrototype from "./prototypes/qa-case-assignment-prototype"
import RuleRunVisibilityPrototype from "./prototypes/rule-run-visibility-prototype"
import VersionThreePrototype from "./prototypes/version-three-prototype"
import VersionFourPrototype from "./prototypes/version-four-prototype"
import EmailPreviewPrototype from "./prototypes/email-preview-prototype"

const prototypeOptions = [
  {
    value: "qa-case-assignment",
    label: "Version 1",
  },
  {
    value: "rule-run-visibility",
    label: "Version 2",
  },
  {
    value: "prototype-3",
    label: "Version 3",
  },
  {
    value: "prototype-4",
    label: "Dev handoff",
  },
  {
    value: "email-preview",
    label: "Email",
  },
] as const

type PrototypeKey = (typeof prototypeOptions)[number]["value"]

const DEFAULT_PROTOTYPE: PrototypeKey = "rule-run-visibility"

function getPrototypeFromValue(value: string | null): PrototypeKey {
  if (prototypeOptions.some((option) => option.value === value)) {
    return value as PrototypeKey
  }

  return DEFAULT_PROTOTYPE
}

export function QaPrototypeRouter({
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

      {activePrototype === "qa-case-assignment" && <QaCaseAssignmentPrototype />}
      {activePrototype === "rule-run-visibility" && <RuleRunVisibilityPrototype />}
      {activePrototype === "prototype-3" && <VersionThreePrototype />}
      {activePrototype === "prototype-4" && <VersionFourPrototype />}
      {activePrototype === "email-preview" && <EmailPreviewPrototype />}
    </>
  )
}
