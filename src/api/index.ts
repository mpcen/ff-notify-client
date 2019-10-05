import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://persource-api.herokuapp.com';

export const callApi = async (method: string, url: string, token: string | null, data?: any) => {
    const config = {
        method,
        url: `${API_URL}/${url}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    } as AxiosRequestConfig;

    try {
        const response = await axios(config);
        return response.data;
    } catch (e) {
        return { error: 'There was an error in the generic API: ' + e };
    }
};
