"use client";

import React, { useState } from "react";
import { Category, FilterState } from "@/types/search";

interface FilterControlsProps {
  filters: FilterState;
  typeList: Category[];
  countryList: Category[];
  onFilterChange: (key: string, value: any) => void;
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
        {/* --- Quốc gia (multi-select) --- */}
        <div className="fe-row">
          <div className="fe-name">Quốc gia:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.country.length === 0 ? "active" : ""}`}
              onClick={() => onFilterChange("country", [])}
            >
              Tất cả
            </div>
            {countryList?.map((item, index) => {
              const isActive = filters.country.includes(item.slug);
              return (
                <div
                  key={index}
                  className={`item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (isActive) {
                      // Bỏ chọn
                      onFilterChange(
                        "country",
                        filters.country.filter((c) => c !== item.slug)
                      );
                    } else {
                      // Thêm vào danh sách
                      onFilterChange("country", [
                        ...filters.country,
                        item.slug,
                      ]);
                    }
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        {/* --- Loại phim --- */}
        <div className="fe-row">
          <div className="fe-name">Loại phim:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.category === "" ? "active" : ""}`}
              onClick={() => onFilterChange("category", "")}
            >
              Tất cả
            </div>
            <div
              className={`item ${
                filters.category === "phim-le" ? "active" : ""
              }`}
              onClick={() => onFilterChange("category", "phim-le")}
            >
              Phim lẻ
            </div>
            <div
              className={`item ${
                filters.category === "phim-bo" ? "active" : ""
              }`}
              onClick={() => onFilterChange("category", "phim-bo")}
            >
              Phim bộ
            </div>
          </div>
        </div>
        {/* --- Thể loại --- */}
        <div className="fe-row">
          <div className="fe-name">Thể loại:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.type === "" ? "active" : ""}`}
              onClick={() => onFilterChange("type", "")}
            >
              Tất cả
            </div>
            {typeList?.map((item, index) => (
              <div
                key={index}
                className={`item ${filters.type === item.name ? "active" : ""}`}
                onClick={() => onFilterChange("type", item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* --- Năm sản xuất --- */}
        <div className="fe-row">
          <div className="fe-name">Năm sản xuất:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.year.length === 0 ? "active" : ""}`}
              onClick={() => onFilterChange("year", [])}
            >
              Tất cả
            </div>
            {yearOptions?.map((item, index) => {
              const isActive = filters.year.includes(item.toString());
              return (
                <div
                  key={index}
                  className={`item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (isActive) {
                      // Bỏ chọn năm
                      onFilterChange(
                        "year",
                        filters.year.filter((y) => y !== item.toString())
                      );
                    } else {
                      // Thêm vào danh sách năm đã chọn
                      onFilterChange("year", [
                        ...filters.year,
                        item.toString(),
                      ]);
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Sắp xếp --- */}
        {/* <div className="fe-row">
          <div className="fe-name">Sắp xếp:</div>
          <div className="fe-results">
            <div
              className={`item ${filters.order === "" ? "active" : ""}`}
              onClick={() => onFilterChange("order", "")}
            >
              Tất cả
            </div>
            <div
              className={`item ${filters.order === "3" ? "active" : ""}`}
              onClick={() => onFilterChange("order", "3")}
            >
              Thời gian cập nhật
            </div>
            <div
              className={`item ${filters.order === "2" ? "active" : ""}`}
              onClick={() => onFilterChange("order", "2")}
            >
              Lượt xem
            </div>
            <div
              className={`item ${filters.order === "1" ? "active" : ""}`}
              onClick={() => onFilterChange("order", "1")}
            >
              Năm sản xuất
            </div>
          </div>
        </div> */}
        {/* --- Buttons --- */}
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
