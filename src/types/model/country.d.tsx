import { Filter } from "./base.d";

export interface CountryModel {
  _id?: string;
  name: string;
  slug: string;
  id?: string;
  link?: string;
  filter?: Filter[];
  isLarge?: boolean;
}
