"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieData, TopMovie } from "@/types/detail";
// import { fetchSuggestedMovies } from "@/services/detail.service";

interface SuggestedMovie {
  slug: string;
  title: string;
  name_english: string;
  thumb_url: string;
  poster_url: string;
  episode_total: string;
  lang: string;
}

interface TabSuggestionProps {
  movieData: MovieData;
}

const TabSuggestion: React.FC<TabSuggestionProps> = ({ movieData }) => {
  const [suggestedMovies, setSuggestedMovies] = useState<TopMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // const loadSuggestedMovies = async () => {
    //   try {
    //     const response = await fetchSuggestedMovies();
    //     if (response?.data?.result) {
    //       const transformedMovies: TopMovie[] = response.data.result.map((movie: SuggestedMovie) => ({
    //         id: movie.slug,
    //         title: movie.title,
    //         alias: movie.name_english,
    //         image: movie.thumb_url,
    //         episodes: movie.episode_total ? parseInt(movie.episode_total) : 0,
    //         hasSubtitle: movie.lang === "Vietsub",
    //         hasDubbing: movie.lang === "Thuyết minh",
    //         lang: movie.lang
    //       }));
    //       setSuggestedMovies(transformedMovies);
    //     }
    //   } catch (error) {
    //     console.error('Error loading suggested movies:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // loadSuggestedMovies();
  }, []);

  if (isLoading) {
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

  if (!suggestedMovies || suggestedMovies.length === 0) {
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
          {suggestedMovies.map((movie) => (
            <div key={movie.id} className="sw-item">
              <Link href={`/phim/${movie.id}`} className="v-thumbnail">
                <div className="pin-new m-pin-new">
                  <div className="line-center line-pd">{movie.lang}</div>
                </div>
                <div>
                  <Image
                    alt={`Xem Phim ${movie.title} Vietsub HD Online - Phimmoi789`}
                    loading="lazy"
                    src={movie.image}
                    width={180}
                    height={260}
                  />
                </div>
              </Link>
              <div className="info">
                <h4 className="item-title lim-1">
                  <Link title={movie.title} href={`/phim/${movie.id}`}>
                    {movie.title}
                  </Link>
                </h4>
                <h4 className="alias-title lim-1">
                  <Link title={movie.alias} href={`/phim/${movie.id}`}>
                    {movie.alias}
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
