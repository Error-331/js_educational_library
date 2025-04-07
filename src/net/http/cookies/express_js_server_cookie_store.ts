// external imports
import { Request, Response } from 'express';

// internal imports
import {
    SetCookieOptions,
    CookieStore,
    JWTCookieStore,
    JWTCookieStoreOptions
} from '../../../declarations/net/http/cookie_declarations';
import AbstractJWTCookieStore from './abstract_jwt_cookie_store';

import { isNil, isString } from '../../../utils/misc/logic_utils';
import { cloneDeep } from '../../../utils/primitives/object_utils';

// implementation
class ExpressJSServerCookieStore extends AbstractJWTCookieStore implements CookieStore, JWTCookieStore {
    protected request: Request
    protected response: Response;

    constructor(req: Request, res: Response, options?: JWTCookieStoreOptions) {
        super(options);

        this.request = req;
        this.response = res;
    }

    public async clearByName(cookieName: string): Promise<void> {
        this.response.clearCookie(cookieName);
    }

    public async getByName(cookieName: string): Promise<string | undefined> {
        return this.request.cookies?.[cookieName];
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

        this.response.cookie( cookieName, cookieValue, newSetCookieOptions)
    }
}

// exports
export default ExpressJSServerCookieStore;