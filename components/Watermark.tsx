import { AUTHOR } from "@/lib/content";

export default function Watermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-3 -z-10 flex select-none justify-center safe-bottom"
    >
      <span className="rounded-full bg-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-900/25 backdrop-blur-sm">
        © {AUTHOR.name}
      </span>
    </div>
  );
}
