"use client";

import { cn } from "@level/ui/lib/utils";
import { SimpleTooltip, TooltipProvider } from "@level/ui/components/ui/tooltip";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  TrendingUp,
  Megaphone,
  FileText,
  Hash,
  Swords,
  Calendar,
  FolderKanban,
  Compass,
  Contact,
  Building2,
  Users,
  Target,
  Handshake,
  Sparkles,
  Search,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

type SubItem = { label: string; active?: boolean };

type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: string;
  chevron?: "down" | "right";
  active?: boolean;
  children?: SubItem[];
};

type Section = {
  label?: string; // section subtext label
  items: NavItem[];
};

// ─── Nav data ─────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    items: [
      { label: "Home", icon: Home, href: "/home" },
      { label: "Keychain AI", icon: Sparkles },
      { label: "Insights", icon: TrendingUp },
      { label: "Reports", icon: FileText },
      {
        label: "Marketing",
        icon: Megaphone,
        chevron: "right",
        children: [
          { label: "Content" },
          { label: "Keywords" },
          { label: "Competitors" },
          { label: "Events" },
          { label: "Projects" },
        ],
      },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Companies", icon: Building2, href: "/companies" },
      { label: "Contacts", icon: Users, href: "/people" },
    ],
  },
  {
    label: "Market",
    items: [
      { label: "Discover", icon: Compass, href: "/discover" },
      { label: "Prospecting", icon: Contact },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { label: "Leads", icon: Target },
      { label: "Deals", icon: Handshake },
    ],
  },
  {
    items: [
      { label: "Sourcing", icon: Search, chevron: "right" },
      { label: "Settings", icon: Settings },
    ],
  },
];

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLink({ item, collapsed }: { item: NavItem; collapsed?: boolean }) {
  const Icon = item.icon;
  const pathname = usePathname();
  const isExpanded = item.chevron === "down" && item.children;
  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href + "/")
    : !!item.active;

  const rowClass = cn(
    "flex items-center rounded-lg w-full cursor-pointer",
    collapsed ? "justify-center p-8" : "gap-12 px-8 py-8",
    isActive ? "bg-[#fde047]" : "hover:bg-[#f9fafb]"
  );

  const rowInner = (
    <>
      <Icon
        size={20}
        className={cn("shrink-0", isActive ? "text-[#111827]" : "text-[#6b7280]")}
      />
      {!collapsed && (
        <>
          <span
            className={cn(
              "flex-1 text-14 font-semibold leading-20 min-w-0",
              isActive ? "text-[#111827]" : "text-[#6b7280]"
            )}
          >
            {item.label}
          </span>

          {item.badge && (
            <span className="flex items-center justify-center px-8 py-2 bg-[#fde047] border border-black/[0.06] rounded-full text-12 font-semibold text-[#111827] leading-16 shrink-0">
              {item.badge}
            </span>
          )}

          {item.chevron && !item.badge && (
            item.chevron === "down" ? (
              <ChevronDown size={16} className="shrink-0 text-[#9ca3af]" />
            ) : (
              <ChevronRight size={16} className="shrink-0 text-[#9ca3af]" />
            )
          )}
        </>
      )}
    </>
  );

  const trigger = item.href ? (
    <Link href={item.href} className={rowClass}>
      {rowInner}
    </Link>
  ) : (
    <div className={rowClass}>{rowInner}</div>
  );

  return (
    <div className="flex flex-col w-full">
      {collapsed ? (
        <SimpleTooltip content={item.label} side="right" delayDuration={150}>
          {trigger}
        </SimpleTooltip>
      ) : (
        trigger
      )}

      {!collapsed && isExpanded && item.children && (
        <div className="flex flex-col pl-16">
          {item.children.map((child) => (
            <div key={child.label} className="border-l-2 border-[#e8e8eb] pl-16">
              <div
                className={cn(
                  "flex items-center px-8 py-8 rounded-lg cursor-pointer",
                  child.active ? "bg-[#fde047]" : "hover:bg-[#f9fafb]"
                )}
              >
                <span
                  className={cn(
                    "text-14 font-semibold leading-20 whitespace-nowrap",
                    child.active ? "text-[#111827]" : "text-[#6b7280]"
                  )}
                >
                  {child.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tier Header ──────────────────────────────────────────────────────────────

function TierHeader({ label, expanded = false }: { label: string; expanded?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-8 px-8 py-8 w-full">
      <span className="text-14 font-bold text-[#111827] leading-20">{label}</span>
      {expanded ? (
        <ChevronDown size={16} className="shrink-0 text-[#6b7280]" />
      ) : (
        <ChevronRight size={16} className="shrink-0 text-[#6b7280]" />
      )}
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
    <aside
      className={cn(
        "relative flex flex-col h-full bg-white border-r border-[#e8e8eb] p-12 shrink-0 transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[256px]"
      )}
    >
      {/* Logo + collapse toggle */}
      <div className={cn("shrink-0 flex items-center", collapsed ? "justify-center px-0 py-16" : "justify-between px-8 py-16")}>
        {!collapsed && (
          <Image src="/keychain-logo.svg" alt="Keychain" width={129} height={32} priority />
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center justify-center size-28 rounded-md text-[#6b7280] hover:bg-[#f9fafb] cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Nav sections */}
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        {/* Tier: Keychain Edge (expanded) */}
        {!collapsed && <TierHeader label="Keychain Edge" expanded />}
        {SECTIONS.map((section, si) => (
          <div key={si}>
            {/* Dotted divider between sections */}
            {si > 0 && (
              <div className="my-8 border-t border-dashed border-[#e8e8eb]" />
            )}

            {/* Section label */}
            {!collapsed && section.label && (
              <p className="px-8 pt-4 pb-12 text-12 font-bold text-[#9ca3af] uppercase tracking-[0.6px] leading-16">
                {section.label}
              </p>
            )}

            {/* Items */}
            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <NavLink key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}

        {!collapsed && (
          <>
            {/* Tier: Keychain OS (collapsed, reference only) */}
            <div className="my-8 border-t border-[#e8e8eb]" />
            <TierHeader label="Keychain OS" />

            {/* Tier: External Vendor Portal (collapsed, reference only) */}
            <div className="my-8 border-t border-[#e8e8eb]" />
            <TierHeader label="External Vendor Portal" />
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {!collapsed && (
      <div className="flex flex-col gap-16 px-8 py-24 shrink-0 w-full">
        <div className="my-0 border-t border-dashed border-[#e8e8eb]" />

        <div className="flex items-center">
          {["https://i.pravatar.cc/40?img=1", "https://i.pravatar.cc/40?img=2", "https://i.pravatar.cc/40?img=3"].map(
            (src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={cn("size-40 rounded-full border-2 border-white object-cover", i > 0 && "-ml-16")}
              />
            )
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-14 font-bold text-[#111827] leading-20">Looking for a supplier?</p>
          <p className="text-12 font-medium text-[#4b5563] leading-16">
            Tell us what you're looking for, and we'll connect you to the best suited suppliers for your needs.
          </p>
        </div>

        <button className="flex items-center justify-center gap-8 w-full h-36 px-16 bg-[#fde047] border border-black/[0.06] rounded-lg text-14 font-bold text-black leading-20 cursor-pointer hover:bg-[#fcd34d] transition-colors">
          Post a project
          <ArrowUpRight size={16} className="shrink-0" />
        </button>
      </div>
      )}
    </aside>
    </TooltipProvider>
  );
}
