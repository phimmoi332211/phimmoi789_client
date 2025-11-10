"use client";

import Image from "next/image";
import Link from "next/link";

export default function FooterPage() {
  return (
    <footer className="w-full bg-[#2c2c2c] text-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center justify-center md:justify-start">
              <Link href="/" className="footer-logo">
                <Image
                  src="/logo.webp"
                  alt="PHIMMOI789 Logo"
                  width={120}
                  height={64}
                  className="object-contain"
                />
              </Link>
            </div>

            <nav className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-gray-300 mt-3 md:mt-0">
              <Link href="/intro" className="hover:text-white transition">
                Giới thiệu
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Điều khoản
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Bảo mật
              </Link>
              <Link href="/contact" className="hover:text-white transition">
                Liên hệ
              </Link>
              <a
                href="https://hotro.tv360.vn/index.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                Hướng dẫn
              </a>
            </nav>
          </div>

          <div className="text-gray-300 text-sm leading-relaxed space-y-2 text-left">
            <p>
              Phimmoi789 – Thế giới điện ảnh trong tầm tay - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2025 chất lượng 4K!
            </p>
            <p>Liên hệ PR: @kimbinhmai</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center md:items-end">
          <h3 className="text-sm font-medium text-gray-300">
            Theo dõi PHIMMOI789
          </h3>

          <div className="flex flex-wrap justify-center md:justify-end">
            {[
              { src: "/images/icons/facebook-icon.svg", alt: "Facebook" },
              { src: "/images/icons/instagram-icon.svg", alt: "Instagram" },
              { src: "/images/icons/x-icon.svg", alt: "X" },
              { src: "/images/icons/telegram-icon.svg", alt: "Telegram" },
              { src: "/images/icons/tiktok-icon.svg", alt: "Tiktok" },
              { src: "/images/icons/threads-icon.svg", alt: "Threads" },
            ].map((icon, i) => (
              <Link
                key={i}
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label={icon.alt}
                className="border border-gray-500 rounded-md p-2 flex items-center justify-center hover:border-white transition"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 mt-4">
            <a
              href="//www.dmca.com/Protection/Status.aspx?id=1a959ebc-0667-458d-a57c-52bb0a51b2e5"
              target="_blank"
              rel="noopener noreferrer"
              title="DMCA.com Protection Status"
              aria-label="DMCA"
            >
              <Image
                src="/_dmca_premi_badge_4.png"
                width={140}
                height={35}
                alt="DMCA.com Protection Status"
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} phimmoi789.com - All rights reserved.
      </div>
    </footer>
  );
}
