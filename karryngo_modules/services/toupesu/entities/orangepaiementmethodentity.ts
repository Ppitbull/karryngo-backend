import { PaiementStrategyType } from "../enums";
import { PaiementMethodEntity } from "./paiementmethodentity";

export class OrangePaiementMethodEntity extends PaiementMethodEntity
{
    type:PaiementStrategyType=PaiementStrategyType.ORANGE_MONEY;

}