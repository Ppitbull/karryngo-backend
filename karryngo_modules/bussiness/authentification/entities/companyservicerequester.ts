/**
@author Cedric nguendap
@description Cette classe represente un demandeur de service qui est sous le label d'une compagni
@created 13/10/2020
*/

import { ServiceProvider } from "./serviceprovider";

export class CompagnyServiceRequester extends ServiceProvider
{
    companyName:String="";
    registrationNumber:String="";
    importExportCompagnyCode:String="";    
    companyAddress:String="";

    hydrate(entity: any):void
    {
        super.hydrate(entity);
        this.companyName=this.purgeAttribute(entity,"companyname");
        this.registrationNumber=this.purgeAttribute(entity,"registrationnumber");
        this.importExportCompagnyCode=this.purgeAttribute(entity,"importexportcompagnycode"); 
        this.companyAddress=this.purgeAttribute(entity,"companyAddress")       
    }

    toString():any
    {
        return {
            ...super.toString(),
            companyname:this.companyName,
            registrationnumber:this.registrationNumber,
            importexportcompagnycode:this.importExportCompagnyCode ,
            companyAddress:this.companyAddress        
        }
    }
}