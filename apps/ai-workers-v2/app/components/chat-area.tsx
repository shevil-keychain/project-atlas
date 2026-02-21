"use client";

import { useState } from "react";
import { cn } from "@level/ui/lib/utils";
import { Button } from "@level/ui/components/ui/button";
import { Stars01 } from "@level/ui/components/icons";
import { ArrowUp, Paperclip } from "lucide-react";
import { workers } from "./worker-card";

interface ChatAreaProps {
  selectedWorkerId: string | null;
}

function BotAvatar() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-brand-400 to-primary-brand-600 shadow-lg shadow-primary-brand-200">
      <Stars01 size={32} className="text-white" />
    </div>
  );
}

const suggestedPrompts = [
  "Give me an executive summary of contact center performance this quarter",
  "What are the top customer issues in the last 30 days?",
  "Analyze agent coaching opportunities across teams",
  "Show me QA score trends by team this month",
];

export function ChatArea({ selectedWorkerId }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const selectedWorker = workers.find((w) => w.id === selectedWorkerId);

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-stone-50">
      {/* Empty state / greeting */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <BotAvatar />
        <h1 className="mt-6 text-2xl font-bold text-stone-800">
          How can I help you today?
        </h1>
        {selectedWorker ? (
          <p className="mt-2 text-sm text-stone-500">
            You&apos;re chatting with the{" "}
            <span className="font-semibold text-primary-brand-600">
              {selectedWorker.name}
            </span>{" "}
            worker
          </p>
        ) : (
          <p className="mt-2 text-sm text-stone-500">
            Select a worker or ask anything to get started
          </p>
        )}

        {/* Suggested prompts */}
        <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setMessage(prompt)}
              className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-left text-sm text-stone-600 transition-all hover:border-stone-300 hover:shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-stone-200 bg-white p-4">
        <div className="mx-auto max-w-3xl">
          <div
            className={cn(
              "flex items-end gap-2 rounded-2xl border bg-white px-4 py-3 transition-colors",
              "border-stone-300 focus-within:border-primary-brand-400 focus-within:ring-2 focus-within:ring-primary-brand-100"
            )}
          >
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
            >
              <Paperclip size={18} />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              placeholder={
                selectedWorker
                  ? `Ask ${selectedWorker.name} anything...`
                  : "Ask anything..."
              }
              rows={1}
              className="min-h-[32px] max-h-[120px] flex-1 resize-none bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
            />
            <Button
              size="icon-sm"
              className={cn(
                "shrink-0 rounded-xl transition-colors",
                message.trim()
                  ? "bg-primary-brand-500 text-white hover:bg-primary-brand-600"
                  : "bg-stone-200 text-stone-400"
              )}
              disabled={!message.trim()}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-stone-400">
            AI Workers analyze your real conversation data to provide
            evidence-based insights
          </p>
        </div>
      </div>
    </div>
  );
}
