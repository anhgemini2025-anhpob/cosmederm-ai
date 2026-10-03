"use client";

import { Clock, MessageCircle, Phone } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { logoutAccount } from "@/lib/auth";
import { AUTHOR } from "@/lib/content";

const ZALO_URL = "https://zalo.me/84908095693";

export default function ExpiredScreen() {
  return (
    <AuthShell>
      <div className="rounded-3xl bg-white p-6 text-center shadow-card-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-500">
          <Clock size={26} />
        </div>
        <h2 className="mt-4 text-lg font-bold text-primary-700">Tài khoản đã hết hạn sử dụng</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Cảm ơn bạn đã quan tâm đến CosmeDerm AI Academy. Để tiếp tục sử dụng, vui lòng liên hệ tác giả để được gia
          hạn.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-primary-500 py-3.5 text-base font-bold text-white shadow-card active:scale-[0.98]"
          >
            <MessageCircle size={18} /> Liên hệ qua Zalo
          </a>
          <a
            href={`tel:${AUTHOR.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-full bg-surface py-3.5 text-base font-bold text-primary-600"
          >
            <Phone size={18} /> Gọi {AUTHOR.phone}
          </a>
          <button type="button" onClick={logoutAccount} className="py-2 text-sm font-semibold text-slate-400">
            Đăng xuất
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
