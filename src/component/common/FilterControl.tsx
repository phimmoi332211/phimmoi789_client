//src/component/header/FilterControls.tsx
"use client";

import React, { useState } from "react";
import { FilterState } from "@/types/param/filterState.param";
import { CategoryModel } from "@/types/model/category.d";
import { CountryModel } from "@/types/model/country.d";

interface FilterControlsProps {
  filters: FilterState;
  typeList: CategoryModel[];
  countryList: CountryModel[];
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFilterSearch: () => void;
}

export default function FilterControls({
  filters,
  typeList,
  countryList,
  onFilterChange,
  onFilterSearch,
}: FilterControlsProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 16 }, (_, i) => currentYear - i);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="v-filter">
      <div
        onClick={handleOpenFilter}
        className={`filter-toggle line-center ${isOpen ? "toggled" : ""}`}
      >
        <i className="fa-solid fa-filter"></i>
        <span>Bộ lọc</span>
      </div>
      <div className={`filter-elements ${!isOpen ? "d-none" : ""}`}>
        <div className="fe-row">
          <div className="fe-name">Quốc gia:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.movieCountry === "" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "movieCountry",
                    value: "",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Tất cả
            </div>
            {countryList?.map((item, index) => (
              <div
                key={index}
                className={`item ${
                  filters.movieCountry === item.slug ? "active" : ""
                }`}
                onClick={() =>
                  onFilterChange({
                    target: {
                      name: "movieCountry",
                      value: item.slug,
                    },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="fe-row">
          <div className="fe-name">Loại phim:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.movieCategory === "" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "movieCategory",
                    value: "",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Tất cả
            </div>
            <div
              className={`item ${
                filters.movieCategory === "phim-le" ? "active" : ""
              }`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "movieCategory",
                    value: "phim-le",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Phim lẻ
            </div>
            <div
              className={`item ${
                filters.movieCategory === "phim-bo" ? "active" : ""
              }`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "movieCategory",
                    value: "phim-bo",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Phim bộ
            </div>
          </div>
        </div>
        <div className="fe-row">
          <div className="fe-name">Thể loại:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.movieCategory === "" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "movieCategory",
                    value: "",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Tất cả
            </div>
            {typeList?.map((item, index) => (
              <div
                key={index}
                className={`item ${filters.movieCategory === item.slug ? "active" : ""}`}
                onClick={() =>
                  onFilterChange({
                    target: {
                      name: "movieCategory",
                      value: item.slug,
                    },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="fe-row">
          <div className="fe-name">Năm sản xuất:</div>
          <div className="fe-results">
            <div className="fe-results">
              <div
                className={`item ${filters.year === "" ? "active" : ""}`}
                onClick={() =>
                  onFilterChange({
                    target: {
                      name: "year",
                      value: "",
                    },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
              >
                Tất cả
              </div>
              {yearOptions?.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    filters.year.toString() === item.toString() ? "active" : ""
                  }`}
                  onClick={() =>
                    onFilterChange({
                      target: {
                        name: "year",
                        value: item.toString(),
                      },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="fe-row">
          <div className="fe-name">Sắp xếp:</div>
          <div className="fe-results">
            {/*<div className="item ">Tất cả</div>*/}
            <div
              className={`item ${filters.sortBy === "" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "sortBy",
                    value: "",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Tất cả
            </div>
            <div
              className={`item ${filters.sortBy === "newest" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "sortBy",
                    value: "newest",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Thời gian cập nhật
            </div>
            <div
              className={`item ${filters.sortBy === "most_viewed" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "sortBy",
                    value: "most_viewed",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Lượt xem
            </div>
            <div
              className={`item ${filters.sortBy === "oldest" ? "active" : ""}`}
              onClick={() =>
                onFilterChange({
                  target: {
                    name: "sortBy",
                    value: "oldest",
                  },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              Năm sản xuất
            </div>
          </div>
        </div>
        <div className="fe-row fe-row-end">
          <div className="fe-name">&nbsp;</div>
          <div className="fe-buttons flex-grow-1">
            <button
              onClick={onFilterSearch}
              type="button"
              className="btn btn-rounded btn-primary"
            >
              Lọc kết quả <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button
              onClick={handleOpenFilter}
              type="button"
              id="close-filter"
              className="btn btn-rounded btn-outline ms-2 px-4"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
