"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  lang?: string;
}

interface TabEpisodesSingleProps {
  movieData: MovieData;
}

export default function TabEpisodesSingle({ movieData }: TabEpisodesSingleProps) {
  const episode = movieData.episode?.[0];

  if (!episode) {
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
      <div className="box-body">
        <div className="de-type">
          <Link 
            className="item pd"
            href={`/xem-phim/${movieData.slug}`}
          >
            <div className="m-thumbnail">
              <Image 
                alt={`Xem Phim ${movieData.title} Vietsub HD Online - Phimmoi789`}
                src={movieData.poster_url}
                width={300}
                height={169}
                loading="lazy"
              />
            </div>
            <div className="info">
              <div className="ver line-center">
                <div className="inc-icon icon-20">
                  <Image src="/images/icons/pd.svg" alt="Phụ đề" width={20} height={20} />
                </div>
                <span>{movieData.lang}</span>
              </div>
              <div className="media-title lim-2 mb-0">{movieData.title}</div>
              <div className="btn btn-sm btn-light">Xem bản này</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
