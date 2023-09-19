"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performOkruAnalyzer = void 0;
const performOkruAnalyzer = (decodedUri) => {
    if (decodedUri.includes("http://ok.ru")) {
        const okru = {
            "http://ok.ru": "https://ok.ru",
        };
        const finded = Object.keys(okru).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, okru[finded]);
        return newUri;
    }
};
exports.performOkruAnalyzer = performOkruAnalyzer;
