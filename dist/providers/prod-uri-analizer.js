"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleB64Controller = exports.filemoonAnalizer = exports.performMixdropAnalyzer = exports.wistTransform = exports.performLulustAnalyzer = exports.performLuluAnalyzer = exports.performWishAnalyzer = exports.abyssTransform = exports.performOkruAnalyzer = exports.performDoodAnalyzer = void 0;
const performDoodAnalyzer = (decodedUri) => {
    if (decodedUri.includes("d-s.")) {
        const dood = {
            "d-s.io": "dsvplay.com"
        };
        const finded = Object.keys(dood).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, dood[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.performDoodAnalyzer = performDoodAnalyzer;
const performOkruAnalyzer = (decodedUri) => {
    if (decodedUri.includes("http://ok.ru")) {
        const okru = {
            "http://ok.ru": "https://ok.ru",
        };
        const finded = Object.keys(okru).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, okru[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.performOkruAnalyzer = performOkruAnalyzer;
const abyssTransform = (decodedUri) => {
    if (decodedUri.includes("https://short.ink/") || decodedUri.includes("https://short.icu/")) {
        const abyss = {
            "https://short.ink/": "https://abyssplayer.com/",
            "https://short.icu/": "https://abyssplayer.com/"
        };
        const finded = Object.keys(abyss).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, abyss[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.abyssTransform = abyssTransform;
const performWishAnalyzer = (decodedUri) => {
    if (decodedUri.includes("/e/")) {
        return decodedUri;
    }
    else {
        const wish = {
            "https://wishfast.top/": "https://dumbalag.com/e/",
            "https://streamwish.top/": "https://dumbalag.com/e/",
            "https://flaswish.com/": "https://dumbalag.com/e/",
            "https://sfastwish.com/": "https://dumbalag.com/e/",
            "https://obeywish.com/": "https://dumbalag.com/e/",
            "https://streamwish.com/e/": "https://dumbalag.com/e/",
            "https://streamwish.to/": "https://dumbalag.com/e/",
            "https://embedwish.com/e/": "https://dumbalag.com/e/"
        };
        const finded = Object.keys(wish).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, wish[finded]);
        return newUri;
    }
};
exports.performWishAnalyzer = performWishAnalyzer;
const performLuluAnalyzer = (decodedUri) => {
    if (decodedUri.includes("/e/")) {
        return decodedUri;
    }
    else {
        const lulu = {
            "https://luluvdo.com/": "https://luluvdo.com/e/"
        };
        const finded = Object.keys(lulu).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, lulu[finded]);
        return newUri;
    }
};
exports.performLuluAnalyzer = performLuluAnalyzer;
const performLulustAnalyzer = (decodedUri) => {
    if (decodedUri.includes(".st") || decodedUri.includes(".com") || decodedUri.includes("luluvdoo.com")) {
        const lulust = {
            "lulu.st": "luluvdo.com",
            "lulustream.com": "luluvdo.com",
            "luluvdoo.com": "luluvdo.com",
            "luluvid.com": "luluvdo.com",
        };
        const finded = Object.keys(lulust).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, lulust[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.performLulustAnalyzer = performLulustAnalyzer;
const wistTransform = (decodedUri) => {
    const wishdomain = {
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
    };
    const finded = Object.keys(wishdomain).find(key => decodedUri.includes(key));
    const newUri = decodedUri.replace(finded, wishdomain[finded]);
    return newUri;
};
exports.wistTransform = wistTransform;
const performMixdropAnalyzer = (decodedUri) => {
    // Si tiene la extensión mal escrita (.comp), corregirla a .com
    if (decodedUri.includes('.comp')) {
        return decodedUri.replace('.comp', '.com');
    }
    if (decodedUri.includes('mixdrop')) {
        const mixdrop = {
            "mixdrop.com": 'mdy48tn97.com',
            "mixdrop.co": 'mdy48tn97.com',
            "mixdrop.to": 'mdy48tn97.com'
        };
        const finded = Object.keys(mixdrop).find(key => decodedUri.includes(key));
        if (!finded)
            return decodedUri;
        return decodedUri.replace(finded, mixdrop[finded]);
    }
    return decodedUri;
};
exports.performMixdropAnalyzer = performMixdropAnalyzer;
const filemoonAnalizer = (decodedUri) => {
    if (decodedUri.includes('bysewihe.com'))
        return decodedUri;
    const filemoon = {
        "filemoon.nl": 'bysewihe.com',
        "filemoon.sx": 'bysewihe.com',
        "byse.sx": 'bysewihe.com',
        "byse": 'bysewihe.com'
    };
    // Priorizar claves más largas (p. ej. "byse.sx" antes que "byse")
    const keys = Object.keys(filemoon).sort((a, b) => b.length - a.length);
    const matched = keys.find(k => decodedUri.includes(k));
    if (!matched)
        return decodedUri;
    return decodedUri.replace(matched, filemoon[matched]);
};
exports.filemoonAnalizer = filemoonAnalizer;
const doubleB64Controller = (decodedUri) => {
    if (!decodedUri)
        return decodedUri;
    // Si ya es una URL con protocolo (http/https/protocol-relative), no requiere decodificación adicional
    if (decodedUri.startsWith('http://') || decodedUri.startsWith('https://') || decodedUri.startsWith('//')) {
        return decodedUri;
    }
    try {
        const cleanUri = decodedUri.trim();
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (base64Regex.test(cleanUri) || /^[A-Za-z0-9+/=]+$/.test(cleanUri)) {
            const secondDecode = Buffer.from(cleanUri, 'base64').toString('utf-8');
            if (secondDecode.startsWith('http://') ||
                secondDecode.startsWith('https://') ||
                secondDecode.startsWith('//') ||
                /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(secondDecode)) {
                return secondDecode;
            }
        }
    }
    catch (_a) {
        // Si no es un base64 válido o falla la decodificación, mantenemos el valor actual
    }
    return decodedUri;
};
exports.doubleB64Controller = doubleB64Controller;
