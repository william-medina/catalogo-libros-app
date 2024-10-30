import { isAxiosError } from "axios";
import api from "../config/axios";
import { authorsArraySchema, authorSchema } from "../types";

export async function fetchAllAuthors() {
    try {
        const { data } = await api(`/author`)
        const response = authorsArraySchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchAuthorsByYear(year: number) {
    try {
        const { data } = await api(`/author/active/${year}`)
        const response = authorsArraySchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function searchAuthorByName(name : string) {
    try {
        const { data } = await api(`/author/search/${name}`)
        const response = authorSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw error.response.data.error;
        } else {
            throw 'Request Failed';
        }
    }
}