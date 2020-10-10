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
     *@inheritdoc
     */
    abstract toString():any;

    /**
     * @inheritdoc
     */
    abstract hydrate(entity:KarryngoEntity):void;
}