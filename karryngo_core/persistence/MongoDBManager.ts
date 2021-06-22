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
import Configuration from "../../config-files/constants";

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
            this.getCollection(collectionName).findOneAndUpdate(cond,toUpdate,options,(err:any,r:any)=>{
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
    
    
    findInCollection(collectionName: String, options: Record<string, any>,othersOption:Record<string, any>={},limit:Number=MongoDBManager.MAX_TO_FIND): Promise<ActionResult>
    {
        return new Promise<ActionResult>(async (resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            try{                
                let arr:Record<string, any>[]=[];
                let cursor=this.getCollection(collectionName).find(options,othersOption).limit(MongoDBManager.MAX_TO_FIND);
                
                while(await cursor.hasNext())  arr.push(await cursor.next());
                result.result=[...arr];
                resolve(result);    
            }     
            catch(e){
                result.resultCode=DataBaseException.DATABASE_UNKNOW_ERROR;
                result.message="Cannot find document";
                result.result=e;
                reject(result);
            }  
                         
        })
    }

    addToCollection(collectionName: String, entity: SerializableEntity): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            this.getCollection(collectionName)
            .insertOne(entity.toString(),
                (err:any,res:any)=>{
                    if(err!=undefined && err!=null) {
                        result.resultCode=DataBaseException.DATABASE_UNKNOW_ERROR;
                        result.message="Unable to insert data  in "+collectionName;
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
    
    static connexionStringBuilder(configUrl:{
        server_prefix:String,
        username?:String,
        password?:String,
        hostname:String,
        database:String,
        params?:String
    }):String
    {
        let connexionString=configUrl.server_prefix+'://';
        if(configUrl.username && configUrl.password) connexionString+=`${configUrl.username}:${configUrl.password}@`;
        connexionString+=`${configUrl.hostname}/${configUrl.database}`;
        if(configUrl.params) connexionString+=`${configUrl.params}`
        return connexionString;
    }

    /**
     * @description Cette message permet de faire une connexion a une bd MongoDB
     * @param configUrl parametre permetant de constitué l'url de connexion
     */
    static connect(configUrl:{
        server_prefix:String,
        username?:String,
        password?:String,
        hostname:String,
        database:String,
        params?:String
    }): Promise<ActionResult>
    {
        let result:ActionResult=new ActionResult();
        let connexionString=MongoDBManager.connexionStringBuilder(configUrl).toString();
        // let connexionString=`mongodb+srv://admin:KFBbc7ebBHHloYyd@cluster0.kiwom.mongodb.net/karryngo?retryWrites=true&w=majority`
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let mongoClient = new MongoClient(connexionString, { useNewUrlParser: true, useUnifiedTopology: true });
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
                    result.result=mongoClient.db(configUrl.database.toString());
                    //mongoClient.close();
                    resolve(result);
                }
            });
            
        });
    }
    /**
     * @inheritdoc
     */
    connect(): Promise<ActionResult> {
        //creation de l'url de connexion a la bd a partir des informations du service de configuration        
        return new Promise<ActionResult>((resolve,reject)=>{
            
            // MongoDBManager.connect(this.configService.getValueOf('persistence'))
            MongoDBManager.connect(this.configService.getValueOf('persistence')[Configuration.env_mode].database_data)
            .then((data:ActionResult)=>{
                this.db=data.result;
                data.result=null;
                resolve(data);
            })
            .catch ((error:ActionResult)=> reject(error))
        })
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
