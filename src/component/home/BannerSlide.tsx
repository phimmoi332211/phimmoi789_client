"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

interface BannerSlideProps {
  slideData: Array<{
    _id: string;
    year: number;
    status: string;
    total_episode: number;
    duration: number;
    quality: string;
    trailer: string;
    createdAt: string;
    current_episode: number;
    slug: string;
    title: string;
    name_english: string;
    description: string;
    poster_url: string;
    time: string;
    episode_total: string;
    type: Array<{
      name: string;
      url: string;
    }>;
  }>;
}

export default function BannerSlide({ slideData }: BannerSlideProps) {
  const { authUser } = useAuth();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [films, setFilms] = useState<any[]>([]);
  const [casts, setCasts] = useState<any[]>([]);

  function extractMinutes(durationStr: string) {
    if (!durationStr) return null;
    let match = durationStr.match(/(\d+)\s*phút/i);
    if (match) return Number(match[1]);
    match = durationStr.match(/(\d+)h\s*(\d+)m/i);
    if (match) return Number(match[1]) * 60 + Number(match[2]);
    match = durationStr.match(/(\d+)\s*m/i);
    return match ? Number(match[1]) : null;
  }

  const handleToggleFavorite = async (slug: string) => {
    const favorite = isFavorite(slug);
    try {
      // const res = await fetchAddFavorite(slug, !favorite);
      toast.success(
        favorite ? "Đã bỏ khỏi yêu thích!" : "Đã thêm vào yêu thích!"
      );
      if (favorite) {
        setFilms((prev) => prev.filter((film) => film.slug !== slug));
      } else {
        setFilms((prev) => [...prev, { slug }]);
      }
    } catch (err) {
      toast.error(
        !authUser
          ? "Bạn phải đăng nhập để thực hiện chức năng này"
          : favorite
          ? "Bỏ khỏi yêu thích thất bại!"
          : "Thêm vào yêu thích thất bại!",
        err
      );
    }
  };

  useEffect(() => {
    // fetchFilmListLike().then((res: any) => {
    //   setFilms(res?.data?.favorite || []);
    //   setCasts(res?.data?.favoriteCast || []);
    // });
  }, []);

  const isFavorite = (slug: string) => films.some((film) => film.slug === slug);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  return (
    <div id="top_slide">
      <div className="slide-wrapper top-slide-wrap">
        <Swiper
          modules={[EffectFade, Thumbs]}
          effect="fade"
          thumbs={{ swiper: thumbsSwiper }}
          className="swiper top-slide-main"
        >
          {slideData.map((item, index) => {
            const duration = item.time || "";
            const imdb =
              Math.round(((extractMinutes(duration) || 0) / 3) * 100) / 100;
            const tags = item.type ? item.type.map((t) => t.name) : [];
            const href = `/phim/${item.slug}`;

            return (
              <SwiperSlide key={index} data-swiper-slide-index={index}>
                <div className="slide-elements">
                  <Link className="slide-url" href={href}></Link>
                  <div
                    className="background-fade"
                    style={{ backgroundImage: `url("${item.poster_url}")` }}
                  ></div>
                  <div className="cover-fade">
                    <div
                      className="cover-image"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        className="fade-in visible"
                        title={item.title}
                        src={item.poster_url}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="safe-area">
                    <div className="slide-content">
                      <div className="media-item">
                        <div className="media-title-image">
                          <Link title={item.title} href={href}>
                            {/* Sử dụng poster_url làm thumb_url nếu không có thumb_url riêng */}
                            <Image
                              alt={item.title}
                              src={item.poster_url}
                              width={200}
                              height={100}
                              style={{ objectFit: "contain" }}
                            />
                          </Link>
                        </div>
                        <h3 className="media-title" style={{ display: "none" }}>
                          <Link title={item.title} href={href}>
                            {item.title}
                          </Link>
                        </h3>
                        <h3 className="media-alias-title">
                          <Link title={item.name_english} href={href}>
                            {item.name_english || item.title}
                          </Link>
                        </h3>
                        <div className="hl-tags">
                          <div className="tag-imdb">
                            <span>{imdb}</span>
                          </div>
                          {item.quality && (
                            <div className="tag-quality">
                              <span>{item.quality}</span>
                            </div>
                          )}
                          <div className="tag-model">
                            <span className="last">{item.episode_total}</span>
                          </div>
                          <div className="tag-classic">
                            <span>{item.year}</span>
                          </div>
                          {duration && (
                            <div className="tag-classic">
                              <span>{duration}</span>
                            </div>
                          )}
                        </div>
                        <div className="hl-tags mb-4">
                          {tags.map((tag: string, i: number) => (
                            <Link
                              key={i}
                              className="tag-topic"
                              href={`/list/${slugify(tag)}`}
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                        <div className="description lim-3">
                          {item.description}
                        </div>
                        <div className="touch">
                          <Link
                            className="button-play"
                            href={`/phim/${item.slug}`}
                          >
                            <i className="fa-solid fa-play"></i>
                          </Link>
                          <div className="touch-group">
                            <a
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
                            </a>
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
                                    d="M10 0.75C4.47734 0.75 0 5.22734 0 10.75C0 16.2727 4.47734 20.75 10 20.75C15.5227 20.75 20 16.2727 20 10.75C20 5.22734 15.5227 0.75 10 0.75ZM11.2664 14.9523C11.2664 15.1187 11.2337 15.2833 11.17 15.437C11.1064 15.5906 11.0131 15.7302 10.8955 15.8478C10.7779 15.9654 10.6383 16.0587 10.4846 16.1224C10.331 16.186 10.1663 16.2188 10 16.2188C9.83369 16.2188 9.66901 16.186 9.51537 16.1224C9.36172 16.0587 9.22211 15.9654 9.10452 15.8478C8.98692 15.7302 8.89364 15.5906 8.82999 15.437C8.76635 15.2833 8.73359 15.1187 8.73359 14.9523V9.88633C8.73359 9.72002 8.76635 9.55534 8.82999 9.4017C8.89364 9.24805 8.98692 9.10844 9.10452 8.99084C9.22211 8.87325 9.36172 8.77996 9.51537 8.71632C9.66901 8.65268 9.83369 8.61992 10 8.61992C10.1663 8.61992 10.331 8.65268 10.4846 8.71632C10.6383 8.77996 10.7779 8.87325 10.8955 8.99084C11.0131 9.10844 11.1064 9.24805 11.17 9.4017C11.2337 9.55534 11.2664 9.72002 11.2664 9.88633V14.9523ZM10 7.81406C9.74953 7.81406 9.50468 7.73979 9.29642 7.60063C9.08816 7.46148 8.92584 7.26369 8.82999 7.03229C8.73414 6.80088 8.70906 6.54625 8.75793 6.30059C8.80679 6.05493 8.92741 5.82928 9.10452 5.65217C9.28163 5.47506 9.50728 5.35445 9.75294 5.30558C9.9986 5.25672 10.2532 5.2818 10.4846 5.37765C10.716 5.4735 10.9138 5.63582 11.053 5.84408C11.1921 6.05234 11.2664 6.29718 11.2664 6.54766C11.2665 6.71398 11.2337 6.87868 11.1701 7.03235C11.1065 7.18602 11.0132 7.32565 10.8956 7.44326C10.778 7.56086 10.6384 7.65414 10.4847 7.71777C10.331 7.78139 10.1663 7.81411 10 7.81406Z"
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

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView="auto"
          watchSlidesProgress={true}
          className="swiper top-slide-small swiper-thumbs"
        >
          <div className="swiper-wrapper">
            {slideData.map((item) => (
              <SwiperSlide
                key={item._id}
                className="swiper-slide"
                style={{ width: "64.5px", marginRight: "5px" }}
              >
                <Image
                  alt={`Xem Phim ${item.title} Vietsub HD Online - Rophimmoi`}
                  loading="lazy"
                  src={item.poster_url}
                  width={64}
                  height={96}
                  style={{ objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
