"use client";

import { BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProgressHeader from "@/components/ui/ProgressHeader";
import LessonSection from "@/components/ui/LessonSection";
import LayeredDiagram from "@/components/LayeredDiagram";
import Accordion from "@/components/ui/Accordion";
import Quiz from "@/components/Quiz";
import SkinCrossSection from "@/components/illustrations/SkinCrossSection";
import HairCrossSection from "@/components/illustrations/HairCrossSection";
import StudentConceptSelector from "@/components/StudentConceptSelector";
import { useLessonProgress } from "@/components/useLessonProgress";
import { COLLOID_THEORY, GLOSSARY_TERMS, HAIR_LAYERS, SKIN_LAYERS } from "@/lib/content";

const LESSON_IDS = ["key-concepts", "skin-layers", "hair-structure", "colloid", "glossary", "quiz"];

export default function StudentPage() {
  const { completed, toggle, count, total } = useLessonProgress("student", LESSON_IDS);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Sinh viên chuyên ngành"
        subtitle="Cosmetic & Medical Student"
        backHref="/learn"
        icon={<BookOpen size={20} />}
      />

      <div className="px-5">
        <ProgressHeader count={count} total={total} />
      </div>

      <LessonSection
        number={1}
        title="Kiến thức trọng tâm: Da / Tóc / Móng"
        subtitle="Chọn lĩnh vực để xem keyword, framework và trích dẫn tài liệu tương ứng"
        done={completed.has("key-concepts")}
        onToggle={() => toggle("key-concepts")}
      >
        <StudentConceptSelector />
      </LessonSection>

      <LessonSection
        number={2}
        title="Mô hình cắt lớp da"
        subtitle="Chạm vào từng lớp để xem chi tiết · Nguồn: Baran & Maibach"
        done={completed.has("skin-layers")}
        onToggle={() => toggle("skin-layers")}
      >
        <LayeredDiagram layers={SKIN_LAYERS} caption="Ngoài cùng → trong cùng" illustration={<SkinCrossSection />} />
      </LessonSection>

      <LessonSection
        number={3}
        title="Cấu trúc sợi tóc"
        subtitle="Chạm vào từng lớp để xem chi tiết · Nguồn: Claude Bouillon — The Science of Hair Care"
        done={completed.has("hair-structure")}
        onToggle={() => toggle("hair-structure")}
      >
        <LayeredDiagram layers={HAIR_LAYERS} caption="Ngoài cùng → lõi trong" illustration={<HairCrossSection />} />
      </LessonSection>

      <LessonSection
        number={4}
        title="Lý thuyết hóa keo & Nhũ tương"
        subtitle="Nguồn: Takeo Mitsui — New Cosmetic Science"
        done={completed.has("colloid")}
        onToggle={() => toggle("colloid")}
      >
        <Accordion items={COLLOID_THEORY} />
      </LessonSection>

      <LessonSection
        number={5}
        title="Thuật ngữ chuyên ngành cần biết"
        subtitle="8 khái niệm nền tảng xuất hiện xuyên suốt tài liệu chuyên ngành"
        done={completed.has("glossary")}
        onToggle={() => toggle("glossary")}
      >
        <div className="flex flex-col gap-2.5">
          {GLOSSARY_TERMS.map((g) => (
            <div key={g.term} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-sm font-bold text-primary-700">{g.term}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{g.definition}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={6}
        title="Case Study Quiz"
        subtitle="Kiểm tra kiến thức tổng hợp qua các câu hỏi tình huống thực tế."
        done={completed.has("quiz")}
        onToggle={() => toggle("quiz")}
      >
        <Quiz />
      </LessonSection>
    </div>
  );
}
