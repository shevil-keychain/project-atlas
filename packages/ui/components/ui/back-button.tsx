import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mb-4 transition-colors hover:opacity-70"
    >
      <ArrowLeft className="size-4" />
      Back
    </Link>
  )
}
