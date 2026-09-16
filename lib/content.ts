import type { RoleInfo } from "./types";

export const ROLES: RoleInfo[] = [
  {
    id: "consumer",
    title: "Người mới bắt đầu",
    subtitle: "Consumer & Skincare Enthusiast",
    description:
      "Đọc hiểu nhãn thành phần, nhận biết loại da và tránh các chất kích ứng qua thẻ ghi nhớ trực quan.",
    emoji: "🟢",
    href: "/learn/beginner",
  },
  {
    id: "student",
    title: "Sinh viên chuyên ngành",
    subtitle: "Cosmetic & Medical Student",
    description:
      "Nắm vững sinh lý da/tóc, lý thuyết hóa keo, hoạt chất điều trị qua sơ đồ tương tác và quiz tình huống.",
    emoji: "🔵",
    href: "/learn/student",
  },
  {
    id: "professional",
    title: "Chuyên gia",
    subtitle: "R&D Formulator & B2B Sales",
    description:
      "Kỹ thuật nhũ hóa nâng cao, thiết kế công thức thương mại, phát triển ý tưởng sản phẩm mới và quy chuẩn xuất khẩu quốc tế.",
    emoji: "🟣",
    href: "/learn/professional",
  },
];

export interface LibraryBook {
  order: number;
  slug: string;
  title: string;
  authors: string;
  focus: string;
  summary: string;
  significance: string;
  chapters?: string[];
}

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    order: 1,
    slug: "cir",
    title: "Cosmetic Ingredients Review – Quick Reference Table",
    authors: "CIR Expert Panel",
    focus: "An toàn thành phần & giới hạn nồng độ",
    summary:
      "Bảng tham khảo nhanh, hệ thống hóa mức độ an toàn, giới hạn nồng độ sử dụng, chức năng kỹ thuật và tình trạng đánh giá độc tính của các thành phần hóa mỹ phẩm phổ biến — tra cứu theo tên INCI hoặc nhóm chức năng.",
    significance: "Giúp nhà tạo công thức và chuyên gia R&D nhanh chóng thẩm định tính an toàn pháp lý của nguyên liệu.",
  },
  {
    order: 2,
    slug: "burgess",
    title: "Cosmetic Dermatology",
    authors: "Cheryl M. Burgess, M.D. (Editor)",
    focus: "Botox, Filler, Laser, Peel da",
    summary:
      "Tập trung vào da liễu thẩm mỹ hiện đại — cơ chế lão hóa da, các liệu trình can thiệp ít xâm lấn (Botox, chất làm đầy, laser, peel da) và công nghệ hoạt chất chống lão hóa (Cosmeceuticals).",
    significance: "Cung cấp kiến thức da liễu thẩm mỹ ứng dụng lâm sàng cho bác sĩ thực hành các thủ thuật ít xâm lấn.",
    chapters: [
      "Ch.1 Anti-Aging Medicine As It Relates to Dermatology",
      "Ch.2 Anti-Aging Skin Care Ingredient Technologies",
      "Ch.3 Photoaging and Pigmentary Changes of the Skin",
      "Ch.4 Chemexfoliation and Superficial Skin Resurfacing",
      "Ch.5 Botulinum Toxin",
      "Ch.6 Soft Tissue Augmentation",
      "Ch.7 Laser Skin Resurfacing",
      "Ch.8 Sclerotherapy",
    ],
  },
  {
    order: 3,
    slug: "jungermann-draelos",
    title: "Cosmetic Formulation of Skin Care Products",
    authors: "Eric Jungermann & Zoe D. Draelos (Editors)",
    focus: "Bào chế sản phẩm chăm sóc da",
    summary:
      "Hướng dẫn chuyên sâu đi từ lý thuyết sinh lý da đến kỹ thuật tạo công thức sản phẩm chăm sóc da, kết hợp góc nhìn của bác sĩ da liễu và nhà hóa mỹ phẩm R&D.",
    significance: "Cung cấp tri thức tích hợp giữa da liễu lâm sàng và công nghệ bào chế mỹ phẩm thương mại.",
  },
  {
    order: 4,
    slug: "bouillon",
    title: "The Science of Hair Care",
    authors: "Claude Bouillon & John Wilkinson (Editors)",
    focus: "Sinh lý tóc, nhuộm/uốn, Keratin",
    summary:
      "Nghiên cứu khoa học toàn diện về sinh học nang tóc, cấu trúc sợi tóc, công nghệ sản phẩm chăm sóc/tạo kiểu/nhuộm tóc, độc tính học và bệnh lý da đầu.",
    significance: "Bộ tài liệu tham chiếu kinh điển kết hợp giữa khoa học tóc (trichology), hóa mỹ phẩm và da đầu liễu học.",
  },
  {
    order: 5,
    slug: "barel-paye-maibach",
    title: "Handbook of Cosmetic Science and Technology",
    authors: "André O. Barel, Marc Paye, Howard I. Maibach (Editors)",
    focus: "Quy chuẩn pháp lý & Claim Substantiation",
    summary:
      "Sổ tay bách khoa toàn thư cập nhật toàn diện về cơ quan đích, an toàn độc học, hệ dẫn truyền (vehicles), nguyên liệu, các dòng sản phẩm, luật định toàn cầu và thử nghiệm hiệu quả.",
    significance: "Cung cấp tri thức bách khoa chuẩn hóa cho nhà khoa học, nhà sản xuất, cơ quan quản lý và bác sĩ da liễu.",
  },
  {
    order: 6,
    slug: "draelos",
    title: "Cosmetic Dermatology: Products and Procedures",
    authors: "Zoe Diana Draelos, M.D. (Editor)",
    focus: "Hoạt chất điều trị & quy trình lâm sàng",
    summary:
      "Sách giáo khoa hệ thống hóa kết hợp giữa sản phẩm mỹ phẩm (thành phần, bào chế) và các quy trình phẫu thuật/thủ thuật thẩm mỹ da liễu lâm sàng.",
    significance: "Bộ sách tiêu chuẩn tích hợp toàn diện tri thức da liễu thẩm mỹ cho bác sĩ lâm sàng và chuyên gia R&D.",
  },
  {
    order: 7,
    slug: "mitsui-new",
    title: "New Cosmetic Science",
    authors: "Takeo Mitsui, Ph.D. (Editor)",
    focus: "Hóa keo, hệ phân tán, độ ổn định",
    summary:
      "Tổng hợp các tiến bộ mới và nền tảng khoa học mỹ phẩm Nhật Bản, kết hợp giữa hóa học, lý hóa bề mặt, da liễu và tâm lý học người tiêu dùng.",
    significance: "Đỉnh cao công nghệ mỹ phẩm Nhật Bản, liên kết chặt chẽ giữa nghiên cứu cơ bản và ứng dụng sản xuất thương mại.",
  },
  {
    order: 8,
    slug: "baran-maibach",
    title: "Textbook of Cosmetic Dermatology",
    authors: "Robert Baran & Howard I. Maibach (Editors)",
    focus: "Sinh lý hàng rào da, hấp thu qua da",
    summary:
      "Y học da liễu thẩm mỹ dựa trên bằng chứng (evidence-based), tập trung sâu vào sinh học da, sự hấp thu qua da, tác động khí hậu và phác đồ điều trị lâm sàng.",
    significance: "Tài liệu gối đầu giường về da liễu thẩm mỹ thực chứng, kết hợp sinh học da và thử nghiệm lâm sàng có đối chứng.",
  },
  {
    order: 9,
    slug: "iwata-shimada",
    title: "Formulas, Ingredients and Production of Cosmetics",
    authors: "Hiroshi Iwata & Kunio Shimada",
    focus: "Kỹ thuật nhũ hóa chuẩn Nhật Bản",
    summary:
      "Bí quyết công nghệ (know-how) thực tế trong tạo công thức, đánh giá nguyên liệu và sản xuất mỹ phẩm chăm sóc da và tóc ở cấp độ thương mại tại Nhật Bản.",
    significance: "Tiết lộ những bí kíp thực tế giúp kỹ thuật viên tạo công thức thương mại đạt chuẩn cao.",
  },
  {
    order: 10,
    slug: "summary-map",
    title: "Cosmetic Science Books Summary",
    authors: "Tài liệu tổng hợp (Synthesis Document)",
    focus: "Bản đồ tra cứu đối chiếu 10 nguồn tri thức",
    summary:
      "Bảng tổng hợp đối chiếu tóm tắt 10 cuốn sách cốt lõi trong ngành khoa học mỹ phẩm và da liễu thẩm mỹ, so sánh điểm quan trọng và giá trị ứng dụng của từng cuốn.",
    significance: "Bản đồ lộ trình tra cứu giúp định hướng cho sinh viên, bác sĩ và nhà khoa học mỹ phẩm chọn đúng tài liệu phù hợp nhu cầu công việc.",
  },
];

export function getBook(slug: string): LibraryBook | undefined {
  return LIBRARY_BOOKS.find((b) => b.slug === slug);
}

export interface ExternalTool {
  name: string;
  tag: string;
  description: string;
  stat: string;
  url: string;
}

export const EXTERNAL_TOOLS: ExternalTool[] = [
  {
    name: "LANXESS Advisor",
    tag: "Chất bảo quản & Đặc chủng",
    description:
      "Bộ lọc thông minh giúp chọn chất bảo quản và hoạt chất LANXESS theo dạng sản phẩm, pH mục tiêu và nhóm chức năng — kèm tỷ lệ dùng khuyến nghị.",
    stat: "29+ giải pháp",
    url: "https://lanxess-cosmetic-advisor.pages.dev/",
  },
  {
    name: "Lipoid Advisor",
    tag: "Phospholipid, Liposome & Hoạt chất thực vật",
    description:
      "Toàn bộ danh mục Phospholipid, Liposome và hoạt chất/chiết xuất thực vật của Lipoid Kosmetik, dịch tiếng Việt và sắp xếp theo cách formulator tra cứu thực tế, kèm công thức mẫu tham khảo.",
    stat: "536 nguyên liệu · 81 công thức",
    url: "https://lipoid-advisor.pages.dev/",
  },
  {
    name: "ALGAKTIV Advisor",
    tag: "Hoạt chất vi tảo biển",
    description:
      "Cẩm nang tương tác về 10 hoạt chất ALGAKTIV® và 4 nhóm vi tảo nền tảng — đi từ cơ chế sinh học biển đến ứng dụng công thức hoàn chỉnh.",
    stat: "10 hoạt chất · 4 nhóm vi tảo",
    url: "https://algaktiv-advisor.pages.dev/",
  },
  {
    name: "Vanderbilt Advisor",
    tag: "Khoáng chất & Rheology",
    description:
      "Trợ lý chọn khoáng chất và phụ gia đặc chủng Vanderbilt theo từng ngành ứng dụng — từ mỹ phẩm, dược phẩm đến nông nghiệp và công nghiệp.",
    stat: "7 ngành ứng dụng",
    url: "https://vanderbilt-advisor.anh-gemini2025.workers.dev/",
  },
];

export interface SkinType {
  kind: "dry" | "oily" | "sensitive" | "photoaging";
  name: string;
  traits: string;
  tip: string;
  detail: string;
}

export const SKIN_TYPES: SkinType[] = [
  {
    kind: "dry",
    name: "Da khô (Dry)",
    traits: "Bề mặt căng, dễ bong vảy, lỗ chân lông nhỏ, ít nhờn kể cả giữa trưa.",
    tip: "Ưu tiên Ceramide, Squalane, Glycerin — tránh cồn khô (Alcohol Denat.) nồng độ cao.",
    detail:
      "Da khô thiếu cả nước lẫn dầu, khiến hàng rào bảo vệ da yếu hơn và dễ kích ứng khi thời tiết hanh khô hoặc dùng xà phòng tẩy mạnh. Nên chọn sữa rửa mặt dạng kem/sữa thay vì gel tạo bọt mạnh, tránh nước quá nóng, và thoa kem dưỡng ngay khi da còn ẩm sau khi rửa mặt để khóa ẩm hiệu quả hơn.",
  },
  {
    kind: "oily",
    name: "Da dầu (Oily)",
    traits: "Đổ dầu vùng chữ T, lỗ chân lông to, dễ nổi mụn và bóng nhờn sau vài giờ.",
    tip: "Ưu tiên kết cấu gel/lotion mỏng nhẹ, Niacinamide, BHA — tránh dầu khoáng đặc.",
    detail:
      "Tuyến bã nhờn hoạt động mạnh do nội tiết tố hoặc di truyền, thường đi kèm lỗ chân lông to và dễ hình thành mụn đầu đen. Đừng bỏ qua bước dưỡng ẩm — da thiếu nước vẫn có thể tiết dầu nhiều hơn để bù đắp (tình trạng 'da dầu nhưng mất nước'), khiến việc bỏ dưỡng ẩm phản tác dụng.",
  },
  {
    kind: "sensitive",
    name: "Da nhạy cảm (Sensitive)",
    traits: "Dễ ửng đỏ, châm chích, phản ứng với sản phẩm mới hoặc thời tiết thay đổi.",
    tip: "Chọn công thức Fragrance-free, ít thành phần, thử patch test 48h trước khi dùng toàn mặt.",
    detail:
      "Hàng rào bảo vệ da mỏng và dây thần kinh cảm giác nằm gần bề mặt hơn, nên dễ phản ứng với nhiệt độ, ma sát hoặc hoạt chất mạnh. Nên giới thiệu sản phẩm mới từng loại một, cách nhau vài ngày, để dễ xác định đúng nguyên nhân nếu xảy ra phản ứng bất thường.",
  },
  {
    kind: "photoaging",
    name: "Da lão hóa ánh sáng (Photoaging)",
    traits: "Nếp nhăn, đốm nâu, mất độ đàn hồi do tích lũy tia UV nhiều năm.",
    tip: "Chống nắng phổ rộng SPF 30+ mỗi ngày là bước quan trọng nhất — kết hợp Vitamin C buổi sáng.",
    detail:
      "Khác với lão hóa tự nhiên theo tuổi tác, lão hóa do ánh sáng (photoaging) có thể phòng ngừa được phần lớn chỉ bằng cách chống nắng đúng cách mỗi ngày — kể cả khi ở trong nhà gần cửa sổ hoặc trời râm, vì tia UVA vẫn xuyên qua kính và mây.",
  },
];

export interface DiagramLayer {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const SKIN_LAYERS: DiagramLayer[] = [
  {
    id: "stratum-corneum",
    name: "Stratum Corneum (Lớp sừng)",
    color: "bg-amber-200",
    description:
      "Lớp ngoài cùng gồm tế bào sừng hóa (corneocyte) xếp như gạch trong vữa (brick and mortar), chứa lipid gian bào (Ceramide, Cholesterol, Fatty Acid). Là hàng rào bảo vệ chính, kiểm soát mất nước qua da (TEWL) và ngăn vi sinh vật xâm nhập.",
  },
  {
    id: "epidermis",
    name: "Epidermis (Thượng bì sống)",
    color: "bg-orange-300",
    description:
      "Nơi tế bào Keratinocyte tăng sinh từ lớp đáy và biệt hóa dần lên bề mặt (chu kỳ ~28 ngày). Chứa Melanocyte tạo sắc tố bảo vệ khỏi UV và tế bào Langerhans đóng vai trò miễn dịch tại chỗ.",
  },
  {
    id: "dermis",
    name: "Dermis (Trung bì)",
    color: "bg-rose-300",
    description:
      "Chứa mạng lưới Collagen & Elastin quyết định độ đàn hồi, mạch máu nuôi dưỡng biểu bì, nang lông, tuyến bã nhờn và thụ thể cảm giác. Là mục tiêu chính của các liệu pháp kích thích tái tạo collagen (Laser, PLLA, Microneedling).",
  },
  {
    id: "hypodermis",
    name: "Hypodermis (Hạ bì mỡ)",
    color: "bg-yellow-100",
    description:
      "Lớp mô mỡ dưới da đóng vai trò cách nhiệt, đệm cơ học và dự trữ năng lượng. Mất thể tích mô mỡ ở lớp này theo tuổi tác là nguyên nhân chính gây hõm má, lõm thái dương — mục tiêu của liệu pháp Filler khôi phục thể tích.",
  },
];

export const HAIR_LAYERS: DiagramLayer[] = [
  {
    id: "cuticle",
    name: "Cuticle (Lớp biểu bì tóc)",
    color: "bg-primary-200",
    description:
      "Các phiến Keratin mỏng xếp chồng như ngói lợp nhà, thường 6-10 lớp. Quyết định độ bóng mượt và là hàng rào bảo vệ đầu tiên — hóa chất nhuộm/uốn phải làm phồng và mở lớp này để thấm vào bên trong.",
  },
  {
    id: "cortex",
    name: "Cortex (Lớp vỏ)",
    color: "bg-primary-400",
    description:
      "Chiếm 75-90% khối lượng sợi tóc, chứa các bó sợi Keratin dạng xoắn alpha-helix liên kết ngang bằng cầu nối Disulfide (-S-S-, bị bẻ gãy và tái tạo khi uốn tóc) và liên kết Hydro/ion. Chứa hạt Melanin quyết định màu tóc tự nhiên — nơi thuốc nhuộm thấm vào và phản ứng.",
  },
  {
    id: "medulla",
    name: "Medulla (Lớp tủy)",
    color: "bg-primary-700",
    description:
      "Lõi trung tâm của sợi tóc, có thể gián đoạn hoặc không tồn tại ở tóc mảnh/tóc tơ. Vai trò cơ học và hóa học còn chưa rõ ràng, ít ảnh hưởng đến quá trình tạo kiểu.",
  },
];

export interface TheoryTopic {
  title: string;
  content: string;
}

export const COLLOID_THEORY: TheoryTopic[] = [
  {
    title: "Hệ phân tán (Dispersed System)",
    content:
      "Mỹ phẩm là hệ phân tán gồm pha phân tán (dispersed phase) trộn trong pha liên tục (continuous phase) mà không tan hoàn toàn vào nhau. Phân loại theo kích thước hạt: Dung dịch thật (<1nm), Hệ keo/Colloid (1nm-1µm, gồm Sol, Gel, Nhũ tương), và Hệ thô/Suspension (>1µm, dễ lắng cặn).",
  },
  {
    title: "Nhũ tương O/W và W/O",
    content:
      "O/W (Oil-in-Water): giọt dầu phân tán trong pha nước liên tục — cảm giác nhẹ, dễ tán, phổ biến cho kem dưỡng ban ngày. W/O (Water-in-Oil): giọt nước phân tán trong pha dầu liên tục — độ che phủ/khóa ẩm cao hơn, cảm giác dày hơn, phổ biến cho kem chống nắng chống nước hoặc kem dưỡng ban đêm. Loại hệ hình thành phụ thuộc vào giá trị HLB (Hydrophilic-Lipophilic Balance) của chất nhũ hóa: HLB thấp (3-6) ưu tiên tạo W/O, HLB cao (8-18) ưu tiên tạo O/W.",
  },
  {
    title: "Hiện tượng mất ổn định nhũ tương",
    content:
      "Creaming/Sedimentation: các giọt pha phân tán nổi lên hoặc lắng xuống do chênh lệch tỷ trọng, có thể phân tán lại khi lắc. Flocculation: các giọt kết chùm lỏng lẻo. Coalescence: các giọt hợp nhất thành giọt lớn hơn không thể đảo ngược — dấu hiệu tách pha thật sự. Ostwald Ripening: giọt nhỏ 'di cư' vào giọt lớn qua pha liên tục theo thời gian.",
  },
  {
    title: "Vai trò chất hoạt động bề mặt (Surfactant)",
    content:
      "Phân tử surfactant có cấu trúc lưỡng thân (đầu ưa nước - đuôi ưa dầu), tập trung tại bề mặt phân cách Dầu/Nước để hạ sức căng bề mặt, cho phép hai pha phân tán vào nhau và tạo lớp màng bảo vệ quanh giọt nhũ tương chống lại hiện tượng Coalescence.",
  },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Lớp nào của da chịu trách nhiệm chính trong việc kiểm soát mất nước qua da (TEWL)?",
    options: ["Hypodermis", "Dermis", "Stratum Corneum", "Melanocyte"],
    correctIndex: 2,
    explanation:
      "Stratum Corneum với cấu trúc 'gạch và vữa' cùng lipid gian bào là hàng rào chính kiểm soát TEWL.",
  },
  {
    question: "Chất nhũ hóa có giá trị HLB thấp (3-6) thường tạo ra hệ nhũ tương nào?",
    options: ["O/W (Dầu trong Nước)", "W/O (Nước trong Dầu)", "Gel polymer thuần túy", "Dung dịch thật"],
    correctIndex: 1,
    explanation: "HLB thấp ưa dầu hơn, giúp pha dầu trở thành pha liên tục → tạo hệ W/O.",
  },
  {
    question: "Cầu nối nào trong Cortex tóc bị bẻ gãy và tái tạo trong kỹ thuật uốn tóc (Perming)?",
    options: ["Liên kết Hydro", "Liên kết ion", "Cầu nối Disulfide (-S-S-)", "Liên kết Van der Waals"],
    correctIndex: 2,
    explanation:
      "Uốn tóc dùng chất khử để bẻ gãy cầu Disulfide, định hình tóc theo khuôn, rồi dùng chất oxy hóa để tái tạo cầu nối ở hình dạng mới.",
  },
  {
    question: "Theo chuẩn nhũ hóa Nhật Bản (Iwata & Shimada), tỷ lệ Nhũ hóa/Dầu tối thiểu để hệ O/W ổn định là bao nhiêu?",
    options: ["~5%", "~15-20%", "~50%", "~80%"],
    correctIndex: 1,
    explanation:
      "Tỷ lệ Nhũ hóa/Dầu dưới 15% có nguy cơ tách pha cao; khuyến nghị đạt tối thiểu 15-20% để đảm bảo ổn định.",
  },
  {
    question: "Glogau Type III đặc trưng bởi điều gì?",
    options: [
      "Chưa có nếp nhăn, da đều màu",
      "Nếp nhăn chỉ xuất hiện khi cử động cơ mặt",
      "Nếp nhăn xuất hiện rõ kể cả khi nghỉ (at rest)",
      "Da chỉ còn toàn nếp nhăn, không còn vùng da phẳng",
    ],
    correctIndex: 2,
    explanation:
      "Glogau III ('Wrinkles at rest') có nếp nhăn tĩnh rõ ngay cả khi thư giãn cơ mặt, kèm tăng sắc tố rải rác.",
  },
];

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "HLB (Hydrophilic-Lipophilic Balance)", definition: "Chỉ số 0-20 đo độ ưa nước/ưa dầu của chất nhũ hóa — HLB thấp phù hợp hệ W/O, HLB cao phù hợp hệ O/W." },
  { term: "TEWL (Transepidermal Water Loss)", definition: "Lượng nước mất qua da theo con đường tự nhiên, chỉ số đánh giá trực tiếp sức khỏe hàng rào da." },
  { term: "Comedogenic", definition: "Đặc tính gây bít tắc lỗ chân lông, thường được đánh giá theo thang điểm 0-5 khi lựa chọn dầu/emollient." },
  { term: "QRA (Quantitative Risk Assessment)", definition: "Phương pháp định lượng nguy cơ kích ứng/dị ứng của một thành phần dựa trên nồng độ sử dụng thực tế và mức phơi nhiễm." },
  { term: "In-situ Saponification", definition: "Phản ứng xà phòng hóa xảy ra ngay trong quá trình nhũ hóa (vd. Stearic Acid + TEA) để hỗ trợ ổn định hệ nhũ tương." },
  { term: "Photostability", definition: "Khả năng một hoạt chất/bộ lọc UV giữ nguyên cấu trúc và hiệu lực khi tiếp xúc ánh sáng — Avobenzone kém bền quang nếu không phối hợp chất ổn định." },
  { term: "Rheology Modifier", definition: "Nhóm chất điều chỉnh độ nhớt và kết cấu chảy của sản phẩm (Carbomer, Xanthan Gum, Cetearyl Alcohol...)." },
  { term: "Claim Substantiation", definition: "Quy trình thu thập bằng chứng khoa học (đo đạc, thử nghiệm lâm sàng) để chứng minh một công bố tính năng là có căn cứ." },
];

export const REGULATORY_TOPICS: TheoryTopic[] = [
  {
    title: "🇺🇸 Hoa Kỳ — FDA",
    content:
      "Mỹ phẩm chịu quản lý theo FD&C Act và Fair Packaging Labeling Act. Khác với thuốc, mỹ phẩm KHÔNG cần FDA phê duyệt trước khi lưu hành, nhưng cấm chứa thành phần độc hại và nhãn không được gây hiểu lầm. Từ MoCRA (2022), doanh nghiệp bắt buộc đăng ký cơ sở sản xuất và liệt kê sản phẩm (Facility Registration & Product Listing).",
  },
  {
    title: "🇪🇺 Châu Âu — EU Regulation 1223/2009",
    content:
      "Bắt buộc có Người chịu trách nhiệm (Responsible Person) tại EU, hồ sơ Cosmetic Product Safety Report (CPSR) do chuyên gia đánh giá an toàn thực hiện, thông báo sản phẩm qua cổng CPNP trước khi bán, và lưu giữ Product Information File (PIF) trong 10 năm.",
  },
  {
    title: "🇯🇵 Nhật Bản — PMD Act",
    content:
      "Phân loại rõ giữa Mỹ phẩm thông thường (Cosmetics, hiệu quả nhẹ, không cần phê duyệt trước) và Quasi-drugs (gần giống thuốc, chứa hoạt chất được liệt kê ở nồng độ quy định, BẮT BUỘC phê duyệt trước khi lưu hành bởi PMDA/MHLW) — khác biệt lớn so với mô hình Mỹ và EU.",
  },
  {
    title: "📋 Claim Substantiation (Chứng minh công bố)",
    content:
      "Mọi công bố tính năng (vd. 'giảm nếp nhăn sau 4 tuần') đều cần bằng chứng khoa học lưu hồ sơ: thử nghiệm lâm sàng có đối chứng, đo đạc khách quan bằng thiết bị (Corneometer đo độ ẩm, Cutometer đo độ đàn hồi, Mexameter đo sắc tố), hoặc đánh giá cảm quan có kiểm soát trên người dùng thật — sẵn sàng đối chiếu khi cơ quan quản lý yêu cầu.",
  },
];

export interface TrueFalseStatement {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export const TRUE_FALSE_STATEMENTS: TrueFalseStatement[] = [
  {
    statement: "Salicylic Acid (BHA) tan trong dầu nên thấm sâu vào lỗ chân lông hơn AHA.",
    isTrue: true,
    explanation: "Đúng — tính tan trong dầu giúp BHA đi sâu vào lỗ chân lông, rất phù hợp trị mụn.",
  },
  {
    statement: "Sản phẩm tiêu dùng thông thường được phép chứa Glycolic Acid nồng độ 30% mà không cần cảnh báo.",
    isTrue: false,
    explanation: "Sai — nồng độ Glycolic Acid tối đa cho sản phẩm tiêu dùng (leave-on, pH≥3.5) chỉ là 10%; 30% chỉ dành cho salon chuyên nghiệp.",
  },
  {
    statement: "Chất bảo quản MCI/MI bị giới hạn nồng độ cực thấp vì nguy cơ gây mẫn cảm da mạnh.",
    isTrue: true,
    explanation: "Đúng — giới hạn chỉ 7.5 ppm (leave-on) và 15 ppm (rinse-off) vì nguy cơ dị ứng tiếp xúc cao.",
  },
  {
    statement: "Hệ nhũ tương O/W (Dầu trong Nước) luôn tạo cảm giác dày và nhờn hơn W/O.",
    isTrue: false,
    explanation: "Sai — thường ngược lại: O/W nhẹ, dễ tán, còn W/O mới là hệ tạo cảm giác dày/khóa ẩm cao hơn.",
  },
  {
    statement: "Cầu nối Disulfide trong Cortex tóc là mục tiêu chính của kỹ thuật uốn tóc (Perming).",
    isTrue: true,
    explanation: "Đúng — chất khử bẻ gãy cầu Disulfide để định hình, sau đó chất oxy hóa tái tạo cầu nối ở hình dạng mới.",
  },
  {
    statement: "Glogau Type I nghĩa là da đã có nếp nhăn rõ ngay cả khi nghỉ ngơi.",
    isTrue: false,
    explanation: "Sai — đó là mô tả của Glogau Type III. Type I là mức nhẹ nhất, gần như chưa có nếp nhăn.",
  },
  {
    statement: "Tỷ lệ Nhũ hóa/Dầu quá thấp làm tăng nguy cơ tách pha trong công thức mỹ phẩm.",
    isTrue: true,
    explanation: "Đúng — theo chuẩn Iwata & Shimada, tỷ lệ dưới 15% khiến hệ nhũ tương dễ mất ổn định.",
  },
  {
    statement: "Tất cả các loại da đều nên tránh hoàn toàn dầu khoáng (Petrolatum).",
    isTrue: false,
    explanation: "Sai — Petrolatum là chất khóa ẩm an toàn, hiệu quả cao, đặc biệt tốt cho da khô/hàng rào da tổn thương.",
  },
  {
    statement: "Kojic Acid được CIR kết luận an toàn khi dùng ở nồng độ tối đa 1%.",
    isTrue: true,
    explanation: "Đúng — nồng độ cao hơn 1% có nguy cơ gây dị ứng tiếp xúc theo đánh giá của CIR.",
  },
  {
    statement: "Chất hoạt động bề mặt (surfactant) chỉ có tác dụng tạo bọt, không liên quan đến nhũ hóa.",
    isTrue: false,
    explanation: "Sai — surfactant có cấu trúc lưỡng thân, vừa tạo bọt vừa là nền tảng của quá trình nhũ hóa Dầu/Nước.",
  },
  {
    statement: "Kem chống nắng phổ rộng là bước quan trọng nhất trong dự phòng lão hóa da do ánh sáng.",
    isTrue: true,
    explanation: "Đúng — phần lớn dấu hiệu photoaging đến từ tia UV tích lũy; chống nắng hằng ngày là nền tảng dự phòng.",
  },
  {
    statement: "Stratum Corneum là lớp tế bào sống, có khả năng phân chia liên tục.",
    isTrue: false,
    explanation: "Sai — Stratum Corneum gồm tế bào sừng hóa đã chết; tế bào sống phân chia nằm ở lớp đáy Epidermis.",
  },
];

export interface ChecklistItem {
  title: string;
  detail: string;
}

export const INCI_READING_STEPS: ChecklistItem[] = [
  {
    title: "1. Thứ tự = Nồng độ giảm dần",
    detail: "Danh sách INCI liệt kê thành phần theo nồng độ từ cao đến thấp. Dưới 1% có thể xếp tự do, không theo thứ tự.",
  },
  {
    title: "2. 5 thành phần đầu chiếm phần lớn công thức",
    detail: "Thường chiếm 70-90% khối lượng sản phẩm — thường là Nước, chất làm mềm và chất nhũ hóa nền.",
  },
  {
    title: "3. Hoạt chất 'ngôi sao' thường nằm giữa danh sách",
    detail: "Niacinamide, Retinol, Vitamin C... thường ở nồng độ 1-10%, xuất hiện ở vị trí giữa bảng thành phần.",
  },
  {
    title: "4. Cảnh giác với nhóm gây kích ứng phổ biến",
    detail: "Fragrance/Parfum, Alcohol Denat. nồng độ cao, Essential Oils — nên thận trọng nếu da nhạy cảm.",
  },
  {
    title: "5. Đối chiếu ngay với mục Tra cứu",
    detail: "Thấy tên lạ? Dùng mô-đun Tra cứu (Checker) để kiểm tra mức an toàn và nồng độ cho phép ngay lập tức.",
  },
];

export const BASIC_ROUTINE_STEPS: ChecklistItem[] = [
  {
    title: "Bước 1 — Làm sạch (Cleanse)",
    detail: "Sữa rửa mặt dịu nhẹ, pH 5.0-6.5, sáng và tối. Không rửa mặt quá 2 lần/ngày để tránh mất lớp lipid bảo vệ.",
  },
  {
    title: "Bước 2 — Đặc trị (Treat)",
    detail: "Serum chứa hoạt chất mục tiêu (Vitamin C buổi sáng, Retinol/AHA-BHA buổi tối) — chỉ dùng 1 hoạt chất mạnh/buổi.",
  },
  {
    title: "Bước 3 — Dưỡng ẩm & Bảo vệ (Moisturize + SPF)",
    detail: "Kem dưỡng khóa ẩm ban đêm; ban ngày bắt buộc kem chống nắng phổ rộng SPF 30+, thoa lại sau 2-3 giờ.",
  },
];

export const FORMULATION_LAUNCH_CHECKLIST: ChecklistItem[] = [
  {
    title: "☐ Thử nghiệm độ ổn định (Stability Testing)",
    detail: "Lưu mẫu ở 25°C, 40°C, 4°C và chu kỳ nóng-lạnh (freeze-thaw) tối thiểu 3 tháng trước khi thương mại hóa.",
  },
  {
    title: "☐ Thử nghiệm vi sinh (Challenge Test / PET)",
    detail: "Đảm bảo hệ bảo quản đủ khả năng ức chế vi khuẩn, nấm mốc theo tiêu chuẩn ISO 11930.",
  },
  {
    title: "☐ Tương thích bao bì (Packaging Compatibility)",
    detail: "Kiểm tra phản ứng giữa công thức và vật liệu bao bì (nhựa, kim loại) trong suốt thời hạn sử dụng.",
  },
  {
    title: "☐ Hồ sơ Claim Substantiation",
    detail: "Chuẩn bị bằng chứng khoa học cho mọi công bố tính năng — đo đạc khách quan hoặc thử nghiệm lâm sàng có kiểm soát.",
  },
  {
    title: "☐ Đăng ký & tuân thủ pháp lý theo thị trường",
    detail: "Đối chiếu quy định FDA (Mỹ), CPNP (EU) hoặc PMD Act (Nhật Bản) tùy thị trường mục tiêu trước khi lưu hành.",
  },
];

export interface HairType {
  kind: "oily-scalp" | "dry-damaged" | "dandruff" | "chemically-treated";
  name: string;
  traits: string;
  tip: string;
  detail: string;
}

export const HAIR_TYPES: HairType[] = [
  {
    kind: "oily-scalp",
    name: "Tóc & da đầu dầu (Oily)",
    traits: "Da đầu tiết nhiều dầu, tóc bết dính nặng chỉ sau 1 ngày gội, chân tóc nhanh xẹp.",
    tip: "Gội cách ngày với dầu gội làm sạch sâu chứa Salicylic Acid/Zinc Pyrithione — tránh thoa dầu xả sát da đầu.",
    detail:
      "Tuyến bã nhờn ở da đầu hoạt động mạnh hơn bình thường khiến dầu di chuyển dọc thân tóc nhanh hơn. Gội đầu mỗi ngày với dầu gội dịu nhẹ vẫn tốt hơn nhịn gội, vì da đầu bẩn tích tụ dầu/bụi có thể làm tình trạng bết dính nặng thêm.",
  },
  {
    kind: "dry-damaged",
    name: "Tóc khô, xơ rối (Dry/Damaged)",
    traits: "Tóc xơ cứng, dễ gãy rụng, chẻ ngọn, mất độ bóng tự nhiên, khó chải khi khô.",
    tip: "Ưu tiên dầu xả/mặt nạ chứa Hydrolyzed Keratin, dầu Argan — hạn chế nhiệt từ máy sấy, máy uốn.",
    detail:
      "Lớp biểu bì (cuticle) bị hư tổn khiến tóc mất khả năng phản chiếu ánh sáng đều, tạo cảm giác xỉn màu dù tóc sạch. Ủ tóc sâu (deep conditioning) 1-2 lần/tuần thường phục hồi hiệu quả hơn nhiều so với chỉ dùng dầu xả thông thường mỗi ngày.",
  },
  {
    kind: "dandruff",
    name: "Da đầu gàu, nhạy cảm (Dandruff)",
    traits: "Ngứa da đầu, bong vảy trắng li ti trên vai áo, có thể kèm đỏ rát khi đổi sản phẩm mới.",
    tip: "Chọn dầu gội chứa Ketoconazole hoặc Piroctone Olamine — tránh Sulfate mạnh và hương liệu nồng độ cao.",
    detail:
      "Gàu có thể do nấm Malassezia phát triển quá mức hoặc do da đầu khô đơn thuần — hai nguyên nhân này cần hướng xử lý khác nhau. Nếu dùng dầu gội trị gàu liên tục 2 tuần mà không cải thiện, nên gặp bác sĩ da liễu để xác định đúng nguyên nhân thay vì tự đổi sản phẩm liên tục.",
  },
  {
    kind: "chemically-treated",
    name: "Tóc đã qua hóa chất (Nhuộm/Uốn)",
    traits: "Tóc từng nhuộm, uốn hoặc duỗi — lớp biểu bì (cuticle) đã tổn thương, thấm hút nhanh và mất màu sớm.",
    tip: "Dùng dầu gội chuyên biệt tóc nhuộm (không Sulfate), bổ sung Amodimethicone để bảo vệ và giữ màu lâu hơn.",
    detail:
      "Sau khi nhuộm hoặc uốn, nên chờ ít nhất 48-72 giờ trước khi gội đầu lần đầu để màu nhuộm và kết cấu uốn ổn định hoàn toàn bên trong cấu trúc sợi tóc, tránh trôi màu/mất nếp sớm.",
  },
];

export interface CategoryFramework {
  keyword: string;
  why: string;
}

export interface ProductCategoryPlaybook {
  emoji: string;
  name: string;
  frameworks: CategoryFramework[];
}

export const PRODUCT_CATEGORY_PLAYBOOK: ProductCategoryPlaybook[] = [
  {
    emoji: "🧴",
    name: "Dầu gội (Shampoo)",
    frameworks: [
      {
        keyword: "Hệ Surfactant cân bằng (Anionic + Amphoteric)",
        why: "Surfactant quá mạnh (SLES đơn lẻ nồng độ cao) gây khô xơ tóc và kích ứng da đầu — cần phối Cocamidopropyl Betaine để giảm kích ứng mà vẫn giữ bọt tốt.",
      },
      {
        keyword: "pH cân bằng 4.5 – 5.5",
        why: "Giữ lớp biểu bì (cuticle) tóc đóng khít, tránh xù rối, giữ độ bóng và giảm gãy rụng khi chải ướt.",
      },
      {
        keyword: "Polymer cation điều hòa (Polyquaternium-10/7)",
        why: "Trung hòa điện tích âm tích tụ trên tóc hư tổn, giúp dễ chải và giảm ma sát gây gãy tóc.",
      },
      {
        keyword: "Tránh Sulfate mạnh cho dòng 'tóc nhuộm'",
        why: "SLS/SLES rửa trôi phân tử màu nhuộm nhanh hơn nhiều so với surfactant gốc amino acid.",
      },
    ],
  },
  {
    emoji: "🧼",
    name: "Sữa tắm (Body Wash)",
    frameworks: [
      {
        keyword: "Chỉ số dịu nhẹ (Mildness Index)",
        why: "Da toàn thân tiếp xúc surfactant trên diện tích lớn và thời gian dài hơn dầu gội — cần ngưỡng kích ứng thấp hơn.",
      },
      {
        keyword: "Độ nhớt & cảm quan khi đổ ra tay (Rheology)",
        why: "Người dùng đánh giá cảm giác 'cao cấp' qua độ đặc và kết cấu bọt ngay từ giây đầu tiên sử dụng.",
      },
      {
        keyword: "Hoàn ẩm sau làm sạch (Niacinamide, dầu tự nhiên)",
        why: "Surfactant luôn lấy đi một phần lipid tự nhiên của da — cần hoạt chất bù ẩm để tránh khô căng sau tắm.",
      },
    ],
  },
  {
    emoji: "💧",
    name: "Serum",
    frameworks: [
      {
        keyword: "Hệ dẫn truyền hoạt chất (Delivery System)",
        why: "Serum là sản phẩm đặc trị nồng độ cao — cần công nghệ Liposome/phân tử lượng thấp để hoạt chất thẩm thấu hiệu quả thay vì chỉ nằm trên bề mặt.",
      },
      {
        keyword: "Ổn định hoạt chất nhạy cảm (Vitamin C, Retinol)",
        why: "Các hoạt chất này dễ oxy hóa/phân hủy dưới ánh sáng — bắt buộc bao bì kín khí, tối màu và phối hợp chất chống oxy hóa (Vitamin E, Ferulic Acid).",
      },
      {
        keyword: "Tương thích khi phối lớp (Layering)",
        why: "Kết hợp sai thứ tự hoặc sai cặp hoạt chất (vd. Vitamin C dạng Acid + Niacinamide nồng độ cao, hoặc Retinol + AHA/BHA cùng lúc) có thể gây kích ứng hoặc vô hiệu hóa lẫn nhau.",
      },
    ],
  },
  {
    emoji: "🫙",
    name: "Kem dưỡng (Cream/Moisturizer)",
    frameworks: [
      {
        keyword: "Lựa chọn hệ nhũ tương O/W hay W/O",
        why: "Quyết định trực tiếp cảm giác sử dụng (nhẹ/dày) và khả năng khóa ẩm — xem chi tiết tại Virtual Lab.",
      },
      {
        keyword: "Chỉ số Comedogenic của dầu/emollient",
        why: "Kem có kết cấu đặc và lưu trên da lâu, nên nguy cơ bít tắc lỗ chân lông cao hơn serum hay lotion mỏng.",
      },
      {
        keyword: "Hệ bảo quản phù hợp cho nền nhiều nước",
        why: "Pha nước chiếm tỷ trọng lớn là môi trường lý tưởng cho vi khuẩn/nấm mốc phát triển nếu hệ bảo quản không đủ mạnh.",
      },
    ],
  },
  {
    emoji: "💅",
    name: "Chăm sóc móng (Nail Care)",
    frameworks: [
      {
        keyword: "Polymer bám dính (Base Coat / Top Coat)",
        why: "Độ bám dính giữa các lớp sơn quyết định độ bền màu, chống bong tróc và sứt mẻ.",
      },
      {
        keyword: "Dung môi bay hơi (Ethyl Acetate, Butyl Acetate)",
        why: "Kiểm soát tốc độ khô của sơn, đồng thời ảnh hưởng đến an toàn hô hấp khi sử dụng trong không gian kín (cần thông tin cảnh báo trên nhãn).",
      },
      {
        keyword: "Xu hướng 'Free-from' (5-Free, 10-Free)",
        why: "Loại bỏ Formaldehyde, Toluene, DBP... đang trở thành tiêu chuẩn bắt buộc để cạnh tranh tại nhiều thị trường.",
      },
    ],
  },
  {
    emoji: "🦷",
    name: "Chăm sóc răng miệng (Oral Care)",
    frameworks: [
      {
        keyword: "Độ mài mòn tương đối ngà răng (RDA Index)",
        why: "Chỉ số RDA quá cao trong kem đánh răng gây mòn men răng tích lũy theo thời gian sử dụng dài hạn.",
      },
      {
        keyword: "Nồng độ & dạng Fluoride (NaF, SMFP)",
        why: "Quy định giới hạn nồng độ tối đa rất nghiêm ngặt và khác nhau giữa sản phẩm cho trẻ em và người lớn.",
      },
      {
        keyword: "SLS và nguy cơ loét miệng tái phát",
        why: "Một số người dùng nhạy cảm với SLS trong kem đánh răng có thể bị kích thích gây lở miệng (aphthous ulcer) tái phát.",
      },
    ],
  },
  {
    emoji: "💄",
    name: "Trang điểm (Color Cosmetics)",
    frameworks: [
      {
        keyword: "Danh mục chất màu được phép (CI Numbers)",
        why: "Mỗi thị trường (FDA, EU, Nhật Bản) có danh sách chất tạo màu được phê duyệt khác nhau — bắt buộc đối chiếu riêng cho từng thị trường xuất khẩu.",
      },
      {
        keyword: "Chất tạo màng chống trôi (Film Formers)",
        why: "Quyết định khả năng định vị sản phẩm 'long-wear' hoặc 'waterproof' — yếu tố marketing quan trọng của dòng trang điểm.",
      },
      {
        keyword: "Tiêu chuẩn vi sinh khắt khe hơn (đặc biệt vùng mắt)",
        why: "Sản phẩm dùng gần mắt (Mascara, Eyeliner) có nguy cơ nhiễm khuẩn cao hơn, đòi hỏi hệ bảo quản và kiểm nghiệm vi sinh nghiêm ngặt hơn.",
      },
    ],
  },
];

export interface KeyConcept {
  keyword: string;
  detail: string;
  bookSlug: string;
  reference: string;
}

export interface StudentCategory {
  key: "skin" | "hair" | "nail" | "oral";
  label: string;
  emoji: string;
  concepts: KeyConcept[];
}

export const STUDENT_KEY_CONCEPTS: StudentCategory[] = [
  {
    key: "skin",
    label: "Da",
    emoji: "🧴",
    concepts: [
      {
        keyword: "Hàng rào lipid 'gạch và vữa' (tỷ lệ 3:1:1)",
        detail: "Ceramide, Cholesterol và Free Fatty Acid theo tỷ lệ mol xấp xỉ 3:1:1 tạo nên lớp vữa lipid gian bào. Lệch tỷ lệ này là nguyên nhân gốc rễ của da nhạy cảm và eczema.",
        bookSlug: "baran-maibach",
        reference: "Textbook of Cosmetic Dermatology — Sinh lý hàng rào da",
      },
      {
        keyword: "TEWL (Transepidermal Water Loss)",
        detail: "Chỉ số đo lượng nước mất qua da, phản ánh trực tiếp sức khỏe hàng rào bảo vệ — dùng để đánh giá khách quan hiệu quả sản phẩm phục hồi da trong nghiên cứu lâm sàng.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — An toàn độc học & Hệ dẫn truyền",
      },
      {
        keyword: "Chu kỳ thay mới tế bào (~28 ngày)",
        detail: "Retinoid hoạt động bằng cách rút ngắn chu kỳ tăng sinh — biệt hóa này, đẩy nhanh loại bỏ tế bào sừng già cỗi và kích thích tái tạo biểu bì.",
        bookSlug: "burgess",
        reference: "Cosmetic Dermatology — Ch.2 Anti-Aging Skin Care Ingredient Technologies",
      },
      {
        keyword: "Phân loại Fitzpatrick (6 mức)",
        detail: "Thang đánh giá khả năng bắt nắng và tổn thương do UV theo màu da — quyết định lựa chọn nồng độ peel/thông số laser an toàn cho từng bệnh nhân.",
        bookSlug: "draelos",
        reference: "Cosmetic Dermatology: Products and Procedures",
      },
    ],
  },
  {
    key: "hair",
    label: "Tóc",
    emoji: "💇",
    concepts: [
      {
        keyword: "Cầu nối Disulfide trong Cortex",
        detail: "Liên kết hóa học bền nhất giữ hình dạng sợi tóc, bị bẻ gãy bằng chất khử và tái tạo bằng chất oxy hóa trong kỹ thuật uốn/duỗi tóc.",
        bookSlug: "bouillon",
        reference: "The Science of Hair Care — Cấu trúc Keratin & Cortex",
      },
      {
        keyword: "Điểm đẳng điện của tóc (pH ≈ 3.67)",
        detail: "Ở pH này, protein Keratin trung hòa điện tích và tóc trương nở ít nhất — cơ sở khoa học để thiết kế công thức dầu gội/dầu xả tối ưu độ pH.",
        bookSlug: "bouillon",
        reference: "The Science of Hair Care — Hóa học sợi tóc",
      },
      {
        keyword: "Chu kỳ mọc tóc (Anagen – Catagen – Telogen)",
        detail: "Phân biệt rụng tóc sinh lý bình thường (kết thúc chu kỳ Telogen tự nhiên) với rụng tóc bệnh lý (Telogen Effluvium, Androgenetic Alopecia).",
        bookSlug: "bouillon",
        reference: "The Science of Hair Care — Sinh học nang tóc",
      },
    ],
  },
  {
    key: "nail",
    label: "Móng",
    emoji: "💅",
    concepts: [
      {
        keyword: "Cấu trúc bản móng (Nail Plate)",
        detail: "Gồm 100-150 lớp tế bào Keratin cứng (Hard Keratin, giàu liên kết Disulfide hơn cả tóc) xếp chồng, được sinh ra liên tục từ Ma trận móng (Nail Matrix).",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Sinh lý phần phụ da (Nail Biology)",
      },
      {
        keyword: "Tốc độ mọc móng (~3mm/tháng ở tay)",
        detail: "Móng tay mọc trung bình 3mm/tháng, móng chân chậm hơn (~1mm/tháng) — cơ sở đánh giá thời gian phục hồi sau tổn thương hoặc sau khi tháo sơn gel/bột.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Sinh lý phần phụ da (Nail Biology)",
      },
      {
        keyword: "Tính thấm nước cao của bản móng",
        detail: "Bản móng hấp thụ và mất nước nhanh hơn nhiều so với da — lý giải vì sao móng dễ giòn, gãy khi tiếp xúc nước/hóa chất tẩy rửa liên tục mà không bảo vệ.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Sinh lý phần phụ da (Nail Biology)",
      },
    ],
  },
  {
    key: "oral",
    label: "Răng miệng",
    emoji: "🦷",
    concepts: [
      {
        keyword: "Chỉ số mài mòn ngà răng (RDA Index)",
        detail: "Thang đo mức độ mài mòn của chất đánh bóng trong kem đánh răng lên bề mặt ngà răng — RDA vượt ngưỡng 250 được xem là có nguy cơ gây hại men răng khi dùng lâu dài.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Chăm sóc răng miệng (Oral Care)",
      },
      {
        keyword: "Màng Pellicle & mảng bám (Biofilm)",
        detail: "Lớp màng protein nước bọt (pellicle) hình thành trên răng chỉ vài phút sau khi đánh răng, là nền tảng để vi khuẩn bám và tạo mảng bám (plaque biofilm) — mục tiêu chính của chất kháng khuẩn trong kem đánh răng.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Chăm sóc răng miệng (Oral Care)",
      },
      {
        keyword: "Cơ chế tái khoáng hóa của Fluoride",
        detail: "Ion Fluoride thúc đẩy tái khoáng hóa men răng bằng cách hình thành Fluorapatite — cấu trúc tinh thể bền với axit hơn nhiều so với Hydroxyapatite tự nhiên của men răng.",
        bookSlug: "barel-paye-maibach",
        reference: "Handbook of Cosmetic Science and Technology — Chăm sóc răng miệng (Oral Care)",
      },
    ],
  },
];

export const AUTHOR = {
  name: "Nguyễn Đức Duy Anh",
  phone: "+84 908 095 693",
  email: "anhpob@gmail.com",
  date: "September 2026",
  credit: "Concept, Content & Design by",
};
