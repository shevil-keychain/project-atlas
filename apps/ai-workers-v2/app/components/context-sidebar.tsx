"use client";

import { useState } from "react";
import { cn } from "@level/ui/lib/utils";
import { Check, ChevronDown, ChevronRight } from "@level/ui/components/icons";
import { BookOpen, Settings, Database, FileText, Globe, Shield } from "lucide-react";

interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function SidebarSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: SidebarSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-stone-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
      >
        <span className="text-stone-500">{icon}</span>
        <span className="flex-1">{title}</span>
        {open ? (
          <ChevronDown size={14} className="text-stone-400" />
        ) : (
          <ChevronRight size={14} className="text-stone-400" />
        )}
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
}

interface KnowledgeItemProps {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  active?: boolean;
}

function KnowledgeItem({ icon, label, detail, active }: KnowledgeItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
        active
          ? "bg-primary-brand-50 text-primary-brand-700"
          : "text-stone-600 hover:bg-stone-100"
      )}
    >
      <span className="shrink-0 text-stone-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{label}</div>
        {detail && (
          <div className="truncate text-xs text-stone-400">{detail}</div>
        )}
      </div>
    </button>
  );
}

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function PreferenceToggle({
  label,
  description,
  checked,
  onChange,
}: PreferenceToggleProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-stone-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-stone-300 text-primary-brand-500 accent-primary-brand-500"
      />
      <div className="min-w-0">
        <div className="text-sm font-medium text-stone-700">{label}</div>
        <div className="text-xs text-stone-400">{description}</div>
      </div>
    </label>
  );
}

export function ContextSidebar() {
  const [clarifyAssumptions, setClarifyAssumptions] = useState(true);
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-stone-200 bg-white">
      <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-3">
        <Settings size={16} className="text-stone-500" />
        <h2 className="text-sm font-semibold text-stone-800">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarSection
          title="Context & Knowledge"
          icon={<BookOpen size={16} />}
          defaultOpen={true}
        >
          <div className="space-y-0.5">
            <KnowledgeItem
              icon={<Database size={14} />}
              label="Conversations"
              detail="All channels"
              active
            />
            <KnowledgeItem
              icon={<FileText size={14} />}
              label="QA Reviews"
              detail="Enabled"
            />
            <KnowledgeItem
              icon={<Globe size={14} />}
              label="Coaching Sessions"
              detail="Enabled"
            />
            <KnowledgeItem
              icon={<Shield size={14} />}
              label="AutoQA Scores"
              detail="Admin only"
            />
          </div>
        </SidebarSection>

        <SidebarSection
          title="Preferences"
          icon={<Settings size={16} />}
          defaultOpen={true}
        >
          <div className="space-y-1">
            <PreferenceToggle
              label="Clarify Assumptions"
              description="Ask clarifying questions before analysis"
              checked={clarifyAssumptions}
              onChange={setClarifyAssumptions}
            />
            <PreferenceToggle
              label="Show Reasoning"
              description="Display the worker's thought process"
              checked={showReasoning}
              onChange={setShowReasoning}
            />
          </div>
        </SidebarSection>
      </div>

      {/* All Workers indicator */}
      <div className="border-t border-stone-200 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100">
            <Check size={10} className="text-green-600" />
          </div>
          <span>All Workers</span>
        </div>
        <p className="mt-1 pl-6 text-xs text-stone-400">
          7 workers available
        </p>
      </div>
    </aside>
  );
}
