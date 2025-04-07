// external imports
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

// internal imports
import { SetCookieOptions, CookieStore, JWTCookieStore } from '../../../declarations/net/http/cookie_declarations';
import AbstractJWTCookieStore from './abstract_jwt_cookie_store';

import { JWT_COOKIE_DEFAULT_NAME } from '../../../constants/net/http/cookie_constants';

import { isNil, isString } from '../../../utils/misc/logic_utils';
import { cloneDeep } from '../../../utils/primitives/object_utils';
import { prepareFormattedUTCDateFromNow } from '../../../utils/date/native_date_utils';

// implementation
class NextJSServerCookieStore extends AbstractJWTCookieStore implements CookieStore, JWTCookieStore {
    protected parsedCookiesStore: ReadonlyRequestCookies;

    protected async parseCookies(): Promise<ReadonlyRequestCookies> {
        if (isNil(this.parsedCookiesStore)) {
            this.parsedCookiesStore = await cookies();
        }

        return this.parsedCookiesStore;
    }

    public async clearByName(cookieName: string): Promise<void> {
        const cookieStore = await this.parseCookies();
        cookieStore.delete(cookieName);
    }

    public async getByName(cookieName: string): Promise<string | undefined> {
        const cookieStore = await this.parseCookies();
        return cookieStore.get(cookieName)?.value;
    }

    /**
     * Method that sets/modifies the cookie (via 'Set-Cookie' headers).
     *
     * @param {string} cookieName - cookie name to be set/modified.
     * @param {string} cookieValue - new cookie value.
     * @param {SetCookieOptions} setCookieOptions - cookie options that will override default ones (@see {@link this.options.setCookieOptions})
     *
     * @throws {ValidationError} if provided cookie options are not valid.
     *
     */

    public async setByName(cookieName: string, cookieValue: string, setCookieOptions?: SetCookieOptions): Promise<void> {
        let newSetCookieOptions: SetCookieOptions = cloneDeep(this.options.setCookieOptions);

        if (!isString(cookieName)) {
            throw new RangeError('Cannot set cookie by name - cookie name must be of type string');
        }

        if (!isString(cookieValue)) {
            throw new RangeError('Cannot set cookie by name - cookie value must be of type string');
        }

        if (!isNil(setCookieOptions)) {
            newSetCookieOptions = this.mergeSetCookieOptions(newSetCookieOptions, setCookieOptions);
        }

        const cookieStore = await this.parseCookies();
        cookieStore.set(cookieName, cookieValue, newSetCookieOptions);
    }

    public async setJWTResponseCookie(jwtToken: string, setCookieOptions?: SetCookieOptions): Promise<void> {
        let newSetCookieOptions: SetCookieOptions = cloneDeep(this.options.jwtSetCookieOptions);

        if (!isNil(setCookieOptions)) {
            newSetCookieOptions = this.mergeSetCookieOptions(newSetCookieOptions, setCookieOptions);
        }

        if (!isNil(newSetCookieOptions.expires) && !isNil(newSetCookieOptions.maxAge) && newSetCookieOptions.maxAge > 0) {
            newSetCookieOptions.expires = new Date(prepareFormattedUTCDateFromNow(newSetCookieOptions.maxAge * -1000));
        }

        await this.setByName(JWT_COOKIE_DEFAULT_NAME, jwtToken, newSetCookieOptions);
    }
}

// exports
export default NextJSServerCookieStore;