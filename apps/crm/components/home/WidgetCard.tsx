"use client";

import { cn } from "@level/ui/lib/utils";
import { Skeleton } from "@level/ui/components/ui/skeleton";

interface WidgetCardProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export function WidgetCard({
  icon,
  title,
  headerActions,
  children,
  loading,
  className,
  headerClassName,
  bodyClassName,
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center px-20 py-16 border-b border-border-subtle shrink-0",
          headerClassName
        )}
      >
        <span className="flex-1 text-14 font-semibold text-text-primary">{title}</span>
        {headerActions && (
          <div className="flex items-center gap-6">{headerActions}</div>
        )}
      </div>

      <div className={cn("flex-1 overflow-y-auto", bodyClassName)}>
        {loading ? (
          <div className="flex flex-col gap-12 p-20">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-1/2" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
