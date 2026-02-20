"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/modal"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function ModalPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Modal</h1>
          <p className="mt-1 text-sm text-stone-700">
            Dialog overlays with preset sizes, scrollable content, and destructive confirmation variant.
          </p>
        </div>

        <Section title="Default (Medium)">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Default</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Create project</DialogHeader>
              <DialogBody>
                <p className="text-sm">
                  Start a new project to organize your work. You can invite collaborators,
                  set deadlines, and track progress all in one place. Projects help you stay
                  focused and keep everything related to a single initiative together.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Small Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Small</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>Rename file</DialogHeader>
              <DialogBody>
                <input
                  type="text"
                  placeholder="Enter new file name"
                  className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Large Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Large</Button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>Project settings</DialogHeader>
              <DialogBody>
                <div className="space-y-4 text-sm">
                  <p>
                    Configure your project settings to match your team&apos;s workflow.
                    These settings apply to all members of the project and affect how
                    notifications, permissions, and integrations behave.
                  </p>
                  <p>
                    You can adjust visibility controls to determine who can see and
                    interact with the project. Public projects are visible to everyone
                    in the organization, while private projects are only accessible to
                    invited members.
                  </p>
                  <p>
                    Integration settings let you connect third-party tools like Slack,
                    GitHub, and Jira. Once connected, activity from those tools will
                    appear in your project timeline automatically.
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Destructive (Delete Confirmation)">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Delete</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>Delete Accessibility issues finder</DialogHeader>
              <DialogBody>
                <p className="text-sm">
                  Are you sure you want to delete this worker? This action cannot be undone.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Scrollable Content">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Scrollable</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Terms &amp; Conditions</DialogHeader>
              <DialogBody>
                <div className="space-y-4 text-sm">
                  <p>
                    By accessing and using this service, you agree to be bound by these
                    terms and conditions. Please read them carefully before proceeding.
                    Your continued use of the platform constitutes acceptance of all terms
                    outlined herein.
                  </p>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any aspect of
                    the service at any time without prior notice. While we strive to maintain
                    uptime and reliability, we do not guarantee uninterrupted access to the
                    platform.
                  </p>
                  <p>
                    All content uploaded to the platform remains the intellectual property
                    of the original creator. By uploading content, you grant us a
                    non-exclusive license to display, distribute, and process that content
                    as necessary to provide the service.
                  </p>
                  <p>
                    User accounts are personal and non-transferable. You are responsible
                    for maintaining the confidentiality of your login credentials and for
                    all activities that occur under your account. Notify us immediately of
                    any unauthorized use.
                  </p>
                  <p>
                    We collect and process personal data in accordance with our Privacy
                    Policy. By using the service, you consent to the collection and use of
                    your information as described in that policy. We implement industry-standard
                    security measures to protect your data.
                  </p>
                  <p>
                    Prohibited activities include but are not limited to: reverse engineering
                    the platform, attempting to gain unauthorized access, distributing
                    malware, engaging in fraudulent activity, or using the service to
                    harass or harm others.
                  </p>
                  <p>
                    Subscription fees are billed in advance on a monthly or annual basis.
                    Refunds are available within the first 14 days of a new subscription.
                    Cancellations take effect at the end of the current billing period.
                  </p>
                  <p>
                    This agreement shall be governed by and construed in accordance with
                    the laws of the jurisdiction in which the company is incorporated,
                    without regard to its conflict of law provisions.
                  </p>
                  <p>
                    In the event of a dispute, both parties agree to first attempt
                    resolution through informal negotiation. If no resolution is reached
                    within 30 days, the dispute shall be submitted to binding arbitration.
                  </p>
                  <p>
                    We may update these terms from time to time. Material changes will be
                    communicated via email or through the platform. Continued use after
                    changes are posted constitutes acceptance of the revised terms.
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Decline</Button>
                </DialogClose>
                <Button>Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Extra Large">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Extra Large</Button>
            </DialogTrigger>
            <DialogContent size="xl">
              <DialogHeader>Analytics Dashboard</DialogHeader>
              <DialogBody>
                <div className="space-y-4 text-sm">
                  <p>
                    Your analytics dashboard provides a comprehensive overview of key
                    metrics, trends, and performance indicators across all active projects.
                    Use the filters above to narrow data by date range, team, or project.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-xs text-stone-500">Total Views</p>
                      <p className="text-2xl font-bold text-foreground">24,521</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-xs text-stone-500">Conversion Rate</p>
                      <p className="text-2xl font-bold text-foreground">3.2%</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-xs text-stone-500">Active Users</p>
                      <p className="text-2xl font-bold text-foreground">1,847</p>
                    </div>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>
      </div>
    </div>
  )
}
