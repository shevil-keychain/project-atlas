"use client"

import { Button } from "@level/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu"
import { ChevronDown } from "@level/ui/components/icons"
import { Mail } from "lucide-react"
import type { InsightsWorkerConfig } from "../lib/workers"

export function InsightsWorkerLanding({
  config,
  onActionSelect,
  disabled = false,
}: {
  config: InsightsWorkerConfig
  onActionSelect: (action: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-12">
      {config.actions.map((action) => (
        <div key={action.label} className="flex w-360 items-stretch">
          <Button
            variant={action.primary ? "default" : "secondary"}
            size="default"
            type="button"
            className="h-40 flex-1 rounded-r-none border-r-0"
            onClick={() => onActionSelect(action.label)}
            disabled={disabled}
          >
            {action.label}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={action.primary ? "default" : "secondary"}
                size="default"
                type="button"
                className={
                  action.primary
                    ? "h-40 w-40 shrink-0 rounded-l-none border-l border-white/20 px-0"
                    : "h-40 w-40 shrink-0 rounded-l-none px-0"
                }
                aria-label={`${action.label} options`}
                disabled={disabled}
                iconLeft={<ChevronDown size={16} />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onActionSelect(action.label)}>
                <Mail size={16} />
                Send email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
