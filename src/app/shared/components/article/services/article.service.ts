import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleInterface } from "src/app/shared/components/feed/types/articles.interface";
import { environment } from "src/environments/environment.development";
import { Observable, map, of } from "rxjs";
import { FollowStateInterface } from "../types/followState.interface";
import { ProfileInterface } from "src/app/shared/types/profile.interface";
import { CommentResponseInterface } from "../../commentForm/types/commentResponseInterface";
import { CommentFormValuesInterface } from "../../commentForm/types/commentFormValues.interface";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {

    }
    deleteArticle(slug: string): Observable<{}> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.http.delete(fullUrl)
    }

    followUser(profile: ProfileInterface): Observable<FollowStateInterface> {

        const url = this.getUrl(profile.username)
        return this.http
            .post<FollowStateInterface>(url, {})
            .pipe(map(res => res))
    }

    unFollowUser(profile: ProfileInterface): Observable<FollowStateInterface> {

        const url = this.getUrl(profile.username)
        return this.http
            .delete<FollowStateInterface>(url, {})
            .pipe(map(res => res))
    }

    getUrl(slug: string): string {
        return `${environment.apiUrl}/profiles/${slug}/follow`
    }

    commentArticle(slug:string, body: string):Observable<CommentResponseInterface>{
        const url = `${environment.apiUrl}/articles/${slug}/comments`
        return this.http
            .post<CommentResponseInterface>(url, {comment:{ body:body}})
            .pipe(map(res => res))
    }
}