"use client";

import React from "react";
import FavoriteButton from "./FavoriteButton";
import PlaylistDropdown from "./PlaylistDropdown";
import ShareButton from "./ShareButton";

interface VideoBarProps {
  slug: string;
  title: string;
}

export default function VideoBar({ slug, title }: VideoBarProps) {
  return (
    <div className="line-center player-control">
      <div className="line-center control-items">
        <FavoriteButton slug={slug} variant="compact" />
        <PlaylistDropdown slug={slug} variant="compact" />
        <ShareButton slug={slug} title={title} variant="compact" />
        <div className="flex-grow-1"></div>
        <div
          className="item item-report"
          data-bs-toggle="modal"
          data-bs-target="#report-film"
        >
          <i className="fa-solid fa-flag"></i>
          <span>Báo lỗi</span>
        </div>
      </div>
    </div>
  );
} 