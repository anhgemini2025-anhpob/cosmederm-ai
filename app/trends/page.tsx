import { TrendingUp } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrendsExplorer from "@/components/TrendsExplorer";

export default function TrendsPage() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Xu hướng & Ý tưởng phát triển"
        subtitle="Cập nhật xu hướng toàn cầu — Châu Âu, Mỹ, Nhật, Hàn, Việt Nam"
        backHref="/"
        icon={<TrendingUp size={20} />}
      />
      <section className="px-5">
        <TrendsExplorer />
      </section>
    </div>
  );
}
