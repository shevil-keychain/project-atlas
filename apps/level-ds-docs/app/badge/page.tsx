import { Circle, AlertCircle, CheckCircle2, Info, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"

const colors = ["gray", "primary", "warning", "error", "blue", "purple"] as const

const colorIcons: Record<(typeof colors)[number], React.ReactNode> = {
  gray: <Circle />,
  primary: <CheckCircle2 />,
  warning: <AlertCircle />,
  error: <AlertCircle />,
  blue: <Info />,
  purple: <Star />,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-18 font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function BadgeDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Badge</h1>
          <p className="mt-4 text-14 text-stone-700 font-medium">
            Pill-shaped colored labels for status, categories, and counts.
          </p>
        </div>

        <Section title="Colors — md">
          <div className="flex flex-wrap gap-12">
            {colors.map((color) => (
              <Badge key={color} color={color}>
                {color}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title="Colors — sm">
          <div className="flex flex-wrap gap-12">
            {colors.map((color) => (
              <Badge key={color} color={color} size="sm">
                {color}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title="With Icons — md">
          <div className="flex flex-wrap gap-12">
            {colors.map((color) => (
              <Badge key={color} color={color} icon={colorIcons[color]}>
                {color}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title="With Icons — sm">
          <div className="flex flex-wrap gap-12">
            {colors.map((color) => (
              <Badge key={color} color={color} size="sm" icon={colorIcons[color]}>
                {color}
              </Badge>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
