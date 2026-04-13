export const defaultWorker = "Search analyst"

export const workerAlternativeRows = [
  ["Search analyst", "Coach", "QA analyst", "VoC analyst", "Team analyst"],
  ["Resolution insights worker", "Sentiment insights worker", "iCSAT insights worker"],
  ["Executive summary worker", "Product gaps analyst"],
]

export const workerIconByLabel: Record<string, string> = {
  "Search analyst": "/worker-icons/search-analyst.png",
  Coach: "/worker-icons/coach.png",
  "QA analyst": "/worker-icons/qa-analyst.png",
  "VoC analyst": "/worker-icons/voc-analyst.png",
  "Team analyst": "/worker-icons/team-analyst.png",
  "Resolution insights worker": "/worker-icons/resolution-insights.png",
  "Sentiment insights worker": "/worker-icons/sentiment-insights.png",
  "iCSAT insights worker": "/worker-icons/icsat-insights.png",
  "Executive summary worker": "/worker-icons/executive-summary.png",
  "Product gaps analyst": "/worker-icons/product-gaps.png",
}

export const workerSubtextByLabel: Record<string, string> = {
  "Search analyst": "Search across conversations to find patterns, anomalies, and specific customer interactions.",
  Coach: "Build personalized coaching plans backed by real conversation evidence and performance data.",
  "QA analyst": "Surface large-scale quality trends and root causes from your QA analytics.",
  "VoC analyst": "Uncover voice-of-customer themes, pain points, and emerging sentiment shifts.",
  "Team analyst": "Compare team performance across QA scores, iCSAT, sentiment, and agent behavior.",
  "Resolution insights worker": "Deep dive into what drives resolution outcomes and where they break down.",
  "Sentiment insights worker": "Understand the key drivers behind customer sentiment trends.",
  "iCSAT insights worker": "Explore what's moving iCSAT scores and identify improvement levers.",
  "Executive summary worker": "Generate research-grade reports synthesizing conversations and metadata.",
  "Product gaps analyst": "Spot recurring product gaps by analyzing customer feedback and conversations.",
  "Legal Threat Identification": "Flag conversations where customers mention legal action, lawyers, or lawsuits.",
  "Agent Profanity - Root Cause Analysis": "Find and analyze the root causes behind agent profanity incidents.",
  "VoC Theme - Customer Insights": "Analyze the most common customer verbatims for any VoC theme.",
}

export const workerOrchestratorGuide: Record<string, string> = {
  "Search analyst":
    "General-purpose search and analysis across all conversation data. Use for: finding specific conversations, identifying patterns or anomalies, counting occurrences, exploring any topic where you need to look through raw conversation logs. This is the broadest worker — pick it when the query doesn't clearly fit a more specialized worker.",
  Coach:
    "Builds personalized coaching plans for individual agents. Use ONLY when the user asks about coaching, training, or developing a specific agent. Requires an agent name or ID. Do NOT use for general analytics or reporting.",
  "QA analyst":
    "Analyzes quality assurance scores, rubric compliance, and QA trends at scale. Use when the user asks about QA scores, quality trends, evaluation criteria, rubric performance, or compliance rates across teams or agents.",
  "VoC analyst":
    "Analyzes voice-of-customer themes, pain points, and sentiment shifts. Use when the user asks about customer feedback themes, what customers are saying, complaint categories, customer satisfaction drivers, or emerging sentiment patterns.",
  "Team analyst":
    "Compares team and agent performance metrics side by side. Use when the user asks to compare agents, rank team members, benchmark performance, or analyze team-level QA/iCSAT/sentiment metrics.",
  "Resolution insights worker":
    "Deep dives into resolution outcomes — what drives successful resolutions and where they fail. Use when the user asks about resolution rates, first-contact resolution, escalation drivers, or why issues are/aren't getting resolved.",
  "Sentiment insights worker":
    "Analyzes drivers behind customer sentiment scores and trends. Use when the user specifically asks about sentiment scores, sentiment drivers, or what's causing sentiment to go up or down.",
  "iCSAT insights worker":
    "Explores what moves iCSAT (inferred customer satisfaction) scores. Use when the user specifically asks about iCSAT scores, iCSAT trends, or satisfaction score drivers.",
  "Executive summary worker":
    "Generates comprehensive research-grade reports that synthesize multiple data sources. Use when the user asks for a formal report, executive summary, or a thorough multi-section analysis document.",
  "Product gaps analyst":
    "Spots recurring product gaps and feature requests by analyzing customer conversations. Use when the user asks about product issues, missing features, feature requests, or product-related complaints.",
  "Legal Threat Identification":
    "Flags conversations where customers mention legal action, lawyers, or lawsuits. Use ONLY when the user asks about legal threats, lawsuit mentions, or regulatory risk in conversations.",
  "Agent Profanity - Root Cause Analysis":
    "Finds and analyzes root causes behind agent profanity incidents. Use ONLY when the user asks about agent profanity, inappropriate language, or conduct violations.",
  "VoC Theme - Customer Insights":
    "Analyzes the most common customer verbatims for a specific VoC theme. Use when the user wants to drill into a particular voice-of-customer theme and see representative customer quotes.",
}

export const isKnownWorker = (worker: string) =>
  Object.prototype.hasOwnProperty.call(workerIconByLabel, worker)

export type WorkerInputMode = "prompt" | "form" | "buttons"

export const workerInputMode: Record<string, WorkerInputMode> = {
  Coach: "form",
  "Team analyst": "form",
  "Resolution insights worker": "buttons",
  "Sentiment insights worker": "buttons",
  "iCSAT insights worker": "buttons",
}

export const getWorkerInputMode = (worker: string): WorkerInputMode =>
  workerInputMode[worker] ?? "prompt"

export type InsightsWorkerConfig = {
  title: string
  goalSubject: string
  actions: { label: string; primary?: boolean }[]
}

export const insightsWorkerConfig: Record<string, InsightsWorkerConfig> = {
  "Resolution insights worker": {
    title: "Resolution Insights",
    goalSubject: "Resolution",
    actions: [
      { label: "Top Business Drivers", primary: true },
      { label: "Noteworthy Trends" },
      { label: "Correlations with other outcomes" },
    ],
  },
  "Sentiment insights worker": {
    title: "Sentiment Insights",
    goalSubject: "Sentiment",
    actions: [
      { label: "Top Business Drivers", primary: true },
      { label: "Noteworthy Trends" },
      { label: "Correlations with other outcomes" },
    ],
  },
  "iCSAT insights worker": {
    title: "iCSAT Insights",
    goalSubject: "iCSAT",
    actions: [
      { label: "Top Business Drivers", primary: true },
      { label: "Noteworthy Trends" },
      { label: "Correlations with other outcomes" },
    ],
  },
}

export const workerAuthorByLabel: Record<string, string> = {
  "Search analyst": "Level AI",
  Coach: "Level AI",
  "QA analyst": "Level AI",
  "VoC analyst": "Level AI",
  "Team analyst": "Level AI",
  "Resolution insights worker": "Level AI",
  "Sentiment insights worker": "Level AI",
  "iCSAT insights worker": "Level AI",
  "Executive summary worker": "Level AI",
  "Product gaps analyst": "Level AI",
}

export const allSystemWorkerLabels = workerAlternativeRows.flat()

export type CustomWorkerEntry = {
  label: string
  description: string
  author: string
  authorInitial: string
  authorColor: string
  visibility: "public" | "private"
  iconBg: string
  iconColor: string
  iconName: string
}

export const customWorkers: CustomWorkerEntry[] = [
  {
    label: "Legal Threat Identification",
    description: "Identify conversations where the customer threatened legal action like calling their lawyer or suing your company.",
    author: "Erik Katzen",
    authorInitial: "E",
    authorColor: "bg-success-600",
    visibility: "public",
    iconBg: "bg-primary-brand-600",
    iconColor: "white",
    iconName: "alert-triangle",
  },
  {
    label: "Agent Profanity - Root Cause Analysis",
    description: "Identify and analyze root causes of agent profanity in conversations.",
    author: "Sarveshwar Neogi",
    authorInitial: "S",
    authorColor: "bg-secondary-purple-600",
    visibility: "public",
    iconBg: "bg-secondary-purple-600",
    iconColor: "white",
    iconName: "search",
  },
  {
    label: "VoC Theme - Customer Insights",
    description: "Analyze common verbatims for a given VoC theme.",
    author: "Level Production",
    authorInitial: "L",
    authorColor: "bg-success-600",
    visibility: "private",
    iconBg: "bg-success-600",
    iconColor: "white",
    iconName: "user",
  },
]
