import { Api } from "../api/api";


export async function fecthDashboard() {
    try {
        const response = await Api.get('/dashboard');
        return response.data;
    } catch (error) {
        throw error;
    }
}