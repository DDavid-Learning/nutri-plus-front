import { Api } from "../../services/api"
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
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

export async function LoginRequest(crn: string, senha: string) {
    try {
        const response = await Api.post('/login', { crn: crn, senha: senha });
        return response.data;
    } catch (error) {
        console.error("Login request error:", error);
        throw error;
    }
}