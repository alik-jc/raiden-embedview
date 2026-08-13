"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUriParameter = exports.doubleB64Controller = exports.filemoonAnalizer = exports.extractMoonHash = exports.performMixdropAnalyzer = exports.wistTransform = exports.performLulustAnalyzer = exports.performLuluAnalyzer = exports.performWishAnalyzer = exports.abyssTransform = exports.performOkruAnalyzer = exports.performDoodAnalyzer = void 0;
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
const set_core_json_1 = __importDefault(require("../assets/set-core.json"));
/**
 * Extrae el hash limpio de una URL de Moon (Filemoon / Byse)
 * Soporta URLs fragmentadas/concatenadas (ej: bysewihe.comkoze.com/e/bfbzqnq4sewp),
 * rutas /e/, /d/, /embed/, /download/, URLs en markdown o hashes directos.
 */
const extractMoonHash = (uri) => {
    if (!uri)
        return null;
    // Limpiar markdown links y espacios
    const cleanUri = uri
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2')
        .trim();
    // Patrones de extracción
    const patterns = [
        /(?:\/|^)(?:e|d|embed|download)\/([a-zA-Z0-9]+)/i, // /e/HASH, /d/HASH, /embed/HASH, etc.
        /[?&]id=([a-zA-Z0-9]+)/i, // ?id=HASH o &id=HASH
        /\/([a-zA-Z0-9]{10,})$/i, // /HASH al final
        /^([a-zA-Z0-9]{10,})$/i // Solo el hash
    ];
    for (const pattern of patterns) {
        const match = cleanUri.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};
exports.extractMoonHash = extractMoonHash;
const filemoonAnalizer = (decodedUri) => {
    if (!decodedUri)
        return decodedUri;
    const hash = (0, exports.extractMoonHash)(decodedUri);
    if (!hash) {
        return decodedUri;
    }
    const baseCore = (set_core_json_1.default === null || set_core_json_1.default === void 0 ? void 0 : set_core_json_1.default.moon) || 'https://bysewihe.com/e/';
    if (baseCore.endsWith('/e/') || baseCore.endsWith('=')) {
        return `${baseCore}${hash}`;
    }
    else if (baseCore.endsWith('/')) {
        return `${baseCore}e/${hash}`;
    }
    else {
        return `${baseCore}/e/${hash}`;
    }
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
const decodeUriParameter = (uriParameter) => {
    if (!uriParameter)
        return '';
    try {
        const firstDecode = Buffer.from(uriParameter, 'base64').toString('utf-8');
        return (0, exports.doubleB64Controller)(firstDecode);
    }
    catch (_a) {
        return uriParameter;
    }
};
exports.decodeUriParameter = decodeUriParameter;
