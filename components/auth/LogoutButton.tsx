"use client";

import { LogOut } from "lucide-react";
import { logoutAccount } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={logoutAccount}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-[13px] font-semibold text-slate-500 active:scale-[0.98]"
    >
      <LogOut size={14} /> Đăng xuất
    </button>
  );
}
