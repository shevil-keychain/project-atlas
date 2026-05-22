"use client";

import { useEffect, useState } from "react";
import { Badge } from "@level/ui/components/ui/badge";
import { Button } from "@level/ui/components/ui/button";
import { Card } from "@level/ui/components/ui/card";
import {
  Tabs,
  NeutralTabsList,
  NeutralTabsTrigger,
  TabsContent,
} from "@level/ui/components/ui/tabs";
import {
  ChevronDown,
  Sliders02,
  Star01,
  TrendUp02,
} from "@level/ui/components/icons";
import { cn } from "@level/ui/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import { ComposeEmailModal } from "@/components/company-detail/compose-email-modal";

type PriorityStatus = "Customer" | "Prospect" | "Out of network opportunity";

type Strength = "Strong" | "Weak" | "Very weak";

type RightMeta =
  | { type: "badge"; label: string; color: "primary" | "error" | "warning" | "gray" }
  | { type: "strength"; strength: Strength };

type Priority = {
  id: string;
  company: string;
  website: string;
  status: PriorityStatus;
  rightMeta: RightMeta;
  href: string;
};

type FeaturedPriority = Priority & {
  summary: string;
  recommendation: string;
};

const FEATURED: FeaturedPriority = {
  id: "co-002",
  company: "Sunroot Foods",
  website: "sunrootfoods.com",
  status: "Prospect",
  rightMeta: { type: "strength", strength: "Weak" },
  href: "/companies/co-002",
  summary:
    "We pitched our private-label production capability to Sunroot Foods last time. The team said they'll review internally and circle back, but the champion Elliot Shifrin has gone quiet on email since.",
  recommendation:
    "Send a tailored email on your production capability, attaching the latest sales collateral and a case study from a similar brand.",
};

const PRIORITIES: Priority[] = [
  {
    id: "di-001",
    company: "Chomps",
    website: "chomps.com",
    status: "Out of network opportunity",
    rightMeta: { type: "badge", label: "Actively searching", color: "primary" },
    href: "/discover",
  },
  {
    id: "co-003",
    company: "Olipop",
    website: "drinkolipop.com",
    status: "Customer",
    rightMeta: { type: "badge", label: "At risk", color: "error" },
    href: "/companies/co-003",
  },
  {
    id: "co-001",
    company: "Oat Haus",
    website: "oathaus.com",
    status: "Customer",
    rightMeta: { type: "strength", strength: "Weak" },
    href: "/companies/co-001",
  },
  {
    id: "di-002",
    company: "Catalina Crunch",
    website: "catalinacrunch.com",
    status: "Out of network opportunity",
    rightMeta: { type: "strength", strength: "Very weak" },
    href: "/discover",
  },
  {
    id: "co-009",
    company: "Supergut",
    website: "supergut.com",
    status: "Customer",
    rightMeta: { type: "badge", label: "At risk", color: "error" },
    href: "/companies/co-009",
  },
  {
    id: "co-012",
    company: "ALOHA",
    website: "aloha.com",
    status: "Customer",
    rightMeta: { type: "strength", strength: "Strong" },
    href: "/companies/co-012",
  },
];

function useGreeting() {
  const [greeting, setGreeting] = useState("Good evening");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

export default function DashboardPage() {
  const greeting = useGreeting();
  const total = PRIORITIES.length + 1 + 38;

  return (
    <div className="mx-auto flex w-full max-w-[1280px] h-full min-h-0 gap-24 px-24 pt-32">
      <section className="flex flex-[7] min-h-0 flex-col gap-16 overflow-y-auto pr-12">
          <header className="flex items-end justify-between gap-16">
            <div className="flex flex-col">
              <p className="text-18 font-semibold leading-28 text-text-secondary">
                {greeting}, John
              </p>
              <h1 className="text-18 font-semibold leading-28 text-text-primary">
                Your priorities today ({total})
              </h1>
            </div>
            <Button variant="ghost" size="sm" iconLeft={<Sliders02 size={16} />}>
              Customize
            </Button>
          </header>
          <FeaturedPriorityCard item={FEATURED} />
          <div className="flex flex-col">
            {PRIORITIES.map((item) => (
              <PriorityRow key={item.id} item={item} />
            ))}
          </div>
        </section>

      <aside className="flex flex-[3] min-h-0 flex-col gap-16 overflow-y-auto pr-4">
        <NetworkStatusCard />
        <EmailMetricsCard />
        <SalesCoachCard />
      </aside>
    </div>
  );
}

function StrengthMeta({ strength }: { strength: Strength }) {
  const dotClass =
    strength === "Strong"
      ? "bg-success-300"
      : strength === "Weak"
      ? "bg-error-300"
      : "bg-error-500";
  const label =
    strength === "Very weak" ? "Very weak connection strength" : `${strength} connection strength`;
  return (
    <div className="flex items-center gap-8">
      <span className={cn("size-6 rounded-full", dotClass)} />
      <span className="text-12 font-normal leading-16 text-text-primary whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function RightMetaView({ meta }: { meta: RightMeta }) {
  if (meta.type === "badge") {
    return (
      <Badge color={meta.color} size="sm">
        {meta.label}
      </Badge>
    );
  }
  return <StrengthMeta strength={meta.strength} />;
}

function FeaturedPriorityCard({ item }: { item: FeaturedPriority }) {
  const [composeOpen, setComposeOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border-default bg-surface-card p-24 flex flex-col gap-24 shadow-[0px_4px_6px_-1px_rgba(16,24,40,0.1),0px_2px_4px_-1px_rgba(16,24,40,0.06)]">
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap items-center justify-between gap-y-12">
          <div className="flex items-center gap-12">
            <CompanyLogo website={item.website} size="sm" />
            <div className="flex flex-col gap-2">
              <span className="text-14 font-semibold leading-20 text-text-primary">
                {item.company}
              </span>
              <span className="text-12 font-normal leading-16 text-text-secondary">
                {item.status}
              </span>
            </div>
          </div>
          <RightMetaView meta={item.rightMeta} />
        </div>

        <div className="flex flex-col gap-8 text-14 leading-20 text-text-primary">
          <p>{item.summary}</p>
          <p>{item.recommendation}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Button size="sm" onClick={() => setComposeOpen(true)}>
          Send email
        </Button>
        <Button variant="secondary" size="sm" iconRight={<ChevronDown size={16} />}>
          More actions
        </Button>
      </div>

      <ComposeEmailModal open={composeOpen} onOpenChange={setComposeOpen} />
    </div>
  );
}

function PriorityRow({ item }: { item: Priority }) {
  return (
    <div className="flex items-center justify-between gap-12 border-b border-border-default px-8 py-24">
      <div className="flex items-center gap-12 min-w-0">
        <CompanyLogo website={item.website} size="sm" />
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-14 font-semibold leading-20 text-text-primary truncate">
            {item.company}
          </span>
          <span className="text-12 font-normal leading-16 text-text-secondary">
            {item.status}
          </span>
        </div>
      </div>
      <RightMetaView meta={item.rightMeta} />
    </div>
  );
}

function NetworkStatusCard() {
  const segments = [
    { label: "Very strong", value: 12, className: "bg-success-500" },
    { label: "Strong", value: 21, className: "bg-success-300" },
    { label: "Moderate", value: 28, className: "bg-stone-400" },
    { label: "Weak", value: 16, className: "bg-error-300" },
    { label: "Very weak", value: 8, className: "bg-error-500" },
  ];
  const inNetwork = segments.reduce((sum, s) => sum + s.value, 0);
  const total = 400;
  const pct = Math.round((inNetwork / total) * 100);

  return (
    <Card className="p-20 flex flex-col gap-16 shrink-0">
      <h3 className="text-14 font-semibold text-text-primary">Network status</h3>

      <div className="flex items-baseline gap-8">
        <span className="text-32 font-semibold leading-40 text-text-primary">{inNetwork}</span>
        <span className="text-13 font-medium text-text-secondary">of {total} addressable</span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex h-6 w-full overflow-hidden rounded-full bg-surface-subtle">
          {segments.map((s) => (
            <span
              key={s.label}
              className={cn("h-full", s.className)}
              style={{ width: `${(s.value / total) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-12 font-medium text-text-secondary">
          <span>{pct}% in-network</span>
          <span>{total - inNetwork} to explore</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 pt-12 border-t border-border-subtle">
        <span className="text-12 font-semibold text-text-primary">Connection strength</span>
        <div className="flex flex-col gap-6">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span className={cn("size-6 rounded-full", s.className)} />
                <span className="text-12 font-medium text-text-primary">{s.label}</span>
              </div>
              <span className="text-12 font-semibold text-text-primary">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function EmailMetricsCard() {
  const tabs = [
    {
      value: "response",
      label: "Email response rate",
      stat: "42%",
      delta: "+6 pts vs last week",
      footer: "90 of 215 sent emails received a reply.",
    },
    {
      value: "sent",
      label: "Emails sent",
      stat: "215",
      delta: "+60 vs last week",
      footer: "Across 45 accounts and 70 contacts.",
    },
  ];

  const bars = [4, 6, 5, 8, 7, 10, 9];
  const maxBar = Math.max(...bars);

  return (
    <Card className="p-20 flex flex-col gap-16 shrink-0">
      <h3 className="text-14 font-semibold text-text-primary">This week's outreach</h3>
      <Tabs defaultValue={tabs[0].value}>
        <NeutralTabsList className="grid grid-cols-2">
          {tabs.map((tab) => (
            <NeutralTabsTrigger
              key={tab.value}
              value={tab.value}
              className="whitespace-nowrap text-12"
            >
              {tab.label}
            </NeutralTabsTrigger>
          ))}
        </NeutralTabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="flex flex-col gap-8">
            <div className="flex items-baseline gap-12">
              <span className="text-32 font-semibold leading-40 text-text-primary">{tab.stat}</span>
              <div className="flex items-center gap-4 text-12 font-semibold text-text-success">
                <TrendUp02 size={14} />
                <span>{tab.delta}</span>
              </div>
            </div>
            <p className="text-12 font-medium text-text-secondary">{tab.footer}</p>
            <div className="mt-8 flex gap-6 h-40 items-end">
              {bars.map((h, i) => {
                const ratio = h / maxBar;
                const color =
                  ratio >= 0.9
                    ? "bg-success-500"
                    : ratio >= 0.75
                    ? "bg-success-400"
                    : ratio >= 0.6
                    ? "bg-success-300"
                    : ratio >= 0.45
                    ? "bg-warning-500"
                    : "bg-warning-400";
                return (
                  <span
                    key={i}
                    className={cn("flex-1 rounded-sm", color)}
                    style={{ height: `${ratio * 100}%` }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-10 font-medium text-text-tertiary pt-4">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

function SalesCoachCard() {
  return (
    <Card className="p-20 flex flex-col gap-16 shrink-0">
      <h3 className="text-14 font-semibold text-text-primary">Sales coach</h3>

      <p className="text-14 leading-20 text-text-primary">
        You closed <span className="font-semibold">3 opportunities</span> this week and recovered
        the Sunroot conversation. Two follow-ups slipped past their 48h SLA — both with late-stage
        prospects.
      </p>

      <ul className="flex flex-col gap-6 text-14 leading-20 text-text-primary list-disc pl-20">
        <li>
          <Star01 size={12} className="inline mr-4 align-text-bottom text-icon-tertiary" />
          Reply cadence dropped to 32h on average — keep it under 24h.
        </li>
        <li>
          <Star01 size={12} className="inline mr-4 align-text-bottom text-icon-tertiary" />
          Discovery questions are landing; consider doubling down on capability framing.
        </li>
      </ul>

      <Button variant="secondary" size="sm" className="w-full">
        Ask follow-up
      </Button>
    </Card>
  );
}
