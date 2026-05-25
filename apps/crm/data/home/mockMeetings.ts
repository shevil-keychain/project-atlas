export type MeetingType = "qbr" | "intro" | "pricing" | "internal" | "other";

export interface MeetingAttendee {
  name: string;
  internal: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  attendees: MeetingAttendee[];
  linkedRecord?: {
    type: "company" | "deal";
    id: string;
    name: string;
  };
  hasBrief: boolean;
  meetingType: MeetingType;
}

function toISO(dateStr: string, timeStr: string): string {
  return new Date(`${dateStr}T${timeStr}:00`).toISOString();
}

export const mockMeetings: Meeting[] = [
  {
    id: "m-01",
    title: "Oat Haus QBR",
    startAt: toISO("2026-05-25", "09:00"),
    endAt: toISO("2026-05-25", "10:00"),
    attendees: [
      { name: "Maya Chen", internal: false },
      { name: "Devon Walsh", internal: false },
      { name: "Rachel Okafor", internal: true },
    ],
    linkedRecord: { type: "company", id: "co-001", name: "Oat Haus" },
    hasBrief: true,
    meetingType: "qbr",
  },
  {
    id: "m-02",
    title: "Internal pipeline sync",
    startAt: toISO("2026-05-25", "11:30"),
    endAt: toISO("2026-05-25", "12:00"),
    attendees: [
      { name: "Rachel Okafor", internal: true },
      { name: "Sam Liu", internal: true },
    ],
    hasBrief: false,
    meetingType: "internal",
  },
  {
    id: "m-03",
    title: "Sunroot Foods pricing call",
    startAt: toISO("2026-05-25", "14:00"),
    endAt: toISO("2026-05-25", "14:45"),
    attendees: [
      { name: "Priya Nair", internal: false },
    ],
    linkedRecord: { type: "company", id: "co-002", name: "Sunroot Foods" },
    hasBrief: true,
    meetingType: "pricing",
  },
  {
    id: "m-04",
    title: "Magic Spoon intro call",
    startAt: toISO("2026-05-25", "16:30"),
    endAt: toISO("2026-05-25", "17:00"),
    attendees: [
      { name: "Fatima Al-Rashid", internal: false },
    ],
    linkedRecord: { type: "company", id: "co-016", name: "Magic Spoon" },
    hasBrief: false,
    meetingType: "intro",
  },
  {
    id: "m-05",
    title: "Siete Family Foods deal review",
    startAt: toISO("2026-05-26", "10:00"),
    endAt: toISO("2026-05-26", "11:00"),
    attendees: [
      { name: "Chris Patel", internal: false },
      { name: "Alyssa Kim", internal: false },
    ],
    linkedRecord: { type: "company", id: "co-013", name: "Siete Family Foods" },
    hasBrief: true,
    meetingType: "other",
  },
  {
    id: "m-06",
    title: "Clever Keto Co. capability walkthrough",
    startAt: toISO("2026-05-26", "15:30"),
    endAt: toISO("2026-05-26", "16:00"),
    attendees: [
      { name: "Tariq Hassan", internal: false },
      { name: "Jess Fontaine", internal: false },
    ],
    linkedRecord: { type: "company", id: "co-005", name: "Clever Keto Co." },
    hasBrief: false,
    meetingType: "other",
  },
  {
    id: "m-07",
    title: "Supergut sample review",
    startAt: toISO("2026-05-27", "11:00"),
    endAt: toISO("2026-05-27", "11:30"),
    attendees: [
      { name: "Nadia Kowalski", internal: false },
    ],
    linkedRecord: { type: "company", id: "co-009", name: "Supergut" },
    hasBrief: false,
    meetingType: "other",
  },
  {
    id: "m-08",
    title: "Weekly team standup",
    startAt: toISO("2026-05-28", "09:00"),
    endAt: toISO("2026-05-28", "09:30"),
    attendees: [
      { name: "Rachel Okafor", internal: true },
      { name: "Sam Liu", internal: true },
      { name: "Kai Pham", internal: true },
    ],
    hasBrief: false,
    meetingType: "internal",
  },
];
