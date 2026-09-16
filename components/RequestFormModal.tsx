"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileDown, Loader2, Mail, MessageCircle, Trash2, X } from "lucide-react";
import { AUTHOR } from "@/lib/content";
import { cn } from "@/lib/utils";

const ZALO_URL = "https://zalo.me/84908095693";

const REQUEST_TYPES = ["Xin tài liệu đầy đủ", "Yêu cầu công thức chi tiết", "Hỏi thêm thông tin", "Khác"];
const RECEIVE_METHODS = ["Qua email", "Qua Zalo", "Nhận trực tiếp / hẹn gặp"];

export interface RequestItem {
  id: string;
  title: string;
  subtitle?: string;
}

export default function RequestFormModal({
  open,
  onClose,
  items,
  itemsLabel,
  onRemoveItem,
  onClearAll,
}: {
  open: boolean;
  onClose: () => void;
  items: RequestItem[];
  itemsLabel: string;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}) {
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const [otherNote, setOtherNote] = useState("");
  const [receiveMethod, setReceiveMethod] = useState<string>(RECEIVE_METHODS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [exporting, setExporting] = useState(false);
  const [touched, setTouched] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const toggleType = (t: string) => {
    setRequestTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const contactValid = name.trim().length > 0 && phone.trim().length > 0;

  const itemsSummary = useMemo(
    () => items.map((i) => `${i.title}${i.subtitle ? ` (${i.subtitle})` : ""}`).join("\n"),
    [items]
  );

  const requestSummaryText = useMemo(() => {
    const lines = [
      `Nội dung cần: ${requestTypes.length ? requestTypes.join(", ") : "Chưa chọn"}`,
      otherNote.trim() ? `Chi tiết khác: ${otherNote.trim()}` : "",
      `${itemsLabel} quan tâm:\n${itemsSummary || "(chưa chọn)"}`,
      `Hình thức nhận: ${receiveMethod}`,
      "",
      `Người yêu cầu: ${name || "___"}`,
      `Điện thoại: ${phone || "___"}`,
      email.trim() ? `Email: ${email.trim()}` : "",
      company.trim() ? `Công ty/Đơn vị: ${company.trim()}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }, [requestTypes, otherNote, itemsLabel, itemsSummary, receiveMethod, name, phone, email, company]);

  const exportPdf = async () => {
    if (!sheetRef.current) return;
    setTouched(true);
    if (!contactValid) return;
    const previewTab = window.open("", "_blank");
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(sheetRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(imgData, "JPEG", (pageWidth - w) / 2, 10, w, h);
      const blobUrl = URL.createObjectURL(pdf.output("blob"));
      if (previewTab) previewTab.location.href = blobUrl;
      else window.open(blobUrl, "_blank");
    } catch (err) {
      console.error(err);
      previewTab?.close();
    } finally {
      setExporting(false);
    }
  };

  const mailtoHref = `mailto:${AUTHOR.email}?subject=${encodeURIComponent(
    `Yêu cầu ${itemsLabel.toLowerCase()} — CosmeDerm AI Academy`
  )}&body=${encodeURIComponent(requestSummaryText)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 sm:max-w-lg sm:rounded-3xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-primary-700">Phiếu yêu cầu ({items.length})</p>
                <p className="text-[11px] text-slate-400">Gộp nhiều {itemsLabel.toLowerCase()} vào một phiếu duy nhất</p>
              </div>
              <button onClick={onClose} className="text-slate-400">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-1.5 text-xs font-bold text-primary-700">
                  Bạn cần gì? <span className="font-normal text-slate-400">(chọn được nhiều mục)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {REQUEST_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                        requestTypes.includes(t) ? "bg-primary-500 text-white" : "bg-surface text-slate-500"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {requestTypes.includes("Khác") && (
                  <input
                    value={otherNote}
                    onChange={(e) => setOtherNote(e.target.value)}
                    placeholder="Khác — ghi rõ nội dung bạn cần..."
                    className="mt-2 w-full rounded-xl bg-surface p-2.5 text-xs outline-none ring-1 ring-black/[0.05] focus:ring-primary-300"
                  />
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-primary-700">{itemsLabel} quan tâm</p>
                {items.length === 0 ? (
                  <p className="rounded-xl bg-surface p-3 text-center text-[11px] text-slate-400">
                    Chưa chọn mục nào.
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between gap-2 rounded-xl bg-surface p-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-primary-700">{it.title}</p>
                          {it.subtitle && <p className="truncate text-[11px] text-slate-400">{it.subtitle}</p>}
                        </div>
                        <button onClick={() => onRemoveItem(it.id)} className="shrink-0 text-slate-400" aria-label="Xóa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-primary-700">
                  Thông tin liên hệ của bạn <span className="font-normal text-slate-400">(để nhận phản hồi)</span>
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Họ tên *"
                    className={cn(
                      "w-full rounded-xl bg-surface p-2.5 text-xs outline-none ring-1 focus:ring-primary-300",
                      touched && !name.trim() ? "ring-accent-400" : "ring-black/[0.05]"
                    )}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại *"
                    className={cn(
                      "w-full rounded-xl bg-surface p-2.5 text-xs outline-none ring-1 focus:ring-primary-300",
                      touched && !phone.trim() ? "ring-accent-400" : "ring-black/[0.05]"
                    )}
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (không bắt buộc)"
                    className="w-full rounded-xl bg-surface p-2.5 text-xs outline-none ring-1 ring-black/[0.05] focus:ring-primary-300"
                  />
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Công ty / Đơn vị (không bắt buộc)"
                    className="w-full rounded-xl bg-surface p-2.5 text-xs outline-none ring-1 ring-black/[0.05] focus:ring-primary-300"
                  />
                </div>
                {touched && !contactValid && (
                  <p className="mt-1 text-[11px] text-accent-500">Vui lòng nhập ít nhất họ tên và số điện thoại.</p>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-primary-700">
                  Hình thức nhận <span className="font-normal text-slate-400">(chọn một)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {RECEIVE_METHODS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setReceiveMethod(m)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                        receiveMethod === m ? "bg-primary-500 text-white" : "bg-surface text-slate-500"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Printable summary sheet used for PDF export */}
              <div ref={sheetRef} className="mx-auto w-full bg-white p-5 text-slate-800">
                <div className="flex items-center justify-between border-b-2 border-primary-500 pb-3">
                  <div>
                    <p className="text-sm font-black tracking-tight text-primary-700">CosmeDerm AI Academy</p>
                    <p className="text-[11px] text-slate-400">Phiếu yêu cầu</p>
                  </div>
                  <p className="text-[11px] text-slate-400">{new Date().toLocaleDateString("vi-VN")}</p>
                </div>

                <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Nội dung cần
                </p>
                <p className="text-xs text-slate-700">{requestTypes.length ? requestTypes.join(", ") : "—"}</p>
                {otherNote.trim() && <p className="mt-1 text-xs italic text-slate-500">{otherNote.trim()}</p>}

                <p className="mb-1.5 mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {itemsLabel} quan tâm ({items.length})
                </p>
                <div className="flex flex-col gap-1">
                  {items.map((it) => (
                    <p key={it.id} className="text-xs text-slate-700">
                      • {it.title}
                      {it.subtitle ? ` (${it.subtitle})` : ""}
                    </p>
                  ))}
                </div>

                <p className="mb-1.5 mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Người yêu cầu
                </p>
                <p className="text-xs text-slate-700">Họ tên: {name || "___"}</p>
                <p className="text-xs text-slate-700">Điện thoại: {phone || "___"}</p>
                {email.trim() && <p className="text-xs text-slate-700">Email: {email.trim()}</p>}
                {company.trim() && <p className="text-xs text-slate-700">Công ty/Đơn vị: {company.trim()}</p>}
                <p className="text-xs text-slate-700">Hình thức nhận: {receiveMethod}</p>

                <div className="mt-4 border-t border-slate-200 pt-2.5 text-[11px] text-slate-400">
                  Người nhận yêu cầu: <strong className="text-primary-700">{AUTHOR.name}</strong> — {AUTHOR.phone}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={exportPdf}
                  disabled={exporting}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white active:scale-[0.98] disabled:opacity-60"
                >
                  {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
                  {exporting ? "Đang tạo PDF..." : "In phiếu yêu cầu (PDF)"}
                </button>
                <div className="flex gap-2">
                  <a
                    href={mailtoHref}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-surface py-2.5 text-xs font-semibold text-primary-600"
                  >
                    <Mail size={13} /> Email
                  </a>
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-surface py-2.5 text-xs font-semibold text-primary-600"
                  >
                    <MessageCircle size={13} /> Zalo
                  </a>
                </div>
                <button onClick={onClearAll} className="text-[11px] font-semibold text-slate-400">
                  Xóa toàn bộ danh sách
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
