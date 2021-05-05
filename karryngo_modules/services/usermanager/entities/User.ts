/**
@author: Cedric nguendap
@description: Cette classe permet represente un utilisateur du systéme
@created 09/10/2020
*/

import { KarryngoEntity } from "../../../../karryngo_core/KarryngoEntity";
import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Location } from "../../geolocalisation/entities/location";
import { Address } from "./Address";

export class User extends KarryngoPersistentEntity
{
    /**
     * @description nom de l'utilisateur
     * @type String
     */
    public firstname:String="";

    /**
     * @description prenom de l'utilisateur
     * @type String
     */
    public lastname:String="";

    /**
     * @description mot de passe de l'utilisateur
     * @type String
     */
    public password:String="";

    /**
     * @description adresses de l'utilisateur. peut contenir une adresse email, whatsapp,...
     * @type Address
     */
    public adresse:Address;


    public username:String="";


    constructor(_id:EntityID=new EntityID(),fname:String="",lname:String="",username:String="",pwd:String="",add:Address=new Address())
    {
        super(_id);
        this.firstname=fname;
        this.lastname=lname; 
        this.password=pwd;
        this.adresse=add;
        this.username=username;
    }

    /**
     * @inheritdoc
     */
    toString():any {
        // console.log("Adress",this.adresse.toString())
        return {
            ...super.toString(),
            "firstname":this.firstname,
            "lastname":this.lastname,
            "password":this.password,
            "username":this.username,
            "address":this.adresse.toString(),
        }
    }

    /**
     * @inheritdoc
     */
    hydrate(entity: any): void {
        //console.log("entite ",entity)
        super.hydrate(entity);
        this.firstname=this.purgeAttribute(entity,"firstname");
        this.lastname=this.purgeAttribute(entity,"lastname");
        this.password=this.purgeAttribute(entity,"password");
        if(entity.address) this.adresse.hydrate(entity.address);
        this.username=this.purgeAttribute(entity,"username");
    }   
}