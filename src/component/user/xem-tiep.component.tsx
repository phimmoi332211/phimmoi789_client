"use client";
// import { addOrRemoveHistory, fetchFilmListHistory } from "@/help/helper";
import { useEffect, useState } from "react";
import { Film } from "@/types/model/film.d";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function XemTiepComponent() {
  const { authUser, setAuthUser } = useAuth();
  const router = useRouter();
  const [movies, setMovies] = useState<
    (Film & { percent?: number; episode?: number })[]
  >([]);

  const reloadFavorites = async () => {
    // const res: any = await fetchFilmListHistory();
    // const rawList = res?.data?.historyFilm || [];
    // const formatted = rawList.map((item: any) => ({
    //   ...item.film,
    //   percent: item.percent ?? 0,
    //   episode: Number(item.episode ?? 0),
    // }));
    // setMovies(formatted);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authUser) {
        toast.warning("Bạn cần đăng nhập để truy cập trang này");
        router.push("/phim-hay");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [authUser]);
  useEffect(() => {
    reloadFavorites();
  }, []);

  function getMinutes(timeStr?: string) {
    if (!timeStr) return 0;
    const match = timeStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const moviesWithWatch = movies.map((item: any) => {
    const totalMinutes = getMinutes(item.time);
    const watchedPercent = item.percent || 0;
    const watched = Math.round((watchedPercent / 100) * totalMinutes);

    return {
      ...item,
      watched,
      watchedPercent,
    };
  });

  const handleRemoveHistory = async (
    slug: string,
    percent: number,
    eps: number
  ) => {
    try {
      // await addOrRemoveHistory(slug, percent, eps, false);
      await reloadFavorites();
      toast.success("Loại bỏ thành công phim khỏi danh sách xem tiếp");
    } catch (err) {
      toast.error("Lỗi khi xóa lịch sử");
    }
  };

  return (
    <div className="cg-body-box py-0">
      <div className="box-header flex-column align-items-start gap-3">
        <div className="heading-sm mb-0">Danh sách xem tiếp</div>
      </div>
      <div className="box-body">
        <div className="cards-grid-wrapper de-suggest">
          {moviesWithWatch.map((item, idx) => (
            <div className="sw-item" key={item.slug + idx}>
              <div
                className="pin-remove"
                onClick={() =>
                  handleRemoveHistory(
                    item.slug,
                    item.watchedPercent,
                    item.episode
                  )
                }
              >
                <i className="fa-solid fa-times"></i>
              </div>
              <Link className="v-thumbnail" href={`/xem-phim/${item.slug}`}>
                <Image
                  alt={`Xem Phim ${item.title} Vietsub HD Online - Phimmoi789`}
                  loading="lazy"
                  src={item.thumb_url}
                  fill
                />
              </Link>
              <div className="info">
                <div className="watched-bar mt-1">
                  <span
                    style={{ width: `${item.watchedPercent || 0}%` }}
                  ></span>
                </div>
                <div className="watched-info">
                  <div className="w-item">
                    {parseInt(
                      item.episode_total?.toString().match(/\d+/)?.[0] || "1"
                    ) > 1
                      ? `Tập ${item.episode || 1}`
                      : "1 Tập"}
                  </div>

                  <div className="w-item">
                    {item.watched || 0} phút
                    <span> / {item.time}</span>
                  </div>
                </div>
                <h4 className="item-title lim-1">
                  <Link title={item.title} href={`/xem-phim/${item.slug}`}>
                    {item.title}
                  </Link>
                </h4>
                <h4 className="alias-title lim-1">
                  <Link title={item.title} href={`/xem-phim/${item.slug}`}>
                    {item.name_english}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
