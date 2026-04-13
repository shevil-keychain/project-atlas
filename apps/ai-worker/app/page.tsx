import { PrototypeRouter } from "./_components/prototype-router"

type SearchParams = Record<string, string | string[] | undefined>

function getPrototypeFromValue(value: string | null) {
  if (value === "version-1" || value === "version-2") {
    return value
  }

  return "version-2"
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

  return <PrototypeRouter initialPrototype={initialPrototype} />
}
