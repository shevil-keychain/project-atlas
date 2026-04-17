"use client"

import { useRef, useMemo, useCallback } from "react"
import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Check, Loading02 } from "@level/ui/components/icons"
import { getConnectorById } from "../../lib/connectors"

export type ToolCallStatus = "pending" | "sending" | "approved" | "rejected" | "error"

export type ResolvedRecipient = {
  found: boolean
  name?: string
  avatar?: string | null
  userId?: string
  error?: string
  totalUsers?: number
}

export type ToolCallData = {
  id: string
  toolName: string
  args: Record<string, string>
  status: ToolCallStatus
  errorMessage?: string
  resolvedRecipient?: ResolvedRecipient
}

const toolDisplayInfo: Record<string, { action: string; pluginId: string }> = {
  slack_send_message: { action: "Send Slack message", pluginId: "slack" },
  slack_read_channel: { action: "Read Slack channel", pluginId: "slack" },
  slack_search: { action: "Search Slack", pluginId: "slack" },
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function formatInline(text: string): string {
  return text
    .replace(/\*([^*]+)\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/~([^~]+)~/g, "<s>$1</s>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
}

function renderSlackMrkdwn(text: string): string {
  const lines = text.split("\n")
  const htmlParts: string[] = []
  let inList: "ul" | "ol" | null = null

  for (const raw of lines) {
    const line = escapeHtml(raw)

    if (/^[-•]\s/.test(raw)) {
      if (inList !== "ul") {
        if (inList) htmlParts.push(`</${inList}>`)
        htmlParts.push("<ul>")
        inList = "ul"
      }
      htmlParts.push(`<li>${formatInline(line.replace(/^[-•]\s*/, ""))}</li>`)
      continue
    }
    if (/^\d+\.\s/.test(raw)) {
      if (inList !== "ol") {
        if (inList) htmlParts.push(`</${inList}>`)
        htmlParts.push("<ol>")
        inList = "ol"
      }
      htmlParts.push(`<li>${formatInline(line.replace(/^\d+\.\s*/, ""))}</li>`)
      continue
    }

    if (inList) {
      htmlParts.push(`</${inList}>`)
      inList = null
    }

    if (!line.trim()) {
      htmlParts.push("<br/>")
    } else {
      htmlParts.push(`<p>${formatInline(line)}</p>`)
    }
  }

  if (inList) htmlParts.push(`</${inList}>`)
  return htmlParts.join("")
}

type ConnectorActionCardProps = {
  toolCall: ToolCallData
  onApprove: (id: string, selectedUserId?: string, editedMessage?: string) => void
  onReject: (id: string) => void
}

export function ConnectorActionCard({ toolCall, onApprove, onReject }: ConnectorActionCardProps) {
  const info = toolDisplayInfo[toolCall.toolName]
  const connector = info ? getConnectorById(info.pluginId) : null
  const isPending = toolCall.status === "pending"
  const isSending = toolCall.status === "sending"
  const isApproved = toolCall.status === "approved"
  const isRejected = toolCall.status === "rejected"
  const isError = toolCall.status === "error"

  const resolved = toolCall.resolvedRecipient
  const isSlackSend = toolCall.toolName === "slack_send_message"
  const isSingleMatch = resolved?.found === true
  const hasApiError = resolved && !resolved.found && !!resolved.error
  const isAuthError = hasApiError && (resolved.error!.includes("invalid_auth") || resolved.error!.includes("token_revoked") || resolved.error!.includes("not_authed"))
  const noMatch = resolved && !resolved.found && !hasApiError

  const displayRecipient = isSingleMatch ? resolved.name : toolCall.args.recipient
  const resolvedUserId = isSingleMatch ? resolved.userId : undefined

  const originalMessage = isSlackSend
    ? toolCall.args.message ?? ""
    : Object.entries(toolCall.args).map(([k, v]) => `${k}: ${v}`).join("\n")

  const contentRef = useRef<HTMLDivElement>(null)
  const renderedHtml = useMemo(() => renderSlackMrkdwn(originalMessage), [originalMessage])

  const getEditedMessage = useCallback(() => {
    if (!contentRef.current) return originalMessage
    return contentRef.current.innerText
  }, [originalMessage])

  const pluginName = connector?.name ?? "Action"

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-xl border transition-all duration-200",
        (noMatch || hasApiError) && isPending && "border-warning-300",
        !noMatch && !hasApiError && isPending && "border-border-default",
        isSending && "border-border-default",
        isApproved && "border-success-200",
        isRejected && "border-border-subtle opacity-60",
        isError && "border-error-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-8 border-b border-border-subtle px-16 py-10">
        {connector && (
          <img
            src={connector.logoUrl}
            alt={connector.name}
            className="h-18 w-18 shrink-0 object-contain"
          />
        )}
        <span className="text-13 font-semibold text-text-primary">{pluginName}</span>

        {isSending && (
          <span className="ml-auto flex items-center gap-4 text-11 font-medium text-brand-600">
            <Loading02 size={12} className="animate-spin" /> Sending...
          </span>
        )}
        {isApproved && (
          <span className="ml-auto flex items-center gap-4 text-11 font-medium text-success-700">
            <Check size={12} /> Sent
          </span>
        )}
        {isRejected && (
          <span className="ml-auto text-11 font-medium text-text-tertiary">Cancelled</span>
        )}
        {isError && (
          <span className="ml-auto text-11 font-medium text-error-600">Failed</span>
        )}
      </div>

      <div className="px-16 py-12">
        {/* Recipient */}
        {isSlackSend && displayRecipient && (
          <div className="flex items-center gap-6 pb-12">
            <span className="text-12 text-text-secondary">To:</span>
            <span className="rounded-md border border-border-subtle bg-surface-muted px-8 py-2 text-12 font-medium text-text-primary">
              @{displayRecipient}
            </span>
          </div>
        )}

        {/* Message body */}
        {originalMessage && (
          <div
            ref={contentRef}
            contentEditable={isPending}
            suppressContentEditableWarning
            className={cn(
              "action-card-body rounded-lg border border-border-subtle px-12 py-10 text-13 leading-relaxed text-text-primary outline-none",
              isPending && "bg-[#faf8f3] focus:border-brand-300 focus:ring-1 focus:ring-brand-200",
              !isPending && "bg-surface-muted"
            )}
            style={{ maxHeight: 180, overflowY: "auto" }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}

        {/* Errors */}
        {isError && toolCall.errorMessage && (
          <p className="mt-8 text-12 text-error-600">{toolCall.errorMessage}</p>
        )}

        {hasApiError && isPending && (
          <div className="mt-8 rounded-lg bg-warning-100 px-10 py-6">
            {isAuthError ? (
              <p className="text-12 font-medium text-warning-800">
                Slack connection expired or invalid. Please re-install the Slack plugin from the Plugins tab.
              </p>
            ) : (
              <p className="text-12 font-medium text-warning-800">
                Slack API error: {resolved.error}
              </p>
            )}
          </div>
        )}

        {noMatch && isPending && (
          <div className="mt-8 rounded-lg bg-warning-100 px-10 py-6">
            <p className="text-12 font-medium text-warning-800">
              Could not find &quot;{toolCall.args.recipient}&quot; in Slack
              {resolved.totalUsers != null && ` (searched ${resolved.totalUsers} users)`}.
            </p>
          </div>
        )}

        {/* Footer */}
        {isPending && (
          <div className="mt-10 flex items-center justify-between">
            <span className="text-11 text-text-tertiary">
              Tip: Use standard Markdown (e.g., **bold** for bold).
            </span>
            <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReject(toolCall.id)}
              >
                Reject
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(toolCall.id, resolvedUserId, getEditedMessage())}
                disabled={!!noMatch || !!hasApiError}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
