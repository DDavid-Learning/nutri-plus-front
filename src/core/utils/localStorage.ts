import { Api } from "../services/api/api"
import { IUser } from "../models/modelAuthContext";

export function setUserLocalStorage(user: IUser | null) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
}

export function cleanLocalStorage() {
    localStorage.clear()
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('user');
    if (!json) {
        return null;
    }
    try {
        const user = JSON.parse(json);
        return user ?? null;
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
    }
}
