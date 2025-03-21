// external imports

// internal imports

// implementation
type SetCookieOptions = {
    domain?: string;
    expires?: string;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: boolean;
};

type CookieStoreOptions = {
    setCookieOptions?: SetCookieOptions;
};

type JWTCookieStoreOptions = CookieStoreOptions & {
    jwtSetCookieOptions?: SetCookieOptions;
}

interface CookieStore {
    getByName(cookieName: string): Promise<string | undefined>;
    setByName(cookieName: string, cookieValue: string, setCookieOptions?: SetCookieOptions): Promise<void>;
}

interface JWTCookieStore {
    getJWTResponseCookie(): Promise<string | undefined>;
    setJWTResponseCookie(jwtToken: string): Promise<void>;
}

// exports
export {
    SetCookieOptions,

    CookieStoreOptions,
    JWTCookieStoreOptions,

    CookieStore,
    JWTCookieStore,
}