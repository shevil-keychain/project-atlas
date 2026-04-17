"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@level/ui/lib/utils"
import { Button } from "@level/ui/components/ui/button"
import { Badge } from "@level/ui/components/ui/badge"
import { Input } from "@level/ui/components/ui/input"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@level/ui/components/ui/modal"
import { SearchMd, Plus, Check, PuzzlePiece01, X } from "@level/ui/components/icons"
import { connectors, type ConnectorDefinition } from "../lib/connectors"

type PluginsPageProps = {
  installedConnectors: string[]
  onInstall: (connectorId: string, token?: string) => void
  onUninstall: (connectorId: string) => void
}

function PluginLogo({ plugin, size = 28 }: { plugin: ConnectorDefinition; size?: number }) {
  if (!plugin.logoUrl) {
    return (
      <div
        className="flex shrink-0 items-center justify-center text-text-primary"
        style={{ width: size, height: size }}
      >
        <PuzzlePiece01 size={size * 0.7} />
      </div>
    )
  }
  return (
    <img
      src={plugin.logoUrl}
      alt={`${plugin.name} logo`}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}

function PluginRow({
  plugin,
  isInstalled,
  onInstallClick,
  onUninstallClick,
}: {
  plugin: ConnectorDefinition
  isInstalled: boolean
  onInstallClick: () => void
  onUninstallClick: () => void
}) {
  const isComingSoon = plugin.status === "coming_soon"
  const isCustom = plugin.status === "custom"

  return (
    <div className="flex items-center gap-16 rounded-xl border border-border-subtle px-20 py-16 transition-colors hover:bg-surface-card">
      <div className="flex w-28 shrink-0 items-center justify-center">
        <PluginLogo plugin={plugin} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-14 font-semibold text-text-primary">{plugin.name}</p>
        <p className="mt-2 text-12 text-text-secondary">{plugin.description}</p>
      </div>
      <div className="shrink-0">
        {isCustom ? (
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<Plus size={14} />}
            disabled
          >
            Create
          </Button>
        ) : isComingSoon ? (
          <Badge color="gray" size="sm">Coming soon</Badge>
        ) : isInstalled ? (
          <div className="flex items-center gap-8">
            <Badge color="primary" size="sm" icon={<Check size={12} />}>Installed</Badge>
            <button
              type="button"
              onClick={onUninstallClick}
              className="flex h-24 w-24 items-center justify-center rounded-md text-icon-primary transition-colors hover:bg-error-50 hover:text-error-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<Plus size={14} />}
            onClick={onInstallClick}
          >
            Install
          </Button>
        )}
      </div>
    </div>
  )
}

export function PluginsPage({
  installedConnectors,
  onInstall,
  onUninstall,
}: PluginsPageProps) {
  const [searchValue, setSearchValue] = useState("")
  const [installDialogPlugin, setInstallDialogPlugin] = useState<ConnectorDefinition | null>(null)

  const filtered = connectors.filter((c) => {
    if (!searchValue.trim()) return true
    const q = searchValue.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    )
  })

  const handleOAuthMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data?.type === "slack_oauth_success" && event.data.token) {
        localStorage.setItem("slack_token", event.data.token)
        onInstall("slack", event.data.token)
      }
    },
    [onInstall]
  )

  useEffect(() => {
    window.addEventListener("message", handleOAuthMessage)
    return () => window.removeEventListener("message", handleOAuthMessage)
  }, [handleOAuthMessage])

  const handleInstallClick = (plugin: ConnectorDefinition) => {
    if (plugin.id === "slack") {
      window.open("/api/slack/auth", "_blank", "width=600,height=700")
    } else {
      setInstallDialogPlugin(plugin)
    }
  }

  const handleInstallConfirm = () => {
    if (installDialogPlugin) {
      onInstall(installDialogPlugin.id)
      setInstallDialogPlugin(null)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto w-full max-w-[640px] flex-1 overflow-auto px-24 py-40">
        <h1 className="text-24 font-bold text-text-primary">Plugins</h1>
        <p className="mt-4 text-14 text-text-secondary">
          Connect your tools to let AI workers take actions on your behalf.
        </p>

        <div className="relative mt-24">
          <SearchMd size={16} className="absolute left-12 top-1/2 -translate-y-1/2 text-icon-tertiary" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search plugins..."
            className="pl-36"
          />
        </div>

        <div className="mt-24 flex flex-col gap-8">
          {filtered.map((plugin) => (
            <PluginRow
              key={plugin.id}
              plugin={plugin}
              isInstalled={installedConnectors.includes(plugin.id)}
              onInstallClick={() => handleInstallClick(plugin)}
              onUninstallClick={() => onUninstall(plugin.id)}
            />
          ))}

          {filtered.length === 0 && (
            <p className="py-40 text-center text-14 text-text-tertiary">
              No plugins found matching &ldquo;{searchValue}&rdquo;
            </p>
          )}
        </div>
      </div>

      <Dialog
        open={installDialogPlugin !== null}
        onOpenChange={(open) => { if (!open) setInstallDialogPlugin(null) }}
      >
        {installDialogPlugin && (
          <DialogContent size="sm">
            <DialogHeader>
              <div className="flex items-center gap-12">
                <PluginLogo plugin={installDialogPlugin} size={28} />
                <div>
                  <p className="text-16 font-semibold text-text-primary">
                    {installDialogPlugin.name}
                  </p>
                  <p className="text-12 text-text-tertiary">
                    by {installDialogPlugin.developer}
                  </p>
                </div>
              </div>
            </DialogHeader>
            <DialogBody className="py-20">
              <p className="text-14 leading-relaxed text-text-primary">
                {installDialogPlugin.description}
              </p>

              {installDialogPlugin.capabilities.length > 0 && (
                <div className="mt-20">
                  <p className="text-10 font-semibold uppercase tracking-wider text-text-tertiary">
                    Capabilities
                  </p>
                  <ul className="mt-12 space-y-8">
                    {installDialogPlugin.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-10 text-14 leading-snug text-text-primary">
                        <Check size={14} className="mt-2 shrink-0 text-success-600" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-20 rounded-lg bg-surface-muted px-14 py-10">
                <p className="text-12 leading-relaxed text-text-secondary">
                  By installing, you allow AI workers to use this plugin on your behalf.
                  Actions always require your confirmation before executing.
                </p>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setInstallDialogPlugin(null)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleInstallConfirm}
              >
                Install {installDialogPlugin.name}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
