// external imports

// internal imports
import { CurrencyInfo } from '../../declarations/e_commerce/currency_declarations';
import AbstractCurrency from './abstract_currency';

import { isString, isNumber } from '../../utils/misc/logic_utils';

// implementation
class ISO4217Currency extends AbstractCurrency implements CurrencyInfo {
    private _alphabeticCode: string;
    private _numericCode: number;

    constructor(name: string, alphabeticCode: string, numericCode: number, description?: string) {
        super(name, description);

        this.alphabeticCode = alphabeticCode;
        this.numericCode = numericCode;
    }

    get alphabeticCode(): string {
        return this._alphabeticCode;
    }

    get numericCode(): number {
        return this._numericCode;
    }

    get code(): string {
        return this.alphabeticCode;
    }

    set alphabeticCode(code: string) {
        if (!isString(code)) {
            throw new RangeError('Cannot set alphabetic code for currency - code is not a string');
        }

        this._alphabeticCode = code;
    }

    set numericCode(code: number) {
        if (!isNumber(code)) {
            throw new RangeError('Cannot set numeric code for currency - code is not a number');
        }

        this._numericCode = code;
    }
}

// exports
export default ISO4217Currency;