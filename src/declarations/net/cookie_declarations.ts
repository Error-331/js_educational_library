// external imports

// internal imports

// implementation
type SetCookieOptions = {
    domain?: string;
    expires?: Date;
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
    clearByName(cookieName: string): Promise<void>;

    getByName(cookieName: string): Promise<string | undefined>;
    setByName(cookieName: string, cookieValue: string, setCookieOptions?: SetCookieOptions): Promise<void>;
}

interface JWTCookieStore {
    clearJWTResponseCookie(): Promise<void>;

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