import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {authActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import { combineLatest } from 'rxjs'
import { ErrorMessagesComponent } from 'src/app/shared/components/error-messages/error-messages.component'
import { LoginRequestInterface } from '../../types/loginRequestInterface'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,//use components without modules
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ErrorMessagesComponent],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })


  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }
}
