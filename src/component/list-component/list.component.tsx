"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { fetchMovies } from "@/help/helper";
import { CategoryModel } from "@/types/model/category.d";
import { FilterState } from "@/types/param/filterState.param";
import FilterControls from "@/component/common/FilterControl";
import ReactPaginate from "react-paginate";
import { Pagination } from "@/types/model/pagination";
import Image from "next/image";
import { NAVIGATION } from "@/ultis/ultis";
import Loading from "@/component/lazyLoading/loading.component";
import Link from "next/link";
import { MovieHoverTooltip, PortalTooltip } from "@/component/home/MovieHoverTooltip";
import { MovieListData } from "@/types/detail";
import { CountryModel } from "@/types/model/country.d";

interface Props {
  typeFilm: CategoryModel;
  films: MovieListData[];
  pagination: Pagination;
  types: CategoryModel[];
  countries: CountryModel[];
  categories: CategoryModel[];
  hideFilters?: boolean; // Ẩn bộ lọc và phân trang (dùng cho trang diễn viên)
  extraActor?: string; // Ràng buộc actor cố định (trang diễn viên)
}

const defaultFilters: FilterState = {
  type: "",
  movieCountry: "",
  movieCategory: "",
  year: "",
  sortBy: "",
};

const ListFilmClient = ({
  typeFilm,
  films,
  pagination,
  types,
  countries,
  categories,
  hideFilters,
  extraActor,
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [dataFilms, setDataFilms] = useState<MovieListData[]>(films);
  const [dataPagination, setDataPaginate] = useState<Pagination>(pagination);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterFilm, setIsFilterFilm] = useState<boolean>(false);
  const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
  const [typeName, setTypeName] = useState<string>(typeFilm.name);
  const [initialLoading, setInitialLoading] = useState(false);
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

    setDataPaginate((prev) => ({ ...prev, page: 1 }));

    const filmsRes: any = await fetchMovies({
      page: 1,
      limit: 40,
      ...filters,
    }).catch(() => ({ data: { data: { result: [] } } }));

    const filmsData = filmsRes.data?.movies || [];

    const pagination = filmsRes.data?.pagination || [];

    setDataFilms(filmsData);

    setDataPaginate(pagination);

    setTypeName("Kết quả phim theo bộ lọc");
    
    setIsFilterMode(false);
  };

  const fetchFilm = async (page: number) => { 
    const filmsRes: any = await fetchMovies({
      page: page,
      limit: 40,
      ...filters,
    }).catch(() => ({ data: { data: { result: [] } } }));

    const filmsData = filmsRes.data?.movies || [];

    const pagination = filmsRes.data?.pagination || [];

    setDataFilms(filmsData);

    setDataPaginate(pagination);
  }


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div id="wrapper">
      <h1 style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {typeName} - Xem Phim Hay
      </h1>
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="row-header">
            <h3 className="category-name">{typeName}</h3>
          </div>

          {!hideFilters && (
            <FilterControls
              filters={filters}
              typeList={categories}
              countryList={countries}
              onFilterChange={handleFilterChange}
              onFilterSearch={handleFilterSearch}
            />
          )}

          <div className="row-content">
            {isFilterMode || initialLoading ? (
              <Loading />
            ) : dataFilms.length === 0 ? (
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
                {dataFilms.map((film, index) => (
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
                      href={`${NAVIGATION.INFO}/${film.slug}`}
                    >
                      <div className="pin-new !flex-none m-pin-new">
                        <div className="line-center line-pd">
                          {film.quality}
                        </div>
                        {film.episode_total && (
                          <div className="line-center line-lt">
                            T{film.episode_total.toString()}
                          </div>
                        )}
                      </div>
                      <div>
                        <Image
                          width={100}
                          height={100}
                          className="img-2"
                          alt={film?.image?.alt || "default-avatar"}
                          data-src={film?.image?.url || "/default-avatar.jpg"}
                          src={film?.image?.url || "/default-avatar.jpg"}
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
                      <h4 className="alias-title lim-1">
                        <Link
                          title={film.title}
                          href={`${NAVIGATION.INFO}/${film.slug}`}
                        >
                          {film.title}
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
          {!hideFilters && dataFilms.length > 0 && (dataPagination.totalPages) > 1 && (
            <div className="v-pagination line-center">
              {isMobile ? (
                <div className="mobile-pagination flex items-center justify-center gap-3 py-3">
                  <button
                    type="button"
                    className="btn btn-circle btn-lg btn-secondary"
                    onClick={() => {
                      if (dataPagination.page! > 1) {
                        const newPage = dataPagination.page! - 1;
                        setDataPaginate({
                          ...dataPagination,
                          page: newPage,
                        });
                        fetchFilm(newPage);
                      }
                    }}
                    disabled={dataPagination.page === 1}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <span className="text-base font-semibold">
                    {dataPagination.page}/{dataPagination.totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-circle btn-lg btn-secondary"
                    onClick={() => {
                      if (dataPagination.page! < dataPagination.totalPages!) {
                        const newPage = dataPagination.page! + 1;
                        setDataPaginate({
                          ...dataPagination,
                          page: newPage,
                        });
                        fetchFilm(newPage);
                      }
                    }}
                    disabled={dataPagination.page === dataPagination.totalPages}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              ) : (
                <ReactPaginate
                  forcePage={dataPagination.page! - 1}
                  pageCount={Math.ceil(dataPagination.totalPages ?? 1)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={({ selected }) => {
                    const newPage = selected + 1;
                    setDataPaginate({ ...dataPagination, page: newPage });
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

export default ListFilmClient;
