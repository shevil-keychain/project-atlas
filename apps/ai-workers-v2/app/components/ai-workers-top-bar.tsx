"use client";

import { cn } from "@level/ui/lib/utils";
import { Button } from "@level/ui/components/ui/button";
import { Plus, Stars01, Zap } from "@level/ui/components/icons";
import { X, PanelLeftClose, PanelLeft } from "lucide-react";

interface SessionTab {
  id: string;
  label: string;
}

const sessionTabs: SessionTab[] = [
  { id: "1", label: "Executive Summary" },
  { id: "2", label: "Coach Worker" },
  { id: "3", label: "Search Analyst" },
];

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="125 125 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-md"
    >
      <g clipPath="url(#navLogoClipTB)">
        <path
          d="M125.081 180.78C125.081 154.523 125.081 141.395 133.238 133.238C141.395 125.081 154.523 125.081 180.78 125.081H409.381C435.638 125.081 448.767 125.081 456.924 133.238C465.081 141.395 465.081 154.523 465.081 180.78V409.381C465.081 435.638 465.081 448.767 456.924 456.924C448.767 465.081 435.638 465.081 409.381 465.081H180.78C154.523 465.081 141.395 465.081 133.238 456.924C125.081 448.767 125.081 435.638 125.081 409.381V180.78Z"
          fill="white"
        />
        <path
          d="M327.934 323.86C361.498 323.86 388.708 296.625 388.708 263.028C388.708 229.432 361.498 202.197 327.934 202.197C294.369 202.197 267.159 229.432 267.159 263.028C267.159 296.625 294.369 323.86 327.934 323.86Z"
          fill="#FE5000"
        />
        <path
          d="M267.159 201.081V323.861C230.703 323.861 201.103 294.236 201.103 257.742V201.081H267.159Z"
          fill="#1B1B1B"
        />
        <path
          d="M388.706 389.969H333.211C296.755 389.969 267.154 360.344 267.154 323.85H388.706V389.969Z"
          fill="#1B1B1B"
        />
        <path
          d="M267.134 323.854H201.081V389.97H267.134V323.854Z"
          fill="#1B1B1B"
        />
      </g>
      <defs>
        <clipPath id="navLogoClipTB">
          <rect
            x="125.081"
            y="125.081"
            width="340"
            height="340"
            rx="85"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

interface AIWorkersTopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function AIWorkersTopBar({
  activeTab,
  onTabChange,
  onToggleSidebar,
  sidebarOpen,
}: AIWorkersTopBarProps) {
  return (
    <header className="flex h-56 shrink-0 items-center gap-12 bg-gradient-to-r from-[#333333] to-[#1B1B1B] px-12">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <div className="flex items-center rounded-lg px-6 py-4">
          <LogoMark />
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-28 w-28 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={15} />
          ) : (
            <PanelLeft size={15} />
          )}
        </button>
      </div>

      {/* Session tabs */}
      <div className="flex min-w-0 flex-1 items-center gap-4 px-8">
        {sessionTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "flex max-w-[180px] items-center gap-6 rounded-lg px-12 py-6 text-12 font-medium transition-colors",
              "group",
              tab.id === "1"
                ? "bg-white/15 text-white"
                : "text-stone-400 hover:bg-white/10 hover:text-stone-200"
            )}
          >
            <span className="truncate">{tab.label}</span>
            <X
              size={12}
              className={cn(
                "shrink-0 transition-opacity",
                tab.id === "1"
                  ? "opacity-60 hover:opacity-100"
                  : "opacity-0 group-hover:opacity-60"
              )}
            />
          </button>
        ))}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-6">
        <Button
          size="sm"
          className="gap-6 bg-primary-brand-500 text-white hover:bg-primary-brand-600"
        >
          <Plus size={14} />
          <span>New Chat</span>
        </Button>

        <button
          type="button"
          onClick={() => onTabChange("automations")}
          className={cn(
            "flex items-center gap-6 rounded-lg px-12 py-6 text-12 font-medium transition-colors",
            activeTab === "automations"
              ? "bg-white/15 text-white"
              : "text-stone-400 hover:bg-white/10 hover:text-stone-200"
          )}
        >
          <Zap size={14} />
          <span>Automations</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("ai-workers")}
          className={cn(
            "flex items-center gap-6 rounded-lg px-12 py-6 text-12 font-medium transition-colors",
            activeTab === "ai-workers"
              ? "bg-white/15 text-white"
              : "text-stone-400 hover:bg-white/10 hover:text-stone-200"
          )}
        >
          <Stars01 size={14} />
          <span>AI Workers</span>
        </button>
      </div>
    </header>
  );
}
