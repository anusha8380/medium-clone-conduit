import { Component } from "@angular/core";
import { FeedTogglerComponent } from "../shared/components/feed-toggler/feed-toggler.component";
import { FeedComponent } from "../shared/components/feed/feed.component";
import { PopularTagsComponent } from "../shared/components/popularTags/popularTags.component";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../auth/store/reducers";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'mc-profile',
    templateUrl: './userProfile.component.html',
    standalone: true,
    styleUrls:['./userProfile.component.css'],
    imports: [FeedTogglerComponent, FeedComponent, PopularTagsComponent, RouterLink, CommonModule]
})

export class UserProfileComponent {
    apiUrl: string = ''
    tagName: string = ''

    constructor(private route: ActivatedRoute, private router: Router, private store:Store) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['username']
            if (this.router.url.includes('favorites')) {
                this.apiUrl = `/articles/?favorited=${this.tagName}`
            } else {
                this.apiUrl = `/articles/?author=${this.tagName}`
            }
        })

    }

        currentUser$ = this.store.select(selectCurrentUser)

}