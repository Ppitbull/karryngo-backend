import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { TransportServiceType } from "../../bussiness/service/entities/transportservicetype";
import { FinancialTransaction } from "../toupesu/entities/financialtransaction";

export class UserHistory extends KarryngoPersistentEntity
{
    financialTransaction:FinancialTransaction=new FinancialTransaction(new EntityID());
    serviceTransportID:EntityID=new EntityID();

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.financialTransaction.hydrate(this.purgeAttribute(entity,"financialTransaction")["financialTransaction"]);
        this.serviceTransportID.setId(this.purgeAttribute(entity,"serviceTransportID"));
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