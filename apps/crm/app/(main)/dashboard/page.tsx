"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  ArrowRight,
  Email,
  Phone01,
  Stars02,
  Star01,
  TrendUp02,
} from "@level/ui/components/icons";
import { cn } from "@level/ui/lib/utils";

type PriorityStatus = "Customer" | "Prospect" | "Out of network";

type Priority = {
  id: string;
  company: string;
  website: string;
  status: PriorityStatus;
  lastDiscussion: string;
  nextStep: string;
  lastTouch: string;
  href: string;
};

const PRIORITIES: Priority[] = [
  {
    id: "co-003",
    company: "Bloom Nutrition",
    website: "bloomnutrition.com",
    status: "Customer",
    lastDiscussion:
      "Reviewed Q2 reorder cadence on the kids' line — Maya wants to consolidate POs.",
    nextStep: "Send proposal for a quarterly QBR cadence by Friday.",
    lastTouch: "3 days ago",
    href: "/companies/co-003",
  },
  {
    id: "co-002",
    company: "Sunroot Foods",
    website: "sunrootfoods.com",
    status: "Prospect",
    lastDiscussion:
      "Pitched private-label production capability; team is reviewing internally.",
    nextStep: "Follow up with Elliot Shifrin and share the case study deck.",
    lastTouch: "2 days ago",
    href: "/companies/co-002",
  },
  {
    id: "di-001",
    company: "Chomps",
    website: "chomps.com",
    status: "Out of network",
    lastDiscussion: "Active in market — sourcing co-mfg for a grain-free SKU.",
    nextStep: "Warm intro via Mina Gupta; lead with SQF-3 capacity.",
    lastTouch: "Spotted today",
    href: "/discover",
  },
  {
    id: "co-001",
    company: "Oat Haus",
    website: "oathaus.com",
    status: "Prospect",
    lastDiscussion:
      "Discovery call covered fulfillment pain and EU expansion timeline.",
    nextStep: "Schedule technical evaluation with their ops lead next week.",
    lastTouch: "1 day ago",
    href: "/companies/co-001",
  },
  {
    id: "co-009",
    company: "Supergut",
    website: "supergut.com",
    status: "Customer",
    lastDiscussion: "Closed renewal; flagged interest in our new sampling tier.",
    nextStep: "Loop in Finance to scope the sampling expansion contract.",
    lastTouch: "5 weeks ago",
    href: "/companies/co-009",
  },
  {
    id: "di-002",
    company: "Catalina Crunch",
    website: "catalinacrunch.com",
    status: "Out of network",
    lastDiscussion:
      "High-growth (+11% YoY); just posted RFI for functional beverage co-pack.",
    nextStep: "Add to network, then send capability one-pager via prospecting.",
    lastTouch: "Spotted 2d ago",
    href: "/discover",
  },
  {
    id: "co-012",
    company: "ALOHA",
    website: "aloha.com",
    status: "Customer",
    lastDiscussion: "Walked them through implementation timeline on-site.",
    nextStep: "Confirm warehouse cutover date and share readiness checklist.",
    lastTouch: "Yesterday",
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

const STATUS_BADGE: Record<PriorityStatus, { variant: "primary" | "gray" | "purple"; label: string }> = {
  Customer: { variant: "primary", label: "Customer" },
  Prospect: { variant: "gray", label: "Prospect" },
  "Out of network": { variant: "purple", label: "Opportunity" },
};

export default function DashboardPage() {
  const greeting = useGreeting();

  return (
    <div className="mx-auto w-full max-w-[1280px] px-24 py-40 flex flex-col gap-32">
      <header className="flex flex-col gap-4">
        <p className="text-14 font-medium text-text-secondary">{greeting}, John.</p>
        <h1 className="text-28 font-semibold leading-36 text-text-primary max-w-[820px]">
          You have <span className="text-text-primary">7 accounts</span> waiting on a next step today.
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-24 items-start">
        <section className="lg:col-span-7 flex flex-col gap-16">
          <div className="flex items-baseline justify-between">
            <h2 className="text-16 font-semibold text-text-primary">Your priorities today</h2>
            <span className="text-12 font-medium text-text-tertiary">
              Sorted by urgency
            </span>
          </div>
          <div className="flex flex-col gap-12">
            {PRIORITIES.map((item) => (
              <PriorityCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-3 flex flex-col gap-16">
          <NetworkStatusCard />
          <EmailMetricsCard />
          <SalesCoachCard />
        </aside>
      </div>
    </div>
  );
}

function PriorityCard({ item }: { item: Priority }) {
  const badge = STATUS_BADGE[item.status];
  const logoUrl = `https://www.google.com/s2/favicons?domain=${item.website}&sz=64`;

  return (
    <Link
      href={item.href}
      className={cn(
        "group rounded-xl border border-border-default bg-surface-card",
        "px-20 py-16 flex flex-col gap-12",
        "transition-colors hover:border-border-strong"
      )}
    >
      <div className="flex items-start gap-12">
        <div className="flex size-32 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-subtle overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="" className="size-24 object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-8">
            <span className="text-14 font-semibold leading-20 text-text-primary truncate">
              {item.company}
            </span>
            <Badge color={badge.variant} size="sm">
              {badge.label}
            </Badge>
          </div>
          <span className="text-12 font-medium leading-16 text-text-tertiary">
            {item.lastTouch}
          </span>
        </div>
        <ArrowRight
          size={16}
          className="mt-4 shrink-0 text-icon-tertiary transition-colors group-hover:text-icon-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8 pl-44">
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-12 font-medium uppercase tracking-wide text-text-tertiary">
            {item.status === "Out of network" ? "Signal" : "Last discussion"}
          </span>
          <p className="text-13 font-medium leading-18 text-text-secondary">
            {item.lastDiscussion}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-12 font-medium uppercase tracking-wide text-text-tertiary">
            Next step
          </span>
          <p className="text-13 font-medium leading-18 text-text-primary">
            {item.nextStep}
          </p>
        </div>
      </div>
    </Link>
  );
}

function NetworkStatusCard() {
  const inNetwork = 85;
  const total = 400;
  const pct = Math.round((inNetwork / total) * 100);

  const segments = [
    { label: "Warm", value: 38, className: "bg-icon-primary" },
    { label: "Engaging", value: 27, className: "bg-icon-secondary" },
    { label: "Cold", value: 20, className: "bg-border-strong" },
  ];

  return (
    <Card className="p-20 flex flex-col gap-16">
      <div className="flex items-baseline justify-between">
        <h3 className="text-14 font-semibold text-text-primary">Network status</h3>
        <Link
          href="/companies"
          className="text-12 font-semibold text-text-secondary hover:text-text-primary"
        >
          View all
        </Link>
      </div>

      <div className="flex items-baseline gap-8">
        <span className="text-32 font-semibold leading-40 text-text-primary">
          {inNetwork}
        </span>
        <span className="text-13 font-medium text-text-secondary">
          of {total} addressable
        </span>
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
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <span className={cn("size-8 rounded-full", s.className)} />
              <span className="text-13 font-medium text-text-secondary">
                {s.label}
              </span>
            </div>
            <span className="text-13 font-semibold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EmailMetricsCard() {
  const tabs = [
    {
      value: "response",
      label: "Response rate",
      stat: "42%",
      delta: "+6 pts vs last week",
      footer: "18 of 43 sent emails received a reply.",
    },
    {
      value: "sent",
      label: "Emails sent",
      stat: "43",
      delta: "+12 vs last week",
      footer: "Across 9 accounts and 14 contacts.",
    },
    {
      value: "calls",
      label: "Calls placed",
      stat: "11",
      delta: "+2 vs last week",
      footer: "Avg duration 14 min · 6 connected.",
    },
  ];

  return (
    <Card className="p-20 flex flex-col gap-16">
      <h3 className="text-14 font-semibold text-text-primary">This week's outreach</h3>
      <Tabs defaultValue={tabs[0].value}>
        <NeutralTabsList className="grid grid-cols-3">
          {tabs.map((tab) => (
            <NeutralTabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </NeutralTabsTrigger>
          ))}
        </NeutralTabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="flex flex-col gap-8">
            <div className="flex items-baseline gap-12">
              <span className="text-32 font-semibold leading-40 text-text-primary">
                {tab.stat}
              </span>
              <div className="flex items-center gap-4 text-12 font-semibold text-text-success">
                <TrendUp02 size={14} />
                <span>{tab.delta}</span>
              </div>
            </div>
            <p className="text-12 font-medium text-text-secondary">{tab.footer}</p>
            <div className="mt-8 flex gap-3 h-32 items-end">
              {[4, 6, 5, 8, 7, 10, 9].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-icon-primary opacity-90"
                  style={{ height: `${h * 10}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-11 font-medium text-text-tertiary pt-4">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-2 gap-12 pt-12 border-t border-border-subtle">
        <Stat icon={<Email size={14} />} label="Sent" value="43" />
        <Stat icon={<Phone01 size={14} />} label="Calls" value="11" />
      </div>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-8">
      <span className="text-icon-tertiary">{icon}</span>
      <span className="text-12 font-medium text-text-secondary">{label}</span>
      <span className="ml-auto text-13 font-semibold text-text-primary">{value}</span>
    </div>
  );
}

function SalesCoachCard() {
  return (
    <Card className="p-20 flex flex-col gap-12">
      <div className="flex items-center gap-8">
        <span className="flex size-24 items-center justify-center rounded-full bg-surface-subtle text-icon-primary">
          <Stars02 size={14} />
        </span>
        <h3 className="text-14 font-semibold text-text-primary">Sales coach</h3>
      </div>

      <p className="text-13 font-medium leading-18 text-text-secondary">
        You closed <span className="font-semibold text-text-primary">3 opportunities</span> this week and
        recovered the Sunroot conversation. Two follow-ups slipped past their 48h SLA — both with
        late-stage prospects.
      </p>

      <ul className="flex flex-col gap-6 text-13 font-medium text-text-secondary">
        <li className="flex items-start gap-8">
          <Star01 size={12} className="mt-4 shrink-0 text-icon-tertiary" />
          <span>Reply cadence dropped to 32h on average — keep it under 24h.</span>
        </li>
        <li className="flex items-start gap-8">
          <Star01 size={12} className="mt-4 shrink-0 text-icon-tertiary" />
          <span>Discovery questions are landing; consider doubling down on capability framing.</span>
        </li>
      </ul>

      <Button variant="secondary" size="sm" className="self-start mt-4">
        Ask sales coach
      </Button>
    </Card>
  );
}
