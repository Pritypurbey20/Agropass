import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DB_HOST,
  JWT_SECRET,
  JWT_COOKIE_EXPIRES_IN,
  ATLAS_HOST,
  ATLAS_USERNAME,
  ATLAS_PASSWORD,
  ATLAS_DB,
  EMAIL_HOST,
  EMAIL_PASS,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_HOST,
  SMTP_PORT,
  SWAGGER_PASSWORD,
  RESET_PASSWORD_ENDPOINT
} = process.env;

