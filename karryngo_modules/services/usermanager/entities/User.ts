/**
@author: Cedric nguendap
@description: Cette classe permet represente un utilisateur du systéme
@created: 09/10/2020
*/

import { KarryngoEntity } from "../../../../karryngo_core/KarryngoEntity";
import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";

export class User extends KarryngoPersistentEntity
{
    /**
     * @description nom de l'utilisateur
     * @type String
     */
    protected firstName:String="";

    /**
     * @description prenom de l'utilisateur
     * @type String
     */
    protected lastName:String="";

    /**
     * @description mot de passe de l'utilisateur
     * @type String
     */
    protected password:String="";


    constructor(_id:EntityID=new EntityID(),fname:String="",lname:String="",pwd:String="")
    {
        super(_id);
        this.firstName=fname;
        this.lastName=lname;
        this.password=pwd;
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