import type { GlogauLevel } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function safetyTone(status: string): "safe" | "caution" | "restricted" {
  const s = status.toLowerCase();
  if (s.includes("restricted") || s.includes("not safe") || s.includes("unsafe")) {
    return "restricted";
  }
  if (
    s.includes("qualification") ||
    s.includes("limit") ||
    s.includes("strict") ||
    s.includes("up to") ||
    s.includes("chưa qua đánh giá") ||
    s.includes("chưa đánh giá") ||
    s.includes("dữ liệu thương mại") ||
    s.includes("khuyến nghị nhà sản xuất")
  ) {
    return "caution";
  }
  return "safe";
}

/** Extracts Glogau level(s) e.g. "III" from a string like "Glogau Type III - IV". */
export function extractGlogauLevels(classification: string): string[] {
  const match = classification.match(/Glogau\s*(?:Type|Classification)?\s*([IV]+(?:\s*-\s*[IV]+)?)/i);
  if (!match) return [];
  return match[1].split("-").map((s) => s.trim().toUpperCase());
}

export const GLOGAU_LEVELS: {
  level: GlogauLevel;
  label: string;
  ageRange: string;
  description: string;
}[] = [
  {
    level: "I",
    label: "Glogau I — Nhẹ (Không nếp nhăn)",
    ageRange: "Thường 20 - 35 tuổi",
    description:
      "Chưa có nếp nhăn rõ, sắc tố da đều, chưa cần can thiệp. Trọng tâm là dự phòng: chống nắng và chống oxy hóa.",
  },
  {
    level: "II",
    label: "Glogau II — Trung bình (Nhăn khi cử động)",
    ageRange: "Thường 35 - 50 tuổi",
    description:
      "Bắt đầu xuất hiện nếp nhăn động, đốm sắc tố sớm (nám, tàn nhang), có thể sờ thấy dày sừng nhẹ.",
  },
  {
    level: "III",
    label: "Glogau III — Nặng (Nhăn cả khi nghỉ)",
    ageRange: "Thường 50 - 65 tuổi",
    description:
      "Nếp nhăn tĩnh xuất hiện rõ kể cả khi thư giãn cơ mặt, tăng sắc tố rải rác, giãn mao mạch rõ.",
  },
  {
    level: "IV",
    label: "Glogau IV — Rất nặng (Chỉ toàn nếp nhăn)",
    ageRange: "Thường 65 - 75+ tuổi",
    description:
      "Da chùng nhão toàn diện, mất thể tích mô mềm, tổn thương tiền ung thư có thể xuất hiện, cần phối hợp đa mô thức.",
  },
];
