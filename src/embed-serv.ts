import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import {
    basePlayerPage,
    pilarDown,
    errorWebsite,
    luluProd,
    uqloProd,
    fmoonProd,
    PROVIDERS_JSON,
    raidenGeneral
} from './index';

import { performConmutation } from './conmuter';
import { 
    getProviderHandler, 
    isValidProvider, 
    getAvailableProviders,
    ProviderContext 
} from './providers/provider-strategy';

dotenv.config();

const app = express();

// Environment Configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// Constants
const PORT = process.env.SRV_URI || 3000;
const ANIYAE_HASH = process.env.HASH || '';
const ANIYAE_REDIRECT_URL = 'https://aniyae.net';
const HTTP_STATUS = {
    OK: 200,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    MOVED_PERMANENTLY: 301
} as const;

// Types
interface ErrorResponse {
    error: string;
    uri?: string;
    stack?: string;
    details?: string;
    timestamp?: string;
    path?: string;
    availableProviders?: string[];
}

interface QueryParams {
    [key: string]: string | undefined;
    image?: string;
    animeTitle?: string;
}

// Utility: Debug Logger
class Logger {
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
        if (data) {
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

// Middleware: Request Logger
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (IS_DEVELOPMENT) {
        Logger.debug(`Incoming ${req.method} request`, {
            path: req.path,
            query: req.query,
            params: req.params
        });
    }
    next();
};

// Middleware: Decode URI from query parameter
const decodeUriMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const uriParameter = req.query[ANIYAE_HASH] as string;
        
        Logger.debug('Attempting to decode URI', {
            hasHashParam: !!uriParameter,
            hashLength: uriParameter?.length
        });

        if (!uriParameter) {
            throw new Error('Missing hash parameter');
        }

        req.decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        
        Logger.debug('URI decoded successfully', {
            decodedUri: req.decodedUri
        });

        next();
    } catch (error) {
        Logger.error('Failed to decode URI', error);

        if (IS_DEVELOPMENT) {
            const errorResponse: ErrorResponse = {
                error: 'Failed to decode URI parameter',
                details: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                timestamp: new Date().toISOString(),
                path: req.path
            };
            res.status(HTTP_STATUS.FORBIDDEN).json(errorResponse);
        } else {
            res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
        }
    }
};

// Middleware: Global error handler
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.error(`Unhandled error in ${req.path}`, error);

    if (IS_DEVELOPMENT) {
        const errorResponse: ErrorResponse = {
            error: error.message || 'Internal server error',
            stack: error.stack,
            details: error.toString(),
            timestamp: new Date().toISOString(),
            path: req.path
        };
        res.status(HTTP_STATUS.INTERNAL_ERROR).json(errorResponse);
    } else {
        const errorResponse: ErrorResponse = {
            error: 'Internal server error'
        };
        res.status(HTTP_STATUS.INTERNAL_ERROR).json(errorResponse);
    }
};

// Utility function: Send HTML response
const sendHtmlResponse = (res: Response, content: string) => {
    Logger.debug('Sending HTML response', {
        contentLength: content.length
    });
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
};

// Utility function: Send error response
const sendErrorResponse = (
    res: Response, 
    message: string, 
    error?: unknown,
    statusCode = HTTP_STATUS.INTERNAL_ERROR
) => {
    Logger.error(message, error);

    if (IS_DEVELOPMENT) {
        const errorResponse: ErrorResponse = {
            error: message,
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(errorResponse);
    } else {
        const errorResponse: ErrorResponse = { error: message };
        res.status(statusCode).json(errorResponse);
    }
};

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            decodedUri?: string;
        }
    }
}

// Apply request logger middleware
app.use(requestLogger);

// Routes

/**
 * Main route - Handles dynamic provider routing
 */
app.get('/', async (req: Request, res: Response) => {
    try {
        Logger.debug('Processing main route', {
            query: req.query
        });

        const { image, animeTitle } = req.query as QueryParams;
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

        const conmutatedValue = performConmutation(base, PROVIDERS_JSON);
        Logger.debug('Conmutation result', { conmutatedValue });

        if (conmutatedValue) {
            const response = `/${conmutatedValue}/?${ANIYAE_HASH}=${uriParameter}`;
            const playerPage = basePlayerPage(response, image || 'err', animeTitle || 'err');
            Logger.info('Successfully generated player page');
            return sendHtmlResponse(res, playerPage);
        }

        const uriParser = new URL(base);
        Logger.warn('Unsupported URI provider', { hostname: uriParser.hostname });
        
        return sendErrorResponse(
            res, 
            'The provided URI is not supported',
            { uri: uriParser.hostname },
            HTTP_STATUS.INTERNAL_ERROR
        );
        
    } catch (error) {
        Logger.error('Error in main route', error);
        
        if (IS_DEVELOPMENT) {
            return sendErrorResponse(res, 'Error processing main route', error, HTTP_STATUS.INTERNAL_ERROR);
        }
        res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
    }
});

/**
 * 🎯 UNIFIED PROVIDER ROUTE - Handles ALL providers dynamically
 * Replaces: /prod-dood-analyzer, /prod-analizer-ok, /prod-analizer-wish, 
 *           /prod-analizer-lulu, /prod-analizer-lulust, /prod-analizer-mixdrop,
 *           /prod-raidenplayer, /moon-analizer, /prod-abyss, /prod-general, /prod-snbox
 */
app.get('/provider/:providerName', decodeUriMiddleware, async (req: Request, res: Response) => {
    try {
        const { providerName } = req.params;
        const { image, animeTitle } = req.query as QueryParams;

        Logger.debug('Processing unified provider route', { 
            providerName,
            uri: req.decodedUri,
            image,
            animeTitle
        });

        // Validate provider
        if (!isValidProvider(providerName)) {
            Logger.warn(`Invalid provider requested: ${providerName}`);
            
            const errorResponse: ErrorResponse = {
                error: `Provider '${providerName}' not found`,
                availableProviders: IS_DEVELOPMENT ? getAvailableProviders() : undefined
            };
            
            return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse);
        }

        // Get provider handler
        const handler = getProviderHandler(providerName);
        if (!handler) {
            throw new Error(`Handler not found for provider: ${providerName}`);
        }

        // Execute provider handler
        const context: ProviderContext = {
            decodedUri: req.decodedUri!,
            image,
            animeTitle
        };

        const renderContent = await handler(context);
        
        Logger.info(`Provider '${providerName}' rendered successfully`);
        sendHtmlResponse(res, renderContent);

    } catch (error) {
        sendErrorResponse(res, `Error processing provider '${req.params.providerName}'`, error);
    }
});

/**
 * Legacy routes for backwards compatibility
 * These redirect to the new unified route
 */
const legacyRoutes = [
    '/prod-dood-analyzer',
    '/prod-analizer-ok',
    '/prod-analizer-wish',
    '/prod-analizer-lulu',
    '/prod-analizer-lulust',
    '/prod-analizer-mixdrop',
    '/prod-raidenplayer',
    '/moon-analizer',
    '/prod-abyss',
    '/prod-general',
    '/prod-snbox'
];

legacyRoutes.forEach(route => {
    app.get(route, (req: Request, res: Response) => {
        const providerName = route.substring(1); // Remove leading '/'
        const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
        const newUrl = `/provider/${providerName}${queryString ? '?' + queryString : ''}`;
        
        Logger.warn(`Legacy route accessed: ${route}, redirecting to ${newUrl}`);
        
        if (IS_DEVELOPMENT) {
            // In development, show deprecation notice
            res.status(HTTP_STATUS.OK).json({
                warning: `This route is deprecated. Please use: ${newUrl}`,
                redirectTo: newUrl,
                originalRoute: route
            });
        } else {
            // In production, silently redirect
            res.redirect(HTTP_STATUS.MOVED_PERMANENTLY, newUrl);
        }
    });
});

/**
 * Proxied route - Handles multiple providers dynamically
 */
app.get('/proxed', decodeUriMiddleware, async (req: Request, res: Response) => {
    try {
        const decodedUri = req.decodedUri!;
        Logger.debug('Processing proxed route', { decodedUri });
        
        let setAnalyzer: string;
        let provider: string;

        if (decodedUri.includes('lulu')) {
            provider = 'lulu';
            setAnalyzer = await luluProd(decodedUri);
        } else if (decodedUri.includes('filemoon')) {
            provider = 'filemoon';
            setAnalyzer = await fmoonProd(decodedUri);
        } else if (decodedUri.includes('uqload')) {
            provider = 'uqload';
            setAnalyzer = await uqloProd(decodedUri);
        } else {
            throw new Error('Invalid provider name');
        }

        Logger.debug('Provider content generated', { provider, setAnalyzer });
        const renderContent = raidenGeneral(setAnalyzer);
        Logger.info(`Proxed route rendered successfully for ${provider}`);
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating proxed content', error);
    }
});

/**
 * Deprecated external route
 */
app.get('/ext', decodeUriMiddleware, async (req: Request, res: Response) => {
    try {
        Logger.warn('Deprecated /ext route accessed', { uri: req.decodedUri });
        const response = {
            Error: 'Esta URI ya no será soportada en Aniyae, hemos enviado un reporte para su verificación',
            Uri: req.decodedUri
        };
        res.json(response);
    } catch (error) {
        sendErrorResponse(res, 'Error generating ext content', error);
    }
});

/**
 * Provisional route - Pillar down page
 */
app.get('/provisional', decodeUriMiddleware, async (req: Request, res: Response) => {
    try {
        const { animeTitle } = req.query as QueryParams;
        Logger.debug('Processing provisional route', { 
            uri: req.decodedUri,
            animeTitle 
        });
        const renderContent = pilarDown(req.decodedUri!, animeTitle || 'err');
        Logger.info('Provisional page rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating provisional content', error);
    }
});

/**
 * Provider down error page route
 */
app.get('/prod-down', decodeUriMiddleware, async (req: Request, res: Response) => {
    try {
        Logger.debug('Processing prod-down route', { uri: req.decodedUri });
        const renderContent = errorWebsite(req.decodedUri!);
        Logger.info('prod-down page rendered successfully');
        sendHtmlResponse(res, renderContent);
    } catch (error) {
        sendErrorResponse(res, 'Error generating prod-down content', error);
    }
});

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
    const healthData = {
        status: 'OK',
        environment: NODE_ENV,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        availableProviders: IS_DEVELOPMENT ? getAvailableProviders() : undefined
    };
    
    Logger.debug('Health check performed', healthData);
    res.status(HTTP_STATUS.OK).json(healthData);
});

// Apply global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Raiden Embedview Server Started');
    console.log('='.repeat(60));
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔧 Debug Mode: ${IS_DEVELOPMENT ? 'ENABLED' : 'DISABLED'}`);
    console.log(`🔐 Hash Parameter: ${ANIYAE_HASH || '[NOT SET]'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`📦 Available Providers: ${getAvailableProviders().length}`);
    console.log('='.repeat(60) + '\n');
    
    if (IS_DEVELOPMENT) {
        Logger.warn('Running in DEVELOPMENT mode - Detailed errors will be shown');
        Logger.info('Available providers:', getAvailableProviders());
    } else {
        Logger.info('Running in PRODUCTION mode - Errors will be sanitized');
    }
});

export default app;