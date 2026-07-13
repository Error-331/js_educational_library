// external imports

// internal imports

// implementation
import { JWTCookieStoreOptions } from '../../../../declarations/net/http/cookie_declarations';
import { CommonServerRequest, CommonServerResponse } from '../../../../declarations/net/api/common_declarations';

import { ServerFrameworkVendorName } from '../../../../constants/vendor_constants';

import ExpressJSServerCookieStore from '../stores/express_js_server_cookie_store';
//import NextJSServerCookieStore from '../stores/next_js_server_cookie_store';

import { isEnumContainsValue } from '../../../../utils/type/enum_utils';
import { isString } from '../../../../utils/misc/logic_utils';

class CookieStoreFactory {
    public create(vendorName: ServerFrameworkVendorName, req: CommonServerRequest, res: CommonServerResponse, cookieOptions?: JWTCookieStoreOptions) {
        switch (vendorName) {
            case ServerFrameworkVendorName.ExpressJS:
                return new ExpressJSServerCookieStore(req, res, cookieOptions);
            case ServerFrameworkVendorName.NextJS:
                throw new Error('NextJS cookie store temporary unavailable');
                break;
                //return new NextJSServerCookieStore();
            default:
                throw new RangeError(`Cannot create cookie store - unknown vendor name "${vendorName}"`);
        }
    }

    public determineVendorAndCreate(req: CommonServerRequest, res: CommonServerResponse, cookieOptions?: JWTCookieStoreOptions) {
        if (!isString(process.env.JSEL_SERVER_FRAMEWORK_VENDOR_NAME)) {
            throw new RangeError('Cannot create cookie store - vendor name is not provided')
        }

        if (!isEnumContainsValue<ServerFrameworkVendorName>(ServerFrameworkVendorName, process.env.JSEL_SERVER_FRAMEWORK_VENDOR_NAME)) {
            throw new RangeError(`Cannot create cookie store - unknown vendor name "${process.env.JSEL_SERVER_FRAMEWORK_VENDOR_NAME}" (env variable)`);
        }

        return this.create(process.env.JSEL_SERVER_FRAMEWORK_VENDOR_NAME, req, res, cookieOptions);
    }
}

// exports
export default CookieStoreFactory;