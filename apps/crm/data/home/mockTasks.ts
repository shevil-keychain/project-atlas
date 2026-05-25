export type TaskSource = "ai" | "self" | "teammate";
export type TaskType = "followup" | "signal" | "deal_nudge" | "job_change" | "meeting_prep" | "self";
export type TaskStatus = "open" | "snoozed" | "done" | "dismissed";
export type TaskPriority = "high" | "med" | "low";
export type DueDate = "overdue" | "today" | string;

export interface Task {
  id: string;
  title: string;
  context: string;
  source: TaskSource;
  sourceName: string;
  sourceReason?: string;
  linkedRecord: {
    type: "company" | "person" | "deal" | "signal";
    id: string;
    name: string;
    imageUrl?: string;
  };
  taskType: TaskType;
  dueAt: DueDate;
  status: TaskStatus;
  priority: TaskPriority;
  /** Override the default primary action label/icon derived from taskType. */
  primaryActionLabel?: string;
  primaryActionIcon?: "mail" | "reply" | "message" | "eye" | "briefcase" | "fileText" | "link" | "phone";
}

export const mockTasks: Task[] = [
  {
    id: "t-01",
    title: "Reach out to Chomps Snacks",
    context: "Viewed your Keychain profile 3 times in last 7 days",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "Based on 3 profile views this week",
    linkedRecord: { type: "company", id: "di-001", name: "Brewberry", imageUrl: "https://ui-avatars.com/api/?name=Brewberry&background=4f46e5&color=fff&size=64&bold=true&rounded=true" },
    taskType: "signal",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "Send email",
    primaryActionIcon: "mail",
  },
  {
    id: "t-02",
    title: "Congratulate Jacob Smith on new role",
    context: "Now VP Procurement at Mondelez (Previously Chomps)",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "LinkedIn job change detected",
    linkedRecord: {
      type: "person",
      id: "pe-001",
      name: "Jacob Smith",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    },
    taskType: "job_change",
    dueAt: "today",
    status: "open",
    priority: "med",
    primaryActionLabel: "Send message",
    primaryActionIcon: "message",
  },
  {
    id: "t-03",
    title: "Respond to RXBAR's project",
    context: "Co-man needed for protein pouches, 2M units / yr",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "Inbound project match from network",
    linkedRecord: { type: "company", id: "co-001", name: "Sunroot Foods", imageUrl: "https://ui-avatars.com/api/?name=Sunroot+Foods&background=16a34a&color=fff&size=64&bold=true&rounded=true" },
    taskType: "followup",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "View RFQ",
    primaryActionIcon: "eye",
  },
  {
    id: "t-04",
    title: "Move Q3 Co-pack deal forward",
    context: "Stuck in Proposal 21 days · avg is 14",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "Deal stalled in Proposal for 21 days",
    linkedRecord: { type: "deal", id: "de-001", name: "Q3 Co-pack · Mondelez", imageUrl: "https://logo.clearbit.com/mondelezinternational.com" },
    taskType: "deal_nudge",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "Open deal",
    primaryActionIcon: "briefcase",
  },
  {
    id: "t-05",
    title: "Reconnect with Frito-Lay",
    context: "Tier-A · last touch 47 days ago",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "Tier-A account inactive for 47 days",
    linkedRecord: { type: "company", id: "co-002", name: "Frito-Lay", imageUrl: "https://logo.clearbit.com/fritolay.com" },
    taskType: "followup",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "Send email",
    primaryActionIcon: "mail",
  },
  {
    id: "t-06",
    title: "Prep for Chomps QBR",
    context: "Tomorrow 9 AM · 3 stakeholders",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "QBR scheduled for tomorrow",
    linkedRecord: { type: "company", id: "co-003", name: "Chomps Snacks", imageUrl: "https://logo.clearbit.com/chomps.com" },
    taskType: "meeting_prep",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "Open brief",
    primaryActionIcon: "fileText",
  },
  {
    id: "t-07",
    title: "Call John about cocoa pricing",
    context: "No additional context",
    source: "self",
    sourceName: "Jake Mercer",
    linkedRecord: {
      type: "person",
      id: "pe-002",
      name: "John Park",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    taskType: "self",
    dueAt: "today",
    status: "open",
    priority: "med",
    primaryActionLabel: "Log call",
    primaryActionIcon: "phone",
  },
  {
    id: "t-08",
    title: "Cover Chomps while I'm out",
    context: "Lisa is the main contact, expect Q4 RFQ",
    source: "teammate",
    sourceName: "Rachel Okafor",
    linkedRecord: { type: "company", id: "co-004", name: "Chomps Snacks", imageUrl: "https://logo.clearbit.com/chomps.com" },
    taskType: "followup",
    dueAt: "today",
    status: "open",
    priority: "med",
    primaryActionLabel: "Open account",
    primaryActionIcon: "link",
  },
  {
    id: "t-09",
    title: "Follow up with KIND Snacks",
    context: "Clicked 3× on pricing in your last newsletter",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "High newsletter engagement",
    linkedRecord: { type: "company", id: "co-005", name: "KIND Snacks", imageUrl: "https://logo.clearbit.com/kindsnacks.com" },
    taskType: "followup",
    dueAt: "today",
    status: "open",
    priority: "med",
    primaryActionLabel: "Send email",
    primaryActionIcon: "mail",
  },
  {
    id: "t-10",
    title: "Reply to Mike Chen",
    context: "Asked about pricing 2 days ago",
    source: "ai",
    sourceName: "Keychain AI",
    sourceReason: "Awaiting reply 2 days",
    linkedRecord: {
      type: "person",
      id: "pe-003",
      name: "Mike Chen",
      imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=64&h=64&fit=crop&crop=face",
    },
    taskType: "followup",
    dueAt: "today",
    status: "open",
    priority: "high",
    primaryActionLabel: "Reply",
    primaryActionIcon: "reply",
  },
];
