type okru = {
    [key: string]: string;
    "http://ok.ru": string;
}
type wish = {
    [key: string]: string;
    "https://wishfast.top/": string;
    "https://flaswish.com/": string;
    "https://sfastwish.com/": string;
    "https://obeywish.com/": string;
    "https://streamwish.com/e/": string;
    "https://embedwish.com/e/": string;
}

type abyss = {
    [key: string]: string;
    "https://short.ink/": string;
}

type lulu = {
    [key: string]: string;
    "https://luluvdo.com/": string;
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

export const abyssTransform = (decodedUri: string) => {
    if (decodedUri.includes("https://short.ink/")) {
        const abyss: abyss = {
            "https://short.ink/": "https://short.icu/"
        }
        const finded = Object.keys(abyss).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, abyss[finded!]);
        return newUri;
    } else {
        return decodedUri;
// Generic URL transformation helper
function transformUriWithMapping(decodedUri: string, mapping: { [key: string]: string }): string {
    const finded = Object.keys(mapping).find(key => decodedUri.includes(key));
    if (finded) {
        return decodedUri.replace(finded, mapping[finded]);
    }
    return decodedUri;
}

export const abyssTransform = (decodedUri: string) => {
    const abyss: abyss = {
        "https://short.ink/": "https://short.icu/"
    }
    return transformUriWithMapping(decodedUri, abyss);
}

export const performWishAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("/e/") 
    ) {
        return decodedUri
    } else {
        const wish: wish = {
            "https://wishfast.top/": "https://wishfast.top/e/",
            "https://streamwish.top/": "https://streamwish.to/e/",
            "https://flaswish.com/": "https://flaswish.com/e/",
            "https://sfastwish.com/": "https://sfastwish.com/e/",
            "https://obeywish.com/": "https://sfastwish.com/e/",
            "https://streamwish.com/e/": "https://streamwish.to/e/",
            "https://streamwish.to/": "https://streamwish.to/e/",
            "https://embedwish.com/e/": "https://streamwish.to/e/"
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
        const lulu: lulu = {
            "https://luluvdo.com/": "https://luluvdo.com/e/"
        };
        const finded = Object.keys(lulu).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, lulu[finded!]);
        return newUri;
    }
};

export const wistTransform = (decodedUri: string) => {
        const wishdomain: { [key: string]: string } = {
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
        }
        const finded = Object.keys(wishdomain).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, wishdomain[finded!]);
        return newUri;
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