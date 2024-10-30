import { isAxiosError } from "axios";
import api from "../config/axios";
import { booksArraySchema, bookSchema, statisticSchema } from "../types";

export async function fetchAllBooks() {
    try {
        const { data } = await api(`/book`)
        const response = booksArraySchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchTop10Books() {
    try {
        const { data } = await api(`/book/top10`)
        const response = booksArraySchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchBooksByLanguage(language: string) {
    try {
        const { data } = await api(`/book/language/${language}`)
        const response = booksArraySchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchStatisticsBooks() {
    try {
        const { data } = await api(`/book/statistics`)
        const response = statisticSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function searchBookByTitle(title : string) {
    try {
        const { data } = await api(`/book/search/${title}`)
        const response = bookSchema.safeParse(data)
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