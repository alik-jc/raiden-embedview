interface FindObject {
    key: string;
    value: string;
}

export function performConmutation(base: string, findArray: FindObject[]): string | null {
    if (!base) return null;
    const lowerBase = base.toLowerCase();
    const finded = findArray.find((item) => lowerBase.includes(item.key.toLowerCase()));
    if (finded) {
        return finded.value;
    }
    return null;
}