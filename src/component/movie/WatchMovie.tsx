"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { MovieData, TopMovie } from "@/types/detail";
// import {
//   fetchSuggestedMovies,
//   updateFilmView,
// } from "@/services/detail.service";
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from "@/events/modal";
import WatchPlayer from "./WatchPlayer";
import WatchMainContent from "./WatchMainContent";
import WatchSideContent from "./WatchSideContent";
import RatingModal from "./RatingModal";
import PlaylistModal from "@/component/modal/PlaylistModal";
import Head from "next/head";

interface WatchMovieProps {
  initialMovieData?: MovieData;
}

export default function WatchMovie({ initialMovieData }: WatchMovieProps) {
  console.log("initialMovieData", initialMovieData);
  
  const params = useParams();
  const searchParams = useSearchParams();
  const { authUser } = useAuth();
  const slug = params.slug as string;

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [movieData] = useState<MovieData | undefined>(initialMovieData);
  const [suggestedMovies, setSuggestedMovies] = useState<TopMovie[]>([]);

  // Progress state
  const [watchProgress, setWatchProgress] = useState(0);

  // Current episode number from query param
  const [currentEpNumber, setCurrentEpNumber] = useState("1");

  useEffect(() => {
    setCurrentEpNumber(searchParams.get("ep") ?? "1");
  }, [searchParams]);

  // Playlist modal listener
  useEffect(() => {
    const handleShowPlaylist = () => {
      setShowPlaylistModal(true);
    };

    modalEvent.on("showPlaylist", handleShowPlaylist);
    return () => {
      modalEvent.off("showPlaylist", handleShowPlaylist);
    };
  }, []);

  // Load suggested movies
  useEffect(() => {
    const loadSuggestedMovies = async () => {
      try {
        // const response = await fetchSuggestedMovies();
        // if (response?.data?.result) {
        //   const transformedMovies: TopMovie[] = response.data.result.map(
        //     (movie) => ({
        //       id: movie.slug,
        //       title: movie.title,
        //       alias: movie.name_english,
        //       image: movie.poster_url,
        //       episodes: movie.episode_total ? parseInt(movie.episode_total) : 0,
        //       hasSubtitle: movie.lang === "Vietsub",
        //       hasDubbing: movie.lang === "Thuyết minh",
        //       lang: movie.lang,
        //     })
        //   );
        //   setSuggestedMovies(transformedMovies);
        // }
      } catch (error) {
        setSuggestedMovies([]);
      }
    };

    loadSuggestedMovies();
  }, []);

  // Update view count
  useEffect(() => {
    const updateView = async () => {
      if (!slug) return;
      try {
        // await updateFilmView(slug);
      } catch (error) {
        // ignore
      }
    };
    updateView();
  }, [slug]);

  if (!movieData) {
    return null;
  }

  const {
    title,
    name_english,
    thumb_url,
    poster_url,
    rating,
    actors,
    episode,
  } = movieData;

  const currentEpisode =
    episode?.find((ep) => ep.episode === currentEpNumber) ||
    episode?.[0] ||
    null;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={movieData.description} />
        <meta name="keywords" content={`${title}, ${name_english}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={movieData.description || ""} />
        <meta property="og:image" content={poster_url || thumb_url} />
        <meta property="og:type" content="video.movie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={movieData.description || ""}
        />
        <meta name="twitter:image" content={poster_url || thumb_url} />
      </Head>

      <main className="w-full h-full">
        <div id="wrapper" className="makeup wrapper-watch">
          <WatchPlayer
            key={currentEpNumber} // 🔑 ensures player reloads when ep changes
            title={title}
            slug={slug}
            embedUrl={currentEpisode?.link_m3u8 || ""}
            servers={currentEpisode?.servers || []}
          />

          <div className="watch-container">
            <WatchMainContent
              title={title}
              slug={slug}
              aliasName={name_english}
              thumbnail={thumb_url}
              poster_url={poster_url}
              imdb={movieData.rating?.toString()}
              ageRating={movieData.quality}
              year={movieData.year}
              duration={`${movieData.time}m`}
              categories={
                movieData.category?.map((cat) => ({
                  name: cat.name,
                  slug: cat.slug,
                })) || []
              }
              description={movieData.description}
              episodes={movieData.episode || []}
              currentEpisode={currentEpNumber}
            />

            {/* side component */}
            <WatchSideContent
              title={title}
              rating={rating}
              actors={
                actors?.map((actor) => ({
                  name: actor.name,
                  slug: actor.slug,
                  profile_path: actor.profile_path,
                })) || []
              }
              suggestedMovies={suggestedMovies}
              onRatingClick={() => setShowRatingModal(true)}
            />
          </div>
        </div>

        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          title={movieData.title}
          film={movieData.slug}
          authToken={authUser?.access_token}
          rating={movieData.rating || 0}
        />
        <PlaylistModal
          isOpen={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
        />
        <div className="focus-backdrop"></div>
      </main>
    </>
  );
}
