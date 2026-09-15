"use client";

import Link from "next/link";
import { ClipboardCheck, FlaskConical } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProgressHeader from "@/components/ui/ProgressHeader";
import LessonSection from "@/components/ui/LessonSection";
import Accordion from "@/components/ui/Accordion";
import CategoryPlaybook from "@/components/CategoryPlaybook";
import ProductConceptLab from "@/components/ProductConceptLab";
import ExternalTools from "@/components/ExternalTools";
import { useLessonProgress } from "@/components/useLessonProgress";
import { FORMULATION_LAUNCH_CHECKLIST, REGULATORY_TOPICS } from "@/lib/content";

const LESSON_IDS = ["tools", "concept-lab", "regulatory", "playbook", "checklist", "suppliers"];

export default function ProfessionalPage() {
  const { completed, toggle, count, total } = useLessonProgress("professional", LESSON_IDS);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Chuyên gia"
        subtitle="R&D Formulator & B2B Sales"
        backHref="/learn"
        icon={<ClipboardCheck size={20} />}
      />

      <div className="px-5">
        <ProgressHeader count={count} total={total} />
      </div>

      <LessonSection
        number={1}
        title="Công cụ chuyên sâu"
        subtitle="Phòng lab tạo công thức ảo cho vai trò chuyên gia"
        done={completed.has("tools")}
        onToggle={() => toggle("tools")}
      >
        <div className="flex flex-col gap-3">
          <Link
            href="/lab"
            className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 p-4 text-white shadow-card-lg active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <FlaskConical size={22} />
            </div>
            <div>
              <p className="font-bold">Virtual Formulation Lab</p>
              <p className="text-xs text-white/80">Thiết kế công thức, kiểm tra tỷ lệ nhũ hóa chuẩn Nhật Bản</p>
            </div>
          </Link>
        </div>
      </LessonSection>

      <LessonSection
        number={2}
        title="Ý tưởng phát triển sản phẩm mới"
        subtitle="Chọn & phối hợp cơ chế (Da/Tóc) để tạo concept — tổng hợp từ ALGAKTIV, LANXESS, Lipoid, Vanderbilt và 10 giáo trình"
        done={completed.has("concept-lab")}
        onToggle={() => toggle("concept-lab")}
      >
        <ProductConceptLab />
      </LessonSection>

      <LessonSection
        number={3}
        title="Quy chuẩn pháp lý toàn cầu"
        subtitle="Nguồn: Barel, Paye & Maibach — Handbook of Cosmetic Science and Technology"
        done={completed.has("regulatory")}
        onToggle={() => toggle("regulatory")}
      >
        <Accordion items={REGULATORY_TOPICS} />
      </LessonSection>

      <LessonSection
        number={4}
        title="Playbook theo dòng sản phẩm"
        subtitle="Keyword & framework cần nắm cho từng nhóm sản phẩm cụ thể"
        done={completed.has("playbook")}
        onToggle={() => toggle("playbook")}
      >
        <CategoryPlaybook />
      </LessonSection>

      <LessonSection
        number={5}
        title="Checklist trước khi thương mại hóa"
        subtitle="5 bước bắt buộc trước khi đưa công thức ra thị trường"
        done={completed.has("checklist")}
        onToggle={() => toggle("checklist")}
      >
        <div className="flex flex-col gap-2.5">
          {FORMULATION_LAUNCH_CHECKLIST.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-sm font-bold text-primary-700">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={6}
        title="Công cụ chọn nguyên liệu thực tế"
        subtitle="Tra cứu chuyên sâu theo từng dòng nguyên liệu thương mại từ các nhà cung cấp."
        done={completed.has("suppliers")}
        onToggle={() => toggle("suppliers")}
      >
        <ExternalTools />
      </LessonSection>
    </div>
  );
}
