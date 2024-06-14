import axios from "axios";
import { TConsultRegister } from "../../utils/types/types";
import { Api } from "../api/api";



export async function fecthConsults() {
    try {
        const response = await Api.get('/consultas');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fecthConsultsDetails(id: string) {
    try {
        const response = await Api.get(`/consultas/detalhes/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function createConsult(createConsult: TConsultRegister) {
    try {
        const response = await Api.post('/create/consulta', createConsult);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {
                return error.response.data.message;
            }
        }
        return 'erro desconhecido';
    }
}