import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { FeedService } from "../services/feed.service"
import { FeedActions } from "./actions"
import { catchError, map, of, switchMap } from "rxjs"
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface"


export const getFeedEffect = createEffect((
    action$ = inject(Actions),
    feedService = inject(FeedService)
) => {
    return action$.pipe(
        ofType(FeedActions.getFeed),
        switchMap(({url}) => {
            return feedService.getFeed(url).pipe(
                map((feed:GetFeedResponseInterface) => {
                    return FeedActions.getFeedSuccess({feed})
                }),
                catchError(() => {
                    return of(FeedActions.getFeedFailure())
                })
            )
        })
    )
}, { functional: true })