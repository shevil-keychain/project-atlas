"use client";

import { ChevronDown, Mail, CalendarPlus, X, ListPlus, Workflow, Download, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@level/ui/components/ui/dropdown-menu";

type Props = {
  count: number;
  onClear: () => void;
};

const actionButton =
  "flex items-center gap-6 h-32 px-12 rounded-md text-14 font-semibold text-white hover:bg-white/10 cursor-pointer transition-colors";

export function BulkActionBar({ count, onClear }: Props) {
  if (count === 0) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-30 flex items-center gap-8 h-48 px-12 bg-black border border-black rounded-lg shadow-lg">
      <span className="flex items-center justify-center h-24 min-w-24 px-8 rounded-md bg-white/15 text-13 font-semibold text-white">
        {count}
      </span>
      <span className="text-14 font-medium text-white/70 pr-8 border-r border-white/15">
        selected
      </span>

      <button type="button" className={actionButton}>
        <Mail size={14} className="text-white/70" />
        Send email
      </button>

      <button type="button" className={actionButton}>
        <CalendarPlus size={14} className="text-white/70" />
        Invite to an event
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={actionButton}>
            More
            <ChevronDown size={14} className="text-white/70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-200">
          <DropdownMenuItem className="cursor-pointer">
            <ListPlus size={14} className="text-icon-secondary mr-8" />
            Add to list
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Workflow size={14} className="text-icon-secondary mr-8" />
            Run workflow
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Download size={14} className="text-icon-secondary mr-8" />
            Export
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-text-error">
            <Trash2 size={14} className="mr-8" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        type="button"
        onClick={onClear}
        aria-label="Clear selection"
        className="flex items-center justify-center size-32 rounded-md text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-colors ml-4 border-l border-white/15 pl-8"
      >
        <X size={16} />
      </button>
    </div>
  );
}
