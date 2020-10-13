/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service qui est sous le label d'une compagni
@created 13/10/2020
*/

import { ServiceProvider } from "./serviceprovider";

export class CompagnyServiceProvider extends ServiceProvider
{
    companyName:String="";
    registrationNumber:String="";
    importExportCompagnyCode:String="";

    hydrate(entity: any):void
    {
        super.hydrate(entity);
        this.companyName=this.purgeAttribute(entity,"companyname");
        this.registrationNumber=this.purgeAttribute(entity,"registrationnumber");
        this.importExportCompagnyCode=this.purgeAttribute(entity,"importexportcompagnycode");
    }

    toString():any
    {
        return {
            ...super.toString(),
            companyname:this.companyName,
            registrationnumber:this.registrationNumber,
            importexportcompagnycode:this.importExportCompagnyCode
        }
    }
}