import { getNoticeMessage, renderNoticeBanner } from '../../providers/prod-notice';
import { raidenGeneral } from '../../providers/prod-general';
import { raidenSanbox } from '../../providers/prod-snbox';
import { basePlayerPage } from '../../providers/prod-base';

describe('Notice banner system', () => {
    describe('getNoticeMessage', () => {
        test('should return default message for default version', () => {
            const expected = 'Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video';
            expect(getNoticeMessage('default')).toBe(expected);
            expect(getNoticeMessage('DEFAULT')).toBe(expected);
            expect(getNoticeMessage('  default  ')).toBe(expected);
        });

        test('should return snbox message for snbox version', () => {
            const expected = 'Este video contiene ads auto ocultables y protección anti PoPs';
            expect(getNoticeMessage('snbox')).toBe(expected);
            expect(getNoticeMessage('SNBOX')).toBe(expected);
        });

        test('should return null for undefined, empty or unknown versions', () => {
            expect(getNoticeMessage()).toBeNull();
            expect(getNoticeMessage('')).toBeNull();
            expect(getNoticeMessage('unknown')).toBeNull();
        });
    });

    describe('renderNoticeBanner', () => {
        test('should render notice curtain wrapper HTML when version is valid', () => {
            const html = renderNoticeBanner('default');
            expect(html).toContain('notice-curtain-wrapper');
            expect(html).toContain('curtain-layer');
            expect(html).toContain('curtain-in-1');
            expect(html).toContain('curtain-out-1');
            expect(html).toContain('Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video');
        });

        test('should return empty string when version is empty or invalid', () => {
            expect(renderNoticeBanner()).toBe('');
            expect(renderNoticeBanner('')).toBe('');
            expect(renderNoticeBanner('invalid')).toBe('');
        });
    });

    describe('raidenGeneral & raidenSanbox with version parameter', () => {
        test('raidenGeneral should use default notice message automatically', () => {
            const output = raidenGeneral('https://example.com/embed');
            expect(output).toContain('notice-curtain-wrapper');
            expect(output).toContain('Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video');
            expect(output).toContain('curtain-in-1');
            expect(output).toContain('curtain-out-1');
        });

        test('raidenSanbox should use snbox notice message automatically', () => {
            const output = raidenSanbox('https://example.com/embed');
            expect(output).toContain('notice-curtain-wrapper');
            expect(output).toContain('Este video contiene ads auto ocultables y protección anti PoPs');
            expect(output).toContain('curtain-in-1');
            expect(output).toContain('curtain-out-1');
        });
    });

    describe('basePlayerPage with version parameter', () => {
        test('should append version query param to button href when provided', () => {
            const html = basePlayerPage('/prod-general?test=123', 'img.jpg', 'default');
            expect(html).toContain('&version=default');
        });

        test('should omit version query param when not provided', () => {
            const html = basePlayerPage('/prod-general?test=123', 'img.jpg');
            expect(html).not.toContain('&version=');
        });
    });
});
