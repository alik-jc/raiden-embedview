"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performConmutation = performConmutation;
function performConmutation(base, findArray) {
    if (!base)
        return null;
    const lowerBase = base.toLowerCase();
    const finded = findArray.find((item) => lowerBase.includes(item.key.toLowerCase()));
    if (finded) {
        return finded.value;
    }
    return null;
}
