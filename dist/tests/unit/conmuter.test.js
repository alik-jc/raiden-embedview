"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conmuter_1 = require("../../conmuter");
describe('performConmutation', () => {
    const mockProviders = [
        { key: 'doodstream.com', value: 'prod-dood-analyzer' },
        { key: 'ok.ru', value: 'prod-analizer-ok' },
        { key: 'wishembed.pro', value: 'prod-analizer-wish' },
        { key: 'lulustream.com', value: 'prod-analizer-lulu' }
    ];
    test('should return correct provider for doodstream', () => {
        const uri = 'https://doodstream.com/e/abc123';
        const result = (0, conmuter_1.performConmutation)(uri, mockProviders);
        expect(result).toBe('prod-dood-analyzer');
    });
    test('should return correct provider for ok.ru', () => {
        const uri = 'https://ok.ru/video/123456';
        const result = (0, conmuter_1.performConmutation)(uri, mockProviders);
        expect(result).toBe('prod-analizer-ok');
    });
    test('should return null for unsupported provider', () => {
        const uri = 'https://unsupported-provider.com/video';
        const result = (0, conmuter_1.performConmutation)(uri, mockProviders);
        expect(result).toBeNull();
    });
    test('should handle empty URI', () => {
        const uri = '';
        const result = (0, conmuter_1.performConmutation)(uri, mockProviders);
        expect(result).toBeNull();
    });
    test('should be case-insensitive', () => {
        const uri = 'https://DOODSTREAM.COM/e/abc123';
        const result = (0, conmuter_1.performConmutation)(uri, mockProviders);
        expect(result).toBe('prod-dood-analyzer');
    });
});
