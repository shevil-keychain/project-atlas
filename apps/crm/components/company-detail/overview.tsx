"use client";

import { Avatar } from "@level/ui/components/ui/avatar";
import { Badge } from "@level/ui/components/ui/badge";
import { Button } from "@level/ui/components/ui/button";
import { Input } from "@level/ui/components/ui/input";
import { Textarea } from "@level/ui/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select";
import {
  Tabs,
  TabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@level/ui/components/ui/tabs";
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  DotsHorizontal,
  Email,
  Phone01,
  Plus,
  SearchSm,
  ShoppingCart01,
  ShoppingBag01,
  Users01,
  Users02,
} from "@level/ui/components/icons";
import { ActivityTimeline } from "./activity-timeline";
import { ComposeEmailModal } from "./compose-email-modal";
import { useState } from "react";

type Stat = {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  dot?: string;
};

const topStats: Stat[] = [
  { label: "Connection strength", value: "Weak", icon: Activity, dot: "bg-warning-500" },
  { label: "Contacts", value: "3", icon: Users01 },
  { label: "Deals", value: "1", icon: ShoppingBag01 },
  { label: "Orders", value: "3", icon: ShoppingCart01 },
  { label: "Active leads", value: "2", icon: ArrowUpRight },
];

const brandStats: { label: string; value: string }[] = [
  { label: "Brand Revenue", value: "$70M" },
  { label: "Brand Growth", value: "61.26%" },
  { label: "No. of Products", value: "35" },
  { label: "Avg. Product Price", value: "$9.58" },
];

const topCategories = [
  { name: "Crisp Cereal", products: 15, units: "42.8%" },
  { name: "Protein Cereal", products: 6, units: "21.2%" },
  { name: "Granola Bars", products: 5, units: "11.7%" },
];

const topProducts = [
  { name: "Fruity Grain-Free Cereal", units: "1.8M", growth: "2.23%" },
  { name: "Cocoa Grain Free Cereal", units: "1.4M", growth: "21.3%" },
  { name: "Peanut Butter High-Prot…", units: "700K", growth: "31.71%" },
];

const contacts = [
  {
    name: "John Doe",
    title: "Director of Operations",
    email: "john.doe@magicspoon.com",
    phone: "+1 (978) 555-4215",
    linkedin: true,
  },
  {
    name: "Elliot Shifrin",
    title: "Chief Commercial Officer",
    email: "elliot.shifrin@magicspoon.com",
    phone: "+1 (321) 555-7734",
    linkedin: false,
  },
  {
    name: "Jamal Rivera",
    title: "Senior Marketing Manager",
    email: "jamal.rivera@magicspoon.com",
    phone: "+1 (212) 555-4487",
    linkedin: true,
  },
];

const deals = [
  {
    name: "Magic Spoon – Protein Bar Product",
    status: "Qualification",
    statusColor: "gray" as const,
    owner: "John Doe",
    value: "$195,000.00",
    lastActivity: "Apr 12, 2026",
  },
  {
    name: "Magic Spoon – Protein Bar Product",
    status: "Closed-Won",
    statusColor: "primary" as const,
    owner: "John Doe",
    value: "$195,000.00",
    lastActivity: "Apr 12, 2026",
  },
];

const orders = [
  { name: "SO-260415-001", total: "$25,000.00", date: "Apr 20, 2026" },
  { name: "SO-260415-001", total: "$25,000.00", date: "Apr 20, 2026" },
  { name: "SO-260415-001", total: "$25,000.00", date: "Apr 20, 2026" },
];

type Activity = {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconNode?: React.ReactNode;
  label: React.ReactNode;
  timestamp: string;
  expandable?: boolean;
  details?: { label: string; value: React.ReactNode }[];
};

function GmailLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M2 6.5 12 13l10-6.5V18a2 2 0 0 1-2 2h-2V10.5l-6 4-6-4V20H4a2 2 0 0 1-2-2V6.5Z" fill="#EA4335"/>
      <path d="M22 6.5V18a2 2 0 0 1-2 2h-2V10.5l4-4Z" fill="#FBBC04"/>
      <path d="M2 6.5 6 10.5V20H4a2 2 0 0 1-2-2V6.5Z" fill="#34A853"/>
      <path d="M2 6.5A2 2 0 0 1 4 4.5h1L12 9l7-4.5h1a2 2 0 0 1 2 2L12 13 2 6.5Z" fill="#4285F4"/>
      <path d="M6 10.5 12 13l-6 4v-6.5Z" fill="#C5221F"/>
    </svg>
  );
}

function GoogleMeetLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M15 8v8l5 3.5V4.5L15 8Z" fill="#00AC47"/>
      <path d="M3 7v10a2 2 0 0 0 2 2h10v-4H8V11L3 7Z" fill="#FFBA00"/>
      <path d="M3 7l5 4V7a2 2 0 0 1 2-2h5V3H5a2 2 0 0 0-2 2v2Z" fill="#00832D"/>
      <path d="M15 19v-4l5 4.5V19h-5Z" fill="#0066DA"/>
      <path d="M15 3v8h5V5a2 2 0 0 0-2-2h-3Z" fill="#E94235"/>
    </svg>
  );
}

function CircularIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 flex size-28 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-icon-secondary">
      {children}
    </span>
  );
}

function BrandIconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 flex size-28 shrink-0 items-center justify-center rounded-full bg-surface-card border border-border-default">
      {children}
    </span>
  );
}

const activityApril: Activity[] = [
  {
    iconNode: (
      <BrandIconBadge>
        <GmailLogo size={16} />
      </BrandIconBadge>
    ),
    label: (
      <>
        Opened email: <span className="font-semibold">Follow-Up Call</span> sent by{" "}
        <span className="font-semibold">John Doe</span>
      </>
    ),
    timestamp: "Apr 22, 2026 at 4:13 PM",
    expandable: true,
    details: [
      {
        label: "Sent to",
        value: "Oisin Hanrahan (oisin@keychain.com), Umang Dua (umang@keychain.com)",
      },
      { label: "Sent from", value: "John Doe (john.doe@company.com)" },
      { label: "Date sent", value: "Apr 22, 2026 at 3:16 PM" },
      { label: "Subject", value: "Follow-Up Call" },
      {
        label: "Email",
        value: (
          <>
            “Hi Elliot, I'd like to schedule an intro call to discuss how Keychain can help
            Magic Spoon. Are you available next week?
            <br />
            Feel free to{" "}
            <span className="text-text-brand">grab time directly on my calendar</span> or
            suggest a few blocks that work.…”
          </>
        ),
      },
    ],
  },
  {
    iconNode: (
      <span className="mt-2 shrink-0">
        <Avatar name="Magic Spoon" size="sm" />
      </span>
    ),
    label: (
      <>
        Visited <span className="font-semibold">Our Services</span> +3 pages on your website.
      </>
    ),
    timestamp: "Apr 18, 2026 at 2:32 PM",
  },
  {
    iconNode: (
      <span className="mt-2 shrink-0">
        <Avatar name="Magic Spoon" size="sm" />
      </span>
    ),
    label: <>Visited your Keychain profile.</>,
    timestamp: "Apr 18, 2026 at 1:51 PM",
  },
  {
    iconNode: (
      <span className="mt-2 shrink-0">
        <Avatar name="Magic Spoon" size="sm" />
      </span>
    ),
    label: <>Saw your Keychain profile in search.</>,
    timestamp: "Apr 18, 2026 at 1:48 PM",
  },
];

const activityMarch: Activity[] = [
  {
    iconNode: (
      <BrandIconBadge>
        <GoogleMeetLogo size={16} />
      </BrandIconBadge>
    ),
    label: (
      <>
        Attended <span className="font-semibold">Keychain Intro Call</span> with{" "}
        <span className="font-semibold">John Doe</span> +4 attendees.
      </>
    ),
    timestamp: "Mar 27, 2026 at 4:00 PM",
  },
  {
    iconNode: (
      <BrandIconBadge>
        <GoogleMeetLogo size={16} />
      </BrandIconBadge>
    ),
    label: (
      <>
        Invited to <span className="font-semibold">Keychain Intro Call</span> on Mar 27 (4:00
        PM - 4:30 PM) by <span className="font-semibold">John Doe</span>
      </>
    ),
    timestamp: "Mar 22, 2026 at 10:13 AM",
  },
  {
    icon: ShoppingBag01,
    label: (
      <>
        Added to deal: <span className="font-semibold">Keychain – Protein Bar Product</span>{" "}
        by <span className="font-semibold">John Doe</span>
      </>
    ),
    timestamp: "Mar 22, 2026 at 9:51 AM",
  },
  {
    iconNode: (
      <BrandIconBadge>
        <GmailLogo size={16} />
      </BrandIconBadge>
    ),
    label: (
      <>
        Received newsletter: <span className="font-semibold">March Newsletter</span>
      </>
    ),
    timestamp: "Mar 16, 2026 at 9:00 AM",
  },
  {
    icon: Users02,
    label: (
      <>
        Job Title +3 other contact properties updated by{" "}
        <span className="font-semibold">John Doe</span>
      </>
    ),
    timestamp: "Mar 8, 2026 at 3:18 PM",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <div className="flex flex-1 flex-col gap-12 rounded-xl border border-border-default bg-surface-card p-16">
      <div className="flex items-start justify-between">
        <span className="text-12 text-text-secondary">{stat.label}</span>
        <Icon size={16} className="text-icon-tertiary" />
      </div>
      <div className="flex items-center gap-8">
        {stat.dot && <span className={`size-8 shrink-0 rounded-full ${stat.dot}`} />}
        <span className="text-20 font-semibold text-text-primary">{stat.value}</span>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  count,
  action,
  leadingIcon,
}: {
  title: string;
  count?: number;
  action?: React.ReactNode;
  leadingIcon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        {leadingIcon}
        <h3 className="text-14 font-semibold text-text-primary">{title}</h3>
        {count !== undefined && (
          <Badge color="gray" size="sm">
            {count}
          </Badge>
        )}
      </div>
      {action}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const Icon = activity.icon;
  return (
    <div className="rounded-xl border border-border-default bg-surface-card">
      <div className="flex items-start gap-8 p-12">
        <ChevronRight
          size={16}
          className={`mt-6 shrink-0 text-icon-tertiary ${activity.expandable ? "rotate-90" : ""}`}
        />
        {activity.iconNode ? (
          activity.iconNode
        ) : Icon ? (
          <CircularIcon>
            <Icon size={14} />
          </CircularIcon>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <p className="text-14 text-text-primary">{activity.label}</p>
            <span className="text-12 text-text-tertiary">{activity.timestamp}</span>
          </div>
          {activity.details && (
            <div className="flex flex-col gap-8 pt-8">
              {activity.details.map((row, i) => (
                <div key={i} className="flex gap-16">
                  <span className="w-128 shrink-0 text-12 text-text-secondary">{row.label}</span>
                  <span className="flex-1 text-14 text-text-primary">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const tabTriggerClass =
  "whitespace-nowrap data-[state=active]:border-secondary-yellow-500 data-[state=active]:text-text-primary";

function TopStats() {
  return (
    <div className="flex gap-12">
      {topStats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function StrengthBars({ level }: { level: 1 | 2 | 3 }) {
  const heights = ["h-6", "h-10", "h-14"];
  const fullColor = level === 3 ? "bg-success-500" : "bg-secondary-yellow-600";
  return (
    <div className="flex items-end gap-2" aria-label={`Connection strength ${level} of 3`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-4 rounded-sm ${h} ${
            i < level ? fullColor : "bg-border-subtle"
          }`}
        />
      ))}
    </div>
  );
}

type CompanyMeta = { name: string; industry: string; owner: string; status: string };

function SummaryEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-14 font-semibold text-text-secondary">{children}</span>
  );
}

function CompanyOverviewCard({ company }: { company: CompanyMeta }) {
  return (
    <section className="rounded-xl border border-border-default bg-surface-card p-20 shadow-sm">
      <div className="flex flex-col gap-12">
        <SummaryEyebrow>About</SummaryEyebrow>
        <p className="text-14 leading-relaxed text-text-primary">
          <span className="font-semibold">{company.name}</span> is a{" "}
          {company.industry.toLowerCase()} brand currently in a{" "}
          <span className="font-semibold">{company.status.toLowerCase()}</span> stage,
          owned by {company.owner}. They sell direct-to-consumer products with strong
          brand recognition and a growing wholesale footprint.
        </p>
        <div className="pt-16">
          <div className="grid grid-cols-4 gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-12 text-text-secondary">Revenue</span>
              <span className="text-16 font-semibold text-text-primary">$70M</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-12 text-text-secondary">Growth</span>
              <span className="text-16 font-semibold text-text-primary">+61%</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-12 text-text-secondary">Products</span>
              <span className="text-16 font-semibold text-text-primary">35</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-12 text-text-secondary">Avg. price</span>
              <span className="text-16 font-semibold text-text-primary">$9.58</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentActivityCard({ company }: { company: CompanyMeta }) {
  const [composeOpen, setComposeOpen] = useState(false);
  return (
    <section className="overflow-hidden rounded-xl border border-border-default bg-surface-card shadow-sm">
      <div className="flex flex-col gap-12 p-20">
        <SummaryEyebrow>Recommended action</SummaryEyebrow>
        <p className="text-14 leading-relaxed text-text-primary">
          We pitched our private-label production capability to{" "}
          <span className="font-semibold">{company.name}</span> last time. The team said
          they'll <span className="font-semibold">review internally</span> and circle
          back, but the champion{" "}
          <span className="font-semibold">Elliot Shifrin</span> has gone quiet on email
          since.
        </p>
      </div>

      <div className="flex flex-col gap-12 px-20 pb-20">
        <p className="text-14 leading-relaxed text-text-primary">
          Send a tailored email on your{" "}
          <span className="font-semibold">production capability</span>, attaching the
          latest sales collateral and a case study from a similar brand.
        </p>
        <div>
          <Button size="sm" onClick={() => setComposeOpen(true)}>
            Send email
          </Button>
        </div>
      </div>

      <ComposeEmailModal open={composeOpen} onOpenChange={setComposeOpen} />
    </section>
  );
}

function BrandInsightsSection() {
  return (
    <section className="flex flex-col gap-12">
              <SectionHeader
                title="Brand Insights"
                action={
                  <Button variant="secondary" size="sm">
                    View Profile
                  </Button>
                }
              />

              <div className="flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-card">
                <div className="grid grid-cols-4 divide-x divide-border-default">
                  {brandStats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-8 p-16">
                      <span className="text-12 text-text-secondary">{s.label}</span>
                      <span className="text-18 font-semibold text-text-primary">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-16">
                <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                    <span>Top Categories</span>
                    <span className="w-80 text-right">No. of Products</span>
                    <span className="w-80 text-right">% of Units</span>
                  </div>
                  {topCategories.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-16 border-b border-border-default px-16 py-12 last:border-b-0"
                    >
                      <div className="flex items-center gap-12">
                        <Avatar name={row.name} size="sm" />
                        <span className="text-14 text-text-primary">{row.name}</span>
                      </div>
                      <span className="w-80 text-right text-14 text-text-primary">{row.products}</span>
                      <span className="w-80 text-right text-14 text-text-primary">{row.units}</span>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                    <span>Top Products</span>
                    <span className="w-64 text-right">Units</span>
                    <span className="w-80 text-right">Growth Rate</span>
                  </div>
                  {topProducts.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-16 border-b border-border-default px-16 py-12 last:border-b-0"
                    >
                      <div className="flex items-center gap-12">
                        <Avatar name={row.name} size="sm" />
                        <span className="truncate text-14 text-text-primary">{row.name}</span>
                      </div>
                      <span className="w-64 text-right text-14 text-text-primary">{row.units}</span>
                      <span className="w-80 text-right text-14 text-text-primary">{row.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
  );
}

function ContactsSection() {
  return (
    <section className="flex flex-col gap-12">
              <SectionHeader
                title="Contacts"
                count={3}
                action={
                  <Button size="sm" iconLeft={<Plus size={16} />}>
                    Add
                  </Button>
                }
              />
              <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                  <span>Contact</span>
                  <span>Email</span>
                  <span>Phone</span>
                  <span>LinkedIn</span>
                  <span className="w-16" />
                </div>
                {contacts.map((c) => (
                  <div
                    key={c.email}
                    className="grid grid-cols-[2fr_2fr_1.5fr_1fr_auto] items-center gap-16 border-b border-border-default px-16 py-12 last:border-b-0"
                  >
                    <div className="flex items-center gap-12">
                      <Avatar name={c.name} size="sm" />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-14 font-medium text-text-primary">
                          {c.name}
                        </span>
                        <span className="truncate text-12 text-text-secondary">{c.title}</span>
                      </div>
                    </div>
                    <span className="truncate text-14 text-text-primary">{c.email}</span>
                    <span className="truncate text-14 text-text-primary">{c.phone}</span>
                    <span>
                      {c.linkedin ? (
                        <Badge color="blue" size="sm">
                          in
                        </Badge>
                      ) : (
                        <span className="text-14 text-text-tertiary">—</span>
                      )}
                    </span>
                    <Button variant="ghost" size="icon-sm" aria-label="More">
                      <DotsHorizontal size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </section>
  );
}

function DealsSection() {
  return (
    <section className="flex flex-col gap-12">
              <SectionHeader
                title="Deals"
                count={1}
                action={
                  <Button size="sm" iconLeft={<Plus size={16} />}>
                    Create
                  </Button>
                }
              />
              <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                  <span>Deal Name</span>
                  <span>Status</span>
                  <span>Owner</span>
                  <span>Deal Value</span>
                  <span>Last Activity</span>
                  <span className="w-16" />
                </div>
                {deals.map((d, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-16 border-b border-border-default px-16 py-16 last:border-b-0"
                  >
                    <span className="truncate text-14 text-text-primary">{d.name}</span>
                    <span>
                      <Badge color={d.statusColor} size="sm">
                        {d.status}
                      </Badge>
                    </span>
                    <span className="truncate text-14 text-text-primary">{d.owner}</span>
                    <span className="text-14 text-text-primary">{d.value}</span>
                    <span className="text-14 text-text-primary">{d.lastActivity}</span>
                    <Button variant="ghost" size="icon-sm" aria-label="More">
                      <DotsHorizontal size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </section>
  );
}

function OrdersSection() {
  return (
    <section className="flex flex-col gap-12">
              <SectionHeader
                title="Orders"
                count={3}
                action={
                  <Button variant="secondary" size="sm" iconRight={<ArrowUpRight size={16} />}>
                    View in KeychainOS
                  </Button>
                }
              />
              <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                  <span>Deal Name</span>
                  <span>Status</span>
                  <span>Order Total</span>
                  <span>Delivery Date</span>
                  <span className="w-16" />
                </div>
                {orders.map((o, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-16 border-b border-border-default px-16 py-16 last:border-b-0"
                  >
                    <span className="truncate text-14 text-text-primary">{o.name}</span>
                    <Badge color="primary" size="sm">
                      Completed
                    </Badge>
                    <span className="text-14 text-text-primary">{o.total}</span>
                    <span className="text-14 text-text-primary">{o.date}</span>
                    <Button variant="ghost" size="icon-sm" aria-label="More">
                      <DotsHorizontal size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </section>
  );
}

function ActivitySection() {
  return (
    <section className="flex flex-col gap-12">
              <h3 className="text-14 font-semibold text-text-primary">Activity</h3>
              <div className="flex items-center gap-12">
                <div className="relative flex-1">
                  <SearchSm
                    size={16}
                    className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-icon-tertiary"
                  />
                  <Input placeholder="Search…" className="pl-36" />
                </div>
                <Select defaultValue="all-types">
                  <SelectTrigger className="w-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">Activity Type</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="visit">Visit</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-8">
                  <span className="text-12 text-text-secondary">April 2026</span>
                  <div className="flex flex-col gap-8">
                    {activityApril.map((a, i) => (
                      <ActivityCard key={i} activity={a} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <span className="text-12 text-text-secondary">March 2026</span>
                  <div className="flex flex-col gap-8">
                    {activityMarch.map((a, i) => (
                      <ActivityCard key={i} activity={a} />
                    ))}
                  </div>
                </div>
              </div>
    </section>
  );
}

export function CompanyOverview({ company }: { company: CompanyMeta }) {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-24 py-12">
          <UnderlinedTabsList className="gap-32">
            <UnderlinedTabsTrigger value="overview" className={tabTriggerClass}>
              Overview
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger value="brand-insights" className={tabTriggerClass}>
              Brand Insights
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="contacts"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">3</Badge>}
            >
              Contacts
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="referrals"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">5</Badge>}
            >
              Referrals
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger value="prospects" className={tabTriggerClass}>
              Prospects
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="emails"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">4</Badge>}
            >
              Emails
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="deals"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">1</Badge>}
            >
              Deals
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="orders"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">3</Badge>}
            >
              Orders
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="notes"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">3</Badge>}
            >
              Notes
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger
              value="calls"
              className={tabTriggerClass}
              badge={<Badge color="gray" size="sm">4</Badge>}
            >
              Calls
            </UnderlinedTabsTrigger>
            <UnderlinedTabsTrigger value="activity" className={tabTriggerClass}>
              Activity
            </UnderlinedTabsTrigger>
          </UnderlinedTabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <div className="flex items-center gap-16">
              <h2 className="text-24 font-semibold text-text-primary">Overview</h2>
              <div className="flex items-center gap-8">
                <span className="size-8 shrink-0 rounded-full bg-surface-warning" aria-hidden />
                <span className="text-14 font-medium text-text-primary">Weak connection</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <CompanyOverviewCard company={company} />
              <RecentActivityCard company={company} />
            </div>
            <ActivityTimeline />
            <ActivitySection />
          </div>
        </TabsContent>

        <TabsContent value="brand-insights" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <BrandInsightsSection />
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <ContactsSection />
          </div>
        </TabsContent>

        <TabsContent value="deals" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <DealsSection />
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <OrdersSection />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <ActivitySection />
          </div>
        </TabsContent>

        <TabsContent value="emails" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <SectionHeader
              title="Emails"
              count={4}
              action={
                <Button size="sm" iconLeft={<Plus size={16} />}>
                  Compose
                </Button>
              }
            />
            <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
              {[
                {
                  from: "John Doe",
                  subject: "Follow-Up Call",
                  preview:
                    "Hi Elliot, I'd like to schedule an intro call to discuss how Keychain can help Magic Spoon…",
                  date: "Apr 22, 2026",
                  unread: true,
                },
                {
                  from: "Elliot Shifrin",
                  subject: "Re: Pricing options",
                  preview:
                    "Thanks for sending these over. The team is reviewing and we'll have feedback by Friday.",
                  date: "Apr 18, 2026",
                  unread: false,
                },
                {
                  from: "John Doe",
                  subject: "Pricing options",
                  preview:
                    "Attaching the three pricing tiers we discussed on the call. Let me know which fits best.",
                  date: "Apr 15, 2026",
                  unread: false,
                },
                {
                  from: "Jamal Rivera",
                  subject: "March Newsletter",
                  preview:
                    "Here's what's new at Keychain this month — new dashboards, faster sync, and more.",
                  date: "Mar 16, 2026",
                  unread: false,
                },
              ].map((email, i) => (
                <div
                  key={i}
                  className="flex items-start gap-12 border-b border-border-default px-16 py-12 last:border-b-0"
                >
                  <span className="mt-4 flex size-32 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-icon-secondary">
                    <Email size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex min-w-0 items-center gap-8">
                        <span
                          className={`truncate text-14 ${
                            email.unread
                              ? "font-semibold text-text-primary"
                              : "text-text-primary"
                          }`}
                        >
                          {email.from}
                        </span>
                        {email.unread && (
                          <Badge color="blue" size="sm">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="shrink-0 text-12 text-text-tertiary">
                        {email.date}
                      </span>
                    </div>
                    <span className="truncate text-14 font-medium text-text-primary">
                      {email.subject}
                    </span>
                    <span className="truncate text-14 text-text-secondary">
                      {email.preview}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <SectionHeader title="Notes" count={3} />
            <div className="flex flex-col gap-12 rounded-xl border border-border-default bg-surface-card p-16">
              <Textarea
                placeholder="Write a note about this account…"
                className="min-h-128 resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-12 text-text-tertiary">
                  Notes are visible to the whole team.
                </span>
                <div className="flex items-center gap-8">
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Save note</Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {[
                {
                  author: "John Doe",
                  date: "Apr 18, 2026",
                  body:
                    "Elliot mentioned they're rolling out a new protein bar line in Q3. Likely a good fit for the bundled plan — flagged to revisit pricing in May.",
                },
                {
                  author: "Jamal Rivera",
                  date: "Mar 22, 2026",
                  body:
                    "Intro call went well. Champion is Elliot (CCO). Next step: send tailored proposal with two pricing tiers and case study from a similar brand.",
                },
                {
                  author: "John Doe",
                  date: "Feb 14, 2026",
                  body:
                    "Account flagged as warm after newsletter engagement. They downloaded the integration guide twice in one week.",
                },
              ].map((note, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-12 rounded-xl border border-border-default bg-surface-card p-16 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                      <Avatar name={note.author} size="sm" />
                      <span className="text-14 font-semibold text-text-primary">
                        {note.author}
                      </span>
                    </div>
                    <span className="text-12 text-text-tertiary">{note.date}</span>
                  </div>
                  <p className="text-14 text-text-primary">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calls" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <SectionHeader
              title="Calls"
              count={4}
              action={
                <Button size="sm" iconLeft={<Phone01 size={16} />}>
                  Log call
                </Button>
              }
            />
            <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-16 border-b border-border-default px-16 py-10 text-12 text-text-secondary">
                <span>Contact</span>
                <span>Owner</span>
                <span>Direction</span>
                <span>Duration</span>
                <span>Date</span>
              </div>
              {[
                {
                  contact: "Elliot Shifrin",
                  title: "Chief Commercial Officer",
                  owner: "John Doe",
                  direction: "Outbound" as const,
                  duration: "24m 12s",
                  date: "Apr 22, 2026",
                },
                {
                  contact: "John Doe",
                  title: "Director of Operations",
                  owner: "Jamal Rivera",
                  direction: "Inbound" as const,
                  duration: "8m 47s",
                  date: "Apr 15, 2026",
                },
                {
                  contact: "Elliot Shifrin",
                  title: "Chief Commercial Officer",
                  owner: "John Doe",
                  direction: "Outbound" as const,
                  duration: "32m 05s",
                  date: "Mar 27, 2026",
                },
                {
                  contact: "Jamal Rivera",
                  title: "Senior Marketing Manager",
                  owner: "John Doe",
                  direction: "Missed" as const,
                  duration: "—",
                  date: "Mar 14, 2026",
                },
              ].map((call, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] items-center gap-16 border-b border-border-default px-16 py-12 last:border-b-0"
                >
                  <div className="flex items-center gap-12">
                    <Avatar name={call.contact} size="sm" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-14 font-medium text-text-primary">
                        {call.contact}
                      </span>
                      <span className="truncate text-12 text-text-secondary">{call.title}</span>
                    </div>
                  </div>
                  <span className="truncate text-14 text-text-primary">{call.owner}</span>
                  <span>
                    <Badge
                      color={
                        call.direction === "Missed"
                          ? "error"
                          : call.direction === "Inbound"
                            ? "blue"
                            : "primary"
                      }
                      size="sm"
                    >
                      {call.direction}
                    </Badge>
                  </span>
                  <span className="text-14 text-text-primary">{call.duration}</span>
                  <span className="text-14 text-text-primary">{call.date}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="referrals" className="mt-0">
          <div className="flex flex-col gap-24 p-24">
            <div className="flex flex-col gap-4">
              <h2 className="text-24 font-semibold text-text-primary">Referrals</h2>
              <p className="text-14 text-text-secondary">
                Contacts in your network who know someone at {company.name}.
              </p>
            </div>

            {/* Recommended */}
            <section className="overflow-hidden rounded-xl border border-border-default bg-surface-card shadow-sm">
              <div className="border-b border-border-default bg-surface-subtle px-20 py-10">
                <span className="text-12 font-semibold uppercase tracking-wide text-text-secondary">
                  Recommended
                </span>
              </div>
              <div className="flex items-center gap-16 p-20">
                <Avatar name="Isa Fuller" size="lg" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <span className="text-16 font-semibold text-text-primary">Isa Fuller</span>
                  <span className="text-14 text-text-secondary">
                    Director of Product · 4 mutual contacts
                  </span>
                </div>
                <StrengthBars level={3} />
                <Button variant="secondary" size="sm">
                  Ask for intro
                </Button>
              </div>
            </section>

            <section className="flex flex-col gap-12">
              <div className="overflow-hidden rounded-xl border border-border-default bg-surface-card">
                {[
                  {
                    name: "Josie Hartwell",
                    title: "VP of Marketing · Loop",
                    strength: 3 as const,
                    knows: "John Doe",
                  },
                  {
                    name: "Cameron Reznick",
                    title: "Head of Partnerships · Aspire",
                    strength: 2 as const,
                    knows: "Elliot Shifrin",
                  },
                  {
                    name: "Priya Anand",
                    title: "GM, North America · Snackcraft Labs",
                    strength: 2 as const,
                    knows: "Jamal Rivera",
                  },
                  {
                    name: "Marcus Webb",
                    title: "Founder · Field Day Provisions",
                    strength: 1 as const,
                    knows: "John Doe",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-16 border-b border-border-default px-16 py-12 last:border-b-0"
                  >
                    <Avatar name={p.name} size="sm" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-14 font-medium text-text-primary">
                        {p.name}
                      </span>
                      <span className="truncate text-12 text-text-secondary">{p.title}</span>
                    </div>
                    <span className="hidden text-12 text-text-tertiary md:inline">
                      Knows{" "}
                      <span className="font-semibold text-text-primary">{p.knows}</span>
                    </span>
                    <StrengthBars level={p.strength} />
                    <Button variant="secondary" size="sm">
                      Ask for intro
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="mt-0">
          <div className="p-24">
            <p className="text-14 text-text-secondary">No prospects yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
