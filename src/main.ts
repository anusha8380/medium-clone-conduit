import { isDevMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { AppComponent } from './app/app.component'
import { appRoutes } from './app/app.routes'
import { authFeatureKey, authReducer } from './app/auth/store/reducers'
import { popularTagsFeatureKey, popularTagsReducer } from './app/shared/components/popularTags/store/reducer'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from '@ngrx/effects'
import * as authEffecs from "./app/auth/store/effects"
import * as feedEffects from './app/shared/components/feed/store/effects'
import * as popularTagsEffect from './app/shared/components/popularTags/store/effects'
import * as addToFavoritesEffects from './app/shared/components/addToFavorites/store/effects'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { authInterceptor } from './app/shared/services/interceptor'
import { feedFeatureKey, reducer } from './app/shared/components/feed/store/reducer'
import {AddToFavoritesService} from './app/shared/components/addToFavorites/services/addToFavorites.service'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideEffects(authEffecs, feedEffects, popularTagsEffect, addToFavoritesEffects),
    provideStore({
      router: routerReducer
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, reducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    AddToFavoritesService
  ],
})
