export interface ParsedIngredient {
  name: string;
  function: string;
}

export interface ParsedReport {
  productName: string;
  manufacturer: string;
  packaging: string;
  ingredients: ParsedIngredient[];
  rawText: string;
}

const FIELD_MATCHERS: Array<{ key: "productName" | "manufacturer" | "packaging"; test: (upper: string) => boolean }> = [
  { key: "productName", test: (u) => u.startsWith("TÊN SẢN PHẨM") || u.startsWith("PRODUCT NAME") },
  {
    key: "manufacturer",
    test: (u) => u.startsWith("THƯƠNG HIỆU") || u.startsWith("NHÀ SẢN XUẤT") || u.startsWith("MANUFACTURER") || u.startsWith("BRAND"),
  },
  { key: "packaging", test: (u) => u.startsWith("LOẠI BAO BÌ") || u.startsWith("BAO BÌ") || u.startsWith("PACKAGING") },
];

export function parseAiReport(text: string): ParsedReport {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let productName = "";
  let manufacturer = "";
  let packaging = "";
  const ingredients: ParsedIngredient[] = [];
  let inIngredients = false;

  for (const line of lines) {
    const upper = line.toUpperCase();

    const field = FIELD_MATCHERS.find((f) => f.test(upper));
    if (field) {
      const value = line.split(":").slice(1).join(":").trim();
      if (field.key === "productName") productName = value;
      if (field.key === "manufacturer") manufacturer = value;
      if (field.key === "packaging") packaging = value;
      inIngredients = false;
      continue;
    }

    if (upper.startsWith("THÀNH PHẦN") || upper.startsWith("INGREDIENT")) {
      inIngredients = true;
      continue;
    }

    if (inIngredients && /^[-•*\d]/.test(line)) {
      const clean = line.replace(/^[-•*]\s*/, "").replace(/^\d+[.)]\s*/, "");
      const idx = clean.indexOf(":");
      const dashIdx = idx === -1 ? clean.indexOf(" – ") : -1;
      if (idx > -1) {
        ingredients.push({ name: clean.slice(0, idx).trim(), function: clean.slice(idx + 1).trim() });
      } else if (dashIdx > -1) {
        ingredients.push({ name: clean.slice(0, dashIdx).trim(), function: clean.slice(dashIdx + 3).trim() });
      } else if (clean) {
        ingredients.push({ name: clean.trim(), function: "" });
      }
    }
  }

  return { productName, manufacturer, packaging, ingredients, rawText: text };
}

export function buildLabelReadingPrompt(ocrTokens: string[]): string {
  const tokenHint = ocrTokens.length
    ? `Hệ thống OCR cục bộ đọc được sơ bộ các từ sau (có thể sai/thiếu do ảnh mờ): ${ocrTokens.join(", ")}.`
    : "Hệ thống chưa đọc được rõ chữ trong ảnh.";

  return `Tôi vừa chụp ảnh nhãn một sản phẩm mỹ phẩm và sẽ đính kèm ảnh này trong tin nhắn. ${tokenHint}

Hãy đọc kỹ ảnh và trả lời CHÍNH XÁC theo định dạng dưới đây (giữ nguyên tiêu đề, tiếng Việt, không thêm lời dẫn):

TÊN SẢN PHẨM: [tên sản phẩm]
THƯƠNG HIỆU/NHÀ SẢN XUẤT: [tên thương hiệu hoặc nhà sản xuất]
LOẠI BAO BÌ: [tuýp/chai/hũ/lọ xịt...]
THÀNH PHẦN:
- [Tên INCI 1]: [chức năng ngắn gọn bằng tiếng Việt]
- [Tên INCI 2]: [chức năng ngắn gọn bằng tiếng Việt]
(liệt kê đầy đủ toàn bộ thành phần đọc được trên bao bì)

Nếu không chắc chắn một chi tiết nào, ghi "không rõ" thay vì bỏ trống dòng đó.`;
}
