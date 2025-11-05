"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { modalEvent } from "@/events/modal";
import { ratingEvent } from "@/events/modal";
// import {
//   fetchCommentsByFilm,
//   postComment,
//   voteComment,
//   fetchRatingsByFilm,
//   postRating,
//   voteRating
// } from "@/services/detail.service";
import { Comment as ApiComment } from "@/types/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { toast } from "react-toastify";
import CommentList from "./CommentSection/CommentList";
import CommentForm from "./CommentSection/CommentForm";
import TabSwitcher from "./CommentSection/TabSwitcher";

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
  movieData?: any;
}

// Array mapping điểm đánh giá sang emoji và text
const ratingEmojis = [
  { point: 5, emoji: "😍", text: "Tuyệt vời" },
  { point: 4, emoji: "😊", text: "Phim hay" },
  { point: 3, emoji: "🙂", text: "Khá ổn" },
  { point: 2, emoji: "😕", text: "Phim chán" },
  { point: 1, emoji: "😡", text: "Dở tệ" },
];

export default function CommentSection({ movieData }: CommentSectionProps) {
  const { authUser } = useAuth();
  const router = useRouter();
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [visibleComments, setVisibleComments] = useState(3);
  const [visibleReviews, setVisibleReviews] = useState(3);
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

  useEffect(() => {
    // const fetchComments = async () => {
    //   if (!authUser?.access_token) {
    //     setLoading(false);
    //     return;
    //   }
    //   try {
    //     setLoading(true);
    //     setCurrentPage(1);
    //     const response = await fetchCommentsByFilm(movieData?.slug, 1, 10) as ServiceResponse;
    //     if (response.statusCode === 200 || response.statusCode === 201) {
    //       const { result } = response.data;
    //       const { total, pages } = response.data.meta;
    //       setHasMoreComments(1 < pages);
    //       // Chuyển đổi dữ liệu từ API sang định dạng phù hợp
    //       const formattedComments = result.map((comment: any) => ({
    //         id: comment._id,
    //         userName: comment.user?.name || comment.tabUser || comment.createdBy.email.split('@')[0],
    //         content: comment.content,
    //         time: dayjs(comment.createdAt).fromNow(),
    //         avatar: typeof comment.user === 'object' && comment.user?.avatar ? comment.user.avatar : "/image/16.jpg",
    //         isAdmin: typeof comment.user === 'object' && comment.user?.role === "admin",
    //         isPinned: false,
    //         upvotes: comment.upVote,
    //         downvotes: comment.downVote,
    //         tabUser: comment.tabUser || comment.createdBy.email.split('@')[0],
    //         replies: comment.children?.map((reply: any) => ({
    //           id: reply._id,
    //           userName: reply.user?.name || reply.tabUser || reply.createdBy.email.split('@')[0],
    //           content: reply.content,
    //           time: dayjs(reply.createdAt).fromNow(),
    //           avatar: typeof reply.user === 'object' && reply.user?.avatar ? reply.user.avatar : "/image/16.jpg",
    //           isAdmin: typeof reply.user === 'object' && reply.user?.role === "admin",
    //           isPinned: false,
    //           upvotes: reply.upVote,
    //           downvotes: reply.downVote,
    //           tabUser: reply.tabUser || reply.createdBy.email.split('@')[0],
    //           parentId: comment._id,
    //           replyToName: comment.user?.name || comment.tabUser || comment.createdBy.email.split('@')[0]
    //         })) || [],
    //         showReplies: false,
    //         showReplyForm: false
    //       }));
    //       setAllComments(formattedComments);
    //       setError(null);
    //     }
    //   } catch (err) {
    //     setError("Không thể tải bình luận. Vui lòng thử lại sau.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchComments();
  }, [movieData?.slug, authUser?.access_token]);

  // Fetch ratings (reviews)
  useEffect(() => {
    // const fetchRatings = async () => {
    //   if (!movieData?.slug || isFetchedReviews) return;
    //   try {
    //     setLoading(true);
    //     setCurrentPage(1);
    //     const response = await fetchRatingsByFilm(movieData.slug, 1, 10) as ServiceResponse;
    //     if (response.statusCode === 200 || response.statusCode === 201) {
    //       const { result } = response.data;
    //       const { total, pages } = response.data.meta;
    //       setHasMoreReviews(1 < pages);
    //       // Map dữ liệu rating sang Review
    //       const formattedReviews = result.map((item: any) => {
    //         const found = ratingEmojis.find(e => e.point === Number(item.point));
    //         return {
    //           id: item._id,
    //           userName: item.user?.name || item.createdBy?.email?.split('@')[0] || 'Ẩn danh',
    //           content: item.content,
    //           time: dayjs(item.createdAt).fromNow(),
    //           avatar: typeof item.user === 'object' && item.user?.avatar ? item.user.avatar : "/image/16.jpg",
    //           rating: found ? found.text : '',
    //           ratingEmoji: found ? found.emoji : '',
    //           isAdmin: typeof item.user === 'object' && item.user?.role === "admin",
    //           isPinned: false,
    //           upvotes: item.upVote || 0,
    //           downvotes: item.downVote || 0,
    //           tabUser: item.user?.name || item.createdBy?.email?.split('@')[0] || 'Ẩn danh',
    //           replies: [],
    //           showReplies: false,
    //           showReplyForm: false
    //         };
    //       });
    //       setAllReviews(formattedReviews);
    //       setIsFetchedReviews(true);
    //     }
    //   } catch (err) {
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // if (activeTab === 'reviews' && !isFetchedReviews) {
    //   fetchRatings();
    // }
  }, [movieData?.slug, activeTab, isFetchedReviews]);

  // Reset lại khi đổi phim
  useEffect(() => {
    setIsFetchedReviews(false);
  }, [movieData?.slug]);

  const handleLoadMore = async () => {
    // if (loadingMore) return;
    // try {
    //   setLoadingMore(true);
    //   const nextPage = currentPage + 1;
    //   if (activeTab === 'comments') {
    //     const response = await fetchCommentsByFilm(movieData?.slug, nextPage, 10) as ServiceResponse;
    //     if (response.statusCode === 200 || response.statusCode === 201) {
    //       const { result } = response.data;
    //       const { total, pages } = response.data.meta;
    //       setHasMoreComments(nextPage < pages);
    //       const newComments = result.map((comment: any) => ({
    //         id: comment._id,
    //         userName: comment.user?.name || comment.tabUser || comment.createdBy.email.split('@')[0],
    //         content: comment.content,
    //         time: dayjs(comment.createdAt).fromNow(),
    //         avatar: typeof comment.user === 'object' && comment.user?.avatar ? comment.user.avatar : "/image/16.jpg",
    //         isAdmin: typeof comment.user === 'object' && comment.user?.role === "admin",
    //         isPinned: false,
    //         upvotes: comment.upVote,
    //         downvotes: comment.downVote,
    //         tabUser: comment.tabUser || comment.createdBy.email.split('@')[0],
    //         replies: comment.children?.map((reply: any) => ({
    //           id: reply._id,
    //           userName: reply.user?.name || reply.tabUser || reply.createdBy.email.split('@')[0],
    //           content: reply.content,
    //           time: dayjs(reply.createdAt).fromNow(),
    //           avatar: typeof reply.user === 'object' && reply.user?.avatar ? reply.user.avatar : "/image/16.jpg",
    //           isAdmin: typeof reply.user === 'object' && reply.user?.role === "admin",
    //           isPinned: false,
    //           upvotes: reply.upVote,
    //           downvotes: reply.downVote,
    //           tabUser: reply.tabUser || reply.createdBy.email.split('@')[0],
    //           parentId: comment._id,
    //           replyToName: comment.user?.name || comment.tabUser || comment.createdBy.email.split('@')[0]
    //         })) || [],
    //         showReplies: false,
    //         showReplyForm: false
    //       }));
    //       setAllComments(prev => [...prev, ...newComments]);
    //       setCurrentPage(nextPage);
    //     }
    //   } else {
    //     const response = await fetchRatingsByFilm(movieData?.slug, nextPage, 10) as ServiceResponse;
    //     if (response.statusCode === 200 || response.statusCode === 201) {
    //       const { result } = response.data;
    //       const { total, pages } = response.data.meta;
    //       setHasMoreReviews(nextPage < pages);
    //       const newReviews = result.map((item: any) => {
    //         const found = ratingEmojis.find(e => e.point === Number(item.point));
    //         return {
    //           id: item._id,
    //           userName: item.user?.name || item.createdBy?.email?.split('@')[0] || 'Ẩn danh',
    //           content: item.content,
    //           time: dayjs(item.createdAt).fromNow(),
    //           avatar: typeof item.user === 'object' && item.user?.avatar ? item.user.avatar : "/image/16.jpg",
    //           rating: found ? found.text : '',
    //           ratingEmoji: found ? found.emoji : '',
    //           isAdmin: typeof item.user === 'object' && item.user?.role === "admin",
    //           isPinned: false,
    //           upvotes: item.upVote || 0,
    //           downvotes: item.downVote || 0,
    //           tabUser: item.user?.name || item.createdBy?.email?.split('@')[0] || 'Ẩn danh',
    //           replies: [],
    //           showReplies: false,
    //           showReplyForm: false
    //         };
    //       });
    //       setAllReviews(prev => [...prev, ...newReviews]);
    //       setCurrentPage(nextPage);
    //     }
    //   }
    // } catch (err) {
    //   toast.error("Không thể tải thêm dữ liệu. Vui lòng thử lại sau.");
    // } finally {
    //   setLoadingMore(false);
    // }
  };

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

  const handleSubmit = async () => {
    // if (!newComment.trim() || !authUser) return;
    // try {
    //   setSubmitting(true);
    //   const commentData = {
    //     film: movieData?.slug,
    //     content: newComment,
    //     ...(activeTab === "reviews" && { point: 5 }),
    //     ...(replyTo && { parent: replyTo }),
    //   };
    //   const response =
    //     activeTab === "comments"
    //       ? ((await postComment(commentData)) as ServiceResponse)
    //       : ((await postRating(commentData)) as ServiceResponse);
    //   if (response.statusCode === 200 || response.statusCode === 201) {
    //     const newCommentData = response.data;
    //     setNewCommentId(newCommentData._id);
    //     if (replyTo) {
    //       // Xử lý reply
    //       if (activeTab === "comments") {
    //         setAllComments((prev) =>
    //           prev.map((comment) =>
    //             comment.id === replyTo
    //               ? {
    //                   ...comment,
    //                   replies: [
    //                     ...(comment.replies || []),
    //                     {
    //                       id: newCommentData._id,
    //                       userName: authUser.user.name,
    //                       content: newCommentData.content,
    //                       time: dayjs(newCommentData.createdAt).fromNow(),
    //                       avatar:
    //                         typeof authUser.user === "object" &&
    //                         authUser.user?.avatar
    //                           ? authUser.user.avatar
    //                           : "/image/16.jpg",
    //                       isAdmin: false,
    //                       isPinned: false,
    //                       upvotes: newCommentData.upVote,
    //                       downvotes: newCommentData.downVote,
    //                       tabUser: authUser.user.name,
    //                       parentId: replyTo,
    //                       replyToName: comment.tabUser,
    //                     },
    //                   ],
    //                   showReplyForm: false,
    //                 }
    //               : comment
    //           )
    //         );
    //         toast.success("Đã gửi trả lời thành công!");
    //       } else {
    //         setAllReviews((prev) =>
    //           prev.map((review) =>
    //             review.id === replyTo
    //               ? {
    //                   ...review,
    //                   replies: [
    //                     ...(review.replies || []),
    //                     {
    //                       id: newCommentData._id,
    //                       userName: authUser.user.name,
    //                       content: newCommentData.content,
    //                       time: dayjs(newCommentData.createdAt).fromNow(),
    //                       avatar:
    //                         typeof authUser.user === "object" &&
    //                         authUser.user?.avatar
    //                           ? authUser.user.avatar
    //                           : "/image/16.jpg",
    //                       isAdmin: false,
    //                       isPinned: false,
    //                       upvotes: newCommentData.upVote,
    //                       downvotes: newCommentData.downVote,
    //                       tabUser: authUser.user.name,
    //                       parentId: replyTo,
    //                       replyToName: review.tabUser,
    //                     },
    //                   ],
    //                   showReplyForm: false,
    //                 }
    //               : review
    //           )
    //         );
    //         toast.success("Đã gửi trả lời thành công!");
    //       }
    //     } else {
    //       // Xử lý comment/review mới
    //       if (activeTab === "comments") {
    //         const comment: Comment = {
    //           id: newCommentData._id,
    //           userName: authUser.user.name,
    //           content: newCommentData.content,
    //           time: dayjs(newCommentData.createdAt).fromNow(),
    //           avatar:
    //             typeof authUser.user === "object" && authUser.user?.avatar
    //               ? authUser.user.avatar
    //               : "/image/16.jpg",
    //           isAdmin: false,
    //           isPinned: false,
    //           upvotes: newCommentData.upVote,
    //           downvotes: newCommentData.downVote,
    //           tabUser: authUser.user.name,
    //           replies: [],
    //           showReplies: false,
    //           showReplyForm: false,
    //         };
    //         setAllComments((prev) => {
    //           const lastPinnedIndex = prev.findIndex(
    //             (c) => c.isPinned === false
    //           );
    //           if (lastPinnedIndex === -1) {
    //             const pinned = prev.filter((c) => c.isPinned);
    //             const notPinned = prev.filter((c) => !c.isPinned);
    //             return [...pinned, comment, ...notPinned];
    //           } else {
    //             const pinned = prev.filter((c) => c.isPinned);
    //             const notPinned = prev.filter((c) => !c.isPinned);
    //             return [...pinned, comment, ...notPinned];
    //           }
    //         });
    //         toast.success("Đã gửi bình luận thành công!");
    //       } else {
    //         const review: Review = {
    //           id: newCommentData._id,
    //           userName: authUser.user.name,
    //           content: newCommentData.content,
    //           time: dayjs(newCommentData.createdAt).fromNow(),
    //           avatar:
    //             typeof authUser.user === "object" && authUser.user?.avatar
    //               ? authUser.user.avatar
    //               : "/image/16.jpg",
    //           rating:
    //             ratingEmojis.find(
    //               (e) => e.point === Number(newCommentData.point)
    //             )?.text || "",
    //           ratingEmoji:
    //             ratingEmojis.find(
    //               (e) => e.point === Number(newCommentData.point)
    //             )?.emoji || "",
    //           isAdmin: false,
    //           isPinned: false,
    //           upvotes: newCommentData.upVote,
    //           downvotes: newCommentData.downVote,
    //           tabUser: authUser.user.name,
    //           replies: [],
    //           showReplies: false,
    //           showReplyForm: false,
    //         };
    //         const lastPinnedIndex = allReviews.findIndex((r) => r.isPinned);
    //         if (lastPinnedIndex === -1) {
    //           setAllReviews([review, ...allReviews]);
    //         } else {
    //           const newReviews = [...allReviews];
    //           newReviews.splice(lastPinnedIndex + 1, 0, review);
    //           setAllReviews(newReviews);
    //         }
    //         toast.success("Đã gửi đánh giá thành công!");
    //       }
    //     }
    //     setNewComment("");
    //     setReplyTo(null);
    //     setTimeout(() => {
    //       setNewCommentId(null);
    //     }, 1000);
    //   }
    // } catch (err) {
    //   setError("Không thể gửi bình luận. Vui lòng thử lại sau.");
    //   toast.error("Không thể gửi bình luận. Vui lòng thử lại sau.");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const handleVote = async (commentId: string, type: "up" | "down") => {
    // if (!authUser) {
    //   handleLoginClick();
    //   return;
    // }
    // try {
    //   const upVote = type === "up" ? 1 : 0;
    //   const downVote = type === "down" ? 1 : 0;
    //   const response =
    //     activeTab === "comments"
    //       ? ((await voteComment(
    //           commentId,
    //           upVote,
    //           downVote
    //         )) as ServiceResponse)
    //       : ((await voteRating(
    //           commentId,
    //           upVote,
    //           downVote
    //         )) as ServiceResponse);
    //   if (response.statusCode === 200) {
    //     // Lấy trạng thái vote hiện tại
    //     const currentVote = votedComments[commentId];
    //     // Cập nhật số vote trên UI
    //     if (activeTab === "comments") {
    //       setAllComments((prev) =>
    //         prev.map((comment) => {
    //           if (comment.id === commentId) {
    //             let upvotes = comment.upvotes;
    //             let downvotes = comment.downvotes;
    //             if (type === "up") {
    //               if (currentVote === "up") {
    //                 upvotes = Math.max(0, upvotes - 1);
    //               } else {
    //                 upvotes = upvotes + 1;
    //                 if (currentVote === "down")
    //                   downvotes = Math.max(0, downvotes - 1);
    //               }
    //             } else if (type === "down") {
    //               if (currentVote === "down") {
    //                 downvotes = Math.max(0, downvotes - 1);
    //               } else {
    //                 downvotes = downvotes + 1;
    //                 if (currentVote === "up")
    //                   upvotes = Math.max(0, upvotes - 1);
    //               }
    //             }
    //             return {
    //               ...comment,
    //               upvotes,
    //               downvotes,
    //             };
    //           }
    //           if (comment.replies) {
    //             return {
    //               ...comment,
    //               replies: comment.replies.map((reply) => {
    //                 if (reply.id === commentId) {
    //                   let upvotes = reply.upvotes;
    //                   let downvotes = reply.downvotes;
    //                   if (type === "up") {
    //                     if (currentVote === "up") {
    //                       upvotes = Math.max(0, upvotes - 1);
    //                     } else {
    //                       upvotes = upvotes + 1;
    //                       if (currentVote === "down")
    //                         downvotes = Math.max(0, downvotes - 1);
    //                     }
    //                   } else if (type === "down") {
    //                     if (currentVote === "down") {
    //                       downvotes = Math.max(0, downvotes - 1);
    //                     } else {
    //                       downvotes = downvotes + 1;
    //                       if (currentVote === "up")
    //                         upvotes = Math.max(0, upvotes - 1);
    //                     }
    //                   }
    //                   return {
    //                     ...reply,
    //                     upvotes,
    //                     downvotes,
    //                   };
    //                 }
    //                 return reply;
    //               }),
    //             };
    //           }
    //           return comment;
    //         })
    //       );
    //     } else {
    //       setAllReviews((prev) =>
    //         prev.map((review) => {
    //           if (review.id === commentId) {
    //             let upvotes = review.upvotes;
    //             let downvotes = review.downvotes;
    //             if (type === "up") {
    //               if (currentVote === "up") {
    //                 upvotes = Math.max(0, upvotes - 1);
    //               } else {
    //                 upvotes = upvotes + 1;
    //                 if (currentVote === "down")
    //                   downvotes = Math.max(0, downvotes - 1);
    //               }
    //             } else if (type === "down") {
    //               if (currentVote === "down") {
    //                 downvotes = Math.max(0, downvotes - 1);
    //               } else {
    //                 downvotes = downvotes + 1;
    //                 if (currentVote === "up")
    //                   upvotes = Math.max(0, upvotes - 1);
    //               }
    //             }
    //             return {
    //               ...review,
    //               upvotes,
    //               downvotes,
    //             };
    //           }
    //           if (review.replies) {
    //             return {
    //               ...review,
    //               replies: review.replies.map((reply) => {
    //                 if (reply.id === commentId) {
    //                   let upvotes = reply.upvotes;
    //                   let downvotes = reply.downvotes;
    //                   if (type === "up") {
    //                     if (currentVote === "up") {
    //                       upvotes = Math.max(0, upvotes - 1);
    //                     } else {
    //                       upvotes = upvotes + 1;
    //                       if (currentVote === "down")
    //                         downvotes = Math.max(0, downvotes - 1);
    //                     }
    //                   } else if (type === "down") {
    //                     if (currentVote === "down") {
    //                       downvotes = Math.max(0, downvotes - 1);
    //                     } else {
    //                       downvotes = downvotes + 1;
    //                       if (currentVote === "up")
    //                         upvotes = Math.max(0, upvotes - 1);
    //                     }
    //                   }
    //                   return {
    //                     ...reply,
    //                     upvotes,
    //                     downvotes,
    //                   };
    //                 }
    //                 return reply;
    //               }),
    //             };
    //           }
    //           return review;
    //         })
    //       );
    //     }
    //     // Cập nhật trạng thái votedComments
    //     setVotedComments((prev) => {
    //       if (type === "up") {
    //         if (currentVote === "up") {
    //           // Bỏ thích
    //           const { [commentId]: _, ...rest } = prev;
    //           return rest;
    //         } else {
    //           return { ...prev, [commentId]: "up" };
    //         }
    //       } else if (type === "down") {
    //         if (currentVote === "down") {
    //           // Bỏ dislike
    //           const { [commentId]: _, ...rest } = prev;
    //           return rest;
    //         } else {
    //           return { ...prev, [commentId]: "down" };
    //         }
    //       }
    //       return prev;
    //     });
    //   }
    // } catch (err) {
    //   setError("Không thể thực hiện vote. Vui lòng thử lại sau.");
    // }
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

  const handleCommentAction = () => {
    if (!authUser) {
      handleLoginClick();
      return;
    }
    // Xử lý các hành động khác khi đã đăng nhập
  };

  const handleReplySubmit = async (parentId: string) => {
    // if (!replyContents[parentId]?.trim() || !authUser) return;
    // try {
    //   setReplySubmitting((prev) => ({ ...prev, [parentId]: true }));
    //   const commentData = {
    //     film: movieData?.slug,
    //     content: replyContents[parentId],
    //     ...(activeTab === "reviews" && { point: 5 }),
    //     parent: parentId,
    //   };
    //   const response =
    //     activeTab === "comments"
    //       ? ((await postComment(commentData)) as ServiceResponse)
    //       : ((await postRating(commentData)) as ServiceResponse);
    //   if (response.statusCode === 200 || response.statusCode === 201) {
    //     const newCommentData = response.data;
    //     if (activeTab === "comments") {
    //       setAllComments((prev) =>
    //         prev.map((comment) =>
    //           comment.id === parentId
    //             ? {
    //                 ...comment,
    //                 replies: [
    //                   ...(comment.replies || []),
    //                   {
    //                     id: newCommentData._id,
    //                     userName: authUser.user.name,
    //                     content: newCommentData.content,
    //                     time: dayjs(newCommentData.createdAt).fromNow(),
    //                     avatar:
    //                       typeof authUser.user === "object" &&
    //                       authUser.user?.avatar
    //                         ? authUser.user.avatar
    //                         : "/image/16.jpg",
    //                     isAdmin: false,
    //                     isPinned: false,
    //                     upvotes: newCommentData.upVote,
    //                     downvotes: newCommentData.downVote,
    //                     tabUser: authUser.user.name,
    //                     parentId: parentId,
    //                     replyToName: comment.tabUser,
    //                   },
    //                 ],
    //                 showReplyForm: false,
    //               }
    //             : comment
    //         )
    //       );
    //     } else {
    //       setAllReviews((prev) =>
    //         prev.map((review) =>
    //           review.id === parentId
    //             ? {
    //                 ...review,
    //                 replies: [
    //                   ...(review.replies || []),
    //                   {
    //                     id: newCommentData._id,
    //                     userName: authUser.user.name,
    //                     content: newCommentData.content,
    //                     time: dayjs(newCommentData.createdAt).fromNow(),
    //                     avatar:
    //                       typeof authUser.user === "object" &&
    //                       authUser.user?.avatar
    //                         ? authUser.user.avatar
    //                         : "/image/16.jpg",
    //                     isAdmin: false,
    //                     isPinned: false,
    //                     upvotes: newCommentData.upVote,
    //                     downvotes: newCommentData.downVote,
    //                     tabUser: authUser.user.name,
    //                     parentId: parentId,
    //                     replyToName: review.tabUser,
    //                   },
    //                 ],
    //                 showReplyForm: false,
    //               }
    //             : review
    //         )
    //       );
    //     }
    //     setReplyContents((prev) => ({ ...prev, [parentId]: "" }));
    //     toast.success("Đã gửi trả lời thành công!");
    //   }
    // } catch (err) {
    //   toast.error("Không thể gửi trả lời. Vui lòng thử lại sau.");
    // } finally {
    //   setReplySubmitting((prev) => ({ ...prev, [parentId]: false }));
    // }
  };

  const handleAddReview = (newReview: any) => {
    setAllReviews((prev) => [newReview, ...prev]);
  };

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
            {activeTab === "comments" &&
              (!authUser ? (
                <div className="ma-via mb-3">
                  Vui lòng{" "}
                  <button className="text-primary" onClick={handleLoginClick}>
                    đăng nhập
                  </button>{" "}
                  để tham gia bình luận.
                </div>
              ) : (
                <div className="ma-user">
                  <div className="user-avatar">
                    <Image
                      src={authUser?.user?.avatar || "/image/16.jpg"}
                      alt={authUser.user.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="info">
                    <small>Bình luận với tên</small>
                    <span>{authUser.user.name}</span>
                  </div>
                </div>
              ))}
            {activeTab === "comments" && (
              <CommentForm
                value={newComment}
                onChange={(e: any) => setNewComment(e.target.value)}
                onSubmit={handleSubmit}
                loading={submitting}
                placeholder={replyTo ? "Viết trả lời" : "Viết bình luận"}
                disabled={!authUser || submitting}
                isSpoiler={isSpoiler}
                setIsSpoiler={setIsSpoiler}
              />
            )}
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !authUser?.access_token ? (
            <div className="text-center py-4">
              <p className="mb-2">
                Vui lòng{" "}
                <button
                  className="text-primary btn-link"
                  onClick={handleLoginClick}
                >
                  đăng nhập
                </button>{" "}
                để xem bình luận
              </p>
            </div>
          ) : (
            <>
              <CommentList
                items={displayedItems}
                activeTab={activeTab}
                authUser={authUser}
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
          )}
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
