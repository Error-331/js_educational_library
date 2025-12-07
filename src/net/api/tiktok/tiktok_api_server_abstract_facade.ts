// external imports

// internal imports
import { TikTokServerOptions } from '../../../declarations/vendor/tiktok/tiktok_base_server_declarations';

import { TIKTOK_OPEN_API_DEFAULT_VERSION } from '../../../constants/net/api/tiktok/tiktok_common_constants';
import TikTokServerRegistry from '../../../registers/tiktok/tiktok_server_registry';

import { defaultTo } from '../../../utils/misc/functional_utils';

// implementation
abstract class TikTokAPIServerAbstractFacade {
    protected getTikTokServerOptions(): TikTokServerOptions {
        const ttServerRegistry = TikTokServerRegistry.getInstance();
        ttServerRegistry.init();

        return ttServerRegistry.options
    }

    protected getDefaultAPIVersion(): string {
        return defaultTo(TIKTOK_OPEN_API_DEFAULT_VERSION)(this.getTikTokServerOptions().version);
    }
}

// exports
export default TikTokAPIServerAbstractFacade;