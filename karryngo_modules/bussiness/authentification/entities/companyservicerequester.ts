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

    toString():any
    {
        return {
            ...super.toString(),
            companyName:this.companyName,
            registrationNumber:this.registrationNumber,
            importExportCompagnyCode:this.importExportCompagnyCode ,
            companyAddress:this.companyAddress        
        }
    }
}