"use client"

import { useState } from "react"
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

type ConnectorActionCardProps = {
  toolCall: ToolCallData
  onApprove: (id: string, selectedUserId?: string, editedMessage?: string) => void
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

  const originalMessage = isSlackSend
    ? toolCall.args.message ?? ""
    : Object.entries(toolCall.args).map(([k, v]) => `${k}: ${v}`).join("\n")

  const [editedMessage, setEditedMessage] = useState(originalMessage)

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

          {originalMessage && (
            <div className="mt-12">
              {isPending ? (
                <textarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="w-full resize-none rounded-lg border border-border-subtle bg-white/60 px-12 py-10 text-12 leading-relaxed text-text-tertiary outline-none transition-colors focus:border-brand-300 focus:ring-1 focus:ring-brand-200"
                  style={{ maxHeight: 160, overflowY: "auto" }}
                  rows={Math.min(editedMessage.split("\n").length, 6)}
                />
              ) : (
                <p className="whitespace-pre-wrap text-12 leading-relaxed text-text-tertiary" style={{ maxHeight: 120, overflowY: "auto" }}>
                  {editedMessage}
                </p>
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
                onClick={() => onApprove(toolCall.id, resolvedUserId, editedMessage)}
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
