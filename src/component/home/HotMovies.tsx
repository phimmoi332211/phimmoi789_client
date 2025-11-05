"use client";
// import { fetchCommentMaxList } from "@/help/helper";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Hàm tạo trend ngẫu nhiên
const getRandomTrend = () => {
  const trends = ["up", "down", "stand"];
  return trends[Math.floor(Math.random() * trends.length)];
};

// Modal hiển thị toàn bộ phim
const HotMoviesModal = ({ show, onClose, movies }: any) => {
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade v-modal d-modal modal show"
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
            <div className="comm-title line-center flex items-center mb-2">
              <i className="fa-solid fa-clapperboard ct-icon mr-2"></i>
              <span className="flex-grow-1">Sôi nổi nhất</span>
            </div>
          </div>
          <div className="is-body">
            <div className="irt-table">
              <div className="it-col it-big">
                <div className="chart-list">
                  {movies.map((movie: any, index: number) => (
                    <div className="item flex items-center mb-3" key={index}>
                      <div className="pos w-6 text-center font-bold">
                        {index + 1}.
                      </div>
                      <div className={`dev dev-${movie.trend} mr-2`}>
                        {movie.trend === "up" && (
                          <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
                        )}
                        {movie.trend === "down" && (
                          <i className="fa-solid fa-arrow-trend-down text-red-500"></i>
                        )}
                        {movie.trend === "stand" && (
                          <i className="fa-solid fa-minus text-gray-400"></i>
                        )}
                      </div>
                      <div className="v-thumbnail mr-2">
                        <Image
                          src={movie.film.thumb_url}
                          alt={movie.film.title}
                          width={48}
                          height={64}
                          className="rounded-xl w-12 h-16 object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="name lim-1 text-base font-medium">
                        <Link
                          href={`/phim/${movie.slug}`}
                          className="hover:underline"
                        >
                          {movie.film.title}
                        </Link>
                      </h4>
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

// Component chính
export const HotMovies = () => {
  const [showModal, setShowModal] = useState(false);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res: any = await fetchCommentMaxList();
    //     const dataWithTrend = ((res?.data?.data as any[]) || []).map(
    //       (item: any) => ({
    //         ...item,
    //         trend: getRandomTrend(),
    //       })
    //     );
    //     setMovieData(dataWithTrend);
    //   } catch (err) {
    //     console.error("Lỗi khi gọi API:", err);
    //   }
    // };
    // fetchData();
  }, []);

  const top5Movies = movieData.slice(0, 5);

  return (
    <div className="it-col this-01">
      <div className="comm-title line-center flex items-center mb-2">
        <i className="fa-solid fa-clapperboard ct-icon mr-2"></i>
        <span className="flex-grow-1">Sôi nổi nhất</span>
      </div>
      <div className="chart-list">
        {top5Movies.map((movie: any, index: number) => (
          <div className="item flex items-center mb-1" key={index}>
            <div className="pos w-6 text-center font-bold">{index + 1}.</div>
            <div className={`dev dev-${movie.trend} mr-2`}>
              {movie.trend === "up" && (
                <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
              )}
              {movie.trend === "down" && (
                <i className="fa-solid fa-arrow-trend-down text-red-500"></i>
              )}
              {movie.trend === "stand" && (
                <i className="fa-solid fa-minus text-gray-400"></i>
              )}
            </div>
            <div className="v-thumbnail mr-2">
              <Image
                src={movie.film.thumb_url}
                alt={movie.film.title}
                width={48}
                height={64}
                className="rounded-xl w-12 h-16 object-cover"
                loading="lazy"
              />
            </div>
            <h4 className="name lim-1 text-base font-medium">
              <Link href={`/phim/${movie.slug}`} className="hover:underline">
                {movie.film.title}
              </Link>
            </h4>
          </div>
        ))}
        <div className="item-more mt-2">
          <button
            className="small cursor-pointer text-gray-500 hover:underline bg-transparent border-none"
            onClick={() => setShowModal(true)}
          >
            Xem thêm
          </button>
        </div>
      </div>
      <HotMoviesModal
        show={showModal}
        onClose={() => setShowModal(false)}
        movies={movieData}
      />
    </div>
  );
};
