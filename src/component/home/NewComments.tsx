"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// import { fetchCommentNewList } from "@/help/helper";
import Link from "next/link";
import Image from "next/image";

export interface Comment {
  username: string;
  avatar: string;
  comment: string;
  film: string;
  filmLink: string;
}

const NewComments = () => {
  const [newComments, setNewComments] = useState<Comment[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response: any = await fetchCommentNewList();
    //     const data = response?.data || [];
    //     const mapped: Comment[] = data.map((item: any) => ({
    //       username: item.user?.name || "Ẩn danh",
    //       avatar: item.user?.avatar,
    //       comment: item.content,
    //       film: item.title,
    //       filmLink: `/phim/${item.film}`,
    //     }));
    //     setNewComments(mapped);
    //   } catch (err) {
    //     console.error("Lỗi khi lấy danh sách bình luận:", err);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div className="it-col this-05 p-4 max-w-md w-full mx-auto">
      <div className="flex items-center gap-2 mb-4 pb-2">
        <MessageCircle className="text-yellow-500" />
        <span className="font-semibold text-lg">Bình luận mới</span>
      </div>
      <div className="overflow-hidden rounded-xl">
        {newComments.length > 0 && (
          <Swiper
            direction="vertical"
            slidesPerView={4}
            spaceBetween={2}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="max-h-96"
            style={{ height: "300px" }}
          >
            {newComments.slice(0, 10).map((comment, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={comment.filmLink}
                  className="re-item hover:bg-gray-800 transition flex"
                >
                  <div className="user-avatar shrink-0 relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={comment?.avatar || "/default-avatar.jpg"}
                      alt={comment?.username}
                      fill
                      sizes="40px"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pl-[40px]">
                    <div className="user-comment text-white text-sm leading-snug">
                      <span className="font-semibold mr-1">
                        {comment.username}
                      </span>
                      {comment.comment}
                    </div>
                    <div className="for line-center gap-1 text-xs text-blue-200 mt-1 flex items-center">
                      <i className="fa-solid fa-play text-yellow-500" />
                      <span className="truncate">{comment.film}</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default NewComments;
