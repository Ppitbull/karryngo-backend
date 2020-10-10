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
    /**
     * @inheritdoc
     */
    getQueryBuilder(entity: SerializableEntity) {
        throw new Error("Method getQueryBuilder() not implemented.");
    }

    /**
     * @inheritdoc
     */
    connect(): Promise<ActionResult> {
        throw new Error("Method connect() not implemented.");
    }

    /**
     * @inheritdoc
     */
    create(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method create() not implemented.");
    }

    /**
     * @inheritdoc
     */
    update(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method update() not implemented.");
    }

    /**
     * @inheritdoc
     */
    delete(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method delete() not implemented.");
    }

    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method toString() not implemented.");
    }

    /**
     * @inheritdoc
     */
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method hydrate() not implemented.");
    }

    /**
     * @inheritdoc
     */
    createShema(entity:KarryngoPersistentEntity)
    {
        throw new Error("Method createShema() not implemented.");
    }
    
}
