// external imports
import Stripe from 'stripe';

// internal imports
import StripeServerAbstractFacade from '../stripe_server_abstract_facade';
import { isNullOrEmpty } from '../../../../utils/misc/logic_utils';

// implementation
class StripeProductsFacade extends StripeServerAbstractFacade {
    public async loadAllActiveProducts(): Promise<Stripe.Product[]> {
        const stripeInstance = this.getStripeInstance();
        const productsData = await stripeInstance.products.list({ active: true });

        return productsData.data;
    }

    public async loadAllActiveProductFeatures(productId: string): Promise<Stripe.ProductFeature[]> {
        if (isNullOrEmpty(productId)) {
            throw new Error(`Cannot load all product features (Stripe) - product id is not provided`);
        }

        const stripeInstance = this.getStripeInstance();
        const productFeatures = await stripeInstance.products.listFeatures(productId);

        return productFeatures.data;
    }

    public async loadAllProductsFeatures(productIds: string[]): Promise<Stripe.ProductFeature[][]> {
        if (isNullOrEmpty(productIds)) {
            throw new Error(`Cannot load all products features (Stripe) - products ids are not provided`);
        }

        let requestPromises: Promise<Stripe.ProductFeature[]>[] = [];

        for (const productId of productIds) {
            requestPromises.push(this.loadAllActiveProductFeatures(productId));
        }

        return Promise.all(requestPromises);
    }
}

// exports
export default StripeProductsFacade;