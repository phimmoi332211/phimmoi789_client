// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./globals.css";

import HeaderPage from "@/component/header/Header";
import FooterPage from "@/component/footer/Footer";
import AppProviders from "@/component/Providers/AppProviders";
import HeaderMobileSimple from "@/component/header/HeaderMobile";
import Head from "./head";
import { fetchMenus } from "@/help/helper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await fetchMenus();

  return (
    <html lang="vi">
      <Head />
      <body
        className={`base-load ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <HeaderPage menuList={menuData} />
          <HeaderMobileSimple menuList={menuData} />
          <div className="container">{children}</div>
          <FooterPage /> 
        </AppProviders>
      </body>
    </html>
  );
}
