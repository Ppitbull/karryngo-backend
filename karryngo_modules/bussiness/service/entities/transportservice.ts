/**
@author Cedric Nguendap
@description Cette classe represente la classe de base des services de transport
@created 22/11/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Location } from "../../../services/geolocalisation/entities/location";
export abstract class TransportService extends KarryngoPersistentEntity
{
    /**
     * @description nom du type de transport
     */
    name:String;

    /**
     * @description localisation de départ
     */
    startLocation:Location;

    /**
     * @description localisaton d'arrivé
     */
    endLocation:Location;
    
    constructor(id:EntityID,name:String,startLocation:Location,endLocation:Location)
    {
        super(id);
        this.name=name;
        this.startLocation=startLocation;
        this.endLocation=endLocation;
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);
        if(entity.hasOwnProperty('name')) this.name=entity.name;
        this.startLocation.hydrate(entity);
        this.endLocation.hydrate(entity);
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            name:this.name,
            startLocation:this.startLocation.toString(),
            endLocation:this.endLocation.toString(),
        };
    }

}