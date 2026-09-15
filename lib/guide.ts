export interface GuideSection {
  emoji: string;
  title: string;
  what: string;
  steps: string[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    emoji: "🎓",
    title: "Lộ trình học tập",
    what: "3 con đường học riêng cho Người mới bắt đầu, Sinh viên chuyên ngành và Chuyên gia — chọn đúng vai trò của bạn để thấy nội dung phù hợp nhất.",
    steps: [
      "Bấm tab \"Lộ trình\" trên thanh menu.",
      "Chọn 1 trong 3 vai trò phù hợp với bạn nhất.",
      "Học từng bài theo thứ tự, bấm \"Đánh dấu đã học xong\" sau mỗi bài để lưu tiến độ.",
      "Có thể quay lại bất cứ lúc nào — tiến độ được lưu tự động trên máy của bạn.",
    ],
  },
  {
    emoji: "🧪",
    title: "Lab Ảo",
    what: "Nơi thử nghiệm công thức mỹ phẩm ảo — tính tỷ lệ pha, xem công thức mẫu và tra cứu hàng trăm công thức tham khảo thật.",
    steps: [
      "Vào tab \"Lab Ảo\".",
      "Dùng \"Bộ tính toán công thức\" để tự điều chỉnh % từng pha (Dầu/Nước/Chất nhũ hóa/Hoạt chất) — hệ thống tự cảnh báo nếu công thức chưa ổn định.",
      "Xem \"Công thức mẫu tham khảo\" để hiểu cách một công thức hoàn chỉnh được trình bày.",
      "Vào \"Danh mục công thức tham khảo\", chọn nhóm sản phẩm bạn quan tâm, bấm dấu + để thêm vào giỏ, rồi gửi yêu cầu nhận chi tiết qua Zalo.",
    ],
  },
  {
    emoji: "🔍",
    title: "Tra cứu thành phần (Smart Ingredient Checker)",
    what: "Kiểm tra một thành phần mỹ phẩm có an toàn không, dùng ở nồng độ bao nhiêu — theo dữ liệu CIR chuẩn quốc tế.",
    steps: [
      "Vào tab \"Tra cứu\".",
      "Cách 1 — Tìm kiếm: gõ tên thành phần (tiếng Anh, ví dụ \"Niacinamide\") vào ô tìm kiếm.",
      "Cách 2 — Chụp ảnh: bấm \"Chụp ảnh\", chụp bảng thành phần trên bao bì, hệ thống tự đọc và đối chiếu.",
      "Nếu có thành phần chưa nhận diện được, bấm \"Sao chép câu lệnh\", dán vào ChatGPT/Claude/Gemini kèm ảnh, rồi dán câu trả lời ngược lại để hệ thống tổng hợp thành báo cáo PDF.",
    ],
  },
  {
    emoji: "✨",
    title: "Routine cá nhân hóa",
    what: "Gợi ý các bước chăm sóc Da/Tóc/Móng/Răng miệng/Khử mùi theo đúng vấn đề bạn đang gặp.",
    steps: [
      "Vào tab \"Routine\".",
      "Chọn 1 lĩnh vực bạn quan tâm (Da, Tóc, Móng, Răng miệng hoặc Khử mùi).",
      "Chọn tối đa 2 vấn đề cụ thể (ví dụ: \"Da mụn\" + \"Lão hóa\").",
      "Xem gợi ý các bước routine, hoạt chất nên dùng và một số sản phẩm thương mại ví dụ đang bán tại Việt Nam.",
    ],
  },
  {
    emoji: "📈",
    title: "Xu hướng & Ý tưởng phát triển",
    what: "Cập nhật xu hướng mỹ phẩm thế giới và Việt Nam, case study sản phẩm thành công, cùng quy định cần biết nếu muốn xuất khẩu.",
    steps: [
      "Vào tab \"Xu hướng\".",
      "Xem mục \"Xu hướng\" để biết thị trường đang quan tâm điều gì theo từng khu vực.",
      "Xem mục \"Case study\" để học từ các sản phẩm đã thành công thực tế.",
      "Xem mục \"Xuất khẩu\" nếu bạn định đưa sản phẩm ra thị trường nước ngoài — có đủ quy định theo từng nước.",
    ],
  },
  {
    emoji: "🎮",
    title: "Trò chơi kiến thức",
    what: "Ôn lại kiến thức đã học qua các trò chơi ngắn, nhẹ nhàng, không cần đọc nhiều chữ.",
    steps: [
      "Vào tab \"Trò chơi\".",
      "Chọn 1 trò chơi bất kỳ — mỗi trò chỉ mất 1-3 phút.",
      "Chơi lại nhiều lần để ghi nhớ tốt hơn, mỗi lần thứ tự câu hỏi/thẻ bài sẽ khác nhau.",
    ],
  },
  {
    emoji: "📚",
    title: "Phụ lục: Thư viện tri thức",
    what: "Danh sách 10 cuốn sách nền tảng dùng để xây dựng toàn bộ nội dung trong app — có thể yêu cầu nhận tài liệu.",
    steps: [
      "Vào \"Lộ trình\" → bấm thẻ \"Phụ lục: Thư viện tri thức\".",
      "Bấm vào tên sách để xem tóm tắt nội dung và mục lục tham khảo.",
      "Bấm dấu + trên các cuốn bạn muốn nhận, rồi bấm \"Xem yêu cầu\" ở góc dưới màn hình.",
      "Gửi yêu cầu qua Zalo — chỉ cần gửi 1 lần cho tất cả sách đã chọn.",
    ],
  },
];
