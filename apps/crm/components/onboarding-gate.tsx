"use client";

import { useState } from "react";
import { Button } from "@level/ui/components/ui/button";
import { Spinner } from "@level/ui/components/ui/spinner";
import { cn } from "@level/ui/lib/utils";

function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7Z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.13 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7C13.42 14.62 18.27 10.75 24 10.75Z" />
    </svg>
  );
}

function MicrosoftLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" />
      <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" />
      <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" />
    </svg>
  );
}

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"idle" | "syncing" | "done">("idle");

  function handleConnect() {
    setStatus("syncing");
    window.setTimeout(() => setStatus("done"), 1800);
  }

  if (status === "done") return <>{children}</>;

  const syncing = status === "syncing";

  return (
    <div className="flex min-h-full items-center justify-center px-24 py-48">
      <div className="w-full max-w-[480px] flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-24 font-semibold text-text-primary">
            Bring your relationships into Keychain
          </h1>
          <p className="text-14 text-text-secondary">
            Connect your email and calendar to instantly see your network of
            brands, manufacturers, and contacts, already enriched with Keychain
            platform activity.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <Button
            size="lg"
            onClick={handleConnect}
            disabled={syncing}
            iconLeft={syncing ? <Spinner size="sm" /> : <GoogleLogo size={18} />}
            className="w-full justify-center"
          >
            {syncing ? "Syncing your inbox…" : "Continue with Google"}
          </Button>

          <button
            type="button"
            aria-disabled
            tabIndex={-1}
            onClick={(e) => e.preventDefault()}
            className={cn(
              "w-full h-48 inline-flex items-center justify-center gap-8 rounded-lg",
              "border border-border-default bg-surface-card text-14 font-semibold text-text-primary"
            )}
          >
            <MicrosoftLogo size={18} />
            Continue with Microsoft
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-12 text-text-tertiary">
          <span aria-hidden>🔒</span>
          <span>Privacy first. Only you can see the content we sync.</span>
        </div>

        <div className="flex items-center justify-center gap-16 text-12 font-semibold text-text-tertiary">
          <span>GDPR</span>
          <span className="size-3 rounded-full bg-border-default" aria-hidden />
          <span>CCPA</span>
          <span className="size-3 rounded-full bg-border-default" aria-hidden />
          <span>SOC 2</span>
        </div>

        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            aria-disabled
            tabIndex={-1}
            onClick={(e) => e.preventDefault()}
            className="text-14 font-semibold text-text-secondary"
          >
            I'll manually create my network
          </button>
        </div>
      </div>
    </div>
  );
}
