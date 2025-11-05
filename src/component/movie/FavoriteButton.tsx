"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from "@/events/modal";
// import { fetchFavorite, toggleFavorite } from "@/services/detail.service";

interface FavoriteButtonProps {
  slug?: string;
  variant?: "default" | "compact";
}

export default function FavoriteButton({
  slug,
  variant = "default",
}: FavoriteButtonProps) {
  const { authUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!authUser?.access_token || !slug) return;

      try {
        // const response = await fetchFavorite() as { statusCode?: number, data?: { favorite?: any[] } };
        // if (response?.statusCode === 200 && response.data?.favorite) {
        //   const isInFavorites = response.data.favorite.some((item: any) => item.slug === slug);
        //   setIsFavorite(isInFavorites);
        // }
      } catch (error) {}
    };

    checkFavoriteStatus();
  }, [authUser, slug]);

  const handleFavorite = async () => {
    // if (!authUser?.access_token) {
    //   modalEvent.showLogin();
    //   return;
    // }
    // try {
    //   if (!slug) {
    //     toast.error("Không tìm thấy thông tin phim!");
    //     return;
    //   }
    //   const response = await toggleFavorite(slug, !isFavorite) as { statusCode?: number };
    //   if (response?.statusCode === 200) {
    //     setIsFavorite(!isFavorite);
    //     toast.success(!isFavorite ? "Đã thêm vào danh sách yêu thích!" : "Đã xóa khỏi danh sách yêu thích!");
    //   }
    // } catch (error: any) {
    //   setIsLoading(false);
    //   if (error.response?.status === 401) {
    //     toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
    //     modalEvent.showLogin();
    //   } else {
    //     toast.error("Không thể thực hiện thao tác này. Vui lòng thử lại sau!");
    //   }
    // }
  };

  if (variant === "compact") {
    return (
      <div
        className={`item item-like ${isFavorite ? "active" : ""}`}
        onClick={handleFavorite}
        style={{ cursor: "pointer" }}
      >
        <div className="inc-icon icon-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_49_76)">
              <path
                d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <span>Yêu thích</span>
      </div>
    );
  }

  return (
    <div className={`item item-like ${isFavorite ? "active" : ""}`}>
      <Link
        className="item-v"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleFavorite();
        }}
      >
        <div className="inc-icon icon-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_49_76)">
              <path
                d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <span>{isFavorite ? "Đã thích" : "Yêu thích"}</span>
      </Link>
    </div>
  );
}
