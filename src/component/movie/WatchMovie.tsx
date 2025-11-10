"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { MovieData } from "@/types/detail";
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
  const params = useParams();
  const searchParams = useSearchParams();
  const { authUser } = useAuth();
  const slug = params.slug as string;

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [movieData] = useState<MovieData | undefined>(initialMovieData);

  // Current episode number from query param
  const [currentEpNumber, setCurrentEpNumber] = useState(1);

  useEffect(() => {
    setCurrentEpNumber(Number(searchParams.get("tap")) ?? 1);
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
    episodes,
    similarMovies,
  } = movieData;

  const currentEpisode =
    episodes?.find((ep) => ep.episode === Number(currentEpNumber)) ||
    episodes?.[0] ||
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
            embedUrl={currentEpisode?.servers[0].linkM3u8 || ""}
            servers={currentEpisode?.servers || []}
          />

          <div className="watch-container">
            <WatchMainContent movieData={initialMovieData}/>
            {/* side component */}
            <WatchSideContent
              title={title}
              rating={rating}
              actors={
                actors?.map((actor) => ({
                  name: actor.name,
                  slug: actor.url,
                  profile_path: actor.image_url,
                })) || []
              }
              suggestedMovies={similarMovies}
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
