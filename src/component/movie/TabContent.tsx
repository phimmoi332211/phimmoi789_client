"use client";

import React, { useState } from "react";
import Link from "next/link";
import TabEpisodes from "./tabs/TabEpisodes";
import TabEpisodesSingle from "./tabs/TabEpisodesSingle";
import TabGallery from "./tabs/TabGallery";
import TabCasts from "./tabs/TabCasts";
import TabSuggestion from "./tabs/TabSuggestion";
import { MovieData } from "@/types/detail";

interface TabContentProps {
  movieData?: MovieData;
}

export default function TabContent({ movieData }: TabContentProps) {
  const [activeTab, setActiveTab] = useState("episodes");

  const handleTabClick = (tab: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const isSingleEpisode = movieData?.episode_total === "1";

  return (
    <div className="cg-body">
      <div className="cg-tabs">
        <div className="v-tabs mb-0 nav nav-tabs" role="tablist">
          <Link
            href="#"
            className={`nav-link ${activeTab === "episodes" ? "active" : ""}`}
            onClick={handleTabClick("episodes")}
            role="tab"
            aria-selected={activeTab === "episodes"}
            tabIndex={activeTab === "episodes" ? 0 : -1}
          >
            Tập phim
          </Link>
          <Link
            href="#"
            className={`nav-link ${activeTab === "gallery" ? "active" : ""}`}
            onClick={handleTabClick("gallery")}
            role="tab"
            aria-selected={activeTab === "gallery"}
            tabIndex={activeTab === "gallery" ? 0 : -1}
          >
            Gallery
          </Link>
          <Link
            href="#"
            className={`nav-link ${activeTab === "casts" ? "active" : ""}`}
            onClick={handleTabClick("casts")}
            role="tab"
            aria-selected={activeTab === "casts"}
            tabIndex={activeTab === "casts" ? 0 : -1}
          >
            Diễn viên
          </Link>
          <Link
            href="#"
            className={`nav-link ${activeTab === "suggestion" ? "active" : ""}`}
            onClick={handleTabClick("suggestion")}
            role="tab"
            aria-selected={activeTab === "suggestion"}
            tabIndex={activeTab === "suggestion" ? 0 : -1}
          >
            Đề xuất
          </Link>
        </div>
      </div>

      <div 
        role="tabpanel" 
        className={`fade tab-pane ${activeTab === "episodes" ? "active show" : ""}`}
        style={{ display: activeTab === "episodes" ? "block" : "none" }}
      >
        {isSingleEpisode ? (
          <TabEpisodesSingle movieData={movieData} />
        ) : (
          <TabEpisodes movieData={movieData} />
        )}
      </div>

      <div 
        role="tabpanel" 
        className={`fade tab-pane ${activeTab === "gallery" ? "active show" : ""}`}
        style={{ display: activeTab === "gallery" ? "block" : "none" }}
      >
        <TabGallery movieData={movieData} />
      </div>

      <div 
        role="tabpanel" 
        className={`fade tab-pane ${activeTab === "casts" ? "active show" : ""}`}
        style={{ display: activeTab === "casts" ? "block" : "none" }}
      >
        <TabCasts movieData={movieData} />
      </div>

      <div 
        role="tabpanel" 
        className={`fade tab-pane ${activeTab === "suggestion" ? "active show" : ""}`}
        style={{ display: activeTab === "suggestion" ? "block" : "none" }}
      >
        <TabSuggestion movieData={movieData.similarMovies} />
      </div>
    </div>
  );
} 