// external imports

// internal imports
import { isNil, isString, isNumber } from '../../utils/misc/logic_utils';

type TransactionAmountType = number | string;

enum TransactionType {
    // expense
    Debit = 1,

    // income
    Credit = 2,
}

interface CurrencyInfo {
    get name(): string;
    get description(): string;
    get code(): string;
}

// implementation
abstract class AbstractTransaction {
    protected amount: TransactionAmountType;
    protected currency: CurrencyInfo;

    protected dateCreated: Date;
    protected dateUpdated: Date;

    protected transactionType: TransactionType;
    protected description: string;

    constructor(amount: TransactionAmountType, currency: CurrencyInfo, transactionType: TransactionType, description: string) {

    }
}

// exports
export default AbstractTransaction;