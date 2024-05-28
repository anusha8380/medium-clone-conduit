import { BackendErrorInterface } from "src/app/auth/types/backend.errors.interface";

export interface SettingsStateInterface{
    isSubmitting:Boolean;
    validationErrors:BackendErrorInterface | null;                                                                                                                        
}