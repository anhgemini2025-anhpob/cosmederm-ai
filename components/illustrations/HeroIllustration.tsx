export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label="Minh họa lọ serum và phân tử mỹ phẩm"
    >
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3D7D89" />
          <stop offset="100%" stopColor="#092E38" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB8B24" />
          <stop offset="100%" stopColor="#E36414" />
        </linearGradient>
        <radialGradient id="blobTeal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F4C5C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0F4C5C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blobCoral" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB8B24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FB8B24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="90" cy="80" r="90" fill="url(#blobTeal)" />
      <circle cx="240" cy="160" r="80" fill="url(#blobCoral)" />

      <g opacity="0.55">
        <circle cx="60" cy="60" r="6" fill="#FB8B24" />
        <circle cx="255" cy="55" r="4" fill="#0F4C5C" />
        <circle cx="270" cy="190" r="7" fill="#3D7D89" />
        <circle cx="45" cy="185" r="5" fill="#E36414" />
        <line x1="60" y1="60" x2="90" y2="90" stroke="#FB8B24" strokeWidth="1.5" />
        <line x1="255" y1="55" x2="220" y2="90" stroke="#0F4C5C" strokeWidth="1.5" />
      </g>

      <g transform="translate(112 55)">
        <rect x="0" y="34" width="96" height="130" rx="20" fill="url(#bottleGrad)" />
        <rect x="10" y="46" width="76" height="106" rx="12" fill="#ffffff" fillOpacity="0.12" />
        <rect x="28" y="0" width="40" height="38" rx="8" fill="url(#capGrad)" />
        <rect x="40" y="-14" width="16" height="20" rx="6" fill="#FBB25F" />
        <rect x="18" y="90" width="60" height="10" rx="5" fill="#ffffff" fillOpacity="0.5" />
        <rect x="18" y="108" width="40" height="8" rx="4" fill="#ffffff" fillOpacity="0.3" />
      </g>

      <g opacity="0.8">
        <path
          d="M182 40c8 8 8 18 0 26-8-8-8-18 0-26Z"
          fill="#FBB25F"
          transform="translate(20 4) rotate(20 182 53)"
        />
      </g>

      <g fill="#0F4C5C" opacity="0.3">
        <circle cx="150" cy="210" r="2.5" />
        <circle cx="165" cy="216" r="2" />
        <circle cx="180" cy="208" r="1.5" />
      </g>
    </svg>
  );
}
