import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { BackendErrorInterface } from "../types/backend.errors.interface";
import { LoginRequestInterface } from "../types/loginRequestInterface";
import { CurrentUserRequestInterface } from "src/app/shared/types/currentUserRequest.interface";


export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorInterface }>(),
    'getCurrentUser': emptyProps(),
    'getCurrentUser success': props<{ currentUser: CurrentUserInterface }>(),
    'getCurrentUser failure': emptyProps(),
    'Update Current User': props<{currentuserRequest:CurrentUserRequestInterface}>(),
    'Update Current User success': props<{ currentUser: CurrentUserInterface }>(),
    'Update Current User failure': props<{errors:BackendErrorInterface}>(),
    Logout: emptyProps(),
  }
})