
type LbryUri = {
    [key: string]: string;
    "https://odysee.com/$/stream/": string;
    "https://lbry.tv/$/stream/": string;
    "https://lbry.tv/$/embed/": string;
    "https://odysee.com/$/embed/": string;
    "https://odysee.com/$/download/": string;
    "https://lbry.tv/$/download/": string;
    "https://lbry.lat/$/download/": string;
    "https://lbry.lat/$/stream/": string;
    "https://lbry.lat/$/embed/": string;
}

type LbryApiUri = {
    [key: string]: string;
    "https://player.odycdn.com/api/v4/streams/free/": string;
    "https://player.odycdn.com/api/v3/streams/free/": string;
}

export const performLbryAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("https://player.odycdn.com/api/")) {
        const nUri = decodedUri.slice(0, -7);
        const LbryApiUri: LbryApiUri = {
                "https://player.odycdn.com/api/v4/streams/free/": "https://lbry.tv/$/download/",
                "https://player.odycdn.com/api/v3/streams/free/": "https://player.odycdn.com/api/v3/streams/free/",
            }
        const finded = Object.keys(LbryApiUri).find(key => nUri.includes(key));
        const newUri = nUri.replace(finded!, LbryApiUri[finded!]);
        return newUri;
        
        } else {
            const lbryUri: LbryUri = {
                "https://odysee.com/$/stream/": "https://lbry.tv/$/download/",
                "https://lbry.tv/$/stream/": "https://lbry.tv/$/download/",
                "https://lbry.tv/$/embed/": "https://lbry.tv/$/download/",
                "https://odysee.com/$/embed/": "https://lbry.tv/$/download/",
                "https://odysee.com/$/download/": "https://lbry.tv/$/download/",
                "https://lbry.tv/$/download/": "https://lbry.tv/$/download/",
                "https://lbry.lat/$/download/": "https://lbry.tv/$/download/",
                "https://lbry.lat/$/stream/": "https://lbry.tv/$/download/",
                "https://lbry.lat/$/embed/": "https://lbry.tv/$/download/",
        }
        const finded = Object.keys(lbryUri).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, lbryUri[finded!]);
        return newUri;
    }
}
