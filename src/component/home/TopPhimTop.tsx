"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MovieHoverTooltip, PortalTooltip } from "./MovieHoverTooltip";
import { Define } from "@/types/define";
import Link from "next/link";
import Image from "next/image";
import { toAbsoluteImageUrl } from "@/help/helper";
// import Film = Define.Film;

export interface MovieCategory {
  title: string;
  gradient: string;
  // movies nhận dữ liệu “thô” từ API mới
  movies: any[];
  slug: string;
}

type NormalizedMovie = {
  slug: string;
  title: string;
  name_english: string;
  poster_url: string;
  episode_total: string; // ví dụ "26 Tập" hoặc "1 Tập"
  status_label: string; // "Hoàn Tất" | "Đang Chiếu" | ...
  quality?: string;
};

const toStatusLabel = (status?: string) => {
  if (!status) return "";
  return status === "complete" ? "Hoàn Tất" : "Đang Chiếu";
};

const toEpisodeLabel = (type?: string, total?: number) => {
  if (type === "series") {
    return typeof total === "number" && total > 0 ? `${total} Tập` : "Tập mới";
  }
  return "1 Tập";
};

const normalizeMovie = (m: any): NormalizedMovie => ({
  slug: m?.url || "",
  title: m?.name || "",
  name_english: m?.origin_name || m?.name || "",
  poster_url: m?.thumbnail || "",
  episode_total: toEpisodeLabel(m?.type, m?.total_episode),
  status_label: toStatusLabel(m?.status),
  quality: m?.quality,
});

interface MovieSliderProps {
  category: MovieCategory;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ category }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const rect = cardRefs.current[index]?.getBoundingClientRect();
    if (rect)
      setTooltipPos({ left: rect.left + rect.width / 2, top: rect.top });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  return (
    <div className="row-topic">
      <div className="intro">
        <div
          className="heading-md text-gradient mb-0"
          style={{ background: category.gradient }}
        >
          {category.title}
        </div>
        <div className="info">
          <Link className="line-center" href={category.slug}>
            <span>Xem toàn bộ</span>
            <i className="fa-solid fa-angle-right"></i>
          </Link>
        </div>
      </div>

      <div className="row-content">
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1420,
            margin: "0 auto",
          }}
        >
          <button
            ref={prevRef}
            type="button"
            className="sw-button sw-prev"
            style={{
              position: "absolute",
              left: -20,
              top: "23%",
              zIndex: 10,
              background: "#fff",
              border: "none",
              width: 40,
              height: 40,
              borderRadius: "50%",
              boxShadow: "0 1px 8px rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: 0.92,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.92")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.3335 12.6667L5.66683 8.00004L10.3335 3.33337"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            type="button"
            className="sw-button sw-next"
            style={{
              position: "absolute",
              right: -20,
              top: "23%",
              zIndex: 10,
              background: "#fff",
              border: "none",
              width: 40,
              height: 40,
              borderRadius: "50%",
              boxShadow: "0 1px 8px rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: 0.92,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.92")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.66675 3.33341L10.3334 8.00008L5.66675 12.6667"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="cards-slide-wrapper"
            style={{ width: "100%", overflow: "hidden", position: "relative" }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              spaceBetween={8}
              slidesPerView={"auto"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 8 },
                641: { slidesPerView: 5, spaceBetween: 8 },
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="swiper"
              style={{ paddingBottom: 20 }}
            >
              {category.movies.map((raw, index) => {
                const movie = normalizeMovie(raw);
                return (
                  <SwiperSlide key={index} style={{ width: 239.2 }}>
                    <div
                      ref={(el) => {
                        if (el) cardRefs.current[index] = el;
                      }}
                      className="sw-cover single"
                      style={{ position: "relative" }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        className="v-thumbnail v-thumbnail-hoz"
                        href={`/phim/${movie.slug}`}
                      >
                        <div className="pin-new m-pin-new">
                          <div className="line-center line-pd w-full">
                            <strong className="px-1 bg-[#0b4d83] text-white">
                              {movie.episode_total.includes("Tập")
                                ? movie.episode_total.replace(" Tập", "T")
                                : movie.episode_total}
                            </strong>
                            {movie.status_label && (
                              <strong className="px-2 bg-[#2ca35d] text-white">
                                {movie.status_label}
                              </strong>
                            )}
                          </div>
                        </div>

                        <div>
                          <Image
                            alt={movie.title}
                            loading="lazy"
                            src={
                              toAbsoluteImageUrl(movie.poster_url) ||
                              "/default-avatar.jpg"
                            }
                            width={240}
                            height={360}
                            className="w-full h-auto"
                            unoptimized
                            // onError={(e: any) => {
                            //   if (
                            //     e?.currentTarget?.src !== "/default-avatar.jpg"
                            //   ) {
                            //     e.currentTarget.src = "/default-avatar.jpg";
                            //   }
                            // }}
                          />
                        </div>
                      </Link>

                      <div className="h-item">
                        <div className="info">
                          <h4 className="item-title lim-1">
                            <Link
                              title={movie.title}
                              href={`/phim/${movie.slug}`}
                            >
                              {movie.title}
                            </Link>
                          </h4>
                          <h4 className="alias-title lim-1">
                            <Link
                              title={movie.name_english}
                              href={`/phim/${movie.slug}`}
                            >
                              {movie.name_english}
                            </Link>
                          </h4>
                        </div>
                      </div>

                      {hoveredIndex === index && tooltipPos && (
                        <PortalTooltip>
                          <div
                            className="tooltip-custom"
                            style={{
                              position: "fixed",
                              left: tooltipPos.left,
                              top: tooltipPos.top - 220,
                              transform: "translateX(-50%)",
                              zIndex: 2000,
                              pointerEvents: "auto",
                            }}
                          >
                            {/* Truyền movie đã normalize để tooltip dùng được */}
                            <MovieHoverTooltip movie={movie as any} />
                          </div>
                        </PortalTooltip>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MovieListProps {
  hanMovies: any[];
  trungMovies: any[];
  aumyMovies: any[];
}

const MovieList: React.FC<MovieListProps> = ({
  hanMovies,
  trungMovies,
  aumyMovies,
}) => {
  const movieCategories: MovieCategory[] = [
    {
      title: "Phim Hàn Quốc mới",
      gradient:
        "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(103, 65, 150) 130%)",
      movies: hanMovies,
      slug: "/quoc-gia/han-quoc",
    },
    {
      title: "Phim Trung Quốc mới",
      gradient:
        "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(247, 161, 11) 130%)",
      movies: trungMovies,
      slug: "/quoc-gia/trung-quoc",
    },
    {
      title: "Phim US-UK mới",
      gradient:
        "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(255, 0, 153) 130%)",
      movies: aumyMovies,
      slug: "/quoc-gia/au-my",
    },
  ];

  return (
    <div id="wrapper" className="wrapper-w-slide">
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="topics-list single  mt-[40]">
            {movieCategories.map((category, index) => (
              <MovieSlider key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
