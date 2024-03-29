import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://persource-api.herokuapp.com';
// const API_URL = 'http://192.168.0.210:3000';

export const callApi = async (method: string, endpoint: string, token: string | null, data?: any) => {
    const config = {
        method,
        url: `${API_URL}/${endpoint}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    } as AxiosRequestConfig;

    try {
        const response = await axios(config);
        return response.data;
    } catch (e) {
        return { error: e };
    }
};
