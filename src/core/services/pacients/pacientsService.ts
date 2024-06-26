import axios, { AxiosError } from "axios";
import { TPacientRegister } from "../../utils/types/types";
import { Api } from "../api/api";


export async function fecthPacient() {
    try {
        const response = await Api.get('/pacientes');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createPacient(pacient: TPacientRegister) {
    try {
        const response = await Api.post('/create/paciente', pacient);
        return response.data;
    } catch (error) {
        throw error;
    }
}