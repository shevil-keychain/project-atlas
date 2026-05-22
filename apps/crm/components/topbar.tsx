"use client";

import { Bell, ChevronDown, Search, User } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center gap-32 px-32 py-12 bg-white border-b border-[#e8e8eb] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 w-full">
      {/* Search — centered, max 500px */}
      <div className="flex flex-1 flex-col items-center min-w-0">
        <button className="flex items-center gap-8 w-full max-w-[500px] px-12 py-12 bg-white border border-[#d1d5db] rounded-full cursor-pointer hover:border-[#9ca3af] transition-colors">
          <Search size={20} className="shrink-0 text-[#6b7280]" />
          <span className="flex-1 text-14 font-medium text-[#6b7280] leading-20 text-left overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            Search by product, category, or manufacturer
          </span>
        </button>
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
