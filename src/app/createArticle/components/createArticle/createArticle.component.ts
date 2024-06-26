import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {ArticleFormComponent} from 'src/app/shared/components/ArticleForm/ArticelForm.component'
import {ArticleFormValues} from 'src/app/shared/components/ArticleForm/ArticleFormValues.interface'
import {ArticleRequestInterface} from 'src/app/shared/types/articleRequest.interface'
import {createArticleActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValues): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
