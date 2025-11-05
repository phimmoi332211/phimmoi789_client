import { Film } from "../model/film.d";

export interface FilmListResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: Film[];
  };
}
