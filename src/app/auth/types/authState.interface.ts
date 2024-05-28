import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { BackendErrorInterface } from "./backend.errors.interface";

export interface AuthStateInterface {
  isSubmitting: boolean,
  currentUser : CurrentUserInterface | undefined |null,
  isLoading: Boolean,
  validationErrors: BackendErrorInterface | null,
}
