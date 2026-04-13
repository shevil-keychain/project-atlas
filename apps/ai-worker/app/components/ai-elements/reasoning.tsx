"use client"

import { cn } from "@level/ui/lib/utils"
import { ChevronRight } from "@level/ui/components/icons"
import { useEffect, useMemo, useRef, useState } from "react"
import { Shimmer } from "./shimmer"

type ReasoningBlockProps = {
  isStreaming: boolean
  reasoning: string
  reasoningDone?: boolean
  durationSeconds?: number
}

const stripMarkdown = (text: string) =>
  (text ?? "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/~~(.+?)~~/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")

export function ReasoningBlock({ isStreaming, reasoning, reasoningDone, durationSeconds }: ReasoningBlockProps) {
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasFinishedRef = useRef(false)

  const cleanReasoning = useMemo(() => stripMarkdown(reasoning), [reasoning])

  useEffect(() => {
    if (!isStreaming && reasoning && !hasFinishedRef.current) {
      hasFinishedRef.current = true
      const timer = setTimeout(() => setCollapsed(true), 600)
      return () => clearTimeout(timer)
    }
    if (isStreaming) {
      hasFinishedRef.current = false
      setCollapsed(false)
    }
  }, [isStreaming, reasoning])

  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [cleanReasoning, isStreaming])

  const hasDuration = durationSeconds != null && durationSeconds > 0
  if (!reasoning && !isStreaming && !hasDuration) return null

  const hasReasoning = !!reasoning
  const showContent = hasReasoning && !collapsed
  const label = hasDuration
    ? `Thought for ${durationSeconds}s`
    : hasReasoning
      ? "Thought process"
      : "Thought briefly"

  if (isStreaming) {
    if (reasoningDone && hasReasoning) {
      return (
        <div className="flex flex-col gap-4">
          <Shimmer as="p" className="text-14 font-semibold" duration={4} spread={2}>
            Generating response
          </Shimmer>
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-4">
        <Shimmer as="p" className="text-14 font-semibold" duration={4} spread={2}>
          Thinking
        </Shimmer>
        {hasReasoning && (
          <div
            ref={scrollRef}
            className="scrollbar-none max-h-[240px] overflow-y-auto text-13 leading-[1.7] text-text-tertiary"
          >
            {cleanReasoning}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mb-8 flex flex-col">
      <button
        type="button"
        onClick={() => hasReasoning && setCollapsed((c) => !c)}
        className={cn(
          "flex w-fit items-center gap-6 py-4 text-13 font-medium text-text-secondary",
          hasReasoning && "hover:text-text-primary"
        )}
      >
        {hasReasoning && (
          <ChevronRight
            size={12}
            className={cn(
              "shrink-0 text-text-tertiary transition-transform duration-150",
              !collapsed && "rotate-90"
            )}
          />
        )}
        <span>{label}</span>
      </button>

      {hasReasoning && (
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
            showContent ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="scrollbar-none max-h-[240px] overflow-y-auto py-4 pl-18 text-13 leading-[1.7] text-text-tertiary">
              {cleanReasoning}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
