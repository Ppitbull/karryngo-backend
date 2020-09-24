import { idText } from "typescript";
import { KarryngoEntity } from "../KarryngoEntity";

export abstract class KarryngoPersistentEntity extends KarryngoEntity
{
    protected _id:String;
    constructor(id:String="")
    {
        super();
        this._id=id;
    }
    static generateId():String
    {
        let id:String="";
        return id;
    }
    set id(idO:String)
    {
        this._id=idO;
    }
    get id():String
    {
        return this._id;
    }
}