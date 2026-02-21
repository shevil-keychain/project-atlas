import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"

const variants = [
  { value: "default", label: "Default" },
  { value: "destructive", label: "Destructive" },
  { value: "secondary", label: "Secondary" },
  { value: "ghost", label: "Ghost" },
  { value: "linkPrimary", label: "Link Primary" },
  { value: "linkSecondary", label: "Link Secondary" },
] as const

const sizes = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
] as const

const iconSizes = [
  { value: "icon-sm", label: "Small" },
  { value: "icon", label: "Default" },
  { value: "icon-lg", label: "Large" },
] as const

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-stone-300/80 bg-white/90 p-24 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <div className="mb-20">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-4 text-14 text-stone-700">{description}</p>
      </div>
      <div className="space-y-12">{children}</div>
    </section>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-16 sm:flex sm:items-center sm:gap-24">
      <p className="w-128 shrink-0 text-12 font-semibold uppercase tracking-[0.14em] text-stone-600">
        {label}
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-12 sm:mt-0">
        {children}
      </div>
    </div>
  )
}

export default function ButtonPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-16 py-40 sm:px-32">
      <div className="mx-auto max-w-6xl space-y-32">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-24 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-12 font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-8 text-30 font-bold tracking-tight text-foreground">
            Button
          </h1>
          <p className="mt-8 max-w-2xl text-14 text-stone-700">
            Clean reference for variants, sizes, icon placements, and disabled
            states with consistent labels and spacing.
          </p>
          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Variants
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">
                {variants.length}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Text Sizes
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">
                {sizes.length}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-16 py-12">
              <p className="text-12 uppercase tracking-[0.12em] text-stone-600">
                Icon Sizes
              </p>
              <p className="mt-4 text-xl font-bold text-foreground">
                {iconSizes.length}
              </p>
            </div>
          </div>
        </header>

        <Section
          title="Variant and Size Matrix"
          description="Every variant rendered across small, default, and large sizes."
        >
          {variants.map((variant) => (
            <Row key={variant.value} label={variant.label}>
              {sizes.map((size) => (
                <Button key={size.value} variant={variant.value} size={size.value}>
                  {size.label}
                </Button>
              ))}
            </Row>
          ))}
        </Section>

        <Section
          title="Buttons with Icons"
          description="Consistent examples for left icon, right icon, and dual-icon combinations."
        >
          <Row label="Left Icon">
            <Button iconLeft={<ArrowLeft className="size-16" />}>Back</Button>
            <Button variant="secondary" iconLeft={<ArrowLeft className="size-16" />}>
              Back
            </Button>
            <Button variant="ghost" iconLeft={<ArrowLeft className="size-16" />}>
              Back
            </Button>
          </Row>
          <Row label="Right Icon">
            <Button iconRight={<ArrowRight className="size-16" />}>Continue</Button>
            <Button
              variant="secondary"
              iconRight={<ArrowRight className="size-16" />}
            >
              Continue
            </Button>
            <Button variant="ghost" iconRight={<ArrowRight className="size-16" />}>
              Continue
            </Button>
          </Row>
          <Row label="Both Icons">
            <Button
              iconLeft={<ArrowLeft className="size-16" />}
              iconRight={<ArrowRight className="size-16" />}
            >
              Navigate
            </Button>
            <Button variant="destructive" iconLeft={<Trash2 className="size-16" />}>
              Delete
            </Button>
          </Row>
        </Section>

        <Section
          title="Icon-Only Buttons"
          description="Icon-only sizes for core button variants."
        >
          {variants
            .filter(({ value }) =>
              ["default", "destructive", "secondary", "ghost"].includes(value)
            )
            .map((variant) => (
              <Row key={variant.value} label={variant.label}>
                {iconSizes.map((size) => (
                  <Button
                    key={size.value}
                    variant={variant.value}
                    size={size.value}
                    aria-label={`${variant.label} ${size.label} add`}
                  >
                    <Plus className="size-16" />
                  </Button>
                ))}
              </Row>
            ))}
        </Section>

        <Section
          title="Disabled States"
          description="Each variant shown in disabled text-only and disabled-with-icon forms."
        >
          {variants.map((variant) => (
            <Row key={variant.value} label={variant.label}>
              <Button variant={variant.value} disabled>
                Disabled
              </Button>
              <Button
                variant={variant.value}
                disabled
                iconLeft={<ArrowLeft className="size-16" />}
              >
                Disabled
              </Button>
            </Row>
          ))}
        </Section>
      </div>
    </div>
  )
}
