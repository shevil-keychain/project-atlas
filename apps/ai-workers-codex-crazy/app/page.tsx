"use client"

import { type MouseEvent, type ReactNode, useState } from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Textarea } from "@level/ui/components/ui/textarea"
import { cn } from "@level/ui/lib/utils"
import {
  ArrowUp,
  Bookmark,
  Edit05,
  LayoutLeft,
  LayersThree02,
  Microphone01,
  Plus,
  Sliders04,
  Star04,
  Zap,
} from "@level/ui/components/icons"

const quickActions = [
  {
    label: "New chat",
    icon: <Edit05 size={16} className="text-icon-secondary" />,
  },
  {
    label: "AI workers",
    icon: <Star04 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Automations",
    icon: <Zap size={16} className="text-icon-secondary" />,
  },
  {
    label: "Saved items",
    icon: <Bookmark size={16} className="text-icon-secondary" />,
  },
]

const threads = [
  "Analyze refund intent drivers for last 30 days",
  "Coach plan for reducing first response time",
  "QA audit of escalations with policy violations",
  "Executive summary for weekly support leadership review",
  "Find recurring billing complaint patterns in chat transcripts",
  "Coach script improvements for de-escalation outcomes",
  "QA analyst report on CSAT drops by queue",
  "Executive summary of top customer pain points",
]

const workerAlternativeRows = [
  ["Coach", "QA analyst", "VoC analyst", "Team analyst"],
  ["Resolution insights worker", "Sentiment insights worker", "iCSAT insights worker"],
  ["Executive summary worker", "Product gaps analyst"],
]

function ThreadRow({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-8 rounded-lg px-12 py-6 hover:bg-interactive-secondary">
      <span className="truncate text-14 text-text-primary">{title}</span>
      <span className="text-12 text-text-tertiary">1d</span>
    </div>
  )
}

function RailActionButton({
  label,
  icon,
  isCollapsed,
}: {
  label: string
  icon: ReactNode
  isCollapsed: boolean
}) {
  return (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon-sm" : "sm"}
      className={cn(isCollapsed ? "" : "w-full justify-start")}
      iconLeft={icon}
      aria-label={label}
    >
      {!isCollapsed ? label : null}
    </Button>
  )
}

export default function Page() {
  const [isRailCollapsed, setIsRailCollapsed] = useState(false)
  const [isCursorInCanvas, setIsCursorInCanvas] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleCanvasPointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <div className="flex h-screen bg-surface-page">
      <MainNav activeItem="AI workers" />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar avatarInitial="JD" avatarColor="var(--color-secondary-purple-600)" />

        <main className="flex-1 overflow-auto">
          <div className="flex h-full min-h-0 overflow-hidden bg-surface-page">
              <aside
                className={cn(
                  "flex h-full min-h-0 shrink-0 flex-col bg-surface-subtle pt-12 pb-20 transition-[width] duration-300 ease-in-out",
                  isRailCollapsed ? "w-56 px-12" : "w-288 px-8",
                )}
              >
              <div className="flex items-center justify-start">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(!isRailCollapsed && "ml-4")}
                  aria-label={isRailCollapsed ? "Expand panel" : "Collapse panel"}
                  onClick={() => setIsRailCollapsed((prev) => !prev)}
                  iconLeft={<LayoutLeft size={16} className="text-icon-secondary" />}
                />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {quickActions.map((item) => (
                  <RailActionButton
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    isCollapsed={isRailCollapsed}
                  />
                ))}
              </div>

              <div
                className={cn(
                  "mt-16 min-h-0 flex-1 overflow-hidden transition-opacity duration-200 ease-in-out",
                  isRailCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                <div className="h-full overflow-auto">
                  <p className="mb-8 px-8 text-12 text-text-tertiary">Recent chats</p>
                  <div className="mt-8 space-y-2">
                    {threads.map((thread) => (
                      <ThreadRow key={thread} title={thread} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex flex-col gap-4">
                  <RailActionButton
                    label="Dictionary"
                    icon={<LayersThree02 size={16} className="text-icon-secondary" />}
                    isCollapsed={isRailCollapsed}
                  />
                  <RailActionButton
                    label="Preferences"
                    icon={<Sliders04 size={16} className="text-icon-secondary" />}
                    isCollapsed={isRailCollapsed}
                  />
                </div>
              </div>
            </aside>

            <section
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-l border-border-subtle bg-surface-page"
              onMouseMove={handleCanvasPointerMove}
              onMouseEnter={() => setIsCursorInCanvas(true)}
              onMouseLeave={() => setIsCursorInCanvas(false)}
            >
              <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-surface-page via-surface-page to-surface-warning-subtle opacity-100" />

                <div
                  className={cn(
                    "absolute h-256 w-256 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-brand-subtle opacity-60 blur-3xl transition-opacity duration-300",
                    isCursorInCanvas ? "opacity-100" : "opacity-0"
                  )}
                  style={{ left: cursorPosition.x, top: cursorPosition.y }}
                />
              </div>

              <div className="relative z-10 flex flex-1 items-center justify-center px-24">
                <div className="flex w-full max-w-720 flex-col items-center gap-12 text-center">
                  <div className="flex h-48 w-48 items-center justify-center rounded-full border border-border-default bg-surface-card">
                    <img src="/ai-worker-avatar.svg" alt="AI worker avatar" className="h-36 w-36 rounded-full" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-18 text-text-tertiary">Start a new chat with</p>
                    <p className="text-24 font-semibold text-text-primary">Search analyst</p>
                  </div>

                  <p className="mt-40 mb-16 text-14 text-text-tertiary">Or switch to</p>

                  <div className="flex w-full flex-col items-center gap-8 text-left">
                    {workerAlternativeRows.map((row, rowIndex) => (
                      <div key={`worker-row-${rowIndex}`} className="flex flex-wrap items-center justify-center gap-8">
                        {row.map((worker) => (
                          <div
                            key={worker}
                            className="w-fit shrink-0 rounded-full border border-border-subtle bg-surface-card/60 py-10 pl-12 pr-16 backdrop-blur-md"
                          >
                            <div className="flex items-center gap-8">
                              <img
                                src="/ai-worker-avatar.svg"
                                alt={`${worker} avatar`}
                                className="h-20 w-20 rounded-full"
                              />
                              <div>
                                <p className="whitespace-nowrap text-14 font-semibold text-text-secondary">
                                  {worker}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className="mt-12">
                    Browse all workers
                  </Button>
                </div>
              </div>

              <div className="relative z-10 px-24 pb-40">
                <div className="mx-auto mt-12 w-full max-w-720 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md">
                  <Textarea
                    placeholder="Ask Codex anything, @ to add files, / for commands"
                    className="h-72 min-h-72 resize-none border-none bg-transparent px-0 py-8 text-14 text-text-primary placeholder:text-text-tertiary focus:border-none focus:shadow-none hover:border-none"
                  />

                  <div className="mt-8 flex items-center justify-between gap-12 pt-8">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Add context"
                        iconLeft={<Plus size={16} className="text-icon-secondary" />}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Voice input"
                        iconLeft={<Microphone01 size={16} className="text-icon-secondary" />}
                      />

                      <Button
                        variant="default"
                        size="icon-sm"
                        aria-label="Send message"
                        iconLeft={<ArrowUp size={16} className="text-icon-primary" />}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
