import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { PaiementStrategyType } from "../enums";
import { BankPaiementMethodEntity } from "./bankpaiementmethodentity";
import { MobilePaiementMethodEntity } from "./mobilepaiementmethodentity";
import { PaiementMethodEntity } from "./paiementmethodentity";

export function paiementMethodBuilder(entity:Record<string,any>):PaiementMethodEntity
{
    let method:PaiementMethodEntity;
    switch(entity.type)
    {
        case PaiementStrategyType.BANK:
            method=new BankPaiementMethodEntity(new EntityID());
            break;
        case PaiementStrategyType.MTN_MONEY:
        case PaiementStrategyType.ORANGE_MONEY:
            method=new MobilePaiementMethodEntity();
    }
    method.hydrate(entity);

    return method;
}