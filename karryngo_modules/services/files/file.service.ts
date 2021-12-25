import { KFile, KFileLink  } from "../../../karryngo_core/fs/KFile";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { FileSystemException } from "../../../karryngo_core/exception/FileSystemException";
import { KarryngoFileStorage } from "../../../karryngo_core/fs/KarryngoFileStorage";
import { Service, KFileStorage } from "../../../karryngo_core/decorator";


@Service()
export class FileService {

    @KFileStorage()
    private fs:KarryngoFileStorage;
    uploadAll(docs:Record<string| number,any>[]):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let links:KFileLink[]=[];
            console.log("Docs ",docs)
            docs.forEach((file:Record<string| number,any>)=>{
                let f:KFile=new KFile(new EntityID());
                f.hydrate(file);
                links.push({link:`/files/${f._id.toString()}`})
                return f;
            })

            Promise.all(docs.map((f)=>this.uploadOnce(f)) ) //files.map((file:KFile)=> this.fs.put(file))
            .then((result:any)=>{
                let r:ActionResult=new ActionResult();
                r.result=links;
                resolve(r);
            })
            .catch((error:ActionResult)=>reject(error));
        });
    }

    uploadOnce(doc:Record<string| number,any>):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let file:KFile=new KFile(new EntityID());
            file.hydrate(doc);
            let link:KFileLink={link:`/files/${file._id.toString()}`}

            this.fs.put(file)
            .then((result:any)=>{
                let r:ActionResult=new ActionResult();
                r.result=link;
                resolve(r);
            })
            .catch((e:any)=> {
                let error = new ActionResult();
                error.resultCode=FileSystemException.UNABLE_TO_IMPORT_ERROR;
                error.description=error.message;
                error.message=`Unable to import filename ${file.name}`
                reject(error)
            });
        });
    }
}