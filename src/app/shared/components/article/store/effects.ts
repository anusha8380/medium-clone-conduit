import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ArticleActions } from "./actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { ArticleService as SharedArticleService } from "src/app/shared/services/article.service"
import { ArticleInterface } from "../../feed/types/articles.interface"
import { ArticleService } from "../services/article.service"
import { Router } from "@angular/router"
import { FollowStateInterface } from "../types/followState.interface"

export const getArticleEffect = createEffect((
    action$ = inject(Actions),
    articleService = inject(SharedArticleService)
) => {
    return action$.pipe(
        ofType(ArticleActions.getArticle),
        switchMap(({ slug }) => {
            return articleService.getArticle(slug).pipe(
                map((article: ArticleInterface) => {
                    return ArticleActions.getArticleSuccess({ article })
                }),
                catchError(() => {
                    return of(ArticleActions.getArticleFailure())
                })
            )
        })
    )
}, { functional: true })

export const deleteArticleEffect = createEffect((
    action$ = inject(Actions),
    articleService = inject(ArticleService)
) => {
    return action$.pipe(
        ofType(ArticleActions.deleteArticle),
        switchMap(({ slug }) => {
            return articleService.deleteArticle(slug).pipe(
                map(() => {
                    return ArticleActions.deleteArticleSuccess()
                }),
                catchError(() => {
                    return of(ArticleActions.deleteArticleFailure())
                })
            )
        })
    )
}, { functional: true })

export const redirectAfterDeleteEffect = createEffect((
    action$ = inject(Actions),
    router = inject(Router)
) => {
    return action$.pipe(
        ofType(ArticleActions.deleteArticleSuccess),
        tap(() => {
            router.navigateByUrl('/')
        })
    )
}, { functional: true, dispatch: false })

export const followProfileEffect = createEffect((
    action$ = inject(Actions),
    articleService = inject(ArticleService)
) => {
    return action$.pipe(
        ofType(ArticleActions.followProfile),
        switchMap(({ profile, following }) => {
            const favorite$ = following
                ? articleService.followUser(profile)
                : articleService.unFollowUser(profile)
            return favorite$.pipe(
                map((profile: FollowStateInterface) => {
                    return ArticleActions.followProfileSuccess({ profile })
                }),
                catchError(() => {
                    return of(ArticleActions.followProfileFailure())
                })
            )
        })
    )
}, { functional: true })


export const commentArticleEffect = createEffect((
    action$ = inject(Actions),
    articleService = inject(ArticleService)
) => {
    return action$.pipe(
        ofType(ArticleActions.commentArticle),
        switchMap(({ body, slug }) => {
            return articleService.commentArticle(slug, body).pipe(
                map(({ comment }) => {
                    return ArticleActions.commentArticleSuccess({ comment: comment })
                }),
                catchError(() => {
                    return of(ArticleActions.commentArticleFailure())
                })
            )
        })
    )
}, { functional: true })