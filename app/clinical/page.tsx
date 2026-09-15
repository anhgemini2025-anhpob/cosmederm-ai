import { Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import RoutineBuilder from "@/components/RoutineBuilder";

export default function RoutinePage() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Routine cá nhân hóa"
        subtitle="Da, tóc, móng, răng miệng & khử mùi — theo đúng mối quan tâm của bạn"
        backHref="/"
        icon={<Sparkles size={20} />}
      />
      <section className="px-5">
        <Disclaimer text="Gợi ý mang tính giáo dục, xây dựng từ dữ liệu an toàn CIR — không thay thế tư vấn của bác sĩ da liễu, đặc biệt với tình trạng da nghiêm trọng hoặc kéo dài." />
      </section>
      <section className="px-5">
        <RoutineBuilder />
      </section>
    </div>
  );
}
