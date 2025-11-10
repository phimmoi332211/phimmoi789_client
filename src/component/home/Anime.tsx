"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

function extractMinutes(durationStr: string) {
  if (!durationStr) return null;
  let match = durationStr.match(/(\d+)\s*phút/i);
  if (match) return Number(match[1]);
  match = durationStr.match(/(\d+)h\s*(\d+)m/i);
  if (match) return Number(match[1]) * 60 + Number(match[2]);
  match = durationStr.match(/(\d+)\s*m/i);
  return match ? Number(match[1]) : null;
}

// Chuẩn hoá dữ liệu từ API mới về format cũ (không đổi UI)
function normalize(item: any) {
  const type = item?.type; // "single" | "series"
  const total =
    typeof item?.total_episode === "number" ? item.total_episode : 0;

  const episode_total =
    type === "series" ? (total ? `${total} Tập` : "0 Tập") : "1 Tập";
  const time =
    typeof item?.duration === "number" && item.duration > 0
      ? `${item.duration} phút`
      : item?.time || "";

  // Chuẩn hóa category để có { name, slug } như UI đang dùng
  const category = Array.isArray(item?.category)
    ? item.category.map((c: any) => ({
        name: c?.name,
        slug: c?.url || c?.slug || "",
      }))
    : [];

  return {
    // Trường UI đang dùng
    slug: item?.slug || item?.url || "",
    title: item?.title || item?.name || "",
    name_english: item?.name_english || item?.origin_name || item?.name || "",
    poster_url: item?.image.url || "",
    alt: item?.image?.alt || "",
    caption: item?.image?.caption || "",
    image_title: item?.image?.title || "",
    thumb_url: item?.thumb_url || item?.thumbnail || item?.poster_url || "",
    year: item?.year,
    time,
    episode_total,
    description: item?.description || "",
    category,
  };
}

export default function AnimeSlide({
  animeSlideData,
}: {
  animeSlideData: any[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { authUser } = useAuth();
  const [films, setFilms] = useState<any[]>([]);

  const isFavorite = (slug: string) => films.some((film) => film.slug === slug);

  const handleToggleFavorite = async (slug: string) => {
    const favorite = isFavorite(slug);
    try {
      toast.success(
        favorite ? "Đã bỏ khỏi yêu thích!" : "Đã thêm vào yêu thích!"
      );
      setFilms((prev) =>
        favorite
          ? prev.filter((film) => film.slug !== slug)
          : [...prev, { slug }]
      );
    } catch (err) {
      toast.error(
        !authUser
          ? "Bạn phải đăng nhập để thực hiện chức năng này"
          : favorite
          ? "Bỏ khỏi yêu thích thất bại!"
          : "Thêm vào yêu thích thất bại!"
      );
    }
  };

  // Dữ liệu đã chuẩn hoá, UI giữ nguyên
  const data = (animeSlideData || []).map(normalize);

  return (
    <div className="effect-fade-in mt-30">
      <div id="collection-I2LWLq">
        <div className="cards-row big-slide wide">
          {/* Header */}
          <div className="row-header">
            <h1 className="category-name">Thế giới Anime dành riêng cho bạn</h1>
            <div className="cat-more">
              <Link className="line-center" href="/list/hoat-hinh">
                <span>Xem thêm</span>
                <i className="fa-solid fa-angle-right"></i>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="row-content">
            <div className="slide-wrapper big-slide-wrapper">
              {/* Main Swiper */}
              <Swiper
                modules={[EffectFade, Thumbs]}
                effect="fade"
                thumbs={{ swiper: thumbsSwiper }}
                className="swiper top-slide-main"
              >
                {data.map((item, index) => {
                  const imdb = item.time
                    ? Math.round((extractMinutes(item.time) / 3) * 100) / 100
                    : 0;

                  return (
                    <SwiperSlide key={`main-${item.slug || index}`}>
                      <div className="slide-elements">
                        <Link
                          className="slide-url"
                          href={`/phim/${item.slug}`}
                        />
                        <div className="cover-fade">
                          <div className="cover-image relative w-full h-[500px]">
                            <Image
                              src={item.poster_url}
                              alt={item.alt}
                              fill
                              className="object-cover"
                              sizes="100vw"
                              priority
                            />
                          </div>
                        </div>

                        <div className="safe-area">
                          <div className="slide-content">
                            <div className="media-item">
                              <h2 className="media-title lim-1">
                                <Link href={`/phim/${item.slug}`}>
                                  {item.title}
                                </Link>
                              </h2>
                              <h3 className="media-alias-title">
                                <Link href={`/phim/${item.slug}`}>
                                  {item.name_english}
                                </Link>
                              </h3>

                              <div className="hl-tags">
                                <div className="tag-imdb">
                                  <span>{imdb}</span>
                                </div>
                                <div className="tag-model">
                                  <span className="last">
                                    {item.episode_total}
                                  </span>
                                </div>
                                {item.year && (
                                  <div className="tag-classic">
                                    <span>{item.year}</span>
                                  </div>
                                )}
                                {item.time && (
                                  <div className="tag-classic">
                                    <span>{item.time}</span>
                                  </div>
                                )}
                              </div>

                              <div className="hl-tags mb-4">
                                {(item.category || []).map(
                                  (cat: any, i: number) => (
                                    <Link
                                      key={`${cat.slug || cat.name}-${i}`}
                                      className="tag-topic"
                                      href={`/list/${cat.slug}`}
                                    >
                                      {cat.name}
                                    </Link>
                                  )
                                )}
                              </div>

                              <div
                                className="description lim-3"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {item.description}
                              </div>

                              {/* Action Buttons */}
                              <div className="touch">
                                <Link
                                  className="button-play"
                                  href={`/phim/${item.slug}`}
                                >
                                  <i className="fa-solid fa-play"></i>
                                </Link>
                                <div className="touch-group">
                                  <button
                                    className="item"
                                    title="Yêu thích"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleToggleFavorite(item.slug);
                                    }}
                                  >
                                    <div className="inc-icon icon-20">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        style={{
                                          color: isFavorite(item.slug)
                                            ? "#ffd875"
                                            : undefined,
                                          transition: "color 0.2s",
                                        }}
                                      >
                                        <path
                                          d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                  <Link
                                    className="item"
                                    href={`/phim/${item.slug}`}
                                    title="Thông tin"
                                  >
                                    <div className="inc-icon icon-20">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                      >
                                        <path
                                          d="M10 0.75C4.47734 0.75 0 5.22734 0 10.75C0 16.2727 4.47734 20.75 10 20.75C15.5227 20.75 20 16.2727 20 10.75C20 5.22734 15.5227 0.75 10 0.75ZM11.2664 14.9523C11.2664 15.1187 11.2337 15.2833 11.17 15.437C11.1064 15.5906 11.0131 15.7302 10.8955 15.8478C10.7779 15.9654 10.6383 16.0587 10.4846 16.1224C10.331 16.186 10.1663 16.2188 10 16.2188C9.83369 16.2188 9.66901 16.186 9.51537 16.1224C9.36172 16.0587 9.22211 15.9654 9.10452 15.8478C8.98692 15.7302 8.89364 15.5906 8.82999 15.437C8.76635 15.2833 8.73359 15.1187 8.73359 14.9523V9.88633C8.73359 9.72002 8.76635 9.55534 8.82999 9.4017C8.89364 9.24805 8.98692 9.10844 9.10452 8.99084C9.22211 8.87325 9.36172 8.77996 9.51537 8.71632C9.66901 8.65268 9.83369 8.61992 10 8.61992C10.1663 8.61992 10.331 8.65268 10.4846 8.71632C10.6383 8.77996 10.7779 8.87325 10.8955 8.99084C11.0131 9.10844 11.1064 9.24805 11.17 9.4017C11.2337 9.55534 11.2664 9.72002 11.2664 9.88633V14.9523Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Thumbs Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView="auto"
                watchSlidesProgress
                className="swiper swiper-thumbs top-slide-small"
              >
                {data.map((item, index) => (
                  <SwiperSlide
                    key={`thumb-${item.slug || index}`}
                    style={{ width: "80px" }}
                  >
                    <div className="v-thumbnail relative w-full aspect-[2/3] rounded-md overflow-hidden">
                      <Image
                        src={item.thumb_url || item.poster_url}
                        alt={`Xem Phim ${item.title} Vietsub HD Online`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
