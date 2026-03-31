"use client"

import * as React from "react"
import Image from "next/image"
import { Badge } from "@level/ui/components/ui/badge"
import { Button } from "@level/ui/components/ui/button"
import { Card } from "@level/ui/components/ui/card"
import {
  NeutralTabsList,
  NeutralTabsTrigger,
  Tabs,
  TabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "@level/ui/components/ui/tabs"
import { cn } from "@level/ui/lib/utils"
import { ChevronLeft, ChevronRight, CircleDashed, ExternalLink, Info, X } from "lucide-react"

// ─── State registry ──────────────────────────────────────────────────────────

type StateConfig = {
  id: string
  label: string
}

const stateConfigs: StateConfig[] = [
  { id: "evaluator-time-off", label: "Evaluator time-off" },
  { id: "percentage-sampling", label: "Percentage based sampling" },
  { id: "percentage-collective", label: "Percentage based & collective assignment" },
  { id: "fixed-collective", label: "Collective & fixed assignment" },
  { id: "goal-frequency-mismatch", label: "Goal–rule frequency mismatch" },
  { id: "shared-queue", label: "Shared queue assignment" },
  { id: "any-rule-scope", label: "Goal scope: Any rule" },
]

// ─── Sidebar goal data ───────────────────────────────────────────────────────

type SidebarGoal = {
  label: string
  sub: string
  upcoming: boolean
  percent: number
  status: "success" | "partial" | "failed" | "scheduled"
}

const sidebarGoals: SidebarGoal[] = [
  { label: "92%", sub: "Mar 2 - 8", upcoming: true, percent: 92, status: "scheduled" },
  { label: "88%", sub: "Feb 23 - Mar 1", upcoming: false, percent: 88, status: "partial" },
  { label: "100%", sub: "Feb 16 - 22", upcoming: false, percent: 100, status: "success" },
  { label: "94%", sub: "Feb 9 - 15", upcoming: false, percent: 94, status: "partial" },
  { label: "100%", sub: "Feb 2 - 8", upcoming: false, percent: 100, status: "success" },
  { label: "100%", sub: "Jan 26 - Feb 1", upcoming: false, percent: 100, status: "success" },
  { label: "100%", sub: "Jan 19 - 25", upcoming: false, percent: 100, status: "success" },
]

function getHistoryTone(status: string, percent: number) {
  if (status === "failed" || percent < 80) return "failed"
  if (percent < 100) return "partial"
  return "success"
}

function getIconPath(status: string, percent: number) {
  const tone = getHistoryTone(status, percent)
  if (tone === "success") return "/status-icons/check-circle.svg"
  if (tone === "partial") return "/status-icons/partial.svg"
  return "/status-icons/x-circle.svg"
}

// ─── Goal sidebar (exact copy from dev handoff) ──────────────────────────────

function GoalSidebar({ selectedIndex }: { selectedIndex: number }) {
  const upcomingGoals = sidebarGoals.filter((g) => g.upcoming)
  const pastGoals = sidebarGoals.filter((g) => !g.upcoming)

  return (
    <div className="flex w-204 shrink-0 flex-col gap-16 px-8 py-24">
      {upcomingGoals.length > 0 && (
        <div className="flex flex-col gap-px">
          <div className="px-24">
            <p className="text-12 font-medium text-text-secondary">Upcoming goal prediction</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            {upcomingGoals.map((goal, i) => {
              const isSelected = i === selectedIndex
              const iconPath = goal.percent >= 100
                ? "/status-icons/check-circle.svg"
                : goal.percent >= 80
                  ? "/status-icons/partial.svg"
                  : "/status-icons/x-circle.svg"

              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-12 rounded-lg px-16 py-8 text-left transition-colors",
                    isSelected ? "bg-surface-subtle" : ""
                  )}
                >
                  <Image src={iconPath} alt="" width={16} height={16} aria-hidden="true" className="mt-px size-16 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-14 font-semibold text-text-primary">{goal.label}</p>
                    <p className="text-12 font-medium text-text-secondary">{goal.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {pastGoals.length > 0 && (
        <div className="flex flex-col gap-px">
          <div className="px-24">
            <p className="text-12 font-medium text-text-secondary">Past goals</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            {pastGoals.map((goal, i) => {
              const globalIndex = upcomingGoals.length + i
              const isSelected = globalIndex === selectedIndex
              const tone = getHistoryTone(goal.status, goal.percent)
              const iconPath = getIconPath(goal.status, goal.percent)

              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-12 rounded-lg px-16 py-8 text-left transition-colors",
                    isSelected ? "bg-surface-subtle" : ""
                  )}
                >
                  {tone === "failed" ? (
                    <span className="mt-px flex size-16 shrink-0 items-center justify-center rounded-full bg-surface-error">
                      <X size={10} className="text-text-inverse" />
                    </span>
                  ) : (
                    <Image src={iconPath} alt="" width={16} height={16} aria-hidden="true" className="mt-px size-16 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-14 font-semibold text-text-primary">{goal.label}</p>
                    <p className="text-12 font-medium text-text-secondary">{goal.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Snapshot shell (mimics xl modal chrome) ─────────────────────────────────

function SnapshotShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="max-w-[900px] overflow-hidden rounded-xl border-border-subtle shadow-sm">
      <div className="flex items-center justify-between gap-16 border-b border-border-subtle px-24 py-20">
        <h3 className="text-20 font-bold tracking-tight text-text-primary">{title}</h3>
        <div className="flex items-center gap-8">
          <Button variant="secondary" size="sm" iconRight={<ExternalLink size={14} className="text-icon-secondary" />}>
            Rule setup
          </Button>
          <Button variant="ghost" size="icon" aria-label="Close" iconLeft={<X size={16} className="text-icon-primary" />} />
        </div>
      </div>
      <div className="flex min-h-0">
        {children}
      </div>
    </Card>
  )
}

// ─── Hero card ───────────────────────────────────────────────────────────────

function HeroCard({ percent, assigned, total, sampleWindow, isUpcoming, goalInfo }: {
  percent: number
  assigned: number
  total: number
  sampleWindow: string
  isUpcoming: boolean
  goalInfo?: { label: string; description: string }
}) {
  const isAchieved = percent >= 100
  const isFailed = !isUpcoming && percent < 100

  const bannerBg = isAchieved ? "bg-[#f0faf5]" : isFailed ? "bg-[#fff0ee]" : "bg-surface-subtle"
  const percentColor = isAchieved ? "text-[#308060]" : isFailed ? "text-[#d44332]" : "text-text-primary"

  return (
    <Card className="border-border-subtle shadow-none">
      <div className="flex flex-col gap-4 p-8">
        <div className={cn("flex flex-col items-center gap-16 overflow-hidden rounded-lg p-16", bannerBg)}>
          <p className="text-16 font-bold text-text-primary">{sampleWindow}</p>
          <div className="flex flex-col items-center gap-12 text-center">
            <p className={cn("text-24 font-bold tracking-tight", percentColor)}>{percent}%</p>
            <p className="text-14 font-medium text-text-secondary">
              {isUpcoming ? `~${assigned} of ${total} predicted` : `Assigned ${assigned}/${total}`}
            </p>
          </div>
        </div>
        {goalInfo && (
          <div className={cn("flex items-center justify-center gap-8 rounded-lg px-16 py-8 text-12 text-text-primary", bannerBg)}>
            <span className="font-bold">{goalInfo.label}</span>
            <span className="font-medium">{goalInfo.description}</span>
          </div>
        )}
      </div>
    </Card>
  )
}

// ─── Snapshot 1: Goal hero + run list ────────────────────────────────────────

function TimeOffSnapshot1() {
  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={88} assigned={42} total={48} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "2 conversations per agent per week" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="grid grid-cols-[1fr_1fr_auto_auto] items-center border-b border-border-subtle px-8 py-12">
              <p className="text-12 font-semibold text-text-secondary">Run details</p>
              <p className="text-12 font-semibold text-text-secondary">Issues</p>
              <p className="w-96 text-right text-12 font-semibold text-text-secondary">Assignment</p>
              <div className="w-24" />
            </div>
            <div className="grid grid-cols-[1fr_1fr_auto_auto] items-center border-b border-border-subtle px-8 py-12 last:border-b-0">
              <p className="text-14 font-medium text-text-primary">Mar 1, 9:00 AM</p>
              <div className="flex flex-wrap gap-4">
                <Badge color="gray" size="sm">Evaluator time-off</Badge>
              </div>
              <div className="w-96 text-right">
                <div className="flex flex-col items-end">
                  <p className="text-14 font-medium text-text-primary">88%</p>
                  <p className="text-12 text-text-secondary">42/48</p>
                </div>
              </div>
              <div className="flex w-24 items-center justify-end">
                <ChevronRight size={14} className="text-icon-tertiary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

// ─── Snapshot 2: Run detail — Agents tab ─────────────────────────────────────

function TimeOffSnapshot2() {
  const agents = [
    { name: "Riya Nair", assigned: 0, quota: 2, issue: "Evaluator time-off" },
    { name: "Leah Singh", assigned: 0, quota: 2, issue: "Evaluator time-off" },
    { name: "Noah Scott", assigned: 0, quota: 2, issue: "Evaluator time-off" },
    { name: "Emma Nair", assigned: 2, quota: 2, issue: null },
    { name: "Ravi Morris", assigned: 2, quota: 2, issue: null },
    { name: "Zara Torres", assigned: 2, quota: 2, issue: null },
    { name: "Ethan Kim", assigned: 2, quota: 2, issue: null },
    { name: "Nina Rivera", assigned: 2, quota: 2, issue: null },
    { name: "Omar Chen", assigned: 2, quota: 2, issue: null },
    { name: "Lily Patel", assigned: 2, quota: 2, issue: null },
    { name: "Aiden Brooks", assigned: 2, quota: 2, issue: null },
    { name: "Maya Kumar", assigned: 2, quota: 2, issue: null },
    { name: "Sam Lee", assigned: 2, quota: 2, issue: null },
    { name: "Priya Shah", assigned: 2, quota: 2, issue: null },
    { name: "Jack Wilson", assigned: 2, quota: 2, issue: null },
    { name: "Sofia Gupta", assigned: 2, quota: 2, issue: null },
    { name: "Liam Davis", assigned: 2, quota: 2, issue: null },
    { name: "Aria Joshi", assigned: 2, quota: 2, issue: null },
    { name: "Ben Taylor", assigned: 2, quota: 2, issue: null },
    { name: "Isha Rao", assigned: 2, quota: 2, issue: null },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={88} assigned={42} total={48} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "2 conversations per agent per week" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">88%</span>
                <span className="text-12 text-text-secondary">42/48</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="agents" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 items-center pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Agent</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {agents.map((agent, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{agent.name}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{agent.assigned} / {agent.quota}</span>
                        <div className="flex items-center">
                          {agent.issue ? (
                            <Badge color="gray" size="sm">{agent.issue}</Badge>
                          ) : agent.assigned >= agent.quota ? (
                            <Badge color="primary" size="sm">Goal met</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evaluators" className="mt-12" />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

// ─── Snapshot 3: Run detail — Evaluators tab ─────────────────────────────────

function TimeOffSnapshot3() {
  const evaluators = [
    { name: "Sarah Brown", assigned: 0, capacity: 12, issue: "Evaluator time-off (2 days)" },
    { name: "David Garcia", assigned: 14, capacity: 14, issue: null },
    { name: "Aisha Khan", assigned: 14, capacity: 14, issue: null },
    { name: "Omar Kim", assigned: 14, capacity: 14, issue: null },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={88} assigned={42} total={48} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "2 conversations per agent per week" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">88%</span>
                <span className="text-12 text-text-secondary">42/48</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="evaluators" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12" />
                <TabsContent value="evaluators" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 items-center pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Evaluator</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {evaluators.map((ev) => (
                      <div key={ev.name} className="grid grid-cols-3 items-center border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{ev.name}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{ev.assigned} / {ev.capacity}</span>
                        <div className="flex items-center">
                          {ev.issue ? (
                            <Badge color="gray" size="sm">{ev.issue}</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

// ─── State content: Evaluator time-off ───────────────────────────────────────

function EvaluatorTimeOffState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Evaluator time-off</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When an evaluator is on time off, their conversations can&apos;t be assigned.
          The &quot;Evaluator time-off&quot; issue badge appears in the run list, agent details, and evaluator details.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">1. Run list — issue badge on the run row</p>
        <TimeOffSnapshot1 />
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">2. Agents tab — affected agents show the issue</p>
        <TimeOffSnapshot2 />
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">3. Evaluators tab — evaluator on time-off</p>
        <TimeOffSnapshot3 />
      </div>
    </div>
  )
}

// ─── State content: Percentage based sampling ────────────────────────────────

function PercentageSamplingSnapshot() {
  const agents = [
    { name: "Riya Nair", eligible: 52, assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Leah Singh", eligible: 48, assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Noah Scott", eligible: 45, assigned: 5, issue: null },
    { name: "Emma Nair", eligible: 61, assigned: 6, issue: null },
    { name: "Ravi Morris", eligible: 38, assigned: 4, issue: null },
    { name: "Zara Torres", eligible: 55, assigned: 6, issue: null },
    { name: "Ethan Kim", eligible: 42, assigned: 4, issue: null },
    { name: "Nina Rivera", eligible: 67, assigned: 7, issue: null },
    { name: "Omar Chen", eligible: 33, assigned: 3, issue: null },
    { name: "Lily Patel", eligible: 49, assigned: 5, issue: null },
    { name: "Aiden Brooks", eligible: 58, assigned: 6, issue: null },
    { name: "Maya Kumar", eligible: 36, assigned: 4, issue: null },
    { name: "Sam Lee", eligible: 44, assigned: 4, issue: null },
    { name: "Priya Shah", eligible: 72, assigned: 7, issue: null },
    { name: "Jack Wilson", eligible: 29, assigned: 3, issue: null },
    { name: "Sofia Gupta", eligible: 53, assigned: 5, issue: null },
    { name: "Liam Davis", eligible: 41, assigned: 4, issue: null },
    { name: "Aria Joshi", eligible: 63, assigned: 6, issue: null },
    { name: "Ben Taylor", eligible: 37, assigned: 4, issue: null },
    { name: "Isha Rao", eligible: 46, assigned: 5, issue: null },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={85} assigned={34} total={40} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Dynamic goal", description: "2% of eligible conversations per agent" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">85%</span>
                <span className="text-12 text-text-secondary">34/40</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="agents" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid items-center pb-8" style={{ gridTemplateColumns: "2fr 1fr 1.5fr 2fr" }}>
                      <p className="text-12 font-semibold text-text-secondary">Agent</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Eligible conversations</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {agents.map((agent, idx) => (
                      <div key={idx} className="grid items-center border-t border-border-subtle py-8" style={{ gridTemplateColumns: "2fr 1fr 1.5fr 2fr" }}>
                        <span className="truncate text-12 text-text-primary">{agent.name}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{agent.assigned}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{agent.eligible}</span>
                        <div className="flex items-center">
                          {agent.issue ? (
                            <Badge color="gray" size="sm">{agent.issue}</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evaluators" className="mt-12" />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

function PercentageSamplingState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Percentage based sampling</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When the goal is set to a percentage of eligible conversations per agent, there is no fixed quota.
          The &quot;Assigned&quot; column shows a plain count and &quot;Eligible conversations&quot; shows how many matched the rule conditions.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Agents tab — percentage based assignment with evaluator workload issue</p>
        <PercentageSamplingSnapshot />
      </div>
    </div>
  )
}

// ─── State content: Percentage based & collective assignment ─────────────────

function CollectiveSamplingSnapshot() {
  const agents = [
    { name: "Riya Nair", assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Leah Singh", assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Noah Scott", assigned: 5, issue: null },
    { name: "Emma Nair", assigned: 6, issue: null },
    { name: "Ravi Morris", assigned: 4, issue: null },
    { name: "Zara Torres", assigned: 6, issue: null },
    { name: "Ethan Kim", assigned: 4, issue: null },
    { name: "Nina Rivera", assigned: 7, issue: null },
    { name: "Omar Chen", assigned: 3, issue: null },
    { name: "Lily Patel", assigned: 5, issue: null },
    { name: "Aiden Brooks", assigned: 6, issue: null },
    { name: "Maya Kumar", assigned: 4, issue: null },
    { name: "Sam Lee", assigned: 4, issue: null },
    { name: "Priya Shah", assigned: 7, issue: null },
    { name: "Jack Wilson", assigned: 3, issue: null },
    { name: "Sofia Gupta", assigned: 5, issue: null },
    { name: "Liam Davis", assigned: 4, issue: null },
    { name: "Aria Joshi", assigned: 6, issue: null },
    { name: "Ben Taylor", assigned: 4, issue: null },
    { name: "Isha Patel", assigned: 5, issue: null },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={85} assigned={34} total={40} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Dynamic goal", description: "2% of eligible conversations collectively across agents · 1,248 eligible conversations" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">85%</span>
                <span className="text-12 text-text-secondary">34/40</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="agents" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 items-center pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Agent</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {agents.map((agent, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{agent.name}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{agent.assigned}</span>
                        <div className="flex items-center">
                          {agent.issue ? (
                            <Badge color="gray" size="sm">{agent.issue}</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evaluators" className="mt-12" />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

function CollectiveSamplingState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Percentage based & collective assignment</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When the goal is a percentage of eligible conversations across all agents collectively, eligible conversations are shown as a total count above the table rather than per-agent.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Agents tab — collective percentage assignment with evaluator workload issue</p>
        <CollectiveSamplingSnapshot />
      </div>
    </div>
  )
}

// ─── State content: Collective & fixed assignment ────────────────────────────

function FixedCollectiveSnapshot() {
  const agents = [
    { name: "Riya Nair", assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Leah Singh", assigned: 0, issue: "Evaluator workload limit reached" },
    { name: "Noah Scott", assigned: 3, issue: null },
    { name: "Emma Nair", assigned: 2, issue: null },
    { name: "Ravi Morris", assigned: 2, issue: null },
    { name: "Zara Torres", assigned: 3, issue: null },
    { name: "Ethan Kim", assigned: 2, issue: null },
    { name: "Nina Rivera", assigned: 3, issue: null },
    { name: "Omar Chen", assigned: 2, issue: null },
    { name: "Lily Patel", assigned: 2, issue: null },
    { name: "Aiden Brooks", assigned: 3, issue: null },
    { name: "Maya Kumar", assigned: 2, issue: null },
    { name: "Sam Lee", assigned: 2, issue: null },
    { name: "Priya Shah", assigned: 3, issue: null },
    { name: "Jack Wilson", assigned: 2, issue: null },
    { name: "Sofia Gupta", assigned: 2, issue: null },
    { name: "Liam Davis", assigned: 2, issue: null },
    { name: "Aria Joshi", assigned: 3, issue: null },
    { name: "Ben Taylor", assigned: 2, issue: null },
    { name: "Isha Patel", assigned: 2, issue: null },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={85} assigned={34} total={40} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "40 conversations collectively across agents" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">85%</span>
                <span className="text-12 text-text-secondary">34/40</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="agents" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 items-center pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Agent</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {agents.map((agent, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{agent.name}</span>
                        <span className="text-12 tabular-nums text-text-secondary">{agent.assigned}</span>
                        <div className="flex items-center">
                          {agent.issue ? (
                            <Badge color="gray" size="sm">{agent.issue}</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evaluators" className="mt-12" />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

function FixedCollectiveState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Collective & fixed assignment</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When the goal is a fixed number of conversations distributed collectively across all agents, each agent gets a share of the total without a per-agent quota.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Agents tab — fixed collective assignment with evaluator workload issue</p>
        <FixedCollectiveSnapshot />
      </div>
    </div>
  )
}

// ─── State content: Goal scope — Any rule ────────────────────────────────────

function AnyRuleScopeSnapshot() {
  const agents: { name: string; assigned: number; quota: number; otherRuleNote: string | null }[] = [
    { name: "Riya Nair", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Leah Singh", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Noah Scott", assigned: 0, quota: 0, otherRuleNote: "Quota met by another rule" },
    { name: "Emma Nair", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Ravi Morris", assigned: 0, quota: 0, otherRuleNote: "Quota met by another rule" },
    { name: "Zara Torres", assigned: 1, quota: 1, otherRuleNote: "1 assigned by another rule" },
    { name: "Ethan Kim", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Nina Rivera", assigned: 0, quota: 0, otherRuleNote: "Quota met by another rule" },
    { name: "Omar Chen", assigned: 1, quota: 1, otherRuleNote: "1 assigned by another rule" },
    { name: "Lily Patel", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Aiden Brooks", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Maya Kumar", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Sam Lee", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Priya Shah", assigned: 1, quota: 1, otherRuleNote: "1 assigned by another rule" },
    { name: "Jack Wilson", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Sofia Gupta", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Liam Davis", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Aria Joshi", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Ben Taylor", assigned: 2, quota: 2, otherRuleNote: null },
    { name: "Isha Rao", assigned: 2, quota: 2, otherRuleNote: null },
  ]

  const totalAssigned = agents.reduce((sum, a) => sum + a.assigned, 0)
  const totalGoal = agents.reduce((sum, a) => sum + a.quota, 0)

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={100} assigned={totalAssigned} total={totalGoal} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "2 conversations per agent per week" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">100%</span>
                <span className="text-12 text-text-secondary">{totalAssigned}/{totalGoal}</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="agents" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 items-center pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Agent</p>
                      <p className="text-12 font-semibold text-text-secondary">Assigned</p>
                      <p className="text-12 font-semibold text-text-secondary">Status</p>
                    </div>
                    {agents.map((agent, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{agent.name}</span>
                        <div className="flex flex-col">
                          {agent.quota === 0 ? (
                            <span className="text-12 text-text-secondary">{agent.otherRuleNote}</span>
                          ) : (
                            <>
                              <span className="text-12 tabular-nums text-text-secondary">{agent.assigned} / {agent.quota}</span>
                              {agent.otherRuleNote && (
                                <span className="text-12 text-text-secondary">{agent.otherRuleNote}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center">
                          {agent.assigned >= agent.quota ? (
                            <Badge color="primary" size="sm">Goal met</Badge>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evaluators" className="mt-12" />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

function AnyRuleScopeState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Goal scope: Any rule</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When a rule&apos;s goal scope is set to &quot;Any rule&quot;, the system checks whether an agent&apos;s quota has already been fulfilled by a different rule.
          If so, the agent is skipped and excluded from the denominator, keeping the goal at 100%.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Agents tab — 3 agents skipped because their quota was met by another rule</p>
        <AnyRuleScopeSnapshot />
      </div>
    </div>
  )
}

// ─── State content: Shared queue assignment ──────────────────────────────────

function SharedQueueSnapshot() {
  const evaluators = [
    { name: "Sarah Brown", assigned: 12, capacity: 12 },
    { name: "David Garcia", assigned: 14, capacity: 14 },
    { name: "Aisha Khan", assigned: 10, capacity: 14 },
    { name: "Omar Kim", assigned: 6, capacity: 14 },
  ]

  return (
    <SnapshotShell title="Billing QA">
      <GoalSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <HeroCard percent={88} assigned={42} total={48} sampleWindow="Feb 23 – Mar 1, 2026" isUpcoming={false} goalInfo={{ label: "Fixed goal", description: "2 conversations per agent per week" }} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle px-8 py-12">
              <div className="flex items-center gap-6 text-14 font-medium text-text-primary">
                <ChevronLeft size={16} className="text-icon-secondary" />
                Mar 1, 9:00 AM
              </div>
              <div className="flex items-center gap-8">
                <span className="text-14 font-medium text-text-primary">88%</span>
                <span className="text-12 text-text-secondary">42/48</span>
              </div>
            </div>

            <div className="px-8 pt-12">
              <Tabs defaultValue="evaluators" className="flex flex-col">
                <NeutralTabsList className="w-full p-4">
                  <NeutralTabsTrigger value="agents" className="h-36 flex-1 px-8 py-6 text-12">Agents (20)</NeutralTabsTrigger>
                  <NeutralTabsTrigger value="evaluators" className="h-36 flex-1 px-8 py-6 text-12">Evaluators (4)</NeutralTabsTrigger>
                </NeutralTabsList>
                <TabsContent value="agents" className="mt-12" />
                <TabsContent value="evaluators" className="mt-12">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between pb-8">
                      <p className="text-12 font-semibold text-text-secondary">Evaluator</p>
                      <div className="flex items-center gap-4">
                        <Info size={12} className="shrink-0 text-icon-secondary" />
                        <span className="text-12 text-text-secondary">Shared queue. Evaluators self-assign from a common pool.</span>
                      </div>
                    </div>
                    {evaluators.map((ev) => (
                      <div key={ev.name} className="border-t border-border-subtle py-8">
                        <span className="truncate text-12 text-text-primary">{ev.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SnapshotShell>
  )
}

function SharedQueueState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Shared queue assignment</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When a rule uses shared queue assignment, conversations are placed in a common pool instead of being assigned to specific evaluators.
          Any evaluator with access can self-assign tasks from the queue.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Evaluators tab — no issues, evaluators self-assign from the shared pool</p>
        <SharedQueueSnapshot />
      </div>
    </div>
  )
}

// ─── State content: Goal–rule frequency mismatch ─────────────────────────────

type MismatchGoal = {
  label: string
  sub: string
  upcoming: boolean
  hasRun: boolean
  percent?: number
  status?: "success" | "partial" | "failed" | "scheduled"
}

const mismatchGoals: MismatchGoal[] = [
  { label: "—", sub: "Mar 2 - 8", upcoming: true, hasRun: false },
  { label: "—", sub: "Feb 23 - Mar 1", upcoming: false, hasRun: false },
  { label: "—", sub: "Feb 16 - 22", upcoming: false, hasRun: false },
  { label: "100%", sub: "Feb 9 - 15", upcoming: false, hasRun: true, percent: 100, status: "success" },
  { label: "—", sub: "Feb 2 - 8", upcoming: false, hasRun: false },
  { label: "—", sub: "Jan 26 - Feb 1", upcoming: false, hasRun: false },
  { label: "—", sub: "Jan 19 - 25", upcoming: false, hasRun: false },
  { label: "—", sub: "Jan 12 - 18", upcoming: false, hasRun: false },
  { label: "94%", sub: "Jan 5 - 11", upcoming: false, hasRun: true, percent: 94, status: "partial" },
]

function MismatchSidebar({ selectedIndex }: { selectedIndex: number }) {
  const upcomingGoals = mismatchGoals.filter((g) => g.upcoming)
  const pastGoals = mismatchGoals.filter((g) => !g.upcoming)

  function renderGoalIcon(goal: MismatchGoal) {
    if (!goal.hasRun) {
      return <CircleDashed size={16} className="mt-px shrink-0 text-icon-tertiary" />
    }
    const iconPath = getIconPath(goal.status ?? "success", goal.percent ?? 0)
    return <Image src={iconPath} alt="" width={16} height={16} aria-hidden="true" className="mt-px size-16 shrink-0" />
  }

  return (
    <div className="flex w-204 shrink-0 flex-col gap-16 px-8 py-24">
      {upcomingGoals.length > 0 && (
        <div className="flex flex-col gap-px">
          <div className="px-24">
            <p className="text-12 font-medium text-text-secondary">Upcoming goal prediction</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            {upcomingGoals.map((goal, i) => {
              const isSelected = i === selectedIndex
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-12 rounded-lg px-16 py-8 text-left transition-colors",
                    isSelected ? "bg-surface-subtle" : ""
                  )}
                >
                  {renderGoalIcon(goal)}
                  <div className="min-w-0">
                    <p className={cn("truncate text-14 font-semibold", goal.hasRun ? "text-text-primary" : "text-text-tertiary")}>{goal.label}</p>
                    <p className="text-12 font-medium text-text-secondary">{goal.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {pastGoals.length > 0 && (
        <div className="flex flex-col gap-px">
          <div className="px-24">
            <p className="text-12 font-medium text-text-secondary">Past goals</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            {pastGoals.map((goal, i) => {
              const globalIndex = upcomingGoals.length + i
              const isSelected = globalIndex === selectedIndex
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-12 rounded-lg px-16 py-8 text-left transition-colors",
                    isSelected ? "bg-surface-subtle" : ""
                  )}
                >
                  {renderGoalIcon(goal)}
                  <div className="min-w-0">
                    <p className={cn("truncate text-14 font-semibold", goal.hasRun ? "text-text-primary" : "text-text-tertiary")}>{goal.label}</p>
                    <p className="text-12 font-medium text-text-secondary">{goal.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function MismatchSnapshot() {
  return (
    <SnapshotShell title="Billing QA">
      <MismatchSidebar selectedIndex={1} />
      <div className="flex min-w-0 flex-1 flex-col bg-surface-page">
        <div className="shrink-0 p-16 pb-0">
          <Card className="border-border-subtle shadow-none">
            <div className="p-8">
              <div className="flex flex-col items-center gap-8 rounded-lg bg-surface-subtle px-24 py-24">
                <p className="text-16 font-bold text-text-primary">Feb 23 – Mar 1, 2026</p>
                <p className="text-center text-14 text-text-secondary">
                  This rule runs monthly, but the goal window is weekly. No runs were executed for this week.
                </p>
              </div>
              <div className="flex items-center justify-center gap-8 rounded-lg bg-surface-subtle px-16 py-8 text-12 text-text-primary">
                <span className="font-bold">Fixed goal</span>
                <span className="font-medium">2 conversations per agent per week</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SnapshotShell>
  )
}

function GoalFrequencyMismatchState() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h2 className="text-16 font-bold text-text-primary">Goal–rule frequency mismatch</h2>
        <p className="mt-4 text-14 text-text-secondary">
          When the goal is set to weekly but the rule runs monthly, most weekly goal windows will have no runs.
          An empty state is shown for those weeks with no assignment data.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <p className="text-13 font-semibold text-text-secondary">Empty weekly goal — rule only runs monthly</p>
        <MismatchSnapshot />
      </div>
    </div>
  )
}

// ─── Main States Prototype ───────────────────────────────────────────────────

export default function StatesPrototype() {
  return (
    <Tabs defaultValue={stateConfigs[0]!.id} orientation="vertical" className="flex min-h-screen bg-surface-page">
      <aside className="sticky top-0 flex h-screen w-240 shrink-0 flex-col border-r border-border-subtle bg-surface-card">
        <div className="border-b border-border-subtle px-16 py-16">
          <h2 className="text-14 font-bold text-text-primary">States</h2>
          <p className="mt-4 text-12 text-text-secondary">Edge cases &amp; variations</p>
        </div>
        <VerticalTabsList className="p-8">
          {stateConfigs.map((state) => (
            <VerticalTabsTrigger key={state.id} value={state.id} className="text-13">
              {state.label}
            </VerticalTabsTrigger>
          ))}
        </VerticalTabsList>
      </aside>

      <main className="flex-1 overflow-y-auto p-32">
        <TabsContent value="evaluator-time-off" className="mt-0">
          <EvaluatorTimeOffState />
        </TabsContent>
        <TabsContent value="percentage-sampling" className="mt-0">
          <PercentageSamplingState />
        </TabsContent>
        <TabsContent value="percentage-collective" className="mt-0">
          <CollectiveSamplingState />
        </TabsContent>
        <TabsContent value="fixed-collective" className="mt-0">
          <FixedCollectiveState />
        </TabsContent>
        <TabsContent value="goal-frequency-mismatch" className="mt-0">
          <GoalFrequencyMismatchState />
        </TabsContent>
        <TabsContent value="shared-queue" className="mt-0">
          <SharedQueueState />
        </TabsContent>
        <TabsContent value="any-rule-scope" className="mt-0">
          <AnyRuleScopeState />
        </TabsContent>
      </main>
    </Tabs>
  )
}
