import { Filter } from "./base.d";

export interface CategoryModel {
  name: string;
  slug: string;
  english?: string;
  category?: string;
  sortBy?: string;
  link?: string;
  filter?: Filter[];
  isLarge?: boolean;
}
