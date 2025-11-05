//src/types/list.d.ts
export interface FilterState {
  type: string;
  country: string;
  year: string;
  order: string;
  category: string;
}

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

export interface Category {
  id?: string;
  url: string;
  name: string;
}
