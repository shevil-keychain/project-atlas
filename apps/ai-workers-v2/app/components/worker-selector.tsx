"use client";

import { useState } from "react";
import { cn } from "@level/ui/lib/utils";
import { Input } from "@level/ui/components/ui/input";
import { SearchSm } from "@level/ui/components/icons";
import { WorkerCard, workers } from "./worker-card";

const recentWorkerIds = ["exec-summary", "coach", "search-analyst"];

interface WorkerSelectorProps {
  selectedWorkerId: string | null;
  onSelectWorker: (id: string) => void;
}

export function WorkerSelector({
  selectedWorkerId,
  onSelectWorker,
}: WorkerSelectorProps) {
  const [search, setSearch] = useState("");

  const recentWorkers = workers.filter((w) => recentWorkerIds.includes(w.id));
  const filteredWorkers = workers.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex w-[320px] shrink-0 flex-col border-r border-stone-200 bg-white">
      {/* Search */}
      <div className="border-b border-stone-200 p-3">
        <div className="relative">
          <SearchSm
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <Input
            placeholder="Search and configure..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Recently used */}
        {!search && (
          <div className="border-b border-stone-200 px-3 py-3">
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Recently used
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {recentWorkers.map((w) => (
                <WorkerCard
                  key={w.id}
                  worker={w}
                  compact
                  selected={selectedWorkerId === w.id}
                  onClick={() => onSelectWorker(w.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All workers */}
        <div className="px-3 py-3">
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            All workers
          </h3>
          <div className="space-y-1.5">
            {filteredWorkers.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                selected={selectedWorkerId === w.id}
                onClick={() => onSelectWorker(w.id)}
              />
            ))}
            {filteredWorkers.length === 0 && (
              <p className="py-6 text-center text-sm text-stone-400">
                No workers found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
