// external imports
import { z } from 'zod';

// internal imports
import {
    VALIDATION_SET_COOKIE_PRIORITY_ZOD_ENUM,
    VALIDATION_SET_COOKIE_SAME_SITE_ZOD_ENUM
} from '../../../constants/validation/cookie_validation_constants';

// implementation
type SetCookieOptions = {
    /**
     * Domain name for the cookie
     */
    domain?: string;

    /**
     * Expiry date of the cookie in GMT
     */
    expires?: Date;

    /**
     * Flags the cookie to be accessible only by the web server
     */
    httpOnly?: boolean;

    /**
     * Option for setting the expiry time relative to the current time in **milliseconds**
     */
    maxAge?: number;

    /**
     * Path for the cookie
     */
    path?: string;

    /**
     * Marks the cookie to be used with HTTPS only.
     */
    secure?: boolean;

    /**
     * Value of the “SameSite” Set-Cookie attribute.
     * @link https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1.
     */
    sameSite?: z.infer<typeof VALIDATION_SET_COOKIE_SAME_SITE_ZOD_ENUM>;

    /**
     * Value of the “Priority” Set-Cookie attribute.
     * @link https://datatracker.ietf.org/doc/html/draft-west-cookie-priority-00#section-4.3
     */
    priority?: z.infer<typeof VALIDATION_SET_COOKIE_PRIORITY_ZOD_ENUM>;

    /** Marks the cookie to use partitioned storage. */
    partitioned?: boolean;
};

type CookieStoreOptions = {
    setCookieOptions?: SetCookieOptions;
};

type JWTCookieStoreOptions = CookieStoreOptions & {
    jwtSetCookieOptions?: SetCookieOptions;
}

interface CookieStore {
    clearByName(cookieName: string): Promise<void>;

    getByName(cookieName: string): Promise<string | undefined>;
    setByName(cookieName: string, cookieValue: string, setCookieOptions?: SetCookieOptions): Promise<void>;
}

interface JWTCookieStore {
    clearJWTResponseCookie(): Promise<void>;

    getJWTResponseCookie(): Promise<string | undefined>;
    setJWTResponseCookie(jwtToken: string, setCookieOptions?: SetCookieOptions): Promise<void>;
}

// exports
export {
    SetCookieOptions,

    CookieStoreOptions,
    JWTCookieStoreOptions,

    CookieStore,
    JWTCookieStore,
}