"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@level/ui/components/ui/avatar";
import { Button } from "@level/ui/components/ui/button";
import { Input } from "@level/ui/components/ui/input";
import {
  Brackets,
  Edit01,
  Email,
  FileAttachment01,
  Image01,
  Maximize01,
  Minimize01,
  Stars01,
  Trash01,
  X,
} from "@level/ui/components/icons";
import { Spinner } from "@level/ui/components/ui/spinner";
import { toast } from "@level/ui/hooks/use-toast";

const DRAFT_SUBJECT = "Quick recap + production capability deck";

const BULK_SUBJECT = "Our private-label production capability — quick overview";

const BULK_BODY = `Hi team,

I wanted to share a quick overview of our private-label production capability, in case it's useful as you plan upcoming product lines.

What we offer:
• Dedicated grain-free and snack lines with capacity for 2M units / quarter
• Co-manufacturing in a SQF Level 3, USDA Organic certified facility
• Average pilot-to-launch timeline of 9 weeks, with full QA support

A full one-pager and a case study are attached. You can also find more details here: https://keychain.com/production

Happy to set up a quick intro if it makes sense on your side — just hit reply.

Best,
John`;

const DRAFT_BODY = `Hi Elliot,

Great chatting last time. As discussed, I wanted to share a quick recap and a tailored overview of our private-label production capability so you can take it to the team.

Highlights:
• Dedicated grain-free cereal line with capacity for 2M units / quarter
• Co-manufacturing in a SQF Level 3 facility, USDA Organic certified
• Average pilot-to-launch timeline of 9 weeks, with full QA support

I've attached a one-pager with the full breakdown plus a case study from a similar DTC cereal brand we helped scale 3x in 18 months.

Happy to set up a 20-min call next week to walk through it together — let me know what works on your side.

Best,
John`;

type ComposeEmailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  to?: string;
  bulk?: boolean;
  recipients?: string[];
};

type AttachState = "hidden" | "loading" | "attached";

export function ComposeEmailModal({
  open,
  onOpenChange,
  to,
  bulk = false,
  recipients = [],
}: ComposeEmailModalProps) {
  const draftSubject = bulk ? BULK_SUBJECT : DRAFT_SUBJECT;
  const draftBody = bulk ? BULK_BODY : DRAFT_BODY;
  const [streamed, setStreamed] = useState("");
  const [subject, setSubject] = useState("");
  const [attachState, setAttachState] = useState<AttachState>("hidden");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!open) {
      setStreamed("");
      setSubject("");
      setAttachState("hidden");
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      return;
    }

    // Stream subject first, then body
    let i = 0;
    let phase: "subject" | "body" = "subject";
    intervalRef.current = setInterval(() => {
      if (phase === "subject") {
        if (i >= draftSubject.length) {
          phase = "body";
          i = 0;
          setSubject(draftSubject);
          return;
        }
        setSubject(draftSubject.slice(0, i + 1));
        i += 1;
      } else {
        if (i >= draftBody.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // After body streams complete: show loader, then attach PDF
          const t1 = setTimeout(() => setAttachState("loading"), 300);
          const t2 = setTimeout(() => setAttachState("attached"), 1500);
          timeoutsRef.current.push(t1, t2);
          return;
        }
        const step = 4;
        setStreamed(draftBody.slice(0, i + step));
        i += step;
      }
    }, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-24">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close compose"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-text-primary/30 backdrop-blur-sm"
      />

      {/* Window */}
      <div className="relative flex h-720 w-full max-w-1020 flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-8 border-b border-border-default px-20 py-14">
          <span className="text-16 font-semibold text-text-primary">Compose email</span>
          <div className="flex items-center gap-4 text-icon-secondary">
            <button
              type="button"
              aria-label="Minimize"
              className="flex size-32 items-center justify-center rounded-md hover:bg-surface-subtle"
            >
              <Minimize01 size={16} />
            </button>
            <button
              type="button"
              aria-label="Maximize"
              className="flex size-32 items-center justify-center rounded-md hover:bg-surface-subtle"
            >
              <Maximize01 size={16} />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="flex size-32 items-center justify-center rounded-md hover:bg-surface-subtle"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* From */}
        <div className="grid grid-cols-[80px_1fr_auto] items-center gap-12 border-b border-border-default px-20 py-12">
          <span className="text-14 text-text-secondary">From</span>
          <div className="flex items-center gap-8">
            <Avatar name="John Doe" size="xs" />
            <span className="text-14 text-text-primary">John Doe</span>
          </div>
          <span />
        </div>

        {/* To */}
        <div className="grid grid-cols-[80px_1fr_auto] items-start gap-12 border-b border-border-default px-20 py-12">
          <span className="pt-6 text-14 text-text-secondary">To</span>
          {bulk ? (
            <div className="flex flex-wrap justify-end gap-6">
              {recipients.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-6 rounded-full border border-border-default bg-surface-subtle px-10 py-2 text-12 font-medium text-text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <Input
              defaultValue={to ?? "elliot.shifrin@magicspoon.com"}
              className="h-32 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          )}
          <button
            type="button"
            className="shrink-0 pt-6 text-14 text-text-secondary hover:text-text-primary"
          >
            Cc / Bcc
          </button>
        </div>

        {bulk && recipients.length > 0 && (
          <div className="flex items-center gap-8 border-b border-border-default bg-secondary-yellow-50 px-20 py-10">
            <span className="size-8 shrink-0 rounded-full bg-secondary-yellow-600" aria-hidden />
            <span className="text-12 text-text-primary">
              This email will be sent{" "}
              <span className="font-semibold">separately to {recipients.length} companies</span>{" "}
              — each recipient sees only their own copy.
            </span>
          </div>
        )}

        {/* Subject */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-12 border-b border-border-default px-20 py-12">
          <span className="text-14 text-text-secondary">Subject</span>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject..."
            className="h-32 border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Body */}
        <div className="flex max-h-720 flex-1 flex-col gap-12 overflow-y-auto px-20 py-16">
          <pre className="whitespace-pre-wrap font-[family-name:inherit] text-14 leading-relaxed text-text-primary">
            {streamed}
            {streamed.length < draftBody.length && (
              <span className="inline-block w-2 animate-pulse bg-text-primary align-text-bottom">
                &nbsp;
              </span>
            )}
          </pre>

          {/* Attachment */}
          {attachState === "loading" && (
            <div className="flex w-fit items-center gap-8 rounded-lg border border-border-default bg-surface-subtle px-12 py-8">
              <Spinner size="sm" />
              <span className="text-14 text-text-secondary">
                Attaching sales collateral…
              </span>
            </div>
          )}
          {attachState === "attached" && (
            <div className="flex w-fit items-center gap-8 rounded-lg border border-border-default bg-surface-subtle px-12 py-8">
              <span className="flex size-32 items-center justify-center rounded-md bg-surface-error-subtle text-text-error">
                <FileAttachment01 size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-14 font-medium text-text-primary">
                  Keychain – Sales Collateral.pdf
                </span>
                <span className="text-12 text-text-secondary">
                  2.4 MB · attached automatically
                </span>
              </div>
              <button
                type="button"
                aria-label="Remove attachment"
                className="ml-8 flex size-24 items-center justify-center rounded-md text-icon-tertiary hover:bg-surface-card hover:text-icon-primary"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-8 border-t border-border-default px-20 py-12">
          <div className="flex items-center gap-2 text-icon-secondary">
            <ToolbarButton label="Attach file">
              <FileAttachment01 size={16} />
            </ToolbarButton>
            <ToolbarButton label="Insert image">
              <Image01 size={16} />
            </ToolbarButton>
            <ToolbarButton label="Insert variable">
              <Brackets size={16} />
            </ToolbarButton>
            <ToolbarButton label="Insert signature">
              <Edit01 size={16} />
            </ToolbarButton>
            <ToolbarButton label="Discard draft">
              <Trash01 size={16} />
            </ToolbarButton>
          </div>
          <div className="flex items-center gap-8">
            <Button variant="secondary" size="sm" iconLeft={<Stars01 size={16} />}>
              Edit with AI
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onOpenChange(false);
                toast({
                  title: "Email sent",
                  description: bulk
                    ? `Sent separately to ${recipients.length} companies.`
                    : `Your email to ${to ?? "elliot.shifrin@magicspoon.com"} has been sent.`,
                });
              }}
            >
              Send email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-32 items-center justify-center rounded-md hover:bg-surface-subtle"
    >
      {children}
    </button>
  );
}
