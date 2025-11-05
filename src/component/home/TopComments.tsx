"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import { fetchCommentVoteList } from "@/help/helper";
import Image from "next/image";
import Link from "next/link";

export const TopComments = () => {
  const [topComments, setTopComments] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res: any = await fetchCommentVoteList();
    //     const arr = res?.data?.data || [];
    //     if (Array.isArray(arr)) {
    //       const withVotes = arr.map((item: any) => {
    //         const rawAvatar = item?.user?.avatar;
    //         const isNumericAvatar = !isNaN(Number(rawAvatar));
    //         return {
    //           ...item,
    //           user: {
    //             ...item.user,
    //             avatar: isNumericAvatar
    //               ? `/image/${String(rawAvatar).padStart(2, "0")}.jpg`
    //               : rawAvatar || "/image/18.jpg",
    //           },
    //           up: Math.floor(Math.random() * 20),
    //           down: Math.floor(Math.random() * 10),
    //           replies: Math.floor(Math.random() * 15),
    //         };
    //       });
    //       setTopComments(withVotes);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching comments:", error);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div className="top-discuss">
      <div className="comm-title line-center flex items-center mb-2">
        <i className="fa-solid fa-medal ct-icon mr-2"></i>
        <span>Top bình luận</span>
      </div>
      <div className="td-list">
        <div className="top-discuss-wrapper relative">
          <div className="sw-navigation absolute top-1/2 left-0 z-10 flex items-center gap-2 w-full justify-between pointer-events-none">
            <button
              type="button"
              className="sw-button sw-prev pointer-events-auto bg-white/70 rounded-full p-1 shadow hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.3335 12.6667L5.66683 8.00004L10.3335 3.33337"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="sw-button sw-next pointer-events-auto bg-white/70 rounded-full p-1 shadow hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.66675 3.33341L10.3334 8.00008L5.66675 12.6667"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <Swiper
            modules={[Navigation]}
            navigation={{ nextEl: ".sw-next", prevEl: ".sw-prev" }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 6 },
            }}
            className="py-3 overflow-hidden"
          >
            {topComments.map((comment: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="d-item td-d-item rounded-2xl shadow px-3 py-2 flex flex-col h-full">
                  <div className="di-poster mb-2">
                    <Image
                      src={comment.thumb_url}
                      alt={comment.title}
                      width={320}
                      height={96}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                  </div>
                  <div className="di-v flex gap-2">
                    <div className="user-avatar">
                      <Image
                        src={comment.user.avatar || "/image/18.jpg"}
                        alt={comment.user.name || "Ảnh avatar"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="info flex-1 min-w-0">
                      <div className="comment-header">
                        <div className="user-name font-semibold">
                          {comment.user.name || "Some One"}
                        </div>
                      </div>
                      <div className="text lim-2 text-sm mt-1 mb-2 line-clamp-2">
                        {comment.content}
                      </div>
                      <div className="comment-bottom line-center gap-3 d-flex flex items-center text-xs text-gray-500">
                        <div className="item item-up flex items-center gap-1">
                          <i className="fa-solid fa-circle-up text-gray-500"></i>
                          <span>{comment.up}</span>
                        </div>
                        <div className="item item-down flex items-center gap-1">
                          <i className="fa-solid fa-circle-down text-gray-500"></i>
                          <span>{comment.down}</span>
                        </div>
                        <div className="item item-rep flex items-center gap-1">
                          <i className="fa-solid fa-message"></i>
                          <span>{comment.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-thumb mt-2">
                    <Link
                      className="v-thumbnail block"
                      title={comment.title}
                      href={`/phim/${comment.film}`}
                    >
                      <Image
                        src={comment.thumb_url || "/image/18.jpg"}
                        alt={comment.title || "Ảnh phim"}
                        width={320}
                        height={64}
                        className="rounded-xl w-full h-16 object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
