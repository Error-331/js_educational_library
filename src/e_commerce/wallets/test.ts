interface BalanceTransfer {

}

/**
 * Keeps the account balance of the merchant (bayer).
 */

abstract class AbstractWallet {

}

/**
 * Accepts payment events from users.
 */

abstract class AbstractPaymentService {
    public abstract placeOrder();
}

/**
 * Executes a single payment order via Payment Service Provider (PSP) gateway.
 */

abstract class AbstractPaymentExecutor {

}

/**
 * Moves funds from one external account to another
 */

abstract class AbstractPSPGateway {

}

/**
 * Keeps financial record of payment transaction.
 */

abstract class AbstractLedger {

}


/*
Payment service
 - risk check
 - compilance regulations

Payment executor
 - executes payment oreder via Payment Service Provider (PSP)
 - may contain several payment orders

Payment Serivce Provider (PSP)
 - moves money between accoutns

Card schemes

Ledger

"when user pays the seller $1 we record debit $1 from the user and credit $1 to the seller"

Wallet

Keeps the account balance of the merchant
may record how much a given user has paid in total

Flow of the order

- user clicks place order button
- the payment service stores the payment in the database
- single payment may contain several payment orders (products from multiple sellers)
- payment executor stores the payment order in the database
- payment executor calls PSP to process the credit card payment
- after the payment executor has successfully processed the paymen, the payment service updates the wallet to record how mouch money a given seller has
- the wallet server stores the updated balance information in the database
- after the wallet service has succesfully udpated the sellers balance information the payemnt service clls the ledger to update it.
- the ledger servcie appends the new ledger information to the database
 */