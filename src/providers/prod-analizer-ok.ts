type okru = {
    [key: string]: string;
    "http://ok.ru": string;
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