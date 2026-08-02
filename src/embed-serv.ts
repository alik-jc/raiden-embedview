import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import {
    raidenGeneral,
    basePlayerPage,
    raidenSanbox,
    pilarDown,
    raidenPlayer,
    errorWebsite,
    performOkruAnalyzer,
    performWishAnalyzer,
    luluProd,
    uqloProd,
    fmoonProd,
    //wishHgProd,
    yandexProd,
    proxedXn,
    performMixdropAnalyzer,
    wistTransform,
    performLuluAnalyzer,
    abyssTransform,
    performLulustAnalyzer,
    PROVIDERS_JSON,
    performDoodAnalyzer,
    filemoonAnalizer,
    raidenZillaProxy,
} from './index';

import { performConmutation } from './conmuter';

dotenv.config();

const app = express();

// Environment Configuration with robust validation
const rawNodeEnv = (process.env.NODE_ENV || 'development').trim().toLowerCase();
const validEnvironments = ['development', 'production', 'test'];

// Normalize and validate NODE_ENV
const NODE_ENV = validEnvironments.includes(rawNodeEnv) ? rawNodeEnv : 'development';

// Set normalized value back to process.env for consistency
process.env.NODE_ENV = NODE_ENV;

const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// Warn if environment was invalid or defaulted
if (rawNodeEnv && !validEnvironments.includes(rawNodeEnv)) {
    console.warn(`⚠️  Invalid NODE_ENV value "${process.env.NODE_ENV}" detected. Defaulting to "${NODE_ENV}".`);
}

// Constants
const PORT = process.env.SRV_URI || 3000;
const ANIYAE_HASH = process.env.HASH || '';
const ANIYAE_REDIRECT_URL = 'https://aniyae.net';
const HTTP_STATUS = {
    OK: 200,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
} as const;

// Types
interface ErrorResponse {
    error: string;
    uri?: string;
    stack?: string;
    details?: string;
    timestamp?: string;
    path?: string;
}

// Utility: Debug Logger
export class Logger {
    private static formatTimestamp(): string {
        return new Date().toISOString().replace('T', ' ').slice(0, 19);
    }

    static debug(message: string, data?: unknown): void {
        if (IS_DEVELOPMENT) {
            console.log(`\n🔍 [DEBUG ${this.formatTimestamp()}] ${message}`);
            if (data) {
                console.log('📦 Data:', JSON.stringify(data, null, 2));
            }
        }
    }

    static info(message: string, data?: unknown): void {
        console.log(`\n✅ [INFO ${this.formatTimestamp()}] ${message}`);
        if (data && IS_DEVELOPMENT) {
            console.log('📦 Data:', data);
        }
    }

    static warn(message: string, data?: unknown): void {
        console.warn(`\n⚠️  [WARN ${this.formatTimestamp()}] ${message}`);
        if (data && IS_DEVELOPMENT) {
            console.warn('📦 Data:', data);
        }
    }

    static error(message: string, error?: unknown): void {
        console.error(`\n❌ [ERROR ${this.formatTimestamp()}] ${message}`);
        if (error instanceof Error) {
            console.error('💥 Error Message:', error.message);
            if (IS_DEVELOPMENT) {
                console.error('📜 Stack Trace:', error.stack);
            }
        } else if (error) {
            console.error('📦 Error Data:', error);
        }
    }
}

// Middleware: Request Logger (solo en desarrollo)
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (IS_DEVELOPMENT) {
        Logger.debug(`Incoming ${req.method} request`, {
            path: req.path,
            query: req.query
        });
    }
    next();
};

// Utility function: Send HTML response
const sendHtmlResponse = (res: Response, content: string) => {
    Logger.debug('Sending HTML response', { contentLength: content.length });
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
};

// Utility function: Send error response (con soporte de entorno)
const sendErrorResponse = (
    res: Response,
    message: string,
    error?: unknown,
    statusCode = HTTP_STATUS.INTERNAL_ERROR
) => {
    Logger.error(message, error);

    if (IS_DEVELOPMENT) {
        // Modo desarrollo: respuesta detallada en JSON
        const errorResponse: ErrorResponse = {
            error: message,
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(errorResponse);
    } else {
        // Modo producción: respuesta simple
        const errorResponse: ErrorResponse = { error: message };
        res.status(statusCode).json(errorResponse);
    }
};

// Apply request logger middleware
app.use(requestLogger);

/**
 * Main route - Handles dynamic provider routing
 */
app.get('/', async (req: Request, res: Response) => {
    try {
        Logger.debug('Processing main route', { query: req.query });

        const json = PROVIDERS_JSON;
        const image = req.query.image as string;
        const animeTitle = req.query.animeTitle as string;
        const uriParameter = req.query[ANIYAE_HASH] as string;

        if (!uriParameter) {
            Logger.warn('Missing URI parameter in main route');

            if (IS_DEVELOPMENT) {
                return sendErrorResponse(
                    res,
                    'Missing hash parameter',
                    new Error(`Expected query parameter: ${ANIYAE_HASH}`),
                    HTTP_STATUS.INTERNAL_ERROR
                );
            }
            return res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
        }

        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Decoded base URI', { base });

        const conmutatedValue = performConmutation(base, json);
        Logger.debug('Conmutation result', { conmutatedValue });

        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + ANIYAE_HASH + '=' + uriParameter;
            const playerPage = basePlayerPage(response, image, animeTitle);
            Logger.info('Successfully generated player page');
            return sendHtmlResponse(res, playerPage);
        } else {
            const uriParser = new URL(base);
            Logger.warn('Unsupported URI provider', { hostname: uriParser.hostname });

            return sendErrorResponse(
                res,
                'The provided URI is not supported',
                { uri: uriParser.hostname },
                HTTP_STATUS.INTERNAL_ERROR
            );
        }
    } catch (error) {
        Logger.error('Error in main route', error);

        if (IS_DEVELOPMENT) {
            return sendErrorResponse(res, 'Error processing main route', error, HTTP_STATUS.INTERNAL_ERROR);
        }
        res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
    }
});

/**
 * Sandbox provider route
 */
app.get('/prod-snbox', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-snbox', { uriParameter });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('URI decoded', { decodedUri });

        const renderContent = raidenSanbox(decodedUri);
        Logger.info('prod-snbox rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-snbox content', error);
    }
});

/**
 * General provider route
 */
app.get('/prod-general', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-general', { uriParameter });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = raidenGeneral(decodedUri);
        Logger.info('prod-general rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-general content', error);
    }
});

/**
 * Abyss provider route
 */
app.get('/prod-abyss', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-abyss', { uriParameter });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const abyssContent = abyssTransform(decodedUri);
        Logger.debug('Abyss content transformed', { abyssContent });

        const renderContent = raidenGeneral(abyssContent || '');
        Logger.info('prod-abyss rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-abyss content', error);
    }
});

/**
 * Filemoon analyzer route
 */
app.get('/moon-analizer', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing moon-analizer', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const filemoonContent = filemoonAnalizer(decodedUri);
        Logger.debug('Filemoon content analyzed', { filemoonContent });

        //const proxedContent = await fmoonProd(filemoonContent || '');
        //Logger.debug('Filemoon proxied content generated', { proxedContent });

        const renderContent = raidenGeneral(filemoonContent || '');
        Logger.info('moon-analizer rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating moon-analizer content', error);
    }
});

/**
 * Doodstream analyzer route
 */
app.get('/prod-dood-analyzer', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-dood-analyzer', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const doodContent = performDoodAnalyzer(decodedUri);
        Logger.debug('Dood content analyzed', { doodContent });

        const renderContent = raidenGeneral(doodContent || '');
        Logger.info('prod-dood-analyzer rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-dood-analyzer content', error);
    }
});

/**
 * Okru analyzer route
 */
app.get('/prod-analizer-ok', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-analizer-ok', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const OkContent = performOkruAnalyzer(decodedUri);
        Logger.debug('Okru content analyzed', { OkContent });

        const renderContent = raidenSanbox(OkContent || '');
        Logger.info('prod-analizer-ok rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-ok content', error);
    }
});

/**
 * Wishembed analyzer route
 */
app.get('/prod-analizer-wish', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-analizer-wish', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const wishContent = performWishAnalyzer(decodedUri);
        Logger.debug('Wish content analyzed', { wishContent });

        const transformWish = wistTransform(wishContent);
        Logger.debug('Wish content transformed', { transformWish });

        //const proxedWish = await wishHgProd(transformWish);
        //Logger.debug('Wish QLS content generated', { proxedWish });

        const renderContent = raidenGeneral(transformWish || '');
        Logger.info('prod-analizer-wish rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-wish content', error);
    }
});

/**
 * Lulu analyzer route
 */
app.get('/prod-analizer-lulu', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-analizer-lulu', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const luluContent = performLuluAnalyzer(decodedUri);
        Logger.debug('Lulu content analyzed', { luluContent });

        //const proxedLulu = await luluProd(luluContent);
        //Logger.debug('Lulu QLS content generated', { proxedLulu });

        const renderContent = raidenGeneral(luluContent || '');
        Logger.info('prod-analizer-lulu rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-lulu content', error);
    }
});

/**
 * Lulust analyzer route
 */
app.get('/prod-analizer-lulust', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-analizer-lulust', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const luluContent = performLulustAnalyzer(decodedUri);
        Logger.debug('Lulust content analyzed', { luluContent });

        //const proxedLulu = await luluProd(luluContent);
        //Logger.debug('Lulust QLS content generated', { proxedLulu });

        const renderContent = raidenGeneral(luluContent || '');
        Logger.info('prod-analizer-lulust rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-lulust content', error);
    }
});

/**
 * Mixdrop analyzer route
 */
app.get('/prod-analizer-mixdrop', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-analizer-mixdrop', { uriParameter });

        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const mixdropContent = performMixdropAnalyzer(decodedUri);
        Logger.debug('Mixdrop content analyzed', { mixdropContent });

        const renderContent = raidenGeneral(mixdropContent || '');
        Logger.info('prod-analizer-mixdrop rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-mixdrop content', error);
    }
});

/**
 * Raiden player route
 */
app.get('/prod-raidenplayer', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        const image = req.query.image as string;
        Logger.debug('Processing prod-raidenplayer', { uriParameter, image });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = raidenPlayer(decodedUri, image);
        Logger.info('prod-raidenplayer rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-raidenplayer content', error);
    }
});

/** 
 * Default proxed
*/
app.get('/proxed-xn', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Processing proxed-xn route', { decodedUri });

        const setAnalyzer = await proxedXn(decodedUri);
        Logger.debug('Proxed-XN content generated', { setAnalyzer });

        const renderContent = raidenGeneral(setAnalyzer);
        Logger.info('Proxed-XN route rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating proxed-xn content', error);
    }
});

const ZILLA_HEADERS = {
    'Accept': '*/*',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Referer': 'https://animeav1.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-GPC': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not=A?Brand";v="99", "Brave";v="151", "Chromium";v="151"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
};

/**
 * Zilla m3u8 proxy - Rewrites segment URLs to use local proxy
 */
app.get('/zilla-m3u8/:hash', async (req: Request, res: Response) => {
    try {
        const { hash } = req.params;
        const targetUrl = `https://player.zilla-networks.com/m3u8/${hash}`;
        Logger.debug('Processing zilla-m3u8', { hash, targetUrl });

        const response = await fetch(targetUrl, { headers: ZILLA_HEADERS });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch m3u8' });
        }

        let m3u8Content = await response.text();

        // Rewrite segment URLs: /segs/HASH/N.html -> /zilla-segs/HASH/N.html
        m3u8Content = m3u8Content.replace(
            /\/segs\/([^/]+)\/([^"'\s]+)/g,
            `/zilla-segs/$1/$2`
        );

        res.setHeader('Content-Type', 'application/x-mpegURL');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(m3u8Content);
        Logger.info('zilla-m3u8 response sent');
    } catch (error) {
        sendErrorResponse(res, 'Error in zilla-m3u8', error);
    }
});

/**
 * Zilla segments proxy - Proxies video segments with correct headers
 */
app.get('/zilla-segs/:hash/:segment', async (req: Request, res: Response) => {
    try {
        const { hash, segment } = req.params;
        const targetUrl = `https://player.zilla-networks.com/segs/${hash}/${segment}`;
        Logger.debug('Processing zilla-segs', { hash, segment, targetUrl });

        const response = await fetch(targetUrl, { headers: ZILLA_HEADERS });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch segment' });
        }

        const contentType = response.headers.get('content-type') || 'video/mp2t';
        const buffer = await response.arrayBuffer();

        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(Buffer.from(buffer));
        Logger.info('zilla-segs segment sent');
    } catch (error) {
        sendErrorResponse(res, 'Error in zilla-segs', error);
    }
});

/**
 * Zilla proxy provider route
 */
app.get('/prod-zilla-proxy', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-zilla-proxy', { uriParameter });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        // Extract hash from URL: /play/{hash} or /m3u8/{hash}
        const hashMatch = decodedUri.match(/\/(?:play|m3u8)\/([a-f0-9]{32})/);
        const hash = hashMatch ? hashMatch[1] : null;

        if (!hash) {
            return sendErrorResponse(res, 'Invalid zilla URL format', { uri: decodedUri });
        }

        const renderContent = raidenZillaProxy(hash);
        Logger.info('prod-zilla-proxy rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-zilla-proxy content', error);
    }
});

/**
 * Proxied route - Handles multiple providers dynamically
 */
app.get('/proxed', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Processing proxed route', { decodedUri });

        let setToAnalyzer: string;
        let provider: string;

        if (decodedUri.includes('lulu')) {
            provider = 'lulu';
            setToAnalyzer = await luluProd(decodedUri);
        } else if (decodedUri.includes('filemoon')) {
            provider = 'filemoon';
            setToAnalyzer = await fmoonProd(decodedUri);
        } else if (decodedUri.includes('uqload')) {
            provider = 'uqload';
            setToAnalyzer = await uqloProd(decodedUri);
        } else if (decodedUri.includes('yandex')) {
            provider = 'yandex';
            setToAnalyzer = await yandexProd(decodedUri);
        } else {
            throw new Error('Invalid provider name');
        }

        Logger.debug('Provider content generated', { provider, setToAnalyzer });
        const renderContent = raidenGeneral(setToAnalyzer);
        Logger.info(`Proxed route rendered successfully for ${provider}`);
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating proxed content', error);
    }
});

/**
 * Deprecated external route
 */
app.get('/ext', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.warn('Deprecated /ext route accessed', { uri: decodedUri });

        const response = {
            Error: 'Esta URI ya no será soportada en Aniyae, hemos enviado un reporte para su verificación',
            Uri: decodedUri
        };
        res.json(response);
    } catch (error) {
        sendErrorResponse(res, 'Error generating ext content', error);
    }
});

/**
 * Provisional route - Pillar down page
 */
app.get('/provisional', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        const animeTitle = req.query.animeTitle as string;
        Logger.debug('Processing provisional route', { uriParameter, animeTitle });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = pilarDown(decodedUri, animeTitle);
        Logger.info('Provisional page rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating provisional content', error);
    }
});

/**
 * Provider down error page route
 */
app.get('/prod-down', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        Logger.debug('Processing prod-down route', { uriParameter });

        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = errorWebsite(decodedUri);
        Logger.info('prod-down page rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-down content', error);
    }
});

/**
 * Health check endpoint
 */
app.get('/health', async (req: Request, res: Response) => {
    const healthData = {
        status: 'OK',
        environment: NODE_ENV,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    };

    Logger.debug('Health check performed', healthData);
    res.status(HTTP_STATUS.OK).json(healthData);
});

// Start server (skip only during test runs)
if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('\n' + '='.repeat(60));
        console.log('🚀 Raiden Embedview Server Started');
        console.log('='.repeat(60));
        console.log(`📡 Port: ${PORT}`);
        console.log(`🌍 Environment: ${NODE_ENV}`);
        console.log(`🔧 Debug Mode: ${IS_DEVELOPMENT ? 'ENABLED ✅' : 'DISABLED ❌'}`);
        console.log(`🔐 Hash Parameter: ${ANIYAE_HASH || '[NOT SET]'}`);
        console.log(`⏰ Started at: ${new Date().toISOString()}`);
        console.log('='.repeat(60) + '\n');

        if (IS_DEVELOPMENT) {
            Logger.warn('Running in DEVELOPMENT mode - Detailed errors will be shown');
        } else if (IS_PRODUCTION) {
            Logger.info('Running in PRODUCTION mode - Errors will be sanitized and redirected');
        }
    });
}

export default app;