import axios, { AxiosRequestConfig } from 'axios';

export const callApi = async (method: string, url: string) => {
    const config = { method, url } as AxiosRequestConfig;
    const response = await axios(config);
    return response.data;
};
