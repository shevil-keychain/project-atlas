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
  "Search analyst": "Find relevant conversations and analyze transcripts to discover patterns and insights.",
  Coach: "Creates personalized, evidence-based coaching plans based on conversations in a time period.",
  "QA analyst": "Derive quantified insights from your analytics to identify large-scale trends and root causes.",
  "VoC analyst": "Derive quantified insights from your analytics to identify large-scale trends and root causes.",
  "Team analyst": "Analyze team-level performance using QA scores, iCSAT, sentiment, and conversation behavior.",
  "Resolution insights worker": "Provide insights and deep dive into the drivers of resolution outcomes.",
  "Sentiment insights worker": "Provide insights and deep dive into the drivers of sentiment outcomes.",
  "iCSAT insights worker": "Provide insights and deep dive into the drivers of iCSAT outcomes.",
  "Executive summary worker": "Generate deep research reports based on relevant conversations and metadata.",
  "Product gaps analyst": "Identify recurring product gaps from conversations and associated customer feedback.",
}

export const isKnownWorker = (worker: string) =>
  Object.prototype.hasOwnProperty.call(workerIconByLabel, worker)
