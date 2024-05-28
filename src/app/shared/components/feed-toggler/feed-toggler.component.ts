import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "src/app/auth/store/reducers";
import { UserProfileComponent } from "src/app/userProfile/userProfile.component";

@Component({
    selector: 'mc-feed-toggler',
    templateUrl: './feed-toggler.component.html',
    standalone: true,
    imports:[CommonModule, RouterLink, RouterLinkActive, UserProfileComponent]
})

export class FeedTogglerComponent {
    @Input() tagName: string = '';
    @Input() profile: boolean = false;
    currentUser$ = this.store.select(selectCurrentUser);
    constructor(private store: Store) { }
}