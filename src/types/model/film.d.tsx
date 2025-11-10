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