describe('Logger', () => {
    const originalEnv = process.env.NODE_ENV;
    let consoleSpy: jest.SpyInstance;
  
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
  
    afterEach(() => {
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  
    test('should log debug messages in development mode', () => {
      process.env.NODE_ENV = 'development';
      
      // Recargar el módulo con el nuevo NODE_ENV
      jest.resetModules();
      const { Logger } = require('../../src/embed-serv');
  
      Logger.debug('Test message');
      
      expect(consoleSpy).toHaveBeenCalled();
    });
  
    test('should not log debug messages in production mode', () => {
      process.env.NODE_ENV = 'production';
      
      jest.resetModules();
      const { Logger } = require('../../src/embed-serv');
  
      Logger.debug('Test message');
      
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  
    test('should always log info messages', () => {
      process.env.NODE_ENV = 'production';
      
      jest.resetModules();
      const { Logger } = require('../../src/embed-serv');
  
      Logger.info('Test info');
      
      expect(consoleSpy).toHaveBeenCalled();
    });
  });