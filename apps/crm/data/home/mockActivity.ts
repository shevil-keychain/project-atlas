export type ActivityType =
  | "email_received"
  | "email_sent"
  | "call_logged"
  | "meeting_scheduled"
  | "meeting_completed"
  | "note_added"
  | "signal"
  | "task_completed";

export type ActivityActor = "self" | "teammate" | "external" | "system";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  linkedRecord: {
    type: "company" | "person" | "deal";
    id: string;
    name: string;
    website?: string;
  };
  timestamp: string;
  actor: ActivityActor;
}

export const mockActivity: Activity[] = [
  {
    id: "a-01",
    type: "email_received",
    title: "Maya Chen replied to your email",
    subtitle: "Re: Q3 Production Capacity — Hi, I've reviewed the capacity deck. Can we align on timelines this week?",
    linkedRecord: { type: "company", id: "co-001", name: "Oat Haus" },
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    actor: "external",
  },
  {
    id: "a-03",
    type: "signal",
    title: "Someone at Chomps viewed your Keychain profile.",
    linkedRecord: { type: "company", id: "di-001", name: "Chomps", website: "chomps.com" },
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    actor: "system",
  },
  {
    id: "a-04",
    type: "note_added",
    title: "You added a note to Siete Family Foods",
    subtitle: "Flagged for follow-up after pricing call — they want bundled SKUs by Q4.",
    linkedRecord: { type: "company", id: "co-013", name: "Siete Family Foods" },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-05",
    type: "meeting_scheduled",
    title: "Invited to Intro Call on May 25 (2:00 PM – 2:30 PM)",
    subtitle: "with Clever Keto Co.",
    linkedRecord: { type: "company", id: "co-005", name: "Clever Keto Co." },
    timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-06",
    type: "email_sent",
    title: "You sent a follow-up email to Chris Patel",
    subtitle: "Re: Pricing Proposal — Hey Chris, just circling back on the deck we shared last week…",
    linkedRecord: { type: "company", id: "co-013", name: "Siete Family Foods" },
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-07",
    type: "task_completed",
    title: "Completed: Send intro deck to Magic Spoon",
    linkedRecord: { type: "company", id: "co-016", name: "Magic Spoon" },
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-08",
    type: "email_received",
    title: "Tariq Hassan replied to your proposal",
    subtitle: "Re: Co-man Partnership — Thanks for sending this over. We're reviewing internally and will circle back.",
    linkedRecord: { type: "company", id: "co-005", name: "Clever Keto Co." },
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    actor: "external",
  },
  {
    id: "a-09",
    type: "call_logged",
    title: "Logged call with Nadia Kowalski",
    subtitle: "32 min · Discussed SKU requirements and delivery timeline for Q4.",
    linkedRecord: { type: "company", id: "co-009", name: "Supergut" },
    timestamp: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-10",
    type: "signal",
    title: "Siete Family Foods posted a new RFQ.",
    linkedRecord: { type: "company", id: "co-013", name: "Siete Family Foods", website: "sietefamilyfoods.com" },
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    actor: "system",
  },
  {
    id: "a-11",
    type: "note_added",
    title: "Rachel added a note to Bloom Nutrition",
    linkedRecord: { type: "company", id: "co-003", name: "Bloom Nutrition" },
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    actor: "teammate",
  },
  {
    id: "a-12",
    type: "email_sent",
    title: "You sent a capability overview to Fatima Al-Rashid",
    subtitle: "Capability Overview — Attaching the updated deck with our latest case studies and production specs.",
    linkedRecord: { type: "company", id: "co-016", name: "Magic Spoon" },
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-13",
    type: "meeting_completed",
    title: "Attended Keychain Product Review with Oat Haus team",
    subtitle: "45 min · John Doe, Maya Chen +2 attendees.",
    linkedRecord: { type: "company", id: "co-001", name: "Oat Haus" },
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-14",
    type: "email_received",
    title: "Nadia Kowalski sent you an updated spec sheet",
    subtitle: "Updated Spec Sheet — Please find the revised product specifications attached for your review.",
    linkedRecord: { type: "company", id: "co-009", name: "Supergut" },
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    actor: "external",
  },
  {
    id: "a-15",
    type: "task_completed",
    title: "Completed: Prep brief for Sunroot call",
    linkedRecord: { type: "company", id: "co-002", name: "Sunroot Foods" },
    timestamp: new Date(Date.now() - 33 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-16",
    type: "signal",
    title: "Catalina Crunch is actively searching for co-mans.",
    linkedRecord: { type: "company", id: "di-002", name: "Catalina Crunch", website: "catalinacrunch.com" },
    timestamp: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(),
    actor: "system",
  },
  {
    id: "a-17",
    type: "email_sent",
    title: "You sent a pricing update to Devon Walsh",
    subtitle: "Pricing Update — Here are the revised tiers we discussed on the call. Let me know which works best.",
    linkedRecord: { type: "company", id: "co-001", name: "Oat Haus" },
    timestamp: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
  {
    id: "a-18",
    type: "call_logged",
    title: "Logged call with Tariq Hassan",
    subtitle: "24 min · He's aligned on the proposal and wants a revised timeline by end of week.",
    linkedRecord: { type: "company", id: "co-005", name: "Clever Keto Co." },
    timestamp: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
    actor: "self",
  },
];
