export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 15;
export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const PASSWORD_SALT_ROUNDS = 12;
export const LOGIN_RATE_LIMIT_MAX = 10;
export const LOGIN_RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const LOCKOUT_AFTER_ATTEMPTS = 5;
export const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;
export const SUSPICIOUS_ATTEMPTS_PER_HOUR = 10;
export const SUSPICIOUS_WINDOW_MS = 60 * 60 * 1000;

export const ACCESS_COOKIE_NAME = "emsel_admin_access";
export const REFRESH_COOKIE_NAME = "emsel_admin_refresh";
export const CSRF_COOKIE_NAME = "emsel_admin_csrf";

export const GENERIC_LOGIN_ERROR_MESSAGE = "E-posta veya sifre hatali";
