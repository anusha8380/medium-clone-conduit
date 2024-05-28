import { createFeature, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { FeedActions } from './actions'
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: FeedStateInterface = {
    isLoading: true,
    data: null,
    error: null
}
const feedFeatue = createFeature({
    name: 'feed',
    reducer: createReducer(
        initialState,
        on(FeedActions.getFeed, (state) => ({
            ...state,
            isLoading: true
        })),
        on(FeedActions.getFeedSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.feed
        })),
        on(FeedActions.getFeedFailure, (state) => ({
            ...state,
            isLoading: false
        })),
        on(routerNavigationAction, () => (initialState))
    )
})

export const {
    name: feedFeatureKey,
    reducer: reducer,
    selectIsLoading,
    selectError,
    selectData: selectFeedData
} = feedFeatue