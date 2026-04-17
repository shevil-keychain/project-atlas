"use client"

import { useState, useMemo } from "react"
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

function renderSlackMrkdwn(text: string): string {
  const lines = text.split("\n")
  const htmlParts: string[] = []
  let inList = false

  for (const raw of lines) {
    const line = escapeHtml(raw)

    if (/^[-•]\s/.test(raw)) {
      if (!inList) { htmlParts.push("<ul>"); inList = true }
      const content = formatInline(line.replace(/^[-•]\s*/, ""))
      htmlParts.push(`<li>${content}</li>`)
      continue
    }
    if (/^\d+\.\s/.test(raw)) {
      if (!inList) { htmlParts.push("<ol>"); inList = true }
      const content = formatInline(line.replace(/^\d+\.\s*/, ""))
      htmlParts.push(`<li>${content}</li>`)
      continue
    }

    if (inList) {
      htmlParts.push(inList ? "</ul>" : "</ol>")
      inList = false
    }

    if (!line.trim()) {
      htmlParts.push("<br/>")
    } else {
      htmlParts.push(`<p>${formatInline(line)}</p>`)
    }
  }

  if (inList) htmlParts.push("</ul>")
  return htmlParts.join("")
}

function formatInline(text: string): string {
  return text
    .replace(/\*([^*]+)\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/~([^~]+)~/g, "<s>$1</s>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
}

type ConnectorActionCardProps = {
  toolCall: ToolCallData
  onApprove: (id: string, selectedUserId?: string) => void
  onReject: (id: string) => void
}

export function ConnectorActionCard({ toolCall, onApprove, onReject }: ConnectorActionCardProps) {
  const info = toolDisplayInfo[toolCall.toolName]
  const connector = info ? getConnectorById(info.pluginId) : null
  const actionLabel = info?.action ?? toolCall.toolName
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
  const displayAvatar = isSingleMatch ? resolved.avatar : null
  const resolvedUserId = isSingleMatch ? resolved.userId : undefined

  const [expanded, setExpanded] = useState(false)

  const messageText = isSlackSend
    ? toolCall.args.message ?? ""
    : Object.entries(toolCall.args).map(([k, v]) => `${k}: ${v}`).join("\n")

  const renderedMessage = useMemo(() => renderSlackMrkdwn(messageText), [messageText])
  const isLong = messageText.split("\n").length > 5 || messageText.length > 400

  return (
    <div
      className={cn(
        "my-8 rounded-xl border transition-all duration-200",
        (noMatch || hasApiError) && isPending && "border-warning-300 bg-warning-50",
        !noMatch && !hasApiError && isPending && "border-brand-200 bg-brand-50",
        isSending && "border-brand-200 bg-brand-50",
        isApproved && "border-success-200 bg-success-50",
        isRejected && "border-border-subtle bg-surface-muted opacity-60",
        isError && "border-error-200 bg-error-50"
      )}
    >
      <div className="flex items-start gap-12 px-16 py-12">
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt="Recipient"
            className="mt-2 h-28 w-28 shrink-0 rounded-full object-cover"
          />
        ) : connector ? (
          <img
            src={connector.logoUrl}
            alt={connector.name}
            className="mt-2 h-24 w-24 shrink-0 object-contain"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-8">
            <span className="text-13 font-semibold text-text-primary">{actionLabel}</span>
            {isSending && (
              <span className="flex items-center gap-4 text-11 font-medium text-brand-600">
                <Loading02 size={12} className="animate-spin" /> Sending...
              </span>
            )}
            {isApproved && (
              <span className="flex items-center gap-4 text-11 font-medium text-success-700">
                <Check size={12} /> Sent
              </span>
            )}
            {isRejected && (
              <span className="text-11 font-medium text-text-tertiary">Cancelled</span>
            )}
            {isError && (
              <span className="text-11 font-medium text-error-600">Failed</span>
            )}
          </div>

          {isSlackSend && displayRecipient && (
            <p className="mt-4 text-12 text-text-secondary">To: {displayRecipient}</p>
          )}

          {messageText && (
            <div className="mt-16">
              <div
                className={cn(
                  "slack-preview text-12 leading-relaxed text-text-tertiary",
                  !expanded && isLong && "line-clamp-5"
                )}
                dangerouslySetInnerHTML={{ __html: renderedMessage }}
              />
              {isLong && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="mt-12 mb-4 text-12 font-medium text-brand-600 hover:text-brand-700"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          {isError && toolCall.errorMessage && (
            <p className="mt-6 text-12 text-error-600">{toolCall.errorMessage}</p>
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

          {isPending && (
            <div className="mt-12 flex items-center gap-8">
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(toolCall.id, resolvedUserId)}
                disabled={!!noMatch || !!hasApiError}
              >
                Send
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReject(toolCall.id)}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
