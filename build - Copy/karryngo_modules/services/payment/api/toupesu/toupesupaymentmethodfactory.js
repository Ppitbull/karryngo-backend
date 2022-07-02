"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToupesuPaiementMethodFactory = void 0;
const injector_container_1 = require("../../../../../karryngo_core/lifecycle/injector_container");
const enums_1 = require("../../enums");
const PaymentException_1 = require("../../exceptions/PaymentException");
const bankpaiementmethod_1 = require("./paiementstrategi/bankpaiementmethod");
const mobilemoneypaiementmethod_1 = require("./paiementstrategi/mobilemoneypaiementmethod");
const paiementmethodstrategi_service_1 = require("./paiementstrategi/paiementmethodstrategi.service");
class ToupesuPaiementMethodFactory {
    getMethodPaiment(method) {
        let paiementStrategiService = injector_container_1.InjectorContainer.getInstance().getInstanceOf(paiementmethodstrategi_service_1.PaiementMethodStrategyService);
        let paiementMethodStrategi = new bankpaiementmethod_1.BankPaiementStrategy(paiementStrategiService);
        switch (method) {
            case enums_1.PaiementStrategyType.BANK:
                throw new PaymentException_1.PaymentException(PaymentException_1.PaymentException.UNSUPPORTED_BANK_PAYMENT_METHOD, "Bank payment method not supported");
            case enums_1.PaiementStrategyType.MTN_MONEY:
            case enums_1.PaiementStrategyType.ORANGE_MONEY:
                paiementMethodStrategi = new mobilemoneypaiementmethod_1.MobileMoneyPaiementMethod(paiementStrategiService);
                break;
        }
        return paiementMethodStrategi;
    }
}
exports.ToupesuPaiementMethodFactory = ToupesuPaiementMethodFactory;
