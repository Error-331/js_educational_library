// external imports
import Stripe from 'stripe';

// internal imports
import type { StripeStoreFrontPricingTableProduct } from '../../../declarations/vendor/stripe/stripe_storefront_declarations';

import StripeServerAbstractFacade from './stripe_server_abstract_facade';
import StripeProductsFacade from './entities/stripe_products_facade';
import StripePricesFacade from './entities/stripe_prices_facade';

import { pick } from '../../../utils/primitives/object_utils';
import { isNil, isNullOrEmpty } from '../../../utils/misc/logic_utils.js';

// implementation
class StripeStorefrontFacade extends StripeServerAbstractFacade {
    public async loadPricingTable(): Promise<StripeStoreFrontPricingTableProduct[]> {
        const productsFacade = new StripeProductsFacade();
        const pricesFacade = new StripePricesFacade();

        const [activeProducts, activePrices] = await Promise.all([productsFacade.loadAllActiveProducts(), pricesFacade.loadAllActivePrices()]);

        if (isNullOrEmpty(activeProducts)) {
            return [];
        }

        const productsFeatures = await productsFacade.loadAllProductsFeatures(activeProducts.map(activeProduct => activeProduct.id));
        const pricingTable: StripeStoreFrontPricingTableProduct[] = [];

        for (let activeProductIndex = 0; activeProductIndex < activeProducts.length; activeProductIndex++) {
            const activeProduct = activeProducts[activeProductIndex];

            const productData = pick<Stripe.Product, 'id' | 'name' | 'description'>(activeProduct, ['id', 'name', 'description']);
            const activePrice = activePrices.find((price) => price.product === activeProduct.id);

            if (isNil(activePrice)) {
                throw new Error(`Cannot prepare pricing table (Stripe) - active price for product "${activeProduct.id}" not found`);
            }

            const productPrice = pick<Stripe.Price, 'id' | 'currency' | 'unit_amount' | 'unit_amount_decimal'>(activePrice, ['id', 'currency', 'unit_amount', 'unit_amount_decimal']);
            const productFeatures = productsFeatures[activeProductIndex];

            const pricingTableItem: StripeStoreFrontPricingTableProduct = Object.assign({}, {
                id: productData.id,
                title: productData.name,
                description: productData.description,
                price: productPrice,
                features: []
            })

            if (!isNullOrEmpty(productFeatures)) {
                pricingTableItem.features = productFeatures.map(({ entitlement_feature }) => ({
                    id: entitlement_feature.id,
                    name: entitlement_feature.name,
                }));
            }

            pricingTable.push(pricingTableItem);
        }

        return pricingTable;
    }
}

// exports
export default StripeStorefrontFacade;