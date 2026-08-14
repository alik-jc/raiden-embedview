"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conmuter_1 = require("../../conmuter");
const prod_uri_analizer_1 = require("../../providers/prod-uri-analizer");
describe('performConmutation', () => {
    const mockProviders = [
        { key: 'doodstream.com', value: 'prod-dood-analyzer' },
        { key: 'ok.ru', value: 'prod-analizer-ok' },
        { key: 'wishembed.pro', value: 'prod-analizer-wish' },
        { key: 'lulustream.com', value: 'prod-analizer-lulu' },
        { key: 'mixdrop', value: 'prod-analizer-mixdrop' },
        { key: 'mxdrop', value: 'prod-analizer-mixdrop' },
        { key: 'mdy48tn97', value: 'prod-analizer-mixdrop' }
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
    test('should return correct provider for mdy48tn97 and mixdrop', () => {
        expect((0, conmuter_1.performConmutation)('https://mdy48tn97.comp/e/test', mockProviders)).toBe('prod-analizer-mixdrop');
        expect((0, conmuter_1.performConmutation)('https://mixdrop.co/e/test', mockProviders)).toBe('prod-analizer-mixdrop');
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
describe('doubleB64Controller', () => {
    test('should return unencoded URL if single encoded was decoded', () => {
        const originalUrl = 'https://doodstream.com/e/test123';
        expect((0, prod_uri_analizer_1.doubleB64Controller)(originalUrl)).toBe(originalUrl);
    });
    test('should decode a second level of base64 when URL was double encoded', () => {
        const originalUrl = 'https://doodstream.com/e/test123';
        const singleEncoded = Buffer.from(originalUrl).toString('base64');
        expect((0, prod_uri_analizer_1.doubleB64Controller)(singleEncoded)).toBe(originalUrl);
    });
    test('should handle empty or invalid inputs gracefully', () => {
        expect((0, prod_uri_analizer_1.doubleB64Controller)('')).toBe('');
        expect((0, prod_uri_analizer_1.doubleB64Controller)('not-base64-plain-text')).toBe('not-base64-plain-text');
    });
});
describe('performMixdropAnalyzer', () => {
    test('should transform mdy48tn97.comp and other drop variants to mdy48tn97.com', () => {
        expect((0, prod_uri_analizer_1.performMixdropAnalyzer)('https://mdy48tn97.comp/e/12345')).toBe('https://mdy48tn97.com/e/12345');
        expect((0, prod_uri_analizer_1.performMixdropAnalyzer)('https://mixdrop.co/e/12345')).toBe('https://mdy48tn97.com/e/12345');
        expect((0, prod_uri_analizer_1.performMixdropAnalyzer)('https://mixdrop.to/e/12345')).toBe('https://mdy48tn97.com/e/12345');
    });
});
describe('sanitizeDomainTld & decodeUriParameter', () => {
    test('should sanitize malformed .comp and .netp domains', () => {
        expect((0, prod_uri_analizer_1.sanitizeDomainTld)('https://mdy48tn97.comp/e/test')).toBe('https://mdy48tn97.com/e/test');
        expect((0, prod_uri_analizer_1.sanitizeDomainTld)('https://example.netp/view/123')).toBe('https://example.net/view/123');
        expect((0, prod_uri_analizer_1.sanitizeDomainTld)('https://example.orgp/view/123')).toBe('https://example.org/view/123');
    });
    test('should sanitize correctly when decoding URI parameter', () => {
        const rawUrl = 'https://mdy48tn97.comp/e/test123';
        const base64Url = Buffer.from(rawUrl).toString('base64');
        expect((0, prod_uri_analizer_1.decodeUriParameter)(base64Url)).toBe('https://mdy48tn97.com/e/test123');
    });
});
