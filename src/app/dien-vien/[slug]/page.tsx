"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  fetchActorDetail,
  fetchMovies,
  fetchContries,
  fetchCategories,
} from "@/help/helper";
import FilterControls from "@/component/common/FilterControl";
import Loading from "@/component/lazyLoading/loading.component";
import { NAVIGATION } from "@/ultis/ultis";
import {
  MovieHoverTooltip,
  PortalTooltip,
} from "@/component/home/MovieHoverTooltip";
import ReactPaginate from "react-paginate";
import { Film } from "@/types/model/film.d";
import { FilterState } from "@/types/param/filterState.param";

export default function DienVienPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [actor, setActor] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [moviesMeta, setMoviesMeta] = useState<any>(null);

  // states cho list
  const defaultFilters: FilterState = {
    type: "",
    country: "",
    year: "",
    order: "",
    category: "",
  };
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
  const [pagination, setPaginate] = useState<{
    current?: number;
    pageSize?: number;
    pages?: number;
    totalPages?: number;
  }>({ current: 1, pageSize: 40, pages: 1, totalPages: 1 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setLoading(true);
        const [actorRes, resCountries, resTypes] = await Promise.all([
          fetchActorDetail(slug),
          fetchContries({ limit: 50 }),
          fetchCategories({ limit: 50 }),
        ]);
        const actorData = (actorRes as any)?.data?.data || null;
        setActor(actorData);
        setCountries((resCountries as any)?.data?.data || []);
        setTypes((resTypes as any)?.data?.data || []);

        // Ưu tiên dùng actor.url nếu có; fallback dùng slug
        const actorKey = actorData?.url || slug;
        const moviesRes: any = await fetchMovies({
          page: 1,
          limit: 40,
          actor: actorKey,
        });
        setMovies((moviesRes?.data?.data?.result as any[]) || []);
        setMoviesMeta(moviesRes?.data?.data?.meta || null);
        setPaginate({
          current: moviesRes?.data?.data?.meta?.page || 1,
          pageSize: moviesRes?.data?.data?.meta?.limit || 40,
          pages: moviesRes?.data?.data?.meta?.totalPages || 1,
          totalPages: moviesRes?.data?.data?.meta?.totalPages || 1,
        });
      } finally {
        setLoading(false);
      }
    };
    if (slug) bootstrap();
  }, [slug]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const rect = cardRefs.current[index]?.getBoundingClientRect();
    if (rect)
      setTooltipPos({
        left: rect.left + rect.width / 2 + window.scrollX,
        top: rect.top + window.scrollY,
      });
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchActorMovies = async (page: number) => {
    setIsFilterMode(true);
    const actorKey = actor?.url || slug;
    const res: any = await fetchMovies({
      page,
      limit: 40,
      type: filters.category || undefined,
      country: filters.country || undefined,
      category: filters.type || undefined,
      year: filters.year || undefined,
      actor: actorKey,
    });
    setMovies(res?.data?.data?.result || []);
    setMoviesMeta(res?.data?.data?.meta || null);
    setPaginate({
      pageSize: res?.data?.data?.meta?.limit,
      current: res?.data?.data?.meta?.page,
      pages: res?.data?.data?.meta?.totalPages,
      totalPages: res?.data?.data?.meta?.totalPages,
    });
    setIsFilterMode(false);
  };

  const handleFilterSearch = async () => {
    setPaginate((prev) => ({ ...prev, current: 1 }));
    await fetchActorMovies(1);
  };

  const avatar = actor?.profile_path || "/default-avatar.jpg";

  return (
    <div id="wrapper">
      <h1 style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {actor?.name || "Diễn viên"} - Xem Phim Hay
      </h1>
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="w-full grid grid-cols-12 gap-6">
            {/* Left: Actor Info */}
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-5">
                <Image
                  src={avatar}
                  alt={actor?.name || "actor"}
                  width={220}
                  height={220}
                  className="rounded-2xl object-cover w-[220px] h-[220px]"
                  onError={(e: any) => {
                    if (e?.currentTarget?.src !== "/default-avatar.jpg") {
                      e.currentTarget.src = "/default-avatar.jpg";
                    }
                  }}
                  unoptimized
                />

                <h2 className="text-3xl font-semibold text-white">
                  {actor?.name || "Đang cập nhật"}
                </h2>

                <div className="flex items-center gap-6 text-gray-300">
                  <button type="button" className="flex items-center gap-2">
                    <i className="fa-regular fa-heart"></i>
                    <span>Yêu thích</span>
                  </button>
                  <button type="button" className="flex items-center gap-2">
                    <i className="fa-regular fa-paper-plane"></i>
                    <span>Chia sẻ</span>
                  </button>
                </div>

                <div className="text-gray-300 space-y-3">
                  <div>
                    <span className="text-gray-400">Tên gọi khác:</span>
                    <span className="ml-2">
                      {actor?.name || "Đang cập nhật"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Giới thiệu:</span>
                    <span className="ml-2">Đang cập nhật</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Giới tính:</span>
                    <span className="ml-2">
                      {actor?.gender || "Đang cập nhật"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ngày sinh:</span>
                    <span className="ml-2">
                      {actor?.birthday || "Đang cập nhật"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Movies List */}
            <div className="col-span-12 md:col-span-9">
              <div className="row-header">
                <h3 className="category-name">Các phim đã tham gia</h3>
              </div>

              <div className="row-content">
                {loading || isFilterMode ? (
                  <Loading />
                ) : (
                  <div className="cards-grid-wrapper">
                    {movies.map((film: Film, index: number) => (
                      <div
                        key={index}
                        className="sw-item sw-item-custom"
                        ref={(el) => {
                          if (el) cardRefs.current[index] = el;
                        }}
                        style={{ position: "relative" }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          className="v-thumbnail"
                          href={`${NAVIGATION.INFO}/${film.url}`}
                        >
                          <div className="pin-new !flex-none m-pin-new">
                            <div className="line-center line-pd">
                              {film.quality}
                            </div>
                            {film.total_episode && (
                              <div className="line-center line-lt">
                                T{film.total_episode.toString()}
                              </div>
                            )}
                          </div>
                          <div>
                            <Image
                              width={100}
                              height={100}
                              className="img-2"
                              alt={film.name || "poster"}
                              data-src={film.thumbnail || "/default-avatar.jpg"}
                              src={film.thumbnail || "/default-avatar.jpg"}
                              onError={(e: any) => {
                                if (
                                  e?.currentTarget?.src !==
                                  "/default-avatar.jpg"
                                ) {
                                  e.currentTarget.src = "/default-avatar.jpg";
                                }
                              }}
                              unoptimized
                              priority
                            />
                          </div>
                        </Link>
                        <div className="info">
                          <h4 className="item-title lim-1">
                            <Link
                              title={film.name}
                              href={`${NAVIGATION.INFO}/${film.url}`}
                            >
                              {film.name}
                            </Link>
                          </h4>
                          <h4 className="alias-title lim-1">
                            <Link
                              title={film.origin_name}
                              href={`${NAVIGATION.INFO}/${film.url}`}
                            >
                              {film.origin_name}
                            </Link>
                          </h4>
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
                              <MovieHoverTooltip movie={film} />
                            </div>
                          </PortalTooltip>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="v-pagination line-center">
                {isMobile ? (
                  <div className="mobile-pagination flex items-center justify-center gap-3 py-3">
                    <button
                      type="button"
                      className="btn btn-circle btn-lg btn-secondary"
                      onClick={() => {
                        if ((pagination.current || 1) > 1) {
                          const next = (pagination.current || 1) - 1;
                          setPaginate({ ...pagination, current: next });
                          fetchActorMovies(next);
                        }
                      }}
                      disabled={pagination.current === 1}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <span className="text-base font-semibold">
                      {pagination.current}/{pagination.pages}
                    </span>
                    <button
                      type="button"
                      className="btn btn-circle btn-lg btn-secondary"
                      onClick={() => {
                        if (
                          (pagination.current || 1) < (pagination.pages || 1)
                        ) {
                          const next = (pagination.current || 1) + 1;
                          setPaginate({ ...pagination, current: next });
                          fetchActorMovies(next);
                        }
                      }}
                      disabled={pagination.current === pagination.pages}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                ) : (
                  <ReactPaginate
                    forcePage={(pagination.current || 1) - 1}
                    pageCount={Math.ceil(pagination.pages ?? 1)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={3}
                    onPageChange={({ selected }) => {
                      const next = selected + 1;
                      setPaginate({ ...pagination, current: next });
                      fetchActorMovies(next);
                    }}
                    previousLabel={
                      <button
                        type="button"
                        className="btn btn-circle btn-lg btn-secondary"
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                    }
                    nextLabel={
                      <button
                        type="button"
                        className="btn btn-circle btn-lg btn-secondary"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    }
                    breakLabel={"..."}
                    activeLinkClassName={"current"}
                    previousClassName="group"
                    nextClassName="group"
                    pageLinkClassName="page-current line-center"
                    containerClassName="page-control line-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
