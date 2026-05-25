"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CheckSquare, Plus } from "@level/ui/components/icons";
import { Button } from "@level/ui/components/ui/button";
import { WidgetCard } from "../WidgetCard";
import { TaskItem } from "./TaskItem";
import { mockTasks, type Task } from "@/data/home/mockTasks";

export function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeId, setActiveId] = useState<string | null>(tasks[0]?.id ?? null);

  const visible = tasks.filter((t) => t.status !== "dismissed" && t.status !== "done");
  const openCount = tasks.filter((t) => t.status === "open").length;

  function handleStatusChange(id: string, status: Task["status"]) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    if (status === "done" || status === "dismissed") {
      setActiveId((cur) => (cur === id ? (visible.find((t) => t.id !== id)?.id ?? null) : cur));
    }
  }

  return (
    <WidgetCard
      icon={<CheckSquare size={16} />}
      title={`Tasks${openCount > 0 ? ` (${openCount})` : ""}`}
      headerActions={
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="flex items-center justify-center size-28 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors"
          >
            <SlidersHorizontal size={14} />
          </button>
          <Button variant="secondary" size="sm" iconLeft={<Plus size={12} />} className="h-28 text-12 px-10">
            New task
          </Button>
        </div>
      }
      bodyClassName="max-h-[560px]"
    >
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-20 py-40 gap-6 text-center">
          <CheckSquare size={24} className="text-icon-secondary" />
          <span className="text-14 font-semibold text-text-primary">All caught up</span>
          <span className="text-12 text-text-secondary max-w-[240px] leading-16">
            Keychain AI is watching your network — new tasks appear as signals come in.
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          {visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={activeId === task.id}
              onActivate={() => setActiveId(task.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
