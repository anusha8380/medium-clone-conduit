import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {authActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import { combineLatest } from 'rxjs'
import { ErrorMessagesComponent } from 'src/app/shared/components/error-messages/error-messages.component'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,//use components withput modules
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ErrorMessagesComponent],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
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
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
  }
}
