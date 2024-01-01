import { type Tag } from "./tag"

export interface Description {
  text: string;
  list?: string[];
}

export interface Post {
  city: string;
  company: string;
  context?: string;
  country: string;
  description: Description[];
  end?: string;
  specialty?: string;
  start: string;
  tags?: Tag[];
  title: string;
}
