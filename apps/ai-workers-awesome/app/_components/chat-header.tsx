"use client";

import { useState } from "react";
import { Button } from "@level/ui/components/ui/button";
import { cn } from "@level/ui/lib/utils";
import { Plus, X, Zap, Bot } from "@level/ui/components/icons";
import { Stars02 } from "@level/ui/components/icons";

interface ChatTab {
  id: string;
  label: string;
}

const initialTabs: ChatTab[] = [
  { id: "1", label: "QA Analysis" },
  { id: "2", label: "Coaching Review" },
  { id: "3", label: "Sentiment Report" },
  { id: "4", label: "Call Summary" },
];

export function ChatHeader() {
  const [tabs, setTabs] = useState<ChatTab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState("1");

  const handleCloseTab = (tabId: string) => {
    const remaining = tabs.filter((t) => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId && remaining.length > 0) {
      setActiveTabId(remaining[0].id);
    }
  };

  return (
    <div className="flex items-center border-b border-border-default bg-surface-card">
      {/* AI Workers label */}
      <div className="flex items-center gap-8 px-16 border-r border-border-subtle">
        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-surface-brand-subtle">
          <Stars02 size={18} className="text-icon-brand" />
        </div>
        <span className="text-14 font-semibold text-text-primary whitespace-nowrap">
          AI Workers
        </span>
      </div>

      {/* Chat tabs */}
      <div className="flex flex-1 items-center gap-2 overflow-x-auto px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={cn(
              "group flex items-center gap-6 rounded-lg px-12 py-8 text-12 font-medium transition-colors",
              activeTabId === tab.id
                ? "bg-surface-subtle text-text-primary"
                : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
            )}
          >
            <Bot size={14} className="text-icon-secondary" />
            <span className="whitespace-nowrap">{tab.label}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(tab.id);
              }}
              className="ml-2 rounded-sm p-2 text-icon-tertiary opacity-0 transition-opacity hover:bg-surface-sunken hover:text-icon-primary group-hover:opacity-100"
            >
              <X size={12} />
            </span>
          </button>
        ))}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-8 px-16">
        <Button variant="default" size="sm" iconLeft={<Plus size={16} />}>
          New Chat
        </Button>
        <Button variant="ghost" size="sm" iconLeft={<Zap size={16} />}>
          Automations
        </Button>
        <Button variant="ghost" size="sm" iconLeft={<Bot size={16} />}>
          AI Workflows
        </Button>
      </div>
    </div>
  );
}
