import BannerSlide from "@/component/home/BannerSlide";
import TopicGrid, { Topic } from "./Swapper";
import MovieList from "./TopPhimTop";
import { Community } from "./Community";
import SlideFilm from "./SlideFilm";
import Top10 from "./top10";
import AnimeSlide from "./Anime";
import { fetchBannerList, fetchCategories, fetchMovies } from "@/help/helper";
import { Define } from "@/types/define";
import Film = Define.Film;
import Image from "next/image";

// Mảng màu để convert
const hotAndCoolColors = [
  "rgb(229, 57, 53)",
  "rgb(251, 140, 0)",
  "rgb(255, 193, 7)",
  "rgb(56, 183, 61)",
  "rgb(255, 87, 34)",
  "rgb(30, 136, 229)",
  "rgb(233, 30, 99)",
  "rgb(156, 39, 176)",
  "rgb(244, 67, 54)",
  "rgb(85, 187, 120)",
  "rgb(41, 121, 255)",
  "rgb(255, 152, 0)",
  "rgb(255, 61, 0)",
  "rgb(58, 27, 216)",
];

// Hàm convert như cũ
function convertToTopics(result: { name: string; url: string }[]): Topic[] {
  return result.slice(0, 14).map((item, idx) => ({
    id: item.url,
    title: item.name,
    href: `/list/${item.url}`,
    backgroundColor: hotAndCoolColors[idx % hotAndCoolColors.length],
  }));
}

interface FilmBannerResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: Film[];
  };
}

export default async function HomePage() {
  // // Lấy phim banner
  const bannerRes: any = await fetchBannerList().catch((err) => {
    return { data: { result: [] } };
  });

  const slideData = bannerRes.data?.data || [];

  // Lấy topics (bắt lỗi để không crash SSR)
  const typeRes: any = await fetchCategories({ limit: 14 }).catch(() => ({
    data: { data: [] },
  }));
  const topics = convertToTopics(typeRes.data?.data || []);
  // // Lấy các thể loại phim (trung, hàn, âu mỹ)

  const trungRes: any = await fetchMovies({
    country: "trung-quoc",
  }).catch(() => ({ data: { data: { result: [] } } }));

  const hanRes: any = await fetchMovies({
    country: "han-quoc",
  }).catch(() => ({ data: { data: { result: [] } } }));

  const aumyRes: any = await fetchMovies({
    country: "au-my",
  }).catch(() => ({ data: { data: { result: [] } } }));

  const trungMovies = trungRes.data?.data?.result || [];
  const hanMovies = hanRes.data?.data?.result || [];
  const aumyMovies = aumyRes.data?.data?.result || [];

  // Lấy phim điện ảnh mới  (slide phim)
  const slideMoviesRes: any = await fetchMovies({
    page: 1,
    limit: 30,
    movieCategory: "hoat-hinh"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const slideMovies = slideMoviesRes.data?.movies || [];

  // Lấy top 10 phim bộ hôm nay (phim-bo)
  const dataMovieSeries: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieType: "series",
    sortBy: "newest",
  }).catch(() => ({ data: { data: { result: [] } } }));
  const movieSeries = dataMovieSeries.data?.movies || [];

  // Lấy top 10 phim bộ hôm nay (phim-le)
  const dataMovieSingle: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieType: "single",
    sortBy: "newest",
  }).catch(() => ({ data: { data: { result: [] } } }));
  const movieSingle = dataMovieSingle.data?.movies || [];

  // Lấy anime (hoạt hình) từ API, truyền xuống AnimeSlide qua props
  const animeRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCategory: "hoat-hinh"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const animeSlideData = animeRes.data?.movies || [];

  return (
    <>
      <div id="body-load">
        <div className="bl-logo">
          <Image src="/logo.webp" alt="logo" width={134} height={40} />
          <div className="text-h1 text-center">
            Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao Và Cập Nhật Liên Tục
          </div>
        </div>
      </div>
      <BannerSlide slideData={slideData} />
      {/* <TopicGrid topics={topics} /> */}
      <MovieList
        hanMovies={hanMovies}
        trungMovies={trungMovies}
        aumyMovies={aumyMovies}
      />
      {/* <Community /> */}
      <SlideFilm movies={slideMovies} />
      <Top10 movies={movieSingle} title={"Top 10 phim bộ hay nhất hôm nay/ tuần này/ tháng này"} />
      <Top10 movies={movieSingle} title={"Top 10 phim lẻ hay nhất hôm nay/ tuần này/ tháng này"}/>
      <Top10 movies={movieSingle} title={"Phim chiếu rạp đang HOT"}/>
      <AnimeSlide animeSlideData={animeSlideData} />
      <Top10 movies={movieSingle} title={"Bạn Nghĩ Mình Gan Sao? Xem Xong Phim Này Hãy Nói Tiếp"}/>
      <Top10 movies={movieSingle} title={"Điện Ảnh Hồng Kông – Vị Cũ Không Bao Giờ Phai"}/>
    </>
  );
}
