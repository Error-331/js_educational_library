// external imports

// internal imports
import { SetCookieOptions } from '../../../../src/declarations/net/cookie_declarations';

// implementation
async function cookies() {
    return {
        cookies: {},

        get: function(cookieName: string): string {
            return this.cookies[cookieName];
        },

        set: function (cookieName: string, cookieValue: string, setCookieOptions: SetCookieOptions): void {
            this.cookies[cookieName] = {
                name: cookieName,
                value: cookieValue,
                config: setCookieOptions,

                domain: setCookieOptions?.domain,
                expires: setCookieOptions?.expires,
                httpOnly: setCookieOptions?.httpOnly,
                maxAge: setCookieOptions?.maxAge,
                path: setCookieOptions?.path,
                secure: setCookieOptions?.secure,
                sameSite: setCookieOptions?.sameSite
            }
        }
    };
}

// exports
export {
    cookies,
}