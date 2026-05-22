"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ArrowUp,
  X,
  History,
  Minimize2,
  MessageSquarePlus,
  Home,
  Building2,
  Users,
  Compass,
  LayoutGrid,
} from "lucide-react";
import { Textarea } from "@level/ui/components/ui/textarea";
import { cn } from "@level/ui/lib/utils";

type PageContext = {
  label: string;
  Icon: React.ElementType;
  suggestions: string[];
};

function usePageContext(): PageContext {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/").filter(Boolean)[0];
  switch (seg) {
    case "dashboard":
      return {
        label: "Dashboard",
        Icon: Home,
        suggestions: [
          "Today's priorities",
          "Stalled deals",
          "Renewals due",
          "New warm leads",
          "Quiet for 30+ days",
        ],
      };
    case "companies":
      return {
        label: "Companies",
        Icon: Building2,
        suggestions: [
          "At-risk customers",
          "Top high-growth brands",
          "Manufacturers in market",
          "Quiet 30+ days",
          "Draft outreach to a prospect",
        ],
      };
    case "people":
      return {
        label: "Contacts",
        Icon: Users,
        suggestions: [
          "Quiet contacts",
          "Draft a follow-up",
          "Top stakeholders this quarter",
          "Net-new intros",
          "Senior buyers",
        ],
      };
    case "discover":
      return {
        label: "Discover",
        Icon: Compass,
        suggestions: [
          "In market right now",
          "Capability match",
          "High growth",
          "Recently active",
          "Certified suppliers",
        ],
      };
    default:
      return {
        label: "Keychain",
        Icon: LayoutGrid,
        suggestions: ["Today's priorities", "Stalled deals", "Draft an email"],
      };
  }
}

export function AskAIShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 min-h-0">
      <div className="relative flex-1 min-w-0 overflow-y-auto">
        {children}
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ask AI"
            className={cn(
              "fixed bottom-24 right-24 z-30",
              "inline-flex items-center gap-8 h-44 pl-14 pr-16 rounded-full",
              "bg-text-primary text-white text-14 font-semibold",
              "shadow-lg hover:shadow-xl transition-all",
              "hover:-translate-y-px active:translate-y-0"
            )}
          >
            <Sparkles size={16} className="text-white" />
            Ask AI
          </button>
        )}
      </div>
      {open && <AskAISidePanel onClose={() => setOpen(false)} />}
    </div>
  );
}

function AskAISidePanel({ onClose }: { onClose: () => void }) {
  const ctx = usePageContext();
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    setValue("");
  }

  return (
    <aside
      aria-label="Ask Keychain AI"
      className={cn(
        "w-[440px] shrink-0 border-l border-border-subtle bg-surface-card",
        "flex flex-col",
        "animate-in slide-in-from-right duration-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-8 px-12 h-56 shrink-0">
        <span className="text-14 font-semibold text-text-primary">Keychain AI</span>
        <div className="flex items-center gap-2 shrink-0">
          <IconButton aria-label="New chat">
            <MessageSquarePlus size={16} />
          </IconButton>
          <IconButton aria-label="Chat history">
            <History size={16} />
          </IconButton>
          <IconButton aria-label="Minimize">
            <Minimize2 size={16} />
          </IconButton>
          <IconButton aria-label="Close" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </div>
      </div>

      {/* Empty state body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-24 py-32">
        <div className="flex flex-col items-center text-center gap-12 mt-48">
          <h2 className="text-20 font-semibold text-text-primary">Ask Keychain AI</h2>
          <p className="text-14 text-text-secondary max-w-[320px]">
            Ask anything about your network, or get something done — draft a
            proposal, write outreach, summarise a deal, or spin up follow-up
            content.
          </p>
        </div>
      </div>

      {/* Suggestion pills */}
      <div className="px-12 pb-10 shrink-0">
        <div className="flex gap-6 overflow-x-auto">
          {ctx.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className={cn(
                "shrink-0 inline-flex items-center h-28 px-12 rounded-full",
                "border border-border-default bg-surface-card",
                "text-13 font-medium text-text-primary whitespace-nowrap",
                "hover:bg-surface-subtle transition-colors"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="px-12 pb-12 shrink-0 flex flex-col gap-6">
        <div
          className={cn(
            "rounded-xl border border-border-default bg-surface-card transition-shadow",
            "focus-within:border-border-focus focus-within:shadow-[var(--shadow-focus-ring)]"
          )}
        >
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write message…"
            className={cn(
              "border-0 bg-transparent resize-none text-14",
              "px-14 pt-12 pb-4 min-h-[88px]",
              "hover:border-0 focus:border-0 focus:shadow-none"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <div className="flex items-center justify-between gap-8 px-8 pb-8">
            <ContextChip label={ctx.label} Icon={ctx.Icon} />
            <button
              type="button"
              onClick={submit}
              disabled={!value.trim()}
              aria-label="Send"
              className={cn(
                "shrink-0 inline-flex items-center justify-center size-32 rounded-lg transition-colors",
                value.trim()
                  ? "bg-text-primary text-white hover:opacity-90"
                  : "bg-surface-subtle text-icon-tertiary cursor-not-allowed"
              )}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
        <p className="text-center text-12 text-text-tertiary">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </aside>
  );
}

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center justify-center size-32 rounded-md border border-border-default bg-surface-card text-icon-secondary hover:text-icon-primary hover:bg-surface-subtle transition-colors"
    >
      {children}
    </button>
  );
}

function ContextChip({ label, Icon }: { label: string; Icon: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-6 h-24 pl-6 pr-10 rounded-md bg-surface-subtle text-12 font-medium text-text-primary">
      <span className="inline-flex items-center justify-center size-16 rounded-sm bg-surface-card border border-border-subtle">
        <Icon size={10} className="text-icon-secondary" />
      </span>
      {label}
    </span>
  );
}
