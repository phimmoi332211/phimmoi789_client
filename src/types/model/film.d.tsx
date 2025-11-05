// No external model imports needed for the lean API response shape

export enum MovieStatusEnum {
  COMPLETE = "complete",
  ONGOING = "ongoing",
  UPCOMING = "upcoming",
}

export enum MovieTypeEnum {
  SERIES = "series",
  SINGLE = "single",
  ANIME = "anime",
}

export enum QualityEnum {
  FULL_HD = "Full HD",
  HD = "HD",
  SD = "SD",
  CAM = "CAM",
  _4K = "4K",
}

export interface TMDB {
  vote_average: number;
  vote_count: number;
}

export interface NameUrlRef {
  name: string;
  url: string;
}

export interface Film {
  _id?: string;
  name?: string;
  url?: string;
  description?: string;
  year?: number | string;
  status?: MovieStatusEnum;
  type?: MovieTypeEnum;
  current_episode?: number;
  total_episode?: number;
  country?: NameUrlRef;
  category?: NameUrlRef[];
  posters?: string[];
  folder?: string;
  actors?: NameUrlRef[];
  directors?: NameUrlRef[];
  duration?: number;
  isDeleted?: boolean;
  quality?: QualityEnum | string;
  trailer?: string;
  tags?: string[];
  release_date?: string | Date;
  origin_name?: string;
  tmdb?: TMDB;
  thumbnail?: string;
  poster?: string;
}
