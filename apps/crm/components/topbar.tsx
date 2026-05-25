"use client";

import { Bell, ChevronDown, Search, User } from "lucide-react";

export function Topbar({ onAskAI, askAIOpen }: { onAskAI: () => void; askAIOpen: boolean }) {
  return (
    <header className="flex items-center gap-32 px-32 py-12 bg-white border-b border-[#e8e8eb] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 w-full">
      {/* Search + Ask AI — centered group */}
      <div className="flex flex-1 items-center justify-center gap-8 min-w-0">
        <button className="flex items-center gap-8 w-full max-w-[500px] h-40 px-12 bg-white border border-[#d1d5db] rounded-full cursor-pointer hover:border-[#9ca3af] transition-colors">
          <Search size={16} className="shrink-0 text-[#6b7280]" />
          <span className="flex-1 text-14 font-medium text-[#6b7280] leading-20 text-left overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            Search by product, category, or manufacturer
          </span>
        </button>

        <style>{`
          .ask-ai-trigger {
            background:
              linear-gradient(white, white) padding-box,
              linear-gradient(
                135deg,
                var(--color-primary-lime-400),
                var(--color-primary-sky-500),
                var(--color-secondary-purple-400),
                var(--color-primary-brand-300),
                var(--color-primary-lime-400)
              ) border-box;
            border: 1.5px solid transparent;
          }
          .ask-ai-trigger:hover {
            background:
              linear-gradient(var(--color-surface-subtle), var(--color-surface-subtle)) padding-box,
              linear-gradient(
                135deg,
                var(--color-primary-lime-400),
                var(--color-primary-sky-500),
                var(--color-secondary-purple-400),
                var(--color-primary-brand-300),
                var(--color-primary-lime-400)
              ) border-box;
          }
        `}</style>
        {!askAIOpen && (
          <button
            type="button"
            onClick={onAskAI}
            aria-label="Ask AI"
            className="ask-ai-trigger shrink-0 inline-flex items-center gap-8 h-40 pl-14 pr-16 rounded-full text-14 font-semibold text-text-primary shadow-sm hover:shadow-md transition-all duration-200 active:translate-y-px"
          >
            <GradientSparkle />
            Ask AI
          </button>
        )}
      </div>

      {/* Right: bell + divider + user */}
      <div className="flex items-center gap-16 shrink-0">
        {/* Bell */}
        <button className="flex items-center justify-center p-6 rounded-lg hover:bg-[#f9fafb] transition-colors">
          <Bell size={24} className="text-[#6b7280]" />
        </button>

        {/* Vertical divider */}
        <div className="w-px h-32 bg-[#e8e8eb]" />

        {/* User dropdown */}
        <button className="flex items-center gap-12 cursor-pointer hover:opacity-80 transition-opacity">
          {/* Avatar */}
          <div className="flex items-center justify-center size-32 rounded-full bg-[#f6f6f4] shrink-0">
            <User size={16} className="text-[#6b7280]" />
          </div>

          {/* Name + org */}
          <div className="flex flex-col items-start max-w-[160px]">
            <span className="text-14 font-semibold text-[#111827] leading-20 overflow-hidden text-ellipsis whitespace-nowrap w-full">
              John Doe
            </span>
            <span className="text-12 font-medium text-[#6b7280] leading-16">
              Keychain
            </span>
          </div>

          <ChevronDown size={20} className="shrink-0 text-[#6b7280]" />
        </button>
      </div>
    </header>
  );
}

function GradientSparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkle-grad-tb" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-primary-lime-500)" />
          <stop offset="35%" stopColor="var(--color-primary-sky-500)" />
          <stop offset="65%" stopColor="var(--color-secondary-purple-400)" />
          <stop offset="100%" stopColor="var(--color-primary-brand-300)" />
        </linearGradient>
      </defs>
      <path
        d="M9 1 C9 1 9.8 5.5 11.5 7.5 C13.5 9.2 18 9 18 9 C18 9 13.5 8.8 11.5 10.5 C9.8 12.5 9 17 9 17 C9 17 8.2 12.5 6.5 10.5 C4.5 8.8 0 9 0 9 C0 9 4.5 9.2 6.5 7.5 C8.2 5.5 9 1 9 1 Z"
        fill="url(#sparkle-grad-tb)"
      />
    </svg>
  );
}
