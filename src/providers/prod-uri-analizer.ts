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

export const filemoonAnalizer = (decodedUri: string) => {
    if (decodedUri.includes('bysewihe.com')) return decodedUri;

    const filemoon: domains = {
        "filemoon.nl": 'bysewihe.com',
        "filemoon.sx": 'bysewihe.com',
        "byse.sx": 'bysewihe.com',
        "byse": 'bysewihe.com'
    };

    // Priorizar claves más largas (p. ej. "byse.sx" antes que "byse")
    const keys = Object.keys(filemoon).sort((a, b) => b.length - a.length);
    const matched = keys.find(k => decodedUri.includes(k));
    if (!matched) return decodedUri;

    return decodedUri.replace(matched, filemoon[matched]);

}

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

export const decodeUriParameter = (uriParameter: string): string => {
    if (!uriParameter) return '';
    try {
        const firstDecode = Buffer.from(uriParameter, 'base64').toString('utf-8');
        return doubleB64Controller(firstDecode);
    } catch {
        return uriParameter;
    }
};