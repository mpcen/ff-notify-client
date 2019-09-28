import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'http://192.168.0.210:3000';

export const callApi = async (method: string, url: string, token: string | null, data?: any) => {
    const config = {
        method,
        url: `${API_URL}/${url}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    } as AxiosRequestConfig;
    const response = await axios(config);

    return response.data;
};
