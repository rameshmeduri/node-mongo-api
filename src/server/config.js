import 'dotenv/config';

const env = process.env;

export default {
  secret: env.AUTH_SECRET || '',
  mongoUrl: env.MONGO_URL || 'mongodb://localhost/API-MANAGER',
  admin_user: env.ADMIN_ACCOUNT_USERNAME || 'admin',
  admin_password: env.ADMIN_ACCOUNT_PASSWORD || 'admin',
  kongApiURL: env.KONG_API_URL || 'http://0.0.0.0:8001',
  kongToken: env.KONG_TOKEN || '',
  currEnv: env.NODE_ENV || 'development',
  port: env.PORT || 8081,
};
