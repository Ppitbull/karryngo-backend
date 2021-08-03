export enum FinancialTransactionState
{
    FINANCIAL_TRANSACTION_PENDING="financial_transaction_pending",
    FINANCIAL_TRANSACTION_ERROR="financial_transaction_error",
    FINANCIAL_TRANSACTION_SUCCESS="financial_transaction_error",
    FINANCIAL_TRANSACTION_START="financial_transaction_start",
    FINANCIAL_TRANSACTION_PAUSE="financial_transaction_pause"
}

export enum FinancialTransactionType
{
    DEPOSIT="deposit",
    WITHDRAW="withdraw"
}

export enum FinancialTransactionErrorType
{
    BURER_NOT_FOUND_ERROR=-201,
    RECEIVER_NOT_FOUND_ERROR=-202,
    NO_ERROR=0,
    UNKNOW_ERROR=-200,
    INSUFFICIENT_AMOUNT_ERROR=-204
}

export enum PaiementStrategyType
{
    BANK="bank",
    ORANGE_MONEY="orange_money",
    MTN_MONEY="mtn_money",
    CREDIT_CARD="credit_card"
}