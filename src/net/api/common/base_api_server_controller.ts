// external imports

// internal imports
import { CommonServerRequest, CommonServerResponse, CommonServerReturn } from '../../../declarations/net/api/common_declarations';

import BaseHTTPServerController from './base_http_server_controller';

import { GenericObject } from '../../../declarations/collection_declarations';
import FormDataTransformer from '../../http/form/form_data_transformer';

import { isHTTPError, isValidationError } from '../../../utils/misc/error_utils';
import { isFunction } from '../../../utils/misc/logic_utils';

// implementation
class BaseAPIServerController extends BaseHTTPServerController {
    static handleThrownError(req: CommonServerRequest, res: CommonServerResponse, error: unknown): CommonServerReturn {
        if (isHTTPError(error)) {
            return this.serveError(req, res, error.httpCode, error);
        } else if (isValidationError(error)) {
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
            return req.body;
        }
    }
}

// exports
export default BaseAPIServerController;