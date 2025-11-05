import { Filter } from "./base.d";

export interface CategoryModel {
  _id: string;
  name: string;
  url: string;
  id?: string;
  link?: string;
  filter?: Filter[];
  isLarge?: boolean;
}
