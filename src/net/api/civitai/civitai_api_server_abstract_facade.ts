// external imports

// internal imports
import type {
    CivitAIAPISimpleErrorResponse,
    CivitAIAPITRPCErrorResponse,
    CivitAIServerOptions
} from '../../../declarations/vendor/civitai/civitai_base_server_declarations';

import CivitAIServerRegistry from '../../../registers/civitai/civitai_server_registry';
import HTTPError from '../../../errors/http_error';

import { CIVITAI_API_DEFAULT_VERSION } from '../../../constants/net/api/civitai/civitai_common_constants';

import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { defaultTo, isString } from '../../../utils/misc/logic_utils';

// implementation
abstract class CivitAIAPIServerAbstractFacade {
    protected getCivitAIServerOptions(): CivitAIServerOptions {
        const civitAIAdminRegistryInstance = CivitAIServerRegistry.getInstance();
        return civitAIAdminRegistryInstance.options;
    }

    protected getAPIToken(): string {
        return this.getCivitAIServerOptions().apiToken;
    }

    protected getDefaultAPIVersion(): string {
        return defaultTo(CIVITAI_API_DEFAULT_VERSION, this.getCivitAIServerOptions().version);
    }

    protected handleFinalError(errorData: unknown, statusCode: number) {
        const tRPCErrorKeysValidators = { code: isString, message: isString };
        const simpleErrorKeysValidators = { error: isString };

        if (isObjectOfType<CivitAIAPITRPCErrorResponse>(errorData, tRPCErrorKeysValidators)) {
            throw new HTTPError(`CvitAI API (tRPC) error: ${errorData.message} (${errorData.code})` , statusCode, true);
        } else if (isObjectOfType<CivitAIAPISimpleErrorResponse>(errorData, simpleErrorKeysValidators)) {
            throw new HTTPError(`CvitAI API error: ${errorData.error}` , statusCode, true);
        } else {
            throw new HTTPError(`CvitAI API (unknown) error` , statusCode, true);
        }
    }
}

// exports
export default CivitAIAPIServerAbstractFacade;