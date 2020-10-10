/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/

import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { AbstractPersistenceManager } from "./AbstractPersistenceManager";

export abstract class NoSqlPersistenceManager extends AbstractPersistenceManager
{
    protected configService:ConfigurableApp;
    protected db:any;
    constructor(config:ConfigurableApp)
    {
        super();
        this.configService=config;
    }

    getUrlEntity(entity:SerializableEntity):String
    {
        let urlEntity:String="";
        return urlEntity;
    }
}

