type HairTypeKind = "oily-scalp" | "dry-damaged" | "dandruff" | "chemically-treated";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" role="img" aria-hidden>
      <defs>
        <linearGradient id="hairBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CFE3E6" />
          <stop offset="100%" stopColor="#9FC7CD" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="20" fill="url(#hairBase)" />
      {children}
    </svg>
  );
}

export default function HairTypeIcon({ type }: { type: HairTypeKind }) {
  if (type === "oily-scalp") {
    return (
      <Base>
        <path d="M20 44 Q22 24 32 20 Q42 24 44 44" stroke="#092E38" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="26" cy="28" rx="4" ry="5" fill="#FEF9C3" opacity="0.9" />
        <path d="M40 16 q3 5 0 10" stroke="#EAB308" strokeWidth="2" fill="none" strokeLinecap="round" />
      </Base>
    );
  }
  if (type === "dry-damaged") {
    return (
      <Base>
        <path d="M22 42 L26 26 L22 20" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 44 L34 24 L30 18" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 42 L40 26 L44 20" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="20" r="1.8" fill="#B45309" />
        <circle cx="30" cy="18" r="1.8" fill="#B45309" />
        <circle cx="44" cy="20" r="1.8" fill="#B45309" />
      </Base>
    );
  }
  if (type === "dandruff") {
    return (
      <Base>
        <path d="M18 30 Q32 20 46 30" stroke="#092E38" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="42" r="2" fill="#F8F9FA" stroke="#9FC7CD" strokeWidth="1" />
        <circle cx="32" cy="46" r="2.2" fill="#F8F9FA" stroke="#9FC7CD" strokeWidth="1" />
        <circle cx="40" cy="41" r="1.8" fill="#F8F9FA" stroke="#9FC7CD" strokeWidth="1" />
        <circle cx="36" cy="34" r="2" fill="#F8F9FA" stroke="#9FC7CD" strokeWidth="1" />
      </Base>
    );
  }
  return (
    <Base>
      <path d="M20 44 Q22 22 32 18 Q42 22 44 44" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M24 40 Q32 34 40 40" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    </Base>
  );
}
