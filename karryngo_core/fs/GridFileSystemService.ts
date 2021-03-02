import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService } from "../decorator/dependecy_injector.decorator";
import { KarryngoEntity } from "../KarryngoEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoFileStorage } from "./KarryngoFileStorage";
import { KFileOptions } from "./KFileOptions";
import { GridFSBucket } from  "mongodb";
import { MongoDBManager } from "../persistence/MongoDBManager";
import { EntityID } from "../utils/EntityID";

export class GridFileSystemService implements KarryngoFileStorage
{
       
    private configService:ConfigurableApp;
    private gridFS:any=null; 
    constructor(configService:ConfigurableApp)
    {
        this.configService=configService;

        let persisConst=this.configService.getValueOf('persistence');
        let connexionString:String=`mongodb://${persisConst.hostname}
        :${persisConst.port}/${persisConst.database_file.database}`;
        MongoDBManager.connect({
            hostname: persisConst.hostname,
            port: persisConst.port,
            database:persisConst.database_file.database
        }).then((data:ActionResult)=>{
            this.gridFS = new GridFSBucket(data.result);
        });
        

    }
    put(data: Buffer, options: KFileOptions): Promise<ActionResult> {
        let result:ActionResult=new ActionResult();
        return new Promise<ActionResult>((resolve,reject)=>{
            if(this.gridFS == null ) {
                result.resultCode = ActionResult.UNKNOW_ERROR;
                result.message="Cannot connect to bd file";
                return reject(result);
            }
            let id:EntityID=new EntityID();
            this.gridFS.openUploadStream(id.toString().toString(),{
                contentType:options.type,
            }).end(data,"base64",()=>{
                result.result=id;
                return resolve(result);
            });
            
        })
    }
    get(name: String): Promise<ActionResult> {
        let result:ActionResult=new ActionResult();
        return new Promise<ActionResult>((resolve,reject)=>{
            let stream=this.gridFS.openDownloadStreamByName(name.toString())
            stream.addListener('data',(file: any)=>{
                console.log(file);
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