export default function SkinCrossSection() {
  return (
    <svg viewBox="0 0 300 190" className="h-auto w-full" role="img" aria-label="Sơ đồ cắt lớp da">
      <defs>
        <linearGradient id="scDerm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* Hypodermis */}
      <rect x="0" y="140" width="300" height="50" fill="#FEF3C7" />
      {[20, 55, 90, 125, 160, 195, 230, 265].map((cx, i) => (
        <circle key={i} cx={cx} cy={160 + (i % 2) * 12} r="13" fill="#FDE68A" stroke="#FBBF24" strokeWidth="1" />
      ))}

      {/* Dermis */}
      <rect x="0" y="55" width="300" height="85" fill="url(#scDerm)" />
      <path d="M20 100 Q40 90 60 100 T100 100" stroke="#E11D48" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M180 120 Q200 112 220 120 T260 120" stroke="#E11D48" strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* sweat gland coil */}
      <path
        d="M240 70 q6 4 0 8 q-6 4 0 8 q6 4 0 8 q-6 4 0 8"
        stroke="#F43F5E"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Epidermis */}
      <path d="M0 55 Q75 45 150 55 T300 55 V25 H0 Z" fill="#FDBA74" />

      {/* Stratum corneum (wavy top) */}
      <path
        d="M0 25 Q20 18 40 25 T80 25 T120 25 T160 25 T200 25 T240 25 T280 25 T300 25 V15 Q280 10 260 15 T220 15 T180 15 T140 15 T100 15 T60 15 T20 15 T0 15 Z"
        fill="#FDE68A"
      />

      {/* Hair follicle */}
      <g>
        <path d="M95 15 L88 -10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M92 15 C85 45, 100 60, 96 85 C93 100, 105 108, 100 118"
          stroke="#92400E"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="99" cy="122" rx="7" ry="9" fill="#78350F" />
        {/* sebaceous gland */}
        <circle cx="112" cy="65" r="8" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
      </g>

      {/* layer labels */}
      <text x="8" y="12" fontSize="7" fontWeight="700" fill="#78350F" opacity="0.7">
        STRATUM CORNEUM
      </text>
      <text x="8" y="42" fontSize="7" fontWeight="700" fill="#7C2D12" opacity="0.7">
        EPIDERMIS
      </text>
      <text x="8" y="98" fontSize="7" fontWeight="700" fill="#881337" opacity="0.65">
        DERMIS
      </text>
      <text x="8" y="182" fontSize="7" fontWeight="700" fill="#92400E" opacity="0.7">
        HYPODERMIS
      </text>
    </svg>
  );
}
