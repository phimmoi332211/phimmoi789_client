"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { NAVIGATION } from "@/ultis/ultis";
import { fetchCategories, fetchContries, fetchMovies } from "@/help/helper";
import type { ApiResponse } from "@/types/list";
import { Film } from "@/types/model/film.d";
import { FilterState } from "@/types/param/filterState.param";
import {
  MovieHoverTooltip,
  PortalTooltip,
} from "@/component/home/MovieHoverTooltip";
import ReactPaginate from "react-paginate";
import FilterControls from "@/component/common/FilterControl";
export const runtime = "edge";

// --- Type Definitions ---
type Category = { _id: string; name: string; url: string };

const defaultFilters: FilterState = {
  type: "",
  country: "",
  year: "",
  order: "",
  category: "",
};

const PAGE_SIZE = 40;

export default function SearchPage() {
  const { slug } = useParams() as { slug: string };
  const formattedSlug = decodeURIComponent(slug).replace(/\+/g, " ");

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [countryList, setCountryList] = useState<Category[]>([]);
  const [typeList, setTypeList] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Film[]>([]);
  const [pagination, setPagination] = useState({ current: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const [categories, countries] = (await Promise.all([
        fetchCategories({ limit: 50 }),
        fetchContries({ limit: 50 }),
      ])) as [any, any];
      setCategoryList(
        (categories.data?.data || []).map((cat: any) => ({
          _id: cat._id,
          name: cat.name,
          url: cat.url,
        }))
      );
      setCountryList(
        (countries.data?.data || []).map((country: any) => ({
          _id: country._id,
          name: country.name,
          url: country.url,
        }))
      );

      setTypeList([
        { _id: "series", name: "Phim bộ", url: "series" },
        { _id: "single", name: "Phim lẻ", url: "single" },
        { _id: "anime", name: "Phim ngắn", url: "anime" },
      ]);
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    setFilters(defaultFilters);
    setPagination({ current: 1, totalPages: 1 });
    setIsFiltering(false);
    fetchSearchData(1, slug);
  }, [slug]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, movies.length);
  }, [movies]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagination.current]);

  const fetchSearchData = async (page: number, currentSlug = slug) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res: any = await fetchMovies({
        page,
        limit: PAGE_SIZE,
        search: currentSlug,
      });

      if (res.statusCode === 200) {
        const moviesData = (res.data?.data?.result || []).map((movie: any) => ({
          ...movie,
          // Map API response to Film interface
          name: movie.name || movie.title,
          url: movie.url || movie.slug,
          thumbnail: movie.thumbnail || movie.thumb_url || movie.poster_url,
          origin_name: movie.origin_name || movie.name_english,
          total_episode: movie.total_episode || movie.episode_total,
          status: movie.status as any,
        }));

        setMovies(moviesData);
        setPagination({
          current: res.data?.meta?.current || page,
          totalPages: res.data?.meta?.pages || 1,
        });
      } else {
        toast(res.message || "Không tìm thấy phim phù hợp!", { type: "info" });
        setMovies([]);
      }
    } catch (err) {
      toast("Có lỗi khi tìm kiếm phim!", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterData = async (page: number) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setIsFiltering(true);
      const res: any = await fetchMovies({
        page,
        limit: PAGE_SIZE,
        search: formattedSlug,
        ...filters,
      });
      if (res.statusCode === 200) {
        const moviesData = (res.data?.data?.result || []).map((movie: any) => ({
          ...movie,
          // Map API response to Film interface
          name: movie.name || movie.title,
          url: movie.url || movie.slug,
          thumbnail: movie.thumbnail || movie.thumb_url || movie.poster_url,
          origin_name: movie.origin_name || movie.name_english,
          total_episode: movie.total_episode || movie.episode_total,
          status: movie.status as any,
        }));

        setMovies(moviesData);
        setPagination({
          current: res.data?.meta?.current || page,
          totalPages: res.data?.meta?.pages || 1,
        });
      } else {
        toast("Không tìm thấy kết quả phù hợp!", { type: "info" });
        setMovies([]);
      }
    } catch {
      toast("Có lỗi khi lọc phim!", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSearch = () => {
    setPagination({ current: 1, totalPages: 1 });
    fetchFilterData(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    setPagination((prev) => ({ ...prev, current: page }));
    isFiltering ? fetchFilterData(page) : fetchSearchData(page);
  };

  const handleMouseEnter = (idx: number) => {
    setHoveredIndex(idx);
    const card = cardRefs.current[idx];
    if (card) {
      const rect = card.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2 + window.scrollX,
        top: rect.top + window.scrollY,
      });
    }
  };

  return (
    <div id="wrapper">
      <h1 style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        Tìm kiếm phim - {formattedSlug}
      </h1>
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="row-header">
            <h3 className="category-name">
              Kết quả tìm kiếm cho: {formattedSlug}
            </h3>
          </div>

          <FilterControls
            filters={filters}
            typeList={typeList}
            countryList={countryList}
            onFilterChange={handleFilterChange}
            onFilterSearch={handleFilterSearch}
          />

          <div className="row-content">
            <div className="cards-grid-wrapper">
              {isLoading && (
                <div className="loading-search">Đang tải kết quả...</div>
              )}
              {!isLoading && movies.length === 0 && (
                <div className="no-result-search">
                  Không tìm thấy phim phù hợp!
                </div>
              )}
              {!isLoading &&
                movies.map((film, index) => (
                  <div
                    key={index}
                    className="sw-item sw-item-custom"
                    ref={(el) => {
                      if (el) cardRefs.current[index] = el;
                    }}
                    style={{ position: "relative" }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      className="v-thumbnail"
                      href={`${NAVIGATION.INFO}/${film.url || ""}`}
                    >
                      <div className="pin-new m-pin-new">
                        <div className="line-center line-pd">
                          {film.quality}
                        </div>
                        <div className="line-center line-tm">Vietsub</div>
                        {film.total_episode && (
                          <div className="line-center line-lt">
                            {film.total_episode}T
                          </div>
                        )}
                      </div>
                      <div>
                        <Image
                          width={100}
                          height={100}
                          className="img-2"
                          alt={film.name || ""}
                          src={film.thumbnail || "/default-avatar.jpg"}
                          unoptimized
                          priority
                        />
                      </div>
                    </Link>
                    <div className="info">
                      <h4 className="item-title lim-1">
                        <Link
                          title={film.name || ""}
                          href={`${NAVIGATION.INFO}/${film.url || ""}`}
                        >
                          {film.name || ""}
                        </Link>
                      </h4>
                      <h4 className="alias-title lim-1">
                        <Link
                          title={film.origin_name || ""}
                          href={`${NAVIGATION.INFO}/${film.url || ""}`}
                        >
                          {film.origin_name || ""}
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
                            top: tooltipPos.top - 220,
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
          </div>

          <div className="v-pagination line-center mt-8">
            {isMobile ? (
              <div className="mobile-pagination flex items-center justify-center gap-3 py-3">
                <button
                  type="button"
                  className="btn btn-circle btn-lg btn-secondary"
                  onClick={() => {
                    if (pagination.current > 1) {
                      const newPage = pagination.current - 1;
                      setPagination((prev) => ({ ...prev, current: newPage }));
                      isFiltering
                        ? fetchFilterData(newPage)
                        : fetchSearchData(newPage);
                    }
                  }}
                  disabled={pagination.current === 1 || isLoading}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <span className="text-base font-semibold">
                  {pagination.current}/{pagination.totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-circle btn-lg btn-secondary"
                  onClick={() => {
                    if (pagination.current < pagination.totalPages) {
                      const newPage = pagination.current + 1;
                      setPagination((prev) => ({ ...prev, current: newPage }));
                      isFiltering
                        ? fetchFilterData(newPage)
                        : fetchSearchData(newPage);
                    }
                  }}
                  disabled={
                    pagination.current === pagination.totalPages || isLoading
                  }
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ) : (
              <ReactPaginate
                forcePage={pagination.current - 1}
                pageCount={pagination.totalPages}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
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
                breakLabel="..."
                activeLinkClassName="current"
                pageLinkClassName="page-current line-center"
                containerClassName="page-control line-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
