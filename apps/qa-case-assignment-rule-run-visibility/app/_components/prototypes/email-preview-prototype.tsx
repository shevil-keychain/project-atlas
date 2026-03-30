"use client"

import * as React from "react"
import { Badge } from "@level/ui/components/ui/badge"

const emailGoal = {
  dateRange: "Mar 2, 2026 - Mar 8, 2026",
  percent: 89,
  completed: 50,
  expected: 56,
}

const emailRuns: Array<{
  dateLabel: string
  issueBadges: string[]
  assignedPercent: number
  assignedCount: number
  goalTarget: number
}> = [
  { dateLabel: "Mar 2, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 89, assignedCount: 50, goalTarget: 56 },
  { dateLabel: "Mar 3, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
  { dateLabel: "Mar 4, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
  { dateLabel: "Mar 5, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
  { dateLabel: "Mar 6, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
  { dateLabel: "Mar 7, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
  { dateLabel: "Mar 8, 2026, 10:00 AM", issueBadges: ["Insufficient matching conversations"], assignedPercent: 0, assignedCount: 0, goalTarget: 56 },
]

export default function EmailPreviewPrototype() {
  return (
    <div className="flex h-screen items-start justify-center overflow-y-auto bg-[#f9fafd] py-48">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-24 px-24">
        {/* Logo */}
        <div className="py-8">
          <p className="text-24 font-black tracking-tight text-text-primary">
            LEVEL <span className="text-primary-orange-600">AI</span>
          </p>
        </div>

        {/* Email card */}
        <div className="w-full overflow-hidden rounded-lg border border-border-default bg-white shadow-sm">
          {/* Orange header */}
          <div className="flex flex-col items-center gap-12 bg-[#e26d01] py-32 text-white">
            <p className="text-20 font-bold tracking-tight">Hello Sasha!</p>
            <p className="text-16 font-medium">
              Upcoming goal prediction for Billing QA
            </p>
          </div>

          {/* Content */}
          <div className="px-48 pb-56 pt-32">
            {/* Goal summary card — matches GoalHeroCard */}
            <div className="rounded-lg border border-[#f5d0c0] bg-[#fff0ee] p-8">
              <div className="flex flex-col items-center gap-12 rounded-lg p-16">
                <p className="text-16 font-bold text-text-primary">
                  {emailGoal.dateRange}
                </p>
                <p className="text-24 font-bold tracking-tight text-[#d44332]">
                  {emailGoal.percent}%
                </p>
                <p className="text-14 font-medium text-text-secondary">
                  ~{emailGoal.completed} of {emailGoal.expected} predicted
                </p>
              </div>
            </div>

            {/* Predicted runs table — matches RunListView */}
            <div className="mt-32 flex flex-col">
              <div className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-border-subtle px-8 py-12">
                <p className="text-12 font-semibold text-text-secondary">Predicted runs</p>
                <p className="text-12 font-semibold text-text-secondary">Predicted issues</p>
                <p className="w-96 text-right text-12 font-semibold text-text-secondary">
                  Predicted<br />assignment
                </p>
              </div>
              {emailRuns.map((run) => (
                <div
                  key={run.dateLabel}
                  className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-border-subtle px-8 py-12 last:border-b-0"
                >
                  <p className="text-14 font-medium text-text-secondary">{run.dateLabel}</p>

                  <div className="flex flex-wrap gap-4">
                    {run.issueBadges.map((badge, idx) => (
                      <Badge key={idx} color="gray" size="sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="w-96 text-right">
                    <div className="flex flex-col items-end">
                      <p className="text-14 font-medium text-text-secondary">{run.assignedPercent}%</p>
                      <p className="text-12 text-text-secondary">
                        {run.assignedCount}/{run.goalTarget}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="mt-40 flex justify-center">
              <button
                type="button"
                className="rounded-lg bg-[#f07400] px-24 py-12 text-16 font-semibold text-white transition-colors hover:bg-[#d96800]"
              >
                Open Level AI
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 pb-24 text-12 text-text-tertiary">
          <span>If you no longer wish to receive these emails</span>
          <button type="button" className="font-semibold text-primary-orange-600 hover:underline">
            Unsubscribe here
          </button>
        </div>
      </div>
    </div>
  )
}
