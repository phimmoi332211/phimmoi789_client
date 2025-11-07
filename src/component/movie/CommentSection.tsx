"use client";

import React, { useState, useEffect } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { useRouter } from "next/navigation";
import { modalEvent } from "@/events/modal";
import { ratingEvent } from "@/events/modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import CommentList from "./CommentSection/CommentList";
import CommentForm from "./CommentSection/CommentForm";
import TabSwitcher from "./CommentSection/TabSwitcher";
import { toast } from "react-toastify";
import { postComments, postRating } from "@/help/helper";
import { MovieData } from "@/types/detail";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

interface CommentResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: Array<{
      _id: string;
      createdBy: {
        _id: string;
        email: string;
      };
      film: string;
      content: string;
      upVote: number;
      downVote: number;
      children: Array<{
        _id: string;
        createdBy: {
          _id: string;
          email: string;
        };
        content: string;
        upVote: number;
        downVote: number;
        createdAt: string;
      }>;
      createdAt: string;
      tabUser: string;
    }>;
  };
}

interface PinnedItem {
  id: string;
  userName: string;
  content: string;
  time: string;
  avatar: string;
  isAdmin: boolean;
  isPinned: boolean;
  upvotes: number;
  downvotes: number;
  tabUser: string;
}

interface Reply extends PinnedItem {
  parentId: string;
  replyToName: string;
}

interface Comment extends PinnedItem {
  replies?: Reply[];
  showReplies?: boolean;
  showReplyForm?: boolean;
}

interface Review extends PinnedItem {
  rating: string;
  ratingEmoji: string;
  replies?: Reply[];
  showReplies?: boolean;
  showReplyForm?: boolean;
}

interface ServiceResponse {
  statusCode: number;
  data: any;
}

interface CommentSectionProps {
  movieData?: MovieData;
}

export default function CommentSection({ movieData }: CommentSectionProps) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContents, setReplyContents] = useState<{ [key: string]: string }>(
    {}
  );
  const [replySubmitting, setReplySubmitting] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "reviews">(
    "comments"
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newCommentId, setNewCommentId] = useState<string | null>(null);
  const [votedComments, setVotedComments] = useState<{
    [id: string]: "up" | "down";
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFetchedReviews, setIsFetchedReviews] = useState(false);

  // Reset lại khi đổi phim
  useEffect(() => {
    setIsFetchedReviews(false);
  }, [movieData?.slug]);

  const handleReplyClick = (itemId: string) => {
    if (activeTab === "comments") {
      setAllComments((prev) =>
        prev.map((comment) =>
          comment.id === itemId
            ? { ...comment, showReplyForm: !comment.showReplyForm }
            : comment
        )
      );
    } else {
      setAllReviews((prev) =>
        prev.map((review) =>
          review.id === itemId
            ? { ...review, showReplyForm: !review.showReplyForm }
            : review
        )
      );
    }
    setReplyTo(itemId);
  };

  const handleToggleReplies = (itemId: string) => {
    if (activeTab === "comments") {
      setAllComments((prev) =>
        prev.map((comment) =>
          comment.id === itemId
            ? { ...comment, showReplies: !comment.showReplies }
            : comment
        )
      );
    } else {
      setAllReviews((prev) =>
        prev.map((review) =>
          review.id === itemId
            ? { ...review, showReplies: !review.showReplies }
            : review
        )
      );
    }
  };


  // Lọc và sắp xếp comments/reviews để hiển thị
  const displayedItems =
    activeTab === "comments"
      ? allComments
        .filter((comment) => comment.isPinned)
        .concat(allComments.filter((comment) => !comment.isPinned))
      : allReviews
        .filter((review) => review.isPinned)
        .concat(allReviews.filter((review) => !review.isPinned));

  const hasMoreItems =
    activeTab === "comments" ? hasMoreComments : hasMoreReviews;

  const handleLoginClick = () => {
    modalEvent.showLogin();
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleAddReview = (newReview: any) => {
    setAllReviews((prev) => [newReview, ...prev]);
  };

  const handleSubmit = async (value: string) => {
    setSubmitting(true);
    try {
      const body: any = {
        movie: movieData?._id,
        authorName: "ẩn danh",
        content: newComment,
      };
      await postComments(body) as { data?: any };
      setSubmitting(false);
      setNewComment("");
      toast.success("Tạo bình luận thành công");
    } 
    catch (err) {
      alert("Không thể gửi bình luận. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  }

  // Lắng nghe event từ RatingModal
  useEffect(() => {
    const unsubscribe = ratingEvent.subscribe((newReview) => {
      handleAddReview(newReview);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id="comment-area" className="child-box child-discuss">
      <div className="child-header">
        <div className="inc-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g clipPath="url(#clip0_281_3026)">
              <path
                d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <span>Bình luận </span>
        <TabSwitcher activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
      <div className="child-content">
        <div className="discuss-wrap">
          <div className="my-area">
            {activeTab === "comments" && (
              <div className="ma-user">
                <div className="info">
                  <small>Bình luận với tên</small>
                </div>
              </div>
            )}
            {activeTab === "comments" && (
              <>
                <CommentForm
                  value={newComment}
                  onChange={(e: any) => setNewComment(e.target.value)}
                  onSubmit={handleSubmit}
                  loading={submitting}
                  placeholder={replyTo ? "Viết trả lời" : "Viết bình luận"}
                  disabled={submitting}
                  isSpoiler={isSpoiler}
                  setIsSpoiler={setIsSpoiler}
                />
              </>
            )}
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {/* {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <CommentList
                items={displayedItems}
                activeTab={activeTab}
                newCommentId={newCommentId}
                replyContents={replyContents}
                replySubmitting={replySubmitting}
                onReplyClick={handleReplyClick}
                onReplyChange={(id: string, value: string) =>
                  setReplyContents((prev: any) => ({ ...prev, [id]: value }))
                }
                onReplySubmit={handleReplySubmit}
                onVote={handleVote}
                onToggleReplies={handleToggleReplies}
                isSpoiler={isSpoiler}
                setIsSpoiler={setIsSpoiler}
                votedComments={votedComments}
              />
              {hasMoreItems && (
                <div className="d-item py-3 more">
                  <button
                    onClick={handleLoadMore}
                    className="primary-text"
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Đang tải...
                      </>
                    ) : (
                      <>
                        Xem thêm{" "}
                        {activeTab === "comments" ? "bình luận" : "đánh giá"}...
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )} */}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={handleCloseModals}
          onLoginClick={handleLoginClick}
        />
      )}
    </div>
  );
}

const styles = `
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-new-comment {
    animation: slideIn 0.5s ease-out;
  }

  .d-item {
    transition: all 0.3s ease-out;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
