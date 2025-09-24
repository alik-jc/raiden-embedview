import axios from 'axios';
import { userAgent } from '../embed-serv';
import { SET_CORE_URI } from '../assets/assets';

const hostUri = SET_CORE_URI;

export const qlsProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.qls;
        const response = urlSet + uriParameter;
        return response;
};

export const uqlsProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.uqls;
        const response = urlSet + uriParameter;
        return response;
}