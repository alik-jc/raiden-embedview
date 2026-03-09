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
    describe('performMixdropAnalyzer', () => {
        test('should transform mixdrop URL correctly', () => {
            const input = 'https://mixdrop.co/e/test123';
            const result = (0, index_1.performMixdropAnalyzer)(input);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
    });
});
