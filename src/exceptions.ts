class AuthenticationFailedError extends Error {
    constructor() {
        super("Error: Venmo authentication failed.");
        this.name = "AuthenticationFailedError";
    }
}

class InvalidAccessKeyError extends Error {
    constructor() {
        super("Error: Venmo key invalid.");
        this.name = "InvalideAccessKeyError";
    }
}

class InvalidHttpMethodError extends Error {
    constructor() {
        super("Error: HTTP method must be 'POST', 'GET', 'PUT' or 'DELETE'.");
        this.name = "InvalidHttpMethodError";
    }
}

class HttpCodeError extends Error {
    constructor(resp: string, msg: string) {
        super(`HTTP request failed with code ${resp}. ${msg}`);
        this.name = `${resp}HttpError`;
    }
}

class NoPaymentMethodFoundError extends Error {
    constructor() {
        super("No valid payment method found.");
        this.name = "NoPaymentMethodFoundError";
    }
}

class AlreadyRemindedPaymentError extends Error {
    constructor(id: number) {
        super(
            `A reminder has already been sent to the recipient of this transaction. Transaction ID: ${id}.`
        );
        this.name = "AlreadyRemindedPaymentError";
    }
}

class NoPendingPaymentToUpdateError extends Error {
    constructor(id: number, action: string) {
        super(
            `There is no *pending* transaction with the specified id: ${id}, to be ${action}ed`
        );
        this.name = "NoPendingPaymentToUpdateError";
    }
}

class NotEnoughBalanceError extends Error {
    constructor(amount: number, target: string) {
        super(
            `Failed to complete ${amount} transaction to ${target}. There is not enough balance on the default payment method. \n Hint: Try using another payment method by specifying fundingSourceId in the \`sendMoney\` method, or transfer money into your default payment method.`
        );
        this.name = "NotEnoughBalanceError";
    }
}

class GeneralPaymentError extends Error {
    constructor(msg: string) {
        super(`Failed to complete transaction. ${msg}`);
        this.name = "GeneralPaymentError.";
    }
}

export {
    AuthenticationFailedError,
    InvalidAccessKeyError,
    InvalidHttpMethodError,
    HttpCodeError,
    NoPaymentMethodFoundError,
    AlreadyRemindedPaymentError,
    NoPendingPaymentToUpdateError,
    NotEnoughBalanceError,
    GeneralPaymentError,
};
