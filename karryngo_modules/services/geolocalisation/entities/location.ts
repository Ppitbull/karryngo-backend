import { KarryngoEntity } from "../../../../karryngo_core/KarryngoEntity";
/**
@author: Cedric Nguendap
@description: Cette classe permet represente une zone de géolocalisation
@created: 10/10/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";

export class Location extends KarryngoPersistentEntity
{
    /**
     * @description represente le nom de la localisaton
     * @type String
     */
    public name:String="";     

    /**
     * @description represente la latitude de la zone
     * @type Number (Double)
     */
    public latitude:Number=0.0;

    /**
     * @description represente la longitude de la zone
     * @type Number (Double)
     */
    public longitude:Number=0.0;


    public country:String="";
    public city:String="";
    constructor (
        id:EntityID=new EntityID(),
        name:String="",
        longitude:Number=0.0,
        latitude:Number=0.0,
        country:String="",
        city:String=""
        )
    {
        super(id);
        this.longitude=longitude;
        this.latitude=latitude;
        this.name=name;
        this.country=country;
        this.city=city;
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            "long":this.longitude,
            "lat":this.latitude,
            "name":this.name,
            "country":this.country,
            "city":this.city
        }
    }

   
}