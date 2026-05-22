"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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

function ZoomLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="12" fill="#2D8CFF" />
      <path
        fill="#fff"
        d="M5.5 8.5h7.2c1 0 1.8.8 1.8 1.8v5.2H7.3c-1 0-1.8-.8-1.8-1.8V8.5Zm10.3 1.6 3.2-2.2v8.2l-3.2-2.2v-3.8Z"
      />
    </svg>
  );
}

function MeetLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M15 8v8l5 3.5V4.5L15 8Z" fill="#00AC47" />
      <path d="M3 7v10a2 2 0 0 0 2 2h10v-4H8V11L3 7Z" fill="#FFBA00" />
      <path d="M3 7l5 4V7a2 2 0 0 1 2-2h5V3H5a2 2 0 0 0-2 2v2Z" fill="#00832D" />
      <path d="M15 19v-4l5 4.5V19h-5Z" fill="#0066DA" />
      <path d="M15 3v8h5V5a2 2 0 0 0-2-2h-3Z" fill="#E94235" />
    </svg>
  );
}

function LinkedInLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.1 9.5h2.6V18H7.1V9.5Zm1.3-3.7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11 9.5h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2V18h-2.6v-3.9c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V18H11V9.5Z"
      />
    </svg>
  );
}

type State = "idle" | "syncing" | "done";

type Provider = {
  id: string;
  label: string;
  logo: React.ReactNode;
};

type Integration = {
  id: "email" | "call" | "linkedin";
  title: string;
  subtitle: string;
  providers: Provider[];
};

const INTEGRATIONS: Integration[] = [
  {
    id: "email",
    title: "Connect your email",
    subtitle: "Gmail · Outlook",
    providers: [
      { id: "gmail", label: "Gmail", logo: <GoogleLogo size={16} /> },
      { id: "outlook", label: "Outlook", logo: <MicrosoftLogo size={16} /> },
    ],
  },
  {
    id: "call",
    title: "Connect your call tool",
    subtitle: "Zoom · Google Meet",
    providers: [
      { id: "zoom", label: "Zoom", logo: <ZoomLogo size={16} /> },
      { id: "meet", label: "Google Meet", logo: <MeetLogo size={16} /> },
    ],
  },
  {
    id: "linkedin",
    title: "Connect LinkedIn",
    subtitle: "Sync profiles and recent activity",
    providers: [
      { id: "linkedin", label: "LinkedIn", logo: <LinkedInLogo size={16} /> },
    ],
  },
];

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<Record<string, State>>({});
  const [continued, setContinued] = useState(false);

  function connect(providerId: string) {
    setStates((prev) => ({ ...prev, [providerId]: "syncing" }));
    window.setTimeout(() => {
      setStates((prev) => ({ ...prev, [providerId]: "done" }));
    }, 1500);
  }

  function integrationDone(item: Integration) {
    return item.providers.some((p) => states[p.id] === "done");
  }

  if (continued) return <>{children}</>;

  const anyConnected = INTEGRATIONS.some(integrationDone);

  return (
    <div className="flex min-h-full items-center justify-center px-24 py-48">
      <div className="w-full max-w-[560px] flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-24 font-semibold text-text-primary">
            Hi, John! Let&apos;s get you set up.
          </h1>
          <p className="text-14 text-text-secondary">
            Connect your tools so your entire network of relationships, history,
            and conversations appears in Keychain automatically.
          </p>
        </div>

        <ul className="flex flex-col gap-12">
          {INTEGRATIONS.map((item) => {
            const done = integrationDone(item);
            return (
              <li
                key={item.id}
                className="flex items-center gap-16 rounded-lg border border-border-default bg-surface-card px-16 py-12"
              >
                <span
                  className={cn(
                    "flex size-18 shrink-0 items-center justify-center rounded-full border",
                    done
                      ? "border-success-500 bg-success-500 text-text-inverse"
                      : "border-border-default bg-surface-card text-text-tertiary"
                  )}
                  aria-hidden
                >
                  {done && <Check size={11} strokeWidth={3} />}
                </span>

                <div className="flex flex-1 min-w-0 flex-col gap-2">
                  <span className="text-14 font-semibold text-text-primary">
                    {item.title}
                  </span>
                  <span className="text-12 text-text-secondary">{item.subtitle}</span>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  {item.providers.map((p) => {
                    const s = states[p.id] ?? "idle";
                    if (s === "done") {
                      return (
                        <span
                          key={p.id}
                          className="inline-flex items-center gap-6 text-12 font-semibold text-success-700"
                        >
                          {p.logo}
                          Connected
                        </span>
                      );
                    }
                    return (
                      <Button
                        key={p.id}
                        size="sm"
                        variant="secondary"
                        onClick={() => connect(p.id)}
                        disabled={s === "syncing"}
                        iconLeft={s === "syncing" ? <Spinner size="sm" /> : p.logo}
                      >
                        {s === "syncing" ? "Connecting" : p.label}
                      </Button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>

        <Button
          size="lg"
          onClick={() => setContinued(true)}
          disabled={!anyConnected}
          className="w-full"
        >
          Continue to Keychain
        </Button>

        {!anyConnected && (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setContinued(true)}
              className="text-14 font-semibold text-text-secondary hover:text-text-primary cursor-pointer"
            >
              I&apos;ll connect manually later
            </button>
          </div>
        )}

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
      </div>
    </div>
  );
}
