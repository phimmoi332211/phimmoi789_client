import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 mt-30">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Bảo Mật - Chính Sách Riêng Tư của Nghienphim
      </h2>

      <div className="space-y-6 text-white leading-relaxed">
        <p>
          Tại Nghienphim, chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá
          nhân của bạn khi bạn truy cập và sử dụng trang web của chúng tôi.
          Chính sách này cung cấp chi tiết về cách chúng tôi thu thập, sử dụng
          và bảo mật thông tin, đồng thời cam kết minh bạch trong việc quản lý
          dữ liệu cá nhân của người dùng.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Thông Tin Chúng Tôi Thu Thập
        </h3>
        <p>
          Để cung cấp và cải thiện dịch vụ, Nghienphim thu thập thông tin từ người
          dùng thông qua nhiều hình thức, bao gồm:
        </p>
        <p>
          <strong>Thông Tin Cá Nhân</strong>: Khi bạn đăng ký tài khoản, nhận
          bản tin, hoặc liên hệ với chúng tôi, chúng tôi có thể thu thập các
          thông tin như tên, địa chỉ email, số điện thoại và các thông tin khác
          mà bạn cung cấp.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Mục Đích Sử Dụng Thông Tin
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Cung Cấp Dịch Vụ:</strong> Sử dụng thông tin để cung cấp và
            duy trì các dịch vụ của Nghienphim, xử lý các yêu cầu và nâng cao trải
            nghiệm người dùng.
          </li>
          <li>
            <strong>Giao Tiếp với Người Dùng:</strong> Gửi các thông báo, bản
            tin, cập nhật liên quan đến dịch vụ của chúng tôi. Người dùng có thể
            từ chối nhận các thông tin này bất kỳ lúc nào.
          </li>
          <li>
            <strong>Phân Tích và Cải Thiện:</strong> Sử dụng thông tin phi cá
            nhân để hiểu rõ hơn về hành vi của người dùng và nâng cao chất lượng
            trang web, sản phẩm, và dịch vụ.
          </li>
          <li>
            <strong>Bảo Mật:</strong> Áp dụng các biện pháp để bảo vệ trang web
            và người dùng khỏi các hành vi gian lận, đảm bảo an toàn thông tin
            và tuân thủ các yêu cầu pháp lý.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-primary">
          Chia Sẻ Thông Tin
        </h3>
        <p>
          Nghienphim cam kết không bán, trao đổi hoặc chia sẻ thông tin cá nhân của
          bạn với bất kỳ bên thứ ba nào, ngoại trừ trong các trường hợp sau:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Với Sự Đồng Ý Của Bạn:</strong> Chúng tôi chỉ chia sẻ thông
            tin cá nhân khi có sự đồng ý rõ ràng của bạn.
          </li>
          <li>
            <strong>Đối Tác và Nhà Cung Cấp Dịch Vụ:</strong> Chia sẻ thông tin
            với các đối tác và nhà cung cấp dịch vụ tin cậy để hỗ trợ trong việc
            cung cấp dịch vụ, xử lý thanh toán, và phân tích dữ liệu.
          </li>
          <li>
            <strong>Tuân Thủ Pháp Luật:</strong> Nghienphim có thể tiết lộ thông tin
            cá nhân nếu được yêu cầu theo quy định pháp luật hoặc để bảo vệ
            quyền lợi, tài sản và an toàn của công ty và người dùng.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-primary">
          Bảo Mật Thông Tin Cá Nhân
        </h3>
        <p>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông
          tin cá nhân của bạn khỏi việc mất mát, lạm dụng, truy cập trái phép,
          tiết lộ và thay đổi. Tuy nhiên, mặc dù chúng tôi luôn nỗ lực tối đa,
          không có phương pháp truyền tải hay lưu trữ nào là tuyệt đối an toàn.
          Nghienphim cam kết liên tục cải tiến các biện pháp bảo mật để bảo vệ thông
          tin của bạn.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Quyền Riêng Tư của Người Dùng
        </h3>
        <p>Người dùng có quyền:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Truy cập, chỉnh sửa và xóa thông tin cá nhân của mình mà chúng tôi
            lưu giữ. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi
            qua email:{" "}
            <Link
              href="mailto:lienhe@rophimmoi.com"
              className="text-blue-600 hover:underline"
            >
              lienhe@rophimmoi.com
            </Link>
            .
          </li>
          <li>
            Từ chối nhận thông báo từ Rophimmoi bất kỳ lúc nào thông qua tùy chọn
            trong email hoặc liên hệ trực tiếp.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-primary">
          Cookies và Công Nghệ Tương Tự
        </h3>
        <p>
        Rophimmoi sử dụng cookies và các công nghệ tương tự để thu thập thông tin
          phi cá nhân về cách bạn sử dụng trang web. Cookies giúp chúng tôi:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Cải thiện trải nghiệm người dùng bằng cách ghi nhớ sở thích của bạn.
          </li>
          <li>
            Phân tích lưu lượng truy cập và hành vi của người dùng để cải thiện
            dịch vụ.
          </li>
          <li>Cung cấp quảng cáo phù hợp dựa trên hoạt động của bạn.</li>
        </ul>
        <p>
          Bạn có thể điều chỉnh cài đặt cookies thông qua trình duyệt của mình
          hoặc tắt cookies nếu muốn.
        </p>

        <h3 className="text-xl font-semibold text-primary">
          Thay Đổi Chính Sách Riêng Tư
        </h3>
        <p>
        Rophimmoi có thể cập nhật Chính Sách Riêng Tư này để phù hợp với các quy
          định và chính sách nội bộ mới. Mọi thay đổi sẽ được thông báo trên
          trang web và có hiệu lực ngay khi được đăng tải. Việc tiếp tục sử dụng
          trang web sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các
          điều khoản mới.
        </p>

        <h3 className="text-xl font-semibold text-primary">Liên Hệ</h3>
        <p>
          Nếu có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Chính Sách Riêng
          Tư này, vui lòng liên hệ với chúng tôi qua email:{" "}
          <Link
            href="mailto:lienhe@rophimmoi.com"
            className="text-blue-600 hover:underline"
          >
            lienhe@rophimmoi.com
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
