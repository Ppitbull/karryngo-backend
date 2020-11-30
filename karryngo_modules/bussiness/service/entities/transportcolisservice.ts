/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les colis
@created 30/11/2020
*/

import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { TransportService } from "./transportservice";
import { TransportServiceType } from "./transportservicetype";


export class TransportColisService extends TransportServiceType
{
    is_fragile:Boolean=false;
    servicefor:String="";
    size_heigth:Number=0.0;
    size_depth:Number=0.0;
    size_width:Number=0.0;
    size_piece_nber:Number=0;

    constructor(
        id:EntityID=new EntityID(),
        transportBy:TransportService
        )
    {
        super(id,transportBy);
    }

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.is_fragile=this.purgeAttribute(entity,"is_fragile");
        this.servicefor=this.purgeAttribute(entity,"servicefor");
        if(entity.hasOwnProperty('size'))
        {
            this.size_heigth=this.purgeAttribute(entity,"heigth");
            this.size_depth=this.purgeAttribute(entity,"depth");
            this.size_width=this.purgeAttribute(entity,"width");
            this.size_piece_nber=this.purgeAttribute(entity,"piece_nber");
        }
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            is_fragile:this.is_fragile,
            servicefor:this.servicefor,
            size:{
                heigth:this.size_heigth,
                depth:this.size_heigth,
                width:this.size_width,
                piece_nber:this.size_piece_nber
            }
        };
    }
}
