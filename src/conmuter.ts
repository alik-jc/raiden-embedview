interface FindObject {
    key: string;
    value: string;
}

export function performConmutation(base: string, findArray: FindObject[]): string | null {
    const finded = findArray.find((item) => base.includes(item.key));
    if (finded) {
        return finded.value;
    }
    return null;
}