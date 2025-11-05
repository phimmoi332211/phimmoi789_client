"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

interface BannerSlideProps {
  slideData: Array<{
    _id: string;
    title: string;
    slug: string;
    image: {
      url: string;
      alt: string;
      caption: string;
      title: string;
    };
    year: number;
    type: string;
    status: string;
    quality: string;
    description: string;
    category: Array<{ name: string; url: string }>;
    rating?: { average: number; count: number };
  }>;
}

export default function BannerSlide({ slideData }: BannerSlideProps) {
  const { authUser } = useAuth();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [films, setFilms] = useState<any[]>([]);

  const handleToggleFavorite = async (slug: string) => {
    const favorite = films.some((f) => f.slug === slug);
    try {
      toast.success(
        favorite ? "Đã bỏ khỏi yêu thích!" : "Đã thêm vào yêu thích!"
      );
      setFilms((prev) =>
        favorite ? prev.filter((f) => f.slug !== slug) : [...prev, { slug }]
      );
    } catch (err) {
      toast.error(
        !authUser
          ? "Bạn phải đăng nhập để thực hiện chức năng này"
          : favorite
            ? "Bỏ khỏi yêu thích thất bại!"
            : "Thêm vào yêu thích thất bại!"
      );
    }
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  console.log("slideData", slideData);


  return (
    <div id="top_slide">
      <div className="slide-wrapper top-slide-wrap">
        <Swiper
          modules={[EffectFade, Thumbs]}
          effect="fade"
          thumbs={{ swiper: thumbsSwiper }}
          className="swiper top-slide-main"
        >
          {slideData.map((item, index) => {
            const href = `/phim/${item.slug}`;
            const tags = item.category || [];
            const poster = item.image?.url || "/no-image.jpg";
            const imdb = item.rating?.average ?? 0;

            return (
              <SwiperSlide key={item._id || index}>
                <div className="slide-elements">
                  <Link className="slide-url" href={href}>
                  </Link>

                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${poster}")` }}
                  ></div>

                  <div className="cover-fade">
                    <div
                      className="cover-image"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        className="fade-in visible"
                        title={item.title}
                        src={poster}
                        alt={item.image?.alt || item.title}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="safe-area">
                    <div className="slide-content">
                      <div className="media-item">
                        <div className="media-title-image">
                          <Link title={item.title} href={href}>
                            <Image
                              alt={item.title}
                              src={poster}
                              width={200}
                              height={100}
                              style={{ objectFit: "contain" }}
                            />
                          </Link>
                        </div>

                        <h3 className="media-alias-title">
                          <Link title={item.title} href={href}>
                            {item.title}
                          </Link>
                        </h3>

                        <div className="hl-tags">
                          <div className="tag-imdb">
                            <span>{imdb.toFixed(1)}</span>
                          </div>
                          {item.quality && (
                            <div className="tag-quality">
                              <span>{item.quality}</span>
                            </div>
                          )}
                          <div className="tag-classic">
                            <span>{item.year}</span>
                          </div>
                          <div className="tag-classic">
                            <span>{item.status}</span>
                          </div>
                        </div>

                        <div className="hl-tags mb-4">
                          {tags.map((tag, i) => (
                            <Link
                              key={i}
                              className="tag-topic"
                              href={`/list/${slugify(tag.url)}`}
                            >
                              {tag.name}
                            </Link>
                          ))}
                        </div>

                        <div className="description lim-3">
                          {item.description || "Chưa có mô tả cho phim này."}
                        </div>

                        <div className="touch">
                          <Link className="button-play" href={href}>
                            <i className="fa-solid fa-play"></i>
                          </Link>

                          <div className="touch-group">
                            <a
                              className="item"
                              title="Yêu thích"
                              onClick={(e) => {
                                e.preventDefault();
                                handleToggleFavorite(item.slug);
                              }}
                            >
                              <div className="inc-icon icon-20">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  style={{
                                    color: films.some((f) => f.slug === item.slug)
                                      ? "#ffd875"
                                      : undefined,
                                  }}
                                >
                                  <path
                                    d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView="auto"
          watchSlidesProgress
          className="swiper top-slide-small swiper-thumbs"
        >
          {slideData.map((item) => (
            <SwiperSlide
              key={item._id}
              className="swiper-slide"
              style={{ width: "64.5px", marginRight: "5px" }}
            >
              <Image
                alt={item.title}
                loading="lazy"
                src={item.image?.url || "/no-image.jpg"}
                width={64}
                height={96}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
