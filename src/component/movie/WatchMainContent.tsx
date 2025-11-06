"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CommentSection from "./CommentSection";
import TabEpisodesSingle from './tabs/TabEpisodesSingle';
import TabEpisodes from './tabs/TabEpisodes';

interface WatchMainContentProps {
  title: string;
  slug: string;
  aliasName: string;
  thumbnail: string;
  poster_url: string;
  imdb: string;
  ageRating: string;
  year: string;
  duration: string;
  categories: Array<{
    name: string;
    slug: string;
  }>;
  description: string;
  episodes: Array<{
    episode: string;
    title: string;
    link_embed: string;
    link_m3u8: string;
  }>;
  currentEpisode: string;
}
 
export default function WatchMainContent({
  title,
  slug,
  aliasName,
  thumbnail,
  poster_url,
  imdb,
  ageRating,
  year,
  duration,
  categories,
  description,
  episodes,
  currentEpisode
}: WatchMainContentProps) {
    return (
        <div className="wc-main">
      <div className="wm-info">
        <div className="v-thumb-l">
          <div className="v-thumbnail">
            <Image 
              alt={`Xem Phim ${title} Vietsub HD Online - Phimmoi789`}
              src={thumbnail}
              width={300}
              height={450}
              loading="lazy"
            />
          </div>
        </div>
        <div className="info">
          <h2 className="heading-sm media-name">
            <Link href={`/phim/${slug}`} title={title}>
              {title}
            </Link>
          </h2>
          <div className="alias-name">{aliasName}</div>
          <div className="detail-more">
            <div className="hl-tags">
              <div className="tag-imdb">
                <span>{imdb}</span>
              </div>
              <div className="tag-model">
                <span className="last">{ageRating}</span>
              </div>
              <div className="tag-classic">
                <span>{year}</span>
              </div>
              <div className="tag-classic">
                <span>{duration}</span>
              </div>
            </div>
            <div className="hl-tags">
              {categories.map((category) => (
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
          <div className="description lim-3">{description}</div>
          <Link className="text-primary" href={`/phim/${slug}`}>
            Thông tin phim <i className="fa-solid fa-angle-right small me-2"></i>
          </Link>
        </div>
      </div>
        
      <div id="episodes-list" className="wm-episodes">
        {episodes && episodes.length > 1 ? (
          <TabEpisodes movieData={{
            slug,
            title,
            thumb_url: thumbnail,
            poster_url: poster_url,
            episode: episodes,
            currentEpisode: currentEpisode
          }} />
        ) : (
          <TabEpisodesSingle movieData={{
            slug,
            title,
            thumb_url: thumbnail,
            poster_url: thumbnail,
            episode: episodes,
            lang: "Vietsub"
          }} />
        )}
      </div>

      {/* component Comment */}
      <CommentSection
      movieData={{
        slug,
        title,
        thumb_url: thumbnail,
        poster_url: poster_url,
        episode: episodes,
      }} />
        </div>
    );
}
