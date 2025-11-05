export interface TopMovie {
  id: string;
  title: string;
  alias: string;
  image: string;
  episodes: number;
  hasSubtitle: boolean;
  hasDubbing: boolean;
  lang: string;
}

export interface SuggestedMoviesResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: Array<{
      slug: string;
      title: string;
      name_english: string;
      poster_url: string;
      episode_total: string;
      lang: string;
    }>;
  };
}

export interface MovieData {
  _id: string;
  id: string;
  title: string;
  slug: string;
  thumb_url: string;
  poster_url: string;
  name_english: string;
  status: string;
  episode_total: string;
  time: string;
  year: string;
  quality: string;
  lang: string;
  director: string[];
  actor: string[];
  country: Array<{ name: string; slug: string }>;
  category: Array<{ name: string; slug: string }>;
  type?: Array<{
    name: string;
    slug: string;
  }>;
  description: string;
  views: number;
  likes: number;
  vip1: number;
  episode: Array<Episode>;
  rating?: number;
  // TabGallery data
  videos?: Array<{
    id: string;
    type: 'video' | 'image';
    url: string;
    thumbnail?: string;
    title?: string;
  }>;
  images?: Array<{
    id: string;
    type: 'video' | 'image';
    url: string;
    thumbnail?: string;
    title?: string;
  }>;
  // TabCasts data
  casts?: Array<{
    id: string;
    name: string;
    character: string;
    image: string;
  }>;
  // TabSuggestion data
  suggestions?: Array<{
    id: string;
    title: string;
    alias: string;
    image: string;
    episodes: number;
    hasSubtitle: boolean;
    hasDubbing: boolean;
    year?: string;
    duration?: string;
    ageRating?: string;
    aliasName?: string;
    thumbnail?: string;
  }>;
  // TabEpisodes data
  seasons?: Array<{
    id: string;
    number: number;
    episodes: Array<{
      id: string;
      number: number;
      thumbnail: string;
      title?: string;
      duration?: string;
    }>;
  }>;
  currentSeason?: number;
  currentEpisode?: string;
  // Actors data
  actors?: Array<{
    name: string;
    slug: string;
    profile_path: string;
  }>;
  hashtag: string;
}

export interface Episode {
  _id: string;
  title: string;
  episode: string;
  link_embed: string;
  link_m3u8: string;
  servers?: Array<{
    serverName: string;
    status: string;
    linkM3u8: string;
  }>;
}

export interface InfoFilmResponse {
  statusCode: number;
  message: string;
  data: MovieData;
}

export interface ApiResponse<T> {
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  data?: T;
  result?: T;
}

export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export interface UseInfoPageResult {
  movieData: MovieData | null;
  relatedMovies: Array<MovieData>;
  recommendedMovies: Array<MovieData>;
  loading: boolean;
  showPlayer: boolean;
  setShowPlayer: (value: boolean) => void;
}
