import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleActions } from './actions'
import { routerNavigationAction } from "@ngrx/router-store";
import { ArticleStateInterface } from "../types/articleState.interface";

const initialState: ArticleStateInterface = {
    isLoading: true,
    data: null,
    comments:null,
    error: null
}
const articleFeatue = createFeature({
    name: 'article',
    reducer: createReducer(
        initialState,
        on(ArticleActions.getArticle, (state) => ({
            ...state,
            isLoading: true
        })),
        on(ArticleActions.getArticleSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.article
        })),
        on(ArticleActions.getArticleFailure, (state) => ({
            ...state,
            isLoading: false
        })),
        on(ArticleActions.commentArticleSuccess, (state,action) => ({
            ...state,
            isLoading: false,
            comments:action.comment
        })),
        on(routerNavigationAction, () => (initialState))
    )
})

export const {
    name: articleFeatureKey,
    reducer: reducer,
    selectIsLoading,
    selectError,
    selectData: selectArticleData,
    selectComments
} = articleFeatue