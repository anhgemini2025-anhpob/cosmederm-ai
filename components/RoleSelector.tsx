"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ROLES } from "@/lib/content";

const ROLE_STORAGE_KEY = "cosmederm_role";

export default function RoleSelector() {
  return (
    <div className="flex flex-col gap-3">
      {ROLES.map((role, i) => (
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
        >
          <Link
            href={role.href}
            onClick={() => {
              try {
                window.localStorage.setItem(ROLE_STORAGE_KEY, role.id);
              } catch {
                // localStorage unavailable — navigation still proceeds
              }
            }}
            className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03] transition-transform active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl">
              {role.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-primary-700">{role.title}</p>
              <p className="mt-0.5 text-xs font-medium text-accent-500">{role.subtitle}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{role.description}</p>
            </div>
            <ChevronRight
              size={20}
              className="shrink-0 text-slate-300 transition-transform group-active:translate-x-0.5"
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function getStoredRole(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ROLE_STORAGE_KEY);
  } catch {
    return null;
  }
}
