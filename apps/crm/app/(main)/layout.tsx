import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { OnboardingGate } from "@/components/onboarding-gate";
import { AskAIShell } from "@/components/ask-ai-panel";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-page overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <AskAIShell>
          <OnboardingGate>{children}</OnboardingGate>
        </AskAIShell>
      </div>
    </div>
  );
}
