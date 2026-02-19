import request from 'supertest';
import express from 'express';

// Mock del servidor para testing
process.env.NODE_ENV = 'test';
process.env.SRV_URI = '3001';
process.env.HASH = 'testHash';

describe('Server Routes', () => {
  let app: express.Application;

  beforeAll(async () => {
    // Importar la app después de setear las variables de entorno
    const module = await import('../../embed-serv');
    app = module.default;
  });

  describe('GET /health', () => {
    test('should return 200 and health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /', () => {
    test('should return 403 when hash parameter is missing', async () => {
      const response = await request(app)
        .get('/')
        .expect(403);

      // En test mode, debería devolver JSON en lugar de redirect
      expect(response.body).toHaveProperty('error');
    });

    test('should return 403 with invalid base64', async () => {
      const response = await request(app)
        .get('/?testHash=invalid-base64!!!')
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });

    test('should process valid encoded URI', async () => {
      const validUri = 'https://doodstream.com/e/test123';
      const encodedUri = Buffer.from(validUri).toString('base64');

      const response = await request(app)
        .get(`/?testHash=${encodedUri}`)
        .expect(200);

      // Verificar que se devuelve HTML
      expect(response.headers['content-type']).toContain('text/html');
    });
  });

  describe('GET /prod-general', () => {
    test('should return error without hash parameter', async () => {
      const response = await request(app)
        .get('/prod-general')
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });

    test('should process valid request', async () => {
      const validUri = 'https://example.com/video.mp4';
      const encodedUri = Buffer.from(validUri).toString('base64');

      const response = await request(app)
        .get(`/prod-general?testHash=${encodedUri}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/html');
    });
  });

  describe('GET /prod-raidenplayer', () => {
    test('should accept image parameter', async () => {
      const validUri = 'https://example.com/video.mp4';
      const encodedUri = Buffer.from(validUri).toString('base64');
      const imageUrl = 'https://example.com/poster.jpg';

      const response = await request(app)
        .get(`/prod-raidenplayer?testHash=${encodedUri}&image=${encodeURIComponent(imageUrl)}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/html');
    });
  });

  describe('GET /proxed', () => {
    test('should handle lulu provider', async () => {
      const validUri = 'https://lulustream.com/e/test123';
      const encodedUri = Buffer.from(validUri).toString('base64');

      const response = await request(app)
        .get(`/proxed?testHash=${encodedUri}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/html');
    });

    test('should return error for unsupported provider', async () => {
      const validUri = 'https://unsupported.com/video';
      const encodedUri = Buffer.from(validUri).toString('base64');

      const response = await request(app)
        .get(`/proxed?testHash=${encodedUri}`)
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Static assets', () => {
    test('serves verification file from root', async () => {
      const response = await request(app)
        .get('/pftn_20e919d06a68d298df24e58758fe9e70.txt')
        .expect(200);

      expect(response.text).toContain('Profiton check: e89161b573595dce09cb9a2d0c2b3698');
      expect(response.headers['content-type']).toMatch(/text\/plain|text\//);
    });
  });
});