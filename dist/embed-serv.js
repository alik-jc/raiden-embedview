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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./index");
const conmuter_1 = require("./conmuter");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
};
// Utility: Debug Logger
class Logger {
    static formatTimestamp() {
        return new Date().toISOString().replace('T', ' ').slice(0, 19);
    }
    static debug(message, data) {
        if (IS_DEVELOPMENT) {
            console.log(`\n🔍 [DEBUG ${this.formatTimestamp()}] ${message}`);
            if (data) {
                console.log('📦 Data:', JSON.stringify(data, null, 2));
            }
        }
    }
    static info(message, data) {
        console.log(`\n✅ [INFO ${this.formatTimestamp()}] ${message}`);
        if (data && IS_DEVELOPMENT) {
            console.log('📦 Data:', data);
        }
    }
    static warn(message, data) {
        console.warn(`\n⚠️  [WARN ${this.formatTimestamp()}] ${message}`);
        if (data && IS_DEVELOPMENT) {
            console.warn('📦 Data:', data);
        }
    }
    static error(message, error) {
        console.error(`\n❌ [ERROR ${this.formatTimestamp()}] ${message}`);
        if (error instanceof Error) {
            console.error('💥 Error Message:', error.message);
            if (IS_DEVELOPMENT) {
                console.error('📜 Stack Trace:', error.stack);
            }
        }
        else if (error) {
            console.error('📦 Error Data:', error);
        }
    }
}
exports.Logger = Logger;
// Middleware: Request Logger (solo en desarrollo)
const requestLogger = (req, res, next) => {
    if (IS_DEVELOPMENT) {
        Logger.debug(`Incoming ${req.method} request`, {
            path: req.path,
            query: req.query
        });
    }
    next();
};
// Utility function: Send HTML response
const sendHtmlResponse = (res, content) => {
    Logger.debug('Sending HTML response', { contentLength: content.length });
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
};
// Utility function: Send error response (con soporte de entorno)
const sendErrorResponse = (res, message, error, statusCode = HTTP_STATUS.INTERNAL_ERROR) => {
    Logger.error(message, error);
    if (IS_DEVELOPMENT) {
        // Modo desarrollo: respuesta detallada en JSON
        const errorResponse = {
            error: message,
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(errorResponse);
    }
    else {
        // Modo producción: respuesta simple
        const errorResponse = { error: message };
        res.status(statusCode).json(errorResponse);
    }
};
// Apply request logger middleware
app.use(requestLogger);
/**
 * Main route - Handles dynamic provider routing
 */
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Logger.debug('Processing main route', { query: req.query });
        const json = index_1.PROVIDERS_JSON;
        const image = req.query.image;
        const animeTitle = req.query.animeTitle;
        const uriParameter = req.query[ANIYAE_HASH];
        if (!uriParameter) {
            Logger.warn('Missing URI parameter in main route');
            if (IS_DEVELOPMENT) {
                return sendErrorResponse(res, 'Missing hash parameter', new Error(`Expected query parameter: ${ANIYAE_HASH}`), HTTP_STATUS.INTERNAL_ERROR);
            }
            return res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
        }
        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Decoded base URI', { base });
        const conmutatedValue = (0, conmuter_1.performConmutation)(base, json);
        Logger.debug('Conmutation result', { conmutatedValue });
        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + ANIYAE_HASH + '=' + uriParameter;
            const playerPage = (0, index_1.basePlayerPage)(response, image, animeTitle);
            Logger.info('Successfully generated player page');
            return sendHtmlResponse(res, playerPage);
        }
        else {
            const uriParser = new URL(base);
            Logger.warn('Unsupported URI provider', { hostname: uriParser.hostname });
            return sendErrorResponse(res, 'The provided URI is not supported', { uri: uriParser.hostname }, HTTP_STATUS.INTERNAL_ERROR);
        }
    }
    catch (error) {
        Logger.error('Error in main route', error);
        if (IS_DEVELOPMENT) {
            return sendErrorResponse(res, 'Error processing main route', error, HTTP_STATUS.INTERNAL_ERROR);
        }
        res.status(HTTP_STATUS.FORBIDDEN).redirect(ANIYAE_REDIRECT_URL);
    }
}));
/**
 * Sandbox provider route
 */
app.get('/prod-snbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-snbox', { uriParameter });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('URI decoded', { decodedUri });
        const renderContent = (0, index_1.raidenSanbox)(decodedUri);
        Logger.info('prod-snbox rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-snbox content', error);
    }
}));
/**
 * General provider route
 */
app.get('/prod-general', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-general', { uriParameter });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.raidenGeneral)(decodedUri);
        Logger.info('prod-general rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-general content', error);
    }
}));
/**
 * Abyss provider route
 */
app.get('/prod-abyss', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-abyss', { uriParameter });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const abyssContent = (0, index_1.abyssTransform)(decodedUri);
        Logger.debug('Abyss content transformed', { abyssContent });
        const renderContent = (0, index_1.raidenGeneral)(abyssContent || '');
        Logger.info('prod-abyss rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-abyss content', error);
    }
}));
/**
 * Filemoon analyzer route
 */
app.get('/moon-analizer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing moon-analizer', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const filemoonContent = (0, index_1.filemoonAnalizer)(decodedUri);
        Logger.debug('Filemoon content analyzed', { filemoonContent });
        //const proxedContent = await fmoonProd(filemoonContent || '');
        //Logger.debug('Filemoon proxied content generated', { proxedContent });
        const renderContent = (0, index_1.raidenGeneral)(filemoonContent || '');
        Logger.info('moon-analizer rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating moon-analizer content', error);
    }
}));
/**
 * Doodstream analyzer route
 */
app.get('/prod-dood-analyzer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-dood-analyzer', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const doodContent = (0, index_1.performDoodAnalyzer)(decodedUri);
        Logger.debug('Dood content analyzed', { doodContent });
        const renderContent = (0, index_1.raidenGeneral)(doodContent || '');
        Logger.info('prod-dood-analyzer rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-dood-analyzer content', error);
    }
}));
/**
 * Okru analyzer route
 */
app.get('/prod-analizer-ok', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-analizer-ok', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const OkContent = (0, index_1.performOkruAnalyzer)(decodedUri);
        Logger.debug('Okru content analyzed', { OkContent });
        const renderContent = (0, index_1.raidenSanbox)(OkContent || '');
        Logger.info('prod-analizer-ok rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-ok content', error);
    }
}));
/**
 * Wishembed analyzer route
 */
app.get('/prod-analizer-wish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-analizer-wish', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const wishContent = (0, index_1.performWishAnalyzer)(decodedUri);
        Logger.debug('Wish content analyzed', { wishContent });
        const transformWish = (0, index_1.wistTransform)(wishContent);
        Logger.debug('Wish content transformed', { transformWish });
        //const proxedWish = await wishHgProd(transformWish);
        //Logger.debug('Wish QLS content generated', { proxedWish });
        const renderContent = (0, index_1.raidenGeneral)(transformWish || '');
        Logger.info('prod-analizer-wish rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-wish content', error);
    }
}));
/**
 * Lulu analyzer route
 */
app.get('/prod-analizer-lulu', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-analizer-lulu', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const luluContent = (0, index_1.performLuluAnalyzer)(decodedUri);
        Logger.debug('Lulu content analyzed', { luluContent });
        const proxedLulu = yield (0, index_1.luluProd)(luluContent);
        Logger.debug('Lulu QLS content generated', { proxedLulu });
        const renderContent = (0, index_1.raidenGeneral)(proxedLulu || '');
        Logger.info('prod-analizer-lulu rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-lulu content', error);
    }
}));
/**
 * Lulust analyzer route
 */
app.get('/prod-analizer-lulust', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-analizer-lulust', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const luluContent = (0, index_1.performLulustAnalyzer)(decodedUri);
        Logger.debug('Lulust content analyzed', { luluContent });
        const proxedLulu = yield (0, index_1.luluProd)(luluContent);
        Logger.debug('Lulust QLS content generated', { proxedLulu });
        const renderContent = (0, index_1.raidenGeneral)(proxedLulu || '');
        Logger.info('prod-analizer-lulust rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-lulust content', error);
    }
}));
/**
 * Mixdrop analyzer route
 */
app.get('/prod-analizer-mixdrop', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-analizer-mixdrop', { uriParameter });
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const mixdropContent = (0, index_1.performMixdropAnalyzer)(decodedUri);
        Logger.debug('Mixdrop content analyzed', { mixdropContent });
        const renderContent = (0, index_1.raidenGeneral)(mixdropContent || '');
        Logger.info('prod-analizer-mixdrop rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-analizer-mixdrop content', error);
    }
}));
/**
 * Raiden player route
 */
app.get('/prod-raidenplayer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        const image = req.query.image;
        Logger.debug('Processing prod-raidenplayer', { uriParameter, image });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.raidenPlayer)(decodedUri, image);
        Logger.info('prod-raidenplayer rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-raidenplayer content', error);
    }
}));
/**
 * Default proxed
*/
app.get('/proxed-xn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Processing proxed-xn route', { decodedUri });
        const setAnalyzer = yield (0, index_1.proxedXn)(decodedUri);
        Logger.debug('Proxed-XN content generated', { setAnalyzer });
        const renderContent = (0, index_1.raidenGeneral)(setAnalyzer);
        Logger.info('Proxed-XN route rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating proxed-xn content', error);
    }
}));
/**
 * Proxied route - Handles multiple providers dynamically
 */
app.get('/proxed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.debug('Processing proxed route', { decodedUri });
        let setToAnalyzer;
        let provider;
        if (decodedUri.includes('lulu')) {
            provider = 'lulu';
            setToAnalyzer = yield (0, index_1.luluProd)(decodedUri);
        }
        else if (decodedUri.includes('filemoon')) {
            provider = 'filemoon';
            setToAnalyzer = yield (0, index_1.fmoonProd)(decodedUri);
        }
        else if (decodedUri.includes('uqload')) {
            provider = 'uqload';
            setToAnalyzer = yield (0, index_1.uqloProd)(decodedUri);
        }
        else if (decodedUri.includes('yandex')) {
            provider = 'yandex';
            setToAnalyzer = yield (0, index_1.yandexProd)(decodedUri);
        }
        else {
            throw new Error('Invalid provider name');
        }
        Logger.debug('Provider content generated', { provider, setToAnalyzer });
        const renderContent = (0, index_1.raidenGeneral)(setToAnalyzer);
        Logger.info(`Proxed route rendered successfully for ${provider}`);
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating proxed content', error);
    }
}));
/**
 * Deprecated external route
 */
app.get('/ext', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        Logger.warn('Deprecated /ext route accessed', { uri: decodedUri });
        const response = {
            Error: 'Esta URI ya no será soportada en Aniyae, hemos enviado un reporte para su verificación',
            Uri: decodedUri
        };
        res.json(response);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating ext content', error);
    }
}));
/**
 * Provisional route - Pillar down page
 */
app.get('/provisional', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        const animeTitle = req.query.animeTitle;
        Logger.debug('Processing provisional route', { uriParameter, animeTitle });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.pilarDown)(decodedUri, animeTitle);
        Logger.info('Provisional page rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating provisional content', error);
    }
}));
/**
 * Provider down error page route
 */
app.get('/prod-down', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[ANIYAE_HASH];
        Logger.debug('Processing prod-down route', { uriParameter });
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.errorWebsite)(decodedUri);
        Logger.info('prod-down page rendered successfully');
        sendHtmlResponse(res, renderContent);
    }
    catch (error) {
        sendErrorResponse(res, 'Error generating prod-down content', error);
    }
}));
/**
 * Health check endpoint
 */
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthData = {
        status: 'OK',
        environment: NODE_ENV,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    };
    Logger.debug('Health check performed', healthData);
    res.status(HTTP_STATUS.OK).json(healthData);
}));
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
        }
        else if (IS_PRODUCTION) {
            Logger.info('Running in PRODUCTION mode - Errors will be sanitized and redirected');
        }
    });
}
exports.default = app;
