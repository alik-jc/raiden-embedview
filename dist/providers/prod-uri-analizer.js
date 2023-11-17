"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performMixdropAnalyzer = exports.performFilelionAnalyzer = exports.performWishAnalyzer = exports.performOkruAnalyzer = void 0;
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
    if (decodedUri.includes("https://wishfast.top/e/")) {
        return decodedUri;
    }
    else {
        const wish = {
            "https://wishfast.top/": "https://wishfast.top/e/",
        };
        const finded = Object.keys(wish).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, wish[finded]);
        return newUri;
    }
};
exports.performWishAnalyzer = performWishAnalyzer;
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
