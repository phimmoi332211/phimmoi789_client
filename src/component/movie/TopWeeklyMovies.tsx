"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TopMovie {
  id: string;
  title: string;
  alias: string;
  image: string;
  episodes: number;
  hasSubtitle: boolean;
  hasDubbing: boolean;
}

interface TopWeeklyMoviesProps {
  movies: TopMovie[];
}


const TopWeeklyMovies: React.FC<TopWeeklyMoviesProps> = ({ movies }) => {
  return (
    <div className="child-box child-top">
      <div className="child-header">
        <div className="inc-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <g clipPath="url(#clip0_137_1522)">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.88063 16.9893C1.85433 14.5926 3.02764 11.8941 5.01236 10.0083C6.37475 8.71478 9.24978 6.77138 13.4408 7.83575L12.9199 8.87882C12.8072 9.09921 12.5893 9.25197 12.3376 9.28829L8.75391 9.81296C8.44337 9.84426 8.15161 9.98951 7.93247 10.2199C7.67577 10.4879 7.53929 10.8385 7.54805 11.2092C7.55682 11.5761 7.70708 11.9154 7.97004 12.1646L10.5758 14.6715C10.7536 14.838 10.835 15.0847 10.7937 15.3289L10.7499 15.5793C8.00009 14.1844 4.54279 15.2888 1.88063 16.9893ZM23.5748 12.1671C23.799 11.9555 23.9455 11.6675 23.988 11.3532C24.0356 10.9863 23.938 10.6244 23.7151 10.3351C23.4909 10.0459 23.1666 9.86054 22.8047 9.81421L19.2097 9.28829C18.958 9.25197 18.7401 9.09921 18.6299 8.88133L17.0221 5.66319L17.0208 5.66069C16.8869 5.39773 16.6777 5.19112 16.4198 5.06214C16.0867 4.88934 15.7085 4.85678 15.3517 4.96823C14.9935 5.07967 14.7018 5.32635 14.5277 5.66319L14.2986 6.12275C10.4356 5.00955 6.58762 5.92114 3.71885 8.64591C0.810006 11.4095 -0.591196 15.5255 0.233998 18.8876C0.310382 19.1982 0.539533 19.4473 0.841311 19.5513C0.941486 19.5863 1.04417 19.6026 1.14685 19.6026C1.35471 19.6026 1.56132 19.5325 1.72912 19.3998C3.68629 17.8521 7.69831 15.7096 10.3216 17.4977C10.3492 17.5165 10.3805 17.519 10.4093 17.5352L10.1776 18.8601C10.1275 19.1493 10.1776 19.4599 10.3216 19.7366C10.6797 20.4128 11.5225 20.672 12.2012 20.3189L15.4143 18.6547C15.6384 18.537 15.9101 18.5357 16.1343 18.6535L19.3562 20.3226C19.5703 20.4266 19.7919 20.4792 20.0098 20.4792C20.0812 20.4792 20.1513 20.4729 20.2202 20.4616C20.9778 20.3326 21.4949 19.6164 21.371 18.8601L20.7574 15.3289C20.7148 15.0835 20.795 14.838 20.9765 14.669L23.5748 12.1671Z" fill="currentColor"></path>
            </g>
          </svg>
        </div>
        <span>Top phim tuần này</span>
      </div>
      <div className="child-content">
        <div className="cc-top">
          {movies.map((movie, index) => (
            <div key={movie.id} className="item">
              <div className="position">{index + 1}</div>
              <div className="h-item">
                <div className="v-thumb-m">
                  <Link className="v-thumbnail" href={`/phim/${movie.id}`}>
                    <Image alt={movie.title} src={movie.image} width={150} height={225} />
                  </Link>
                </div>
                <div className="info">
                  <h4 className="item-title lim-2">
                    <Link title={movie.title} href={`/phim/${movie.id}`}>{movie.title}</Link>
                  </h4>
                  <div className="alias-title mb-2 lim-1">{movie.alias}</div>
                  <div className="info-line">
                    {movie.episodes && <div className="tag-small">Tập {movie.episodes}</div>}
                    {movie.hasSubtitle && <div className="tag-small">Vietsub</div>}
                    {movie.hasDubbing && <div className="tag-small">Thuyết minh</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopWeeklyMovies; 