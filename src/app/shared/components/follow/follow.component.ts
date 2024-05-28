import { Component, Input } from "@angular/core";
import { ProfileInterface } from "../../types/profile.interface";
import { Store } from "@ngrx/store";
import { ArticleActions } from "../article/store/actions";

@Component({
    selector: 'mc-follow',
    templateUrl: './follow.component.html',
    standalone: true,
    styleUrls:['./follow.component.css']
})

export class FollowComponent {
    @Input() author!: ProfileInterface;
    @Input() following: boolean = false;

    constructor(private store: Store) { }

    handleFollow(): void {
        this.store.dispatch(ArticleActions.followProfile({ profile: this.author, following: this.following }))
        this.following = !this.following;

    }
}