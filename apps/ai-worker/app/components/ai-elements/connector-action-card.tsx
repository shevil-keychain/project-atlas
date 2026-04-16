"use client"

import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Check, X, Loading02 } from "@level/ui/components/icons"
import { getConnectorById } from "../../lib/connectors"

export type ToolCallStatus = "pending" | "sending" | "approved" | "rejected" | "error"

export type ToolCallData = {
  id: string
  toolName: string
  args: Record<string, string>
  status: ToolCallStatus
  errorMessage?: string
}

const toolDisplayInfo: Record<string, { action: string; pluginId: string }> = {
  slack_send_message: { action: "Send Slack message", pluginId: "slack" },
  slack_read_channel: { action: "Read Slack channel", pluginId: "slack" },
  slack_search: { action: "Search Slack", pluginId: "slack" },
}

function formatArgs(toolName: string, args: Record<string, string>): string[] {
  if (toolName === "slack_send_message") {
    const lines: string[] = []
    if (args.recipient) lines.push(`To: ${args.recipient}`)
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
  const argLines = formatArgs(toolCall.toolName, toolCall.args)
  const isPending = toolCall.status === "pending"
  const isSending = toolCall.status === "sending"
  const isApproved = toolCall.status === "approved"
  const isRejected = toolCall.status === "rejected"
  const isError = toolCall.status === "error"

  return (
    <div
      className={cn(
        "my-8 rounded-xl border transition-all duration-200",
        isPending && "border-brand-200 bg-brand-50",
        isSending && "border-brand-200 bg-brand-50",
        isApproved && "border-success-200 bg-success-50",
        isRejected && "border-border-subtle bg-surface-muted opacity-60",
        isError && "border-error-200 bg-error-50"
      )}
    >
      <div className="flex items-start gap-12 px-16 py-12">
        {connector && (
          <img
            src={connector.logoUrl}
            alt={connector.name}
            className="mt-2 h-24 w-24 shrink-0 object-contain"
          />
        )}
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

          {isPending && (
            <div className="mt-12 flex items-center gap-8">
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(toolCall.id)}
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
