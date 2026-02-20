"use client"

import {
  Home,
  BarChart3,
  Users,
  MessageSquare,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItemConfig {
  label: string
  icon: LucideIcon
}

const navItems: NavItemConfig[] = [
  { label: "Home", icon: Home },
  { label: "Analytics", icon: BarChart3 },
  { label: "VoC", icon: Users },
  { label: "Convs.", icon: MessageSquare },
  { label: "Coaching", icon: FileText },
  { label: "Calibration", icon: SlidersHorizontal },
  { label: "AI workers", icon: Sparkles },
]

const settingsItem: NavItemConfig = { label: "Settings", icon: Settings }

interface MainNavProps {
  activeItem?: string
  onItemClick?: (item: string) => void
  className?: string
}

function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: NavItemConfig
  isActive: boolean
  onClick?: () => void
}) {
  const Icon = item.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-[72px] h-[72px] flex-col items-center justify-center gap-1 cursor-pointer",
        "group"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
          isActive && "bg-[rgba(223,190,159,0.2)]",
          !isActive && "group-hover:bg-white/10"
        )}
      >
        <Icon className="size-[18px]" strokeWidth={isActive ? 2 : 1.5} />
      </div>
      <span
        className={cn(
          "text-[10px] leading-tight tracking-[0.2px] font-[family-name:var(--font-manrope,sans-serif)]",
          isActive ? "text-white font-semibold" : "text-[#E1DEDA] font-medium"
        )}
      >
        {item.label}
      </span>
    </button>
  )
}

export function MainNav({ activeItem, onItemClick, className }: MainNavProps) {
  return (
    <nav
      className={cn(
        "flex h-screen w-[72px] flex-col items-center bg-gradient-to-b from-[#333333] to-[#1B1B1B] py-2 text-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-[72px] w-[72px] items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-white shadow-sm">
          <div className="h-5 w-5 rounded-sm bg-[#F97316]" />
        </div>
      </div>

      {/* Primary nav items */}
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          item={item}
          isActive={activeItem === item.label}
          onClick={() => onItemClick?.(item.label)}
        />
      ))}

      {/* Settings pinned to bottom */}
      <div className="mt-auto">
        <NavItem
          item={settingsItem}
          isActive={activeItem === settingsItem.label}
          onClick={() => onItemClick?.(settingsItem.label)}
        />
      </div>
    </nav>
  )
}
