"use client";

import { useState } from "react";
import { Button } from "@level/ui/components/ui/button";
import { Input } from "@level/ui/components/ui/input";
import { ToggleSwitch } from "@level/ui/components/ui/toggle-switch";
import { cn } from "@level/ui/lib/utils";
import {
  SearchSm,
  BookmarkCheck,
  Settings02,
  ClockRewind,
  Zap,
  ZapFast,
  Bot,
  ChevronDown,
} from "@level/ui/components/icons";

type SidebarTab = "context" | "preferences";

interface Workflow {
  id: string;
  label: string;
  enabled: boolean;
}

const recentWorkflows = [
  { id: "r1", label: "Conversation Summarizer" },
  { id: "r2", label: "QA Auto-Scorer" },
  { id: "r3", label: "Sentiment Analyzer" },
];

const allWorkflowsData: Workflow[] = [
  { id: "w1", label: "Call Disposition Tagger", enabled: true },
  { id: "w2", label: "Agent Coaching Assistant", enabled: true },
  { id: "w3", label: "Compliance Checker", enabled: false },
  { id: "w4", label: "Escalation Predictor", enabled: true },
  { id: "w5", label: "Customer Intent Classifier", enabled: false },
  { id: "w6", label: "Knowledge Base Updater", enabled: false },
];

export function WorkflowSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("context");
  const [searchQuery, setSearchQuery] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>(allWorkflowsData);

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflowId ? { ...w, enabled: !w.enabled } : w
      )
    );
  };

  const filteredWorkflows = workflows.filter((w) =>
    w.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="flex w-[320px] shrink-0 flex-col border-r border-border-default bg-surface-card">
      {/* Tab buttons */}
      <div className="flex border-b border-border-default">
        <button
          onClick={() => setActiveTab("context")}
          className={cn(
            "flex flex-1 items-center justify-center gap-6 py-12 text-12 font-semibold transition-colors",
            activeTab === "context"
              ? "border-b-2 border-interactive-primary text-text-brand"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          <BookmarkCheck size={14} />
          Context & Knowledge
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={cn(
            "flex flex-1 items-center justify-center gap-6 py-12 text-12 font-semibold transition-colors",
            activeTab === "preferences"
              ? "border-b-2 border-interactive-primary text-text-brand"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          <Settings02 size={14} />
          Preferences
        </button>
      </div>

      {activeTab === "context" ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Search */}
          <div className="p-12">
            <div className="relative">
              <SearchSm
                size={16}
                className="absolute left-12 top-1/2 -translate-y-1/2 text-icon-tertiary"
              />
              <Input
                placeholder="Search and configure"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-36 h-36 text-12"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Recently used workflows */}
            <div className="px-12 pb-8">
              <div className="flex items-center gap-6 pb-8">
                <ClockRewind size={14} className="text-icon-secondary" />
                <span className="text-12 font-semibold text-text-secondary">
                  Recently used workflows
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {recentWorkflows.map((w) => (
                  <button
                    key={w.id}
                    className="flex items-center gap-8 rounded-lg px-10 py-8 text-14 text-text-primary transition-colors hover:bg-surface-subtle"
                  >
                    <ZapFast size={16} className="text-icon-brand" />
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-12 border-t border-border-subtle" />

            {/* All workflows */}
            <div className="px-12 pt-8 pb-12">
              <div className="flex items-center justify-between pb-8">
                <div className="flex items-center gap-6">
                  <Zap size={14} className="text-icon-secondary" />
                  <span className="text-12 font-semibold text-text-secondary">
                    All workflows
                  </span>
                </div>
                <ChevronDown size={14} className="text-icon-tertiary" />
              </div>
              <div className="flex flex-col gap-2">
                {filteredWorkflows.map((w) => (
                  <div
                    key={w.id}
                    className="group flex items-center justify-between rounded-lg px-10 py-8 transition-colors hover:bg-surface-subtle"
                  >
                    <div className="flex items-center gap-8">
                      <Bot size={16} className="text-icon-secondary" />
                      <span className="text-14 text-text-primary">
                        {w.label}
                      </span>
                    </div>
                    <ToggleSwitch
                      checked={w.enabled}
                      onCheckedChange={() => handleToggleWorkflow(w.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-16 p-24">
          <Settings02 size={40} className="text-icon-tertiary" />
          <div className="text-center">
            <p className="text-14 font-semibold text-text-primary">
              Preferences
            </p>
            <p className="mt-4 text-12 text-text-secondary">
              Configure your AI worker behavior, response style, and default
              settings.
            </p>
          </div>
          <Button variant="secondary" size="sm">
            Open Settings
          </Button>
        </div>
      )}
    </aside>
  );
}
