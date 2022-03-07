import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { Location } from "./../../../services/geolocalisation/entities/location";
import { Vehicle } from "./vehicle";
import { Address } from "../../../services/usermanager/entities/Address";
import { KFileLink } from "../../../../karryngo_core/fs/KFile";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";

export class ProviderService extends KarryngoPersistentEntity
{
    title:String="";
    name:String="Provider Name";
    description:String="";
    idProvider:EntityID=new EntityID();
    deservedZone:Location[]=[];
    listVehicle:Vehicle[]=[];
    documents:KFileLink[]=[];
    addressForVerification:Address[]=[];

    toString():Record<string,any>
    {
        return {
            ...super.toString(),
            title:this.title,
            name:this.name,
            description:this.description,
            providerId:this.idProvider.toString(),
            zones:this.deservedZone.map((zone:Location)=>zone.toString()),
            vehicles:this.listVehicle.map((vehicle:Vehicle)=>vehicle.toString()),
            documents:this.documents,
            addressForVerification:this.addressForVerification.map((add:Address)=> add.toString())
        }
    }
    hydrate(entity:Record<string, any>):void
    {

        for (const key of Object.keys(entity)) {
            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "providerId") this.idProvider.setId(entity[key]);
            else if (key == "zones") this.deservedZone = entity[key].map((zone: Record<string, any>) => {
                let local: Location = new Location();
                local.hydrate(zone);
                return local;
            });
            else if (key == "vehicles") this.listVehicle = entity[key].map((vehicle: Record<string, any>) => {
                let v: Vehicle = new Vehicle();
                v.hydrate(vehicle);
                return v;
            })
            else if (key == "addressForVerification") this.addressForVerification = entity[key].map((add: Record<string, any>) => {
                let addr: Address = new Address();
                addr.hydrate(add);
                return addr;
            })
            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }        
    }
}