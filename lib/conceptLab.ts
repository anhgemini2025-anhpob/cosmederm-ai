export interface ProductType {
  key: string;
  label: string;
  emoji: string;
  note: string;
}

export const PRODUCT_TYPES: ProductType[] = [
  { key: "serum", label: "Serum", emoji: "💧", note: "Nồng độ hoạt chất cao — ưu tiên hệ Liposome/phân tử nhỏ để tăng thẩm thấu." },
  { key: "cream", label: "Kem dưỡng", emoji: "🫙", note: "Chọn hệ nhũ tương O/W hoặc W/O phù hợp cảm giác mục tiêu (xem Virtual Lab)." },
  { key: "shampoo", label: "Dầu gội / Serum tóc", emoji: "🧴", note: "Cân bằng hệ Surfactant Anionic + Amphoteric, pH mục tiêu 4.5–5.5 nếu là dầu gội." },
  { key: "bodywash", label: "Sữa tắm", emoji: "🧼", note: "Ưu tiên chỉ số dịu nhẹ cao do diện tích và thời gian tiếp xúc da lớn." },
  { key: "sunscreen", label: "Kem chống nắng", emoji: "☀️", note: "Phối hợp bộ lọc UV vô cơ/hữu cơ để đạt phổ rộng UVA/UVB." },
  { key: "mask", label: "Mặt nạ", emoji: "🎭", note: "Nồng độ hoạt chất cao dạng dùng 1 lần hoặc lưu qua đêm." },
];

export interface Mechanism {
  key: string;
  label: string;
  angle: string;
  cert: string;
  marketing: string;
  /** Match real ingredients by their `applications` tag (dynamic, from imported supplier data) */
  matchTag?: string;
  /** Match real ingredients by substring in chemical_class_function */
  matchClass?: string;
  /** Fallback: specific real INCI names known to fit this mechanism */
  curatedNames?: string[];
}

export interface MechanismCategory {
  key: "skin" | "hair";
  label: string;
  emoji: string;
  mechanisms: Mechanism[];
}

export const MECHANISM_CATEGORIES: MechanismCategory[] = [
  {
    key: "skin",
    label: "Da",
    emoji: "🧴",
    mechanisms: [
      {
        key: "anti-aging",
        label: "Chống lão hóa",
        angle: "Blue Biotech Anti-Aging — hoạt chất từ vi tảo biển sâu kết hợp phức hợp chống oxy hóa thế hệ mới (hướng ALGAKTIV Blue Biotechnology).",
        cert: "COSMOS/NATRUE nếu định vị 'clean beauty'",
        marketing: "\"Trẻ hóa làn da từ sức mạnh đại dương sâu thẳm.\"",
        matchTag: "Chống lão hóa",
      },
      {
        key: "brightening",
        label: "Sáng da",
        angle: "Đa cơ chế sáng da — kết hợp ức chế Tyrosinase với hoạt chất chống viêm để giảm tăng sắc tố sau viêm (PIH), xu hướng phổ biến tại thị trường Châu Á.",
        cert: "Vegan phù hợp nếu dùng hoạt chất lên men/thực vật thay Hydroquinone",
        marketing: "\"Sáng da đều màu, an toàn cho mọi loại da.\"",
        matchTag: "Làm sáng da",
      },
      {
        key: "soothing",
        label: "Làm dịu / Chống kích ứng",
        angle: "Barrier-first Skincare — ưu tiên phục hồi hàng rào da trước khi đặc trị, theo xu hướng 'skin minimalism' đang lên.",
        cert: "Hypoallergenic / Fragrance-free testing",
        marketing: "\"Dịu nhẹ ngay từ lần chạm đầu tiên.\"",
        matchTag: "Làm dịu / chống kích ứng",
      },
      {
        key: "barrier-repair",
        label: "Phục hồi hàng rào da",
        angle: "Biomimetic Lipid Complex — mô phỏng tỷ lệ lipid tự nhiên của da (Ceramide/Cholesterol/Fatty Acid ~3:1:1) để phục hồi hàng rào da tổn thương.",
        cert: "Dermatologically tested",
        marketing: "\"Phục hồi hàng rào da tận gốc, không chỉ dưỡng ẩm bề mặt.\"",
        matchTag: "Phục hồi hàng rào da",
      },
      {
        key: "antioxidant",
        label: "Chống oxy hóa",
        angle: "Multi-source Antioxidant Stack — phối hợp chất chống oxy hóa từ vi tảo, chiết xuất lên men (Herbasol Ferment) và Vitamin tổng hợp để bảo vệ đa tầng khỏi gốc tự do.",
        cert: "ECOCERT nếu nguồn gốc hữu cơ",
        marketing: "\"Lá chắn chống oxy hóa đa tầng cho làn da mỗi ngày.\"",
        matchTag: "Chống oxy hóa",
      },
      {
        key: "acne",
        label: "Da dầu / Mụn",
        angle: "Sebum-Balancing Complex — kết hợp kiểm soát dầu với kháng viêm nhẹ nhàng, tránh gây khô kích ứng như các sản phẩm trị mụn truyền thống.",
        cert: "Non-comedogenic tested",
        marketing: "\"Kiểm soát dầu thông minh, không khô căng.\"",
        matchTag: "Da dầu / mụn",
      },
      {
        key: "lifting",
        label: "Nâng cơ / Săn chắc",
        angle: "Peptide Signaling Complex — chuỗi peptide tín hiệu kích thích nguyên bào sợi tổng hợp Collagen/Elastin, cải thiện độ đàn hồi mà không cần can thiệp xâm lấn.",
        cert: "Clinically tested (đo đạc bằng Cutometer)",
        marketing: "\"Nâng cơ, săn chắc — hiệu ứng 'facelift không dao kéo'.\"",
        matchClass: "Peptide",
      },
      {
        key: "regeneration",
        label: "Tái tạo da",
        angle: "Cell Renewal Booster — thúc đẩy chu kỳ thay mới tế bào (~28 ngày) bằng Retinoid hoặc dẫn xuất thực vật thay thế, cải thiện kết cấu và độ đều màu da.",
        cert: "Dermatologist recommended",
        marketing: "\"Tái tạo da mỗi đêm, đánh thức làn da mới.\"",
        curatedNames: ["Retinol", "Adenosine", "Bakuchiol"],
      },
      {
        key: "sun-protection",
        label: "Chống nắng / Bảo vệ UV",
        angle: "Broad-Spectrum Shield — phối hợp bộ lọc UV vô cơ và hữu cơ để đạt bảo vệ phổ rộng UVA/UVB, nền tảng của mọi routine dự phòng lão hóa.",
        cert: "PA+++/SPF theo tiêu chuẩn ISO 24444",
        marketing: "\"Lá chắn bảo vệ da khỏi tác hại ánh nắng mỗi ngày.\"",
        matchClass: "UV Filter",
      },
    ],
  },
  {
    key: "hair",
    label: "Tóc",
    emoji: "💇",
    mechanisms: [
      {
        key: "hair-loss",
        label: "Rụng tóc / Kích thích mọc tóc",
        angle: "Scalp Micro-circulation Booster — cải thiện vi tuần hoàn máu và trao đổi chất tại nang tóc để kéo dài pha Anagen (mọc tóc), hướng tiếp cận phổ biến thay thế Minoxidil.",
        cert: "Clinically tested (đếm mật độ tóc trước/sau)",
        marketing: "\"Đánh thức nang tóc, nuôi dưỡng mái tóc chắc khỏe từ gốc.\"",
        curatedNames: ["Caffeine Herbasome®", "Niacinamide (Vitamin B3)"],
      },
      {
        key: "hair-damage",
        label: "Phục hồi hư tổn tóc",
        angle: "Cuticle Repair Complex — protein thủy phân bám dính đặc hiệu vào điểm hư tổn mang điện âm trên sợi tóc, phục hồi cấu trúc Keratin tự nhiên.",
        cert: "Instrumental testing (đo lực kéo đứt sợi tóc)",
        marketing: "\"Phục hồi tóc hư tổn từ sâu bên trong, không chỉ phủ bóng bên ngoài.\"",
        curatedNames: ["Hydrolyzed Keratin", "Panthenol (Pro-Vitamin B5)"],
      },
      {
        key: "scalp-oil",
        label: "Kiểm soát dầu da đầu",
        angle: "Scalp Sebum Control — kết hợp kiểm soát bã nhờn với làm sạch sâu nhẹ nhàng, tránh gây khô kích ứng da đầu như Sulfate mạnh truyền thống.",
        cert: "Dermatologically tested (da đầu nhạy cảm)",
        marketing: "\"Da đầu sạch thoáng cả ngày, tóc bồng bềnh tự nhiên.\"",
        curatedNames: ["Niacinamide (Vitamin B3)", "Salicylic Acid"],
      },
    ],
  },
];

export const MAX_MECHANISMS = 3;

export const SUSTAINABILITY_NOTE =
  "Cân nhắc dòng nguyên liệu Scopeblue® (LANXESS) cho phiên bản carbon footprint thấp — cùng thông số kỹ thuật, không cần đổi công thức.";
