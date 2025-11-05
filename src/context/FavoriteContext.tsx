// FavoriteContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
// import { fetchFilmListLike, fetchAddFavorite } from "@/help/helper";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext<any>(null);

export function useFavorite() {
  return useContext(FavoriteContext);
}

export const FavoriteProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [films, setFilms] = useState<any[]>([]);
  const [casts, setCasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFavorites = async () => {
    try {
      setLoading(true);
      // const res: any = await fetchFilmListLike();
      // if (res?.data) {
      //   setFilms(res.data.favorite || []);
      //   setCasts(res.data.favoriteCast || []);
      // } else {
      //   setFilms([]);
      //   setCasts([]);
      // }
    } catch (error) {
      setFilms([]);
      setCasts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.access_token) {
      reloadFavorites();
    } else {
      setFilms([]);
      setCasts([]);
      setLoading(false);
    }
  }, [authUser?.access_token]);

  // Xử lý toggle favorite (cho phim)
  const toggleFavorite = async (slug: string) => {
    try {
      const isFav = films.some((film) => film.slug === slug);
      // await fetchAddFavorite(slug, !isFav);
      await reloadFavorites(); // Gọi lại để sync dữ liệu
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        films,
        casts,
        setCasts,
        reloadFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
