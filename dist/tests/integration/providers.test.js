"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
describe('Provider Analyzers', () => {
    describe('performDoodAnalyzer', () => {
        test('should transform doodstream URL correctly', () => {
            const input = 'https://doodstream.com/e/abc123';
            const result = (0, index_1.performDoodAnalyzer)(input);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
        test('should handle invalid URLs gracefully', () => {
            const input = 'not-a-url';
            const result = (0, index_1.performDoodAnalyzer)(input);
            expect(result).toBeDefined();
        });
    });
    describe('performOkruAnalyzer', () => {
        test('should transform ok.ru URL correctly', () => {
            const input = 'https://ok.ru/video/123456';
            const result = (0, index_1.performOkruAnalyzer)(input);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
    });
    describe('performWishAnalyzer', () => {
        test('should transform wishembed URL correctly', () => {
            const input = 'https://wishembed.pro/e/xyz789';
            const result = (0, index_1.performWishAnalyzer)(input);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
    });
    describe('filemoonAnalizer & extractMoonHash', () => {
        test('should extract hash and reconstruct URL from fragmented provider URL', () => {
            const fragmented = 'bysewihe.comkoze.com/e/bfbzqnq4sewp';
            const result = (0, index_1.filemoonAnalizer)(fragmented);
            expect(result).toBe('https://bysewihe.com/e/bfbzqnq4sewp');
        });
        test('should handle standard filemoon.sx URL', () => {
            const input = 'https://filemoon.sx/e/bfbzqnq4sewp';
            const result = (0, index_1.filemoonAnalizer)(input);
            expect(result).toBe('https://bysewihe.com/e/bfbzqnq4sewp');
        });
        test('should handle byse.sx URL', () => {
            const input = 'https://byse.sx/e/bfbzqnq4sewp';
            const result = (0, index_1.filemoonAnalizer)(input);
            expect(result).toBe('https://bysewihe.com/e/bfbzqnq4sewp');
        });
        test('should handle /d/ download route', () => {
            const input = 'https://filemoon.nl/d/bfbzqnq4sewp';
            const result = (0, index_1.filemoonAnalizer)(input);
            expect(result).toBe('https://bysewihe.com/e/bfbzqnq4sewp');
        });
        test('should handle raw /e/ path', () => {
            const input = '/e/bfbzqnq4sewp';
            const result = (0, index_1.filemoonAnalizer)(input);
            expect(result).toBe('https://bysewihe.com/e/bfbzqnq4sewp');
        });
        test('should extract clean hash directly', () => {
            const hash = (0, index_1.extractMoonHash)('bysewihe.comkoze.com/e/bfbzqnq4sewp');
            expect(hash).toBe('bfbzqnq4sewp');
        });
    });
});
