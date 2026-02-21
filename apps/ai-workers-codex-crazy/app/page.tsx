"use client"

import { type MouseEvent, useState } from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Input } from "@level/ui/components/ui/input"
import { cn } from "@level/ui/lib/utils"
import {
  ArrowUp,
  Conversation,
  CpuChip02,
  Folder,
  LayoutLeft,
  LayersThree02,
  Microphone01,
  Plus,
  Sliders04,
  Terminal,
  Zap,
} from "@level/ui/components/icons"

const quickActions = [
  {
    label: "New chat",
    icon: <Plus size={16} className="text-icon-secondary" />,
  },
  {
    label: "Automations",
    icon: <Zap size={16} className="text-icon-secondary" />,
  },
  {
    label: "AI workers",
    icon: <CpuChip02 size={16} className="text-icon-secondary" />,
  },
  {
    label: "Skills",
    icon: <Terminal size={16} className="text-icon-secondary" />,
  },
]

const threads = [
  "Automations thread kickoff",
  "Create AI workers codex prototype",
  "Fix non-boolean sorted prop",
  "Update inactive tab label color",
  "Start realtime preview",
  "Create a skill that can scrape docs",
  "Plan a research for onboarding",
  "List what exists in skills and rules",
]

const suggestions = [
  "Build a classic Snake game in this repo.",
  "Create a one-page summary PDF for this app.",
  "Create a plan to ship worker orchestration.",
]

const GRID_SIZE = 24

function ThreadRow({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-8 rounded-lg px-8 py-6 hover:bg-interactive-secondary">
      <span className="truncate text-14 text-text-primary">{title}</span>
      <span className="text-12 text-text-tertiary">1d</span>
    </div>
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
        <TopBar avatarInitial="AI" avatarColor="var(--color-primary-brand-500)" />

        <main className="flex-1 overflow-auto">
          <div className="flex h-full min-h-0 overflow-hidden bg-surface-page">
            <aside
              className={cn(
                "flex h-full min-h-0 shrink-0 flex-col border-r border-border-default bg-surface-subtle p-12",
                isRailCollapsed ? "w-56" : "w-256",
              )}
            >
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={isRailCollapsed ? "Expand panel" : "Collapse panel"}
                  onClick={() => setIsRailCollapsed((prev) => !prev)}
                  iconLeft={<LayoutLeft size={16} className="text-icon-secondary" />}
                />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {quickActions.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size={isRailCollapsed ? "icon-sm" : "sm"}
                    className={cn(!isRailCollapsed && "justify-start")}
                    iconLeft={item.icon}
                    aria-label={item.label}
                  >
                    {!isRailCollapsed && item.label}
                  </Button>
                ))}
              </div>

              {!isRailCollapsed && (
                <div className="mt-16 min-h-0 flex-1 overflow-auto">
                  <p className="mb-8 px-8 text-12 text-text-tertiary">Recent chats</p>
                  <div className="space-y-2">
                    {threads.map((thread) => (
                      <ThreadRow key={thread} title={thread} />
                    ))}
                  </div>
                </div>
              )}

              <div className={cn("mt-12", isRailCollapsed && "mt-auto")}>
                <div className="flex flex-col gap-4">
                  <Button
                    variant="ghost"
                    size={isRailCollapsed ? "icon-sm" : "sm"}
                    className={cn(!isRailCollapsed && "w-full justify-start")}
                    iconLeft={<LayersThree02 size={16} className="text-icon-secondary" />}
                    aria-label="Dictionary"
                  >
                    {!isRailCollapsed && "Dictionary"}
                  </Button>

                  <Button
                    variant="ghost"
                    size={isRailCollapsed ? "icon-sm" : "sm"}
                    className={cn(!isRailCollapsed && "w-full justify-start")}
                    iconLeft={<Sliders04 size={16} className="text-icon-secondary" />}
                    aria-label="Preferences"
                  >
                    {!isRailCollapsed && "Preferences"}
                  </Button>
                </div>
              </div>
            </aside>

            <section
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface-page"
              onMouseMove={handleCanvasPointerMove}
              onMouseEnter={() => setIsCursorInCanvas(true)}
              onMouseLeave={() => setIsCursorInCanvas(false)}
            >
              <div className="pointer-events-none absolute inset-0 z-0">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      `linear-gradient(to right, var(--color-interactive-secondary) 1px, transparent 1px),
                       linear-gradient(to bottom, var(--color-interactive-secondary) 1px, transparent 1px)`,
                    backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                  }}
                />

                <div
                  className={cn(
                    "absolute h-240 w-240 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-brand-subtle blur-3xl transition-opacity duration-300",
                    isCursorInCanvas ? "opacity-100" : "opacity-0"
                  )}
                  style={{ left: cursorPosition.x, top: cursorPosition.y }}
                />
              </div>

              <div className="relative z-10 flex flex-1 items-center justify-center px-24">
                <div className="flex flex-col items-center gap-12 text-center">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border border-border-default bg-surface-card">
                    <CpuChip02 size={22} className="text-icon-secondary" />
                  </div>
                  <h1 className="text-30 font-semibold text-text-primary">Let&apos;s build</h1>
                  <p className="text-14 text-text-secondary">AI workers codex crazy</p>
                </div>
              </div>

              <div className="relative z-10 px-24 pb-24">
                <div className="mx-auto w-full max-w-720">
                  <p className="mb-8 text-right text-12 text-text-tertiary">Explore more</p>
                  <div className="grid grid-cols-3 gap-8">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="rounded-xl border border-border-default bg-surface-card p-16 text-14 text-text-primary"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mx-auto mt-12 w-full max-w-720 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md">
                  <Input
                    placeholder="Ask Codex anything, @ to add files, / for commands"
                    className="h-40 border-none bg-transparent px-0 text-14 text-text-primary placeholder:text-text-tertiary focus:border-none focus:shadow-none hover:border-none"
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

                <div className="mt-8 flex items-center justify-between text-12 text-text-tertiary">
                  <span className="inline-flex items-center gap-4">
                    <Conversation size={14} className="text-icon-tertiary" /> Local
                  </span>
                  <span className="inline-flex items-center gap-4">
                    <Folder size={14} className="text-icon-tertiary" /> main
                  </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
