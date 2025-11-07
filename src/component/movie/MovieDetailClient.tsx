"use client";

import React, { useState, useEffect } from "react";
import { MovieData } from "@/types/detail";
import Banner from "./Banner";
import WrapperWithSlide from "./WrapperWithSlide";
import DetailContainer from "./DetailContainer";
import RatingModal from "./RatingModal";
import PlaylistModal from "@/component/modal/PlaylistModal";
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from "@/events/modal";

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
          suggestedMovies={movieData?.similarMovies}
          isLoadingSuggested={isLoadingSuggested}
        />
      </WrapperWithSlide>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title={movieData.title}
        _id={movieData._id}
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
