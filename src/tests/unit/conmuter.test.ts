import { performConmutation } from '../../conmuter';
import { doubleB64Controller, sanitizeDomainTld, decodeUriParameter } from '../../providers/prod-uri-analizer';

describe('performConmutation', () => {
  const mockProviders = [
    { key: 'doodstream.com', value: 'prod-dood-analyzer' },
    { key: 'ok.ru', value: 'prod-analizer-ok' },
    { key: 'wishembed.pro', value: 'prod-analizer-wish' },
    { key: 'lulustream.com', value: 'prod-analizer-lulu' }
  ];

  test('should return correct provider for doodstream', () => {
    const uri = 'https://doodstream.com/e/abc123';
    const result = performConmutation(uri, mockProviders);
    expect(result).toBe('prod-dood-analyzer');
  });

  test('should return correct provider for ok.ru', () => {
    const uri = 'https://ok.ru/video/123456';
    const result = performConmutation(uri, mockProviders);
    expect(result).toBe('prod-analizer-ok');
  });

  test('should return null for unsupported provider', () => {
    const uri = 'https://unsupported-provider.com/video';
    const result = performConmutation(uri, mockProviders);
    expect(result).toBeNull();
  });

  test('should handle empty URI', () => {
    const uri = '';
    const result = performConmutation(uri, mockProviders);
    expect(result).toBeNull();
  });

  test('should be case-insensitive', () => {
    const uri = 'https://DOODSTREAM.COM/e/abc123';
    const result = performConmutation(uri, mockProviders);
    expect(result).toBe('prod-dood-analyzer');
  });
});

describe('doubleB64Controller', () => {

  test('should return unencoded URL if single encoded was decoded', () => {
    const originalUrl = 'https://doodstream.com/e/test123';
    expect(doubleB64Controller(originalUrl)).toBe(originalUrl);
  });

  test('should decode a second level of base64 when URL was double encoded', () => {
    const originalUrl = 'https://doodstream.com/e/test123';
    const singleEncoded = Buffer.from(originalUrl).toString('base64');
    expect(doubleB64Controller(singleEncoded)).toBe(originalUrl);
  });

  test('should handle empty or invalid inputs gracefully', () => {
    expect(doubleB64Controller('')).toBe('');
    expect(doubleB64Controller('not-base64-plain-text')).toBe('not-base64-plain-text');
  });
});

describe('sanitizeDomainTld & decodeUriParameter', () => {
  test('should sanitize malformed .comp and .netp domains', () => {
    expect(sanitizeDomainTld('https://mdy48tn97.comp/e/test')).toBe('https://mdy48tn97.com/e/test');
    expect(sanitizeDomainTld('https://example.netp/view/123')).toBe('https://example.net/view/123');
    expect(sanitizeDomainTld('https://example.orgp/view/123')).toBe('https://example.org/view/123');
  });

  test('should sanitize correctly when decoding URI parameter', () => {
    const rawUrl = 'https://mdy48tn97.comp/e/test123';
    const base64Url = Buffer.from(rawUrl).toString('base64');
    expect(decodeUriParameter(base64Url)).toBe('https://mdy48tn97.com/e/test123');
  });
});