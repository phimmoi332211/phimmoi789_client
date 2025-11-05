const ComparisonPage = () => {
  return (
    <div className="article-body text-base leading-relaxed mt-30">
      <section className="mb-6">
        <p>
          <b>Động Phim</b> - Xem phim không giới hạn với chất lượng Full HD, 4K,
          trải nghiệm đa dạng với phụ đề tiếng Việt, thuyết minh và lồng tiếng.
          Sở hữu kho phim đồ sộ với hơn hàng ngàn tựa phim bộ và phim lẻ,{" "}
          <b>Động Phim</b> liên tục cập nhật nhanh nhất những bộ phim hot từ Hàn
          Quốc, Trung Quốc, Mỹ, Nhật Bản và nhiều quốc gia khác.
        </p>
        <p>
          Giao diện thân thiện, dễ sử dụng, giúp người xem dễ dàng tìm kiếm và
          theo dõi phim yêu thích. Với tốc độ tải nhanh, không giật lag, bạn có
          thể thưởng thức phim mượt mà trên điện thoại, máy tính bảng, laptop
          hay TV thông minh.
        </p>
        <p>
          Kho phim tại <b>Động Phim</b> đa dạng thể loại, từ hành động, viễn
          tưởng, kinh dị, tâm lý, tình cảm, cổ trang, hoạt hình, phù hợp với mọi
          lứa tuổi và sở thích. Đặc biệt, không yêu cầu đăng ký tài khoản, không
          chứa quảng cáo gây phiền nhiễu, mang đến không gian giải trí hoàn toàn
          miễn phí.
        </p>
      </section>

      <section className="cards-row fixed pt-4">
        <div className="row-header">
          <h3 className="category-name text-primary">
            Khám Phá Dongphim - Kho Phim Trực Tuyến Miễn Phí, Cập Nhật Liên Tục
          </h3>
        </div>
        <div className="row-content article-body">
          <h3 className="heading-sm text-white">Giới thiệu về DongPhim</h3>
          {[
            "Xem phim miễn phí, không cần tài khoản",
            "Kho phim đa dạng, cập nhật thường xuyên",
            "Chất lượng hình ảnh ổn định",
            "Giao diện đơn giản, dễ sử dụng",
            "Hỗ trợ nhiều thiết bị",
          ].map((title, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="heading-xs text-white">{`${
                idx + 1
              }. ${title}`}</h4>
              <p>{/* Nội dung tương ứng sẽ được cập nhật sau */}</p>
            </div>
          ))}

          <h3 className="heading-sm text-primary">
            So sánh Dongphim và Rophimmoi - Lựa chọn nào hoàn hảo hơn?
          </h3>
          <div>
            {[
              "Danh mục phim – Sự đa dạng và cập nhật nội dung",
              "Chất lượng hình ảnh và tốc độ tải",
              "Giao diện và trải nghiệm người dùng",
              "Xem phim không bị gián đoạn bởi quảng cáo",
              "Tốc độ cập nhật phim mới",
            ].map((section, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="heading-xs text-white">{`${
                  idx + 1
                }. ${section}`}</h4>
                <p>{/* Nội dung so sánh chi tiết sẽ được cập nhật sau */}</p>
              </div>
            ))}
          </div>

          <h3 className="heading-sm text-primary">
            Tổng hợp so sánh các tính năng bổ trợ
          </h3>
          <div className="table-wrap overflow-x-auto">
            <table className="table table-dark table-bordered table-hover w-full text-sm">
              <thead>
                <tr>
                  <th>Tính năng</th>
                  <th className="bg-red-600">Dongphim</th>
                  <th className="bg-yellow-400">Rophimmoi.tv</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Xem phim miễn phí</td>
                  <td>Có</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Thuyết minh, phụ đề đa ngôn ngữ</td>
                  <td>Có</td>
                  <td>Có, hỗ trợ song ngữ</td>
                </tr>
                <tr>
                  <td>Kho phim sắp xếp theo chủ đề</td>
                  <td>Không</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Tùy chỉnh độ phân giải linh hoạt</td>
                  <td>Không</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Lưu danh sách phim yêu thích</td>
                  <td>Không</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Không quảng cáo làm phiền</td>
                  <td>Không, quảng cáo rất nhiều</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Xem trên nhiều thiết bị</td>
                  <td>Có</td>
                  <td>Có</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="heading-sm text-primary">Kết luận</h3>
          <p>
            Dù cả <b>DongPhim</b> và <b>GhienPhim.tv</b> đều cung cấp dịch vụ xem
            phim trực tuyến miễn phí, nhưng xét về chất lượng tổng thể,
            <b>GhienPhim.tv</b> vẫn là lựa chọn đáng cân nhắc hơn nhờ giao diện
            thân thiện, kho phim phong phú và trải nghiệm không quảng cáo.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ComparisonPage;
