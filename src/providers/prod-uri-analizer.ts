type domains = {
    [key: string]: string;
}

export const performDoodAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("d-s.")) {
        const dood: domains = {
            "d-s.io": "dsvplay.com"
        }
        const finded = Object.keys(dood).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, dood[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const performOkruAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("http://ok.ru")) {
        const okru: domains = {
            "http://ok.ru": "https://ok.ru",

        }
        const finded = Object.keys(okru).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, okru[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const abyssTransform = (decodedUri: string) => {
    if (decodedUri.includes("https://short.ink/") || decodedUri.includes("https://short.icu/")) {
        const abyss: domains = {
            "https://short.ink/": "https://abyssplayer.com/",
            "https://short.icu/": "https://abyssplayer.com/"
        }
        const finded = Object.keys(abyss).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, abyss[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const performWishAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("/e/")
    ) {
        return decodedUri
    } else {
        const wish: domains = {
            "https://wishfast.top/": "https://dumbalag.com/e/",
            "https://streamwish.top/": "https://dumbalag.com/e/",
            "https://flaswish.com/": "https://dumbalag.com/e/",
            "https://sfastwish.com/": "https://dumbalag.com/e/",
            "https://obeywish.com/": "https://dumbalag.com/e/",
            "https://streamwish.com/e/": "https://dumbalag.com/e/",
            "https://streamwish.to/": "https://dumbalag.com/e/",
            "https://embedwish.com/e/": "https://dumbalag.com/e/"
        }
        const finded = Object.keys(wish).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, wish[finded!]);
        return newUri;
    }
}

export const performLuluAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("/e/")) {
        return decodedUri;
    } else {
        const lulu: domains = {
            "https://luluvdo.com/": "https://luluvdo.com/e/"
        };
        const finded = Object.keys(lulu).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, lulu[finded!]);
        return newUri;
    }
};

export const performLulustAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes(".st") || decodedUri.includes(".com") || decodedUri.includes("luluvdoo.com")) {
        const lulust: domains = {
            "lulu.st": "luluvdo.com",
            "lulustream.com": "luluvdo.com",
            "luluvdoo.com": "luluvdo.com",
            "luluvid.com": "luluvdo.com",
        };
        const finded = Object.keys(lulust).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, lulust[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const wistTransform = (decodedUri: string) => {
    const wishdomain: { [key: string]: string } = {
        "embedwish.com": "hgcloud.to",
        "streamwish.com": "hgcloud.to",
        "streamwish.top": "hgcloud.to",
        "streamwish.to": "hgcloud.to",
        "flaswish.com": "hgcloud.to",
        "sfastwish.com": "hgcloud.to",
        "obeywish.com": "hgcloud.to",
        "jodwish.com": "hgcloud.to",
        "wishfast.top": "hgcloud.to",
        "swhoi.com": "hgcloud.to",
    }
    const finded = Object.keys(wishdomain).find(key => decodedUri.includes(key));
    const newUri = decodedUri.replace(finded!, wishdomain[finded!]);
    return newUri;
}

export const performMixdropAnalyzer = (decodedUri: string) => {
    // Si tiene la extensión mal escrita (.comp), corregirla a .com
    if (decodedUri.includes('.comp')) {
        return decodedUri.replace('.comp', '.com');
    }

    if (decodedUri.includes('mixdrop')) {
        const mixdrop: domains = {
            "mixdrop.com": 'mdy48tn97.com',
            "mixdrop.co": 'mdy48tn97.com',
            "mixdrop.to": 'mdy48tn97.com'
        };
        const finded = Object.keys(mixdrop).find(key => decodedUri.includes(key));
        if (!finded) return decodedUri;
        return decodedUri.replace(finded, mixdrop[finded]);
    }
    return decodedUri;
}

import SET_CORE_URI from '../assets/set-core.json';

/**
 * Extrae el hash limpio de una URL de Moon (Filemoon / Byse)
 * Soporta URLs fragmentadas/concatenadas (ej: bysewihe.comkoze.com/e/bfbzqnq4sewp),
 * rutas /e/, /d/, /embed/, /download/, URLs en markdown o hashes directos.
 */
export const extractMoonHash = (uri: string): string | null => {
    if (!uri) return null;

    // Limpiar markdown links y espacios
    const cleanUri = uri
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2')
        .trim();

    // Patrones de extracción
    const patterns = [
        /(?:\/|^)(?:e|d|embed|download)\/([a-zA-Z0-9]+)/i, // /e/HASH, /d/HASH, /embed/HASH, etc.
        /[?&]id=([a-zA-Z0-9]+)/i,                          // ?id=HASH o &id=HASH
        /\/([a-zA-Z0-9]{10,})$/i,                          // /HASH al final
        /^([a-zA-Z0-9]{10,})$/i                            // Solo el hash
    ];

    for (const pattern of patterns) {
        const match = cleanUri.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

export const filemoonAnalizer = (decodedUri: string): string => {
    if (!decodedUri) return decodedUri;

    const hash = extractMoonHash(decodedUri);
    if (!hash) {
        return decodedUri;
    }

    const baseCore = SET_CORE_URI?.moon || 'https://bysewihe.com/e/';

    if (baseCore.endsWith('/e/') || baseCore.endsWith('=')) {
        return `${baseCore}${hash}`;
    } else if (baseCore.endsWith('/')) {
        return `${baseCore}e/${hash}`;
    } else {
        return `${baseCore}/e/${hash}`;
    }
};

export const doubleB64Controller = (decodedUri: string): string => {
    if (!decodedUri) return decodedUri;

    // Si ya es una URL con protocolo (http/https/protocol-relative), no requiere decodificación adicional
    if (decodedUri.startsWith('http://') || decodedUri.startsWith('https://') || decodedUri.startsWith('//')) {
        return decodedUri;
    }

    try {
        const cleanUri = decodedUri.trim();
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        if (base64Regex.test(cleanUri) || /^[A-Za-z0-9+/=]+$/.test(cleanUri)) {
            const secondDecode = Buffer.from(cleanUri, 'base64').toString('utf-8');
            if (
                secondDecode.startsWith('http://') ||
                secondDecode.startsWith('https://') ||
                secondDecode.startsWith('//') ||
                /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(secondDecode)
            ) {
                return secondDecode;
            }
        }
    } catch {
        // Si no es un base64 válido o falla la decodificación, mantenemos el valor actual
    }

    return decodedUri;
};

export const sanitizeDomainTld = (uri: string): string => {
    if (!uri) return uri;
    // Corrige TLDs con sufijo 'p' u otros caracteres accidentales comunes (ej. .comp -> .com, .netp -> .net, .orgp -> .org)
    return uri.replace(
        /(\b[a-zA-Z0-9-]+)\.(comp|netp|orgp|top[a-z]|site[a-z]|online[a-z]|cloud[a-z])\b/gi,
        (match, domain, tld) => {
            const lowerTld = tld.toLowerCase();
            if (lowerTld === 'comp') return `${domain}.com`;
            if (lowerTld === 'netp') return `${domain}.net`;
            if (lowerTld === 'orgp') return `${domain}.org`;
            if (lowerTld.startsWith('top')) return `${domain}.top`;
            if (lowerTld.startsWith('site')) return `${domain}.site`;
            if (lowerTld.startsWith('online')) return `${domain}.online`;
            if (lowerTld.startsWith('cloud')) return `${domain}.cloud`;
            return match;
        }
    );
};

export const decodeUriParameter = (uriParameter: string): string => {
    if (!uriParameter) return '';
    try {
        const firstDecode = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const decoded = doubleB64Controller(firstDecode);
        return sanitizeDomainTld(decoded);
    } catch {
        return sanitizeDomainTld(uriParameter);
    }
};