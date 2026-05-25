"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/home/DashboardHeader";
import { WidgetGrid } from "@/components/home/WidgetGrid";
import { CustomizeDrawer } from "@/components/home/CustomizeDrawer";
import { NetworkHealthWidget } from "@/components/home/widgets/NetworkHealthWidget";
import { TasksWidget } from "@/components/home/widgets/TasksWidget";
import { ActivityWidget } from "@/components/home/widgets/ActivityWidget";
import { CalendarWidget } from "@/components/home/widgets/CalendarWidget";

export default function HomePage() {
  const [customizeOpen, setCustomizeOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1280px] px-32 pt-32 pb-32">
        <DashboardHeader
          userName="Jake"
          onCustomizeClick={() => setCustomizeOpen(true)}
        />

        <WidgetGrid>
          <NetworkHealthWidget />
          <TasksWidget />
          <ActivityWidget />
          <CalendarWidget />
        </WidgetGrid>
      </div>

      <CustomizeDrawer open={customizeOpen} onOpenChange={setCustomizeOpen} />
    </div>
  );
}
