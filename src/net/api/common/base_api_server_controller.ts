// external imports

// internal imports
import { CommonServerRequest, CommonServerResponse, CommonServerReturn } from '../../../declarations/net/api/common_declarations';

import HTTPError from '../../../errors/http_error';
import ValidationError from '../../../errors/validation_error';

import { GenericObject } from '../../../declarations/collection_declarations';
import { SerializableError } from '../../../declarations/error/general_error_declarations';

import FormDataTransformer from '../../http/form/form_data_transformer';

import { prepareHTTPResponseData } from '../../../utils/net/http/response_utils';
import { isNil, isString, isFunction } from '../../../utils/misc/logic_utils';

// implementation
class BaseAPIServerController {
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
            return BaseAPIServerController.serveJSONData(req, res, prepareHTTPResponseData<undefined>(null, new HTTPError(error, code)), code);
        } else {
            return BaseAPIServerController.serveJSONData(req, res, prepareHTTPResponseData<undefined>(null, error), code);
        }
    }

    static serveEmptyData(req: CommonServerRequest, res: CommonServerResponse, code?: number): CommonServerReturn {
        res.status(code).send();
        return;
    }

    static serveData<DataType = unknown>(req: CommonServerRequest, res: CommonServerResponse, data: DataType, code?: number): CommonServerReturn {
        return BaseAPIServerController.serveJSONData(req, res, prepareHTTPResponseData<DataType>(data), code);
    }

    static handleThrownError(req: CommonServerRequest, res: CommonServerResponse, error: unknown): CommonServerReturn {
        if (error instanceof HTTPError) {
            return this.serveError(req, res, error.httpCode, error);
        } else if (error instanceof ValidationError) {
            return this.serveError(req, res, 400, error);
        } else {
            return this.serveError(req, res, 500, new Error('Internal server error'));
        }
    }

    // TODO: do something with req?.formData
    static async extractFormData(req: CommonServerRequest): Promise<GenericObject> {
        if ('formData' in req && isFunction(req?.formData)) {
            const currentFormData = await req.formData();
            const formDataTransformer = new FormDataTransformer(currentFormData);

            return formDataTransformer.toObject();
        } else {
            return {};
        }
    }
}

// exports
export default BaseAPIServerController;