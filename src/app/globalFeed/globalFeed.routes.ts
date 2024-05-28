import { Route } from "@angular/router";
import { GlobalFeedComponent } from "../globalFeed/global-feed/global-feed.component";

export const feedRoutes: Route[] = [
    {
      path: '',
      component: GlobalFeedComponent,
    },
  ]