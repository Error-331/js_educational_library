// external imports

// internal imports
import { JWTCookieStoreOptions, SetCookieOptions } from '../../../declarations/net/http/cookie_declarations';
import AbstractCookieStore from './abstract_cookie_store';

import { JWT_COOKIE_DEFAULT_NAME, JWT_SET_COOKIE_DEFAULT_OPTIONS } from '../../../constants/net/http/cookie_constants';
import { validateSetCookieOptions } from '../../../validators/net/http/cookie_validators';

import { cloneDeep } from '../../../utils/primitives/object_utils';
import { isNil } from '../../../utils/misc/logic_utils';

// implementation
abstract class AbstractJWTCookieStore extends AbstractCookieStore<JWTCookieStoreOptions> {
    // @todo Replace Object.assign() with something like mergeDeep
    constructor(options?: JWTCookieStoreOptions) {
        super(options);

        if (!isNil(this.options.jwtSetCookieOptions)) {
            this.options.jwtSetCookieOptions = Object.assign({}, JWT_SET_COOKIE_DEFAULT_OPTIONS, validateSetCookieOptions(this.options.jwtSetCookieOptions));
        } else {
            this.options.jwtSetCookieOptions = cloneDeep(JWT_SET_COOKIE_DEFAULT_OPTIONS);
        }
    }

    public async clearJWTResponseCookie(): Promise<void> {
        await this.clearByName(JWT_COOKIE_DEFAULT_NAME);
    }

    public async getJWTResponseCookie(): Promise<string | undefined> {
        return this.getByName(JWT_COOKIE_DEFAULT_NAME);
    }

    public async setJWTResponseCookie(jwtToken: string, setCookieOptions?: SetCookieOptions): Promise<void> {
        let newSetCookieOptions: SetCookieOptions = cloneDeep(this.options.jwtSetCookieOptions);

        if (!isNil(setCookieOptions)) {
            newSetCookieOptions = this.mergeSetCookieOptions(newSetCookieOptions, setCookieOptions);
        }

        await this.setByName(JWT_COOKIE_DEFAULT_NAME, jwtToken, newSetCookieOptions);
    }
}

// exports
export default AbstractJWTCookieStore;