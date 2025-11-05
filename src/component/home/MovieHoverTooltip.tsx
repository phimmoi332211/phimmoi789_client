import React from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { toast } from "react-toastify";
import { NAVIGATION } from "@/ultis/ultis";
import { useFavorite } from "@/context/FavoriteContext";
import { Film } from "@/types/model/film.d";
import { useAuth } from "@/context/AuthContext";
import { toAbsoluteImageUrl } from "@/help/helper";

interface MovieHoverTooltipProps {
  movie: Film;
}

// Tạo Portal Tooltip (nếu bạn dùng)
export const PortalTooltip: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return ReactDOM.createPortal(children, document.body);
};

export const MovieHoverTooltip: React.FC<MovieHoverTooltipProps> = ({
  movie,
}) => {
  // Chuẩn hoá dữ liệu giống như SlideFilm
  const mapSlug = (item: any) => item.slug || item.url || "";
  const mapTitle = (item: any) => item.title || item.name || "";
  const mapAlias = (item: any) =>
    item.name_english || item.origin_name || item.name || "";
  const mapPoster = (item: any) =>
    toAbsoluteImageUrl(item.poster_url || item.thumbnail) ||
    "/default-avatar.jpg";
  const mapCountryName = (item: any) =>
    item.country?.[0]?.name || item.country?.name || "";

  // Tính số tập cho giao diện hiện tại
  const getEpisodeInfo = (item: any) => {
    // Dữ liệu mới (type/total_episode/status)
    if (item?.type || item?.total_episode || item?.status) {
      const episodes =
        typeof item.total_episode === "number" && item.total_episode > 0
          ? item.total_episode
          : item.type === "single"
          ? 1
          : 0;
      const released =
        item.status === "complete"
          ? episodes
          : episodes > 0
          ? Math.min(1, episodes)
          : 0;
      return { episodes, releasedEpisodes: released };
    }

    // Dữ liệu cũ (giữ nguyên logic cũ)
    let episodes = 0;
    let releasedEpisodes = 0;
    const totalMatch = item.episode_total?.match(/(\d+)/);
    if (totalMatch) episodes = parseInt(totalMatch[1], 10);
    const releasedMatch =
      item.status?.match(/Tập\s*(\d+)/) || item.status?.match(/(\d+)\/(\d+)/);
    if (releasedMatch) {
      releasedEpisodes = releasedMatch[1]
        ? parseInt(releasedMatch[1], 10)
        : parseInt(releasedMatch[0].replace(/\D/g, ""), 10);
    } else {
      releasedEpisodes = episodes;
    }
    return { episodes, releasedEpisodes };
  };

  // Lấy context user
  const { authUser } = useAuth();
  const { films, toggleFavorite } = useFavorite();
  const isFavorite = films.some((film) => film.url === mapSlug(movie));

  const handleToggleFavorite = async (slug: string) => {
    if (!authUser) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này");
      return;
    }

    try {
      await toggleFavorite(slug);
      toast.success(
        isFavorite ? "Đã bỏ khỏi yêu thích!" : "Đã thêm vào yêu thích!"
      );
    } catch (err) {
      toast.error(
        isFavorite
          ? "Bỏ khỏi yêu thích thất bại!"
          : "Thêm vào yêu thích thất bại!"
      );
    }
  };

  // Sử dụng các hàm map để chuẩn hoá dữ liệu
  const normalizedMovie = {
    ...movie,
    url: mapSlug(movie),
    name: mapTitle(movie),
    origin_name: mapAlias(movie),
    thumbnail: mapPoster(movie),
  };

  const { episodes, releasedEpisodes } = getEpisodeInfo(movie);

  return (
    <div className="demo-tip">
      <div className="sw-tip">
        <div
          className="media-teaser"
          style={{
            backgroundImage: `url(${normalizedMovie.thumbnail})`,
          }}
        >
          <div className="ratio ratio-16x9"></div>
        </div>
        <div className="media-item">
          <div className="video-title-group">
            <div className="media-title">{normalizedMovie.name}</div>
            <div className="alias-title">{normalizedMovie.origin_name}</div>
          </div>

          <div className="touch-group">
            <Link
              className="btn btn-block btn-primary"
              href={`${NAVIGATION.INFO}/${normalizedMovie.url}`}
            >
              <i className="fa-solid fa-play"></i>Xem ngay
            </Link>
            <button
              className="btn btn-outline"
              onClick={() => handleToggleFavorite(normalizedMovie.url)}
            >
              <div className="inc-icon icon-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  style={{
                    color: isFavorite ? "#ffd875" : undefined,
                    transition: "color 0.2s",
                  }}
                >
                  <path
                    d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span
                style={{
                  color: isFavorite ? "#ffd875" : undefined,
                  transition: "color 0.2s",
                }}
              >
                Thích
              </span>
            </button>
            <Link
              className="btn btn-outline"
              href={`${NAVIGATION.INFO}/${normalizedMovie.url}`}
            >
              <div className="inc-icon icon-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="white"
                >
                  <path d="M10 0.75C4.47734 0.75 0 5.22734 0 10.75C0 16.2727 4.47734 20.75 10 20.75C15.5227 20.75 20 16.2727 20 10.75C20 5.22734 15.5227 0.75 10 0.75ZM11.2664 14.9523C11.2664 15.1187 11.2337 15.2833 11.17 15.437C11.1064 15.5906 11.0131 15.7302 10.8955 15.8478C10.7779 15.9654 10.6383 16.0587 10.4846 16.1224C10.331 16.186 10.1663 16.2188 10 16.2188C9.83369 16.2188 9.66901 16.186 9.51537 16.1224C9.36172 16.0587 9.22211 15.9654 9.10452 15.8478C8.98692 15.7302 8.89364 15.5906 8.82999 15.437C8.76635 15.2833 8.73359 15.1187 8.73359 14.9523V9.88633C8.73359 9.72002 8.76635 9.55534 8.82999 9.4017C8.89364 9.24805 8.98692 9.10844 9.10452 8.99084C9.22211 8.87325 9.36172 8.77996 9.51537 8.71632C9.66901 8.65268 9.83369 8.61992 10 8.61992C10.1663 8.61992 10.331 8.65268 10.4846 8.71632C10.638 8.77996 10.778 8.87325 10.8955 8.99084C11.0131 9.10844 11.1064 9.24805 11.17 9.4017C11.2337 9.55534 11.2664 9.72002 11.2664 9.88633V14.9523ZM10 7.81406C9.74953 7.81406 9.50468 7.73979 9.29642 7.60063C9.08816 7.46148 8.92584 7.26369 8.82999 7.03229C8.73414 6.80088 8.70906 6.54625 8.75793 6.30059C8.80679 6.05493 8.92741 5.82928 9.10452 5.65217C9.28163 5.47506 9.50728 5.35445 9.75294 5.30558C9.9986 5.25672 10.2532 5.2818 10.4846 5.37765C10.716 5.4735 10.9138 5.63582 11.053 5.84408C11.1921 6.05234 11.2664 6.29718 11.2664 6.54766C11.2665 6.71398 11.2337 6.87868 11.1701 7.03235C11.1065 7.18602 11.0132 7.32565 10.8956 7.44326C10.778 7.56086 10.6384 7.65414 10.4847 7.71777C10.331 7.78139 10.1663 7.81411 10 7.81406Z" />
                </svg>
              </div>
              <span>Chi tiết</span>
            </Link>
          </div>

          <div className="hl-tags">
            {movie.quality && (
              <div className="tag-model">
                <span className="last">{movie.quality}</span>
              </div>
            )}
            {movie.year && (
              <div className="tag-classic">
                <span>{movie.year}</span>
              </div>
            )}
            {movie.duration && (
              <div className="tag-classic">
                <span>{movie.duration}</span>
              </div>
            )}
            {episodes > 0 && (
              <div className="tag-classic">
                <span>
                  {episodes === 1
                    ? "1 Tập"
                    : `${releasedEpisodes}/${episodes} Tập`}
                </span>
              </div>
            )}
          </div>

          {Array.isArray(movie.category) && movie.category.length > 0 && (
            <div className="hl-tags">
              {movie.category.map((tag: any, idx: number) => (
                <div className="tag-topic" key={idx}>
                  {tag.name}
                </div>
              ))}
            </div>
          )}

          {mapCountryName(movie) && (
            <div className="hl-tags">
              <div className="tag-topic">{mapCountryName(movie)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
