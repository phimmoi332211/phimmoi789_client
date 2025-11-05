import {Film} from "@/types/model/film.d";
import {Meta} from "@/types/list";

export interface Actor {
  code: string
  name: string
  original_name: string
  slug: string
  profile_path: string
  gender: number
}

export interface ActorDetail {
  data: {
    infoActor: Actor
    films: Film[]
  };
}