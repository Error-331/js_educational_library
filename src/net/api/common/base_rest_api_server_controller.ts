// external imports

// internal imports
import BaseAPIServerController from './base_api_server_controller';

import { createAndThrowValidationError } from '../../../utils/misc/validation_utils';
import { validateRESTPage, validateRESTLimit } from '../../../validators/net/rest/rest_common_validators';

// implementation
class BaseRESTAPIServerController extends BaseAPIServerController{
    static validatePageOrThrowError(page?: unknown | string | number): number {
        const pageValidationResult = validateRESTPage(page);

        if (!pageValidationResult.success) {
            createAndThrowValidationError(pageValidationResult);
        } else {
            return pageValidationResult.data;
        }
    }

    static validateLimitOrThrowError(limit?: unknown | string | number): number {
        const limitValidationResult = validateRESTLimit(limit);

        if (!limitValidationResult.success) {
            createAndThrowValidationError(limitValidationResult)
        } else {
            return limitValidationResult.data;
        }
    }
}

// exports
export default BaseRESTAPIServerController;