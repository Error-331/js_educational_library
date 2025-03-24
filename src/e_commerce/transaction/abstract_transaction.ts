// external imports

// internal imports
import { CurrencyInfo } from '../../declarations/e_commerce/currency_declarations';
import { TransactionAmountType, TransactionType } from '../../declarations/e_commerce/transaction_declarations';

import { isString, isNumber, isObject } from '../../utils/misc/logic_utils';

// implementation
abstract class AbstractTransaction {
    protected _amount: TransactionAmountType;
    protected _currency: CurrencyInfo;

    protected _transactionType: TransactionType;
    protected _description: string;

    protected _dateCreated: Date;
    protected _dateUpdated: Date;

    constructor(amount: TransactionAmountType, currency: CurrencyInfo, transactionType: TransactionType, description: string) {
        if (!isString(amount) && !isNumber(amount)) {
            throw new RangeError('Cannot create a transaction - amount must be either string or number');
        }

        if (!isObject(currency)) {
            throw new RangeError('Cannot create a transaction - currency is not an object');
        }

        if (!isNumber(transactionType)) {
            throw new RangeError('Cannot create a transaction - transaction type is not a number');
        }

        if (!isString(description)) {
            throw new RangeError('Cannot create a transaction - description is not a string');
        }

        this._amount = amount;
        this._currency = currency;
        this._transactionType = transactionType;

        this._description = description;

        this._dateCreated = new Date();
        this._dateUpdated = new Date();
    }

    get amount(): TransactionAmountType {
        return this._amount;
    }

    get currency(): CurrencyInfo {
        return this._currency;
    }

    get transactionType(): TransactionType {
        return this._transactionType;
    }

    get description(): string {
        return this._description;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    get dateUpdated(): Date {
        return this._dateUpdated;
    }
}

// exports
export default AbstractTransaction;