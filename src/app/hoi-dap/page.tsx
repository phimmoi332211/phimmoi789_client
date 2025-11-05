import Link from "next/link";
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "faq-01",
    question: "GhienPhim là gì và có những đặc điểm nổi bật nào?",
    answer:
      "GhienPhim là một trang web xem phim online miễn phí tại Việt Nam, cung cấp kho phim chất lượng HD và 4K, không quảng cáo và có tốc độ tải mượt mà. Trang web này có giao diện thân thiện với người dùng và thường xuyên cập nhật các bộ phim mới nhất từ nhiều quốc gia.",
  },
  {
    id: "faq-02",
    question: "GhienPhim có miễn phí hoàn toàn không?",
    answer:
      "GhienPhim hoàn toàn miễn phí. Người dùng không cần trả phí hay đăng ký tài khoản để xem phim, giúp khán giả thoải mái lựa chọn và trải nghiệm hàng ngàn bộ phim chất lượng cao mà không tốn bất kỳ khoản phí nào.",
  },
  {
    id: "faq-03",
    question: "GhienPhim có bao gồm các bộ phim chiếu rạp không?",
    answer:
      "GhienPhim cung cấp nhiều bộ phim chiếu rạp đình đám từ Việt Nam và quốc tế. Các bộ phim này được cập nhật nhanh chóng để đáp ứng nhu cầu xem phim của khán giả.",
  },
  {
    id: "faq-04",
    question: "Tốc độ tải phim trên GhienPhim như thế nào?",
    answer:
      "GhienPhim có tốc độ tải nhanh, ổn định nhờ hệ thống máy chủ hiện đại, giúp người xem trải nghiệm phim online mà không bị gián đoạn bởi tình trạng chậm hoặc lag.",
  },
  {
    id: "faq-05",
    question: "Chất lượng phim trên GhienPhim có tốt không?",
    answer:
      "GhienPhim cung cấp chất lượng phim từ HD đến 4K, giúp người dùng thưởng thức hình ảnh sắc nét, sống động và chân thực nhất có thể.",
  },
  {
    id: "faq-06",
    question: "GhienPhim có thể xem trên các thiết bị nào?",
    answer:
      "GhienPhim có thể được truy cập trên các thiết bị như máy tính, điện thoại di động và máy tính bảng, giúp người dùng xem phim mọi lúc, mọi nơi.",
  },
  {
    id: "faq-07",
    question: "GhienPhim có hỗ trợ thuyết minh và phụ đề không?",
    answer:
      "Có, GhienPhim hỗ trợ nhiều tùy chọn thuyết minh và phụ đề đa ngôn ngữ, phù hợp với nhu cầu của đa dạng người xem và giúp cải thiện khả năng học ngoại ngữ.",
  },
  {
    id: "faq-08",
    question: "GhienPhim có quảng cáo trong quá trình xem phim không?",
    answer:
      "GhienPhim hoàn toàn không có quảng cáo trong quá trình xem phim, giúp khán giả tận hưởng phim liền mạch mà không bị gián đoạn.",
  },
  {
    id: "faq-09",
    question: "Có thể tìm thấy phim của những quốc gia nào trên GhienPhim?",
    answer:
      "GhienPhim cung cấp phim từ nhiều quốc gia, bao gồm Việt Nam, Hàn Quốc, Trung Quốc, Nhật Bản, Thái Lan, Âu Mỹ và nhiều quốc gia khác, với đa dạng thể loại cho người xem lựa chọn.",
  },
  {
    id: "faq-10",
    question: "Những thể loại phim nào phổ biến nhất trên GhienPhim?",
    answer:
      "Các thể loại phim được yêu thích trên GhienPhim gồm: hành động, tình cảm, khoa học viễn tưởng, cổ trang, hoạt hình, kinh dị, võ thuật và tâm lý. GhienPhim có kho phim phong phú đáp ứng sở thích của mọi đối tượng khán giả.",
  },
  {
    id: "faq-11",
    question: "GhienPhim có cập nhật phim mới không?",
    answer:
      "Có, GhienPhim cập nhật các bộ phim mới liên tục 24/24, đảm bảo người dùng không bỏ lỡ các bộ phim hot nhất từ các rạp chiếu hay trên truyền hình.",
  },
  {
    id: "faq-12",
    question: "GhienPhim có phim lẻ và phim bộ không?",
    answer:
      "Đúng vậy, GhienPhim cung cấp cả phim lẻ và phim bộ, bao gồm các bộ phim truyền hình dài tập và phim điện ảnh nổi tiếng từ nhiều quốc gia.",
  },
  {
    id: "faq-13",
    question: "GhienPhim có hỗ trợ phim hoạt hình không?",
    answer:
      "Có, GhienPhim có một kho phim hoạt hình phong phú, bao gồm các phim hoạt hình nổi tiếng từ Âu Mỹ và phim anime Nhật Bản, phục vụ cả trẻ em lẫn người lớn.",
  },
  {
    id: "faq-14",
    question: "Có thể tìm kiếm phim dễ dàng trên GhienPhim không?",
    answer:
      "Giao diện của GhienPhim được thiết kế thân thiện và tối ưu, giúp người dùng dễ dàng tìm kiếm phim theo tên phim, thể loại, quốc gia và các danh mục khác.",
  },
  {
    id: "faq-15",
    question: "GhienPhim có cung cấp phim 4K không?",
    answer:
      "GhienPhim là một trong số ít trang web tại Việt Nam cung cấp các bộ phim chất lượng 4K, giúp người xem trải nghiệm hình ảnh sắc nét như tại rạp chiếu phim.",
  },
  {
    id: "faq-16",
    question: "GhienPhim có hỗ trợ lồng tiếng giọng địa phương không?",
    answer:
      "GhienPhim cung cấp tùy chọn lồng tiếng giọng miền Bắc, Trung và Nam, giúp người xem dễ dàng lựa chọn theo sở thích cá nhân.",
  },
  {
    id: "faq-17",
    question: "GhienPhim có các bộ phim được xem nhiều nhất không?",
    answer:
      "GhienPhim thường xuyên cập nhật danh sách những bộ phim được xem nhiều nhất, bao gồm cả phim hot trong nước và phim nổi tiếng quốc tế, giúp người xem dễ dàng lựa chọn những bộ phim thịnh hành.",
  },
  {
    id: "faq-18",
    question: "Tại sao nên chọn GhienPhim thay vì các trang web khác?",
    answer:
      "GhienPhim không chỉ miễn phí, không quảng cáo, mà còn có kho phim phong phú với chất lượng HD và 4K. Tốc độ tải nhanh và giao diện dễ sử dụng là những ưu điểm khiến GhienPhim trở thành lựa chọn hàng đầu cho người yêu thích phim online.",
  },
  {
    id: "faq-19",
    question: "Có cần đăng ký tài khoản để xem phim trên GhienPhim không?",
    answer:
      "Người dùng không cần đăng ký tài khoản mà vẫn có thể xem phim thoải mái. GhienPhim giúp tối ưu hóa trải nghiệm người dùng, không cần thông tin đăng nhập.",
  },
  {
    id: "faq-20",
    question: "GhienPhim có bảo vệ quyền riêng tư cho người dùng không?",
    answer:
      "GhienPhim đảm bảo quyền riêng tư của người dùng, không yêu cầu cung cấp thông tin cá nhân và không sử dụng dữ liệu của người dùng cho các mục đích quảng cáo.",
  },
];

const FaqList = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 mt-30">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Một số câu hỏi được người dùng quan tâm nhất tại Rophimmoi – Phim hay cả rổ
      </h2>
      <ul className="list-decimal list-inside mb-10 space-y-2 text-white border border-r-8 border-white p-4 rounded-lg">
        {faqData.map((faq, index) => (
          <li key={faq.id}>
            <Link href={`#${faq.id}`} className="hover:underline">
              {faq.question}
            </Link>
          </li>
        ))}
      </ul>

      <div className="space-y-8">
        {faqData.map((faq, index) => (
          <div key={faq.id} id={faq.id} className="scroll-mt-24">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {index + 1 + ". "}
              {faq.question}
            </h3>
            <p className="text-white">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqList;
