"use client"

import { useState } from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Input } from "@level/ui/components/ui/input"
import { cn } from "@level/ui/lib/utils"
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Conversation,
  CpuChip02,
  Folder,
  Microphone01,
  Plus,
  SearchMd,
  Settings01,
  Terminal,
  Zap,
} from "@level/ui/components/icons"

const quickActions = [
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

const workspaceThreads = [
  "Create AI workers codex prototype",
  "Fix non-boolean sorted prop",
  "Update inactive tab label color",
  "Start realtime preview",
]

const personalThreads = [
  "Create a skill that can scrape docs",
  "Plan a research for onboarding",
  "List what exists in skills and rules",
]

const suggestions = [
  "Build a classic Snake game in this repo.",
  "Create a one-page summary PDF for this app.",
  "Create a plan to ship worker orchestration.",
]

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

  return (
    <div className="flex h-screen bg-surface-page">
      <MainNav activeItem="AI workers" />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar avatarInitial="AI" avatarColor="var(--color-primary-brand-500)" />

        <main className="flex-1 overflow-auto p-24">
          <div className="flex h-full min-h-0 overflow-hidden rounded-xl border border-border-default bg-surface-page">
            <aside
              className={cn(
                "flex h-full min-h-0 shrink-0 flex-col border-r border-border-default bg-surface-subtle p-12",
                isRailCollapsed ? "w-56" : "w-256",
              )}
            >
              <div className="flex items-center justify-between gap-8">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={isRailCollapsed ? "Expand panel" : "Collapse panel"}
                  onClick={() => setIsRailCollapsed((prev) => !prev)}
                  iconLeft={
                    isRailCollapsed ? (
                      <ChevronRight size={16} className="text-icon-secondary" />
                    ) : (
                      <ChevronLeft size={16} className="text-icon-secondary" />
                    )
                  }
                />

                {!isRailCollapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    iconLeft={<Plus size={16} className="text-icon-secondary" />}
                  >
                    New thread
                  </Button>
                )}
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
                  <div className="space-y-16">
                    <div>
                      <p className="px-8 text-12 text-text-secondary">Threads</p>
                      <div className="mt-8 space-y-2">
                        <div className="px-8 text-12 text-text-tertiary">level-design-system</div>
                        {workspaceThreads.map((thread) => (
                          <ThreadRow key={thread} title={thread} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="px-8 text-12 text-text-tertiary">Personal OS</div>
                      <div className="mt-8 space-y-2">
                        {personalThreads.map((thread) => (
                          <ThreadRow key={thread} title={thread} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={cn("mt-12", isRailCollapsed && "mt-auto")}>
                <Button
                  variant="ghost"
                  size={isRailCollapsed ? "icon-sm" : "sm"}
                  className={cn(!isRailCollapsed && "w-full justify-start")}
                  iconLeft={<Settings01 size={16} className="text-icon-secondary" />}
                  aria-label="Settings"
                >
                  {!isRailCollapsed && "Settings"}
                </Button>
              </div>
            </aside>

            <section className="flex min-h-0 flex-1 flex-col bg-surface-page">
              <div className="flex flex-1 items-center justify-center px-24">
                <div className="flex flex-col items-center gap-12 text-center">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border border-border-default bg-surface-card">
                    <CpuChip02 size={22} className="text-icon-secondary" />
                  </div>
                  <h1 className="text-30 font-semibold text-text-primary">Let&apos;s build</h1>
                  <p className="text-14 text-text-secondary">AI workers codex crazy</p>
                </div>
              </div>

              <div className="px-24 pb-24">
                <p className="mb-8 text-right text-12 text-text-tertiary">Explore more</p>
                <div className="grid gap-8 md:grid-cols-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="rounded-xl border border-border-default bg-surface-card p-16 text-14 text-text-primary"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-xl border border-border-default bg-surface-card px-12 py-8">
                  <Input
                    placeholder="Ask Codex anything, @ to add files, / for commands"
                    className="h-40 border-none bg-transparent px-0 text-14 text-text-primary placeholder:text-text-tertiary focus:border-none focus:shadow-none hover:border-none"
                  />

                  <div className="mt-8 flex items-center justify-between gap-12 border-t border-border-subtle pt-8">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Add context"
                        iconLeft={<Plus size={16} className="text-icon-secondary" />}
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        iconLeft={<Terminal size={16} className="text-icon-secondary" />}
                      >
                        GPT-5.3-Codex
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        iconLeft={<SearchMd size={16} className="text-icon-secondary" />}
                      >
                        Low
                      </Button>
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
