import BannerSlide from "@/component/home/BannerSlide";
import MovieList from "./TopPhimTop";
import SlideFilm from "./SlideFilm";
import Top10 from "./top10";
import AnimeSlide from "./Anime";
import { fetchBannerList, fetchMovies } from "@/help/helper";
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

export default async function HomePage() {
  // // Lấy phim banner
  const bannerRes: any = await fetchBannerList().catch((err) => {
    return { data: { result: [] } };
  });
  const slideData = bannerRes.data?.data || [];

  const chinaRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCountry: "trung-quoc"
  }).catch(() => ({ data: { data: { result: [] } } }));

  const koreaRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCountry: "han-quoc"
  }).catch(() => ({ data: { data: { result: [] } } }));

  const usaRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCountry: "au-my"
  }).catch(() => ({ data: { data: { result: [] } } }));
  
  const chinaMovies = chinaRes.data?.movies|| [];
  const koreaMovies = koreaRes.data?.movies || [];
  const usaMovies = usaRes.data?.movies || [];

  // Lấy phim điện ảnh mới  (slide phim)
  const slideMoviesRes: any = await fetchMovies({
    page: 1,
    limit: 30,
    movieCategory: "hoat-hinh"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const slideMoviesData = slideMoviesRes.data?.movies || [];

  // Lấy top 10 phim bộ hôm nay (phim-bo)
  const movieSeriesRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieType: "series",
  }).catch(() => ({ data: { data: { result: [] } } }));
  const movieSeriesData = movieSeriesRes.data?.movies || [];

  // Lấy top 10 phim bộ hôm nay (phim-le)
  const ovieSingleRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieType: "single",
  }).catch(() => ({ data: { data: { result: [] } } }));
  const movieSingleData = ovieSingleRes.data?.movies || [];

  // Lấy anime (hoạt hình) từ API, truyền xuống AnimeSlide qua props
  const animeRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCategory: "hoat-hinh"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const animeSlideData = animeRes.data?.movies || [];

  // Lấy phim chiếu rạp từ API
  const moviesInTheatersRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCategory: "hoat-hinh"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const moviesInTheatersSlideData = moviesInTheatersRes.data?.movies || [];
  
  const moviesHorrifiedRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCategory: "kinh-di"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const moviesHorrifiedData = moviesHorrifiedRes.data?.movies || [];
  
  const moviesCountryRes: any = await fetchMovies({
    page: 1,
    limit: 10,
    movieCountry: "hong-kong"
  }).catch(() => ({ data: { data: { result: [] } } }));
  const moviesCountryData = moviesCountryRes.data?.movies || [];

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
      <MovieList
        hanMovies={koreaMovies}
        trungMovies={chinaMovies}
        aumyMovies={usaMovies}
      />
      {/* <Community /> */}
      <SlideFilm movies={slideMoviesData} />
      <Top10 movies={movieSeriesData} title={"Top 10 phim bộ hay nhất hôm nay/ tuần này/ tháng này"} />
      <Top10 movies={movieSingleData} title={"Top 10 phim lẻ hay nhất hôm nay/ tuần này/ tháng này"} />
      <Top10 movies={moviesInTheatersSlideData} title={"Phim chiếu rạp đang HOT"} />
      <AnimeSlide animeSlideData={animeSlideData} />
      <Top10 movies={moviesHorrifiedData} title={"Bạn Nghĩ Mình Gan Sao? Xem Xong Phim Này Hãy Nói Tiếp"} />
      <Top10 movies={moviesCountryData} title={"Điện Ảnh Hồng Kông – Vị Cũ Không Bao Giờ Phai"} />
    </>
  );
}
