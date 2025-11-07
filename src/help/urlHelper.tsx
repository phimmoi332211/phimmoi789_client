export const CLIENT_ENDPOINTS = {
  
  MENU: '/menus',
  ///ophim69
  PUBLICS: {
    MOVIES: {
      LIST: "/articles/public/movies",
      DETAIL: (slug: string) => `/articles/movie/${slug}`,
    },
    BANNERS: {
      LIST: "/sidebar/public",
    },
    CATEGORIES: {
      LIST: "/publics/categories",
    },
    COUNTRIES: {
      LIST: "/publics/countries",
    },
    ACTOR: {
      LIST: "/publics/actors",
      DETAIL: (slug: string) => `/publics/actors/${slug}`,
    },
  },
  COMMENT_TYPE_LIST: "/publics/categories",
  FILM_CATEGORY_LIST: "/categories/getAll",
  FILM_COUNTRY_LIST: "/countries/getAll",
  FILM_TYPE_LIST: "/types/getAll",
  //file
  FILE_UPLOAD: "/files/upload",
  FILE_GET: "/files",
  //film
  FILM: "/films",
  FILM_LIST: "/films/danh-sach",
  FILM_SEARCH_TITLE: "/films/tieu-de",
  FILM_FILTER_LIST: "/films/danh-sach",
  FILM_CATEGORY: (slug: string) => `/films/danh-muc/${slug}`,
  FILM_COUNTRY: (slug: string) => `/films/quoc-gia/${slug}`,
  FILM_TYPE: (slug: string) => `/films/the-loai/${slug}`,
  INFO_FILM: (slug: string) => `/films/chi-tiet/${slug}`,
  FILM_SUGGESTED: (current: number = 1, pageSize: number = 10) =>
    `/publics/movies?current=${current}&pageSize=${pageSize}&order=2`,
  FILM_DETAIL: (slug: string) => `/films/chi-tiet/${slug}`,
  FILM_SEARCH_TITLE_SLUG: (slug: string) => `/films/tieu-de/${slug}`,
  //actor
  ACTOR: "/actors",
  ACTOR_DETAIL: (slug: string) => `/actors/${slug}`,
  //play-list
  PLAY_LIST: "/play-list",
  PLAY_LIST_USER: "/play-list/findByUser",
  PLAY_LIST_USER_UPDATE: (id: string) => `/play-list/${id}`,
  PLAY_LIST_USER_DELETE: (id: string) => `/play-list/${id}`,
  PLAY_LIST_USER_FILM_REMOVE: (id: string, slug: string) =>
    `/play-list/removeFilm/${id}?slug=${slug}`,
  //type-avatars
  GET_TYPE_AVATAR: "/type-avatars/getTypeAvatar",
  // img-avatars
  GET_AVATAR_BY_TYPE: (type: string) => `/img-avatars/getImgAvatar/${type}`,
  // comments
  COMMENT_VOTE_LIST: "/publics/comments/top-vote", // nếu không có, sẽ bỏ tính năng
  COMMENT_MAX_LIST: "/publics/comments/top-film", // nếu không có, sẽ bỏ tính năng
  COMMENT_NEW_LIST: "/publics/comments/new",
  //ratings
  COMMENT_RATING_LIST: "/publics/ratings/top-film",
  //users
  FILM_LIKE: (slug: string, param: boolean) =>
    `/users/addFavorite/${slug}?isFavorite=${param}`,
  ACTOR_LIKE: (slug: string, param: boolean) =>
    `/users/addFavoriteCast/${slug}?isFavorite=${param}`,
  HISTORY_FILM_ADD_OR_REMOVE: (
    slug: string,
    percent: number,
    episode: number,
    isHistory: boolean
  ) =>
    `/users/addOrRemoteHistory/${slug}?percent=${percent}&episode=${episode}&isHistory=${isHistory}`,
  HISTORY_FILM: `/users/getHistoryFilm`,
  FILM_LIKE_GET: `/users/getFavorite`,
  //auth
  AUTH_UPDATE: "/auth/update",
  PASS_UPDATE: "/auth/forgotPassword",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  //meta
  META_DOMAIN: (name: string) => `/domains/domainByName/${name}`,
};
