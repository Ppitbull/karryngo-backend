import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService } from "../decorator/dependecy_injector.decorator";
import { KarryngoEntity } from "../KarryngoEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoFileStorage } from "./KarryngoFileStorage";
import { GridFSBucket } from  "mongodb";
import { MongoDBManager } from "../persistence/MongoDBManager";
import { EntityID } from "../utils/EntityID";
import { KFile } from "./KFile";
import Configuration from "../../config-files/constants";

export class GridFileSystemService implements KarryngoFileStorage
{
       
    private configService:ConfigurableApp;
    private gridFS:any=null; 
    constructor(configService:ConfigurableApp)
    {
        this.configService=configService; 

        MongoDBManager.connect(this.configService.getValueOf('persistence')[Configuration.env_mode].database_file).then((data:ActionResult)=>{
            this.gridFS = new GridFSBucket(data.result);
        });
        
 
    }
    put(file:KFile): Promise<ActionResult> {
        let result:ActionResult=new ActionResult();
        return new Promise<ActionResult>((resolve,reject)=>{
            if(this.gridFS == null ) {
                result.resultCode = ActionResult.UNKNOW_ERROR;
                result.message="Cannot connect to bd file";
                return reject(result);
            }
            this.gridFS.openUploadStreamWithId(file._id.toString(),file.name,{
                contentType:file.type,
                metadata:{
                    size:file.size,
                    lastModified:file.lastModified
                }               
            }).end(file.data,file.encoding,()=>{
                return resolve(result);
            });
            
        })
    }
    get(name: String): Promise<ActionResult> {
        let result:ActionResult=new ActionResult();
        return new Promise<ActionResult>((resolve,reject)=>{
            let stream=this.gridFS.openDownloadStreamByName(name.toString())
            stream.addListener('data',(file: any)=>{
               
                result.result=file;
                resolve(result);
            });
            stream.addListener('error',(error: any)=>{
                result.resultCode=ActionResult.UNKNOW_ERROR;
                result.message="Error occur when retreiving file data";
                result.result=error;
                reject(result)
            });
            
        })
    }
    exist(name: string): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    
}