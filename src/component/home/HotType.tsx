"use client";
import { fetchCategories } from "@/help/helper";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Danh sách màu và trend mô phỏng
const colorList = [
  "rgb(255, 0, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 255, 0)",
  "rgb(255, 165, 0)",
  "rgb(128, 0, 128)",
  "rgb(0, 255, 255)",
  "rgb(128, 128, 128)",
  "rgb(0, 100, 0)",
  "rgb(139, 0, 139)",
];
const trendList = ["stand", "up", "down"];

export const HotType = () => {
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      const res: any = await fetchCategories({ limit: 50 });
      const list = res?.data?.data || [];
      const top10 = list.slice(0, 10);
      const mapped = top10.map((item: any, index: number) => ({
        id: index + 1,
        position: index + 1,
        name: item.name,
        slug: item.url,
        trend: trendList[index % trendList.length],
        color: colorList[index % colorList.length],
      }));
      setTypes(mapped);
    };
    fetchTypes();
  }, []);

  const top5Types = types.slice(0, 5);

  const HotTypeModal = ({ show, onClose, types }: any) => {
    if (!show) return null;
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fade v-modal d-modal modal show mb-3"
        tabIndex={-1}
        style={{ paddingRight: "15px", display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              className="btn modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="is-header mb-3">
              <div className="comm-title line-center m-0">
                <i className="fa-solid fa-folder-plus ct-icon" />
                <span className="flex-grow-1">Thể loại Hot</span>
              </div>
            </div>
            <div className="is-body">
              <div className="irt-table">
                <div className="it-col it-big this-03">
                  <div className="chart-list">
                    {types.map((type: any) => (
                      <div className="item mb-[10px]" key={type.id}>
                        <div className="pos">{type.position}.</div>
                        <div className={`dev dev-${type.trend}`}>
                          {type.trend === "up" && (
                            <i className="fa-solid fa-arrow-trend-up"></i>
                          )}
                          {type.trend === "down" && (
                            <i className="fa-solid fa-arrow-trend-down"></i>
                          )}
                          {type.trend === "stand" && (
                            <i className="fa-solid fa-minus"></i>
                          )}
                        </div>
                        <div
                          className="topic-color"
                          style={{ backgroundColor: type.color }}
                        >
                          <Link href={`/list/${type.slug}`}>{type.name}</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="it-col this-03">
      <div className="comm-title line-center">
        <i className="fa-solid fa-folder-plus ct-icon" />
        <span className="flex-grow-1">Thể loại Hot</span>
      </div>
      <div className="chart-list">
        {top5Types.map((type: any) => (
          <div className="item" key={type.id}>
            <div className="pos">{type.position}.</div>
            <div className={`dev dev-${type.trend} mr-2`}>
              {type.trend === "up" && (
                <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
              )}
              {type.trend === "down" && (
                <i className="fa-solid fa-arrow-trend-down text-red-500"></i>
              )}
              {type.trend === "stand" && (
                <i className="fa-solid fa-minus text-gray-400"></i>
              )}
            </div>
            <div
              className="topic-color"
              style={{ backgroundColor: type.color }}
            >
              <Link href={`/list/${type.slug}`}>{type.name}</Link>
            </div>
          </div>
        ))}
        <div className="item-more mt-4">
          <button
            className="small cursor-pointer text-gray-500 hover:underline bg-transparent border-none"
            onClick={() => setShowModal(true)}
          >
            Xem thêm
          </button>
        </div>
      </div>
      <HotTypeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        types={types}
      />
    </div>
  );
};
