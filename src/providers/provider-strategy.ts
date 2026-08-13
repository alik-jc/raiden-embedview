import {
    raidenGeneral,
    raidenSanbox,
    raidenPlayer,
    performOkruAnalyzer,
    performWishAnalyzer,
    luluProd,
    performMixdropAnalyzer,
    wistTransform,
    performLuluAnalyzer,
    performLulustAnalyzer,
    performDoodAnalyzer,
    filemoonAnalizer,
    abyssTransform,
    raidenZillaProxy
} from '../index';

// Types
export interface ProviderContext {
    decodedUri: string;
    image?: string;
    version?: string;
}

export type ProviderHandler = (context: ProviderContext) => Promise<string> | string;

// Provider Handlers
const providerHandlers: Record<string, ProviderHandler> = {
    // Doodstream
    'dood': async (context: ProviderContext) => {
        const doodContent = performDoodAnalyzer(context.decodedUri);
        return raidenGeneral(doodContent || '', context.version);
    },

    // Okru
    'ok': async (context: ProviderContext) => {
        const okContent = performOkruAnalyzer(context.decodedUri);
        return raidenSanbox(okContent || '', context.version);
    },

    // Wishembed
    'wish': async (context: ProviderContext) => {
        const wishContent = performWishAnalyzer(context.decodedUri);
        const transformWish = wistTransform(wishContent);
        return raidenGeneral(transformWish || '', context.version);
    },

    // Lulu
    'lulu': async (context: ProviderContext) => {
        const luluContent = performLuluAnalyzer(context.decodedUri);
        const qlsContent = await luluProd(luluContent);
        return raidenGeneral(qlsContent, context.version);
    },

    // Lulust
    'lulust': async (context: ProviderContext) => {
        const luluContent = performLulustAnalyzer(context.decodedUri);
        const qlsContent = await luluProd(luluContent);
        return raidenGeneral(qlsContent, context.version);
    },

    // Mixdrop
    'mixdrop': async (context: ProviderContext) => {
        const mixdropContent = performMixdropAnalyzer(context.decodedUri);
        return raidenGeneral(mixdropContent || '', context.version);
    },

    // Raiden Player
    'raidenplayer': async (context: ProviderContext) => {
        return raidenPlayer(context.decodedUri, context.image || 'err');
    },

    // Filemoon (moon)
    'moon': async (context: ProviderContext) => {
        const filemoonContent = filemoonAnalizer(context.decodedUri);
        return raidenGeneral(filemoonContent || '', context.version);
    },

    // Abyss
    'abyss': async (context: ProviderContext) => {
        const abyssContent = abyssTransform(context.decodedUri);
        return raidenGeneral(abyssContent || '', context.version);
    },

    // General
    'general': async (context: ProviderContext) => {
        return raidenGeneral(context.decodedUri, context.version);
    },

    // Sandbox
    'snbox': async (context: ProviderContext) => {
        return raidenSanbox(context.decodedUri, context.version);
    },

    // Zilla Proxy - injects Referer for WAF-protected sites
    'zilla-proxy': async (context: ProviderContext) => {
        const proxyUrl = '/zilla-proxy?url=' + encodeURIComponent(context.decodedUri);
        return raidenZillaProxy(proxyUrl);
    }
};

// Provider aliases - para mantener retrocompatibilidad
const providerAliases: Record<string, string> = {
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
export function getProviderHandler(providerName: string): ProviderHandler | null {
    // Check if it's an alias first
    const resolvedName = providerAliases[providerName] || providerName;
    return providerHandlers[resolvedName] || null;
}

/**
 * Get all available provider names
 */
export function getAvailableProviders(): string[] {
    return Object.keys(providerHandlers);
}

/**
 * Check if provider exists
 */
export function isValidProvider(providerName: string): boolean {
    const resolvedName = providerAliases[providerName] || providerName;
    return resolvedName in providerHandlers;
}