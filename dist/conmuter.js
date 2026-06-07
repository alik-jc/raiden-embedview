"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performConmutation = performConmutation;
function performConmutation(base, findArray) {
    const finded = findArray.find((item) => base.includes(item.key));
    if (finded) {
        return finded.value;
    }
    return null;
}
