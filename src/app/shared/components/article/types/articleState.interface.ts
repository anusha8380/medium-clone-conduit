import { CommentResponseInterface } from "../../commentForm/types/commentResponseInterface";
import { ArticleInterface } from "../../feed/types/articles.interface";

export interface ArticleStateInterface{
    isLoading: boolean;
    error: string | null;
    data: ArticleInterface | null;
    comments:CommentResponseInterface | null;
}