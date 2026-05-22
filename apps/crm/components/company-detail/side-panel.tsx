"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@level/ui/components/ui/avatar";
import { Badge } from "@level/ui/components/ui/badge";
import { Button } from "@level/ui/components/ui/button";
import { cn } from "@level/ui/lib/utils";
import {
  ArrowLeft,
  ChevronDown,
  Building01,
  CalendarPlus01,
  Email,
  DotsHorizontal,
} from "@level/ui/components/icons";

export type SidePanelContact = {
  initials: string;
  name: string;
  title: string;
};

export type SidePanelLinkedAccount = {
  name: string;
  website: string;
  status: string;
};

export type SidePanelAddress = {
  lines: string[];
  type: "Billing" | "Shipping";
};

export type CompanySidePanelData = {
  name: string;
  status: string;
  keyDetails: {
    accountName: string;
    accountType: string;
    website: string;
    phone: string;
    industry: string;
    owner: string;
    description: string;
  };
  timestamps: {
    createdAt: string;
    lastActivity: string;
    statusLastChangedAt: string;
  };
  primaryContact: SidePanelContact;
  parentAccount: SidePanelLinkedAccount;
  childAccounts: SidePanelLinkedAccount[];
  primaryAddresses: SidePanelAddress[];
};

type SectionProps = {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

function Section({ label, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-8 border-b border-border-default p-16">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-4 text-text-primary"
      >
        <ChevronDown
          size={20}
          className={cn(
            "text-icon-secondary transition-transform",
            !open && "-rotate-90",
          )}
        />
        <span className="text-12 font-semibold">{label}</span>
      </button>
      {open && <div className="flex flex-col gap-16 py-8">{children}</div>}
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-12 text-text-secondary">{label}</span>
      <span className="text-14 text-text-primary">{value}</span>
    </div>
  );
}

function RecordCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-12 rounded-lg border border-border-default bg-surface-card p-12 shadow-sm">
      {children}
    </div>
  );
}

export function CompanySidePanel({ data }: { data: CompanySidePanelData }) {
  return (
    <aside className="flex h-full w-288 shrink-0 flex-col overflow-y-auto border-r border-border-default bg-surface-card">
      {/* Header */}
      <div className="flex flex-col gap-24 border-b border-border-default p-24">
        <Link
          href="/companies"
          className="flex items-center gap-6 text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          <span className="text-12">All accounts</span>
        </Link>

        <div className="flex flex-col gap-12">
          <Avatar
            name={data.name}
            size="md"
            src={
              data.keyDetails.website
                ? `https://www.google.com/s2/favicons?domain=${data.keyDetails.website}&sz=128`
                : undefined
            }
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-18 font-semibold text-text-primary">{data.name}</h2>
            <div>
              <Badge color="gray" size="sm">
                {data.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<Email size={20} />}
            className="flex-1 min-w-0"
          >
            Compose email
          </Button>
          <Button variant="secondary" size="icon-sm" aria-label="Send calendar invite">
            <CalendarPlus01 size={16} />
          </Button>
          <Button variant="secondary" size="icon-sm" aria-label="More">
            <DotsHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* Sections */}
      <Section label="Key Details">
        <PropertyRow label="Account Name" value={data.keyDetails.accountName} />
        <PropertyRow label="Account Type" value={data.keyDetails.accountType} />
        <PropertyRow
          label="Connection strength"
          value={
            <div className="flex items-center gap-8">
              <span className="size-8 shrink-0 rounded-full bg-surface-warning" aria-hidden />
              <span className="text-14 font-medium text-text-primary">Weak</span>
            </div>
          }
        />
        <PropertyRow label="Website" value={data.keyDetails.website} />
        <PropertyRow label="Phone" value={data.keyDetails.phone} />
        <PropertyRow label="Industry" value={data.keyDetails.industry} />
        <PropertyRow label="Owner" value={data.keyDetails.owner} />
        <PropertyRow label="Description" value={data.keyDetails.description} />
      </Section>

      <Section label="Timestamps">
        <PropertyRow label="Created at" value={data.timestamps.createdAt} />
        <PropertyRow label="Last activity" value={data.timestamps.lastActivity} />
        <PropertyRow
          label="Status last changed at"
          value={data.timestamps.statusLastChangedAt}
        />
      </Section>

      <Section label="Primary Contact">
        <RecordCard>
          <Avatar name={data.primaryContact.name} size="xs" />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <span className="text-14 font-medium text-text-primary">
              {data.primaryContact.name}
            </span>
            <span className="text-12 text-text-secondary">
              {data.primaryContact.title}
            </span>
          </div>
        </RecordCard>
      </Section>

      <Section label="Parent Account">
        <LinkedAccountCard account={data.parentAccount} />
      </Section>

      <Section label="Child Accounts">
        {data.childAccounts.map((account, i) => (
          <LinkedAccountCard key={i} account={account} />
        ))}
      </Section>

      <Section label="Primary Addresses">
        {data.primaryAddresses.map((address, i) => (
          <RecordCard key={i}>
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <div className="text-14 text-text-primary">
                {address.lines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
              <div>
                <Badge color="gray" size="sm">
                  {address.type}
                </Badge>
              </div>
            </div>
          </RecordCard>
        ))}
      </Section>
    </aside>
  );
}

function LinkedAccountCard({ account }: { account: SidePanelLinkedAccount }) {
  return (
    <RecordCard>
      <div className="flex size-24 shrink-0 items-center justify-center rounded border border-border-default bg-surface-subtle">
        <Building01 size={14} className="text-icon-secondary" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <span className="text-14 font-medium text-text-primary">{account.name}</span>
        <span className="text-12 text-text-secondary">{account.website}</span>
        <div>
          <Badge color="gray" size="sm">
            {account.status}
          </Badge>
        </div>
      </div>
    </RecordCard>
  );
}
