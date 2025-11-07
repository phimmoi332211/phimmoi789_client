"use client";

import React from "react";
import DetailMain from "./DetailMain";
import DetailSide from "./DetailSide";
import { MovieData, SimilarMovies } from "@/types/detail";

interface DetailContainerProps {
  movieData: MovieData;
  onRatingClick: () => void;
  suggestedMovies?: SimilarMovies[];
  isLoadingSuggested?: boolean;
}

export default function DetailContainer({ 
  movieData, 
  onRatingClick,
  suggestedMovies = [],
  isLoadingSuggested = false
}: DetailContainerProps) {
  return (
    <div className="detail-container">
      <DetailSide 
        movieData={movieData}
        suggestedMovies={suggestedMovies}
        isLoadingSuggested={isLoadingSuggested}
      />
      <DetailMain 
        movieData={movieData} 
        onRatingClick={onRatingClick}
      />
    </div>
  );
} 