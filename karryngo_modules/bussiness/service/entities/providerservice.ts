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
        super.hydrate(entity);
        this.title=this.purgeAttribute(entity,"title");
        this.name=this.purgeAttribute(entity,"name");
        this.description=this.purgeAttribute(entity,"description");
        let idP:EntityID=new EntityID();
        idP.setId(this.purgeAttribute(entity,"providerId"));
        this.idProvider=idP;
        this.deservedZone=this.purgeAttribute(entity,"zones").map((zone:Record<string, any>)=>{
            let local:Location=new Location();
            local.hydrate(zone);
            return local;
        });
        this.listVehicle=this.purgeAttribute(entity,"vehicles").map((vehicle:Record<string, any>)=>{
            let v:Vehicle=new Vehicle();
            v.hydrate(vehicle);
            return v;
        })
        this.documents=this.purgeAttribute(entity,"documents");
        this.addressForVerification=this.purgeAttribute(entity,"addressForVerification").map((add:Record<string, any>)=>{
            let addr:Address=new Address();
            addr.hydrate(add);
            return addr;
        })
    }
}