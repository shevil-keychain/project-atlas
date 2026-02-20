import { ArrowLeft, ArrowRight, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const variants = [
  "default",
  "destructive",
  "secondary",
  "ghost",
  "linkPrimary",
  "linkSecondary",
] as const

const sizes = ["sm", "default", "lg"] as const
const iconSizes = ["icon-sm", "icon", "icon-lg"] as const

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold tracking-tight text-foreground mb-4 mt-10 first:mt-0">
      {children}
    </h2>
  )
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider min-w-28 shrink-0">
      {children}
    </span>
  )
}

export default function ButtonPage() {
  return (
    <div className="min-h-screen p-12 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Button</h1>
      <p className="text-stone-700 mb-10">
        All variants, sizes, icon slots, and disabled states.
      </p>

      {/* Variants x Sizes */}
      <SectionHeading>Variants &times; Sizes</SectionHeading>
      <div className="space-y-5">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-4 flex-wrap">
            <VariantLabel>{variant}</VariantLabel>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* With Icons */}
      <SectionHeading>With Icons</SectionHeading>
      <div className="space-y-5">
        <div className="flex items-center gap-4 flex-wrap">
          <VariantLabel>icon left</VariantLabel>
          <Button iconLeft={<ArrowLeft className="size-4" />}>
            Back
          </Button>
          <Button variant="secondary" iconLeft={<ArrowLeft className="size-4" />}>
            Back
          </Button>
          <Button variant="ghost" iconLeft={<ArrowLeft className="size-4" />}>
            Back
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <VariantLabel>icon right</VariantLabel>
          <Button iconRight={<ArrowRight className="size-4" />}>
            Continue
          </Button>
          <Button variant="secondary" iconRight={<ArrowRight className="size-4" />}>
            Continue
          </Button>
          <Button variant="ghost" iconRight={<ArrowRight className="size-4" />}>
            Continue
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <VariantLabel>both icons</VariantLabel>
          <Button
            iconLeft={<ArrowLeft className="size-4" />}
            iconRight={<ArrowRight className="size-4" />}
          >
            Navigate
          </Button>
          <Button
            variant="destructive"
            iconLeft={<Trash2 className="size-4" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Icon-only */}
      <SectionHeading>Icon-Only Buttons</SectionHeading>
      <div className="space-y-5">
        {(["default", "destructive", "secondary", "ghost"] as const).map(
          (variant) => (
            <div key={variant} className="flex items-center gap-4 flex-wrap">
              <VariantLabel>{variant}</VariantLabel>
              {iconSizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  <Plus className="size-4" />
                </Button>
              ))}
            </div>
          )
        )}
      </div>

      {/* Disabled */}
      <SectionHeading>Disabled States</SectionHeading>
      <div className="space-y-5">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-4 flex-wrap">
            <VariantLabel>{variant}</VariantLabel>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button
              variant={variant}
              disabled
              iconLeft={<ArrowLeft className="size-4" />}
            >
              Disabled
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
