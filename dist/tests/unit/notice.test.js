"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prod_notice_1 = require("../../providers/prod-notice");
const prod_general_1 = require("../../providers/prod-general");
const prod_snbox_1 = require("../../providers/prod-snbox");
const prod_base_1 = require("../../providers/prod-base");
describe('Notice banner system', () => {
    describe('getNoticeMessage', () => {
        test('should return default message for default version', () => {
            const expected = 'Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video';
            expect((0, prod_notice_1.getNoticeMessage)('default')).toBe(expected);
            expect((0, prod_notice_1.getNoticeMessage)('DEFAULT')).toBe(expected);
            expect((0, prod_notice_1.getNoticeMessage)('  default  ')).toBe(expected);
        });
        test('should return snbox message for snbox version', () => {
            const expected = 'Este video contiene ads auto ocultables y protección anti PoPs';
            expect((0, prod_notice_1.getNoticeMessage)('snbox')).toBe(expected);
            expect((0, prod_notice_1.getNoticeMessage)('SNBOX')).toBe(expected);
        });
        test('should return null for undefined, empty or unknown versions', () => {
            expect((0, prod_notice_1.getNoticeMessage)()).toBeNull();
            expect((0, prod_notice_1.getNoticeMessage)('')).toBeNull();
            expect((0, prod_notice_1.getNoticeMessage)('unknown')).toBeNull();
        });
    });
    describe('renderNoticeBanner', () => {
        test('should render notice curtain wrapper HTML when version is valid', () => {
            const html = (0, prod_notice_1.renderNoticeBanner)('default');
            expect(html).toContain('notice-curtain-wrapper');
            expect(html).toContain('curtain-layer');
            expect(html).toContain('curtain-in-1');
            expect(html).toContain('curtain-out-1');
            expect(html).toContain('Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video');
        });
        test('should return empty string when version is empty or invalid', () => {
            expect((0, prod_notice_1.renderNoticeBanner)()).toBe('');
            expect((0, prod_notice_1.renderNoticeBanner)('')).toBe('');
            expect((0, prod_notice_1.renderNoticeBanner)('invalid')).toBe('');
        });
    });
    describe('raidenGeneral & raidenSanbox with version parameter', () => {
        test('raidenGeneral should use default notice message automatically', () => {
            const output = (0, prod_general_1.raidenGeneral)('https://example.com/embed');
            expect(output).toContain('notice-curtain-wrapper');
            expect(output).toContain('Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video');
            expect(output).toContain('curtain-in-1');
            expect(output).toContain('curtain-out-1');
        });
        test('raidenSanbox should use snbox notice message automatically', () => {
            const output = (0, prod_snbox_1.raidenSanbox)('https://example.com/embed');
            expect(output).toContain('notice-curtain-wrapper');
            expect(output).toContain('Este video contiene ads auto ocultables y protección anti PoPs');
            expect(output).toContain('curtain-in-1');
            expect(output).toContain('curtain-out-1');
        });
    });
    describe('basePlayerPage with version parameter', () => {
        test('should append version query param to button href when provided', () => {
            const html = (0, prod_base_1.basePlayerPage)('/prod-general?test=123', 'img.jpg', 'default');
            expect(html).toContain('&version=default');
        });
        test('should omit version query param when not provided', () => {
            const html = (0, prod_base_1.basePlayerPage)('/prod-general?test=123', 'img.jpg');
            expect(html).not.toContain('&version=');
        });
    });
});
