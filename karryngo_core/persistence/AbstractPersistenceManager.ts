/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite de persistance
@created: 23/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
import { PersistenceManager } from "./PersistenceManager.interface";

export abstract class AbstractPersistenceManager extends KarryngoApplicationEntity implements PersistenceManager
{
    /**
     * 
     * @see PersistenceManager.create()
     */
    abstract create(entity: KarryngoPersistentEntity): Promise<ActionResult>;

    /**
     * 
     * @see PersistenceManager.update()
     */
    abstract update(entity: KarryngoPersistentEntity): Promise<ActionResult>;

    /**
     * 
     * @see PersistenceManager.delete()
     */
    abstract delete(entity: KarryngoPersistentEntity): Promise<ActionResult>;
    
} 