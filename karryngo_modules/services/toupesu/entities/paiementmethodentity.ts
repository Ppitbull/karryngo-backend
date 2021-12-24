import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { PaiementStrategyType } from "../enums";
import { PaiementMethodStrategy } from "../paiementmethod.interface";

export abstract class PaiementMethodEntity extends KarryngoPersistentEntity
{
    moneyCode:string="XAF";//doit être changé a l'avenir
    type:PaiementStrategyType;

    toString():Record<string,any>
    {
        return {
            ...super.toString(),
            moneyCode:this.moneyCode,
            type:this.type
        }
    }

    hydrate(entity:Record<string,any>):void
    {
        super.hydrate(entity);
        this.moneyCode=this.purgeAttribute(entity,"moneyCode")
        this.type=this.purgeAttribute(entity,"type");
    }
}