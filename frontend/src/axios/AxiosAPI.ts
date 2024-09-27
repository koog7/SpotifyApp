import axios, {AxiosHeaders} from 'axios';
import {RootState} from "../app/store.ts";
import {Store} from "@reduxjs/toolkit";

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});


export const addInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config) => {
        const token = store.getState().User.user?.token;

        const headers = config.headers as AxiosHeaders;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    });
};

export default axiosApi;