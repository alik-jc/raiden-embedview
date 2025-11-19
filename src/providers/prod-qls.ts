import { SET_CORE_URI } from '../index';

export const luluProd = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.lulu;

    const hashMatch = uriParameter.match(/e\/([^/]+)/);
    const hash = hashMatch ? hashMatch[1] : '';
    
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;
    
    return urlResponse;
};

export const uqloProd = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.uqload;
    
    const hashMatch = uriParameter.match(/https?:\/\/[^/]+\/([^/]+)/);
    const hash = hashMatch ? hashMatch[1] : '';

    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;

    return urlResponse;
}

export const fmoonProd = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.fmoon;

    const hashMatch = uriParameter.match(/e\/([^/]+)/);
    const hash = hashMatch ? hashMatch[1] : '';

    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;

    return urlResponse;
};