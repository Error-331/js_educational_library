// external imports

// internal imports
import { InstagramServerOptions } from '../../../declarations/vendor/instagram/instagram_base_server_declarations';

import { INSTAGRAM_GRAPH_API_DEFAULT_VERSION } from '../../../constants/net/api/instagram/instagram_common_constants';
import InstagramServerRegistry from '../../../registers/instagram/instagram_server_registry';

import { defaultTo } from '../../../utils/misc/functional_utils';

// implementation
abstract class InstagramAPIServerAbstractFacade {
    protected getInstagramServerOptions(): InstagramServerOptions {
        const instagramServerRegistry = InstagramServerRegistry.getInstance();
        instagramServerRegistry.init();

        return instagramServerRegistry.options;
    }

    protected getDefaultAPIVersion(): string {
        return defaultTo(INSTAGRAM_GRAPH_API_DEFAULT_VERSION)(this.getInstagramServerOptions().version);
    }
}

// exports
export default InstagramAPIServerAbstractFacade;