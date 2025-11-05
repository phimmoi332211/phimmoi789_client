import { Define } from '@/types/define';

export interface BaseSWRMutate<Params> {
  arg: Params;
}

/** ******** =========== Queries & Params for Api call ========== ********** */
export namespace ApiParams {
  export interface List {
    // data: { type: KeyType; target?: KeyTarget };
    query: Define.Pagination;
  }

  export interface Update {
    option: { id: string; target?: string };
    data?: Record<string, any>;
  }

  export interface Detail {
    option: { id: string; target?: string };
    data?: Record<string, any>;
  }

  // export interface UploadFilesAws {
  //   formData: FormData<{ files: File[] }>;
  // }

  // export interface UploadFilesIpfs {
  //   formData: FormData<{ files: File[] } | Record<string, any>>;
  // }

  // export interface GetFileIpfs extends DownloadAsset {
  //   query: {
  //     ipfsPath: string;
  //   };
  // }

  // --- START Admin Publisher ---
  export interface ListMenu {
    query: Record<string, any>;
  }
  export interface Film {
    query: Define.Pagination;
  }
  export interface FilmListPage {
    query: Define.PaginationListPage;
  }
  export interface FilmFilterListPage {
    query: Define.PaginationFilterListPage;
  }
  export interface ListCategory {
    query: any;
  }
  export interface ListCountry {
    query: any;
  }
  export interface ListType {
    query: any;
  }

  export interface SearchFilmTitle {
    option: { id: string; target?: string };
    // pagination bla bla
    data: Define.Pagination;
  }

  export interface DetailFilm extends Detail {}
  // export interface DetailAdminPublisher extends Detail {}
  // export interface UpdateAdminPublisher extends Update {
  //   data: Partial<
  //     Pick<
  //       Define.Publisher,
  //       | 'name'
  //       | 'banner'
  //       | 'avatar'
  //       | 'telegram'
  //       | 'twitter'
  //       | 'facebook'
  //       | 'discord'
  //       | 'instagram'
  //       | 'description'
  //     >
  //   >;
  // }
  // export interface CreateAdminPublisher
  //   extends Partial<
  //     Pick<
  //       Define.Publisher,
  //       | 'name'
  //       | 'banner'
  //       | 'avatar'
  //       | 'telegram'
  //       | 'twitter'
  //       | 'facebook'
  //       | 'discord'
  //       | 'instagram'
  //       | 'description'
  //     >
  //   > {
  //   userRequest: string;
  // }
  // --- E N D Admin Publisher ---
}
