import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService } from "../decorator/dependecy_injector.decorator";
import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";

const multer = require('multer'); 
const gfs=require('multer-gridfs-storage');

@ConfigService()
export class KarryngoFileStorage extends KarryngoApplicationEntity
{

    private configService:any={};

    constructor()
    {
        super();
        let persisConst=this.configService.getValueOf('persistence');
        let connexionString:String=`mongodb://${persisConst.hostname}
        :${persisConst.port}/${persisConst.database_file.database}`;

    }
    put()
    {

    }
    get()
    {
        
    }

    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }



}