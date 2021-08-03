import { PaiementStrategyType } from "../enums";
import { PaiementMethodEntity } from "./paiementmethodentity";

export class BankPaiementMethodEntity extends PaiementMethodEntity
{
    type:PaiementStrategyType=PaiementStrategyType.BANK;

}