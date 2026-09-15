"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, GraduationCap, FlaskConical, Search, Sparkles, Gamepad2, TrendingUp, BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/learn", label: "Lộ trình", icon: GraduationCap },
  { href: "/lab", label: "Lab Ảo", icon: FlaskConical },
  { href: "/checker", label: "Tra cứu", icon: Search },
  { href: "/clinical", label: "Routine", icon: Sparkles },
  { href: "/trends", label: "Xu hướng", icon: TrendingUp },
  { href: "/games", label: "Trò chơi", icon: Gamepad2 },
  { href: "/guide", label: "Hướng dẫn", icon: BookOpenCheck },
];

export const TOP_NAV_HEIGHT = 84;

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 overflow-hidden bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 shadow-card-lg"
      style={{ height: TOP_NAV_HEIGHT }}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-accent-400/25 blur-2xl" />
      <div className="scrollbar-hide relative mx-auto flex h-full max-w-2xl items-stretch gap-0.5 overflow-x-auto px-1.5 lg:max-w-5xl lg:justify-center lg:gap-2 xl:max-w-6xl">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex w-[64px] shrink-0 flex-col items-center justify-center gap-1 sm:w-[76px]"
            >
              {isActive && (
                <motion.span
                  layoutId="top-nav-pill"
                  className="absolute inset-x-1 top-2 bottom-2 rounded-2xl bg-white/20 ring-1 ring-white/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={28}
                strokeWidth={isActive ? 2.6 : 2.2}
                className={cn(
                  "relative z-10 transition-colors",
                  isActive ? "text-accent-400" : "text-white/85"
                )}
              />
              <span
                className={cn(
                  "relative z-10 text-[13px] font-bold transition-colors",
                  isActive ? "text-white" : "text-white/85"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
