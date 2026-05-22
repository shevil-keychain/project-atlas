"use client";

import { useState } from "react";
import { Building05 } from "@level/ui/components/icons";
import { cn } from "@level/ui/lib/utils";

const SIZE_MAP = {
  xs: { container: "size-24", icon: 14 },
  sm: { container: "size-32", icon: 18 },
  md: { container: "size-40", icon: 22 },
  lg: { container: "size-48", icon: 26 },
} as const;

type Size = keyof typeof SIZE_MAP;

export function CompanyLogo({
  website,
  size = "xs",
  className,
}: {
  website?: string;
  size?: Size;
  className?: string;
}) {
  const [stage, setStage] = useState<"clearbit" | "google" | "building">("clearbit");
  const domain = website?.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const { container, icon } = SIZE_MAP[size];

  if (!domain || stage === "building") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-surface-subtle border border-border-default shrink-0",
          container,
          className
        )}
      >
        <Building05 size={icon} className="text-icon-secondary" />
      </div>
    );
  }

  const src =
    stage === "clearbit"
      ? `https://logo.clearbit.com/${domain}`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-surface-card border border-border-default shrink-0 overflow-hidden",
        container,
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={stage}
        src={src}
        alt=""
        className={cn("object-contain", container)}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (stage === "google" && img.naturalWidth <= 32) {
            setStage("building");
          }
        }}
        onError={() => setStage(stage === "clearbit" ? "google" : "building")}
      />
    </div>
  );
}
