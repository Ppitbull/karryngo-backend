import { Service, KFileStorage } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { KFile, KFileLink  } from "../../../karryngo_core/fs/KFile";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";


@Service()
@KFileStorage()
export class FileService {
    private fs:any={};
    uploadAll(docs:Record<string| number,any>[]):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let links:KFileLink[]=[];
            let files:KFile[]= docs.map((file:Record<string| number,any>)=>{
                let f:KFile=new KFile(new EntityID());
                f.hydrate(file);
                links.push({link:`/files/${f._id.toString()}`})
                return f;
            })

            Promise.all(files.map((file:KFile)=> this.fs.put(file)))
            .then((result:any)=>{
                let r:ActionResult=new ActionResult();
                r.result=links;
                resolve(r);
            })
            .catch((error:ActionResult)=> reject(error));
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
            .catch((error:ActionResult)=> reject(error));
        });
    }
}