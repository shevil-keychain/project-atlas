"use client"

import { Button } from "@level/ui/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@level/ui/components/ui/accordion"
import { cn } from "@level/ui/lib/utils"
import {
  PenLine,
  Workflow,
  Sparkles,
  Settings,
  FolderClosed,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react"

const threads = [
  {
    group: "level-design-system",
    items: [
      { label: "Update inactive tab label color", time: "6h" },
      { label: "Update font weight for normal text", time: "8h" },
      { label: "Beautify demo button page", time: "8h" },
      { label: "Start realtime preview", time: "8h" },
    ],
  },
]

const personalOsItems = [
  { label: "Create a skill that can scrape the we...", time: "4d" },
  { label: "List level-design-system contents", time: "10h" },
  { label: "Plan a research for me . Conduct a ...", time: "4d" },
  { label: "h", time: "4d" },
  { label: "list the file structure we have in .cod...", time: "4d" },
  { label: "List What do you have in skills, rules...", time: "4d" },
  { label: "Can you spawn subagents like in cu...", time: "4d" },
]

function ThreadRow({
  label,
  time,
}: {
  label: string
  time: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-8 rounded-md px-8 py-6 text-left",
        "text-14 font-medium text-foreground",
        "hover:bg-stone-200 transition-colors cursor-pointer"
      )}
    >
      <span className="truncate">{label}</span>
      <span className="shrink-0 text-12 text-muted-foreground">{time}</span>
    </button>
  )
}

export function LeftPanel() {
  return (
    <div className="flex h-full w-[260px] shrink-0 flex-col border-r border-stone-300 bg-white">
      {/* Top nav items */}
      <div className="flex flex-col gap-2 px-8 pt-12 pb-8">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-8 text-14 font-semibold"
          iconLeft={<PenLine className="size-16" />}
        >
          New thread
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-8 text-14 font-medium"
          iconLeft={<Workflow className="size-16" />}
        >
          Automations
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-8 text-14 font-medium"
          iconLeft={<Sparkles className="size-16" />}
        >
          Skills
        </Button>
      </div>

      {/* Scrollable content area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Threads section */}
        <div className="px-8 pt-8">
          <div className="flex items-center justify-between px-8 pb-4">
            <span className="text-12 font-semibold text-muted-foreground">
              Threads
            </span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" className="size-24">
                <LayoutGrid className="size-14 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="size-24">
                <SlidersHorizontal className="size-14 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["threads", "personal-os"]}>
            {/* Threads group */}
            <AccordionItem value="threads" className="border-0 bg-transparent">
              <AccordionTrigger
                icon={<FolderClosed className="size-14 text-muted-foreground" />}
                className="px-8 py-6 text-12 font-semibold text-foreground hover:bg-stone-100"
              >
                {threads[0].group}
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-4 pt-0">
                <div className="flex flex-col">
                  {threads[0].items.map((item) => (
                    <ThreadRow
                      key={item.label}
                      label={item.label}
                      time={item.time}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Personal OS group */}
            <AccordionItem
              value="personal-os"
              className="border-0 bg-transparent"
            >
              <AccordionTrigger
                icon={<FolderClosed className="size-14 text-muted-foreground" />}
                className="px-8 py-6 text-12 font-semibold text-foreground hover:bg-stone-100"
              >
                Personal OS
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-4 pt-0">
                <div className="flex flex-col">
                  {personalOsItems.map((item) => (
                    <ThreadRow
                      key={item.label}
                      label={item.label}
                      time={item.time}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Bottom settings */}
      <div className="border-t border-stone-300 px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-8 text-14 font-medium"
          iconLeft={<Settings className="size-16" />}
        >
          Settings
        </Button>
      </div>
    </div>
  )
}
