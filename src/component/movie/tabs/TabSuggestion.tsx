"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SimilarMovies } from "@/types/detail";

interface TabSuggestionProps {
  movieData: SimilarMovies[];
}

const TabSuggestion: React.FC<TabSuggestionProps> = ({ movieData }) => {
  if (movieData.length < 0) {
    return (
      <div className="box">
        <div className="box-header">
          <h2 className="title">Phim đề xuất</h2>
        </div>
        <div className="box-body">
          <div className="de-suggestions">
            <p className="text-center text-gray-500 py-4">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movieData || movieData.length === 0) {
    return (
      <div className="box">
        <div className="box-header">
          <h2 className="title">Phim đề xuất</h2>
        </div>
        <div className="box-body">
          <div className="de-suggestions">
            <p className="text-center text-gray-500 py-4">
              Chưa có phim đề xuất
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      <div className="box-header">
        <h2 className="title">Phim đề xuất</h2>
      </div>
      <div className="box-body">
        <div className="cards-grid-wrapper de-suggest">
          {movieData.map((movie, index) => (
            <div key={index} className="sw-item">
              <Link href={`/phim/${movie.slug}`} className="v-thumbnail">
                <div className="pin-new m-pin-new">
                  <div className="line-center line-pd">{movie.lang}</div>
                </div>
                <div>
                  <Image
                    alt={movie.featuredImage.alt}
                    loading="lazy"
                    src={movie.featuredImage.url}
                    width={180}
                    height={260}
                  />
                </div>
              </Link>
              <div className="info">
                <h4 className="item-title lim-1">
                  <Link title={movie.title} href={`/phim/${movie.slug}`}>
                    {movie.title}
                  </Link>
                </h4>
                <h4 className="alias-title lim-1">
                  <Link title={movie.title} href={`/phim/${movie.slug}`}>
                    {movie.title}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabSuggestion;
