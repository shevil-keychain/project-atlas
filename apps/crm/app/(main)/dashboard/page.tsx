"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@level/ui/components/ui/textarea";
import { Button } from "@level/ui/components/ui/button";
import { Card } from "@level/ui/components/ui/card";
import { ArrowUp, VolumeMax } from "@level/ui/components/icons";
import { cn } from "@level/ui/lib/utils";
import { companies } from "@/data/companies.data";
import type { Company } from "@/data/companies.data";

type Strength = Company["relationshipStrength"];
type DotKey = Strength | "Out of network";

const STRENGTH_ORDER: Strength[] = ["Very strong", "Strong", "Moderate", "Weak", "Very weak"];

const DOT_CLASS: Record<DotKey, string> = {
  "Very strong": "bg-surface-success",
  Strong: "bg-surface-brand",
  Moderate: "bg-icon-tertiary",
  Weak: "bg-surface-warning",
  "Very weak": "bg-surface-error",
  "Out of network": "bg-surface-muted",
};

const TAM_TOTAL = 400;

function useGreeting() {
  const [greeting, setGreeting] = useState("Good evening");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

export default function DashboardPage() {
  const greeting = useGreeting();
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const lastUtteredRef = useRef<string | null>(null);

  const network = useMemo(() => {
    const counts: Record<Strength, number> = {
      "Very strong": 0, Strong: 0, Moderate: 0, Weak: 0, "Very weak": 0,
    };
    for (const c of companies) counts[c.relationshipStrength]++;
    const total = companies.length;
    return { counts, total };
  }, []);

  const dots = useMemo<DotKey[]>(() => {
    const out: DotKey[] = [];
    for (const s of STRENGTH_ORDER) {
      for (let i = 0; i < network.counts[s]; i++) out.push(s);
    }
    while (out.length < TAM_TOTAL) out.push("Out of network");
    return out;
  }, [network]);

  function submit() {
    const q = prompt.trim();
    if (!q) return;
    const reply = `Here's what I found for: "${q}". This is a mocked response — wire me up to your model to get a real answer.`;
    setAnswer(reply);
    setPrompt("");
    speak(reply);
  }

  function speak(text: string) {
    lastUtteredRef.current = text;
    setSpeaking(true);
    // Mocked TTS — flip the speaking flag briefly so the UI shows the read state.
    window.setTimeout(() => setSpeaking(false), 1800);
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-24 py-48 flex flex-col gap-32">
      <h1 className="text-30 font-semibold text-text-primary">{greeting}, Shevil.</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">
        <section className="flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-20 font-semibold text-text-primary">Ask Keychain</h2>
            <p className="text-14 text-text-secondary">Ask anything about your network, deals, or pipeline.</p>
          </div>
          <AskBox
            value={prompt}
            onChange={setPrompt}
            onSubmit={submit}
            answer={answer}
            speaking={speaking}
            onReplay={() => answer && speak(answer)}
          />
        </section>

        <section className="flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-20 font-semibold text-text-primary">Network</h2>
            <p className="text-14 text-text-secondary">
              {network.total.toLocaleString()} in network of {TAM_TOTAL.toLocaleString()} total addressable
            </p>
          </div>
          <Card className="p-24 flex flex-col gap-20">
            <DotGrid dots={dots} />
            <Legend counts={network.counts} outOfNetwork={TAM_TOTAL - network.total} />
          </Card>
        </section>
      </div>
    </div>
  );
}

function AskBox({
  value, onChange, onSubmit, answer, speaking, onReplay,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  answer: string | null;
  speaking: boolean;
  onReplay: () => void;
}) {
  return (
    <div className="flex flex-col gap-12 h-full">
      <div
        className={cn(
          "flex-1 flex flex-col rounded-xl bg-surface-card border border-border-default transition-shadow",
          "focus-within:border-border-focus focus-within:shadow-[var(--shadow-focus-ring)]"
        )}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask anything…"
          className={cn(
            "flex-1 border-0 bg-transparent resize-none text-14",
            "px-16 pt-14 pb-8 min-h-[112px]",
            "hover:border-0 focus:border-0 focus:shadow-none"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <div className="flex items-center justify-end px-12 pb-12">
          <Button
            size="icon-sm"
            onClick={onSubmit}
            disabled={!value.trim()}
            aria-label="Send"
          >
            <ArrowUp size={16} />
          </Button>
        </div>
      </div>

      {answer && (
        <Card className="px-20 py-16 flex flex-col gap-8">
          <div className="flex items-start justify-between gap-12">
            <p className="text-14 text-text-primary whitespace-pre-wrap">{answer}</p>
            <button
              type="button"
              onClick={onReplay}
              aria-label="Read aloud"
              className={cn(
                "shrink-0 p-6 rounded-sm hover:bg-surface-subtle text-icon-secondary hover:text-icon-primary transition-colors",
                speaking && "text-icon-brand"
              )}
            >
              <VolumeMax size={16} />
            </button>
          </div>
          {speaking && (
            <p className="text-12 text-text-tertiary">Reading aloud…</p>
          )}
        </Card>
      )}
    </div>
  );
}

function DotGrid({ dots }: { dots: DotKey[] }) {
  return (
    <div
      className="flex flex-wrap gap-2 w-full"
      role="img"
      aria-label="Network coverage grid"
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className={cn("size-8 rounded-full shrink-0", DOT_CLASS[d])}
          title={d}
        />
      ))}
    </div>
  );
}

function Legend({
  counts, outOfNetwork,
}: {
  counts: Record<Strength, number>;
  outOfNetwork: number;
}) {
  const items: { key: DotKey; count: number }[] = [
    ...STRENGTH_ORDER.map((s) => ({ key: s as DotKey, count: counts[s] })),
    { key: "Out of network", count: outOfNetwork },
  ];
  return (
    <div className="mt-20 pt-20 border-t border-border-subtle flex flex-wrap gap-x-24 gap-y-12">
      {items.map((it) => (
        <div key={it.key} className="flex items-center gap-8">
          <span className={cn("size-10 rounded-full shrink-0", DOT_CLASS[it.key])} />
          <span className="text-14 text-text-secondary">{it.key}</span>
          <span className="text-14 font-semibold text-text-primary">{it.count}</span>
        </div>
      ))}
    </div>
  );
}
