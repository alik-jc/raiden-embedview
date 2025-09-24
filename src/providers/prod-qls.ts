import { SET_CORE_URI } from '../index';

export const qlsProvider = async (uriParameter: string) => {
    const json = SET_CORE_URI
        const urlSet = json.qls;
        const response = urlSet + uriParameter;
        return response;
};

export const uqlsProvider = async (uriParameter: string) => {
    const json = SET_CORE_URI
        const urlSet = json.uqls;
        const response = urlSet + uriParameter;
        return response;
}

export const setProvider = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.url;
    const response = urlSet + uriParameter;
    return response;
};