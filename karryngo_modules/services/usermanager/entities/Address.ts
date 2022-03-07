/**
@author: Cedric nguendap
@description: Cette classe permet de stocké toutes les addesses de l'utilisateur (Whatsapp,Tel,Email...)
@created: 09/10/2020
*/
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
    public city:String="";

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
        return {
            ...super.toString(),
            email:this.email,
            mobilePhone:this.mobilePhone,
            phone:this.phone,
            websiteLink:this.websiteLink,
            whatsAppNumber:this.whatsAppNumber,
            skypeNumber:this.skypeNumber,
            zip:this.zip,
            country:this.country,
            city:this.city,
        };
    }

    
}