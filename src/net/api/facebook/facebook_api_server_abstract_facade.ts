// external imports

// internal imports
import { FACEBOOK_GRAPH_API_DEFAULT_VERSION } from '../../../constants/net/api/facebook/facebook_common_constants';

import { FacebookServerOptions } from '../../../declarations/vendor/facebook/facebook_base_server_declarations';
import FacebookServerRegistry from '../../../registers/facebook/facebook_server_registry';

import { defaultTo } from '../../../utils/misc/functional_utils';

// implementation
abstract class FacebookAPIServerAbstractFacade {
    protected getFacebookServerOptions(): FacebookServerOptions {
        const fbServerRegistry = FacebookServerRegistry.getInstance();
        fbServerRegistry.init();

        return fbServerRegistry.options
    }

    protected getDefaultAPIVersion(): string {
        return defaultTo(FACEBOOK_GRAPH_API_DEFAULT_VERSION)(this.getFacebookServerOptions().version);
    }
}

// exports
export default FacebookAPIServerAbstractFacade;