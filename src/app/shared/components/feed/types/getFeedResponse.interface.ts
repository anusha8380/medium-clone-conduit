import { ArticleInterface } from "./articles.interface";

export interface GetFeedResponseInterface{
    articles:ArticleInterface[],
    articlesCount:number
}