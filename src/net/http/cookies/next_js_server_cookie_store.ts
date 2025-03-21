// external imports
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

// internal imports
import { JWTCookieStoreOptions, SetCookieOptions, CookieStore, JWTCookieStore } from '../../../declarations/net/cookie_declarations';
import { JWT_COOKIE_DEFAULT_NAME, JWT_SET_COOKIE_DEFAULT_OPTIONS } from '../../../constants/net/http/cookie_constants';

import AbstractCookieStore from './abstract_cookie_store';
import { validateSetCookieOptions } from '../../../validators/net/http/cookie_validators';

import { isNil, isString } from '../../../utils/misc/logic_utils';
import { cloneDeep } from '../../../utils/primitives/object_utils';

// implementation
class NextJSServerCookieStore extends AbstractCookieStore implements CookieStore, JWTCookieStore {
    protected parsedCookiesStore: ReadonlyRequestCookies;
    protected options: JWTCookieStoreOptions;

    // @todo Replace Object.assign() with something like mergeDeep
    constructor(options?: JWTCookieStoreOptions) {
        super(options);

        if (!isNil(this.options.jwtSetCookieOptions)) {
            this.options.jwtSetCookieOptions = Object.assign({}, JWT_SET_COOKIE_DEFAULT_OPTIONS, validateSetCookieOptions(this.options.jwtSetCookieOptions));
        } else {
            this.options.jwtSetCookieOptions = cloneDeep(JWT_SET_COOKIE_DEFAULT_OPTIONS);
        }
    }

    protected async parseCookies(): Promise<ReadonlyRequestCookies> {
        if (isNil(this.parsedCookiesStore)) {
            this.parsedCookiesStore = await cookies();
        }

        return this.parsedCookiesStore;
    }

    public async getByName(cookieName: string): Promise<string | undefined> {
        const cookieStore = await this.parseCookies();
        return cookieStore.get(cookieName)?.value;
    }

    public async getJWTResponseCookie(): Promise<string | undefined> {
        return this.getByName(JWT_COOKIE_DEFAULT_NAME);
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
        let newSetCookieOptions: SetCookieOptions;

        if (!isNil(setCookieOptions)) {
            newSetCookieOptions = this.mergeSetCookieOptions(this.options.jwtSetCookieOptions, setCookieOptions);
        }

        await this.setByName(JWT_COOKIE_DEFAULT_NAME, jwtToken, newSetCookieOptions);
    }
}

// exports
export default NextJSServerCookieStore;