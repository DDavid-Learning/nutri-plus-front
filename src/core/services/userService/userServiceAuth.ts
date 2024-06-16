import { Api } from "../api/api";

export async function LoginRequest(crn: string, senha: string) {
    try {
        const response = await Api.post('/login', { crn: crn, senha: senha });
        return response.data;
    } catch (error) {
        throw error;
    }
}
