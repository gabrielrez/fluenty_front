import axios from "axios";
import { handleApiErrors } from "./handleApiErrors";
import router from "../router";

export const api = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data?.error === 'subscription_required') {
            router.push('/planos');
            return Promise.reject(error);
        }

        return Promise.reject(handleApiErrors(error));
    }
);