"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieData, SimilarMovies } from "@/types/detail";
import ActorList from "./ActorList";
import TopWeeklyMovies from "./TopWeeklyMovies";

interface DetailSideProps {
  movieData: MovieData;
  suggestedMovies?: SimilarMovies[];
  isLoadingSuggested?: boolean;
}

export default function DetailSide({
  movieData,
  suggestedMovies = [],
}: DetailSideProps) {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const renderTags = () => (
    <div className="hl-tags">
      <div className="tag-model">
        <span className="last">{movieData.quality}</span>
      </div>
      <div className="tag-classic">
        <span>{movieData.year}</span>
      </div>
      {movieData.episode_total && (
        <div className="tag-classic">
          <span>Tập {movieData.episode_total}</span>
        </div>
      )}
      {movieData.parts && (
        movieData.parts.map((part, index) => (
          <span key={index}>
            <Link href={`/phim/${part.slug}`}>{part.title}</Link>
          </span>
        ))
      )}
    </div>
  );

  const renderCategories = () => (
    <div className="hl-tags">
      {movieData.category.map((cat, index) => (
        <Link
          key={index}
          className="tag-topic"
          href={`/the-loai/${cat?.slug || ""}`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );

  const renderStatus = () => (
    <div className={`status ${movieData.status.toLowerCase()} mb-4`}>
      <div className="line-center small">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <span>Đã chiếu: {movieData.episode_total} tập</span>
      </div>
    </div>
  );

  const renderDetailLine = (title: string, content: React.ReactNode) => (
    <div className="detail-line d-flex">
      <div className="de-title">{title}</div>
      <div className="de-value">{content}</div>
    </div>
  );

  const renderActors = () =>
    movieData.actors?.map((actor, index) => (
      <span key={index}>
        <Link href={`/dien-vien/${actor.name.toLowerCase().replace(/\s+/g, "-")}`}>
          {actor.name}
        </Link>
        {index < movieData.actors.length - 1 && ", "}
      </span>
    ));

  const renderDirectors = () =>
    movieData.director.map((director, index) => (
      <span key={index}>
        <Link href={`/director/${director.toLowerCase().replace(/\s+/g, "-")}`}>
          {director}
        </Link>
        {index < movieData.director.length - 1 && ", "}
      </span>
    ));

  const renderCountries = () =>
    movieData.country.map((country, index) => (
      <span key={index}>
        <Link href={`/quoc-gia/${country.slug}`}>{country.name}</Link>
      </span>
    ));

  return (
    <div className="dc-side">
      <div className="ds-info">
        <div className="v-thumb-l mb-3">
          <div className="v-thumbnail">
            <Image
              alt={`Xem Phim ${movieData.title}`}
              loading="lazy"
              src={movieData.thumb_url}
              width={300}
              height={450}
            />
          </div>
        </div>
        <h2 className="heading-md media-name">{movieData.title}</h2>
        <div className="alias-name">{movieData.name_english}</div>
        <div
          id="toggle-detail"
          className={`btn btn-block btn-basic primary-text mb-2 ${showDetail ? "active" : ""
            }`}
          onClick={toggleDetail}
        >
          <span>Thông tin phim</span>
          <i
            className={`fa-solid fa-angle-${showDetail ? "up" : "down"} ms-2`}
          ></i>
        </div>
        <div className={`detail-more ${showDetail ? "show" : ""}`}>
          {renderTags()}
          {renderCategories()}
          {renderStatus()}
          <div className="detail-line">
            <div className="de-title d-block mb-2">Giới thiệu: </div>
            <div
              className="description "
              dangerouslySetInnerHTML={{ __html: movieData.description }}
            ></div>
          </div>
          {renderDetailLine("Thời lượng:", movieData.time)}
          {renderDetailLine("Quốc gia:", renderCountries())}
          {renderDetailLine("Đạo diễn:", renderDirectors())}
          {renderDetailLine("Diễn viên:", renderActors())}
          {renderDetailLine("Hashtag:", movieData.hashtag)}
        </div>
      </div>
      {movieData.actors && movieData.actors.length > 0 && (
        <ActorList actors={movieData.actors} />
      )}
      <TopWeeklyMovies movies={suggestedMovies} />
    </div>
  );
}
