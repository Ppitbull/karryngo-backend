/**
@author Cedric Nguendap
@description Cette classe represente la classe du service de transport par voiture
@created 22/11/2020
*/

import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { TransportService } from "./transportservice";
import { Location } from "../../../services/geolocalisation/entities/location";


export class TransportCarService extends TransportService
{
    static TYPE="TransportCarService";
    constructor(id:EntityID=new EntityID(),startLocation:Location=new Location(),endLocation:Location=new Location())
    {
        super(id,TransportCarService.TYPE,startLocation,endLocation);
    }
}
