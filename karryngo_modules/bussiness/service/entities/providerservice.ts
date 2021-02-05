import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { Location } from "./../../../services/geolocalisation/entities/location";
import { Vehicle } from "./vehicle";

export class ProviderService extends KarryngoPersistentEntity
{
    title:String="";
    name:String="Provider Name";
    description:String="";
    idProvider:String="";
    deservedZone:Location[]=[];
    listVehicle:Vehicle[]=[];

    toString():Record<string,any>
    {
        return {
            ...super.toString(),
            title:this.title,
            name:this.name,
            description:this.description,
            providerId:this.idProvider,
            zones:this.deservedZone.map((zone:Location)=>zone.toString()),
            vehicles:this.listVehicle.map((vehicle:Vehicle)=>vehicle.toString()),
        }
    }
    hydrate(entity:Record<string, any>):void
    {
        super.hydrate(entity);
        this.title=this.purgeAttribute(entity,"title");
        this.name=this.purgeAttribute(entity,"name");
        this.description=this.purgeAttribute(entity,"description");
        this.idProvider=this.purgeAttribute(entity,"providerId");
        this.deservedZone=this.purgeAttribute(entity,"zones").map((zone:Record<string, any>)=>{
            let local:Location=new Location();
            local.hydrate(zone);

        });
        this.listVehicle=this.purgeAttribute(entity,"vehicles").map((vehicle:Record<string, any>)=>{
            let v:Vehicle=new Vehicle();
            v.hydrate(vehicle);
            return v;
        })

    }
}