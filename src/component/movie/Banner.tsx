"use client";

import React from "react";
import { MovieData } from "@/types/detail";

interface BannerProps {
  movieData?: MovieData;
}

export default function Banner({ movieData }: BannerProps) {
  const { poster_url } = movieData || {};

  return (
    <div className="top-detail-wrap">
      <div 
        className="background-fade" 
        style={{ 
          backgroundImage: `url('${poster_url}')`
        }}
      />
      <div className="cover-fade">
        <div 
          className="cover-image" 
          style={{ 
              backgroundImage: `url('${poster_url}')`
          }}
        />
      </div>
    </div>
  );
} 