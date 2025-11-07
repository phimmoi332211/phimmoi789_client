"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CommentSection from "./CommentSection";
import TabEpisodesSingle from './tabs/TabEpisodesSingle';
import TabEpisodes from './tabs/TabEpisodes';
import { MovieData } from "@/types/detail";

interface WatchMainContentProps {
  movieData: MovieData;
}

export default function WatchMainContent({ movieData }: WatchMainContentProps) {
  
  return (
    <div className="wc-main">
      <div className="wm-info">
        <div className="v-thumb-l">
          <div className="v-thumbnail">
            <Image
              alt={movieData?.thumb_title}
              src={movieData?.thumb_url || movieData?.poster_url || "/default-avatar.jpg"}
              width={300}
              height={450}
              loading="lazy"
            />
          </div>
        </div>
        <div className="info">
          <h2 className="heading-sm media-name">
            <Link href={`/phim/${movieData?.slug}`} title={movieData?.title}>
              {movieData?.title}
            </Link>
          </h2>
          <div className="alias-name">{movieData?.name_english}</div>
          <div className="detail-more">
            <div className="hl-tags">
              <div className="tag-imdb">
                <span>{movieData?.rating?.toString()}</span>
              </div>
              <div className="tag-model">
                <span className="last">{movieData?.quality}</span>
              </div>
              <div className="tag-classic">
                <span>{movieData?.year}</span>
              </div>
              <div className="tag-classic">
                <span>{`${movieData.time}m`}</span>
              </div>
            </div>
            <div className="hl-tags">
              {movieData?.category.map((category) => (
                <Link
                  key={category.slug}
                  className="tag-topic"
                  href={`/the-loai/${category.slug}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="desc-line">
          <div className="description lim-3">{movieData?.description}</div>
          <Link className="text-primary" href={`/phim/${movieData?.slug}`}>
            Thông tin phim <i className="fa-solid fa-angle-right small me-2"></i>
          </Link>
        </div>
      </div>

      <div id="episodes-list" className="wm-episodes">
        {movieData?.episodes && movieData?.episodes.length > 1 ? (
          <TabEpisodes movieData={movieData} />
        ) : (
          <TabEpisodesSingle movieData={movieData} />
        )}
      </div>

      {/* component Comment */}
      <CommentSection
        movieData={{
          slug: movieData?.slug,
          title: movieData?.title,
          thumb_url: movieData?.thumb_url,
          poster_url: movieData?.poster_url,
          episodes: movieData?.episodes,
        }} />
    </div>
  );
}
