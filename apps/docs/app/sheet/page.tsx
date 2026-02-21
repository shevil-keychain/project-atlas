"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
} from "@/components/ui/sheet"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-16">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function SheetDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Sheet</h1>
          <p className="mt-4 text-14 text-stone-700">
            Right-side panel drawer with slide animation, scrollable content,
            and preset widths.
          </p>
        </div>

        <Section title="Default (Medium)">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Default</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>Accessibility issue finder</SheetHeader>
              <SheetBody>
                <p className="text-14 text-foreground">
                  Scan your conversations for accessibility issues across all
                  channels. Results are grouped by severity and include
                  actionable recommendations.
                </p>
                <div className="mt-24 space-y-16">
                  <div>
                    <p className="text-14 font-medium text-foreground">
                      Scan scope
                    </p>
                    <p className="text-14 text-foreground">All conversations</p>
                  </div>
                  <div>
                    <p className="text-14 font-medium text-foreground">
                      Last run
                    </p>
                    <p className="text-14 text-foreground">Feb 18, 2026</p>
                  </div>
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </SheetClose>
                <Button>Run</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>

        <Section title="Small Sheet">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Small</Button>
            </SheetTrigger>
            <SheetContent size="sm">
              <SheetHeader>Quick Settings</SheetHeader>
              <SheetBody>
                <div className="space-y-16">
                  <div>
                    <p className="text-14 font-medium text-foreground">
                      Notifications
                    </p>
                    <p className="text-14 text-foreground">
                      Email and in-app alerts enabled
                    </p>
                  </div>
                  <div>
                    <p className="text-14 font-medium text-foreground">
                      Language
                    </p>
                    <p className="text-14 text-foreground">English (US)</p>
                  </div>
                  <div>
                    <p className="text-14 font-medium text-foreground">
                      Timezone
                    </p>
                    <p className="text-14 text-foreground">
                      Pacific Time (PT)
                    </p>
                  </div>
                </div>
              </SheetBody>
              <SheetFooter>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>

        <Section title="Large Sheet">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Large</Button>
            </SheetTrigger>
            <SheetContent size="lg">
              <SheetHeader>Detailed Report</SheetHeader>
              <SheetBody>
                <div className="space-y-16 text-14 text-foreground">
                  <p>
                    This report covers agent performance metrics across all
                    queues for the current quarter. Key highlights include a 12%
                    improvement in first-response time and a 6% increase in
                    customer satisfaction scores.
                  </p>
                  <p>
                    Resolution rates have improved steadily over the past three
                    months, with the billing team leading at 94%. The technical
                    support queue saw the largest improvement, moving from 78% to
                    89%.
                  </p>
                  <p>
                    Escalation volume decreased by 18% compared to the previous
                    quarter. Most escalations now originate from complex
                    integration issues rather than routine product questions.
                  </p>
                  <p>
                    Agent utilization remains healthy at 82% across all shifts.
                    Weekend coverage has been the primary area flagged for
                    staffing review in the upcoming planning cycle.
                  </p>
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="secondary">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>

        <Section title="With Form Content">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Form</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>Edit Worker</SheetHeader>
              <SheetBody>
                <div className="space-y-24">
                  <div>
                    <p className="text-14 font-medium text-foreground mb-4">
                      Agent Name
                    </p>
                    <div className="h-40 rounded-md border border-stone-300 bg-stone-50 px-12 flex items-center text-14 text-stone-500">
                      Sarah Connor
                    </div>
                  </div>
                  <div>
                    <p className="text-14 font-medium text-foreground mb-4">
                      Conversation Date
                    </p>
                    <div className="h-40 rounded-md border border-stone-300 bg-stone-50 px-12 flex items-center text-14 text-stone-500">
                      February 20, 2026
                    </div>
                  </div>
                  <div>
                    <p className="text-14 font-medium text-foreground mb-4">
                      Queue Assignment
                    </p>
                    <div className="h-40 rounded-md border border-stone-300 bg-stone-50 px-12 flex items-center text-14 text-stone-500">
                      Billing Support
                    </div>
                  </div>
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </SheetClose>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>

        <Section title="Scrollable Content">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Scrollable</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>Activity Log</SheetHeader>
              <SheetBody>
                <div className="space-y-12 text-14 text-foreground">
                  {[
                    { time: "10:42 AM", agent: "Sarah Connor", action: "Picked up ticket #4021", detail: "Customer reported billing discrepancy on the March invoice. Assigned to billing queue.", tag: "Billing" },
                    { time: "10:38 AM", agent: "System", action: "Escalation created for Acme Corp", detail: "SLA breach imminent. Ticket #4018 escalated to Tier 2 support automatically.", tag: "Escalation" },
                    { time: "10:35 AM", agent: "Marcus Lee", action: "Customer rating submitted: 5 stars", detail: "Post-resolution survey completed. Customer praised quick turnaround and clarity of response.", tag: "CSAT" },
                    { time: "10:29 AM", agent: "Marcus Lee", action: "Conversation closed — ticket #4017", detail: "Issue resolved after two exchanges. Root cause was an incorrect promo code applied at checkout.", tag: "Resolved" },
                    { time: "10:24 AM", agent: "Julia Reyes", action: "Internal note added to ticket #3998", detail: "Flagged for QA review. Agent response on turn 3 deviated from approved script.", tag: "QA" },
                    { time: "10:18 AM", agent: "System", action: "New conversation routed to billing queue", detail: "Incoming chat from user @brightfield. Topic detected: refund request. Auto-routed via intent model.", tag: "Routing" },
                    { time: "10:15 AM", agent: "System", action: "SLA warning — ticket #4015", detail: "First response SLA at 85%. No agent assigned. Supervisor notified via Slack.", tag: "SLA" },
                    { time: "10:11 AM", agent: "Julia Reyes", action: "Agent went on break", detail: "Break started at 10:11 AM. Expected return: 10:26 AM. Queue coverage handed to David Kim.", tag: "Availability" },
                    { time: "10:08 AM", agent: "David Kim", action: 'Macro applied: "Refund confirmation"', detail: "Standard refund confirmation message sent to customer. Refund ID: RF-20482 issued.", tag: "Macro" },
                    { time: "10:02 AM", agent: "Customer", action: "Reopened ticket #3945", detail: 'Customer replied: "The issue is still happening after the fix." Ticket moved back to open state.', tag: "Reopened" },
                    { time: "9:58 AM", agent: "Sarah Connor", action: "Tag added: priority-high — ticket #4019", detail: "Customer identified as enterprise tier. Priority tag applied and account manager notified.", tag: "Tag" },
                    { time: "9:54 AM", agent: "David Kim", action: "Transferred to tech support", detail: "Ticket #4016 transferred after determining the issue was API-related, outside billing scope.", tag: "Transfer" },
                  ].map((entry, i) => (
                    <div key={i} className="rounded-lg border border-stone-200 p-12 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{entry.agent}</span>
                        <span className="text-12 text-stone-500">{entry.time}</span>
                      </div>
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-stone-600 leading-relaxed">{entry.detail}</p>
                      <span className="inline-block text-12 bg-stone-100 text-stone-700 rounded px-8 py-2">{entry.tag}</span>
                    </div>
                  ))}
                </div>
              </SheetBody>
              <SheetFooter>
                <Button variant="secondary">Export</Button>
                <SheetClose asChild>
                  <Button>Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>
      </div>
    </div>
  )
}
