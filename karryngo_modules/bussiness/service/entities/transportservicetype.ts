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
    carTypeList:Vehicle[]=[];
    is_urgent:Boolean;
    description:String;
    images:String[];
    from:Location;
    to:Location;
    date:String="";
    date_departure:String="";
    date_arrival:String="";
    title:String="";
    constructor(
        id:EntityID=new EntityID(),
        is_urgent:Boolean=false,
        details:String="",
        images:String[]=[],
        from:Location=new Location(),
        to:Location=new Location(),
        )
    {
        super(id);
        this.is_urgent=is_urgent;
        this.description=details;
        this.images=images;
        this.from=from;
        this.to=to;
        
        //hydrate date iso 8601
        let d=new Date();
        this.date=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}`;
        
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);
        let options=this.purgeAttribute(entity,"options");
        this.is_urgent=this.purgeAttribute(options,"is_urgent");
        this.description=this.purgeAttribute(entity,"description");
        this.images=this.purgeAttribute(entity,"images");
        if(this.purgeAttribute(options,"vehicle"))
        {
            this.carTypeList=this.purgeAttribute(options,"vehicle").map((v:Record<string, any>)=>{
                let veh:Vehicle=new Vehicle();
                veh.hydrate(v);
                if(veh.id==null) veh.id = new EntityID();
                return veh;
            })
        }
        ;

        let adresse=this.purgeAttribute(entity,"address");
        this.from.hydrate(adresse.from);
        if(this.from.id==null) this.from.id=new EntityID();

        this.to.hydrate(adresse.to);
        if(this.to.id==null) this.to.id=new EntityID();

        let deadline=this.purgeAttribute(entity,"deadline");
        this.date_departure=this.purgeAttribute(deadline,"departure");
        this.date_arrival=this.purgeAttribute(deadline,"arrival");
        this.date=this.purgeAttribute(entity,"publicationDate")?this.purgeAttribute(entity,"publicationDate"):this.date;
        this.title=this.purgeAttribute(entity,"title");
       
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
            publicationDate:this.date,
            deadline:{
                departure:this.date_departure,
                arrival:this.date_arrival
            },
           options:{
            vehicle:this.carTypeList.map((vehicle:Vehicle)=>vehicle.toString()),
            is_urgent:this.is_urgent,
            description:this.description,
            images:this.images,
           },
           title:this.title,
           
        };
        //stringify date format ISO 8601
    }
}