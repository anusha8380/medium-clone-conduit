import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {
    setItem(key: string, value: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.error('Error setting the key', err)
        }
    }

    getItem(key: string): unknown {
        try {
            const localStorageItem = localStorage.getItem(key)
            return localStorageItem ? JSON.parse(localStorageItem) : null;

        } catch (err) {
            console.error('Error getting the key', err);
            return null;
        }
    }
}