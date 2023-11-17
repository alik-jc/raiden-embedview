type okru = {
    [key: string]: string;
    "http://ok.ru": string;
}
type wish = {
    [key: string]: string;
    "https://wishfast.top/": string;
    "https://flaswish.com/": string;
}

type filelion = {
    [key: string]: string;
    "https://filelions.com": string;
    "https://fviplions.com": string;
}

type mixdrop = {
    [key: string]: string;
    "mixdrop.com": string;
    "mixdrop.to": string;
    "mixdrop.co": string;
}

export const performOkruAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("http://ok.ru")) {
        const okru: okru = {
            "http://ok.ru": "https://ok.ru",
            
        }
        const finded = Object.keys(okru).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, okru[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const performWishAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("https://wishfast.top/e/") || decodedUri.includes("https://flaswish.com/e/")) {
        return decodedUri
    } else {
        const wish: wish = {
            "https://wishfast.top/": "https://wishfast.top/e/",
            "https://flaswish.com/": "https://flaswish.com/e/"
        }
        const finded = Object.keys(wish).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, wish[finded!]);
        return newUri;
    }
}

export const performFilelionAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes('https://filelions.com') || decodedUri.includes('https://fviplions.com')) {
        const filelion: filelion = {
            "https://filelions.com": "https://filelions.co",
            "https://fviplions.com": "https://filelions.co"
        }
        const finded = Object.keys(filelion).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, filelion[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}

export const performMixdropAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes('mixdrop')) {
        const mixdrop: mixdrop = {
            "mixdrop.com": 'mdy48tn97.com',
            "mixdrop.co": 'mdy48tn97.com',
            "mixdrop.to": 'mdy48tn97.com'
        }
        const finded = Object.keys(mixdrop).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, mixdrop[finded!]);
        return newUri;
    } else {
        return decodedUri;
    }
}