"use client";

import { ArrowDownUp, Plus } from "lucide-react";
import { Button } from "@level/ui/components/ui/button";
import { cn } from "@level/ui/lib/utils";
import type { View } from "./filters/types";

type Props = {
  title: string;
  addLabel?: string;
  views: View[];
  activeViewId: string;
  isDirty: boolean;
  showImportExport?: boolean;
  onSelectView: (id: string) => void;
};

export function PageHeader({
  title,
  addLabel,
  views,
  activeViewId,
  isDirty,
  showImportExport = true,
  onSelectView,
}: Props) {
  return (
    <div className="bg-surface-card border-b border-border-default flex flex-col gap-16 pt-24 px-24 shrink-0 w-full">
      <div className="flex items-center w-full gap-24">
        <h1 className="flex-1 text-18 font-semibold text-text-primary leading-28">
          {title}
        </h1>
        <div className="flex items-center gap-8 shrink-0">
          {showImportExport && (
            <Button variant="secondary" size="sm" iconLeft={<ArrowDownUp size={14} />}>
              Import / Export
            </Button>
          )}
          {addLabel && (
            <Button variant="default" size="sm">
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-32 items-center w-full">
        {views.map((view) => {
          const active = view.id === activeViewId;
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectView(view.id)}
              className={cn(
                "flex items-center gap-6 pb-16 text-14 leading-20 whitespace-nowrap border-b-2 transition-colors cursor-pointer",
                active
                  ? "border-border-focus font-semibold text-text-primary"
                  : "border-transparent font-semibold text-text-secondary hover:text-text-primary"
              )}
            >
              {view.label}
              {active && isDirty && (
                <span
                  aria-label="Modified"
                  className="size-6 rounded-full bg-icon-brand shrink-0"
                />
              )}
            </button>
          );
        })}

        <span
          aria-hidden="true"
          className="flex items-center justify-center pb-16 text-text-secondary"
        >
          <Plus size={16} className="shrink-0" />
        </span>
      </div>
    </div>
  );
}
