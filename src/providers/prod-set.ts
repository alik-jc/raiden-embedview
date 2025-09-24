import axios from 'axios';
import { userAgent } from '../embed-serv';
import { SET_CORE_URI } from '../index';

const hostUri = SET_CORE_URI || '';

export const setProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.url;
        const response = urlSet + uriParameter;
        return response;
};