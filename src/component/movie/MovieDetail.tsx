import { MovieData } from "@/types/detail";
import MovieDetailClient from "./MovieDetailClient";
import { fetchDetailsMovies } from "@/help/helper";

interface MovieDetailProps {
  slug: string;
}

export default async function MovieDetail({ slug }: MovieDetailProps) {
  const filmResponse = await fetchDetailsMovies(slug);
  const payload = (filmResponse as any)?.data?.data;
  if (!payload) {
    throw new Error("Failed to fetch film detail");
  }

  if (!payload.article.movieData.name) {
    throw new Error("Invalid film data: missing name");
  }

  const enhancedData: MovieData = {
    _id: payload.article.movieData._id,
    title: payload.article.movieData.name,
    slug: payload.article.movieData.slug,
    thumb_url: payload.article.featuredImage.url || "",
    thumb_alt: payload.article.featuredImage.alt || "",
    thumb_title: payload.article.featuredImage.title || "",
    thumb_caption: payload.article.featuredImage.caption || "",
    poster_url: `${process.env.API_IMAGE_OPHIM69}${payload.article.movieData.posters}` || "",
    name_english: payload.article.movieData.origin_name || payload.article.movieData.name,
    status: payload.article.movieData.status || "",
    episode_total: payload.article.movieData.total_episode ? String(payload.article.movieData.total_episode) : "",
    time: payload.article.movieData.duration ? String(payload.article.movieData.duration) : "",
    year: payload.article.movieData.year ? String(payload.article.movieData.year) : "",
    quality: payload.article.movieData.quality || "",
    lang: payload.article.movieData.lang || "",
    director: Array.isArray(payload.article.movieData.directors)
      ? payload.article.movieData.directors.map((d: any) => d.name)
      : [],
    actor: Array.isArray(payload.article.actorsData)
      ? payload.article.actorsData.map((a: any) => a.name)
      : [],
    country: payload.article.movieData.country
      ? [{ name: payload.article.movieData.country.name, slug: payload.article.movieData.country.url }]
      : [],
    category: Array.isArray(payload.article.movieData.category)
      ? payload.article.movieData.category.map((c: any) => ({ name: c.name, slug: c.url }))
      : [],
    description: payload.article.movieData.description || "",
    views: payload.article.movieData.views || 0,
    likes: payload.article.movieData.likes || 0,
    vip1: payload.article.movieData.vip1 || 0,
    episode: Array.isArray(payload.article.movieData.episode)
      ? payload.article.movieData.episode.map((c: any) => ({ name: c.name, slug: c.url }))
      : [],
    parts: Array.isArray(payload.article.movieData.parts)
      ? payload.article.movieData.parts.map((c: any) => ({ title: c.title, slug: c.slug, partNumber: c.partNumber}))
      : [],
    rating: payload.article.movieData.tmdb?.vote_average || 0,
    videos: payload.article.movieData.trailer || "",
    images: payload.article.featuredImage
      ? [
        {
          type: "image",
          url: payload.article.featuredImage.url,
          title: payload.article.featuredImage.title,
          alt: payload.article.featuredImage.alt,
          caption: payload.article.featuredImage.caption,
        },
      ]
      : [],
    casts: payload.article.movieData.casts || [],
    suggestions: payload.article.movieData.suggestions || [],
    seasons: payload.article.movieData.seasons || [],
    currentSeason: payload.article.movieData.currentSeason || 1,
    currentEpisode: payload.article.movieData.currentSeason || "1",
    actors: Array.isArray(payload.article.actorsData)
      ? payload.article.actorsData
      : [],
    hashtag: payload.article.movieData.hashtag ? payload.article.movieData.hashtag.map((item) => item).join(", ") : "",
    similarMovies: payload.similarMovies,
  };

  return <MovieDetailClient initialMovieData={enhancedData} />;
}
