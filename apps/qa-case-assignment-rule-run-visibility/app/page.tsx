import { QaPrototypeRouter } from "./_components/qa-prototype-router"

type SearchParams = Record<string, string | string[] | undefined>

function getPrototypeFromValue(value: string | null) {
  if (
    value === "qa-case-assignment" ||
    value === "rule-run-visibility" ||
    value === "prototype-3" ||
    value === "prototype-4" ||
    value === "email-preview" ||
    value === "states"
  ) {
    return value
  }

  return "rule-run-visibility"
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const prototypeValue = resolvedSearchParams.prototype
  const initialPrototype = getPrototypeFromValue(
    Array.isArray(prototypeValue) ? prototypeValue[0] : prototypeValue ?? null
  )

  return <QaPrototypeRouter initialPrototype={initialPrototype} />
}
