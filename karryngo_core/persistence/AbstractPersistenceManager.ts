/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite de persistance
@created: 23/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { PersistenceManager } from "./PersistenceManager.interface";

export abstract class AbstractPersistenceManager extends KarryngoApplicationEntity implements PersistenceManager
{
    /**
     * 
     * @see PersistenceManager.create()
     */
    abstract create(entity: SerializableEntity): Promise<ActionResult>;

    /**
     * 
     * @see PersistenceManager.update()
     */
    abstract update(entity: SerializableEntity): Promise<ActionResult>;

    /**
     * 
     * @see PersistenceManager.delete()
     */
    abstract delete(entity: SerializableEntity): Promise<ActionResult>;
    
} 