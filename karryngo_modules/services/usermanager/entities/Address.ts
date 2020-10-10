/**
@author: Cedric nguendap
@description: Cette classe permet de stocké toutes les addesses de l'utilisateur (Whatsapp,Tel,Email...)
@created: 09/10/2020
*/
import { KarryngoEntity } from "../../../../karryngo_core/KarryngoEntity";
import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";

export class Address extends KarryngoPersistentEntity
{
    public email:String="";
    public mobilePhone:String="";
    public phone:String="";
    public websiteLink:String="";
    public whatsAppNumber:String="";
    public skypeNumber:String="";
    public zip:String="";
    public country:String="";

    /**
     * @constructor
     * @param id identifiant  de l'adresse
     */
    constructor(id:EntityID=new EntityID())
    {
        super(id);
    }

    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
}