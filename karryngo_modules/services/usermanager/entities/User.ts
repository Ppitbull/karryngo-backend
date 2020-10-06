import { KarryngoEntity } from "../../../../karryngo_core/KarryngoEntity";
import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class User extends KarryngoPersistentEntity
{
    protected _firstName:String="";
    protected _lastName:String="";
    protected _password:String="";

    constructor(_id:String,fname:String="",lname:String="",pwd:String="")
    {
        super(_id);
        this.firstName=fname;
        this.lastName=lname;
        this.password=pwd;
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    set firstName(fname:String)
    {
        this._firstName=fname;
    }

    set lastName(lname:String)
    {
        this._lastName=lname;
    }

    set password(pwd:String)
    {
        this._password=pwd;
    }

    get firstName():String
    {
        return this._firstName;
    }

    get lastName():String
    {
        return this._lastName;
    }

    get password():String
    {
        return this._password;
    }
}