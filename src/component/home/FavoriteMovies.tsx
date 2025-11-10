"use client";
// import { fetchCommentRatingList } from "@/help/helper";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Random trend generator
const getRandomTrend = (): "up" | "down" | "stand" => {
  const trends = ["up", "down", "stand"];
  return trends[Math.floor(Math.random() * trends.length)] as
    | "up"
    | "down"
    | "stand";
};

const getImageBySlug = (slug: string) => {
  return `https://via.placeholder.com/150?text=${encodeURIComponent(slug)}`;
};

const TrendingMoviesModal = ({ show, onClose, movies }: any) => {
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
              <i className="fa-solid fa-heart-circle-check ct-icon mr-2"></i>
              <span className="flex-grow-1">Yêu thích nhất</span>
            </div>
          </div>
          <div className="is-body">
            <div className="irt-table">
              <div className="it-col it-big">
                <div className="chart-list">
                  {movies.map((movie: any, index) => (
                    <div
                      className="item flex items-center mb-2"
                      key={index}
                    >
                      <div className="pos w-6 text-center font-bold">
                        {movie.pos}.
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
                          src={movie.thumb_url || getImageBySlug(movie.slug)}
                          alt={movie.title}
                          width={48}
                          height={64}
                          className="rounded-xl object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="name lim-1 text-base font-medium">
                        <Link
                          href={`/phim/${movie.slug}`}
                          className="hover:underline"
                        >
                          {movie.title}
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

export const FavoriteMovies = () => {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res: any = await fetchCommentRatingList();
    //     const transformed = ((res?.data?.data as any[]) || []).map(
    //       (item: any, index: number) => ({
    //         pos: index + 1,
    //         trend: getRandomTrend(),
    //         thumb_url: item.thumb_url,
    //         title: item.title,
    //         slug: item.slug,
    //       })
    //     );
    //     setMovies(transformed);
    //   } catch (error) {
    //     console.error("Failed to fetch rating list:", error);
    //   }
    // };
    // fetchData();
  }, []);

  const top5Movies = movies.slice(0, 5);

  return (
    <div className="it-col this-01">
      <div className="comm-title line-center flex items-center mb-2">
        <i className="fa-solid fa-heart-circle-check ct-icon mr-2"></i>
        <span className="flex-grow-1">Yêu thích nhất</span>
      </div>
      <div className="chart-list">
        {top5Movies.map((movie, index) => (
          <div className="item flex items-center mb-1" key={index}>
            <div className="pos w-6 text-center font-bold">{movie.pos}.</div>
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
                src={movie.thumb_url || getImageBySlug(movie.slug)}
                alt={movie.title}
                width={48}
                height={64}
                className="rounded-xl object-cover"
                loading="lazy"
              />
            </div>
            <h4 className="name lim-1 text-base font-medium">
              <Link href={`/phim/${movie.slug}`} className="hover:underline">
                {movie.title}
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
      <TrendingMoviesModal
        show={showModal}
        onClose={() => setShowModal(false)}
        movies={movies}
      />
    </div>
  );
};
