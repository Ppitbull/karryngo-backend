/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service
@created 13/10/2020
*/

import { Address } from "../../../services/usermanager/entities/Address";
import { ServiceRequester } from "./servicerequester";

export class ServiceProvider extends ServiceRequester
{
    public adressForVerification:Address[]=[];
    isAcceptedProvider:boolean=false;

    hydrate(entity: any):void
    {
        super.hydrate(entity);
        this.isAcceptedProvider=this.purgeAttribute(entity,"isAcceptedProvider");
    }
    toString():any
    {
        return {
            ...super.toString(),
            isAcceptedProvider:this.isAcceptedProvider
        }
    }
}
