// external imports

// internal imports
import { CommonServerRequest, CommonServerResponse, CommonServerReturn } from '../../../declarations/net/api/common_declarations'

import { JWTCookieStoreOptions } from '../../../declarations/net/http/cookie_declarations';
import { SerializableError } from '../../../declarations/error/general_error_declarations';

import HTTPError from '../../../errors/http_error';
import CookieStoreFactory from '../../http/cookies/factories/cookies_store_factory';

import { prepareHTTPResponseData } from '../../../utils/net/http/response_utils';
import { isNil, isString } from '../../../utils/misc/logic_utils';


// implementation
class BaseHTTPServerController {
    static createFrameworkCookieStore(req: CommonServerRequest, res: CommonServerResponse, cookieOptions?: JWTCookieStoreOptions) {
        const cookieStoreFactory = new CookieStoreFactory();
        return cookieStoreFactory.determineVendorAndCreate(req, res, cookieOptions);
    }

    static serveJSONData(req: CommonServerRequest, res: CommonServerResponse, data: object, status: number = 200): CommonServerReturn {
        if (isNil(res)) {
            return new Response(JSON.stringify(data), {
                status,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } else {
            res.status(status).send(data);
            return;
        }
    }

    static serveError(req: CommonServerRequest, res: CommonServerResponse, code: number, error: Error | SerializableError | string): CommonServerReturn {
        if (isString(error)) {
            return BaseHTTPServerController.serveJSONData(req, res, prepareHTTPResponseData<undefined>(null, new HTTPError(error, code)), code);
        } else {
            return BaseHTTPServerController.serveJSONData(req, res, prepareHTTPResponseData<undefined>(null, error), code);
        }
    }

    static serverNotAcceptable406Error(req: CommonServerRequest, res: CommonServerResponse) {
        BaseHTTPServerController.serveError(req, res, 406, 'Not Acceptable');
    }

    static serveEmptyData(req: CommonServerRequest, res: CommonServerResponse, code?: number): CommonServerReturn {
        res.status(code).send();
        return;
    }

    static serveData<DataType = unknown>(req: CommonServerRequest, res: CommonServerResponse, data: DataType, code?: number): CommonServerReturn {
        return BaseHTTPServerController.serveJSONData(req, res, prepareHTTPResponseData<DataType>(data), code);
    }
}

// exports
export default BaseHTTPServerController;