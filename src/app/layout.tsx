// app/layout.tsx
import { Roboto } from "next/font/google";
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

// 👉 Import font Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await fetchMenus();

  return (
    <html lang="vi" className={roboto.variable}>
      <Head />
      <body
        className={`base-load font-sans antialiased`}
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