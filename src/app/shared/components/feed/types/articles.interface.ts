import { ProfileInterface } from "src/app/shared/types/profile.interface";

export type popularTagList=string;

export interface ArticleInterface {
  body:string;
  createdAt: string;
  description:string;
  favorited: boolean;
  favoritesCount:number;
  tagList: popularTagList[];
  slug:string;
  title:string;
  updatedAt:string;
  author:ProfileInterface;
}