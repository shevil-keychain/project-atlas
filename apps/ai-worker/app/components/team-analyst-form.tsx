"use client"

import { useState } from "react"
import { Button } from "@level/ui/components/ui/button"
import { Card, CardBody } from "@level/ui/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select"
import { Combobox } from "@level/ui/components/ui/combobox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu"
import {
  Calendar,
  ChevronDown,
  Edit05,
} from "@level/ui/components/icons"
import { Mail } from "lucide-react"

const teamOptions = [
  { value: "support-tier-1", label: "Support Tier 1" },
  { value: "support-tier-2", label: "Support Tier 2" },
  { value: "billing", label: "Billing" },
  { value: "onboarding", label: "Onboarding" },
  { value: "retention", label: "Retention" },
  { value: "escalations", label: "Escalations" },
  { value: "chat-support", label: "Chat Support" },
  { value: "voice-support", label: "Voice Support" },
]

const datePresets = [
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-14-days", label: "Last 14 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
]

export function TeamAnalystForm({
  onSubmit,
  disabled = false,
}: {
  onSubmit: (formData: { team: string; dateRange: string }) => void
  disabled?: boolean
}) {
  const [team, setTeam] = useState("")
  const [dateRange, setDateRange] = useState("last-7-days")

  const handleSubmit = () => {
    const teamLabel = teamOptions.find((t) => t.value === team)?.label ?? ""
    const dateLabel = datePresets.find((d) => d.value === dateRange)?.label ?? dateRange
    onSubmit({ team: teamLabel, dateRange: dateLabel })
  }

  return (
    <div className="mx-auto w-full max-w-720">
      <Card className="border-border-default shadow-sm">
        <CardBody className="flex flex-col gap-20 px-24 py-24">
          <h2 className="text-16 font-bold text-text-primary">Configure team analysis</h2>

          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              <label className="text-14 font-semibold text-text-primary">Agent teams</label>
              <Combobox
                options={teamOptions}
                value={team}
                onValueChange={setTeam}
                placeholder="Search team"
                searchPlaceholder="Search team..."
                disabled={disabled}
              />
            </div>

            <div className="flex flex-col gap-6">
              <label className="text-14 font-semibold text-text-primary">
                Conversation start date
              </label>
              <Select value={dateRange} onValueChange={setDateRange} disabled={disabled}>
                <SelectTrigger className="w-full">
                  <span className="flex items-center gap-8">
                    <Calendar size={16} className="text-icon-secondary" />
                    <SelectValue placeholder="Select date range" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {datePresets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-stretch">
            <Button
              variant="default"
              size="default"
              type="button"
              className="h-40 flex-1 rounded-r-none border-r-0"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Analyze team performance
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="default"
                  type="button"
                  className="h-40 w-40 shrink-0 rounded-l-none border-l border-white/20 px-0"
                  aria-label="More options"
                  disabled={disabled}
                  iconLeft={<ChevronDown size={16} />}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Mail size={16} />
                  Send email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="secondary"
            size="default"
            type="button"
            className="w-full"
            iconLeft={<Edit05 size={16} className="text-icon-secondary" />}
          >
            Write your own
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
