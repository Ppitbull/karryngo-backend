/**
@author Cedric Nguendap
@description Cette classe represente la classe de base d'un type de service (Personne ou colis)
@created 30/11/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Location } from "../../../services/geolocalisation/entities/location";
import { TransportService } from "./transportservice";

export abstract class TransportServiceType extends KarryngoPersistentEntity
{
    is_urgent:Boolean;
    details:String;
    images:String[];
    from:Location;
    to:Location;
    transportBy:TransportService;
    constructor(
        id:EntityID,
        transportBy:TransportService,
        
        is_urgent:Boolean=false,
        details:String="",
        images:String[]=[],
        from:Location=new Location(),
        to:Location=new Location()
        )
    {
        super(id);
        this.is_urgent=is_urgent;
        this.details=details;
        this.images=images;
        this.from=from;
        this.to=to;
        this.transportBy=transportBy;
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.is_urgent=this.purgeAttribute(entity,"is_urgent");
        this.details=this.purgeAttribute(entity,"details");
        this.images=this.purgeAttribute(entity,"images");
        this.from.hydrate(entity);
        this.to.hydrate(entity);
        this.transportBy.hydrate(entity);
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
           is_urgent:this.is_urgent,
           details:this.details,
           images:this.images,
           from:this.from.toString(),
           to:this.to.toString(),
           transportBy:this.transportBy.toString(),
        };
    }
}