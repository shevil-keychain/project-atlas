"use client";

import { useState } from "react";
import { cn } from "@level/ui/lib/utils";
import { ArrowUp, Stars02 } from "@level/ui/components/icons";

const quickActions = [
  "Summarize my latest conversations",
  "Run QA scoring on recent calls",
  "Analyze customer sentiment trends",
  "Draft coaching feedback",
];

export function ChatWelcome() {
  const [message, setMessage] = useState("");

  return (
    <main className="flex flex-1 flex-col bg-surface-page">
      {/* Centered welcome content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-24 px-24">
        {/* AI Avatar */}
        <div className="flex h-80 w-80 items-center justify-center rounded-full bg-surface-brand-subtle">
          <Stars02 size={40} className="text-icon-brand" />
        </div>

        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-24 font-semibold text-text-primary">
            How can I help you today?
          </h1>
          <p className="mt-8 text-14 text-text-secondary">
            Select a workflow from the sidebar or start a new conversation
            below.
          </p>
        </div>

        {/* Quick action chips */}
        <div className="flex flex-wrap justify-center gap-8">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => setMessage(action)}
              className="rounded-full border border-border-default bg-surface-card px-16 py-8 text-12 font-medium text-text-secondary transition-colors hover:border-border-strong hover:bg-surface-subtle hover:text-text-primary"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Chat input bar */}
      <div className="border-t border-border-default bg-surface-card p-16">
        <div className="mx-auto flex max-w-[720px] items-end gap-12">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your AI worker anything..."
              rows={1}
              className={cn(
                "w-full resize-none rounded-xl border border-border-strong bg-surface-card px-16 py-12 pr-48 text-14 font-medium text-text-primary outline-none transition-all",
                "placeholder:text-text-tertiary",
                "hover:border-border-strong",
                "focus:border-border-focus focus:shadow-[var(--shadow-focus-ring)]"
              )}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <button
            className={cn(
              "flex h-40 w-40 shrink-0 items-center justify-center rounded-full transition-colors",
              message.trim()
                ? "bg-interactive-primary text-text-inverse hover:bg-interactive-primary-hover"
                : "bg-surface-muted text-icon-tertiary"
            )}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
