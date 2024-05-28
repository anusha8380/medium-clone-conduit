import { Route } from "@angular/router";
import { ArticleComponent } from "./component/article.component";
import { provideEffects } from "@ngrx/effects";
import * as articleEffects from "./store/effects";
import { provideState } from "@ngrx/store";
import { articleFeatureKey, reducer } from './store/reducer'
import { ArticleService } from "./services/article.service";

export const feedRoutes: Route[] = [
    {
      path: '',
      component: ArticleComponent,
      providers:[
        provideEffects(articleEffects),
        provideState(articleFeatureKey,reducer),
        ArticleService
      ]
    },
  ]