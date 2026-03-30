// external imports

// internal imports

// implementation
type StripeStoreFrontPricingTableProductFeature = {
    id: string;
    name: string;
}

type StripeStoreFrontPricingTableProductPrice = {
    id: string;
    currency: string;
    unit_amount: number;
    unit_amount_decimal: string;
}

type StripeStoreFrontPricingTableProduct = {
    id: string;
    title: string;
    description: string;

    price: StripeStoreFrontPricingTableProductPrice;
    features: StripeStoreFrontPricingTableProductFeature[];
}

// exports
export type {
    StripeStoreFrontPricingTableProductFeature,
    StripeStoreFrontPricingTableProductPrice,
    StripeStoreFrontPricingTableProduct,
}