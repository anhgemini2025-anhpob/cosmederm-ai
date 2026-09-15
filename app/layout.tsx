import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import TopNav, { TOP_NAV_HEIGHT } from "@/components/ui/TopNav";
import Watermark from "@/components/Watermark";
import CopyProtection from "@/components/CopyProtection";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CosmeDerm AI Academy",
  description:
    "Ứng dụng học tập da liễu thẩm mỹ và khoa học mỹ phẩm — tra cứu thành phần, phòng lab công thức ảo và phác đồ điều trị, tích hợp tri thức từ 10 cuốn sách nền tảng.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CosmeDerm",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A3161",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-soft font-sans text-slate-800 antialiased">
        <CopyProtection />
        <TopNav />
        <div
          className="mx-auto min-h-screen max-w-2xl bg-soft pb-10 lg:max-w-5xl xl:max-w-6xl"
          style={{ paddingTop: TOP_NAV_HEIGHT }}
        >
          {children}
        </div>
        <Watermark />
      </body>
    </html>
  );
}
