"use client";

import React, { useState, useEffect } from "react";
import { MovieData, TopMovie } from "@/types/detail";
import Banner from "./Banner";
import WrapperWithSlide from "./WrapperWithSlide";
import DetailContainer from "./DetailContainer";
import RatingModal from "./RatingModal";
import PlaylistModal from "@/component/modal/PlaylistModal";
// import { fetchSuggestedMovies, updateFilmView } from "@/services/detail.service";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { modalEvent } from "@/events/modal";

interface SuggestedMovie {
  slug: string;
  title: string;
  name_english: string;
  thumb_url: string;
  poster_url: string;
  episode_total: string;
  lang: string;
}

interface MovieDetailClientProps {
  initialMovieData: MovieData;
}

export default function MovieDetailClient({
  initialMovieData,
}: MovieDetailClientProps) {
  const { authUser } = useAuth();
  if (!initialMovieData) {
    return <div>Loading...</div>;
  }

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [movieData] = useState<MovieData>(initialMovieData);
  const [suggestedMovies, setSuggestedMovies] = useState<TopMovie[]>([]);
  const [isLoadingSuggested, setIsLoadingSuggested] = useState(true);

  useEffect(() => {
    const handleShowPlaylist = () => {
      setShowPlaylistModal(true);
    };

    modalEvent.on("showPlaylist", handleShowPlaylist);

    return () => {
      modalEvent.off("showPlaylist", handleShowPlaylist);
    };
  }, []);

  useEffect(() => {
    const loadSuggestedMovies = async () => {
      // try {
      //   const response = await fetchSuggestedMovies();
      //   if (response?.data?.result) {
      //     const transformedMovies: TopMovie[] = response.data.result.map(
      //       (movie: SuggestedMovie) => ({
      //         id: movie.slug,
      //         title: movie.title,
      //         alias: movie.name_english,
      //         image: movie.thumb_url,
      //         episodes: movie.episode_total ? parseInt(movie.episode_total) : 0,
      //         hasSubtitle: movie.lang === "Vietsub",
      //         hasDubbing: movie.lang === "Thuyết minh",
      //         lang: movie.lang,
      //       })
      //     );
      //     setSuggestedMovies(transformedMovies);
      //   }
      // } catch (error) {
      //   setSuggestedMovies([]);
      // } finally {
      //   setIsLoadingSuggested(false);
      // }
    };

    loadSuggestedMovies();
  }, []);

  useEffect(() => {
    const updateView = async () => {
      if (!movieData.slug) return;

      try {
        // await updateFilmView(movieData.slug);
      } catch (error) {}
    };

    updateView();
  }, [movieData.slug]);

  return (
    <main className="w-full h-full">
      <Banner movieData={movieData} />
      <WrapperWithSlide>
        <DetailContainer
          movieData={movieData}
          onRatingClick={() => setShowRatingModal(true)}
          suggestedMovies={suggestedMovies}
          isLoadingSuggested={isLoadingSuggested}
        />
      </WrapperWithSlide>

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
    </main>
  );
}
