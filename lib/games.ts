export interface GameMeta {
  slug: string;
  title: string;
  genre: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const GAMES: GameMeta[] = [
  {
    slug: "flashcard-safety",
    title: "Lật Thẻ An Toàn",
    genre: "Thẻ bài",
    description: "Vuốt Tinder-style qua 10 thành phần, đoán mức an toàn trước khi lật thẻ.",
    emoji: "🃏",
    gradient: "from-primary-400 to-primary-600",
  },
  {
    slug: "case-quiz",
    title: "Đố Vui Tình Huống",
    genre: "Trắc nghiệm",
    description: "5 câu hỏi tình huống tổng hợp da liễu, hóa keo và nhũ hóa.",
    emoji: "🧠",
    gradient: "from-accent-400 to-accent-600",
  },
  {
    slug: "match-up",
    title: "Ghép Cặp Thành Phần",
    genre: "Trí nhớ",
    description: "Lật ô tìm đúng cặp INCI ↔ chức năng hóa học trong thời gian ngắn nhất.",
    emoji: "🧩",
    gradient: "from-emerald-400 to-primary-600",
  },
  {
    slug: "sequence",
    title: "Sắp Xếp Quy Trình",
    genre: "Sắp xếp",
    description: "Kéo thả các bước sản xuất công thức mỹ phẩm về đúng thứ tự chuẩn.",
    emoji: "🔢",
    gradient: "from-purple-400 to-primary-600",
  },
  {
    slug: "true-false",
    title: "Đúng Hay Sai Tốc Độ",
    genre: "Phản xạ",
    description: "Trả lời càng nhanh càng nhiều điểm — mỗi câu chỉ có 6 giây!",
    emoji: "⚡",
    gradient: "from-amber-400 to-accent-600",
  },
  {
    slug: "spin-wheel",
    title: "Vòng Quay Tri Thức",
    genre: "May mắn",
    description: "Quay vòng ngẫu nhiên, khám phá một sự thật thú vị về mỹ phẩm.",
    emoji: "🎡",
    gradient: "from-rose-400 to-accent-500",
  },
  {
    slug: "sorting",
    title: "Phân Loại An Toàn",
    genre: "Phân loại",
    description: "Xếp nhanh từng thành phần vào đúng nhóm: An toàn / Thận trọng / Hạn chế.",
    emoji: "🗂️",
    gradient: "from-teal-400 to-primary-600",
  },
  {
    slug: "formulation-challenge",
    title: "Thử Thách Pha Chế",
    genre: "Mô phỏng",
    description: "60 giây chỉnh tỷ lệ 4 pha để đạt điểm ổn định cao nhất — ẵm trọn 3 sao!",
    emoji: "🧪",
    gradient: "from-primary-500 to-emerald-600",
  },
  {
    slug: "word-guess",
    title: "Đoán Từ INCI",
    genre: "Ô chữ",
    description: "Giải mã tên thành phần mỹ phẩm từng chữ cái — sai 6 lần là thua!",
    emoji: "🔤",
    gradient: "from-indigo-400 to-primary-600",
  },
  {
    slug: "glogau-speed",
    title: "Chẩn Đoán Tốc Độ",
    genre: "Tốc độ",
    description: "Đọc mô tả bệnh nhân, chọn đúng phân độ Glogau trước khi hết giờ.",
    emoji: "⏱️",
    gradient: "from-rose-500 to-primary-600",
  },
  {
    slug: "blitz-60",
    title: "Đấu Trường 60 Giây",
    genre: "Đấu trường",
    description: "Trộn lẫn mọi thể loại câu hỏi — trả lời càng nhiều càng ghi điểm cao.",
    emoji: "🏆",
    gradient: "from-accent-500 to-rose-600",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
