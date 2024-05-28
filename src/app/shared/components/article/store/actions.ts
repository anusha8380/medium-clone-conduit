import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../feed/types/articles.interface";
import { FollowStateInterface } from "../types/followState.interface";
import { ProfileInterface } from "src/app/shared/types/profile.interface";
import { CommentResponseInterface } from "../../commentForm/types/commentResponseInterface";
import { CommentFormValuesInterface } from "../../commentForm/types/commentFormValues.interface";

export const ArticleActions = createActionGroup({
    source: 'article',
    events:{
     'Get article':props<{slug:string}>(),
     'Get article success':props<{article:ArticleInterface}>(),
     'Get article failure':emptyProps(),
     'Delete article':props<{slug:string}>(),
     'Delete article success':emptyProps(),
     'Delete article failure':emptyProps(),
     'Follow profile':props<{following:Boolean, profile:ProfileInterface}>(),
     'Follow profile success':props<{profile:FollowStateInterface}>(),
     'Follow profile failure':emptyProps(),
     'Comment article':props<{body:string, slug:string}>(),
     'Comment article success':props<{comment:CommentResponseInterface}>(),
     'Comment article failure':emptyProps(),
    }
})