/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service
@created 13/10/2020
*/

import { Address } from "../../../services/usermanager/entities/Address";
import { Customer } from "./customer";

export class ServiceProvider extends Customer
{
    public adressForVerification:Address[]=[];

    hydrate(entity: any):void
    {
        super.hydrate(entity);
        this.adressForVerification=this.purgeAttribute(entity,"addressforverification")==null
        ?[]
        :this.purgeAttribute(entity,"addressforverification").map((addr:any)=>{
            let add:Address=new Address();
            add.hydrate(addr);
            return add;
        });
    }
    toString():any
    {
        return {
            ...super.toString(),
            addressforverification:this.adressForVerification
        }
    }
}
