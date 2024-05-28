import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    constructor(private http: HttpClient) {

    }
    getFeed(url: string) {
        const fullUrl = environment.apiUrl + url;
        return this.http.get<GetFeedResponseInterface>(fullUrl)
    }
}