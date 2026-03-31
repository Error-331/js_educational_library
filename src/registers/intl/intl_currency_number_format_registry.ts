// external imports

// internal imports
import { isNullOrEmpty } from './../../utils/misc/logic_utils.js';

// implementation
class IntlCurrencyNumberFormatRegistry {
    private static instance: IntlCurrencyNumberFormatRegistry;

    private numberFormats: Map<string, Intl.NumberFormat> = new Map();

    private constructor() {}

    public static getInstance(): IntlCurrencyNumberFormatRegistry {
        if (!IntlCurrencyNumberFormatRegistry.instance) {
            IntlCurrencyNumberFormatRegistry.instance = new IntlCurrencyNumberFormatRegistry();
        }

        return IntlCurrencyNumberFormatRegistry.instance;
    }

    public getNumberFormat(localCode: string, currencyCode: string): Intl.NumberFormat {
        if (isNullOrEmpty(localCode)) {
            throw new RangeError('Cannot retrieve currency number format - locale code is not provided');
        }

        if (isNullOrEmpty(currencyCode)) {
            throw new RangeError('Cannot retrieve currency number format - currency code is not provided');
        }

        const preparedLocalCode = localCode.toLowerCase();
        const preparedCurrencyCode = currencyCode.toLowerCase();

        const numberFormatKey = `${preparedLocalCode}_${preparedCurrencyCode}`;

        if (this.numberFormats.has(numberFormatKey)) {
            return this.numberFormats.get(numberFormatKey);
        } else {
            const numberFormat = new Intl.NumberFormat(localCode, { style: 'currency', currency: currencyCode });
            this.numberFormats.set(numberFormatKey, numberFormat);

            return numberFormat;
        }
    }
}

// exports
export default IntlCurrencyNumberFormatRegistry;