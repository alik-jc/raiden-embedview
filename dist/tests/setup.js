"use strict";
// Setup global para todos los tests
process.env.NODE_ENV = 'test';
process.env.SRV_URI = '3001';
process.env.HASH = 'testHash';
process.env.USER_AGENT = 'Mozilla/5.0 Test Agent';
// Mock de console para evitar spam en tests
global.console = Object.assign(Object.assign({}, console), { log: jest.fn(), debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() });
