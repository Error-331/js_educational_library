// external imports

// internal imports
import {
    DOMWindowCallbackHTMLResponseConfig,
    CommonServerRequest,
    CommonServerResponse,
    CommonServerReturn,
} from '../../../declarations/net/api/common_declarations';

import BaseHTTPServerController from './base_http_server_controller';
import { GenericObject } from '../../../declarations/collection_declarations';

import FormDataTransformer from '../../http/form/form_data_transformer';

import { prepareHTTPResponseData } from '../../../utils/net/http/response_utils';
import { isHTTPError, isValidationError } from '../../../utils/misc/error_utils';
import { isNil, isFunction } from '../../../utils/misc/logic_utils';

// implementation
class BaseAPIServerController extends BaseHTTPServerController {
    static prepareErrorResponse(error: unknown) {
        if (isHTTPError(error) || isValidationError(error)) {
            return prepareHTTPResponseData<undefined>(null, error);
        } else {
            return prepareHTTPResponseData<undefined>(null, Error('Internal server error'));
        }
    }

    static prepareDOMWindowCallbackHTMLResponse<DataType>(config: DOMWindowCallbackHTMLResponseConfig, data: DataType, error?: unknown): string {
        let responseData: string;

        const { title = 'Server response', description = '', callbackName } = config;

        if (!isNil(error)) {
            responseData = JSON.stringify(BaseAPIServerController.prepareErrorResponse(error));
        } else if(isNil(data)) {
            responseData = JSON.stringify(BaseAPIServerController.prepareErrorResponse(new Error('Cannot serve empty data')));
        } else {
            responseData = JSON.stringify(prepareHTTPResponseData<DataType>(data));
        }

        return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
</head>
<body>
${description}
    <script>
            if (window.opener && !window.opener.closed && typeof window.opener['${callbackName}'] === 'function') {
                window.opener['${callbackName}'](${responseData})
            }
    </script>
</body>
</html>`;
    }

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