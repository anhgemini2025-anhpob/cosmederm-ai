function r2(n: number) {
  return Math.round(n * 100) / 100;
}

export default function HairCrossSection() {
  const melanin = [
    [0, -18], [14, -10], [-12, -8], [8, 6], [-16, 4], [2, 18], [16, 12], [-6, -20], [-20, 10], [10, -4],
  ];

  return (
    <svg viewBox="0 0 300 190" className="h-auto w-full" role="img" aria-label="Sơ đồ cắt lớp sợi tóc">
      <defs>
        <radialGradient id="hcCortex" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3D7D89" />
          <stop offset="100%" stopColor="#0F4C5C" />
        </radialGradient>
      </defs>

      {/* Cross-section (left) */}
      <g transform="translate(80 95)">
        <circle r="70" fill="#CFE3E6" stroke="#9FC7CD" strokeWidth="2" />
        <circle r="58" fill="url(#hcCortex)" />
        {melanin.map(([dx, dy], i) => (
          <circle key={i} cx={dx * 2.2} cy={dy * 2.2} r="4" fill="#092E38" opacity="0.55" />
        ))}
        <circle r="16" fill="none" stroke="#F8F9FA" strokeWidth="3" strokeDasharray="6 5" opacity="0.8" />
        {/* cuticle scale ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const x1 = r2(Math.cos(angle) * 62);
          const y1 = r2(Math.sin(angle) * 62);
          const x2 = r2(Math.cos(angle) * 70);
          const y2 = r2(Math.sin(angle) * 70);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6FAAB3" strokeWidth="2" />;
        })}
      </g>

      {/* Side view strand (right) */}
      <g transform="translate(190 30)">
        <path
          d="M0 0 C10 15, -8 30, 4 45 C14 58, -4 72, 6 85 C14 96, 0 108, 8 120"
          stroke="#CFE3E6"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 0 C10 15, -8 30, 4 45 C14 58, -4 72, 6 85 C14 96, 0 108, 8 120"
          stroke="#0F4C5C"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx={r2(4 + Math.sin(i) * 6)}
            cy={i * 13}
            r="1.6"
            fill="#092E38"
            opacity="0.6"
          />
        ))}
      </g>

      <text x="20" y="180" fontSize="8" fontWeight="700" fill="#0F4C5C" opacity="0.7">
        Mặt cắt ngang
      </text>
      <text x="170" y="180" fontSize="8" fontWeight="700" fill="#0F4C5C" opacity="0.7">
        Mặt cắt dọc
      </text>
    </svg>
  );
}
