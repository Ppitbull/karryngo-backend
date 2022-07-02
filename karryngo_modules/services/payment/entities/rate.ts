import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class Rate extends KarryngoPersistentEntity
{
    owner:number;
    provider:number;
    manager:number;
    countryID: string;
    


    // constructor(data) {  // Constructor
    //     super();
    //     this.id = data._id;
    //     this.owner = data.owner;
    //     this.manager = data.manager;
    //     this.provider = data.provider;
    //     this.countryID = data.countryID;
    // }


    // toString():Record<string,any>
    // {
    //     return {
    //         ...super.toString(),
    //         amount:this.amount
    //     }
    // }

    setOwner(rate:number):boolean
    {
        if(rate<0) return false;
        this.owner = rate;
        return true;
    }

    setManager(rate:number):boolean
    {
        if(rate<0) return false;
        this.manager = rate;
        return true;
    }

    setProvider(rate:number):boolean
    {
        if(rate<0) return false;
        this.provider = rate;
        return true;
    }

    getOwner():number
    {
        return this.owner;
    }

    getProvider(rate:number):number
    {
        return this.provider;
    }

    getManager(rate:number):number
    {
        return this.manager;
    }

    setAll(data){
        this.owner = data.owner;
        this.manager = data.manager;
        this.provider = data.provider;
        this.countryID = data.countryID;
    }

    setID(id){
        this._id = id.toString();
    }

    getID(): String{
        return this._id.toString();
    }

}