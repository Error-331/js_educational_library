// external imports

// internal imports

// implementation
// https://docs.stripe.com/currencies
const STRIPE_ZERO_DECIMAL_CURRENCIES_LIST = [
    'BIF',
    'CLP',
    'DJF',
    'GNF',
    'JPY',
    'KMF',
    'KRW',
    'MGA',
    'PYG',
    'RWF',
    'UGX',
    'VND',
    'VUV',
    'XAF',
    'XOF',
    'XPF',
];

const STRIPE_COMMON_CURRENCY_DIVIDER = 100;

// exports
export {
    STRIPE_ZERO_DECIMAL_CURRENCIES_LIST,
    STRIPE_COMMON_CURRENCY_DIVIDER,
}
