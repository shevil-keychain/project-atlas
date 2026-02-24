"use client"

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react"
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
  ["Search analyst", "Coach", "QA analyst", "VoC analyst", "Team analyst"],
  ["Resolution insights worker", "Sentiment insights worker", "iCSAT insights worker"],
  ["Executive summary worker", "Product gaps analyst"],
]

const workerIconByLabel: Record<string, string> = {
  "Search analyst": "/worker-icons/search-analyst.png",
  Coach: "/worker-icons/coach.png",
  "QA analyst": "/worker-icons/qa-analyst.png",
  "VoC analyst": "/worker-icons/voc-analyst.png",
  "Team analyst": "/worker-icons/team-analyst.png",
  "Resolution insights worker": "/worker-icons/resolution-insights.png",
  "Sentiment insights worker": "/worker-icons/sentiment-insights.png",
  "iCSAT insights worker": "/worker-icons/icsat-insights.png",
  "Executive summary worker": "/worker-icons/executive-summary.png",
  "Product gaps analyst": "/worker-icons/product-gaps.png",
}

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
  const workerTransitionDurationMs = 350
  const [isRailCollapsed, setIsRailCollapsed] = useState(false)
  const [isCursorInCanvas, setIsCursorInCanvas] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [activeWorker, setActiveWorker] = useState("Search analyst")
  const [isWorkerContentVisible, setIsWorkerContentVisible] = useState(true)
  const workerSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCanvasPointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  useEffect(() => {
    return () => {
      if (workerSwapTimerRef.current) {
        clearTimeout(workerSwapTimerRef.current)
      }
    }
  }, [])

  const handleWorkerSelect = (worker: string) => {
    if (worker === activeWorker) {
      return
    }

    if (workerSwapTimerRef.current) {
      clearTimeout(workerSwapTimerRef.current)
    }

    setIsWorkerContentVisible(false)
    workerSwapTimerRef.current = setTimeout(() => {
      setActiveWorker(worker)
      setIsWorkerContentVisible(true)
      workerSwapTimerRef.current = null
    }, workerTransitionDurationMs)
  }

  const getWorkerRevealClass = (visibleDelayClass: string) =>
    cn(
      "transition-all duration-300 ease-out",
      isWorkerContentVisible
        ? `opacity-100 translate-y-0 ${visibleDelayClass}`
        : "opacity-0 translate-y-8 delay-0"
    )

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
                <div className="absolute inset-0 bg-surface-page opacity-100" />

                <div
                  className={cn(
                    "absolute h-256 w-256 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-brand-subtle opacity-60 blur-3xl transition-opacity duration-300",
                    isCursorInCanvas ? "opacity-100" : "opacity-0"
                  )}
                  style={{ left: cursorPosition.x, top: cursorPosition.y }}
                />
              </div>

              <div
                className={cn(
                  "relative z-10 flex flex-1 items-center justify-center px-24",
                  !isWorkerContentVisible && "pointer-events-none"
                )}
              >
                <div className="flex w-full max-w-720 flex-col items-center gap-12 text-center">
                  <img
                    src={workerIconByLabel[activeWorker] ?? "/ai-worker-avatar.svg"}
                    alt={`${activeWorker} icon`}
                    className={cn("h-48 w-48 object-contain", getWorkerRevealClass("delay-0"))}
                  />
                  <div className={cn("flex flex-col items-center gap-4", getWorkerRevealClass("delay-100"))}>
                    <p className="text-24 font-bold text-text-tertiary">Start a new chat with</p>
                    <p className="text-24 font-bold text-text-primary">{activeWorker}</p>
                  </div>

                  <p className={cn("mt-40 mb-16 text-14 font-medium text-text-tertiary", getWorkerRevealClass("delay-200"))}>Or switch to</p>

                  <div className={cn("flex w-full flex-col items-center gap-y-8 text-left", getWorkerRevealClass("delay-300"))}>
                    {workerAlternativeRows.map((row, rowIndex) => (
                      <div key={`worker-row-${rowIndex}`} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8">
                        {row.map((worker) => (
                          <Button
                            key={worker}
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleWorkerSelect(worker)}
                            className={cn(
                              "h-auto shrink-0 rounded-full border py-8 pl-10 pr-12 backdrop-blur-md",
                              worker === activeWorker
                                ? "border-focus-ring bg-surface-brand-subtle hover:bg-surface-brand-subtle"
                                : "border-border-subtle bg-surface-card/60 hover:bg-surface-card/60",
                            )}
                          >
                            <span className="flex items-center gap-8">
                              <img
                                src={workerIconByLabel[worker] ?? "/ai-worker-avatar.svg"}
                                alt={`${worker} icon`}
                                className="h-16 w-16 object-contain"
                              />
                              <span className="whitespace-nowrap text-12 font-medium text-text-primary">
                                {worker}
                              </span>
                            </span>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className={cn("mt-12", getWorkerRevealClass("delay-500"))}>
                    Browse all workers
                  </Button>
                </div>
              </div>

              <div className="relative z-10 px-24 pb-40">
                <div className="mx-auto mt-12 w-full max-w-720 rounded-xl border border-border-default bg-surface-card px-12 py-8 shadow-md">
                  <Textarea
                    placeholder={`Ask ${activeWorker} anything, @ to add files, / for commands`}
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
