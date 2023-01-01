import * as dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';
dotenv.config();

export const PORT = process.env.PORT;
export const ENV = process.env.ENV || 'development';
export const IS_PRODUCTION = ENV === 'production';
export const ORIGIN = [
  'http://localhost:3002',
  'http://localhost:3000',
  'https://next.trymata.com',
  'http://192.168.10.66:3002',
];

export const MATOMO_DB_USER = process.env.MATOMO_DB_USER;
export const MATOMO_DB_PASSWORD = process.env.MATOMO_DB_PASSWORD;
export const MATOMO_DB_DATABASE = process.env.MATOMO_DB_DATABASE;
export const MATOMO_DB_HOST = process.env.MATOMO_DB_HOST;
export const MATOMO_DB_PORT = Number(process.env.MATOMO_DB_PORT) || 3306;

export const TMU_DB_USER = process.env.TMU_DB_USER;
export const TMU_DB_PASSWORD = process.env.TMU_DB_PASSWORD;
export const TMU_DB_DATABASE = process.env.TMU_DB_DATABASE;
export const TMU_DB_HOST = process.env.TMU_DB_HOST;
export const TMU_DB_PORT = Number(process.env.TMU_DB_PORT) || 3306;

export const MAIL_FROM = process.env.MAIL_FROM;

export const SITE_NAME = process.env.SITE_NAME;
export const HOME_URL = process.env.HOME_URL;

export const USE_TEST_JOIN_BUFFER = 30;
export const USE_TEST_FALLBACK_TIME = 15;

export const ENCRYPTION_OPTIONS = {
  iv: process.env.ENCRYPTION_IV,
  key: process.env.ENCRYPTION_KEY,
  alg: process.env.ENCRYPTION_ALGORITHM,
};

export const JWT_CONSTANTS = {
  secret: 'secretKey',
  issuer: 'http://localhost:3000/',
  audience: 'http://localhost:3000/',
  refresh_expire_in: 60 * 60 * 24 * 30,
  refresh_expire_in_long: 60 * 60 * 24 * 30 * 60 * 30,
};
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
export const JWT_BASE_OPTIONS: SignOptions = {
  issuer: JWT_CONSTANTS.issuer,
  audience: JWT_CONSTANTS.audience,
};

export const SESSION_SECRET = process.env.SESSION_SECRET;
