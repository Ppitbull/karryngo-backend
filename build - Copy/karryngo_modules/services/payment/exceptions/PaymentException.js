"use strict";
/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentException = void 0;
const KarryngoException_1 = require("../../../../karryngo_core/exception/KarryngoException");
class PaymentException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Payment " + description, description);
    }
}
exports.PaymentException = PaymentException;
PaymentException.UNSUPPORTED_MOBILE_PAYMENT_METHOD = -150;
PaymentException.UNSUPPORTED_BANK_PAYMENT_METHOD = -151;
