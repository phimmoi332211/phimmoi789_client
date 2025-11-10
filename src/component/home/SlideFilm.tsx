"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { MovieHoverTooltip, PortalTooltip } from "./MovieHoverTooltip";
import { Define } from "@/types/define";
import Image from "next/image";
import Link from "next/link";

import Film = Define.Film;

interface SlideFilmProps {
  movies: Film[] | any[];
}

const SlideFilm: React.FC<SlideFilmProps> = ({ movies }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      const rect = e.currentTarget.getBoundingClientRect();
      hoverTimeout.current = setTimeout(() => {
        setHoveredIndex(index);
        setTooltipPos({ left: rect.left + rect.width / 2, top: rect.top });
      }, 500);
    };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  // Chuẩn hoá dữ liệu nhưng KHÔNG đổi UI
  const mapSlug = (item: any) => item.slug || item.url || "";
  const mapTitle = (item: any) => item.title || item.name || "";
  const mapAlias = (item: any) =>
    item.name_english || item.origin_name || item.name || "";
  const mapPoster = (item: any) => item.image?.url || "";
  const mapCountryName = (item: any) =>
    item.country?.[0]?.name || item.country?.name || "";

  // Tính số tập cho giao diện hiện tại (giữ nguyên hiển thị {released}/{episodes})
  const getEpisodeInfo = (item: any) => {
    // Dữ liệu mới (type/total_episode/status)
    if (item?.type || item?.total_episode || item?.status) {
      const episodes =
        typeof item.total_episode === "number" && item.total_episode > 0
          ? item.total_episode
          : item.type === "single"
          ? 1
          : 0;
      const released =
        item.status === "complete"
          ? episodes
          : episodes > 0
          ? Math.min(1, episodes) // nếu chưa rõ tập phát hành, mặc định 1/total
          : 0;
      return { episodes, releasedEpisodes: released };
    }

    // Dữ liệu cũ (giữ nguyên logic cũ)
    let episodes = 0;
    let releasedEpisodes = 0;
    const totalMatch = item.episode_total?.match(/(\d+)/);
    if (totalMatch) episodes = parseInt(totalMatch[1], 10);
    const releasedMatch =
      item.status?.match(/Tập\s*(\d+)/) || item.status?.match(/(\d+)\/(\d+)/);
    if (releasedMatch) {
      releasedEpisodes = releasedMatch[1]
        ? parseInt(releasedMatch[1], 10)
        : parseInt(releasedMatch[0].replace(/\D/g, ""), 10);
    } else {
      releasedEpisodes = episodes;
    }
    return { episodes, releasedEpisodes };
  };

  return (
    <div className="effect-fade-in mt-30">
      <div id="collection-CGPoDx">
        <div className="cards-row cards-slide wide">
          <div className="row-header">
            <h1 className="category-name">Hôm nay có gì mới?</h1>
            <div className="cat-more">
              <Link className="line-center" href="/phim-le">
                <span>Xem thêm</span>
                <i className="fa-solid fa-angle-right"></i>
              </Link>
            </div>
          </div>

          <div className="row-content">
            <div className="cards-slide-wrapper relative">
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
                  modules={[Navigation, Autoplay]}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                    320: { slidesPerView: 3 },
                    640: { slidesPerView: 5 },
                    1024: { slidesPerView: 8 },
                  }}
                >
                  {movies.map((item, index) => {
                    const { episodes, releasedEpisodes } = getEpisodeInfo(item);

                    return (
                      <SwiperSlide
                        key={index}
                        style={{ width: 178.571, marginRight: 16 }}
                      >
                        <div
                          className="sw-item"
                          onMouseEnter={handleMouseEnter(index)}
                          onMouseMove={handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          style={{ position: "relative" }}
                        >
                          <Link
                            href={`/phim/${mapSlug(item)}`}
                            className="v-thumbnail block"
                          >
                            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
                              <Image
                                src={mapPoster(item) || "/default-avatar.jpg"}
                                alt={`Xem Phim ${mapTitle(
                                  item
                                )} Vietsub HD Online`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 178px"
                                loading="lazy"
                                unoptimized
                                onError={(e: any) => {
                                  if (
                                    e?.currentTarget?.src !==
                                    "/default-avatar.jpg"
                                  ) {
                                    e.currentTarget.src = "/default-avatar.jpg";
                                  }
                                }}
                              />
                            </div>

                            <div className="pin-new m-pin-new">
                              <div className="line-center line-pd">P.Đề</div>
                            </div>

                            {episodes > 0 && (
                              <div
                                className="episode-badge"
                                style={{
                                  position: "absolute",
                                  left: 8,
                                  top: 8,
                                  background: "rgba(0,0,0,.7)",
                                  color: "#fff",
                                  fontSize: 12,
                                  borderRadius: 8,
                                  padding: "2px 8px",
                                }}
                              >
                                {releasedEpisodes}/{episodes}
                              </div>
                            )}
                          </Link>

                          <div className="info mt-2">
                            <h2 className="item-title lim-1">
                              <Link
                                title={mapTitle(item)}
                                href={`/phim/${mapSlug(item)}`}
                              >
                                {mapTitle(item)}
                              </Link>
                            </h2>
                            <h4 className="alias-title lim-1">
                              <Link
                                title={mapAlias(item)}
                                href={`/phim/${mapSlug(item)}`}
                              >
                                {mapAlias(item)}
                              </Link>
                            </h4>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#fbbd08",
                                fontWeight: 500,
                              }}
                            >
                              {mapCountryName(item)}
                            </div>
                          </div>

                          {hoveredIndex === index && tooltipPos && (
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
                                    ...item,
                                    slug: mapSlug(item),
                                    title: mapTitle(item),
                                    name_english: mapAlias(item),
                                    poster_url: mapPoster(item),
                                  }}
                                />
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
      </div>
    </div>
  );
};

export default SlideFilm;
