export interface RegionalTrend {
  region: string;
  flag: string;
  trends: { title: string; detail: string }[];
}

export const REGIONAL_TRENDS: RegionalTrend[] = [
  {
    region: "Châu Âu",
    flag: "🇪🇺",
    trends: [
      {
        title: "Clean Beauty & Minh bạch thành phần",
        detail:
          "Người tiêu dùng EU ngày càng đòi hỏi công bố đầy đủ INCI, tránh 'chất gây tranh cãi' (paraben, silicone khó phân hủy, vi nhựa). App/website tra 'độ sạch' công thức (kiểu INCI Beauty, Yuka) ảnh hưởng trực tiếp quyết định mua hàng.",
      },
      {
        title: "Sustainability & Refill/Solid format",
        detail:
          "Bao bì tái nạp (refill), dạng rắn (solid shampoo/conditioner bar) và chứng nhận Carbon Footprint đang trở thành tiêu chuẩn cạnh tranh, không còn là 'điểm cộng' phụ.",
      },
      {
        title: "Skin Microbiome",
        detail:
          "Công thức 'thân thiện hệ vi sinh da' (pre/probiotic, postbiotic) tăng mạnh, đặc biệt trong dòng chăm sóc da nhạy cảm và sau thủ thuật.",
      },
    ],
  },
  {
    region: "Hoa Kỳ",
    flag: "🇺🇸",
    trends: [
      {
        title: "Dermatology-inspired / 'Skintellectual'",
        detail:
          "Người dùng am hiểu thành phần hơn nhờ TikTok/mạng xã hội, ưu tiên hoạt chất có bằng chứng lâm sàng (Niacinamide, Retinoid, Peptide) thay vì chỉ tin marketing cảm tính.",
      },
      {
        title: "Inclusive shade range & đa dạng loại da",
        detail:
          "Dòng trang điểm/chống nắng mở rộng dải tông màu và công thức phù hợp đa dạng tông da (không để lại vệt trắng — 'no white cast') trở thành yêu cầu bắt buộc để cạnh tranh.",
      },
      {
        title: "Multi-functional 'skinimalism'",
        detail:
          "Xu hướng giảm số bước routine, ưu tiên sản phẩm đa công dụng (vd. serum + chống nắng, tinted moisturizer + SPF) để tiết kiệm thời gian.",
      },
    ],
  },
  {
    region: "Nhật Bản",
    flag: "🇯🇵",
    trends: [
      {
        title: "Layering nhẹ nhàng, kết cấu 'mizu' (nước)",
        detail:
          "Ưu tiên kết cấu mỏng nhẹ, thấm nhanh, nhiều lớp (lotion → essence → cream) thay vì một sản phẩm đặc đậm — phù hợp khí hậu ẩm và làn da nhạy cảm.",
      },
      {
        title: "UV Care quanh năm, PA++++ phổ biến",
        detail:
          "Ý thức chống nắng rất cao, chỉ số PA (bảo vệ UVA) được quan tâm ngang SPF — kem chống nắng dạng sữa/gel mỏng nhẹ, không bóng dầu là chuẩn mực.",
      },
      {
        title: "Quasi-drug — hiệu quả được chứng minh dược lý",
        detail:
          "Nhiều sản phẩm chăm sóc da phổ biến ở Nhật thuộc nhóm Quasi-drug (chứa hoạt chất được Bộ Y tế phê duyệt ở nồng độ quy định), tạo niềm tin 'có bằng chứng khoa học' mạnh với người tiêu dùng.",
      },
    ],
  },
  {
    region: "Hàn Quốc",
    flag: "🇰🇷",
    trends: [
      {
        title: "Tốc độ ra mắt nhanh, vòng đời xu hướng ngắn",
        detail:
          "Thị trường K-Beauty nổi tiếng với tốc độ tung sản phẩm mới cực nhanh (indie brand → viral → mainstream chỉ trong vài tháng), đòi hỏi R&D linh hoạt và chuỗi cung ứng nguyên liệu nhanh.",
      },
      {
        title: "'Glass skin' & hoạt chất lên men (Fermentation)",
        detail:
          "Xu hướng da 'kính' bóng khỏe tiếp tục phổ biến, cùng với hoạt chất lên men (Galactomyces, Bifida Ferment) được ưa chuộng vì cảm giác 'dịu nhẹ mà hiệu quả'.",
      },
      {
        title: "Ingredient-led marketing (đặt tên theo hoạt chất)",
        detail:
          "Sản phẩm thường đặt tên trực tiếp theo hoạt chất chủ đạo (vd. 'Snail 96 Mucin', 'Centella Blemish') giúp người tiêu dùng dễ nhận diện công dụng ngay từ tên gọi.",
      },
    ],
  },
  {
    region: "Việt Nam",
    flag: "🇻🇳",
    trends: [
      {
        title: "Nguyên liệu bản địa & 'thảo dược Việt'",
        detail:
          "Xu hướng khai thác nguyên liệu bản địa (rau má, nghệ, bí đao, tràm trà, hoa hồng Đà Lạt...) làm điểm khác biệt câu chuyện thương hiệu, kết hợp công nghệ chiết xuất hiện đại.",
      },
      {
        title: "Phân khúc giá hợp lý, chịu ảnh hưởng K-Beauty",
        detail:
          "Người tiêu dùng trẻ tiếp cận xu hướng K-Beauty/J-Beauty qua mạng xã hội rất nhanh, tạo cơ hội cho thương hiệu nội địa định vị 'chất lượng quốc tế, giá Việt Nam'.",
      },
      {
        title: "Ý thức chống nắng & chăm sóc da đầu tăng nhanh",
        detail:
          "Nhu cầu kem chống nắng dạng nhẹ, không bóng dầu và các dòng chăm sóc da đầu chuyên biệt (kiểm soát dầu, chống rụng tóc) tăng trưởng mạnh trong 3-5 năm gần đây.",
      },
    ],
  },
];

export interface SuccessStory {
  product: string;
  brand: string;
  why: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    product: "The Ordinary — dòng hoạt chất đơn lẻ, giá hợp lý",
    brand: "DECIEM (Canada)",
    why: "Thành công nhờ chiến lược 'minh bạch công thức + giá rẻ bất ngờ' cho các hoạt chất vốn chỉ có ở dòng cao cấp (Niacinamide, Retinoid, Peptide), thay đổi hoàn toàn cách người tiêu dùng đọc bảng thành phần.",
  },
  {
    product: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX (Hàn Quốc)",
    why: "Đưa một nguyên liệu 'lạ' (dịch nhầy ốc sên) thành hiện tượng toàn cầu nhờ định vị phục hồi/dưỡng ẩm rõ ràng và social proof mạnh trên mạng xã hội.",
  },
  {
    product: "La Roche-Posay Cicaplast Baume B5",
    brand: "La Roche-Posay (L'Oréal, Pháp)",
    why: "Sản phẩm 'đa năng toàn gia đình' (dùng được cho da nứt nẻ, kích ứng, sau nắng, cả trẻ em) xây dựng niềm tin qua kênh dược sĩ/nhà thuốc — mô hình derma-cosmetic điển hình.",
  },
  {
    product: "Kem chống nắng dạng xịt/gel mỏng nhẹ",
    brand: "Nhiều thương hiệu Nhật/Hàn (Biore UV, Anessa...)",
    why: "Công nghệ nhũ tương UV thế hệ mới (Aqua Booster, Sarasara) giải quyết đúng nỗi đau 'chống nắng bết dính' — trở thành chuẩn mực toàn cầu, được các thị trường khác học theo.",
  },
  {
    product: "innisfree Green Tea Seed Serum",
    brand: "innisfree (Hàn Quốc)",
    why: "Câu chuyện 'nguyên liệu từ đảo Jeju' + hiệu quả cấp ẩm rõ rệt xây dựng thành công một dòng sản phẩm biểu tượng gắn liền với xuất xứ nguyên liệu — bài học cho định vị 'nguyên liệu bản địa'.",
  },
];

export interface MarketRule {
  market: string;
  flag: string;
  points: string[];
}

export const EXPORT_MARKET_RULES: MarketRule[] = [
  {
    market: "Việt Nam",
    flag: "🇻🇳",
    points: [
      "Công bố sản phẩm mỹ phẩm (Product Notification) với Cục Quản lý Dược — Bộ Y tế trước khi lưu hành, theo Thông tư 06/2011/TT-BYT.",
      "Thành phần phải tuân thủ Hiệp định Mỹ phẩm ASEAN (ACD) — danh mục cấm/hạn chế tương đồng EU nhưng có phụ lục riêng.",
      "Nhãn sản phẩm bắt buộc tiếng Việt: tên sản phẩm, công dụng, thành phần, hướng dẫn dùng, số lô, hạn dùng, nhà sản xuất/chịu trách nhiệm.",
    ],
  },
  {
    market: "ASEAN",
    flag: "🌏",
    points: [
      "ASEAN Cosmetic Directive (ACD) hài hòa hóa quy định giữa các nước thành viên — một hồ sơ kỹ thuật (PIF) có thể tái sử dụng khi mở rộng sang nước ASEAN khác.",
      "Hệ thống công bố (notification-based) tương tự EU/Việt Nam, không cần phê duyệt trước như thuốc, nhưng hậu kiểm nghiêm ngặt.",
      "Danh mục thành phần cấm/hạn chế/UV filter/chất bảo quản dựa theo phụ lục ACD — cần đối chiếu riêng, không hoàn toàn giống EU hay Mỹ.",
    ],
  },
  {
    market: "Châu Á (Nhật Bản & Hàn Quốc)",
    flag: "🇯🇵🇰🇷",
    points: [
      "Nhật Bản: phân loại Cosmetics (công bố, không cần phê duyệt trước) vs Quasi-drug (bắt buộc phê duyệt PMDA/MHLW nếu chứa hoạt chất dược lý ở nồng độ quy định).",
      "Hàn Quốc: MFDS (Bộ An toàn Thực phẩm & Dược phẩm) quản lý theo Cosmetics Act, phân loại 'Functional Cosmetics' (chống lão hóa, làm trắng, chống nắng) cần báo cáo hiệu quả/an toàn riêng.",
      "Cả hai thị trường đòi hỏi nhãn tiếng bản địa và có thể yêu cầu người đại diện/nhà nhập khẩu chịu trách nhiệm pháp lý tại nước sở tại.",
    ],
  },
  {
    market: "Hoa Kỳ",
    flag: "🇺🇸",
    points: [
      "FDA quản lý theo FD&C Act — mỹ phẩm không cần phê duyệt trước khi bán, nhưng từ MoCRA (2022) bắt buộc đăng ký cơ sở sản xuất và liệt kê sản phẩm (Facility Registration & Product Listing).",
      "Nếu công bố công dụng trị liệu (vd. chống nắng SPF, trị mụn hoạt chất OTC) sản phẩm chuyển sang nhóm OTC Drug — cần tuân thủ Monograph riêng, quy trình chặt hơn nhiều.",
      "Yêu cầu hồ sơ an toàn (Safety Substantiation) sẵn sàng cung cấp khi FDA yêu cầu hậu kiểm.",
    ],
  },
  {
    market: "Châu Âu (EU)",
    flag: "🇪🇺",
    points: [
      "Bắt buộc có Người chịu trách nhiệm (Responsible Person) đặt tại EU, hồ sơ Cosmetic Product Safety Report (CPSR) do chuyên gia đánh giá an toàn thực hiện.",
      "Thông báo sản phẩm qua cổng CPNP (Cosmetic Product Notification Portal) trước khi bán ra thị trường EU.",
      "Lưu giữ Product Information File (PIF) tối thiểu 10 năm sau lô sản xuất cuối cùng, sẵn sàng cho cơ quan quản lý kiểm tra.",
    ],
  },
  {
    market: "Chứng nhận toàn cầu cần cân nhắc",
    flag: "🏅",
    points: [
      "ISO 22716 (GMP mỹ phẩm) — gần như bắt buộc nếu muốn xuất khẩu vào EU/Mỹ, chứng minh quy trình sản xuất đạt chuẩn.",
      "ECOCERT / COSMOS — chứng nhận hữu cơ/thiên nhiên phổ biến nhất tại EU, ảnh hưởng lớn đến định vị 'clean beauty'.",
      "Halal — bắt buộc cân nhắc nếu nhắm thị trường Trung Đông/Malaysia/Indonesia (dân số Hồi giáo lớn).",
      "Cruelty-Free (Leaping Bunny) / Vegan — ngày càng là yêu cầu mềm từ nhà bán lẻ lớn (Sephora, Ulta) dù không phải luật bắt buộc.",
    ],
  },
];
