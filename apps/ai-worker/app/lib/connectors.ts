export type ConnectorStatus = "available" | "coming_soon" | "custom"

export type ConnectorTool = {
  name: string
  description: string
}

export type ConnectorDefinition = {
  id: string
  name: string
  description: string
  developer: string
  logoUrl: string
  status: ConnectorStatus
  tools: ConnectorTool[]
  capabilities: string[]
}

export type InstalledConnector = {
  id: string
  installedAt: number
  enabled: boolean
}

export const connectors: ConnectorDefinition[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, read channels, and search conversations in Slack.",
    developer: "Level AI",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    status: "available",
    tools: [
      { name: "slack_send_message", description: "Send a message to a Slack channel or user" },
      { name: "slack_read_channel", description: "Read recent messages from a channel" },
      { name: "slack_search", description: "Search for messages across channels" },
    ],
    capabilities: [
      "Send messages to channels and users",
      "Read and summarize channel conversations",
      "Search across your Slack workspace",
      "Create and share thread summaries",
    ],
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Read, draft, and send emails through Gmail.",
    developer: "Level AI",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    status: "coming_soon",
    tools: [],
    capabilities: [],
  },
  {
    id: "jira",
    name: "Jira",
    description: "Create tickets, update issues, and track projects in Jira.",
    developer: "Level AI",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    status: "coming_soon",
    tools: [],
    capabilities: [],
  },
  {
    id: "custom",
    name: "Custom plugin",
    description: "Build your own plugin to connect any tool or service.",
    developer: "You",
    logoUrl: "",
    status: "custom",
    tools: [],
    capabilities: [],
  },
]

export const getConnectorById = (id: string) =>
  connectors.find((c) => c.id === id)

export const getAvailableConnectors = () =>
  connectors.filter((c) => c.status === "available")

export const getInstalledConnectorTools = (installedIds: string[]) =>
  connectors
    .filter((c) => installedIds.includes(c.id) && c.status === "available")
    .flatMap((c) => c.tools)
