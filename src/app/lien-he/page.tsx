import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-white mt-30">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Liên hệ
      </h2>

      <div className="space-y-6">
        <p>
          Chào mừng bạn đến với trang <b>Liên Hệ</b> của GhienPhim! Chúng tôi luôn
          sẵn sàng lắng nghe và hỗ trợ bạn để mang lại trải nghiệm tốt nhất khi
          sử dụng dịch vụ. Nếu có bất kỳ câu hỏi, góp ý, hoặc yêu cầu hỗ trợ
          nào, hãy liên hệ với chúng tôi qua các thông tin dưới đây.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          1. Thông Tin Liên Hệ Chính
        </h3>
        <p>
          Email hỗ trợ khách hàng:{" "}
          <Link
            href="mailto:lienhe@phimmoi789.com"
            className="underline text-blue-400 hover:text-blue-300"
          >
            lienhe@phimmoi789.com
          </Link>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <b>Vấn đề tài khoản:</b> Quên mật khẩu, không thể truy cập, và các
            vấn đề liên quan đến tài khoản.
          </li>
          <li>
            <b>Hỗ trợ kỹ thuật:</b> Sự cố khi xem phim, chất lượng video hoặc
            các lỗi khác khi sử dụng trang web.
          </li>
          <li>
            <b>Đóng góp ý kiến:</b> Chúng tôi trân trọng mọi ý kiến đóng góp từ
            bạn để nâng cao chất lượng dịch vụ.
          </li>
        </ul>
        <p>
          Email liên hệ về Chính Sách Riêng Tư:{" "}
          <Link
            href="mailto:lienhe@phimmoi789.com"
            className="underline text-blue-400 hover:text-blue-300"
          >
            lienhe@phimmoi789.com
          </Link>
        </p>
        <p>
          Mọi thắc mắc liên quan đến bảo mật thông tin và chính sách riêng tư
          của GhienPhim.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          2. Liên Hệ Qua Mạng Xã Hội
        </h3>
        <p>
          Ngoài email, bạn cũng có thể liên hệ và cập nhật thông tin mới nhất từ
          GhienPhim qua các kênh mạng xã hội:
        </p>
        <div className="space-y-3">
          {[
            {
              name: "Telegram",
              href: "https://t.me/congdongghienphim",
              icon: "https://www.ghienphim.me/images/social/telegram-icon-black.svg",
            },
            {
              name: "Discord",
              href: "https://discord.gg/ghienphim",
              icon: "https://www.ghienphim.me/images/social/discord-icon-black.svg",
            },
            {
              name: "Facebook",
              href: "https://www.facebook.com/ghienphimorg/",
              icon: "https://www.ghienphim.me/images/social/facebook-icon-black.svg",
            },
            {
              name: "Instagram",
              href: "https://www.instagram.com/ghienphimtv",
              icon: "https://www.ghienphim.me/images/social/instagram-icon-black.svg",
            },
            {
              name: "X",
              href: "https://x.com/ghienphimtv",
              icon: "https://www.ghienphim.me/images/social/x-icon-black.svg",
            },
          ].map((social, index) => (
            <div
              key={index}
              className="flex items-center bg-white text-black px-4 py-2 rounded-lg "
            >
              <Image
                src={social.icon}
                alt={social.name}
                className="w-5 h-5 mr-3"
                width={12}
                height={12}
              />
              <span className="font-semibold w-24">{social.name}:</span>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm text-black hover:underline"
              >
                {social.href}
              </Link>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-primary">
          3. Câu Hỏi Thường Gặp (F.A.Q)
        </h3>
        <p>
          Trước khi gửi yêu cầu hỗ trợ, bạn có thể tham khảo trang{" "}
          <Link
            href="/hoi-dap"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Câu Hỏi Thường Gặp (F.A.Q)
          </Link>{" "}
          để tìm câu trả lời nhanh cho các vấn đề phổ biến nhất tại{" "}
          <b>F.A.Q - GhienPhim</b>.
        </p>

        <p>
          Chúng tôi rất vui khi được hỗ trợ bạn và mong muốn mang đến trải
          nghiệm xem phim trực tuyến tốt nhất!{" "}
          <b>
            GhienPhim - Cùng bạn khám phá thế giới giải trí đa dạng, an toàn và
            miễn phí!
          </b>
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
