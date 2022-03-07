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
        for (const key of Object.keys(entity)) {
            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "address") this.adresse.hydrate(entity[key]);
            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }
    }
    toString():any
    {
        return {
            ...super.toString(),
            isAcceptedProvider:this.isAcceptedProvider
        }
    }
}
