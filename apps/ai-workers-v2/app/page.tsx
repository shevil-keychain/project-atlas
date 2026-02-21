"use client";

import { useState } from "react";
import { AIWorkersTopBar } from "./components/ai-workers-top-bar";
import { ContextSidebar } from "./components/context-sidebar";
import { WorkerSelector } from "./components/worker-selector";
import { ChatArea } from "./components/chat-area";

export default function AIWorkersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ai-workers");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-stone-100">
      <AIWorkersTopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex min-h-0 flex-1">
        {sidebarOpen && <ContextSidebar />}

        <WorkerSelector
          selectedWorkerId={selectedWorkerId}
          onSelectWorker={setSelectedWorkerId}
        />

        <ChatArea selectedWorkerId={selectedWorkerId} />
      </div>
    </div>
  );
}
