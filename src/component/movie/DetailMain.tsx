"use client";

import React from "react";
import ActionBar from "./ActionBar";
import TabContent from "./TabContent";
import CommentSection from "./CommentSection";
import { MovieData } from "@/types/detail";

interface DetailMainProps {
  movieData?: MovieData;
  onRatingClick: () => void;
}

export default function DetailMain({ movieData, onRatingClick }: DetailMainProps) {
  return (
    <div className="dc-main">
      <ActionBar 
        movieData={movieData} 
        onRatingClick={onRatingClick}
      />
      <div className="content-gap">
        <TabContent movieData={movieData} />
        <CommentSection movieData={movieData} />
      </div>
    </div>
  );
} 