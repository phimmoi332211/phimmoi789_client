"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "@/ultis/ultis";
import { MovieHoverTooltip, PortalTooltip } from "../home/MovieHoverTooltip";
import { useFavorite } from "@/context/FavoriteContext";
import { Define } from "@/types/define";
import Film = Define.Film;
// import { fetchAddFavoriteCast, fetchFilmListLike } from "@/help/helper";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
type Actor = {
  slug: string;
  name: string;
  profile_path: string;
};

export default function FavoriteComponent() {
  const { authUser, setAuthUser } = useAuth();
  const router = useRouter();
  const { films, casts, setCasts } = useFavorite();
  const [tab, setTab] = useState<"movies" | "casts">("movies");
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authUser) {
        toast.warning("Bạn cần đăng nhập để truy cập trang này");
        router.push("/phim-hay");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [authUser]);
  // Reset tooltip khi đổi tab
  useEffect(() => {
    setHoveredIndex(null);
    setTooltipPos(null);
  }, [tab]);

  // Tooltip logic
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const rect = cardRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        left: rect.left + rect.width / 2 + window.scrollX,
        top: rect.top + window.scrollY,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  const handleRemoveFavoriteActor = async (slug: string) => {
    const prevCasts = casts;
    try {
      // // Gọi API để bỏ yêu thích (truyền false)
      // await fetchAddFavoriteCast(slug, false);
      setCasts((prev) => prev.filter((a) => a.slug !== slug));
      toast.success("Đã bỏ khỏi yêu thích!");
    } catch (err) {
      // Rollback nếu lỗi
      setCasts(prevCasts);
      toast.error("Bỏ khỏi yêu thích thất bại!", err);
    }
  };

  return (
    <div className="cg-body-box py-0 is-like">
      <div className="box-header flex-column align-items-start gap-3">
        <div className="heading-sm mb-0">Yêu thích</div>
        <div className="row-tabs">
          <div className="v-tabs mb-0 nav nav-pills" role="tablist">
            <Link
              role="tab"
              aria-selected={tab === "movies"}
              className={`nav-link${tab === "movies" ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("movies");
              }}
              href="#"
            >
              Phim
            </Link>
            <Link
              role="tab"
              aria-selected={tab === "casts"}
              className={`nav-link${tab === "casts" ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("casts");
              }}
              href="#"
            >
              Diễn viên
            </Link>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="tab-content">
          {/* Tab Phim yêu thích */}
          <div
            role="tabpanel"
            className={`fade tab-pane${tab === "movies" ? " active show" : ""}`}
          >
            <div className="cards-grid-wrapper de-suggest">
              {films && films.length > 0 ? (
                films.map((film: Film, index: number) => (
                  <div
                    key={film.slug || index}
                    className="sw-item sw-item-custom"
                    ref={(el: HTMLDivElement | null) => {
                      if (el) {
                        cardRefs.current[index] = el;
                      }
                    }}
                    style={{ position: "relative" }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      className="v-thumbnail"
                      href={`${NAVIGATION.INFO}/${film.slug}`}
                      tabIndex={-1}
                    >
                      <div className="pin-new m-pin-new">
                        <div className="line-center line-pd">
                          {film.quality}
                        </div>
                        <div className="line-center line-tm">{film.lang}</div>
                        {film.episode_total &&
                          film.episode_total.includes("Tập") && (
                            <div className="line-center line-lt">
                              {film.episode_total.replace(" Tập", "T")}
                            </div>
                          )}
                      </div>
                      <div>
                        <Image
                          width={100}
                          height={140}
                          className="img-2"
                          alt={film.title}
                          src={film.thumb_url || film.poster_url || ""}
                          unoptimized
                          priority
                        />
                      </div>
                    </Link>
                    <div className="info">
                      <h4 className="item-title lim-1">
                        <Link
                          title={film.title}
                          href={`${NAVIGATION.INFO}/${film.slug}`}
                        >
                          {film.title}
                        </Link>
                      </h4>
                      {film.name_english && (
                        <h4 className="alias-title lim-1">
                          <Link
                            title={film.name_english}
                            href={`${NAVIGATION.INFO}/${film.slug}`}
                          >
                            {film.name_english}
                          </Link>
                        </h4>
                      )}
                    </div>
                    {hoveredIndex === index && tooltipPos && (
                      <PortalTooltip>
                        <div
                          className="tooltip-custom"
                          style={{
                            position: "absolute",
                            left: tooltipPos.left,
                            top: tooltipPos.top - 20,
                            transform: "translateX(-50%)",
                            zIndex: 2000,
                            pointerEvents: "auto",
                          }}
                        >
                          {/* <MovieHoverTooltip movie={film} /> */}
                        </div>
                      </PortalTooltip>
                    )}
                  </div>
                ))
              ) : (
                <div>Chưa có phim yêu thích.</div>
              )}
            </div>
          </div>
          {/* Tab Diễn viên yêu thích */}
          <div
            role="tabpanel"
            className={`fade tab-pane${tab === "casts" ? " active show" : ""}`}
          >
            <div className="de-actors">
              {casts && casts.length > 0 ? (
                casts.map((actor: Actor, idx: number) => (
                  <div key={actor.slug || idx} className="item-actor">
                    <div className="v-item">
                      <Link
                        className="v-actor"
                        href={`/dien-vien/${actor.slug}`}
                      >
                        <Image alt={actor.name} src={actor.profile_path} fill />
                      </Link>
                      <div className="info">
                        <h4 className="item-title">
                          <Link href={`/dien-vien/${actor.slug}`}>
                            {actor.name}
                          </Link>
                        </h4>
                        <a
                          className="small line-center text-danger mt-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveFavoriteActor(actor.slug)}
                        >
                          <i className="fa-solid fa-trash"></i>
                          <span>Xoá</span>
                        </a>
                      </div>
                    </div>
                    <div className="ro-play"></div>
                  </div>
                ))
              ) : (
                <div>Chưa có diễn viên yêu thích.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
