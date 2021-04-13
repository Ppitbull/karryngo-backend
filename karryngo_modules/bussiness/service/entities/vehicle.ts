/**
@author Cedric Nguendap
@description Cette classe represente les vehicules de transports
@created 30/11/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";

export class Vehicle extends KarryngoPersistentEntity
{
    static CAR:String="car";
    static AIRPLANE:String="airplane";
    static BIKE:String="bike";
    
    type:String="";
    name:String="";
    marque:String="";
    photo:{link:string}[]=[];
    placeNumbler:number=2;
    description:String="";

    constructor(id:EntityID=new EntityID())
    {
        super(id);
    }

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.type=this.purgeAttribute(entity,"type");
        this.name=this.purgeAttribute(entity,"name");
        this.marque=this.purgeAttribute(entity,"marque");
        
        this.photo=this.photo=this.purgeAttribute(entity,"photo");   
        this.placeNumbler=this.purgeAttribute(entity,"placeNumbler");
        this.description=this.purgeAttribute(entity,"description");        
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            type:this.type,
            name:this.name,
            marque:this.marque,
            photo:this.photo,
            placeNumbler:this.placeNumbler,
            description:this.description,
        };
    }

}