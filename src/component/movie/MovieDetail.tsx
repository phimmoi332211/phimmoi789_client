import { MovieData } from "@/types/detail";

import MovieDetailClient from "./MovieDetailClient";
import { fetchDetailsMovies } from "@/help/helper";

interface MovieDetailProps {
  slug: string;
}

export default async function MovieDetail({ slug }: MovieDetailProps) {
  // Fetch film detail
  const filmResponse = await fetchDetailsMovies(slug);
  console.log("filmResponse: ", filmResponse);
  const payload = (filmResponse as any)?.data?.data;
  if (!payload) {
    throw new Error("Failed to fetch film detail");
  }

  if (!payload.name) {
    throw new Error("Invalid film data: missing name");
  }

  const enhancedData: MovieData = {
    _id: payload._id,
    id: payload._id,
    title: payload.name,
    slug: payload.url,
    thumb_url: payload.thumbnail || "",
    poster_url: payload.thumbnail || "",
    name_english: payload.origin_name || payload.name,
    status: payload.status || "",
    episode_total: payload.total_episode ? String(payload.total_episode) : "",
    time: payload.duration ? String(payload.duration) : "",
    year: payload.year ? String(payload.year) : "",
    quality: payload.quality || "",
    lang: "",
    director: Array.isArray(payload.directors)
      ? payload.directors.map((d: any) => d.name)
      : [],
    actor: Array.isArray(payload.actors)
      ? payload.actors.map((a: any) => a.name)
      : [],
    country: payload.country
      ? [{ name: payload.country.name, slug: payload.country.url }]
      : [],
    category: Array.isArray(payload.category)
      ? payload.category.map((c: any) => ({ name: c.name, slug: c.url }))
      : [],
    description: payload.description || "",
    views: 0,
    likes: 0,
    vip1: 0,
    episode: [],
    rating: payload.tmdb?.vote_average || 0,
    videos: payload.trailer
      ? [
          {
            id: "trailer",
            type: "video",
            url: payload.trailer,
            title: "Trailer",
          },
        ]
      : [],
    images: payload.thumbnail
      ? [
          {
            id: "thumbnail",
            type: "image",
            url: payload.thumbnail,
            title: "Thumbnail",
          },
        ]
      : [],
    casts: [],
    suggestions: [],
    seasons: [],
    currentSeason: 1,
    currentEpisode: "1",
    actors: Array.isArray(payload.actors)
      ? payload.actors.map((a: any) => ({
          name: a.name,
          slug: a.url,
          profile_path: "",
        }))
      : [],
    hashtag: "",
  };

  return <MovieDetailClient initialMovieData={enhancedData} />;
}
