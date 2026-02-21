import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-6 text-14 font-medium text-foreground mb-16 transition-colors hover:opacity-70"
    >
      <ArrowLeft className="size-16" />
      Back
    </Link>
  )
}
