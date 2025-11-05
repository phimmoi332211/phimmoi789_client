import {Define, Film, Menu} from '@/types/define';

/** ******** =========== API Response types ========== ********** */
export namespace ApiResponse {
  // --- START Publisher ---
  export interface ListMenu {
    statusCode: number;
    message: string;
    data: Define.Menu;
  }

  export interface DetailFilm extends Define.BaseResponse {
    data: MovieData; // Use MovieData directly
  }

  export interface Film extends Define.BaseResponse {
    data: {
      meta: {
        current: number;
        pageSize: number;
        total: number;
        pages: number;
      };
      result: Define.Film[]; // Replace `any` with the appropriate type for your result data
    };
  }
  export interface ListFilmByCategory {
    statusCode: number;
    message: string;
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: Define.Film[];
    };
  }
  export interface ListCategory {
    statusCode: number;
    message: string;
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: {
        name: string;
        slug: string;
      };
    };
  }
  export interface BannerItem {
    _id: string;
    name: string;
    banner: string;
    link: string;
  }

  export interface ListQC {
    statusCode: number;
    message: string;
    data: BannerItem[];
  }

  export interface ListCountry {
    statusCode: number;
    message: string;
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: {
        name: string;
        slug: string;
      };
    };
  }
  export interface ListType {
    statusCode: number;
    message: string;
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: {
        name: string;
        slug: string;
      };
    };
  }
  // export interface UpdateAdminPublisher extends Define.Publisher {
  //   message: string;
  // }
  // export interface CreateAdminPublisher extends Define.Publisher {
  //   message: string;
  // }
  // --- E N D Publisher ---

  export interface SearchFilmTitle extends Define.BaseResponse {
    data: {
      meta: {
        current: number;
        pageSize: number;
        total: number;
        pages: number;
      };
      result: Define.Film[]; // Replace `any` with the appropriate type for your result data
    };
  }
}
