"use client";

import { useEffect, useState } from "react";
import { Film } from "@/types/model/film.d";
import { fetchMovies, fetchCategories, fetchContries } from "@/help/helper";
import { toast } from "react-toastify";
import ListComponent from "@/component/list/list.component";
import { useParams, useRouter } from "next/navigation";

export default function QuocGiaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [countries, setCountries] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const router = useRouter();

  const fetchPhimLeData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: any = await fetchMovies({
        page: page,
        limit: 20,
        country: slug,
      });

      if (response?.data?.data) {
        const { result, meta } = response.data.data;

        // Map dữ liệu để tương thích với component hiện tại
        const mappedMovies: Film[] = result.map((movie: any) => ({
          _id: movie._id,
          url: movie.url,
          name: movie.name,
          origin_name: movie.origin_name,
          description: movie.description,
          year: movie.year,
          status: movie.status,
          type: movie.type,
          current_episode: movie.current_episode,
          total_episode: movie.total_episode,
          country: movie.country,
          category: movie.category,
          posters: movie.posters,
          folder: movie.folder,
          actors: movie.actors,
          directors: movie.directors,
          duration: movie.duration,
          isDeleted: movie.isDeleted,
          quality: movie.quality,
          trailer: movie.trailer,
          tags: movie.tags,
          release_date: movie.release_date,
          tmdb: movie.tmdb,
          poster: movie.poster,
          thumbnail: movie.thumbnail,
        }));

        setFilms(mappedMovies);
        setCurrentPage(meta.page);
        setTotalPages(meta.totalPages);
        setTotalItems(meta.totalItems);
      }
    } catch (error) {
      console.error("Error fetching phim lẻ:", error);
      toast.error("Không thể tải danh sách phim lẻ!");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterData = async () => {
    try {
      const [countriesRes, typesRes] = await Promise.all([
        fetchContries({ limit: 50 }),
        fetchCategories({ limit: 50 }),
      ]);
      setCountries((countriesRes as any)?.data?.data || []);
      setTypes((typesRes as any)?.data?.data || []);
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  };

  useEffect(() => {
    fetchFilterData();
    fetchPhimLeData(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPhimLeData(page);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Phim Lẻ Mới Nhất</h1>
        <p className="text-gray-300">
          Khám phá những bộ phim lẻ hay nhất, mới nhất được cập nhật liên tục
        </p>
      </div>

      <ListComponent
        url={slug}
        films={
          {
            data: {
              result: films,
              meta: {
                page: currentPage,
                limit: 20,
                totalPages: totalPages,
                pages: totalPages,
                total: totalPages,
              },
            },
          } as any
        }
        totalPage={totalPages}
        countries={countries}
        types={types}
      />
    </div>
  );
}
