import { cn } from "@level/ui/lib/utils";

interface WidgetGridProps {
  children: React.ReactNode;
  className?: string;
}

export function WidgetGrid({ children, className }: WidgetGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-20",
        "max-[1024px]:grid-cols-1",
        className
      )}
    >
      {children}
    </div>
  );
}
