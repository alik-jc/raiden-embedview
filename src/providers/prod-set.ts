import axios from 'axios';
import { userAgent } from '../app';
import dotenv from 'dotenv';

dotenv.config();

const hostUri = process.env.SET_CORE_URI || '';

export const setProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.url;
        const response = urlSet + uriParameter;
        return response;
};