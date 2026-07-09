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
describe('Logger', () => {
    const originalEnv = process.env.NODE_ENV;
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        consoleSpy.mockRestore();
        process.env.NODE_ENV = originalEnv;
    });
    test('should log debug messages in development mode', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'development';
        // Recargar el módulo con el nuevo NODE_ENV
        jest.resetModules();
        const { Logger } = yield Promise.resolve().then(() => __importStar(require('../../embed-serv')));
        Logger.debug('Test message');
        expect(consoleSpy).toHaveBeenCalled();
    }));
    test('should not log debug messages in production mode', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'production';
        jest.resetModules();
        const { Logger } = yield Promise.resolve().then(() => __importStar(require('../../embed-serv')));
        Logger.debug('Test message');
        expect(consoleSpy).not.toHaveBeenCalled();
    }));
    test('should always log info messages', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'production';
        jest.resetModules();
        const { Logger } = yield Promise.resolve().then(() => __importStar(require('../../embed-serv')));
        Logger.info('Test info');
        expect(consoleSpy).toHaveBeenCalled();
    }));
});
