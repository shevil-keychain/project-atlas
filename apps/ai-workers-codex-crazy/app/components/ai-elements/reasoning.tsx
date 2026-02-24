"use client"

import { cn } from "@level/ui/lib/utils"
import { ChevronRight } from "@level/ui/components/icons"
import { useEffect, useRef, useState } from "react"

type ReasoningProps = {
  isStreaming: boolean
  reasoning: string
}

export function Reasoning({ isStreaming, reasoning }: ReasoningProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const wasStreamingRef = useRef(false)

  useEffect(() => {
    if (isStreaming && !wasStreamingRef.current) {
      setIsOpen(true)
      wasStreamingRef.current = true
    }
  }, [isStreaming])

  useEffect(() => {
    if (!isStreaming && wasStreamingRef.current) {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isStreaming])

  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [reasoning, isStreaming])

  if (!reasoning && !isStreaming) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-fit items-center gap-6 text-12 font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ChevronRight
          size={12}
          className={cn(
            "shrink-0 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
        <span className="flex items-center gap-6">
          {isStreaming && (
            <span className="relative flex h-6 w-6">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-interactive-primary opacity-75" />
              <span className="relative inline-flex h-6 w-6 rounded-full bg-interactive-primary" />
            </span>
          )}
          <span>{isStreaming ? "Thinking..." : "Thought process"}</span>
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            ref={contentRef}
            className="max-h-200 overflow-y-auto rounded-lg border border-border-subtle bg-surface-subtle px-12 py-10 text-12 leading-relaxed text-text-secondary"
          >
            {reasoning || "Analyzing your request..."}
          </div>
        </div>
      </div>
    </div>
  )
}
