/*
@author: Cedric nguendap
@description: Ceci est la classe de base de toutes les classes 
@created: 21/09/2020
@see SerializableEntity
*/
import {SerializableEntity} from './SerializableEntity';

export abstract class KarryngoEntity implements SerializableEntity
{
    /***
     *@see SerializableEntity.toString()
     */
    abstract toString():any;

    /**
     * @see SerializableEntity.hydrate()
     */
    abstract hydrate(entity:KarryngoEntity):void;
}