"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MovieHoverTooltip, PortalTooltip } from "./MovieHoverTooltip";
import Image from "next/image";
import Link from "next/link";

// Hàm tiện ích trích số tập, số tập đã phát hành, số phút
function extractEpisodes(status: string, episode_total: string) {
  // Lấy tổng số tập
  const totalMatch = episode_total?.match(/(\d+)/);
  const episodes = totalMatch ? parseInt(totalMatch[1], 10) : 0;
  // Lấy số tập đã phát hành
  let releasedEpisodes;
  const releasedMatch =
    status?.match(/(\d+)\/(\d+)/) || status?.match(/Tập\s*(\d+)/);
  if (releasedMatch) {
    releasedEpisodes = releasedMatch[1]
      ? parseInt(releasedMatch[1], 10)
      : parseInt(releasedMatch[0].replace(/\D/g, ""), 10);
  }
  return { episodes, releasedEpisodes };
}

function extractMinutesFromDuration(duration?: number): number {
  return typeof duration === "number" ? duration : 0;
}

function extractSeason(title: string) {
  const seasonMatch = title?.match(/(?:Phần|Season)\s*(\d+)/i);
  return seasonMatch ? seasonMatch[1] : undefined;
}

interface Top10Props {
  movies: any[];
  title: string;
}

// Chuẩn hoá dữ liệu phim mới về định dạng component đang dùng (GIỮ NGUYÊN UI)
const normalizeMovie = (m: any) => {
  const type = m?.type; // "single" | "series"
  const total = typeof m?.total_episode === "number" ? m.total_episode : 0;
  // tạo chuỗi episode_total dạng "n Tập" để code cũ xử lý
  const episode_total =
    type === "series" ? (total ? `${total} Tập` : "0 Tập") : "1 Tập";
  // tạo status dạng "x/y" để extractEpisodes đọc được released
  const status =
    type === "series"
      ? m?.status === "complete"
        ? `${total}/${total}`
        : total > 0
          ? `1/${total}`
          : ""
      : "1/1";

  return {
    // các trường UI đang dùng
    slug: m?.slug || m?.url || "",
    title: m?.title || m?.name || "",
    name_english: m?.name_english || m?.origin_name || m?.name || "",
    poster_url: m?.image?.url || "",
    alt: m?.image?.alt || "",
    caption: m?.image?.caption || "",
    title_image: m?.image?.title || "",
    quality: m?.quality,
    time: m?.time, // fallback nếu có
    duration: m?.duration, // số phút (dữ liệu mới)
    episode_total,
    status,
    // cho tooltip/tags
    category: Array.isArray(m?.category) ? m.category : [],
    country: Array.isArray(m?.country)
      ? m.country
      : m?.country
        ? [m.country]
        : [],
    // giữ nguyên các field còn lại dùng trong tooltip
    ...m,
  };
};

const Top10: React.FC<Top10Props> = ({ movies, title }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Tooltip hover logic
  const handleMouseEnter =
    (index: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      hoverTimeout.current = setTimeout(() => {
        setHoveredIndex(index);
        setTooltipPos({
          left: rect.left + rect.width / 2,
          top: rect.top,
        });
      }, 500);
    };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  // Chuẩn hoá dữ liệu ngay trước khi render (không đổi UI)
  const data = movies.map(normalizeMovie);

  return (
    <div className="effect-fade-in mt-30">
      <div id="collection-top10">
        <div className="cards-row cards-slide wide">
          <div className="row-header">
            <h2 className="category-name">{title}</h2>
          </div>
          <div className="row-content">
            <div
              className="cards-slide-wrapper top-up"
              style={{ position: "relative" }}
            >
              {/* Navigation Buttons */}
              <div className="sw-navigation">
                <button
                  type="button"
                  className="sw-button sw-next"
                  ref={nextRef}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.66675 3.33341L10.3334 8.00008L5.66675 12.6667"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="sw-button sw-prev"
                  ref={prevRef}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.3335 12.6667L5.66683 8.00004L10.3335 3.33337"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {/* Swiper */}
              <div
                className="cards-slide-wrapper"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Swiper
                  className="swiper swiper-initialized swiper-horizontal"
                  slidesPerView={5}
                  spaceBetween={16}
                  loop
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 },
                  }}
                >
                  {data.map((movie, idx) => {
                    const { episodes, releasedEpisodes } = extractEpisodes(
                      movie.status,
                      movie.episode_total
                    );
                    // dùng duration (phút) nếu có, fallback về time cũ
                    const minutes = extractMinutesFromDuration(movie.duration);
                    const imdb = minutes
                      ? Math.round((minutes / 3) * 100) / 100
                      : undefined;
                    const season = extractSeason(movie.title);
                    const tags = [
                      ...(movie.category?.map((cat: any) => cat.name) || []),
                      ...((Array.isArray(movie.country)
                        ? movie.country
                        : []
                      )?.map((c: any) => c.name) || []),
                    ];
                    return (
                      <SwiperSlide
                        key={idx}
                        style={{ width: 240, marginRight: 16 }}
                      >
                        <div
                          className="sw-item"
                          onMouseEnter={handleMouseEnter(idx)}
                          onMouseMove={handleMouseEnter(idx)}
                          onMouseLeave={handleMouseLeave}
                          style={{ position: "relative" }}
                        >
                          {/* Tooltip */}
                          {hoveredIndex === idx && tooltipPos && (
                            <PortalTooltip>
                              <div
                                style={{
                                  position: "fixed",
                                  left: tooltipPos.left,
                                  top: Math.max(tooltipPos.top - 230, 16),
                                  transform: "translateX(-50%)",
                                  zIndex: 2000,
                                  pointerEvents: "auto",
                                }}
                              >
                                <MovieHoverTooltip
                                  movie={{
                                    ...movie,
                                    episodes,
                                    releasedEpisodes,
                                    imdb,
                                    season,
                                    tags,
                                  }}
                                />
                              </div>
                            </PortalTooltip>
                          )}
                          <Link
                            className="v-thumbnail"
                            href={`/phim/${movie.slug}`}
                          >
                            <div className="mask"></div>
                            <div>
                              <Image
                                alt={movie?.alt}
                                loading="lazy"
                                src={movie?.poster_url || "/default-avatar.jpg"}
                                className="rounded-lg"
                                fill
                              />
                            </div>
                          </Link>
                          <div className="info info-v w-chart">
                            <div className="number">{idx + 1}</div>
                            <h2 className="item-title lim-1">
                              <Link
                                title={movie.title}
                                href={`/phim/${movie.slug}`}
                              >
                                {movie.title}
                              </Link>
                            </h2>
                            <div className="alias-title lim-1">
                              {movie.name_english}
                            </div>
                            <div className="info-line">
                              <div className="tag-small">{movie.quality}</div>
                              {season && (
                                <div className="tag-small">Phần {season}</div>
                              )}
                              <div className="tag-small">Tập {episodes}</div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10;
