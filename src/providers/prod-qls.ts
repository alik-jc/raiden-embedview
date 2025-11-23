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

export const uqloProd = async (uriParameter: string): Promise<string> => {
    const json = SET_CORE_URI;
    const urlSet = json.uqload;

    // Limpiar el parámetro: remover markdown links y espacios
    const cleanUri = uriParameter
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2') // Extrae URL de markdown [text](url)
        .trim();

    // Patrones de extracción mejorados
    const patterns = [
        /\/embed-([a-z0-9]+)\.html/i,           // /embed-HASH.html
        /\/([a-z0-9]+)\.html/i,                 // /HASH.html
        /uqload\.com\/([a-z0-9]+)/i,            // uqload.com/HASH
        /^([a-z0-9]{12,})$/i                    // Solo el hash
    ];

    // Intentar extraer el hash con cada patrón
    let hash = '';
    for (const pattern of patterns) {
        const match = cleanUri.match(pattern);
        if (match && match[1]) {
            hash = match[1];
            break;
        }
    }

    // Validar que el hash sea válido (típicamente 12+ caracteres alfanuméricos)
    if (!hash || hash.length < 10) {
        throw new Error(`Invalid uqload parameter: ${uriParameter}`);
    }

    return `${urlSet}${hash}`;
};

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

export const wishHgProd = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.wishg;

    const hashMatch = uriParameter.match(/\/e\/([^/]+)/); // Modified regex to match /e/
    const hash = hashMatch ? hashMatch[1] : '';
    
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;
    return urlResponse;
}

export const proxedXn = async (uriParameter: string) => {
    const json = SET_CORE_URI;
    const urlSet = json.xn;
    const responseUrl = urlSet + uriParameter;

    return responseUrl;
};