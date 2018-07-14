import { createLogger } from '@axa-asia/api-common';

const logger = createLogger({
  moduleName: 'api-access-manager',
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
});

export default logger;
