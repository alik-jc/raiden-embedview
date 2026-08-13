"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxedXn = exports.yandexProd = exports.wishHgProd = exports.fmoonProd = exports.uqloProd = exports.luluProd = void 0;
const index_1 = require("../index");
const prod_uri_analizer_1 = require("./prod-uri-analizer");
const luluProd = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.lulu;
    const hashMatch = uriParameter.match(/e\/([^/]+)/);
    const hash = hashMatch ? hashMatch[1] : '';
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;
    return urlResponse;
});
exports.luluProd = luluProd;
const uqloProd = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.uqload;
    // Limpiar el parámetro: remover markdown links y espacios
    const cleanUri = uriParameter
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2') // Extrae URL de markdown [text](url)
        .trim();
    // Patrones de extracción mejorados
    const patterns = [
        /\/embed-([a-z0-9]+)\.html/i, // /embed-HASH.html
        /\/([a-z0-9]+)\.html/i, // /HASH.html
        /uqload\.com\/([a-z0-9]+)/i, // uqload.com/HASH
        /^([a-z0-9]{12,})$/i // Solo el hash
    ];
    // Intentar extraer el hash con cada patrón
    let hash = '';
    for (const pattern of patterns) {
        const match = cleanUri.match(pattern);
        if (match && match[1]) {
            hash = match[1];
            break;
        }
    }
    // Validar que el hash sea válido (típicamente 12+ caracteres alfanuméricos)
    if (!hash || hash.length < 10) {
        throw new Error(`Invalid uqload parameter: ${uriParameter}`);
    }
    return `${urlSet}${hash}`;
});
exports.uqloProd = uqloProd;
const fmoonProd = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.fmoon;
    const hash = (0, prod_uri_analizer_1.extractMoonHash)(uriParameter);
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;
    return urlResponse;
});
exports.fmoonProd = fmoonProd;
const wishHgProd = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.wishg;
    const hashMatch = uriParameter.match(/\/e\/([^/]+)/); // Modified regex to match /e/
    const hash = hashMatch ? hashMatch[1] : '';
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + '/' + uriParameter;
    return urlResponse;
});
exports.wishHgProd = wishHgProd;
const yandexProd = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.yandex;
    const hashMatch = uriParameter.match(/\/i\/([^/]+)/);
    const hash = hashMatch ? hashMatch[1] : '';
    const urlResponse = hash
        ? urlSet + hash
        : urlSet + uriParameter;
    return urlResponse;
});
exports.yandexProd = yandexProd;
const proxedXn = (uriParameter) => __awaiter(void 0, void 0, void 0, function* () {
    const json = index_1.SET_CORE_URI;
    const urlSet = json.xn;
    const responseUrl = urlSet + uriParameter;
    return responseUrl;
});
exports.proxedXn = proxedXn;
