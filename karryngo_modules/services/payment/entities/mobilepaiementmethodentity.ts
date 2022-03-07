import { PaiementStrategyType } from "../enums";
import { PaiementMethodEntity } from "./paiementmethodentity";

export class MobilePaiementMethodEntity extends PaiementMethodEntity
{
    type:PaiementStrategyType=PaiementStrategyType.ORANGE_MONEY;
    number:String=""
    toString():Record<string,any>
    {
        return {
            ...super.toString(),
            number:this.number
        }
    }

    
}