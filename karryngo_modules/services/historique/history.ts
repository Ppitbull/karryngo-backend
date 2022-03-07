import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { TransportServiceType } from "../../bussiness/service/entities/transportservicetype";
import { FinancialTransaction } from "../payment/entities/financialtransaction";

export class UserHistory extends KarryngoPersistentEntity
{
    financialTransaction:FinancialTransaction=new FinancialTransaction(new EntityID());
    serviceTransportID:EntityID=new EntityID();

    hydrate(entity:any):void
    {
        for (const key of Object.keys(entity)) {
            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "financialTransaction") this.financialTransaction.hydrate(entity[key]);
            else if (key == "serviceTransportID") this.serviceTransportID.setId(entity[key]);
            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }
    }

    toString(): Record<string,any>
    {
        return {
            ...super.toString(),
            financialTransaction:this.financialTransaction.toString(),
            serviceTransportID:this.serviceTransportID.toString()
        }
    }
}