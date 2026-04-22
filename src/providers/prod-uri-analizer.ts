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

type lulust = {
    [key: string]: string;
    "lulu.st": string;
}

type dood = {
    [key: string]: string;
    "d-s.io": string;
}

type mixdrop = {
    [key: string]: string;
    "mixdrop.com": string;
    "mixdrop.to": string;
    "mixdrop.co": string;
}

type filemoon = {
    [key: string]: string;
    "filemoon.nl": string;
    "byse.sx": string;
}

export const performDoodAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("d-s.")) {
        const dood: dood = {
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
    }
}

export const performWishAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes("/e/") 
    ) {
        return decodedUri
    } else {
        const wish: wish = {
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
        const lulu: lulu = {
            "https://luluvdo.com/": "https://luluvdo.com/e/"
        };
        const finded = Object.keys(lulu).find(key => decodedUri.includes(key));
        const newUri = decodedUri.replace(finded!, lulu[finded!]);
        return newUri;
    }
};

export const performLulustAnalyzer = (decodedUri: string) => {
    if (decodedUri.includes(".st") || decodedUri.includes(".com") || decodedUri.includes("luluvdoo.com")) {
        const lulust: lulust = {
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

export const filemoonAnalizer = (decodedUri: string) => {
    const filemoon: filemoon = {
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