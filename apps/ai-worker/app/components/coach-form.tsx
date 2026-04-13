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
  Plus,
  Sliders04,
} from "@level/ui/components/icons"
import { Mail } from "lucide-react"

type FilterRow = {
  id: string
  field: string
  operator: string
  value: string
}

const agentOptions = [
  { value: "sarah-johnson", label: "Sarah Johnson" },
  { value: "mike-chen", label: "Mike Chen" },
  { value: "lisa-patel", label: "Lisa Patel" },
  { value: "james-wilson", label: "James Wilson" },
  { value: "emily-davis", label: "Emily Davis" },
  { value: "alex-martinez", label: "Alex Martinez" },
  { value: "rachel-kim", label: "Rachel Kim" },
  { value: "david-brown", label: "David Brown" },
]

const datePresets = [
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-14-days", label: "Last 14 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
]

const focusOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "quality", label: "Quality" },
  { value: "efficiency", label: "Efficiency" },
  { value: "customer-satisfaction", label: "Customer satisfaction" },
  { value: "compliance", label: "Compliance" },
]

export function CoachForm({
  onSubmit,
  onWriteYourOwn,
  disabled = false,
}: {
  onSubmit: (formData: {
    agentName: string
    dateRange: string
    focus: string
    filters: FilterRow[]
  }) => void
  onWriteYourOwn: () => void
  disabled?: boolean
}) {
  const [agentName, setAgentName] = useState("")
  const [dateRange, setDateRange] = useState("last-7-days")

  const handleSubmit = () => {
    const agentLabel = agentOptions.find((a) => a.value === agentName)?.label ?? ""
    const dateLabel = datePresets.find((d) => d.value === dateRange)?.label ?? dateRange
    onSubmit({
      agentName: agentLabel,
      dateRange: dateLabel,
      focus: "Automatic",
      filters: [],
    })
  }

  return (
    <div className="mx-auto w-full max-w-720">
      <Card className="border-border-default shadow-sm">
        <CardBody className="flex flex-col gap-20 px-24 py-24">
          <div className="flex items-center justify-between">
            <h2 className="text-16 font-bold text-text-primary">Configure coaching plan</h2>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Tune parameters"
              iconLeft={<Sliders04 size={18} className="text-icon-secondary" />}
            />
          </div>

          <div className="grid grid-cols-3 gap-16">
            <div className="flex flex-col gap-6">
              <label className="text-14 font-semibold text-text-primary">Agent name</label>
              <Combobox
                options={agentOptions}
                value={agentName}
                onValueChange={setAgentName}
                placeholder="Search agents"
                searchPlaceholder="Search agents..."
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

            <div className="flex flex-col gap-6">
              <label className="text-14 font-semibold text-text-primary">Focus</label>
              <Select value="automatic" open={false}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select focus" />
                </SelectTrigger>
                <SelectContent>
                  {focusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="secondary"
            size="default"
            type="button"
            className="w-full"
            iconLeft={<Plus size={16} className="text-icon-secondary" />}
          >
            Add filter
          </Button>

          <div className="flex items-stretch">
            <Button
              variant="default"
              size="default"
              type="button"
              className="h-40 flex-1 rounded-r-none border-r-0"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Build coaching plan
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="default"
                  type="button"
                  className="h-40 w-40 shrink-0 rounded-l-none border-l border-white/20 px-0"
                  aria-label="More build options"
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
