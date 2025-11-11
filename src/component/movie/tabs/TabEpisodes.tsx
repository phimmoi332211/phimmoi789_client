"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "../ToggleSwitch";
import { MovieData } from "@/types/detail";
import { useParams, useSearchParams } from "next/navigation";

interface TabEpisodesProps {
  movieData: MovieData;
}

export default function TabEpisodes({ movieData }: TabEpisodesProps) {
  const searchParams = useSearchParams();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentEpNumber, setCurrentEpNumber] = useState("1");

  if (!movieData?.episodes || !Array.isArray(movieData.episodes)) {
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

  useEffect(() => {
    setCurrentEpNumber(searchParams.get("tap") ?? "1");
  }, [searchParams]);

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
            {movieData.episodes.map((episode, index) => (
              <Link
                key={index}
                className={`item ${episode.episode === Number(currentEpNumber) ? 'on-air' : ''}`}
                href={`/xem-phim/${movieData.slug}?tap=${episode.episode}`}
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
            {movieData.episodes.map((episode, index) => (
              <Link
                key={index}
                className={`item ${episode.episode === movieData.currentEpisode ? 'on-air' : ''}`}
                href={`/xem-phim/${movieData.slug}?tap=${episode.episode}`}
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