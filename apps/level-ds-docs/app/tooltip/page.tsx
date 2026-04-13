"use client"

import * as React from "react"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
} from "@/components/ui/tooltip"
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

const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(function TriggerButton({ children, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={
        className ??
        "inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-16 py-8 text-14 font-semibold text-foreground hover:bg-stone-100 transition-colors"
      }
      {...props}
    >
      {children}
    </button>
  )
})

export default function TooltipDemoPage() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background p-40">
        <div className="mx-auto max-w-2xl space-y-48">
          <div>
            <BackButton />
            <h1 className="text-24 font-bold text-foreground">Tooltip</h1>
            <p className="mt-4 text-14 text-stone-700 font-medium">
              Contextual information on hover with light and dark themes.
            </p>
          </div>

          {/* Dark Theme */}
          <Section title="Dark Theme (Default)">
            <div className="flex flex-wrap gap-16">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger asChild>
                    <TriggerButton>
                      Hover me ({side.charAt(0).toUpperCase() + side.slice(1)})
                    </TriggerButton>
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    Tooltip on {side}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Section>

          {/* Light Theme */}
          <Section title="Light Theme">
            <div className="flex flex-wrap gap-16">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger asChild>
                    <TriggerButton>
                      Hover me ({side.charAt(0).toUpperCase() + side.slice(1)})
                    </TriggerButton>
                  </TooltipTrigger>
                  <TooltipContent side={side} theme="light">
                    Tooltip on {side}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Section>

          {/* Simple Tooltips */}
          <Section title="Simple Tooltips">
            <div className="flex flex-wrap gap-16">
              <SimpleTooltip content="Basic dark tooltip">
                <TriggerButton>Basic (dark)</TriggerButton>
              </SimpleTooltip>

              <SimpleTooltip content="Basic light tooltip" theme="light">
                <TriggerButton>Basic (light)</TriggerButton>
              </SimpleTooltip>

              <SimpleTooltip
                title="Keyboard Shortcut"
                description="Press ⌘K to open the command palette"
              >
                <TriggerButton>Detailed (dark)</TriggerButton>
              </SimpleTooltip>

              <SimpleTooltip
                title="Keyboard Shortcut"
                description="Press ⌘K to open the command palette"
                theme="light"
              >
                <TriggerButton>Detailed (light)</TriggerButton>
              </SimpleTooltip>
            </div>
          </Section>

          {/* Alignment */}
          <Section title="Alignment">
            <div className="flex flex-wrap gap-16">
              {(["start", "center", "end"] as const).map((align) => (
                <Tooltip key={align}>
                  <TooltipTrigger asChild>
                    <TriggerButton>top-{align}</TriggerButton>
                  </TooltipTrigger>
                  <TooltipContent side="top" align={align}>
                    Aligned to {align}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Section>

          {/* Detailed Tooltips */}
          <Section title="Detailed Tooltips">
            <div className="flex flex-wrap gap-16">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TriggerButton>Dark Detailed</TriggerButton>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex flex-col gap-4">
                    <span className="text-14all font-semibold">
                      Analytics Dashboard
                    </span>
                    <span className="text-14all font-medium text-stone-400">
                      View real-time metrics and conversation insights
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TriggerButton>Light Detailed</TriggerButton>
                </TooltipTrigger>
                <TooltipContent side="bottom" theme="light">
                  <div className="flex flex-col gap-4">
                    <span className="text-14all font-semibold">
                      Analytics Dashboard
                    </span>
                    <span className="text-14all font-medium text-stone-700">
                      View real-time metrics and conversation insights
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </Section>
        </div>
      </div>
    </TooltipProvider>
  )
}
