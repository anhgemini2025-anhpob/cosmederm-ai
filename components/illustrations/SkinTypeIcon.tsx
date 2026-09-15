type SkinTypeKind = "dry" | "oily" | "sensitive" | "photoaging";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" role="img" aria-hidden>
      <defs>
        <linearGradient id="skinBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE8D2" />
          <stop offset="100%" stopColor="#FBCFA0" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="20" fill="url(#skinBase)" />
      {children}
    </svg>
  );
}

export default function SkinTypeIcon({ type }: { type: SkinTypeKind }) {
  if (type === "dry") {
    return (
      <Base>
        <path d="M20 20 L30 34 L22 40 L34 50" stroke="#C2410C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 16 L46 28" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="46" cy="40" r="3" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.5" />
        <circle cx="18" cy="46" r="2" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.5" />
      </Base>
    );
  }
  if (type === "oily") {
    return (
      <Base>
        <ellipse cx="26" cy="24" rx="7" ry="9" fill="#FEF9C3" opacity="0.9" />
        <ellipse cx="42" cy="38" rx="5" ry="7" fill="#FEF9C3" opacity="0.8" />
        <path d="M46 16 q3 5 0 10" stroke="#EAB308" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M20 42 q3 5 0 10" stroke="#EAB308" strokeWidth="2" fill="none" strokeLinecap="round" />
      </Base>
    );
  }
  if (type === "sensitive") {
    return (
      <Base>
        <circle cx="24" cy="26" r="7" fill="#FB7185" opacity="0.55" />
        <circle cx="42" cy="36" r="6" fill="#FB7185" opacity="0.5" />
        <circle cx="30" cy="44" r="4" fill="#FB7185" opacity="0.45" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${16 + i * 4} ${14 - i * 2} q2 -4 4 0`}
            stroke="#E11D48"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </Base>
    );
  }
  return (
    <Base>
      <circle cx="44" cy="18" r="6" fill="#FBBF24" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r2 = (n: number) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={r2(44 + Math.cos(a) * 9)}
            y1={r2(18 + Math.sin(a) * 9)}
            x2={r2(44 + Math.cos(a) * 13)}
            y2={r2(18 + Math.sin(a) * 13)}
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <path d="M14 40 q6 -6 12 0 t12 0" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M14 48 q6 -6 12 0 t12 0" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <circle cx="46" cy="46" r="4" fill="#78350F" opacity="0.7" />
    </Base>
  );
}
