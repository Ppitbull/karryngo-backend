import { KarryngoEntity } from "../KarryngoEntity";
import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé 
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/

import { NoSqlPersistenceManager } from "./NoSqlPersistenceManager";

export class MongoDBManager extends NoSqlPersistenceManager
{
    connect(connexionString: String): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    create(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    update(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    delete(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }

    createShema(entity:KarryngoPersistentEntity)
    {
        
    }
    
}
