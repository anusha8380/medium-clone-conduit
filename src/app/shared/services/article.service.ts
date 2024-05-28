import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleInterface } from "src/app/shared/components/feed/types/articles.interface";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { ArticleResponseInterface } from "../components/feed/types/articleResponseInterface";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {

    }
    getArticle(slug: string):Observable<ArticleInterface> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}` ;
        return this.http.get<ArticleResponseInterface>(fullUrl).pipe(map(res=> res.article))
    }
}