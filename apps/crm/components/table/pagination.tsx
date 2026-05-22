"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@level/ui/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function pages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between px-24 h-56 border-t border-border-default bg-surface-card shrink-0">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-8 h-36 px-16 text-14 font-semibold text-text-primary disabled:opacity-40 hover:text-text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages(page, totalPages).map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center size-36 text-14 text-text-secondary"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(
                "flex items-center justify-center size-36 text-14 leading-20 cursor-pointer transition-colors",
                item === page
                  ? "border-t-2 border-border-focus text-text-primary"
                  : "font-semibold text-text-secondary hover:text-text-primary"
              )}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-8 h-36 px-16 text-14 font-semibold text-text-primary disabled:opacity-40 hover:text-text-primary transition-colors cursor-pointer"
      >
        Next
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
