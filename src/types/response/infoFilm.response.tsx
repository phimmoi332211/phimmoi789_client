import { Film } from "../model/film.d";

export interface InfoFilmResponse {
  statusCode?: number;
  message?: string;
  data?: Film;
}
