// external imports

// internal imports

// implementation
type TransactionAmountType = number | string;

enum TransactionType {
    // expense
    Debit = 1,

    // income
    Credit = 2,
}

// exports
export {
    TransactionAmountType,
    TransactionType,
}