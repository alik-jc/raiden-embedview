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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const supertest_1 = __importDefault(require("supertest"));
// Mock del servidor para testing
process.env.NODE_ENV = 'test';
process.env.SRV_URI = '3001';
process.env.HASH = 'testHash';
describe('Server Routes', () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Importar la app después de setear las variables de entorno
        const module = yield Promise.resolve().then(() => __importStar(require('../../embed-serv')));
        app = module.default;
    }));
    describe('GET /health', () => {
        test('should return 200 and health status', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get('/health')
                .expect(200);
            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('environment');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
        }));
    });
    describe('GET /', () => {
        test('should return 403 when hash parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get('/')
                .expect(403);
            // En test mode, debería devolver JSON en lugar de redirect
            expect(response.body).toHaveProperty('error');
        }));
        test('should return 403 with invalid base64', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get('/?testHash=invalid-base64!!!')
                .expect(403);
            expect(response.body).toHaveProperty('error');
        }));
        test('should process valid encoded URI', () => __awaiter(void 0, void 0, void 0, function* () {
            const validUri = 'https://doodstream.com/e/test123';
            const encodedUri = Buffer.from(validUri).toString('base64');
            const response = yield (0, supertest_1.default)(app)
                .get(`/?testHash=${encodedUri}`)
                .expect(200);
            // Verificar que se devuelve HTML
            expect(response.headers['content-type']).toContain('text/html');
        }));
    });
    describe('GET /prod-general', () => {
        test('should return error without hash parameter', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get('/prod-general')
                .expect(500);
            expect(response.body).toHaveProperty('error');
        }));
        test('should process valid request', () => __awaiter(void 0, void 0, void 0, function* () {
            const validUri = 'https://example.com/video.mp4';
            const encodedUri = Buffer.from(validUri).toString('base64');
            const response = yield (0, supertest_1.default)(app)
                .get(`/prod-general?testHash=${encodedUri}`)
                .expect(200);
            expect(response.headers['content-type']).toContain('text/html');
        }));
    });
    describe('GET /prod-raidenplayer', () => {
        test('should accept image parameter', () => __awaiter(void 0, void 0, void 0, function* () {
            const validUri = 'https://example.com/video.mp4';
            const encodedUri = Buffer.from(validUri).toString('base64');
            const imageUrl = 'https://example.com/poster.jpg';
            const response = yield (0, supertest_1.default)(app)
                .get(`/prod-raidenplayer?testHash=${encodedUri}&image=${encodeURIComponent(imageUrl)}`)
                .expect(200);
            expect(response.headers['content-type']).toContain('text/html');
        }));
    });
    describe('GET /proxed', () => {
        test('should handle lulu provider', () => __awaiter(void 0, void 0, void 0, function* () {
            const validUri = 'https://lulustream.com/e/test123';
            const encodedUri = Buffer.from(validUri).toString('base64');
            const response = yield (0, supertest_1.default)(app)
                .get(`/proxed?testHash=${encodedUri}`)
                .expect(200);
            expect(response.headers['content-type']).toContain('text/html');
        }));
        test('should return error for unsupported provider', () => __awaiter(void 0, void 0, void 0, function* () {
            const validUri = 'https://unsupported.com/video';
            const encodedUri = Buffer.from(validUri).toString('base64');
            const response = yield (0, supertest_1.default)(app)
                .get(`/proxed?testHash=${encodedUri}`)
                .expect(500);
            expect(response.body).toHaveProperty('error');
        }));
    });
});
