import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";

export const getCurrentUserEffect = createEffect((
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
) => {
    return action$.pipe(
        ofType(authActions.getcurrentuser),
        switchMap(() => {
            const token = persistanceService.getItem('accessToken')
            if(!token){
                return of(authActions.getcurrentuserFailure())
            }
            return authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.getcurrentuserSuccess({currentUser})
                }),
                catchError(() => {
                    return of(authActions.getcurrentuserFailure())
                })
            )
        })
    )
}, { functional: true })

export const registerEffect = createEffect((
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
) => {
    return action$.pipe(
        ofType(authActions.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService?.setItem('accessToken', currentUser.token)
                    return authActions.registerSuccess({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailure({ errors: errorResponse.error.errors }))
                })
            )
        })
    )
}, { functional: true })

export const redirectAfterRegister = createEffect((
    action$ = inject(Actions), router = inject(Router)
) => {
    return action$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
            router.navigateByUrl('/')
        })
    )
}, { functional: true, dispatch: false })



export const loginEffect = createEffect((
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
) => {
    return action$.pipe(
        ofType(authActions.login),
        switchMap(({ request }) => {
            return authService.login(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService?.setItem('accessToken', currentUser.token)
                    return authActions.loginSuccess({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.loginFailure({ errors: errorResponse.error.errors }))
                })
            )
        })
    )
}, { functional: true })

export const redirectAfterLogin = createEffect((
    action$ = inject(Actions), router = inject(Router)
) => {
    return action$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
            router.navigateByUrl('/')
        })
    )
}, { functional: true, dispatch: false })

export const updateCurrentUserEffect = createEffect((
    action$ = inject(Actions),
    authService = inject(AuthService),
) => {
    return action$.pipe(
        ofType(authActions.updateCurrentUser),
        switchMap(({currentuserRequest}) => { 
            return authService.updateCurrentUser(currentuserRequest).pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.updateCurrentUserSuccess({currentUser})
                }),
                catchError((errorResponse:HttpErrorResponse) => {
                    return of(authActions.updateCurrentUserFailure({errors: errorResponse.error.errors}))
                })
            )
        })
    )
}, { functional: true })

export const logoutEffect = createEffect(
    (
      actions$ = inject(Actions),
      router = inject(Router),
      persistanceService = inject(PersistanceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          persistanceService.setItem('accessToken', '')
          router.navigateByUrl('/')
        })
      )
    },
    {functional: true, dispatch: false}
  )