"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performLbryAnalyzer = void 0;
const performLbryAnalyzer = (decodedUri) => {
    if (decodedUri.includes("https://player.odycdn.com/api/")) {
        const nUri = decodedUri.slice(0, -7);
        const LbryApiUri = {
            "https://player.odycdn.com/api/v4/streams/free/": "https://lbry.tv/$/download/",
            "https://player.odycdn.com/api/v3/streams/free/": "https://player.odycdn.com/api/v3/streams/free/",
        };
        const finded = Object.keys(LbryApiUri).find(key => nUri.includes(key));
        const newUri = nUri.replace(finded, LbryApiUri[finded]);
        return newUri;
    }
    else {
        const lbryUri = {
            "https://odysee.com/$/stream/": "https://lbry.tv/$/download/",
            "https://lbry.tv/$/stream/": "https://lbry.tv/$/download/",
            "https://lbry.tv/$/embed/": "https://lbry.tv/$/download/",
            "https://odysee.com/$/embed/": "https://lbry.tv/$/download/",
            "https://odysee.com/$/download/": "https://lbry.tv/$/download/",
            "https://lbry.tv/$/download/": "https://lbry.tv/$/download/",
            "https://lbry.lat/$/download/": "https://lbry.tv/$/download/",
            "https://lbry.lat/$/stream/": "https://lbry.tv/$/download/",
            "https://lbry.lat/$/embed/": "https://lbry.tv/$/download/",
        };
        const finded = Object.keys(lbryUri).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded, lbryUri[finded]);
        return newUri;
    }
};
exports.performLbryAnalyzer = performLbryAnalyzer;
