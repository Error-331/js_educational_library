// external imports

// internal imports
import { SetCookieOptions } from '../../../declarations/net/http/cookie_declarations';

// implementation
const JWT_COOKIE_DEFAULT_MAX_AGE = 60 * 59; // 59 minutes (in seconds)
const JWT_COOKIE_DEFAULT_NAME = '__session';

const SET_COOKIE_DEFAULT_OPTIONS: SetCookieOptions = {
    httpOnly: false,
}

const JWT_SET_COOKIE_DEFAULT_OPTIONS: SetCookieOptions = {
    ...SET_COOKIE_DEFAULT_OPTIONS,

    path: '/',
    maxAge: JWT_COOKIE_DEFAULT_MAX_AGE,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
}

const JWT_SET_COOKIE_UNSECURE_OPTIONS: SetCookieOptions = {
    ...JWT_SET_COOKIE_DEFAULT_OPTIONS,
    httpOnly: false,
    secure: false,
}

const JWT_SET_COOKIE_LOCALHOST_OPTIONS: SetCookieOptions = {
    ...JWT_SET_COOKIE_DEFAULT_OPTIONS,

    domain: 'localhost',
    secure: false,
}

// exports
export {
    JWT_COOKIE_DEFAULT_MAX_AGE,
    JWT_COOKIE_DEFAULT_NAME,

    SET_COOKIE_DEFAULT_OPTIONS,

    JWT_SET_COOKIE_DEFAULT_OPTIONS,
    JWT_SET_COOKIE_UNSECURE_OPTIONS,
    JWT_SET_COOKIE_LOCALHOST_OPTIONS,
}

