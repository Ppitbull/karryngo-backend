/**
@author Cedric Nguendap
@description Cette classe represente la classe de base d'un type de service (Personne ou colis)
@created 30/11/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Location } from "../../../services/geolocalisation/entities/location";
import { TransportService } from "./transportservice";
import { Vehicle } from "./vehicle";

export abstract class TransportServiceType extends KarryngoPersistentEntity
{
    carType:Vehicle;
    is_urgent:Boolean;
    details:String;
    images:String[];
    from:Location;
    to:Location;
    date:Date;
    constructor(
        id:EntityID=new EntityID(),
        is_urgent:Boolean=false,
        details:String="",
        images:String[]=[],
        from:Location=new Location(),
        to:Location=new Location(),
        date:Date=new Date(),
        carType:Vehicle=new Vehicle()
        )
    {
        super(id);
        this.is_urgent=is_urgent;
        this.details=details;
        this.images=images;
        this.from=from;
        this.to=to;
        this.date=date;
        this.carType=carType;
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);

        let options=this.purgeAttribute(entity,"options");
        this.is_urgent=this.purgeAttribute(options,"is_urgent");
        this.details=this.purgeAttribute(options,"details");
        this.images=this.purgeAttribute(options,"images");
        this.carType.hydrate(this.purgeAttribute(options,"vehicicle"));

        let adresse=this.purgeAttribute(entity,"address");
        this.from.hydrate(adresse.from);
        this.to.hydrate(adresse.to);


        //hydrate date iso 8601
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            address:
            {
                from:this.from.toString(),
                to:this.to.toString(),
            },
           options:{
            vehicicle:this.carType.toString(),
            is_urgent:this.is_urgent,
            details:this.details,
            images:this.images,
           },
           
        };
        //stringify date format ISO 8601
    }
}