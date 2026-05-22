"use client";

import { useState } from "react";
import Image from "next/image";
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
  UserPlus,
  AlertTriangle,
  Mail,
  ListChecks,
  TrendingUp,
  Search,
  PenSquare,
  Lightbulb,
} from "lucide-react";
import { Textarea } from "@level/ui/components/ui/textarea";
import { cn } from "@level/ui/lib/utils";

type Suggestion = { label: string; Icon: React.ElementType };

type PageContext = {
  label: string;
  Icon: React.ElementType;
  welcomeTitle: string;
  welcomeBody: string;
  suggestions: Suggestion[];
};

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { label: "Who should I contact today?", Icon: UserPlus },
  { label: "Summarise key issues or ideas", Icon: Lightbulb },
];

function usePageContext(): PageContext {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/").filter(Boolean)[0];
  switch (seg) {
    case "dashboard":
      return {
        label: "Dashboard",
        Icon: Home,
        welcomeTitle: "Welcome to Keychain Chat",
        welcomeBody:
          "Get a fast read on your pipeline, network health, and who to contact next, grounded in your live data.",
        suggestions: [
          { label: "Who should I contact today?", Icon: UserPlus },
          { label: "Summarise my pipeline", Icon: ListChecks },
          { label: "What deals are at risk?", Icon: AlertTriangle },
        ],
      };
    case "companies":
      return {
        label: "Companies",
        Icon: Building2,
        welcomeTitle: "Ask about your companies",
        welcomeBody:
          "Ask anything about the brands, manufacturers, and accounts in your network. I'll cite the rows behind each answer.",
        suggestions: [
          { label: "Which companies need attention?", Icon: AlertTriangle },
          { label: "Top high-growth brands", Icon: TrendingUp },
          { label: "Draft outreach to a prospect", Icon: PenSquare },
        ],
      };
    case "people":
      return {
        label: "People",
        Icon: Users,
        welcomeTitle: "Ask about your contacts",
        welcomeBody:
          "Find the right person to reach, draft a message, or surface who's gone quiet, grounded in your contact graph.",
        suggestions: [
          { label: "Who haven't I emailed in 30 days?", Icon: Mail },
          { label: "Draft a follow-up note", Icon: PenSquare },
          { label: "Top stakeholders this quarter", Icon: UserPlus },
        ],
      };
    case "discover":
      return {
        label: "Discover",
        Icon: Compass,
        welcomeTitle: "Find brands and manufacturers",
        welcomeBody:
          "Search the Keychain directory for suppliers that match what you're sourcing, then add the right ones to your network.",
        suggestions: [
          { label: "Find brands in market", Icon: Search },
          { label: "High-growth manufacturers", Icon: TrendingUp },
          { label: "Suppliers matching my capabilities", Icon: Lightbulb },
        ],
      };
    default:
      return {
        label: "Keychain",
        Icon: LayoutGrid,
        welcomeTitle: "Welcome to Keychain Chat",
        welcomeBody:
          "Ask anything about your network, deals, or pipeline. I'll ground my answers in your live Keychain data.",
        suggestions: DEFAULT_SUGGESTIONS,
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
              "absolute bottom-24 right-24 z-30",
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
      <div className="flex items-center justify-between gap-8 px-12 h-56 border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-8 min-w-0">
          <span className="text-14 font-semibold text-text-primary">AI Chat</span>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-6 h-32 px-12 rounded-md",
              "border border-border-default bg-surface-card",
              "text-13 font-semibold text-text-primary",
              "hover:bg-surface-subtle transition-colors"
            )}
          >
            <MessageSquarePlus size={14} className="text-icon-secondary" />
            New chat
          </button>
        </div>
        <div className="flex items-center gap-2 shrink-0">
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
        <div className="flex flex-col items-center text-center gap-12 mt-32">
          <Image
            src="/keychain-logo.svg"
            alt="Keychain"
            width={36}
            height={36}
            className="rounded-md"
          />
          <h2 className="text-18 font-semibold text-text-primary">
            {ctx.welcomeTitle}
          </h2>
          <p className="text-14 text-text-secondary max-w-[280px]">
            {ctx.welcomeBody}
          </p>
          <p className="text-13 text-text-tertiary max-w-[280px]">
            Hover over a citation to preview the context, or click to navigate to it.
          </p>
        </div>
      </div>

      {/* Suggestion cards */}
      <div className="px-12 pb-8 shrink-0">
        <div className="flex gap-8 overflow-x-auto scrollbar-thin">
          {ctx.suggestions.map(({ label: s, Icon: SuggIcon }) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className={cn(
                "shrink-0 w-[168px] flex flex-col items-start gap-10 p-12 rounded-lg text-left",
                "border border-border-default bg-surface-card",
                "hover:bg-surface-subtle transition-colors"
              )}
            >
              <SuggIcon size={18} className="text-icon-warning" />
              <span className="text-13 font-medium leading-18 text-text-primary line-clamp-2">
                {s}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="px-12 pb-12 shrink-0 flex flex-col gap-6">
        <div
          className={cn(
            "flex items-end gap-8 pl-16 pr-6 py-6 rounded-full",
            "border border-border-default bg-surface-card transition-shadow",
            "focus-within:border-border-focus focus-within:shadow-[var(--shadow-focus-ring)]"
          )}
        >
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write message…"
            rows={1}
            className={cn(
              "flex-1 border-0 bg-transparent resize-none text-14",
              "px-0 py-6 min-h-[28px] max-h-[120px]",
              "hover:border-0 focus:border-0 focus:shadow-none"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <button
            type="button"
            onClick={submit}
            disabled={!value.trim()}
            aria-label="Send"
            className={cn(
              "shrink-0 inline-flex items-center justify-center size-32 rounded-full transition-colors",
              value.trim()
                ? "bg-text-primary text-white hover:opacity-90"
                : "bg-surface-card border border-border-default text-icon-tertiary"
            )}
          >
            <ArrowUp size={14} />
          </button>
        </div>
        <p className="text-center text-12 text-text-tertiary">
          AI can make mistakes. Check important info.
        </p>
      </div>

      {/* Context chip */}
      <div className="px-12 pb-12 shrink-0 flex justify-center">
        <ContextChip label={ctx.label} Icon={ctx.Icon} />
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
