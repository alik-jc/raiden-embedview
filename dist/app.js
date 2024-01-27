"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userAgent = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./index");
const conmuter_1 = require("./conmuter");
const Sentry = __importStar(require("@sentry/node"));
const profiling_node_1 = require("@sentry/profiling-node");
dotenv_1.default.config();
const app = (0, express_1.default)();
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
        new profiling_node_1.ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
const port = process.env.SRV_URI || 3000;
const aniyaeHash = process.env.HASH || '';
const providersUri = process.env.PROVIDERS_URI || '';
exports.userAgent = process.env.USER_AGENT || '';
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(providersUri, { headers: { 'User-Agent': exports.userAgent } });
        const findArray = response.data;
        const image = req.query.image;
        const animeTitle = req.query.animeTitle;
        const postUri = req.query.postTitle;
        const uriParameter = req.query[aniyaeHash];
        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const conmutatedValue = (0, conmuter_1.performConmutation)(base, findArray);
        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + aniyaeHash + '=' + uriParameter;
            const playerPage = (0, index_1.basePlayerPage)(response, image, animeTitle, postUri);
            res.send(playerPage);
        }
        else {
            const uriParser = new URL(base);
            const response = {
                error: 'Error the uri provided is not supported',
                uri: uriParser.hostname
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        res.status(403).redirect('https://aniyae.net');
    }
}));
app.get('/prod-snbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.raidenSanbox)(decodedUri);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-snbox content' + error);
        console.error('Error generating prod-snbox content : ', error);
        const response = {
            error: 'Error generating prod-snbox content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-general', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.raidenGeneral)(decodedUri);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-general content ' + error);
        console.error('Error generating prod-snbox content :', error);
        const response = {
            error: 'Error generating prod-snbox content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-ok', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const OkContent = (0, index_1.performOkruAnalyzer)(decodedUri);
        const renderContent = (0, index_1.raidenSanbox)(OkContent || '');
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-analizer-ok content ' + error);
        console.error('Error generating prod-analizer-ok content :', error);
        const response = {
            error: 'Error generating prod-analizer-ok content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-wish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const wishContent = (0, index_1.performWishAnalyzer)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(wishContent || '');
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-analizer-wish content ' + error);
        console.error('Error generating prod-analizer-wish content :', error);
        const response = {
            error: 'Error generating prod-analizer-wish content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-lions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const lionsContent = (0, index_1.performFilelionAnalyzer)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(lionsContent || '');
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-analizer-lion content ' + error);
        console.error('Error generating prod-analizer-lion content :', error);
        const response = {
            error: 'Error generating prod-analizer-wish content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-mixdrop', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const mixdropContent = (0, index_1.performMixdropAnalyzer)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(mixdropContent || '');
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-analizer-mixdrop content ' + error);
        console.error('Error generating prod-analizer-mixdrop content :', error);
        const response = {
            error: 'Error generating prod-analizer-mixdrop content '
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-raidenplayer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const image = req.query.image;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.raidenPlayer)(decodedUri, image);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-raidenplayer content ' + error);
        console.error('Error generating prod-raidenplayer content :', error);
        const response = {
            error: 'Error generating prod-raidenplayer content '
        };
        res.status(500).json(response);
    }
}));
app.get('/set', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const setAnalyzer = yield (0, index_1.setProvider)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(setAnalyzer);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
}));
app.get('/qls', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const setAnalyzer = yield (0, index_1.qlsProvider)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(setAnalyzer);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
}));
app.get('/uqls', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const uqlsAnalyzer = yield (0, index_1.uqlsProvider)(decodedUri);
        const renderContent = (0, index_1.raidenGeneral)(uqlsAnalyzer);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
}));
app.get('/ext', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const response = {
            Error: 'Esta uri ya no sera soportada en Aniyae, hemos enviado un reporte para su verificación',
            Uri: decodedUri
        };
        Sentry.captureException('Filelion.online uri encontrada, lista para clonar manualmente ' + decodedUri);
        res.send(response);
    }
    catch (error) {
        console.error('Error generating prod-ext content :', error);
        const response = {
            error: 'Error generating prod-ext content '
        };
        res.status(500).json(response);
    }
}));
app.get('/provisional', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const animeTitle = req.query.animeTitle;
        const postUri = req.query.postTitle;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.pilarDown)(decodedUri, animeTitle);
        Sentry.captureException(new Error(`Se ha detectado un pilar, con el titulo ${animeTitle}:${postUri}`), { level: 'warning' });
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating pilar down page ' + error);
        const response = {
            error: 'Error generating pilar down page'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-down', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const renderContent = (0, index_1.errorWebsite)(decodedUri);
        res.send(renderContent);
    }
    catch (error) {
        Sentry.captureException('Error generating prod-down content ' + error);
        console.error('Error generating prod-down content :', error);
        const response = {
            error: 'Error generating prod-down content '
        };
        res.status(500).json(response);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
