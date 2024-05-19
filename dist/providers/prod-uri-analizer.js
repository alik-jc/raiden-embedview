"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performMixdropAnalyzer = exports.performFilelionAnalyzer = exports.wistTransform = exports.performWishAnalyzer = exports.performOkruAnalyzer = void 0;
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
const performWishAnalyzer = (decodedUri) => {
    if (decodedUri.includes("/e/")) {
        return decodedUri;
    }
    else {
        const wish = {
            "https://wishfast.top/": "https://wishfast.top/e/",
            "https://streamwish.top/": "https://streamwish.to/e/",
            "https://flaswish.com/": "https://flaswish.com/e/",
            "https://sfastwish.com/": "https://sfastwish.com/e/",
            "https://obeywish.com/": "https://sfastwish.com/e/",
            "https://streamwish.com/e/": "https://streamwish.to/e/",
            "https://streamwish.to/": "https://streamwish.to/e/",
            "https://embedwish.com/e/": "https://streamwish.to/e/"
        };
        const finded = Object.keys(wish).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, wish[finded]);
        return newUri;
    }
};
exports.performWishAnalyzer = performWishAnalyzer;
const wistTransform = (decodedUri) => {
    const wishdomain = {
        "embedwish.com": "streamwish.to",
        "streamwish.com": "streamwish.to",
        "streamwish.top": "streamwish.to",
        "flaswish.com": "streamwish.to",
        "sfastwish.com": "streamwish.to",
        "obeywish.com": "streamwish.to",
        "jodwish.com": "streamwish.to",
        "wishfast.top": "streamwish.to",
        "swhoi.com": "streamwish.to",
        ".com": ".to",
        ".top": ".to",
        ".net": ".to"
    };
    const finded = Object.keys(wishdomain).find(key => decodedUri.includes(key));
    const newUri = decodedUri.replace(finded, wishdomain[finded]);
    return newUri;
};
exports.wistTransform = wistTransform;
const performFilelionAnalyzer = (decodedUri) => {
    if (decodedUri.includes('https://filelions.com') || decodedUri.includes('https://fviplions.com')) {
        const filelion = {
            "https://filelions.com": "https://filelions.co",
            "https://fviplions.com": "https://filelions.co"
        };
        const finded = Object.keys(filelion).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, filelion[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.performFilelionAnalyzer = performFilelionAnalyzer;
const performMixdropAnalyzer = (decodedUri) => {
    if (decodedUri.includes('mixdrop')) {
        const mixdrop = {
            "mixdrop.com": 'mdy48tn97.com',
            "mixdrop.co": 'mdy48tn97.com',
            "mixdrop.to": 'mdy48tn97.com'
        };
        const finded = Object.keys(mixdrop).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, mixdrop[finded]);
        return newUri;
    }
    else {
        return decodedUri;
    }
};
exports.performMixdropAnalyzer = performMixdropAnalyzer;
