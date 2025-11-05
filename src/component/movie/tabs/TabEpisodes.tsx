"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "../ToggleSwitch";

interface Episode {
  title: string;
  episode: string;
  link_embed: string;
  link_m3u8: string;
}

interface MovieData {
  slug: string;
  title: string;
  thumb_url: string;
  poster_url: string;
  episode?: Episode[];
  currentEpisode?: string;
}

interface TabEpisodesProps {
  movieData: MovieData;
}

export default function TabEpisodes({ movieData }: TabEpisodesProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (!movieData?.episode || !Array.isArray(movieData.episode)) {
    return (
      <div className="cg-body-box is-eps">
        <div className="box-body">
          <div className="v-notice">
            <div className="inc-icon icon-notice">
              <Image src="/images/icons/empty-box.svg" alt="Empty box" width={24} height={24} />
            </div>
            <p className="mb-0">Chưa có tập phim nào</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cg-body-box is-eps">
      <div className="box-header">
        <div className="flex-grow-1"></div>
        <div className="v-toggle v-toggle-min line-center">
          <div className="text">Rút gọn</div>
          <ToggleSwitch
            id="collapse-toggle"
            defaultState={true}
            onChange={setIsCollapsed}
          />
        </div>
      </div>
      <div className="box-body">
        {isCollapsed ? (
          <div className="de-eps is-grid is-simple">
            {movieData.episode.map((episode) => (
              <Link
                key={episode.episode}
                className={`item ${episode.episode === movieData.currentEpisode ? 'on-air' : ''}`}
                href={`/xem-phim/${movieData.slug}?ep=${episode.episode}`}
              >
                <div className="v-thumbnail h-thumbnail">
                  <div className="play-button">
                    <i className="fa-solid fa-play"></i>
                  </div>
                  <Image
                    alt={`Tập ${episode.episode}`}
                    src={movieData.thumb_url}
                    width={300}
                    height={169}
                    loading="lazy"
                  />
                </div>
                <div className="info">
                  <div className="play-button">
                    <i className="fa-solid fa-play"></i>
                  </div>
                  <div className="ep-sort flex-shrink-0">Tập {episode.episode}</div>
                  {episode.title && <div className="media-title">{episode.title}</div>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="de-eps is-grid">
            {movieData.episode.map((episode) => (
              <Link
                key={episode.episode}
                className={`item ${episode.episode === movieData.currentEpisode ? 'on-air' : ''}`}
                href={`/xem-phim/${movieData.slug}?ep=${episode.episode}`}
              >
                <div className="v-thumbnail h-thumbnail">
                  <div className="play-button">
                    <i className="fa-solid fa-play"></i>
                  </div>
                  <Image
                    alt={`Tập ${episode.episode}`}
                    src={movieData.poster_url || movieData.thumb_url}
                    width={300}
                    height={169}
                    loading="lazy"
                  />
                </div>
                <div className="info">
                  <div className="play-button">
                    <i className="fa-solid fa-play"></i>
                  </div>
                  <div className="ep-sort flex-shrink-0">Tập {episode.episode}</div>
                  <div className="media-title"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 