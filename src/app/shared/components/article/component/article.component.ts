import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest, filter, map } from 'rxjs'
import { selectCurrentUser } from 'src/app/auth/store/reducers'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { ArticleActions } from '../store/actions'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducer'
import { TagListComponent } from '../../tag-list/tag-list.component'
import { AddToFavoritesComponent } from '../../addToFavorites/addToFavorites.component'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import { FollowComponent } from '../../follow/follow.component'
import { CommentFormComponent } from '../../commentForm/comment/commentForm.component'
import { CommentFormValuesInterface } from '../../commentForm/types/commentFormValues.interface'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TagListComponent,
    AddToFavoritesComponent,
    FollowComponent,
    CommentFormComponent
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.getArticle({ slug: this.slug }))
  }

  deleteArticle(): void {
    this.store.dispatch(ArticleActions.deleteArticle({ slug: this.slug }))
  }

  onSubmit(commentFormValues: any): void {
    
    this.store.dispatch(ArticleActions.commentArticle({ ...commentFormValues }))
  }
}