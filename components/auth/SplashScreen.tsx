export default function SplashScreen() {
  return (
    <div
      role="status"
      aria-label="Đang tải"
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-700 via-primary-600 to-primary-500"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-192.png"
        alt=""
        width={84}
        height={84}
        className="h-[84px] w-[84px] animate-pulse rounded-[22px] shadow-card-lg ring-2 ring-white/30"
      />
    </div>
  );
}
