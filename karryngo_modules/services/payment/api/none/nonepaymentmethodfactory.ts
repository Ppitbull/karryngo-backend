import { InjectorContainer } from "../../../../../karryngo_core/lifecycle/injector_container";
import { PaiementStrategyType } from "../../enums";
import { PaiementMethodStrategy } from "../../interfaces/paiementmethod.interface";
import { PaiementMethodStrategyService } from "../toupesu/paiementstrategi/paiementmethodstrategi.service";
import { NonePaiementMethodStrategi } from "./nonepaymentstrategi";


export class NonePaiementMethodFactory {
    getMethodPaiment(method: PaiementStrategyType): PaiementMethodStrategy {
        return new NonePaiementMethodStrategi()
    }
}