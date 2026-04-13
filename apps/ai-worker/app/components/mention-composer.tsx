"use client"

import {
  type KeyboardEvent,
  type ClipboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react"
import { cn } from "@level/ui/lib/utils"
import {
  AlertTriangle,
  SearchMd,
  Star04,
  User01,
} from "@level/ui/components/icons"
import {
  allSystemWorkerLabels,
  customWorkers,
  workerIconByLabel,
} from "../lib/workers"

type MentionItem = {
  label: string
  isCustom: boolean
  iconSrc?: string
  iconBg?: string
  iconColor?: string
  iconName?: string
}

function getAllMentionItems(): MentionItem[] {
  const system: MentionItem[] = allSystemWorkerLabels.map((label) => ({
    label,
    isCustom: false,
    iconSrc: workerIconByLabel[label],
  }))

  const custom: MentionItem[] = customWorkers.map((cw) => ({
    label: cw.label,
    isCustom: true,
    iconBg: cw.iconBg,
    iconColor: cw.iconColor,
    iconName: cw.iconName,
  }))

  return [...system, ...custom]
}

function getCustomIcon(iconName: string, color: string, size = 14) {
  switch (iconName) {
    case "alert-triangle":
      return <AlertTriangle size={size} color={color} />
    case "search":
      return <SearchMd size={size} color={color} />
    case "user":
      return <User01 size={size} color={color} />
    default:
      return <Star04 size={size} color={color} />
  }
}

function WorkerIcon({ item, size = 16 }: { item: MentionItem; size?: number }) {
  if (item.isCustom) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded",
          item.iconBg
        )}
        style={{ width: size, height: size }}
      >
        {getCustomIcon(item.iconName ?? "zap", item.iconColor ?? "white", size - 4)}
      </span>
    )
  }
  return (
    <img
      src={item.iconSrc ?? "/ai-worker-avatar.svg"}
      alt=""
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}

const MENTION_MARKER = "\uFFF9"
const MENTION_END = "\uFFFA"

function encodeMention(workerLabel: string): string {
  return `${MENTION_MARKER}@${workerLabel}${MENTION_END}`
}

function parseMentions(text: string): { type: "text" | "mention"; value: string }[] {
  const parts: { type: "text" | "mention"; value: string }[] = []
  let remaining = text
  while (remaining.length > 0) {
    const startIdx = remaining.indexOf(MENTION_MARKER)
    if (startIdx === -1) {
      parts.push({ type: "text", value: remaining })
      break
    }
    if (startIdx > 0) {
      parts.push({ type: "text", value: remaining.slice(0, startIdx) })
    }
    const endIdx = remaining.indexOf(MENTION_END, startIdx)
    if (endIdx === -1) {
      parts.push({ type: "text", value: remaining.slice(startIdx) })
      break
    }
    const mentionContent = remaining.slice(startIdx + MENTION_MARKER.length + 1, endIdx)
    parts.push({ type: "mention", value: mentionContent })
    remaining = remaining.slice(endIdx + MENTION_END.length)
    continue
  }
  return parts
}

function getPlainText(value: string): string {
  return value.replace(new RegExp(`${MENTION_MARKER}@|${MENTION_END}`, "g"), "")
}

export type MentionComposerHandle = {
  focus: () => void
  insertMention: (workerLabel: string) => void
}

type MentionComposerProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  dropdownDirection?: "up" | "down"
}

export const MentionComposer = forwardRef<MentionComposerHandle, MentionComposerProps>(
  function MentionComposer({ value, onChange, onSubmit, placeholder, disabled, className, dropdownDirection = "down" }, ref) {
    const editorRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [mentionQuery, setMentionQuery] = useState("")
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const allItems = useMemo(getAllMentionItems, [])

    const valueRef = useRef(value)
    valueRef.current = value
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const isInternalUpdate = useRef(false)

    const filteredItems = useMemo(() => {
      if (!mentionQuery) return allItems
      const q = mentionQuery.toLowerCase()
      return allItems.filter((item) => item.label.toLowerCase().includes(q))
    }, [allItems, mentionQuery])

    useEffect(() => {
      setHighlightedIndex(0)
    }, [filteredItems])

    function createChipElement(workerLabel: string): HTMLSpanElement {
      const item = allItems.find((i) => i.label === workerLabel)
      const chip = document.createElement("span")
      chip.contentEditable = "false"
      chip.dataset.mention = workerLabel
      chip.className =
        "mention-chip inline-flex items-center gap-4 rounded-md bg-primary-brand-50 px-6 py-2 text-13 font-medium text-text-brand mx-2 cursor-default select-none"
      chip.style.verticalAlign = "middle"

      if (item) {
        const iconWrapper = document.createElement("span")
        iconWrapper.className = "inline-flex shrink-0 items-center"
        if (item.isCustom) {
          iconWrapper.innerHTML = `<span class="inline-flex items-center justify-center rounded ${item.iconBg ?? ""}" style="width:16px;height:16px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="${item.iconColor ?? "white"}" opacity="0.3"/></svg></span>`
        } else {
          iconWrapper.innerHTML = `<img src="${item.iconSrc ?? "/ai-worker-avatar.svg"}" alt="" style="width:16px;height:16px" class="object-contain" />`
        }
        chip.appendChild(iconWrapper)
      }

      const nameSpan = document.createElement("span")
      nameSpan.textContent = workerLabel
      chip.appendChild(nameSpan)

      return chip
    }

    function renderValueToEditor(val: string) {
      const el = editorRef.current
      if (!el) return

      const parts = parseMentions(val)
      el.innerHTML = ""

      if (parts.length === 0 || (parts.length === 1 && parts[0].type === "text" && parts[0].value === "")) {
        return
      }

      for (const part of parts) {
        if (part.type === "text") {
          el.appendChild(document.createTextNode(part.value))
        } else {
          const chip = createChipElement(part.value)
          el.appendChild(chip)
        }
      }
    }

    function placeCursorAtEnd() {
      const el = editorRef.current
      if (!el) return
      el.focus()
      const sel = window.getSelection()
      if (sel) {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }

    useEffect(() => {
      if (isInternalUpdate.current) {
        isInternalUpdate.current = false
        return
      }
      renderValueToEditor(value)
      if (value) {
        placeCursorAtEnd()
      }
    }, [value])

    useImperativeHandle(ref, () => ({
      focus: () => {
        editorRef.current?.focus()
      },
      insertMention: (workerLabel: string) => {
        const currentValue = valueRef.current
        const newValue = currentValue + encodeMention(workerLabel) + " "

        isInternalUpdate.current = true
        valueRef.current = newValue
        onChangeRef.current(newValue)

        renderValueToEditor(newValue)
        placeCursorAtEnd()
      },
    }))

    const extractValue = useCallback((): string => {
      const el = editorRef.current
      if (!el) return ""

      let result = ""
      for (const node of Array.from(el.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
          result += node.textContent ?? ""
        } else if (node instanceof HTMLElement && node.dataset.mention) {
          result += encodeMention(node.dataset.mention)
        }
      }
      return result
    }, [])

    function getTextBeforeCursor(el: HTMLElement, sel: Selection): string {
      const range = sel.getRangeAt(0)
      let text = ""

      for (const node of Array.from(el.childNodes)) {
        if (node === range.startContainer) {
          text += (node.textContent ?? "").slice(0, range.startOffset)
          break
        }

        if (node.contains(range.startContainer)) {
          break
        }

        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent ?? ""
        }
      }

      return text
    }

    const handleInput = useCallback(() => {
      const el = editorRef.current
      if (!el) return

      const newValue = extractValue()
      isInternalUpdate.current = true
      valueRef.current = newValue
      onChangeRef.current(newValue)

      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) {
        setShowDropdown(false)
        return
      }

      const textBeforeCursor = getTextBeforeCursor(el, sel)
      const atMatch = textBeforeCursor.match(/@([^\s@]*)$/)

      if (atMatch) {
        setMentionQuery(atMatch[1])
        setShowDropdown(true)

        const range = sel.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const editorRect = el.getBoundingClientRect()
        if (dropdownDirection === "up") {
          setDropdownPosition({
            top: rect.top - editorRect.top,
            left: rect.left - editorRect.left,
          })
        } else {
          setDropdownPosition({
            top: rect.bottom - editorRect.top + 4,
            left: rect.left - editorRect.left,
          })
        }
      } else {
        setShowDropdown(false)
      }
    }, [extractValue])

    const selectMention = useCallback(
      (item: MentionItem) => {
        const el = editorRef.current
        if (!el) return

        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return

        const range = sel.getRangeAt(0)
        const container = range.startContainer
        if (container.nodeType !== Node.TEXT_NODE) return

        const textNode = container as Text
        const cursorOffset = range.startOffset
        const fullText = textNode.textContent ?? ""

        const textUpToCursor = fullText.slice(0, cursorOffset)
        const atMatch = textUpToCursor.match(/@([^\s@]*)$/)
        if (!atMatch) return

        const matchStart = cursorOffset - atMatch[0].length
        const afterText = fullText.slice(cursorOffset)
        textNode.textContent = fullText.slice(0, matchStart)

        const chip = createChipElement(item.label)
        const space = document.createTextNode("\u00A0")
        const afterNode = afterText ? document.createTextNode(afterText) : null

        const parent = textNode.parentNode!
        const ref = textNode.nextSibling
        parent.insertBefore(chip, ref)
        parent.insertBefore(space, ref)
        if (afterNode) {
          parent.insertBefore(afterNode, ref)
        }

        const newRange = document.createRange()
        newRange.setStartAfter(space)
        newRange.collapse(true)
        sel.removeAllRanges()
        sel.addRange(newRange)

        setShowDropdown(false)
        setMentionQuery("")

        const newValue = extractValue()
        isInternalUpdate.current = true
        valueRef.current = newValue
        onChangeRef.current(newValue)
      },
      [extractValue, allItems]
    )

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (showDropdown && filteredItems.length > 0) {
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setHighlightedIndex((prev) => (prev + 1) % filteredItems.length)
            return
          }
          if (event.key === "ArrowUp") {
            event.preventDefault()
            setHighlightedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
            return
          }
          if (event.key === "Enter") {
            event.preventDefault()
            selectMention(filteredItems[highlightedIndex])
            return
          }
          if (event.key === "Escape") {
            event.preventDefault()
            setShowDropdown(false)
            return
          }
        }

        if (event.key === "Enter" && !event.shiftKey && !showDropdown) {
          event.preventDefault()
          onSubmit()
        }
      },
      [showDropdown, filteredItems, highlightedIndex, selectMention, onSubmit]
    )

    const handlePaste = useCallback((event: ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      const text = event.clipboardData.getData("text/plain")
      document.execCommand("insertText", false, text)
    }, [])

    useEffect(() => {
      if (!showDropdown) return
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showDropdown])

    useEffect(() => {
      if (showDropdown && dropdownRef.current) {
        const highlighted = dropdownRef.current.querySelector("[data-highlighted='true']")
        highlighted?.scrollIntoView({ block: "nearest" })
      }
    }, [highlightedIndex, showDropdown])

    const showPlaceholder = !value || getPlainText(value).trim() === ""

    return (
      <div className={cn("relative", className)}>
        {showPlaceholder && placeholder && (
          <div className="pointer-events-none absolute px-0 py-8 text-14 leading-relaxed text-text-tertiary">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline
          className={cn(
            "h-72 min-h-72 resize-none overflow-auto whitespace-pre-wrap break-words border-none bg-transparent px-0 py-8 text-14 leading-relaxed text-text-primary outline-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />

        {showDropdown && filteredItems.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 max-h-[280px] w-[260px] overflow-auto rounded-xl border border-border-default bg-surface-card p-4 shadow-lg"
            style={
              dropdownDirection === "up"
                ? { bottom: `calc(100% - ${dropdownPosition.top}px + 4px)`, left: dropdownPosition.left }
                : { top: dropdownPosition.top, left: dropdownPosition.left }
            }
          >
            {filteredItems.map((item, index) => (
              <button
                key={item.label}
                type="button"
                data-highlighted={index === highlightedIndex}
                className={cn(
                  "flex w-full items-center gap-10 rounded-lg px-10 py-8 text-left transition-colors",
                  index === highlightedIndex
                    ? "bg-interactive-secondary"
                    : "hover:bg-interactive-secondary"
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectMention(item)
                }}
              >
                <WorkerIcon item={item} size={24} />
                <span className="min-w-0 truncate text-14 font-medium text-text-primary">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

export { encodeMention, parseMentions, getPlainText }
