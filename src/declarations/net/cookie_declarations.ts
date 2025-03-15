// external imports

// internal imports

// implementation
type SetCookieOptions = {
    domain?: string;
    expires?: number;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    secure?: boolean;

    /*path: "/",
    domain: "localhost",
    maxAge: 5000,
    httpOnly: true,
    secure: false,*/
};

type CookieStoreOptions = {
    setCookieOptions?: SetCookieOptions;
};

type JWTCookieStoreOptions = CookieStoreOptions & {
    jwtSetCookieOptions?: SetCookieOptions;
}

interface CookieStore {
    getByName(cookieName: string): Promise<string | undefined>;
    setByName(cookieName: string): Promise<void>;
}

interface JWTCookieStore {
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