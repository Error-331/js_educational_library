// external imports

// internal imports
import { CookieStore, SetCookieOptions } from '../../../../../declarations/net/cookie_declarations';

// implementation
function cookieConfigAccessorByName(cookieStore: CookieStore, cookieName: string): SetCookieOptions {
    return cookieStore['parsedCookiesStore']['cookies'][cookieName]['config'];
}

async function checkCookieByName(
    cookieStore: CookieStore,
    cookieName: string,
    cookieValue: string,
    cookieOptions: SetCookieOptions,
    cookieConfigAccessor: typeof cookieConfigAccessorByName) {
    const storedCookieValue = await cookieStore.getByName(cookieName);

    expect(storedCookieValue).toEqual(cookieValue);
    expect(cookieConfigAccessor(cookieStore, cookieName)).toEqual(cookieOptions);
}

// exports
export {
    cookieConfigAccessorByName,
    checkCookieByName,
}
