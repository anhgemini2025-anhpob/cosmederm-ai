import { FlaskConical } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import FormulationCalculator from "@/components/FormulationCalculator";
import SampleFormulations from "@/components/SampleFormulations";
import FormulationCatalog from "@/components/FormulationCatalog";
import ExternalTools from "@/components/ExternalTools";

export default function LabPage() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Virtual Formulation Lab"
        subtitle="Phòng lab tạo công thức ảo"
        backHref="/"
        icon={<FlaskConical size={20} />}
      />

      <section className="px-5">
        <Disclaimer text="Công cụ mô phỏng mang tính giáo dục dựa trên nguyên tắc nhũ hóa Iwata & Shimada. Công thức thực tế cần được kiểm nghiệm độ ổn định, vi sinh và tương thích bao bì tại phòng lab trước khi thương mại hóa." />
      </section>

      <section className="px-5">
        <h2 className="mb-1 text-base font-bold text-primary-700">Bộ tính toán công thức</h2>
        <p className="mb-4 text-xs text-slate-500">
          Điều chỉnh % từng pha — hệ thống tự kiểm tra tổng và cảnh báo nguy cơ tách pha.
        </p>
        <FormulationCalculator />
      </section>

      <section className="px-5">
        <h2 className="mb-1 text-base font-bold text-primary-700">Công thức mẫu tham khảo</h2>
        <p className="mb-4 text-xs text-slate-500">Nguồn: Iwata & Shimada · Takeo Mitsui · Claude Bouillon</p>
        <SampleFormulations />
      </section>

      <section className="px-5">
        <h2 className="mb-1 text-base font-bold text-primary-700">Danh mục công thức tham khảo</h2>
        <p className="mb-4 text-xs text-slate-500">
          Tra cứu tên hàng trăm công thức thực tế theo nhóm sản phẩm, chọn vào giỏ và gửi yêu cầu nhận chi tiết.
        </p>
        <FormulationCatalog />
      </section>

      <section className="px-5">
        <h2 className="mb-1 text-base font-bold text-primary-700">Chọn nguyên liệu thật</h2>
        <p className="mb-4 text-xs text-slate-500">
          Đối chiếu với danh mục nguyên liệu thương mại thực tế từ các nhà cung cấp.
        </p>
        <ExternalTools compact />
      </section>
    </div>
  );
}
