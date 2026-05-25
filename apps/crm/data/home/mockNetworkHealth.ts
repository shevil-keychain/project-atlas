export interface NetworkMover {
  id: string;
  name: string;
  from: "healthy" | "strong";
  to: "at_risk" | "healthy";
  daysAgo: number;
}

export interface TouchTier {
  id: string;
  range: string;
  touchLabel: string;
  label: string;
  description: string;
  count: number;
  pctOfEligible: string;
}

export interface NetworkHealthData {
  saturationPct: number;
  eligibleLabel: string;
  eligibleContext: string;
  saturationProjection: string;
  tiers: TouchTier[];
  trend: { label: string; direction: "up" | "down" | "flat" };
  recentMovers: NetworkMover[];
}

export const mockNetworkHealth: NetworkHealthData = {
  saturationPct: 68,
  eligibleLabel: "~850",
  eligibleContext: "eligible buyers in your category see your name at least once a year",
  saturationProjection: "room to reach 85%+ by Y3",
  tiers: [
    {
      id: "t5",
      range: "20+",
      touchLabel: "touches / yr",
      label: "Your closest",
      description: "They hear from you across every channel and have met you in person.",
      count: 15,
      pctOfEligible: "1.8%",
    },
    {
      id: "t4",
      range: "10–19",
      touchLabel: "touches",
      label: "Active audience",
      description: "Newsletter regulars, repeat profile visits, event attendees.",
      count: 28,
      pctOfEligible: "3.3%",
    },
    {
      id: "t3",
      range: "5–9",
      touchLabel: "touches",
      label: "Aware",
      description: "Have opened content, returned to search results, retargeted multiple times.",
      count: 65,
      pctOfEligible: "7.6%",
    },
    {
      id: "t2",
      range: "2–4",
      touchLabel: "touches",
      label: "Names",
      description: "Recently surfaced via Pixel, opened one email, saw you at one event.",
      count: 135,
      pctOfEligible: "15.9%",
    },
    {
      id: "t1",
      range: "1",
      touchLabel: "touch",
      label: "First contact",
      description: "Just discovered you in search or via an intro — the entry point.",
      count: 330,
      pctOfEligible: "38.8%",
    },
  ],
  trend: { label: "+3 accounts moved to 20+ touches this month", direction: "up" },
  recentMovers: [
    { id: "co-004", name: "Partake Foods", from: "healthy", to: "at_risk", daysAgo: 3 },
    { id: "co-010", name: "Krave Jerky", from: "healthy", to: "at_risk", daysAgo: 5 },
    { id: "co-015", name: "Laird Superfood", from: "strong", to: "at_risk", daysAgo: 7 },
  ],
};

export const mockTeamNetworkHealth: NetworkHealthData = {
  saturationPct: 82,
  eligibleLabel: "~850",
  eligibleContext: "eligible buyers in your category see your team at least once a year",
  saturationProjection: "room to reach 90%+ by Q4",
  tiers: [
    {
      id: "t5",
      range: "20+",
      touchLabel: "touches / yr",
      label: "Your closest",
      description: "They hear from you across every channel and have met you in person.",
      count: 45,
      pctOfEligible: "5.3%",
    },
    {
      id: "t4",
      range: "10–19",
      touchLabel: "touches",
      label: "Active audience",
      description: "Newsletter regulars, repeat profile visits, event attendees.",
      count: 82,
      pctOfEligible: "9.6%",
    },
    {
      id: "t3",
      range: "5–9",
      touchLabel: "touches",
      label: "Aware",
      description: "Have opened content, returned to search results, retargeted multiple times.",
      count: 156,
      pctOfEligible: "18.4%",
    },
    {
      id: "t2",
      range: "2–4",
      touchLabel: "touches",
      label: "Names",
      description: "Recently surfaced via Pixel, opened one email, saw you at one event.",
      count: 273,
      pctOfEligible: "32.1%",
    },
    {
      id: "t1",
      range: "1",
      touchLabel: "touch",
      label: "First contact",
      description: "Just discovered you in search or via an intro — the entry point.",
      count: 141,
      pctOfEligible: "16.6%",
    },
  ],
  trend: { label: "+12 accounts moved to 20+ touches this month", direction: "up" },
  recentMovers: [],
};
