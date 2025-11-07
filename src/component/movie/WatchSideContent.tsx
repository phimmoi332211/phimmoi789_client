"use client";

import React from "react";
import RatingButton from "./RatingButton";
import ActorList from './ActorList';
import SuggestedMovies from './SuggestedMovies';
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from '@/events/modal';
import type { MovieData, SimilarMovies } from '@/types/detail';

interface Actor {
  name: string;
  slug: string;
  profile_path: string;
}

interface WatchSideContentProps {
  actors: Actor[];
  suggestedMovies: SimilarMovies[];
  title: string;
  rating: number;
  onRatingClick: () => void;
}

export default function WatchSideContent({ actors, suggestedMovies, title, rating, onRatingClick }: WatchSideContentProps) {
  const { authUser } = useAuth();

  const handleCommentClick = () => {
    if (!authUser?.access_token) {
      modalEvent.showLogin();
      return;
    }

    const commentSection = document.getElementById('comment-area');
    if (commentSection) {
      commentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="wc-side">
      {/* Rating section */}
      <div className="ws-rate">
        <div className="line-center gap-3 wsr-left">
          <button className="item-v item-rate" onClick={onRatingClick}>
            <div className="inc-icon icon-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M30.36 14.63C30.94 14.06 31.15 13.23 30.9 12.45C30.65 11.67 29.99 11.12 29.18 11L21.46 9.88C21.46 9.88 21.38 9.85 21.37 9.81L17.92 2.81C17.56 2.08 16.83 1.62 16.01 1.62C15.19 1.62 14.46 2.07 14.1 2.81L10.65 9.81C10.65 9.81 10.6 9.87 10.55 9.88L2.83001 11C2.02001 11.12 1.37001 11.67 1.11001 12.45C0.860006 13.23 1.06001 14.06 1.65001 14.63L7.24001 20.08C7.24001 20.08 7.28001 20.15 7.28001 20.19L5.96001 27.88C5.82001 28.68 6.15001 29.48 6.81001 29.96C7.47001 30.44 8.33001 30.5 9.05001 30.12L15.96 26.49C15.96 26.49 16.04 26.47 16.08 26.49L22.99 30.12C23.3 30.29 23.64 30.37 23.98 30.37C24.42 30.37 24.86 30.23 25.23 29.96C25.89 29.48 26.21 28.68 26.08 27.88L24.76 20.19C24.76 20.19 24.76 20.11 24.8 20.08L30.39 14.63H30.36Z" fill="currentColor"></path>
              </svg>
            </div>
            <span>Đánh giá</span>
          </button>
          <div className="v-line"></div>
          <button className="item-v item-comment" onClick={handleCommentClick}>
            <div className="inc-icon icon-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <g clipPath="url(#clip0_281_3026)">
                  <path d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z" fill="currentColor"></path>
                </g>
              </svg>
            </div>
            <span>Bình luận</span>
          </button>
        </div>
        <RatingButton rating={rating} onClick={onRatingClick} />
      </div>

      <ActorList actors={actors} />
      <SuggestedMovies movies={suggestedMovies} />
    </div>
  );
}