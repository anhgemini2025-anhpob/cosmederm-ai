import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import AuthGate from "@/components/AuthGate";
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
    "Ứng dụng học tập da liễu thẩm mỹ và khoa học mỹ phẩm — tra cứu thành phần, phòng lab công thức ảo và routine chăm sóc cá nhân hóa, tích hợp tri thức từ 10 cuốn sách nền tảng.",
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
        <AuthGate>{children}</AuthGate>
        <Watermark />
      </body>
    </html>
  );
}
