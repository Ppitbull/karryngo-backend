/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les personnes
@created 30/11/2020
*/

import { TransportServiceType } from "./transportservicetype";

export class TransportPersonService extends TransportServiceType
{
    static TYPE="TransportPersonService";
    static typeof="person"
    time:Date=new Date();
    toString()
    {
        return {
            ...super.toString(),
            type:TransportPersonService.TYPE
        }
    }
}