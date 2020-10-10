/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé 
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/
import { KarryngoEntity } from "../KarryngoEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
import mongooseDB from 'mongoose';


import { NoSqlPersistenceManager } from "./NoSqlPersistenceManager";
import { DataBaseException } from "../exception/DataBaseException";
import { SerializableEntity } from "../SerializableEntity";

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
     * 
     * @inheritdoc
     *  
     */
    getQueryBuilder(entity: SerializableEntity):any {
        return this.createShema(entity);
    }

    /**
     * @inheritdoc
     */
    connect():Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //creation de l'url de connexion a la bd a partir des informations du service de configuration
            let connexionString=`mongodb://${this.configService.getValueOf("persistence").hostname}:${this.configService.getValueOf("persistence").port}/${this.configService.getValueOf("persistence").database}`;
            let result:ActionResult=new ActionResult();
            
            //connexion a la bd
            mongooseDB.connect(connexionString.toString(),this.options.database);
            this.db=mongooseDB.connection;
            this.db.on('error',(e:any)=>{
                //si une erreur est rencontré on rejete la promise
                result.resultCode=DataBaseException.DATABAE_DISCONNECTED
                result.message="Erreur lors de la connexion a la bd";
                result.description=e;
                reject(result);
            });
            //si la connexion s'ouvre alors on resoud la promise
            this.db.on('open',()=> resolve(result));
        });
    }

    /**
     * 
     * @inheritdoc
     */
    create(entity: SerializableEntity): Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let result:ActionResult=new ActionResult();
            this.createShema(entity).create(entity).then((data:any)=>
            {
                result.result=data;
                resolve(result);
            })
            .catch((e:any)=>
            {
                result.result=e;
                result.resultCode=ActionResult.UNKNOW_ERROR;
                reject(e);
            });
        });       
        
    }
    
    /**
     * @inheritdoc
     */
    update(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    delete(entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
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
    
    /**
     * @description Cette methode permet de creer le model d'une entité persistante
     *  cette méthode évite d'écrire manuellement les schémas et model néccéssaires a mongoose pour l'interaction
     *  avec la bd et ajoute ainsi une couche d'abstraction pour l'accés a la bd 
     * @param entity entité dont on veut créer le schéma
     * @return retourne le schéam creer a partir de la classe obtenu en se servant de l'api de reflextion
     *  offerte par TypeScript
     */
    createShema(entity:SerializableEntity):any
    {
        let schema=mongooseDB.Schema;
        //création d'un schema vide
        let entitySchema=new mongooseDB.Schema({},this.options.schema);

        //construction du schéma a partir de la classe
        entitySchema.loadClass(entity.constructor);

        //création du model a partir du schema générer
        return mongooseDB.model(entity.constructor.name,entitySchema);   
    }
    
}
