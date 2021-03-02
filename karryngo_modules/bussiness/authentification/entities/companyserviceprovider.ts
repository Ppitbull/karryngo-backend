/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service qui est sous le label d'une compagni
@created 13/10/2020
*/

import { CompagnyServiceRequester } from "./companyservicerequester";
import { ServiceProvider } from "./serviceprovider";

export class CompagnyServiceProvider extends CompagnyServiceRequester
{
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