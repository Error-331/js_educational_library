// external imports

// internal imports
import { STRIPE_ZERO_DECIMAL_CURRENCIES_LIST, STRIPE_COMMON_CURRENCY_DIVIDER } from '../../constants/net/api/stripe/stripe_common_constants';
import IntlCurrencyNumberFormatRegistry from '../../registers/intl/intl_currency_number_format_registry';

import { isNullOrEmpty } from '../misc/logic_utils';

// implementation
function formatCurrency(localCode: string, currencyCode: string, amount: number): string {
    if (isNullOrEmpty(localCode)) {
        throw new RangeError('Cannot format currency (Stripe) - locale code is not provided');
    }

    if (isNullOrEmpty(currencyCode)) {
        throw new RangeError('Cannot format currency (Stripe) - currency code is not provided');
    }

    if (isNullOrEmpty(amount)) {
        throw new RangeError('Cannot format currency (Stripe) - currency amount is not provided');
    }

    const numberFormatRegistry = IntlCurrencyNumberFormatRegistry.getInstance();
    const currentNumberFormat = numberFormatRegistry.getNumberFormat(localCode, currencyCode);

    let divider = STRIPE_COMMON_CURRENCY_DIVIDER;

    if (STRIPE_ZERO_DECIMAL_CURRENCIES_LIST.includes(currencyCode.toUpperCase())) {
        divider = 1;
    }

    return currentNumberFormat.format(amount / divider);
}

// exports
export {
    formatCurrency
}