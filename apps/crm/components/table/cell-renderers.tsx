"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@level/ui/components/ui/badge";
import { Avatar } from "@level/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@level/ui/components/ui/dropdown-menu";
import { cn } from "@level/ui/lib/utils";
import type { BadgeVariant, CellType, ColumnDef, StrengthLevel } from "./types";
import { RiskPopover } from "./risk-popover";
import { StrengthPopover } from "./strength-popover";
import { SourcingPopover } from "./sourcing-popover";
import { CapabilityPopover } from "./capability-popover";
import { CompanyLogo } from "../company-logo";

const STRENGTH_DOT: Record<StrengthLevel, string> = {
  "very-weak": "bg-error-500",
  weak: "bg-error-300",
  moderate: "bg-stone-400",
  strong: "bg-success-300",
  "very-strong": "bg-success-500",
};

function StrengthCell({
  value,
  col,
  row,
}: {
  value: unknown;
  col: ColumnDef;
  row?: Record<string, unknown>;
}) {
  const str = String(value ?? "");
  const mapped = col.strengthMap?.[str];
  const label = mapped?.label ?? str;
  const level: StrengthLevel = mapped?.level ?? "moderate";

  const content = (
    <div className="flex items-center gap-8 min-w-0">
      <span className={cn("size-8 rounded-full shrink-0", STRENGTH_DOT[level])} aria-hidden />
      <span className="text-14 font-medium text-text-primary leading-20 truncate">{label}</span>
    </div>
  );

  if (!row) return content;

  return (
    <StrengthPopover
      row={{
        name: String(row.name ?? row.company ?? ""),
        level,
        label,
        interactions90d: typeof row.interactions90d === "number" ? row.interactions90d : undefined,
        lastCall: typeof row.lastCall === "string" ? row.lastCall : undefined,
        lastEmail: typeof row.lastEmail === "string" ? row.lastEmail : undefined,
        emailCount: typeof row.emailCount === "number" ? row.emailCount : undefined,
        callCount: typeof row.callCount === "number" ? row.callCount : undefined,
        openDeals: typeof row.openDeals === "number" ? row.openDeals : undefined,
      }}
    >
      {content}
    </StrengthPopover>
  );
}

const BADGE_COLOR: Record<BadgeVariant, "gray" | "primary" | "warning" | "error" | "blue" | "purple"> = {
  green: "primary",
  gray: "gray",
  yellow: "warning",
  red: "error",
};

function BadgeCell({ value, col, row }: { value: unknown; col: ColumnDef; row?: Record<string, unknown> }) {
  const str = String(value ?? "");
  if (str === "" || str === "—") {
    return <span className="text-14 font-medium text-text-tertiary">—</span>;
  }
  const mapped = col.badgeMap?.[str];
  const label = mapped?.label ?? str;
  const variant = mapped?.variant ?? "gray";

  const badge = (
    <Badge color={BADGE_COLOR[variant]} size="sm">
      {label}
    </Badge>
  );

  if ((str === "Match" || str === "No match") && row) {
    return (
      <CapabilityPopover
        row={{
          name: String(row.name ?? ""),
          status: str,
          industry: typeof row.industry === "string" ? row.industry : undefined,
          categories: typeof row.categories === "string" ? row.categories : undefined,
          certifications: typeof row.certifications === "string" ? row.certifications : undefined,
          companyType: typeof row.companyType === "string" ? row.companyType : undefined,
        }}
      >
        {badge}
      </CapabilityPopover>
    );
  }

  if ((str === "Active" || str === "Inactive") && row) {
    return (
      <SourcingPopover
        row={{
          name: String(row.name ?? ""),
          status: str,
          lastPlatformActivity: typeof row.lastPlatformActivity === "string" ? row.lastPlatformActivity : undefined,
          industry: typeof row.industry === "string" ? row.industry : undefined,
          categories: typeof row.categories === "string" ? row.categories : undefined,
        }}
      >
        {badge}
      </SourcingPopover>
    );
  }

  if ((str === "At risk" || str === "Healthy") && row) {
    return (
      <RiskPopover
        variant={str === "At risk" ? "risk" : "healthy"}
        row={{
          name: String(row.name ?? ""),
          lastInteraction: typeof row.lastInteraction === "string" ? row.lastInteraction : undefined,
          lastEmail: typeof row.lastEmail === "string" ? row.lastEmail : undefined,
          lastCall: typeof row.lastCall === "string" ? row.lastCall : undefined,
          website: typeof row.website === "string" ? row.website : undefined,
          openDeals: typeof row.openDeals === "number" ? row.openDeals : undefined,
        }}
      >
        {badge}
      </RiskPopover>
    );
  }

  return badge;
}

function LogoTextCell({ value, row }: { value: unknown; row?: Record<string, unknown> }) {
  const name = String(value ?? "");
  const companyId = typeof row?.id === "string" ? row.id : undefined;
  const website = typeof row?.website === "string" ? row.website : undefined;
  const nameContent = (
    <>
      <CompanyLogo website={website} />
      <span className="flex-1 text-14 font-semibold text-text-primary leading-20 truncate min-w-0">
        {name}
      </span>
    </>
  );

  return (
    <div className="flex items-center gap-12 w-full min-w-0">
      {companyId ? (
        <Link href={`/companies/${companyId}`} className="flex min-w-0 flex-1 items-center gap-12">
          {nameContent}
        </Link>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-12">{nameContent}</div>
      )}
      <button
        type="button"
        className="shrink-0 p-2 rounded-sm hover:bg-surface-subtle text-icon-secondary hover:text-icon-primary transition-colors"
        aria-label={`Open actions for ${name}`}
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

function AvatarTextCell({ value }: { value: unknown }) {
  const name = String(value ?? "");

  return (
    <div className="flex items-center gap-8 min-w-0">
      <Avatar name={name} size="xs" />
      <span className="text-14 font-semibold text-text-primary leading-20 truncate">
        {name}
      </span>
    </div>
  );
}

const OWNER_OPTIONS = [
  "Rachel Okafor",
  "Mina Gupta",
  "Leo Alvarez",
  "Jake Mercer",
  "Ben Ratner",
  "Elliot Shifrin",
  "Jamal Rivera",
  "Avery Chen",
  "Jordan Patel",
  "Sasha Lin",
];

function OwnerCell({ value }: { value: unknown }) {
  const initial = String(value ?? "");
  const [owner, setOwner] = useState<string>(initial);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = OWNER_OPTIONS.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DropdownMenu open={open} onOpenChange={(next) => { setOpen(next); if (!next) setQuery(""); }}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-8 min-w-0 rounded-md px-4 -mx-4 py-2 -my-2 hover:bg-surface-subtle cursor-pointer"
        >
          {owner ? (
            <>
              <Avatar name={owner} size="xs" />
              <span className="flex-1 text-left text-14 font-semibold text-text-primary leading-20 truncate">
                {owner}
              </span>
            </>
          ) : (
            <span className="flex-1 text-left text-14 text-text-tertiary leading-20">
              No assignee
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-240 p-0 max-h-[360px] overflow-y-auto">
        <div className="sticky top-0 border-b border-border-default bg-surface-card p-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Assign to…"
            autoFocus
            className="w-full h-32 px-8 text-14 text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-0"
          />
        </div>
        <button
          type="button"
          onClick={() => { setOwner(""); setOpen(false); }}
          className="flex w-full items-center gap-8 px-12 py-8 text-14 text-text-primary hover:bg-surface-subtle"
        >
          <span className="flex size-24 items-center justify-center rounded-full border border-dashed border-border-strong text-icon-tertiary text-12">
            ?
          </span>
          <span className="flex-1 text-left">No assignee</span>
        </button>
        {filtered.length === 0 && (
          <div className="px-12 py-8 text-12 text-text-tertiary">No matches</div>
        )}
        {filtered.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => { setOwner(name); setOpen(false); }}
            className="flex w-full items-center gap-8 px-12 py-8 text-14 text-text-primary hover:bg-surface-subtle"
          >
            <Avatar name={name} size="xs" />
            <span className="flex-1 text-left truncate">{name}</span>
            {owner === name && (
              <span className="text-text-secondary text-14">✓</span>
            )}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TextCell({ value }: { value: unknown }) {
  return (
    <span className="text-14 font-medium text-text-primary leading-20 truncate w-full block">
      {String(value ?? "-")}
    </span>
  );
}

function NumberCell({ value }: { value: unknown }) {
  return (
    <span className="text-14 font-medium text-text-primary leading-20 block">
      {value != null ? String(value) : "-"}
    </span>
  );
}

export function CellRenderer({
  type,
  value,
  col,
  row,
}: {
  type: CellType;
  value: unknown;
  col: ColumnDef;
  row?: Record<string, unknown>;
}) {
  switch (type) {
    case "logo-text":
      return <LogoTextCell value={value} row={row} />;
    case "badge":
      return <BadgeCell value={value} col={col} row={row} />;
    case "strength":
      return <StrengthCell value={value} col={col} row={row} />;
    case "avatar-text":
      return col.key === "owner" ? (
        <OwnerCell value={value} />
      ) : (
        <AvatarTextCell value={value} />
      );
    case "number":
      return <NumberCell value={value} />;
    default:
      return <TextCell value={value} />;
  }
}
