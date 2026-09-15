"use client";

import { Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProgressHeader from "@/components/ui/ProgressHeader";
import LessonSection from "@/components/ui/LessonSection";
import Flashcard from "@/components/Flashcard";
import ExpandableTraitCard from "@/components/ExpandableTraitCard";
import SkinTypeIcon from "@/components/illustrations/SkinTypeIcon";
import HairTypeIcon from "@/components/illustrations/HairTypeIcon";
import { useLessonProgress } from "@/components/useLessonProgress";
import { BASIC_ROUTINE_STEPS, HAIR_TYPES, INCI_READING_STEPS, SKIN_TYPES } from "@/lib/content";

const LESSON_IDS = ["skin-type", "hair-type", "inci-reading", "routine", "flashcard"];

export default function BeginnerPage() {
  const { completed, toggle, count, total } = useLessonProgress("beginner", LESSON_IDS);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Người mới bắt đầu"
        subtitle="Consumer & Skincare Enthusiast"
        backHref="/learn"
        icon={<Sparkles size={20} />}
      />

      <div className="px-5">
        <ProgressHeader count={count} total={total} />
      </div>

      <LessonSection
        number={1}
        title="Nhận biết loại da của bạn"
        subtitle="Nguồn: Burgess & Draelos — Cosmetic Dermatology: Products and Procedures"
        done={completed.has("skin-type")}
        onToggle={() => toggle("skin-type")}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {SKIN_TYPES.map((skin) => (
            <ExpandableTraitCard
              key={skin.name}
              icon={<SkinTypeIcon type={skin.kind} />}
              name={skin.name}
              traits={skin.traits}
              tip={skin.tip}
              detail={skin.detail}
            />
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={2}
        title="Nhận biết loại tóc & da đầu"
        subtitle="Nguồn: Claude Bouillon — The Science of Hair Care"
        done={completed.has("hair-type")}
        onToggle={() => toggle("hair-type")}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {HAIR_TYPES.map((hair) => (
            <ExpandableTraitCard
              key={hair.name}
              icon={<HairTypeIcon type={hair.kind} />}
              name={hair.name}
              traits={hair.traits}
              tip={hair.tip}
              detail={hair.detail}
            />
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={3}
        title="Cách đọc bảng thành phần INCI"
        subtitle="5 nguyên tắc thực tế giúp bạn tự tin đọc nhãn mỹ phẩm bất kỳ"
        done={completed.has("inci-reading")}
        onToggle={() => toggle("inci-reading")}
      >
        <div className="flex flex-col gap-2.5">
          {INCI_READING_STEPS.map((step) => (
            <div key={step.title} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-sm font-bold text-primary-700">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.detail}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={4}
        title="Routine chăm sóc da cơ bản"
        subtitle="3 bước nền tảng, áp dụng được ngay hôm nay"
        done={completed.has("routine")}
        onToggle={() => toggle("routine")}
      >
        <div className="flex flex-col gap-2.5">
          {BASIC_ROUTINE_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-500">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-primary-700">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection
        number={5}
        title="Thẻ ghi nhớ: An toàn thành phần"
        subtitle="Vuốt hoặc bấm nút để kiểm tra nhanh kiến thức về mức độ an toàn của thành phần mỹ phẩm."
        done={completed.has("flashcard")}
        onToggle={() => toggle("flashcard")}
      >
        <Flashcard />
      </LessonSection>
    </div>
  );
}
