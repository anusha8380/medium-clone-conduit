import {BackendErrorInterface} from 'src/app/auth/types/backend.errors.interface'

export interface CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorInterface | null
}
