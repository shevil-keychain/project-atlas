"use client"

import * as React from "react"
import { InlineAlert } from "@/components/ui/inline-alert"
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
      <h2 className="text-18 font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function InlineAlertDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">
            Inline Alert / Banner
          </h1>
          <p className="mt-4 text-14 text-stone-700 font-medium">
            Full-width contextual banners for info, success, warning, and error
            states.
          </p>
        </div>

        <Section title="All variants">
          <div className="space-y-12">
            <InlineAlert variant="info" title="Information" />
            <InlineAlert variant="success" title="Success" />
            <InlineAlert variant="warning" title="Warning" />
            <InlineAlert variant="error" title="Error" />
          </div>
        </Section>

        <Section title="Title only">
          <div className="space-y-12">
            <InlineAlert variant="info" title="Your session will expire in 5 minutes." />
            <InlineAlert variant="success" title="Your changes have been saved." />
          </div>
        </Section>

        <Section title="Title + description">
          <div className="space-y-12">
            <InlineAlert
              variant="info"
              title="New feature available"
              description="You can now export reports as CSV from the Reports page."
            />
            <InlineAlert
              variant="warning"
              title="Scheduled maintenance"
              description="The system will be unavailable on Sunday from 2:00 AM to 4:00 AM EST."
            />
            <InlineAlert
              variant="error"
              title="Connection failed"
              description="We couldn’t save your last update. Please check your network and try again."
            />
          </div>
        </Section>

        <Section title="With action button">
          <div className="space-y-12">
            <InlineAlert
              variant="info"
              title="Review our updated privacy policy"
              description="We’ve made changes to how we handle your data."
              action={{ label: "View policy", onClick: () => console.log("view policy") }}
            />
            <InlineAlert
              variant="success"
              title="Backup completed"
              action={{ label: "View backup", onClick: () => console.log("view backup") }}
            />
          </div>
        </Section>

        <Section title="Dismissible">
          <div className="space-y-12">
            <InlineAlert
              variant="info"
              title="Tip: Use keyboard shortcuts to work faster."
              onDismiss={() => console.log("dismissed")}
            />
            <InlineAlert
              variant="warning"
              title="You have unsaved changes"
              description="Navigate away and you’ll lose your edits."
              action={{ label: "Save now", onClick: () => console.log("save") }}
              onDismiss={() => console.log("dismissed")}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
