"use client";

import Link from "next/link";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Image from "next/image";
import { fetchCategoryList, fetchMovies } from "@/help/helper";
import { CategoryModel } from "@/types/model/category.d";
import { CountryModel } from "@/types/model/country.d";
import { Film } from "@/types/model/film.d";
import { FilterState } from "@/types/param/filterState.param";
import { ApiResponse } from "@/types/response/api.response";
import Loading from "@/component/lazyLoading/loading.component";
import FilterControls from "@/component/common/FilterControl";
import { NAVIGATION } from "@/ultis/ultis";
import {
  MovieHoverTooltip,
  PortalTooltip,
} from "@/component/home/MovieHoverTooltip";
import ReactPaginate from "react-paginate";

const defaultFilters: FilterState = {
  type: "",
  country: "",
  year: "",
  order: "",
  category: "",
};

interface Pagination {
  current?: number;
  pageSize?: number;
  pages?: number;
  totalPages?: number;
}

interface Props {
  url: string;
  films: ApiResponse<Film[]>;
  totalPage: number;
  countries: CountryModel[];
  types: CategoryModel[];
  title?: string; // Tiêu đề cố định, không cần fetch từ API
  hideFilters?: boolean; // Ẩn bộ lọc và phân trang (dùng cho trang diễn viên)
  extraActor?: string; // Ràng buộc actor cố định (trang diễn viên)
}

const List = ({
  url,
  films,
  totalPage,
  countries,
  types,
  title,
  hideFilters,
  extraActor,
}: Props) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [categoryName, setCategoryName] = useState<string>(url);
  const [data, setData] = useState<ApiResponse<Film[]> | null>(films);
  const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
  const [isFilterFilm, setIsFilterFilm] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [pagination, setPaginate] = useState<Pagination>({
    current: 1,
    pageSize: 40,
    pages: totalPage || 1,
    totalPages: 1,
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res: any = await fetchCategoryList();
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Nếu có title cố định (phim-le/phim-bo/phim-sap-chieu), dùng dữ liệu từ props và không fetch lại
    if (title) {
      setCategoryName(title);
      setFilters((prev) => ({
        ...prev,
        type:
          url === "phim-le"
            ? "single"
            : url === "phim-bo"
            ? "series"
            : url === "phim-sap-chieu"
            ? "upcoming"
            : prev.type,
      }));

      if ((films as any)?.data?.data?.meta) {
        setPaginate({
          pageSize: (films as any).data.data.meta.limit || 20,
          current: (films as any).data.data.meta.page || 1,
          pages: (films as any).data.data.meta.totalPages || 1,
          totalPages: (films as any).data.data.meta.totalPages || 1,
        });
      }
      setData(films);
      return;
    }

    // Chỉ chạy khi có dữ liệu cho trang `/list/[slug]` hoặc các trang động còn lại
    if (!countries || !types || !categories) return;

    const isCountry = countries.some((item) => item.url === url);
    const isType = types.some((item) => item.url === url);
    const isCategory = categories.some((item) => item.url === url);

    setFilters((prev) => ({
      ...prev,
      country: isCountry ? url : "",
      type: isType ? url : "",
      category: isCategory ? url : "",
    }));

    if (isCountry) {
      const name = countries.find((item) => item.url === url)?.name || url;
      setCategoryName(name);
    } else if (isType) {
      const name = types.find((item) => item.url === url)?.name || url;
      setCategoryName(name);
    } else if (isCategory) {
      const name = categories.find((item) => item.url === url)?.name || url;
      setCategoryName(name);
    } else {
      setCategoryName(url);
    }

    fetchFilm(1);
  }, [url, countries, types, categories, title, films]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);

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

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSearch = async () => {
    setIsFilterFilm(true);
    setIsFilterMode(true);
    setPaginate((prev) => ({ ...prev, current: 1 }));
    const res: any = await fetchMovies({
      page: 1,
      limit: 40,
      ...filters,
    });
    setData(res?.data as ApiResponse<Film[]>);
    const data = res as ApiResponse<Film[]>;
    setPaginate({
      pageSize: res?.data.data.meta.pageSize,
      current: res?.data.data.meta.current,
      pages: res?.data.data.meta.pages,
      totalPages: res?.data.data.meta.total,
    });
    setCategoryName("Kết quả phim theo bộ lọc");
    setIsFilterMode(false);
  };

  const fetchFilm = async (page: number) => {
    setIsFilterMode(true);

    // Nếu có title (phim-le, phim-bo, phim-sap-chieu), dùng fetchMovies với type cố định
    if (title) {
      const res: any = await fetchMovies({
        page: page,
        limit: 40,
        type:
          url === "phim-le"
            ? "single"
            : url === "phim-bo"
            ? "series"
            : url === "phim-sap-chieu"
            ? "upcoming"
            : "",
        ...filters,
      });
      setData(res?.data as ApiResponse<Film[]>);
      setPaginate({
        pageSize: res?.data.data.meta.limit,
        current: res?.data.data.meta.page,
        pages: res?.data.data.meta.totalPages,
        totalPages: res?.data.data.meta.totalPages,
      });
      setIsFilterMode(false);
      return;
    }

    // Logic cũ cho các trang khác
    const filterType: any = {};
    if (countries.some((c) => c.url === url)) filterType.country = url;
    else if (types.some((c) => c.url === url)) filterType.type = url;
    else filterType.category = url;

    if (
      filters.country ||
      filters.type ||
      filters.category ||
      filters.year ||
      filters.order
    ) {
      filterType.country = null;
      filterType.type = null;
      filterType.category = null;
    }

    const res: any = await fetchMovies({
      page: page,
      limit: 40,
      type:
        filters.category !== "" ? filters.category : filterType.category || "",
      country:
        filters.country !== "" ? filters.country : filterType.country || "",
      category: filters.type !== "" ? filters.type : filterType.type || "",

      year: filters.year,
    });
    setData(res?.data as ApiResponse<Film[]>);
    setPaginate({
      pageSize: res?.data.data.meta.limit,
      current: res?.data.data.meta.page,
      pages: res?.data.data.meta.totalPages,
      totalPages: res?.data.data.meta.totalPages,
    });
    setIsFilterMode(false);
  };

  const movies = data?.data?.result || [];

  const [initialLoading, setInitialLoading] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => setInitialLoading(false), 600);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div id="wrapper">
      <h1 style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {categoryName} - Xem Phim Hay
      </h1>
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="row-header">
            <h3 className="category-name">{title ?? categoryName}</h3>
          </div>

          {!hideFilters && (
            <FilterControls
              filters={filters}
              typeList={types}
              countryList={countries}
              onFilterChange={handleFilterChange}
              onFilterSearch={handleFilterSearch}
            />
          )}

          <div className="row-content">
            {isFilterMode || initialLoading ? (
              <Loading />
            ) : movies.length === 0 ? (
              <div className="py-16 text-center text-gray-300">
                <div className="flex items-center justify-center mb-3">
                  <i className="fa-regular fa-folder-open text-3xl mr-2"></i>
                  <span className="text-lg">Không tìm thấy phim phù hợp</span>
                </div>
                <div className="text-sm opacity-80">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </div>
              </div>
            ) : (
              <div className="cards-grid-wrapper">
                {movies.map((film, index) => (
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
                        {/* <div className="line-center line-tm">
                          {film.quality.toLowerCase().includes("thuyết")
                            ? "VSb+TM"
                            : film.quality}
                        </div> */}
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
                          // onError={(e: any) => {
                          //   if (
                          //     e?.currentTarget?.src !== "/default-avatar.jpg"
                          //   ) {
                          //     e.currentTarget.src = "/default-avatar.jpg";
                          //   }
                          // }}
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

          {/* Pagination */}
          {!hideFilters && movies.length > 0 && (pagination.pages ?? 1) > 1 && (
            <div className="v-pagination line-center">
              {isMobile ? (
                <div className="mobile-pagination flex items-center justify-center gap-3 py-3">
                  <button
                    type="button"
                    className="btn btn-circle btn-lg btn-secondary"
                    onClick={() => {
                      if (pagination.current! > 1) {
                        const newPage = pagination.current! - 1;
                        setPaginate({
                          ...pagination,
                          current: newPage,
                        });
                        fetchFilm(newPage);
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
                      if (pagination.current! < pagination.pages!) {
                        const newPage = pagination.current! + 1;
                        setPaginate({
                          ...pagination,
                          current: newPage,
                        });
                        fetchFilm(newPage);
                      }
                    }}
                    disabled={pagination.current === pagination.pages}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              ) : (
                <ReactPaginate
                  forcePage={pagination.current! - 1}
                  pageCount={Math.ceil(pagination.pages ?? 1)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={({ selected }) => {
                    const newPage = selected + 1;
                    setPaginate({ ...pagination, current: newPage });
                    fetchFilm(newPage);
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
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
