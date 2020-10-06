import { KarryngoEntity } from "../KarryngoEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
import * as mongooseDB from 'mongoose';
/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé 
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/

import { NoSqlPersistenceManager } from "./NoSqlPersistenceManager";
import { DataBaseException } from "../exception/DataBaseException";

export class MongooseDBManager extends NoSqlPersistenceManager
{
    protected options:any={
        database:{
            useNewUrlParser:true
        },
        schema:{
            strict:false
        }
        
    }

    /**
     * @description Cette fonction permet de ce connecter a une base de données MongoDB 
     *  a partir d'une chaine de connexion
     * @param connexionString chaine de connexion a la bd
     * @returns une promise est retourné. cette promise est résolu si la connexion 
     *  s'éffectue avec succes et est rejecté dans le cas contraire
     */
    connect(connexionString: String):Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let result:ActionResult=new ActionResult();
            mongooseDB.connect(connexionString.toString(),this.options.database);
            this.db=mongooseDB.connection;
            this.db.on('error',(e:any)=>{
                result.resultCode=DataBaseException.DATABAE_DISCONNECTED
                result.message="Erreur lors de la connexion a la bd";
                result.description=e;
                reject(result);
            });
            this.db.on('open',()=> resolve(result));
        });
    }

    create(entity: KarryngoPersistentEntity): Promise<ActionResult> {
        
        this.createShema(entity).create();
        //console.log("database ",db.createShema(user));
        /*for(let k in entity)
        {
            console.log("k: ",k, "=> ",user[k]);
        }*/
        throw new Error("Method not implemented.");
    }
    update(entity: KarryngoPersistentEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    delete(entity: KarryngoPersistentEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }

    createShema(entity:KarryngoPersistentEntity):any
    {
        let schema=mongooseDB.Schema;
        let entitySchema=new mongooseDB.Schema({},this.options.schema);
        entitySchema.loadClass(entity.constructor);
        return mongooseDB.model(entity.constructor.name,entitySchema);   
    }
    
}
