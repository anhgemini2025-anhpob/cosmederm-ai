export interface Concern {
  key: string;
  label: string;
  steps: { label: string; actives: string[] }[];
  commercialTip?: string;
}

export interface RoutineCategory {
  key: "skin" | "hair" | "nail" | "oral" | "deo";
  label: string;
  emoji: string;
  concerns: Concern[];
}

export const MAX_CONCERNS = 2;

export const ROUTINE_CATEGORIES: RoutineCategory[] = [
  {
    key: "skin",
    label: "Da",
    emoji: "🧴",
    concerns: [
      {
        key: "acne",
        label: "Da mụn",
        steps: [
          { label: "Sáng: Làm sạch + Kiểm soát dầu", actives: ["Niacinamide (Vitamin B3)"] },
          { label: "Tối: Đặc trị mụn", actives: ["Salicylic Acid", "Azelaic Acid"] },
        ],
        commercialTip:
          "Sản phẩm phổ biến tại Việt Nam có các hoạt chất này: La Roche-Posay Effaclar Duo+ (Niacinamide, LHA), Paula's Choice 2% BHA Liquid (Salicylic Acid), COSRX Salicylic Acid Daily Gentle Cleanser. Nên bắt đầu nồng độ thấp và tăng dần.",
      },
      {
        key: "pigmentation",
        label: "Nám / Tăng sắc tố",
        steps: [
          { label: "Sáng: Chống oxy hóa + Sáng da", actives: ["L-Ascorbic Acid (Vitamin C)", "Alpha-Arbutin"] },
          { label: "Tối: Đặc trị sắc tố", actives: ["Tranexamic Acid", "Kojic Acid"] },
        ],
        commercialTip:
          "Ví dụ sản phẩm phân phối chính hãng tại VN: La Roche-Posay Pure Vitamin C10, The Ordinary Alpha Arbutin 2% + HA, Some By Mi Galactomyces Pure Vitamin C Glow Serum. Nám sâu (melasma) nên kết hợp bác sĩ da liễu, không chỉ dùng mỹ phẩm.",
      },
      {
        key: "aging",
        label: "Lão hóa / Nếp nhăn",
        steps: [
          { label: "Sáng: Chống oxy hóa", actives: ["L-Ascorbic Acid (Vitamin C)"] },
          { label: "Tối: Đặc trị chống lão hóa", actives: ["Retinol", "Adenosine"] },
        ],
        commercialTip:
          "Ví dụ tại VN: Obagi Elastiderm, La Roche-Posay Retinol B3 Serum, The Ordinary Granactive Retinoid 2% in Squalane. Retinol nên dùng buổi tối, bắt đầu 2-3 lần/tuần và luôn chống nắng ban ngày.",
      },
      {
        key: "dryness",
        label: "Khô ráp / Mất nước",
        steps: [
          { label: "Sáng: Cấp ẩm", actives: ["Sodium Hyaluronate", "Panthenol (Pro-Vitamin B5)"] },
          { label: "Tối: Phục hồi hàng rào da", actives: ["Ceramide NP", "Squalane"] },
        ],
        commercialTip:
          "Ví dụ tại VN: CeraVe Moisturizing Cream (Ceramide), La Roche-Posay Hyalu B5 Serum, Laneige Water Bank Cream — đều là các dòng phổ biến tại nhà thuốc/siêu thị mỹ phẩm Việt Nam.",
      },
      {
        key: "oily",
        label: "Dầu thừa / Lỗ chân lông to",
        steps: [
          { label: "Sáng: Kiểm soát dầu", actives: ["Niacinamide (Vitamin B3)"] },
          { label: "Tối: Làm sạch sâu lỗ chân lông", actives: ["Salicylic Acid"] },
        ],
        commercialTip:
          "Ví dụ tại VN: The Ordinary Niacinamide 10% + Zinc 1%, Some By Mi AHA-BHA-PHA 30 Days Miracle Toner, Simple Pore Refining Toner.",
      },
      {
        key: "sensitive",
        label: "Nhạy cảm / Dễ kích ứng",
        steps: [
          {
            label: "Sáng & Tối: Làm dịu, phục hồi",
            actives: ["Centella Asiatica Extract (Rau má)", "Bisabolol (Alpha-Bisabolol)", "Allantoin"],
          },
        ],
        commercialTip:
          "Ví dụ tại VN: La Roche-Posay Cicaplast Baume B5, Dr. Jart+ Cicapair, COSRX Centella Blemish Cream — nên chọn công thức 'fragrance-free' để giảm nguy cơ kích ứng thêm.",
      },
    ],
  },
  {
    key: "hair",
    label: "Tóc",
    emoji: "💇",
    concerns: [
      {
        key: "oily-scalp",
        label: "Da đầu dầu, bết nhanh",
        steps: [
          { label: "Dầu gội: Kiểm soát dầu, làm sạch sâu", actives: ["Niacinamide (Vitamin B3)", "Salicylic Acid"] },
          { label: "Tần suất: Gội cách ngày, tránh xả sát da đầu", actives: [] },
        ],
        commercialTip:
          "Ví dụ tại VN: Head & Shoulders Anti-Hairfall, Nizoral (chứa Ketoconazole, dùng khi có nấm/gàu kèm dầu), Klorane Dầu gội với Cây Tầm Ma (Nettle).",
      },
      {
        key: "damaged",
        label: "Tóc khô, xơ, hư tổn",
        steps: [
          { label: "Dầu xả / Mặt nạ: Phục hồi cấu trúc", actives: ["Hydrolyzed Keratin", "Panthenol (Pro-Vitamin B5)"] },
          { label: "Bổ sung: Dầu dưỡng cuối ngọn tóc", actives: ["Squalane"] },
        ],
        commercialTip:
          "Ví dụ tại VN: L'Oréal Professionnel Absolut Repair, Kérastase Nutritive, Pantene Pro-V 3 Minute Miracle — các dòng phục hồi keratin phổ biến tại salon và siêu thị.",
      },
      {
        key: "dandruff",
        label: "Gàu, ngứa da đầu",
        steps: [
          { label: "Dầu gội: Kháng nấm, làm dịu da đầu", actives: ["Bisabolol (Alpha-Bisabolol)"] },
          { label: "Tránh: Sulfate mạnh và hương liệu nồng độ cao", actives: [] },
        ],
        commercialTip:
          "Ví dụ tại VN: Nizoral (Ketoconazole 2%, bán tại nhà thuốc), Head & Shoulders (Zinc Pyrithione), Selsun (Selenium Sulfide) — dùng đúng hướng dẫn tần suất trên bao bì.",
      },
      {
        key: "colored",
        label: "Tóc đã nhuộm / uốn",
        steps: [
          { label: "Dầu gội: Không Sulfate, bảo vệ màu", actives: ["Hydrolyzed Keratin"] },
          { label: "Dầu xả: Khóa biểu bì, chống trôi màu", actives: ["Panthenol (Pro-Vitamin B5)"] },
        ],
        commercialTip:
          "Ví dụ tại VN: L'Oréal Professionnel Serie Expert Vitamino Color, Schwarzkopf BC Color Freeze — dòng 'sulfate-free' giúp giữ màu nhuộm lâu hơn.",
      },
    ],
  },
  {
    key: "nail",
    label: "Móng",
    emoji: "💅",
    concerns: [
      {
        key: "brittle",
        label: "Móng yếu, dễ gãy",
        steps: [
          { label: "Dưỡng chất: Dưỡng móng và biểu bì hằng ngày", actives: ["Panthenol (Pro-Vitamin B5)"] },
          { label: "Bảo vệ: Đeo găng tay khi tiếp xúc nước/hóa chất", actives: [] },
        ],
        commercialTip: "Ví dụ tại VN: OPI Nail Envy, Essie Nail Care — dòng dưỡng móng phổ biến tại các cửa hàng mỹ phẩm và salon nail.",
      },
      {
        key: "post-gel",
        label: "Móng yếu sau khi sơn Gel/Bột",
        steps: [
          { label: "Phục hồi: Nghỉ sơn ít nhất 1-2 tuần, dùng dưỡng chất Base Coat", actives: [] },
          { label: "Dưỡng ẩm: Dầu dưỡng biểu bì mỗi tối", actives: ["Squalane"] },
        ],
        commercialTip: "Ví dụ tại VN: CND SolarOil, OPI Avoplex Cuticle Oil — dùng đều đặn để giảm khô nứt biểu bì sau khi tháo Gel/Bột.",
      },
    ],
  },
  {
    key: "oral",
    label: "Răng miệng",
    emoji: "🦷",
    concerns: [
      {
        key: "whitening",
        label: "Ố vàng, cần làm trắng",
        steps: [
          { label: "Sáng & Tối: Kem đánh răng làm trắng (RDA vừa phải)", actives: [] },
          { label: "Lưu ý: Hạn chế trà/cà phê/thuốc lá gây ố màu", actives: [] },
        ],
        commercialTip: "Ví dụ tại VN: Colgate Optic White, Sensodyne True White — nên chọn loại RDA vừa phải để tránh mòn men răng khi dùng lâu dài.",
      },
      {
        key: "sensitive-teeth",
        label: "Ê buốt răng",
        steps: [
          { label: "Sáng & Tối: Kem đánh răng chứa Potassium Nitrate", actives: [] },
          { label: "Tránh: Bàn chải lông cứng, chải quá mạnh tay", actives: [] },
        ],
        commercialTip: "Ví dụ tại VN: Sensodyne (Potassium Nitrate/Stannous Fluoride), Colgate Sensitive Pro-Relief — cần dùng liên tục vài tuần mới thấy hiệu quả rõ.",
      },
      {
        key: "bad-breath",
        label: "Hôi miệng",
        steps: [
          { label: "Sáng & Tối: Nước súc miệng kháng khuẩn", actives: [] },
          { label: "Bổ sung: Làm sạch lưỡi mỗi ngày", actives: [] },
        ],
        commercialTip: "Ví dụ tại VN: Listerine Cool Mint, Colgate Plax — nước súc miệng chứa Cetylpyridinium Chloride/tinh dầu giúp giảm vi khuẩn gây mùi.",
      },
    ],
  },
  {
    key: "deo",
    label: "Khử mùi",
    emoji: "🧼",
    concerns: [
      {
        key: "odor",
        label: "Mùi cơ thể",
        steps: [
          { label: "Sáng: Sản phẩm khử mùi kháng khuẩn", actives: ["Ethylhexylglycerin"] },
          { label: "Lưu ý: Thoa lên da sạch, khô hoàn toàn", actives: [] },
        ],
        commercialTip: "Ví dụ tại VN: Nivea Men Deep, Dove 0% Aluminum, Rexona — dòng khử mùi (deodorant) phổ biến tại siêu thị.",
      },
      {
        key: "sweat",
        label: "Đổ mồ hôi nhiều",
        steps: [
          { label: "Tối: Sản phẩm chống mồ hôi (Antiperspirant), thoa trước khi ngủ", actives: [] },
          { label: "Lưu ý: Hiệu quả rõ nhất khi da khô ráo lúc thoa", actives: [] },
        ],
        commercialTip:
          "Ví dụ tại VN: Rexona Antiperspirant, Nivea Dry Impact (chứa Aluminum Chloride/muối nhôm) — khác với deodorant thường ở khả năng giảm tiết mồ hôi.",
      },
    ],
  },
];
