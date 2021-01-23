import { KarryngoEntity } from "../KarryngoEntity";
import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";
import { MongoClient } from  "mongodb";
/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé 
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/

import { NoSqlPersistenceManager } from "./NoSqlPersistenceManager";
import { DataBaseException } from "../exception/DataBaseException";

export class MongoDBManager extends NoSqlPersistenceManager
{
    private client:any=null;
    static MAX_TO_FIND:Number=20;

    updateInCollection(collectionName: String, cond: Record<string, any>, toUpdate: Record<string, any>,options:Record<string, any>=
        {
            returnOriginal: false,
            upsert: true
        }): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            this.getCollection(collectionName).findOneAndUpdate(cond,{$set:toUpdate},options,(err:any,r:any)=>{
                if(err)
                {
                    result.resultCode=DataBaseException.DATABASE_UNKNOW_ERROR;
                    result.message="Cannot update document in collection";
                    result.result=err;
                    reject(result);
                }
                else
                {
                    result.result=r;
                    resolve(result);
                }
            })
        })
    }
    
    
    findInCollection(collectionName: String, options: Record<string, any>,limit:Number=50): Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            let arr:Record<string, any>[]=[];
            this.getCollection(collectionName).find(options).limit(MongoDBManager.MAX_TO_FIND).each((err:any,doc:any)=>{
                if(err)
                {
                    result.resultCode=DataBaseException.DATABASE_UNKNOW_ERROR;
                    result.message="Cannot find document";
                    result.result=err;
                    reject(result);
                }
                else if(doc) arr.push(doc)
                else return false;
            })
            result.result=[...arr];
            resolve(result);                
        })
    }

    addToCollection(collectionName: String, entity: SerializableEntity): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            this.getCollection(collectionName)
            .insertOne(entity.toString(),
                (err:any,res:any)=>{
                    if(err!=undefined && err!=null) {
                        result.message="Cannot add document to "+collectionName;
                        result.result=err;
                        reject(result);
                    }
                    else
                    {
                        resolve(result);
                    }
                })           
        });
    }

    removeToCollection(collectionName: String, entity: SerializableEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * @inheritdoc
     */
    createCollection(collectionName: String): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            
        })
    }

    /**
     * @inheritdoc
     */
    deleteCollection(collectionName: String): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            let delResult:ActionResult=new ActionResult();
            this.getCollection(collectionName)
            .remove({},
                (err:any,r:any)=>{
                    if(err){
                        delResult.resultCode=DataBaseException.DATABASE_UNKNOW_ERROR;
                        delResult.message="Cannot delete collection: "+collectionName;
                        delResult.result=err;
                        reject(delResult);
                    }
                    else
                    {
                        delResult.result=r;
                        resolve(delResult);
                    }
                }
            );            
        })
    }

    /**
     * @inheritdoc
     */
    getCollection(collectionName: String):any {
        return this.db.collection(collectionName);
    }

    /**
     * @inheritdoc
     */
    disconnect(): void {
        this.db.close();
    }

    /**
     * @inheritdoc
     */
    getQueryBuilder(entity: SerializableEntity) {
        return this.getCollection(entity.constructor.name.toLowerCase());
    }

    /**
     * @inheritdoc
     */
    connect(): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //creation de l'url de connexion a la bd a partir des informations du service de configuration
            let connexionString=`mongodb://${this.configService.getValueOf("persistence").hostname}:${this.configService.getValueOf("persistence").port}/`;
            let result:ActionResult=new ActionResult();
            let mongoClient = new MongoClient(connexionString);
            //connexion a la bd
            mongoClient.connect((err)=>{
                if(err)
                {
                    //si une erreur est rencontré on rejete la promise
                    result.resultCode=DataBaseException.DATABAE_DISCONNECTED
                    result.message="Erreur lors de la connexion a la bd";
                    result.result=err;
                    reject(result);
                }
                else
                {
                    //si la connexion s'ouvre alors on resoud la promise
                    this.db=mongoClient.db(this.configService.getValueOf("persistence").database);
                    //mongoClient.close();
                    resolve(result);
                }
            });
            
        });
    }

    /**
     * @inheritdoc
     */
    create(entity: SerializableEntity): Promise<ActionResult> {
        return this.addToCollection(entity.constructor.name,entity);
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

    
}
