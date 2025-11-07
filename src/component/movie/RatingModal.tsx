"use client";

import React, { useState } from "react";
import { ratingEvent } from "@/events/modal";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { toast } from "react-toastify";
import { postRating } from "@/help/helper";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  rating?: number;
  film?: string;
  _id?: string;
  authToken?: string;
}

export default function RatingModal({
  isOpen,
  onClose,
  title,
  rating = 10,
  film,
  _id,
}: RatingModalProps) {
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRatingClick = (rating: number) => {
    setActiveRating(rating);
  };

  const handleSubmit = async () => {
    if (!activeRating || !_id) return;
    setSubmitting(true);
    try {
      const body: any = {
        movie: _id,
        stars: activeRating,
      };
      const ratingRes =  await postRating(body) as { data?: any };
      setActiveRating(null);
      setComment("");
      toast.success(ratingRes?.data?.message);
      onClose();
    } catch (err) {
      alert("Không thể gửi đánh giá. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade v-modal modal-md modal show"
        tabIndex={-1}
        style={{ display: "block", zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="btn modal-close" onClick={onClose}>
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="is-header mb-2">
              <h4 className="heading-sm text-center mb-0">{title}</h4>
            </div>
            <div className="is-body mb-5">
              <div className="d-block text-center mb-4">
                <div className="line-center">
                  <div className="ro-icon"></div>
                  <strong className="text-white">{rating}</strong>
                  <span>/ 10 lượt đánh giá</span>
                </div>
              </div>
              <div className="rate-emo">
                <div
                  className={`item-v ${activeRating === 5 ? "active" : ""}`}
                  onClick={() => handleRatingClick(5)}
                >
                  <div className="inc-icon">
                    <Image
                      src="/images/reviews/rate-5.webp"
                      alt="Tuyệt vời"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span>Tuyệt vời</span>
                </div>
                <div
                  className={`item-v ${activeRating === 4 ? "active" : ""}`}
                  onClick={() => handleRatingClick(4)}
                >
                  <div className="inc-icon">
                    <Image
                      src="/images/reviews/rate-4.webp"
                      alt="Phim hay"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span>Phim hay</span>
                </div>
                <div
                  className={`item-v ${activeRating === 3 ? "active" : ""}`}
                  onClick={() => handleRatingClick(3)}
                >
                  <div className="inc-icon">
                    <Image
                      src="/images/reviews/rate-3.webp"
                      alt="Khá ổn"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span>Khá ổn</span>
                </div>
                <div
                  className={`item-v ${activeRating === 2 ? "active" : ""}`}
                  onClick={() => handleRatingClick(2)}
                >
                  <div className="inc-icon">
                    <Image
                      src="/images/reviews/rate-2.webp"
                      alt="Phim chán"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span>Phim chán</span>
                </div>
                <div
                  className={`item-v ${activeRating === 1 ? "active" : ""}`}
                  onClick={() => handleRatingClick(1)}
                >
                  <div className="inc-icon">
                    <Image
                      src="/images/reviews/rate-1.webp"
                      alt="Dở tệ"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span>Dở tệ</span>
                </div>
              </div>
              {/* <div className="rate-comment">
                <textarea
                  className="form-control v-form-control"
                  rows={3}
                  cols={3}
                  placeholder="Viết nhận xét về phim (tuỳ chọn)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div> */}
            </div>
            <div className="is-footer gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!activeRating || submitting}
              >
                {submitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
              <button
                type="button"
                className="btn btn-light px-4"
                onClick={onClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
