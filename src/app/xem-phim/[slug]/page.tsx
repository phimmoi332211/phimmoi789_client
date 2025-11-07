import WatchMovie from "@/component/movie/WatchMovie";
import { fetchDetailsMovies, fetchSimilarMovies } from "@/help/helper";

import { MovieData } from "@/types/detail";
export const runtime = "edge";

interface WatchMoviePageProps {
  params: Promise<{ slug: string }>;
}

export default async function WatchMoviePage({ params }: WatchMoviePageProps) {
  try {
    const { slug } = await params;
    // Fetch film detail
    const filmResponse = await fetchDetailsMovies(slug);
    const payload = (filmResponse as any)?.data;
    if (!payload) {
      return <WatchMovie />;
    }

    const similarMovies = await fetchSimilarMovies(slug);
    const payloadSimilarMovies = (similarMovies as any)?.data?.data;
    if (!payloadSimilarMovies) {
      throw new Error("Failed to fetch similar movies");
    }

    const enhancedData: MovieData = {
      _id: payload._id,
      title: payload.name,
      slug: payload.url,
      thumb_url: payload.thumbnail.url || "",
      thumb_alt: payload.thumbnail.alt || "",
      thumb_title: payload.thumbnail.title || "",
      thumb_caption: payload.thumbnail.caption || "",
      poster_url: `${process.env.API_IMAGE_OPHIM69}${payload.posters}` || "",
      name_english: payload.origin_name || payload.name,
      status: payload.status || "",
      episode_total: payload.total_episode ? String(payload.total_episode) : "",
      time: payload.duration ? String(payload.duration) : "",
      year: payload.year ? String(payload.year) : "",
      quality: payload.quality || "",
      lang: payload.lang || "",
      director: Array.isArray(payload.directors)
        ? payload.directors.map((d: any) => d.name)
        : [],
      country: payload.country
        ? [{ name: payload.country.name, slug: payload.country.url }]
        : [],
      category: Array.isArray(payload.category)
        ? payload.category.map((c: any) => ({ name: c.name, slug: c.url }))
        : [],
      description: payload.description || "",
      views: payload.views || 0,
      likes: payload.likes || 0,
      vip1: payload.vip1 || 0,
      episodes: payload.episodes || [],
      parts: Array.isArray(payload.parts)
        ? payload.parts.map((c: any) => ({ title: c.title, slug: c.slug, partNumber: c.partNumber }))
        : [],
      rating: payload.tmdb?.vote_average || 0,
      videos: payload.trailer || "",
      images: payload.thumbnail
        ? [
          {
            type: "image",
            url: payload.thumbnail.url,
            title: payload.thumbnail.title,
            alt: payload.thumbnail.alt,
            caption: payload.thumbnail.caption,
          },
        ]
        : [],
      casts: payload.casts || [],
      suggestions: payload.suggestions || [],
      seasons: payload.seasons || [],
      currentSeason: payload.current_season || 1,
      currentEpisode: payload.current_episode || 1,
      actors: Array.isArray(payload.actors)
        ? payload.actors
        : [],
      hashtag: payload.hashtag ? payload.hashtag.map((item) => item).join(", ") : "",
      similarMovies: payloadSimilarMovies.similarMovies,
    };

    return <WatchMovie initialMovieData={enhancedData}/>;
  } catch (error) {
    // console.error("Error loading movie data:", error);
    return <WatchMovie />;
  }
}
