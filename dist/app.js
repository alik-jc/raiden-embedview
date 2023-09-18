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
exports.userAgent = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./index");
const conmuter_1 = require("./conmuter");
const app = (0, express_1.default)();
const PORT = 3000;
const aniyaeHash = 'RXJlcyB1biBoaWpvIGRlIHB1dGEgcG9yIGludGVudGFyIHJvYmFyIGVsIGxpbmssIHBlcm8gZXJlcyBsbyBzdWZpY2llbnRlbWVudGUgaW50ZWxpZ2VudGUgY29tbyBwYXJhIHZlciBlc3RlIG1lbnNhamUuIE1hbiBkYW1lIHVuIHR3aXQgQGFuaXlhZV9jb20gc2kgbG8gbG9ncmFzIGVuY29udHJhcg';
const PROVIDERS_JSON_URL = 'https://dev.aniyae.net/set-json/providers.json';
exports.userAgent = 'Aniyae-Player';
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(PROVIDERS_JSON_URL, { headers: { 'User-Agent': exports.userAgent } });
        const findArray = response.data;
        const image = req.query.image;
        const uriParameter = req.query[aniyaeHash];
        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const conmutatedValue = (0, conmuter_1.performConmutation)(base, findArray);
        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + aniyaeHash + '=' + uriParameter;
            const playerPage = (0, index_1.basePlayerPage)(response, image);
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
        res.redirect('//aniyae.net');
    }
}));
app.get('/prod-snbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const iframeContent = (0, index_1.raidenSanbox)(decodedUri);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-general', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const iframeContent = (0, index_1.raidenGeneral)(decodedUri);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-lbry', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const image = req.query.image;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const analizerLbryContent = (0, index_1.performLbryAnalyzer)(decodedUri);
        const iframeContent = (0, index_1.raidenPlayer)(analizerLbryContent, image);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-analizer-ok', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');
        const analizerOkContent = (0, index_1.performOkruAnalyzer)(decodedUri);
        const iframeContent = (0, index_1.raidenSanbox)(analizerOkContent || '');
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-raidenplayer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const image = req.query.image;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const iframeContent = (0, index_1.raidenPlayer)(decodedUri, image);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/set', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const setAnalyzer = yield (0, index_1.setProvider)(decodedUri);
        const iframeContent = (0, index_1.raidenGeneral)(setAnalyzer);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.get('/prod-down', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uriParameter = req.query[aniyaeHash];
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');
        const iframeContent = (0, index_1.errorWebsite)(decodedUri);
        res.send(iframeContent);
    }
    catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
