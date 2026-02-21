"use client"

import * as React from "react"
import { AlertToast } from "@/components/ui/alert-toast"
import { ToastContainer } from "@/components/ui/toast-container"
import { toast } from "@/hooks/use-toast"
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

export default function AlertDemoPage() {
  return (
    <div className="min-h-screen bg-background p-40">
      <div className="mx-auto max-w-2xl space-y-48">
        <div>
          <BackButton />
          <h1 className="text-24 font-bold text-foreground">Alert / Toast</h1>
          <p className="mt-4 text-14 text-stone-700 font-medium">
            Dark notification bars with animations and imperative toast API.
          </p>
        </div>

        <Section title="Static Alerts">
          <div className="space-y-12">
            <AlertToast title="Changes saved" onClose={() => {}} />

            <AlertToast
              title="File uploaded"
              description="document.pdf was uploaded successfully"
              onClose={() => {}}
            />

            <AlertToast
              title="Message sent"
              description="Your message has been delivered"
              actionLabel="Undo"
              onAction={() => console.log("undo")}
              onClose={() => {}}
            />

            <AlertToast
              title="Item deleted"
              actionLabel="Undo"
              onAction={() => console.log("undo")}
              onClose={() => {}}
            />
          </div>
        </Section>

        <Section title="Toast Demo">
          <div className="flex flex-wrap gap-12">
            <button
              type="button"
              onClick={() => toast({ title: "Changes saved" })}
              className="rounded-md border border-border bg-white px-16 py-8 text-14 font-semibold text-foreground transition-colors hover:bg-stone-100"
            >
              Show Basic Toast
            </button>

            <button
              type="button"
              onClick={() =>
                toast({
                  title: "File uploaded",
                  description: "document.pdf was uploaded successfully",
                })
              }
              className="rounded-md border border-border bg-white px-16 py-8 text-14 font-semibold text-foreground transition-colors hover:bg-stone-100"
            >
              Show Toast with Description
            </button>

            <button
              type="button"
              onClick={() =>
                toast({
                  title: "Message sent",
                  actionLabel: "Undo",
                  onAction: () => console.log("undo"),
                })
              }
              className="rounded-md border border-border bg-white px-16 py-8 text-14 font-semibold text-foreground transition-colors hover:bg-stone-100"
            >
              Show Toast with Action
            </button>

            <button
              type="button"
              onClick={() =>
                toast({ title: "Processing...", duration: 0 })
              }
              className="rounded-md border border-border bg-white px-16 py-8 text-14 font-semibold text-foreground transition-colors hover:bg-stone-100"
            >
              Show Persistent Toast
            </button>
          </div>
        </Section>
      </div>

      <ToastContainer position="top-center" />
    </div>
  )
}
