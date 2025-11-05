import WatchMovie from "@/component/movie/WatchMovie";
import { fetchDetailsMovies } from "@/help/helper";

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
    console.log("filmResponse: ", filmResponse);
    const payload = (filmResponse as any)?.data?.data;
    if (!payload) {
      return <WatchMovie />;
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
      episode: Array.isArray(payload.episodes)
        ? payload.episodes.map((ep: any, idx: number) => ({
            _id: `${idx}`,
            title: ep.title || `Tập ${idx + 1}`,
            episode: String(idx + 1),
            link_embed: ep.servers?.[0]?.linkM3u8 || "",
            link_m3u8: ep.servers?.[0]?.linkM3u8 || "",
            servers: Array.isArray(ep.servers)
              ? ep.servers.map((s: any) => ({
                  serverName: s.serverName,
                  status: s.status,
                  linkM3u8: s.linkM3u8,
                }))
              : [],
          }))
        : [],
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

    return <WatchMovie initialMovieData={enhancedData} />;
  } catch (error) {
    console.log("check error", error.message);
    
    // console.error("Error loading movie data:", error);
    return <WatchMovie />;
  }
}
