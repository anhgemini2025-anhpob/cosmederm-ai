import { AlertTriangle } from "lucide-react";

export default function Disclaimer({ text }: { text: string }) {
  return (
    <div className="flex gap-2.5 rounded-2xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
      <p>{text}</p>
    </div>
  );
}
