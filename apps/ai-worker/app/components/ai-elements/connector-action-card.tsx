"use client"

import { useState } from "react"
import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Textarea } from "@level/ui/components/ui/textarea"
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

  const pluginName = connector?.name ?? "Action"

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-xl border bg-white transition-all duration-200",
        (noMatch || hasApiError) && isPending && "border-warning-300",
        !noMatch && !hasApiError && isPending && "border-border-default",
        isSending && "border-border-default",
        isApproved && "border-success-200",
        isRejected && "border-border-subtle opacity-60",
        isError && "border-error-200"
      )}
    >
      {/* Header: avatar + name + plugin logo */}
      <div className="flex items-center gap-10 px-16 py-10">
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={displayRecipient ?? "Recipient"}
            className="h-28 w-28 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-surface-muted text-12 font-semibold text-text-secondary">
            {(displayRecipient ?? "?").charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-6">
            <span className="text-13 font-semibold text-text-primary">
              {displayRecipient ?? pluginName}
            </span>
            {connector && (
              <img
                src={connector.logoUrl}
                alt={connector.name}
                className="h-14 w-14 shrink-0 object-contain"
              />
            )}
          </div>
          <p className="text-11 text-text-tertiary">via {pluginName}</p>
        </div>

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

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      <div className="px-16 py-12">
        {/* Message body */}
        {originalMessage && (
          isPending ? (
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="text-13 leading-relaxed"
              style={{ minHeight: 80, maxHeight: 200 }}
            />
          ) : (
            <p
              className="whitespace-pre-wrap text-13 leading-relaxed text-text-primary"
              style={{ maxHeight: 160, overflowY: "auto" }}
            >
              {editedMessage}
            </p>
          )
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
          <div className="mt-10 flex items-center justify-end gap-8">
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
              onClick={() => onApprove(toolCall.id, resolvedUserId, editedMessage)}
              disabled={!!noMatch || !!hasApiError}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
