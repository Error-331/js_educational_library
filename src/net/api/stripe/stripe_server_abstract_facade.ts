// external imports

// internal imports
import { StripeServerOptions } from '../../../declarations/vendor/stripe/stripe_base_server_declarations';
import StripeServerRegistry from '../../../registers/stripe/stripe_server_registry';

// implementation
abstract class StripeServerAbstractFacade {
    protected getStripeServerOptions(): StripeServerOptions {
        const strapServerRegistry = StripeServerRegistry.getInstance();
        strapServerRegistry.init();

        return strapServerRegistry.options;
    }

    protected getStripeInstance() {
        const strapServerRegistry = StripeServerRegistry.getInstance();
        strapServerRegistry.init();

        return strapServerRegistry.stripeInstance;
    }
}

// exports
export default StripeServerAbstractFacade;