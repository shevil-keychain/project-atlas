"use client";

import { MainNav } from "@level/ui/components/patterns/main-nav";
import { TopBar } from "@level/ui/components/patterns/top-bar";
import { ChatHeader } from "./_components/chat-header";
import { WorkflowSidebar } from "./_components/workflow-sidebar";
import { ChatWelcome } from "./_components/chat-welcome";

export default function Page() {
  return (
    <div className="flex h-screen">
      <MainNav activeItem="AI workers" />
      <div className="flex flex-1 flex-col">
        <TopBar organizationName="Acme Corp" />
        <ChatHeader />
        <div className="flex flex-1 overflow-hidden">
          <WorkflowSidebar />
          <ChatWelcome />
        </div>
      </div>
    </div>
  );
}
