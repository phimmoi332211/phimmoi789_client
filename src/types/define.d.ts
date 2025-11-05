import { ApiParams } from '@/types/api/api.params';
import { StatusActive } from '@/types/enum';

export namespace Define {
  export interface BaseDatabase {
    _id: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface PaginationListPage {
    current: number;
    pageSize: number;
  }
  export interface PaginationFilterListPage {
    current: number;
    pageSize: number;
    category: string;
    type: string;
    country: string;
    year: string;
    order: number;
  }

  export interface Pagination {
    pageSize: number;
    current: number;
    search?: string;
    sort?: string | Record<string, any>;
    category?: string;
    type?: string;
    country?: string;
    year?: string;
    order?: number | string;
  }


  export interface BaseResponse {
    statusCode: number;
    message: string;
    paging: { limit: number; page: number; total: number };
    data: Record<string, any>[];
  }

  export interface ErrorResponseData {
    data: Record<string, any> | null;
    error: string;
    message: string;
    status?: number;
  }

  export interface BaseToggleOpenModal {
    isOpen?: boolean;
    isOtherAction?: boolean;
  }

  export interface BaseToggleOpenDetail extends BaseToggleOpenModal {
    isRefreshList?: boolean;
    isOtherAction?: boolean;
  }

  export interface BaseToggleOpenConfirm extends BaseToggleOpenModal {
    isRefreshList?: boolean;
  }

  export interface BaseDataDetail {
    id: string;
  }

  export interface BaseDataConfirm<T> {
    id: string;
    title: string;
    body: string;
    value: ApiParams.UpdateAdminStatus;
    data: T;
  }

  export interface BaseSelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    isSelected?: boolean;
    data?: Record<string, any>;
  }

  // export interface BaseToggleOpenDetail extends BaseToggleOpenModal {
  //   isRefreshList?: boolean;
  //   isOtherAction?: boolean;
  // }

  export interface BreadcrumbItem {
    label: string;
    path: string;
    level: number;
  }

  interface StatusOption {
    label: string;
    value: StatusActive;
  }

  export interface Credentials {
    message: string;
    accessToken: string;
    accessTokenExpire: number;
    refreshToken: string;
    refreshTokenExpire: number;
    // userId: string;
    // uaId: string;
    // mode: string;
  }

  export interface Film extends BaseDatabase {
    _id: string
    title: string
    slug: string
    thumb_url: string
    poster_url: string
    name_english: string
    status: string
    episode_total: string
    time: string
    year: string
    quality: string
    lang: string
    director: string[]
    actor: string[]
    country: Country[]
    category: Category[]
    description: string
    views: number
    likes: number
    vip1: number
    episode: any[]
    type?: TypeFilm[]
  }
  export interface TypeFilm {
    name: string
    slug: string
  }

  export interface Country {
    name: string
    slug: string
  }

  export interface Category {
    name: string
    slug: string
  }

  export interface Menu {
    createdAt: string;
    updatedAt: string;
    menuTree?: menuTreeItem[];
  }

  export interface MenuItem {
    categoryDetails: {
      canonicalUrl: string;
      description: string;
      keyword: string;
      name: string;
      seoDescription: string;
      seoTitle: string;
      slug: string;
    };
    children: any[];
    label: string;
    type: string;
  }

  export interface DataRepository<T> {
    data?: T;
    message?: string;
    statusCode?: number;
  }
}
