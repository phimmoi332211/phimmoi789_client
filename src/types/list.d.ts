export interface Film {
  id: string;
  slug: string;
  title: string;
  thumb_url: string;
  episode_total: string;
  quality: string;
  lang: string;
}

export interface Meta {
  pages: number;
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: {
    result: T;
    meta?: Meta;
  };
}