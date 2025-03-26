// external imports

// internal imports
import { SetCookieOptions, CookieStoreOptions } from '../../../declarations/net/cookie_declarations';
import { SET_COOKIE_DEFAULT_OPTIONS } from '../../../constants/net/http/cookie_constants';

import { validateSetCookieOptions } from '../../../validators/net/http/cookie_validators';
import { isNil, defaultTo } from '../../../utils/misc/logic_utils';
import { cloneDeep } from '../../../utils/primitives/object_utils';

// implementation
/**
 * Abstract class that represents a cookie store and implements some utility methods.
 * @class
 *
 * @template OptionsType
 *
 */
abstract class AbstractCookieStore<OptionsType = CookieStoreOptions> {
    protected options: OptionsType;

    /**
     * Cookie store constructor.
     * Constructor accepts the cookie options object and merges it with default cookie options @see {@link SET_COOKIE_DEFAULT_OPTIONS}.
     * If no cookie options are provided - default values will be used @see {@link SET_COOKIE_DEFAULT_OPTIONS}.
     *
     * @param {CookieStoreOptions} options - cookie configuration object.

     * @throws {ValidationError} if provided cookie options are not valid.
     *
     * @todo Replace Object.assign() with something like mergeDeep
     *
     */
    constructor(options?: OptionsType) {
        this.options = defaultTo<OptionsType, OptionsType>({}, options);

        if (!isNil(this.options.setCookieOptions)) {
            this.options.setCookieOptions =  Object.assign({}, SET_COOKIE_DEFAULT_OPTIONS, validateSetCookieOptions(this.options.setCookieOptions));
        } else {
            this.options.setCookieOptions = cloneDeep(SET_COOKIE_DEFAULT_OPTIONS);
        }
    }

    /**
     * Utility method that merges two cookie configuration objects into one.
     *
     * @param {SetCookieOptions} originalOptions - cookie configuration object which properties will be augmented/overridden by 'additionalOptions' parameter.
     * @param {SetCookieOptions} additionalOptions - cookie configuration object which properties will be used to augment/override the options in 'originalOptions' parameter.
     *
     * @throws {ValidationError} if any of provided cookie options are not valid.
     *
     * @returns {SetCookieOptions} merged cookie options.
     *
     * @todo Replace Object.assign() with something like mergeDeep
     *
     */

    protected mergeSetCookieOptions(originalOptions: SetCookieOptions, additionalOptions: SetCookieOptions): SetCookieOptions {
        const originalOptionsCopy = validateSetCookieOptions(originalOptions);
        const additionalOptionsCopy = validateSetCookieOptions(additionalOptions);

        return Object.assign({}, originalOptionsCopy, additionalOptionsCopy);
    }

    public abstract clearByName(cookieName: string): Promise<void>;
    public abstract getByName(cookieName: string): Promise<string | undefined>;

    /**
     * Method that sets/modifies the cookie (via 'Set-Cookie' headers).
     *
     * @param {string} cookieName - cookie name to be set/modified.
     * @param {string} cookieValue - new cookie value.
     * @param {SetCookieOptions} setCookieOptions - cookie options that will override default ones (@see {@link this.options.setCookieOptions})
     *
     */

    public abstract setByName(cookieName: string, cookieValue: string, setCookieOptions?: SetCookieOptions): Promise<void>;
}

// exports
export default AbstractCookieStore;