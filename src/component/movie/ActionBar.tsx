"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Episode, MovieData } from "@/types/detail";
import RatingButton from "./RatingButton";
import PlaylistDropdown from "./PlaylistDropdown";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

interface ActionBarProps {
  movieData?: MovieData;
  onRatingClick: () => void;
}

interface Playlist {
  _id: string;
  title: string;
}

export default function ActionBar({ movieData, onRatingClick }: ActionBarProps) {
  const { rating = 10, title, slug, episodes } = movieData || {};
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const handleAction = async (action: string) => {
    // Xử lý các hành động khi đã đăng nhập
    switch (action) {
      case 'comment':
        // Scroll xuống CommentSection
        const commentSection = document.getElementById('comment-area');
        if (commentSection) {
          commentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        break;
      case 'rating':
        onRatingClick();
        break;
    }
  };

  const defaultEpisode = (episodes: Episode[]) => {
    if (episodes.length > 0) {
      return `?tap=${episodes[0].episode}`
    }
    return '';
  }

  // Đóng dropdown khi click ra ngoài
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.share-dropdown') && !target.closest('.item-share')) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dm-bar">
      <div className="elements">
        {episodes && episodes.length > 0 && (
          <Link
            className="btn btn-xl btn-rounded button-play flex-shrink-0"
            href={`/xem-phim/${slug}${defaultEpisode(episodes)}`}
          >
            <i className="fa-solid fa-play"></i>
            <span>Xem Ngay</span>
          </Link>
        )}

        <div className="touch-group flex-grow-1">
          <div className="is-left flex-grow-1">
            <FavoriteButton slug={slug} />
            <PlaylistDropdown slug={slug} />
            <ShareButton slug={slug} title={title} />
            <div className="item item-comment">
              <Link className="item-v" href="#" onClick={(e) => { e.preventDefault(); handleAction('comment'); }}>
                <div className="inc-icon icon-16">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clipPath="url(#clip0_281_3026)">
                      <path d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z" fill="currentColor"></path>
                    </g>
                  </svg>
                </div>
                <span>Bình luận</span>
              </Link>
            </div>
          </div>
          <div className="is-right">
            <RatingButton rating={rating} onClick={() => handleAction('rating')} />
          </div>
        </div>
      </div>
    </div>
  );
} 