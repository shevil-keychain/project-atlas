"use client"

import { useState } from "react"
import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Check, Loading02 } from "@level/ui/components/icons"
import { getConnectorById } from "../../lib/connectors"

export type ToolCallStatus = "pending" | "sending" | "approved" | "rejected" | "error"

export type ResolvedCandidate = {
  userId: string
  name: string
  avatar: string | null
  score: number
}

export type ResolvedRecipient = {
  found: boolean
  name?: string
  avatar?: string | null
  userId?: string
  ambiguous?: boolean
  candidates?: ResolvedCandidate[]
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
  selectedUserId?: string
  selectedUserName?: string
}

const toolDisplayInfo: Record<string, { action: string; pluginId: string }> = {
  slack_send_message: { action: "Send Slack message", pluginId: "slack" },
  slack_read_channel: { action: "Read Slack channel", pluginId: "slack" },
  slack_search: { action: "Search Slack", pluginId: "slack" },
}

function formatArgs(
  toolName: string,
  args: Record<string, string>,
  resolvedRecipient?: ResolvedRecipient,
  selectedUserName?: string,
): string[] {
  if (toolName === "slack_send_message") {
    const lines: string[] = []
    if (args.message) lines.push(args.message)
    return lines
  }
  return Object.entries(args).map(([k, v]) => `${k}: ${v}`)
}

type ConnectorActionCardProps = {
  toolCall: ToolCallData
  onApprove: (id: string, selectedUserId?: string) => void
  onReject: (id: string) => void
}

export function ConnectorActionCard({ toolCall, onApprove, onReject }: ConnectorActionCardProps) {
  const [pickedUserId, setPickedUserId] = useState<string | null>(null)

  const info = toolDisplayInfo[toolCall.toolName]
  const connector = info ? getConnectorById(info.pluginId) : null
  const actionLabel = info?.action ?? toolCall.toolName
  const argLines = formatArgs(toolCall.toolName, toolCall.args, toolCall.resolvedRecipient, toolCall.selectedUserName)
  const isPending = toolCall.status === "pending"
  const isSending = toolCall.status === "sending"
  const isApproved = toolCall.status === "approved"
  const isRejected = toolCall.status === "rejected"
  const isError = toolCall.status === "error"

  const resolved = toolCall.resolvedRecipient
  const isSlackSend = toolCall.toolName === "slack_send_message"
  const hasCandidates = resolved?.candidates && resolved.candidates.length > 0
  const isAmbiguous = resolved && !resolved.found && !resolved.error && hasCandidates
  const isSingleMatch = resolved?.found === true
  const hasApiError = resolved && !resolved.found && !!resolved.error
  const isAuthError = hasApiError && (resolved.error!.includes("invalid_auth") || resolved.error!.includes("token_revoked") || resolved.error!.includes("not_authed"))
  const noMatch = resolved && !resolved.found && !hasCandidates && !hasApiError

  const displayRecipient = toolCall.selectedUserName
    ?? (isSingleMatch ? resolved.name : null)
    ?? toolCall.args.recipient

  const displayAvatar = isSingleMatch ? resolved.avatar : null

  const effectiveUserId = pickedUserId
    ?? toolCall.selectedUserId
    ?? (isSingleMatch ? resolved.userId : null)

  return (
    <div
      className={cn(
        "my-8 rounded-xl border transition-all duration-200",
        (noMatch || hasApiError) && isPending && "border-warning-300 bg-warning-50",
        isAmbiguous && isPending && "border-brand-200 bg-brand-50",
        !noMatch && !isAmbiguous && !hasApiError && isPending && "border-brand-200 bg-brand-50",
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

          {argLines.length > 0 && (
            <div className="mt-4 space-y-2">
              {argLines.map((line, i) => (
                <p key={i} className="text-12 text-text-secondary">{line}</p>
              ))}
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

          {isAmbiguous && isPending && resolved.candidates && (
            <div className="mt-10">
              <p className="mb-8 text-12 font-medium text-text-secondary">
                Multiple people found — who should this go to?
              </p>
              <div className="flex flex-col gap-4">
                {resolved.candidates.map((c) => {
                  const isSelected = (pickedUserId ?? toolCall.selectedUserId) === c.userId
                  return (
                    <button
                      key={c.userId}
                      type="button"
                      onClick={() => setPickedUserId(c.userId)}
                      className={cn(
                        "flex items-center gap-10 rounded-lg px-10 py-8 text-left transition-all",
                        isSelected
                          ? "bg-brand-100 ring-1 ring-brand-400"
                          : "bg-surface-primary hover:bg-surface-card"
                      )}
                    >
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-28 w-28 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-surface-muted text-11 font-semibold text-text-tertiary">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-13 font-medium text-text-primary">{c.name}</span>
                      {isSelected && (
                        <Check size={14} className="ml-auto text-brand-600" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {isPending && (
            <div className="mt-12 flex items-center gap-8">
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(toolCall.id, effectiveUserId ?? undefined)}
                disabled={!!noMatch || !!hasApiError || (!!isAmbiguous && !pickedUserId && !toolCall.selectedUserId)}
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
