// external imports
import Stripe from 'stripe';

// internal imports
import type { GenericObject } from '../../../../declarations/collection_declarations';
import StripeServerAbstractFacade from '../stripe_server_abstract_facade';

import { isNullOrEmpty } from '../../../../utils/misc/logic_utils.js';

// implementation
class StripePricesFacade extends StripeServerAbstractFacade {
    public async loadPriceById(id: string): Promise<Stripe.Price | null> {
        if (isNullOrEmpty(id)) {
            throw new Error(`Cannot load price by id (Stripe) - id is not provided`);
        }

        const stripeInstance = this.getStripeInstance();
        return stripeInstance.prices.retrieve(id);
    }

    public async loadPriceByKey(lookUpKey: string, options: GenericObject = {}): Promise<Stripe.Price | null> {
        if (isNullOrEmpty(lookUpKey)) {
            throw new Error(`Cannot load price by key (Stripe) - lookup key is not provided`);
        }

        const stripeInstance = this.getStripeInstance();
        const pricesList = await stripeInstance.prices.list({
            ...options,
            lookup_keys: [lookUpKey],
        });

        return pricesList.data.length > 0 ? pricesList.data[0] : null;
    }

    public async loadAllActivePrices(): Promise<Stripe.Price[]> {
        const stripeInstance = this.getStripeInstance();
        const prices = await stripeInstance.prices.list({ active: true });

        return prices.data;
    }
}

// exports
export default StripePricesFacade;