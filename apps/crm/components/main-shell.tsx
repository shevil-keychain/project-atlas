"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { OnboardingGate } from "@/components/onboarding-gate";
import { AskAIShell } from "@/components/ask-ai-panel";

export function MainShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface-page overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onAskAI={() => setOpen(true)} askAIOpen={open} />
        <AskAIShell open={open} onClose={() => setOpen(false)}>
          <OnboardingGate>{children}</OnboardingGate>
        </AskAIShell>
      </div>
    </div>
  );
}
