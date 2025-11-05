"use client";

import React from "react";

interface RatingButtonProps {
  rating: number;
  onClick: () => void;
}

export default function RatingButton({ rating, onClick }: RatingButtonProps) {
  return (
    <div className="v-rating" onClick={onClick}>
      <div className="ro-rating">
        <div className="ro-icon" style={{ backgroundImage: "url('/images/ro-icon.svg')" }}></div>
        <span className="point">{rating}</span>
        <span className="a-rate">Đánh giá</span>
      </div>
    </div>
  );
} 