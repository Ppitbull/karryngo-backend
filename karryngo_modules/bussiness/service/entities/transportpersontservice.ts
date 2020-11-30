/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les personnes
@created 30/11/2020
*/

import { TransportServiceType } from "./transportservicetype";
import { Vehicle } from "./vehicle";

export class TransportPersonService extends TransportServiceType
{
    carType:Vehicle=new Vehicle();
    time:Date=new Date();
}