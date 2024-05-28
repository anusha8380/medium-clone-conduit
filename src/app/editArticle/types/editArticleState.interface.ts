import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorInterface} from 'src/app/auth/types/backend.errors.interface'

export interface EditArticleStateInterface {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorInterface | null
}
