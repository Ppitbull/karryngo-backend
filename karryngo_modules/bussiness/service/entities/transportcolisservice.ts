/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les colis
@created 30/11/2020
*/

import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { ReceiverColis } from "./receivercolis";
import { TransportService } from "./transportservice";
import { TransportServiceType } from "./transportservicetype";


export class TransportColisService extends TransportServiceType
{
    static TYPE="TransportColisService";

    is_weak:Boolean=false;
    typeof:String="";
    size_heigth:Number=0.0;
    size_depth:Number=0.0;
    size_width:Number=0.0;
    size_piece_nber:Number=0;

    receiver:ReceiverColis=new ReceiverColis(new EntityID());

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        let options=this.purgeAttribute(entity,"options");
        this.is_weak=this.purgeAttribute(options,"is_weak");
        this.typeof=this.purgeAttribute(options,"typeof");
        if(entity.hasOwnProperty('size'))
        {
            this.size_heigth=this.purgeAttribute(options.size,"heigth");
            this.size_depth=this.purgeAttribute(options.size,"depth");
            this.size_width=this.purgeAttribute(options.size,"width");
            this.size_piece_nber=this.purgeAttribute(options.size,"piece_nber");
        }
        this.receiver.hydrate(entity.receiver);
        this.receiver.id=this.receiver.id==null?new EntityID():this.receiver.id;
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        let stringifyO=super.toString();

        stringifyO["options"]={
            ...stringifyO["options"],
            is_weak:this.is_weak,
            typeof:this.typeof,
            size:{
                heigth:this.size_heigth,
                depth:this.size_heigth,
                width:this.size_width,
                piece_nber:this.size_piece_nber
            },
            
            receiver:this.receiver.toString()
        };
        stringifyO["type"]=TransportColisService.TYPE;
        return stringifyO;
    }
}
