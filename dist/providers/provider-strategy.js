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
exports.getProviderHandler = getProviderHandler;
exports.getAvailableProviders = getAvailableProviders;
exports.isValidProvider = isValidProvider;
const index_1 = require("../index");
// Provider Handlers
const providerHandlers = {
    // Doodstream
    'dood': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const doodContent = (0, index_1.performDoodAnalyzer)(context.decodedUri);
        return (0, index_1.raidenGeneral)(doodContent || '');
    }),
    // Okru
    'ok': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const okContent = (0, index_1.performOkruAnalyzer)(context.decodedUri);
        return (0, index_1.raidenSanbox)(okContent || '');
    }),
    // Wishembed
    'wish': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const wishContent = (0, index_1.performWishAnalyzer)(context.decodedUri);
        const transformWish = (0, index_1.wistTransform)(wishContent);
        return (0, index_1.raidenGeneral)(transformWish || '');
    }),
    // Lulu
    'lulu': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const luluContent = (0, index_1.performLuluAnalyzer)(context.decodedUri);
        const qlsContent = yield (0, index_1.luluProd)(luluContent);
        return (0, index_1.raidenGeneral)(qlsContent);
    }),
    // Lulust
    'lulust': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const luluContent = (0, index_1.performLulustAnalyzer)(context.decodedUri);
        const qlsContent = yield (0, index_1.luluProd)(luluContent);
        return (0, index_1.raidenGeneral)(qlsContent);
    }),
    // Mixdrop
    'mixdrop': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const mixdropContent = (0, index_1.performMixdropAnalyzer)(context.decodedUri);
        return (0, index_1.raidenGeneral)(mixdropContent || '');
    }),
    // Raiden Player
    'raidenplayer': (context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, index_1.raidenPlayer)(context.decodedUri, context.image || 'err');
    }),
    // Filemoon (moon)
    'moon': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const filemoonContent = (0, index_1.filemoonAnalizer)(context.decodedUri);
        return (0, index_1.raidenGeneral)(filemoonContent || '');
    }),
    // Abyss
    'abyss': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const abyssContent = (0, index_1.abyssTransform)(context.decodedUri);
        return (0, index_1.raidenGeneral)(abyssContent || '');
    }),
    // General
    'general': (context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, index_1.raidenGeneral)(context.decodedUri);
    }),
    // Sandbox
    'snbox': (context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, index_1.raidenSanbox)(context.decodedUri);
    }),
    // Zilla Proxy - injects Referer for WAF-protected sites
    'zilla-proxy': (context) => __awaiter(void 0, void 0, void 0, function* () {
        const proxyUrl = '/zilla-proxy?url=' + encodeURIComponent(context.decodedUri);
        return (0, index_1.raidenZillaProxy)(proxyUrl);
    })
};
// Provider aliases - para mantener retrocompatibilidad
const providerAliases = {
    'prod-dood-analyzer': 'dood',
    'prod-analizer-ok': 'ok',
    'prod-analizer-wish': 'wish',
    'prod-analizer-lulu': 'lulu',
    'prod-analizer-lulust': 'lulust',
    'prod-analizer-mixdrop': 'mixdrop',
    'prod-raidenplayer': 'raidenplayer',
    'moon-analizer': 'moon',
    'prod-abyss': 'abyss',
    'prod-general': 'general',
    'prod-snbox': 'snbox',
    'prod-zilla-proxy': 'zilla-proxy'
};
/**
 * Get provider handler by name or alias
 */
function getProviderHandler(providerName) {
    // Check if it's an alias first
    const resolvedName = providerAliases[providerName] || providerName;
    return providerHandlers[resolvedName] || null;
}
/**
 * Get all available provider names
 */
function getAvailableProviders() {
    return Object.keys(providerHandlers);
}
/**
 * Check if provider exists
 */
function isValidProvider(providerName) {
    const resolvedName = providerAliases[providerName] || providerName;
    return resolvedName in providerHandlers;
}
