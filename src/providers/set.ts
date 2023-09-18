import axios from 'axios';
import { userAgent } from '../app';

const HOSTURL = 'https://dev.aniyae.net/set-json/set-core.json';

export const setProvider = async (uriParameter: string) => {
    const json = axios.get(HOSTURL, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.url;
        const response = urlSet + uriParameter;
        console.log(response);
        return response;
};