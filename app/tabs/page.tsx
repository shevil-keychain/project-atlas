"use client"

import * as React from "react"
import { BarChart3, LayoutDashboard, Settings, Users } from "lucide-react"
import {
  BrandTabsList,
  BrandTabsTrigger,
  NeutralTabsList,
  NeutralTabsTrigger,
  Tabs,
  TabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "@/components/ui/tabs"
import { BackButton } from "@/components/ui/back-button"

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
    <section className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-stone-700">{description}</p>
      </div>
      <div className="space-y-3">{children}</div>
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
    <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-4 sm:flex sm:items-start sm:gap-6">
      <p className="w-32 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
        {label}
      </p>
      <div className="mt-3 w-full space-y-3 sm:mt-0">{children}</div>
    </div>
  )
}

function DemoPanel({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white px-4 py-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-stone-700">{description}</p>
    </div>
  )
}

function InlineBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-700">
      {children}
    </span>
  )
}

export default function TabsDemoPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Component Demo
          </p>
          <BackButton />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Tabs
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-700">
            Neutral, brand, underlined, and vertical tab styles with support for
            icons, badges, subtext, and disabled states.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Tab Styles
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">4</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Orientations
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">2</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-600">
                Trigger Features
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">3</p>
            </div>
          </div>
        </header>

        <Section
          title="Visual Styles"
          description="Core tab style variants with the same content structure for easier comparison."
        >
          <Row label="Neutral">
            <Tabs defaultValue="overview">
              <NeutralTabsList>
                <NeutralTabsTrigger value="overview">Overview</NeutralTabsTrigger>
                <NeutralTabsTrigger value="analytics">Analytics</NeutralTabsTrigger>
                <NeutralTabsTrigger value="reports">Reports</NeutralTabsTrigger>
              </NeutralTabsList>
              <TabsContent value="overview">
                <DemoPanel
                  title="Overview"
                  description="Summary metrics and key project highlights."
                />
              </TabsContent>
              <TabsContent value="analytics">
                <DemoPanel
                  title="Analytics"
                  description="Traffic trends, funnel conversion, and cohort performance."
                />
              </TabsContent>
              <TabsContent value="reports">
                <DemoPanel
                  title="Reports"
                  description="Scheduled exports and saved dashboard snapshots."
                />
              </TabsContent>
            </Tabs>
          </Row>

          <Row label="Brand">
            <Tabs defaultValue="dashboard">
              <BrandTabsList>
                <BrandTabsTrigger value="dashboard">Dashboard</BrandTabsTrigger>
                <BrandTabsTrigger value="settings">Settings</BrandTabsTrigger>
                <BrandTabsTrigger value="billing">Billing</BrandTabsTrigger>
              </BrandTabsList>
              <TabsContent value="dashboard">
                <DemoPanel
                  title="Dashboard"
                  description="Primary workspace with high-priority actions."
                />
              </TabsContent>
              <TabsContent value="settings">
                <DemoPanel
                  title="Settings"
                  description="Configuration controls for team and workspace behavior."
                />
              </TabsContent>
              <TabsContent value="billing">
                <DemoPanel
                  title="Billing"
                  description="Invoices, plans, payment methods, and usage limits."
                />
              </TabsContent>
            </Tabs>
          </Row>

          <Row label="Underlined">
            <Tabs defaultValue="all">
              <UnderlinedTabsList>
                <UnderlinedTabsTrigger value="all">All</UnderlinedTabsTrigger>
                <UnderlinedTabsTrigger value="active">Active</UnderlinedTabsTrigger>
                <UnderlinedTabsTrigger value="archived">Archived</UnderlinedTabsTrigger>
              </UnderlinedTabsList>
              <TabsContent value="all">
                <DemoPanel
                  title="All"
                  description="All records across active and archived categories."
                />
              </TabsContent>
              <TabsContent value="active">
                <DemoPanel
                  title="Active"
                  description="Currently open items requiring ongoing attention."
                />
              </TabsContent>
              <TabsContent value="archived">
                <DemoPanel
                  title="Archived"
                  description="Historical items retained for audit and reference."
                />
              </TabsContent>
            </Tabs>
          </Row>
        </Section>

        <Section
          title="Orientation"
          description="Horizontal and vertical layouts for top-level and side navigation patterns."
        >
          <Row label="Horizontal">
            <Tabs defaultValue="dashboard">
              <NeutralTabsList>
                <NeutralTabsTrigger value="dashboard" icon={<LayoutDashboard />}>
                  Dashboard
                </NeutralTabsTrigger>
                <NeutralTabsTrigger value="users" icon={<Users />}>
                  Users
                </NeutralTabsTrigger>
                <NeutralTabsTrigger value="analytics" icon={<BarChart3 />}>
                  Analytics
                </NeutralTabsTrigger>
                <NeutralTabsTrigger value="settings" icon={<Settings />}>
                  Settings
                </NeutralTabsTrigger>
              </NeutralTabsList>
              <TabsContent value="dashboard">
                <DemoPanel
                  title="Dashboard"
                  description="Snapshot of team activity, alerts, and progress."
                />
              </TabsContent>
              <TabsContent value="users">
                <DemoPanel
                  title="Users"
                  description="User directory, permissions, and role assignments."
                />
              </TabsContent>
              <TabsContent value="analytics">
                <DemoPanel
                  title="Analytics"
                  description="Campaign health and conversion performance tracking."
                />
              </TabsContent>
              <TabsContent value="settings">
                <DemoPanel
                  title="Settings"
                  description="Workspace preferences and default behavior settings."
                />
              </TabsContent>
            </Tabs>
          </Row>

          <Row label="Vertical">
            <Tabs defaultValue="general" orientation="vertical">
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <VerticalTabsList className="w-full shrink-0 rounded-lg border border-stone-200 bg-white p-2 md:w-56">
                  <VerticalTabsTrigger value="general">General</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="security">Security</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="notifications">
                    Notifications
                  </VerticalTabsTrigger>
                  <VerticalTabsTrigger value="integrations">
                    Integrations
                  </VerticalTabsTrigger>
                </VerticalTabsList>
                <div className="flex-1">
                  <TabsContent value="general" className="mt-0">
                    <DemoPanel
                      title="General"
                      description="Workspace name, locale, and default project settings."
                    />
                  </TabsContent>
                  <TabsContent value="security" className="mt-0">
                    <DemoPanel
                      title="Security"
                      description="Authentication policies and access management controls."
                    />
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-0">
                    <DemoPanel
                      title="Notifications"
                      description="Alert preferences for email, in-app, and digest messages."
                    />
                  </TabsContent>
                  <TabsContent value="integrations" className="mt-0">
                    <DemoPanel
                      title="Integrations"
                      description="Connected tools and synchronization status settings."
                    />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </Row>
        </Section>

        <Section
          title="Enhanced Triggers"
          description="Examples of badges and subtext in triggers, plus disabled state behavior."
        >
          <Row label="Badges">
            <Tabs defaultValue="inbox">
              <UnderlinedTabsList>
                <UnderlinedTabsTrigger
                  value="inbox"
                  badge={<InlineBadge>12</InlineBadge>}
                >
                  Inbox
                </UnderlinedTabsTrigger>
                <UnderlinedTabsTrigger
                  value="sent"
                  badge={<InlineBadge>3</InlineBadge>}
                >
                  Sent
                </UnderlinedTabsTrigger>
                <UnderlinedTabsTrigger value="drafts">Drafts</UnderlinedTabsTrigger>
              </UnderlinedTabsList>
              <TabsContent value="inbox">
                <DemoPanel
                  title="Inbox"
                  description="New and unread messages requiring response."
                />
              </TabsContent>
              <TabsContent value="sent">
                <DemoPanel
                  title="Sent"
                  description="Delivered messages and outbound communication history."
                />
              </TabsContent>
              <TabsContent value="drafts">
                <DemoPanel
                  title="Drafts"
                  description="Saved drafts not yet scheduled or sent."
                />
              </TabsContent>
            </Tabs>
          </Row>

          <Row label="Subtext">
            <Tabs defaultValue="plan-pro" orientation="vertical">
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <VerticalTabsList className="w-full shrink-0 rounded-lg border border-stone-200 bg-white p-2 md:w-60">
                  <VerticalTabsTrigger value="plan-free" subtext="$0/month">
                    Free
                  </VerticalTabsTrigger>
                  <VerticalTabsTrigger value="plan-pro" subtext="$19/month">
                    Pro
                  </VerticalTabsTrigger>
                  <VerticalTabsTrigger
                    value="plan-enterprise"
                    subtext="Custom pricing"
                  >
                    Enterprise
                  </VerticalTabsTrigger>
                </VerticalTabsList>
                <div className="flex-1">
                  <TabsContent value="plan-free" className="mt-0">
                    <DemoPanel
                      title="Free"
                      description="Basic feature set for individual use and small trials."
                    />
                  </TabsContent>
                  <TabsContent value="plan-pro" className="mt-0">
                    <DemoPanel
                      title="Pro"
                      description="Advanced capabilities and higher usage limits."
                    />
                  </TabsContent>
                  <TabsContent value="plan-enterprise" className="mt-0">
                    <DemoPanel
                      title="Enterprise"
                      description="Custom plans with governance and support controls."
                    />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </Row>

          <Row label="Disabled">
            <Tabs defaultValue="active">
              <NeutralTabsList>
                <NeutralTabsTrigger value="active">Active</NeutralTabsTrigger>
                <NeutralTabsTrigger value="disabled-tab" disabled>
                  Disabled
                </NeutralTabsTrigger>
                <NeutralTabsTrigger value="another">Another</NeutralTabsTrigger>
              </NeutralTabsList>
              <TabsContent value="active">
                <DemoPanel
                  title="Active"
                  description="Primary tab remains interactive while one trigger is disabled."
                />
              </TabsContent>
              <TabsContent value="another">
                <DemoPanel
                  title="Another"
                  description="Secondary enabled tab still switches as expected."
                />
              </TabsContent>
            </Tabs>
          </Row>
        </Section>
      </div>
    </div>
  )
}
