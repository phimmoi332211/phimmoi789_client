const GhienPhimVsGhienPhim = () => {
  return (
    <div className="p-6 space-y-6 mt-30">
      <h1 className="text-2xl font-bold text-center">
        So Sánh: GhienPhim vs GhienPhim
      </h1>

      <section>
        <h2 className="text-xl font-semibold">Giới thiệu về Ghiền Phim</h2>
        <p>
          <strong>Ghiền Phim</strong> là nền tảng xem phim miễn phí với hơn
          5.000 phim lẻ và 2.000 phim bộ, hỗ trợ chất lượng HD, 4K, phụ đề,
          thuyết minh và lồng tiếng. Giao diện thân thiện, tốc độ nhanh, không
          cần tài khoản và không có quảng cáo.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Các điểm nổi bật của Ghiền Phim
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Xem phim miễn phí, không giới hạn, không cần đăng ký</li>
          <li>Kho phim đa dạng: hành động, tình cảm, kinh dị, hoạt hình...</li>
          <li>Bảo mật cao, không tiết lộ thông tin người dùng</li>
          <li>Cập nhật phim chiếu rạp mới nhanh chóng</li>
          <li>Giao diện thân thiện, dễ sử dụng</li>
          <li>Chất lượng phim Full HD và 4K</li>
          <li>Tốc độ tải nhanh</li>
          <li>Tùy chọn phụ đề, thuyết minh linh hoạt</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          So Sánh GhienPhim và GhienPhim.tv
        </h2>

        <h3 className="font-semibold mt-4">1. Danh mục phim</h3>
        <p>
          <strong>GhienPhim</strong> tập trung vào phim chiếu rạp mới.{" "}
          <strong>GhienPhim.tv</strong> có kho phim đa dạng hơn, bao gồm phim bộ,
          anime, tài liệu, truyền hình từ nhiều quốc gia.
        </p>

        <h3 className="font-semibold mt-4">2. Chất lượng và tốc độ</h3>
        <p>
          Cả hai hỗ trợ HD, Full HD, 4K. Tuy nhiên, <strong>GhienPhim</strong> có
          tốc độ tải nhanh hơn và cho phép tùy chỉnh độ phân giải phù hợp với
          tốc độ mạng.
        </p>

        <h3 className="font-semibold mt-4">3. Trải nghiệm người dùng</h3>
        <p>
          <strong>GhienPhim</strong> có giao diện trực quan, dễ tìm kiếm, hỗ trợ
          thuyết minh đa vùng miền và song ngữ, giúp học ngoại ngữ và trải
          nghiệm tốt hơn.
        </p>

        <h3 className="font-semibold mt-4">4. Quảng cáo</h3>
        <p>
          <strong>GhienPhim</strong> có quảng cáo gây phiền toái.{" "}
          <strong>GhienPhim</strong> cam kết không quảng cáo làm gián đoạn trải
          nghiệm xem phim.
        </p>

        <h3 className="font-semibold mt-4">5. Bảng So Sánh Tính Năng</h3>
        <table className="table-auto w-full text-left border border-white">
          <thead>
            <tr >
              <th className="border border-white p-2">Tính năng</th>
              <th className="border border-white p-2">GhienPhim</th>
              <th className="border border-white p-2">GhienPhim.tv</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white p-2">Xem phim miễn phí</td>
              <td className="border border-white p-2">Có</td>
              <td className="border border-white p-2">Có</td>
            </tr>
            <tr>
              <td className="border border-white p-2">Phụ đề & thuyết minh</td>
              <td className="border border-white p-2">Có</td>
              <td className="border border-white p-2">Có, hỗ trợ song ngữ</td>
            </tr>
            <tr>
              <td className="border border-white p-2">Sắp xếp theo chủ đề</td>
              <td className="border border-white p-2">Không</td>
              <td className="border border-white p-2">Có</td>
            </tr>
            <tr>
              <td className="border border-white p-2">
                Tùy chỉnh độ phân giải
              </td>
              <td className="border border-white p-2">Không</td>
              <td className="border border-white p-2">Có</td>
            </tr>
            <tr>
              <td className="border border-white p-2">Lưu phim yêu thích</td>
              <td className="border border-white p-2">Không</td>
              <td className="border border-white p-2">Có</td>
            </tr>
            <tr>
              <td className="border border-white p-2">Không quảng cáo</td>
              <td className="border border-white p-2">Không</td>
              <td className="border border-white p-2">Có</td>
            </tr>
            <tr>
              <td className="border border-white p-2">Xem đa thiết bị</td>
              <td className="border border-white p-2">Có</td>
              <td className="border border-white p-2">Có</td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-semibold mt-4">Kết luận</h3>
        <p>
          Nếu bạn yêu cầu trải nghiệm không quảng cáo, tốc độ nhanh, giao diện
          dễ dùng và nhiều tính năng hơn, thì
          <strong> GhienPhim.tv </strong> là lựa chọn tốt hơn. Tuy nhiên,{" "}
          <strong>GhienPhim</strong> vẫn phù hợp với người dùng cơ bản muốn xem
          phim miễn phí đơn giản.
        </p>
      </section>
    </div>
  );
};

export default GhienPhimVsGhienPhim;