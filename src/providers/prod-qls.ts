import axios from 'axios';
import { userAgent } from '../app';
import dotenv from 'dotenv';

dotenv.config();

const hostUri = process.env.SET_CORE_URI || '';

export const qlsProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.qls;
        const response = urlSet + uriParameter;
        console.log(response);
        return response;
};

export const uqlsProvider = async (uriParameter: string) => {
    const json = axios.get(hostUri, { headers: { 'User-Agent': userAgent } });
        const url = (await json).data;
        const urlSet = url.uqls;
        const response = urlSet + uriParameter;
        console.log(response);
        return response;
}