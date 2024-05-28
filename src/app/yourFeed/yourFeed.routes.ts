import { Route } from "@angular/router";
import { YourFeedComponent } from "./your-feed/yourl-feed.component";

export const feedRoutes: Route[] = [
    {
      path: '',
      component: YourFeedComponent,
    },
  ]