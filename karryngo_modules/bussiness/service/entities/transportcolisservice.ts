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
    static TYPE="TransportColisService";

    is_fragile:Boolean=false;
    servicefor:String="";
    size_heigth:Number=0.0;
    size_depth:Number=0.0;
    size_width:Number=0.0;
    size_piece_nber:Number=0;

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        let options=this.purgeAttribute(entity,"options");
        this.is_fragile=this.purgeAttribute(options,"is_fragile");
        this.servicefor=this.purgeAttribute(options,"servicefor");
        if(entity.hasOwnProperty('size'))
        {
            this.size_heigth=this.purgeAttribute(options.size,"heigth");
            this.size_depth=this.purgeAttribute(options.size,"depth");
            this.size_width=this.purgeAttribute(options.size,"width");
            this.size_piece_nber=this.purgeAttribute(options.size,"piece_nber");
        }
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        let stringifyO=super.toString();

        stringifyO["options"]={
            ...stringifyO["options"],
            is_fragile:this.is_fragile,
            servicefor:this.servicefor,
            size:{
                heigth:this.size_heigth,
                depth:this.size_heigth,
                width:this.size_width,
                piece_nber:this.size_piece_nber
            }
        };
        stringifyO["type"]=TransportColisService.TYPE;
        return stringifyO;
    }
}
