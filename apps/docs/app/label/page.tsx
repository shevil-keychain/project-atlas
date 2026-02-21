import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function LabelDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-xxl font-bold text-foreground">Label</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Form field labels with required, optional, disabled, and error
            states.
          </p>
        </div>

        <Section title="Default">
          <div className="space-y-3">
            <Label>Email address</Label>
            <Label>Full name</Label>
          </div>
        </Section>

        <Section title="Required">
          <div className="space-y-3">
            <Label required>Email address</Label>
            <Label required>Password</Label>
          </div>
        </Section>

        <Section title="Optional">
          <div className="space-y-3">
            <Label optional>Phone number</Label>
            <Label optional>Company name</Label>
          </div>
        </Section>

        <Section title="Disabled">
          <div className="space-y-3">
            <Label disabled>Locked field</Label>
            <Label disabled>Read-only field</Label>
          </div>
        </Section>

        <Section title="Error">
          <div className="space-y-3">
            <Label error>Email address</Label>
            <Label error>Password</Label>
          </div>
        </Section>

        <Section title="Combinations">
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <Label required disabled>
                Required + Disabled
              </Label>
              <span className="text-small text-stone-700 font-medium">
                Disabled color takes precedence, asterisk still visible
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Label error required>
                Error + Required
              </Label>
              <span className="text-small text-stone-700 font-medium">
                Error color with red asterisk
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Label optional disabled>
                Optional + Disabled
              </Label>
              <span className="text-small text-stone-700 font-medium">
                Disabled color with optional suffix
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Label error optional>
                Error + Optional
              </Label>
              <span className="text-small text-stone-700 font-medium">
                Error color with optional suffix
              </span>
            </div>
          </div>
        </Section>

        <Section title="With form elements">
          <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="demo-email" required>
                Email address
              </Label>
              <div className="h-10 rounded-md border border-stone-400 bg-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="demo-phone" optional>
                Phone number
              </Label>
              <div className="h-10 rounded-md border border-stone-400 bg-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="demo-disabled" disabled>
                Disabled field
              </Label>
              <div className="h-10 rounded-md border border-stone-400 bg-stone-100" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="demo-error" error required>
                Email address
              </Label>
              <div className="h-10 rounded-md border border-error-500 bg-white" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
