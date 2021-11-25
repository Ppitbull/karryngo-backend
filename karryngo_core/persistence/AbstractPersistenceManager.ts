/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite de persistance
@created: 23/09/2020
@modified by Cedric Nguendap : 09/10/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
import { PersistenceManager } from "./PersistenceManager.interface";

export abstract class AbstractPersistenceManager extends KarryngoApplicationEntity implements PersistenceManager
{
   /**
     * @inheritdoc
     */
    abstract  findDepthInCollection(collectionName: String, options: Record<string, any>[]): Promise<ActionResult>;
    
    /**
     * @inheritdoc
     */
    abstract updateInCollection(collectionName: String, cond: Record<string, any>, toUpdate: Record<string, any>,options:Record<string, any>): Promise<ActionResult>;
    
    /**
     * @inheritdoc
     */
    abstract disconnect(): void;

    /**
     * @inheritdoc
     */
    abstract getQueryBuilder(entity: SerializableEntity):any;

    /**
     * @inheritdoc
     */
    abstract connect(): Promise<ActionResult>;
    
    
    /**
     * @inheritdoc
     */
    abstract create(entity: KarryngoPersistentEntity): Promise<ActionResult>;

    /**
     * @inheritdoc
     */
    abstract update(entity: KarryngoPersistentEntity): Promise<ActionResult>;

    /**
     * @inheritdoc
     */
    abstract delete(entity: KarryngoPersistentEntity): Promise<ActionResult>;

    /**
     * @inheritdoc
     */
    abstract createCollection(collectionName:String):Promise<ActionResult>

    /**
     * @inheritdoc
     */
    abstract deleteCollection(collectionName:String):Promise<ActionResult>

    /**
     * @inheritdoc
     */
    abstract getCollection(collectionName:String):any;

    /**
     * @inheritdoc
     */
    abstract addToCollection(collectionName:String,entity:SerializableEntity):Promise<ActionResult>

    /**
     * @inheritdoc
     */
    abstract removeToCollection(collectionName:String,cond: Record<string, any>,toRemove:Record<string, any>): Promise<ActionResult>;

    /**
     * @inheritdoc
     */
    abstract findInCollection(collectionName:String,options:Record<string,any>,limit:Number):Promise<ActionResult>
    
} 