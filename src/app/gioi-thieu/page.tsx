import Link from "next/link";

const AboutGhienPhim = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-white mt-30">
      <h2 className="text-3xl font-bold text-primary mb-6">
        GhienPhim - Nền Tảng Xem Phim Trực Tuyến Miễn Phí
      </h2>

      <div className="space-y-6 leading-relaxed text-white">
        <p>
          GhienPhim là nền tảng xem phim trực tuyến miễn phí, cung cấp một không
          gian giải trí đỉnh cao cho hàng triệu người dùng với tiêu chí chất
          lượng, tiện lợi và phong phú. Được thành lập với sứ mệnh đem lại trải
          nghiệm giải trí hoàn toàn miễn phí, GhienPhim đã và đang trở thành điểm
          đến quen thuộc cho những người yêu thích phim ảnh từ khắp nơi.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Giao Diện Thân Thiện, Dễ Sử Dụng
        </h3>
        <p>
          GhienPhim thiết kế giao diện tối giản, thân thiện để bạn dễ dàng khám phá
          và tìm kiếm những bộ phim yêu thích. Chỉ với vài thao tác đơn giản,
          bạn có thể truy cập vào kho phim đa dạng và thưởng thức nội dung giải
          trí đỉnh cao mọi lúc mọi nơi.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Kho Phim Phong Phú, Đáp Ứng Mọi Thể Loại
        </h3>
        <p>
          GhienPhim mang đến cho bạn hàng ngàn bộ phim thuộc nhiều thể loại: hành
          động, lãng mạn, khoa học viễn tưởng, hoạt hình, kinh dị, phiêu lưu...
        </p>
        <p>Kho phim của GhienPhim bao gồm:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Phim Bộ: Series kinh điển và phim truyền hình mới nhất.</li>
          <li>
            Phim Lẻ: Từ bom tấn Hollywood đến phim châu Á và phim độc lập.
          </li>
          <li>Phim Việt Nam: Luôn cập nhật phim Việt mới và nổi bật.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary">
          Chất Lượng Video Đỉnh Cao - Từ HD đến 4K
        </h3>
        <p>
          GhienPhim cung cấp phim với nhiều độ phân giải từ HD đến 4K, phù hợp với
          tốc độ mạng và thiết bị của bạn. Hình ảnh sắc nét, âm thanh sống động
          giúp bạn có trải nghiệm như tại rạp phim.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Tính Năng Nổi Bật của GhienPhim
        </h3>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Xem phim miễn phí hoàn toàn – không thu phí người dùng.</li>
          <li>Cập nhật phim nhanh chóng, bắt kịp xu hướng mới nhất.</li>
          <li>Xem phim mọi lúc, mọi nơi với hỗ trợ đa nền tảng.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary">
          Cam Kết của GhienPhim
        </h3>
        <p>
          Chúng tôi cam kết bảo vệ quyền lợi người dùng với chất lượng dịch vụ
          tốt nhất. GhienPhim luôn cải thiện nền tảng, đồng thời đảm bảo an toàn và
          bảo mật thông tin cá nhân tuyệt đối.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Liên Hệ với GhienPhim
        </h3>
        <p>
          Mọi thắc mắc xin liên hệ qua email:{" "}
          <Link
            href="mailto:lienhe@phimmoi789.com"
            className="underline text-blue-400 hover:text-blue-300"
          >
            lienhe@phimmoi789.com
          </Link>{" "}
          hoặc qua trang{" "}
          <Link
            href="/lien-he"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Liên Hệ
          </Link>{" "}
          trên website chính thức.
        </p>
      </div>
    </section>
  );
};

export default AboutGhienPhim;
