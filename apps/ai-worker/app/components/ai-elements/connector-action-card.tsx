"use client"

import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Check, Loading02 } from "@level/ui/components/icons"
import { getConnectorById } from "../../lib/connectors"

export type ToolCallStatus = "pending" | "sending" | "approved" | "rejected" | "error"

export type ResolvedRecipient = {
  found: boolean
  name?: string
  avatar?: string | null
  suggestions?: Array<{ name: string; avatar: string | null; score: number }>
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

function formatArgs(toolName: string, args: Record<string, string>, resolvedRecipient?: ResolvedRecipient): string[] {
  if (toolName === "slack_send_message") {
    const lines: string[] = []
    if (args.recipient) {
      const displayName = resolvedRecipient?.found && resolvedRecipient.name
        ? resolvedRecipient.name
        : args.recipient
      lines.push(`To: ${displayName}`)
    }
    if (args.message) lines.push(`Message: ${args.message}`)
    return lines
  }
  return Object.entries(args).map(([k, v]) => `${k}: ${v}`)
}

type ConnectorActionCardProps = {
  toolCall: ToolCallData
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function ConnectorActionCard({ toolCall, onApprove, onReject }: ConnectorActionCardProps) {
  const info = toolDisplayInfo[toolCall.toolName]
  const connector = info ? getConnectorById(info.pluginId) : null
  const actionLabel = info?.action ?? toolCall.toolName
  const argLines = formatArgs(toolCall.toolName, toolCall.args, toolCall.resolvedRecipient)
  const isPending = toolCall.status === "pending"
  const isSending = toolCall.status === "sending"
  const isApproved = toolCall.status === "approved"
  const isRejected = toolCall.status === "rejected"
  const isError = toolCall.status === "error"

  const resolved = toolCall.resolvedRecipient
  const recipientNotFound = resolved && !resolved.found
  const recipientAvatar = resolved?.found ? resolved.avatar : null

  return (
    <div
      className={cn(
        "my-8 rounded-xl border transition-all duration-200",
        recipientNotFound && isPending && "border-warning-300 bg-warning-50",
        !recipientNotFound && isPending && "border-brand-200 bg-brand-50",
        isSending && "border-brand-200 bg-brand-50",
        isApproved && "border-success-200 bg-success-50",
        isRejected && "border-border-subtle bg-surface-muted opacity-60",
        isError && "border-error-200 bg-error-50"
      )}
    >
      <div className="flex items-start gap-12 px-16 py-12">
        {recipientAvatar ? (
          <img
            src={recipientAvatar}
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

          {argLines.length > 0 && (
            <div className="mt-6 space-y-2">
              {argLines.map((line, i) => (
                <p key={i} className="text-12 text-text-secondary">{line}</p>
              ))}
            </div>
          )}

          {isError && toolCall.errorMessage && (
            <p className="mt-6 text-12 text-error-600">{toolCall.errorMessage}</p>
          )}

          {recipientNotFound && isPending && (
            <div className="mt-8 rounded-lg bg-warning-100 px-10 py-6">
              <p className="text-12 font-medium text-warning-800">
                Could not find &quot;{toolCall.args.recipient}&quot; in Slack.
                {resolved.suggestions && resolved.suggestions.length > 0 && (
                  <span> Closest matches: {resolved.suggestions.map((s) => s.name).join(", ")}</span>
                )}
              </p>
            </div>
          )}

          {isPending && (
            <div className="mt-12 flex items-center gap-8">
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(toolCall.id)}
                disabled={!!recipientNotFound}
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
