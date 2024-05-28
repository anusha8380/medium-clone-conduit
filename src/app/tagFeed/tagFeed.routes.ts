import { Route } from "@angular/router";
import { TagFeedComponent } from "./tag-feed/tag-feed.component";

export const feedRoutes: Route[] = [
    {
      path: '',
      component: TagFeedComponent,
    },
  ]