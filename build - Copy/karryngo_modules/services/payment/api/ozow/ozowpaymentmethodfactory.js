"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OzowPaiementMethodFactory = void 0;
const injector_container_1 = require("../../../../../karryngo_core/lifecycle/injector_container");
const enums_1 = require("../../enums");
const PaymentException_1 = require("../../exceptions/PaymentException");
const bankpaiementstrategy_1 = require("./paiementstrategi/bankpaiementstrategy");
const paiementmethodstrategi_service_1 = require("./paiementstrategi/paiementmethodstrategi.service");
class OzowPaiementMethodFactory {
    getMethodPaiment(method) {
        let paiementStrategiService = injector_container_1.InjectorContainer.getInstance().getInstanceOf(paiementmethodstrategi_service_1.PaiementMethodStrategyService);
        let paiementMethodStrategi = new bankpaiementstrategy_1.BankPaiementStrategy(paiementStrategiService);
        switch (method) {
            case enums_1.PaiementStrategyType.BANK:
                paiementMethodStrategi = new bankpaiementstrategy_1.BankPaiementStrategy(paiementStrategiService);
            case enums_1.PaiementStrategyType.MTN_MONEY:
            case enums_1.PaiementStrategyType.ORANGE_MONEY:
                // paiementMethodStrategi=new MobileMoneyPaiementMethod(paiementStrategiService);
                throw new PaymentException_1.PaymentException(PaymentException_1.PaymentException.UNSUPPORTED_MOBILE_PAYMENT_METHOD, "Mobile payment method not supported");
        }
        return paiementMethodStrategi;
    }
}
exports.OzowPaiementMethodFactory = OzowPaiementMethodFactory;
