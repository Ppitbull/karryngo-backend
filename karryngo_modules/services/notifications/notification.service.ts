
import Configuration from "../../../config-files/constants";
import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { SerializableEntity } from "../../../karryngo_core/SerializableEntity";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Message } from "../chats/message";

@Service()
@DBPersistence()
export class NotificationService
{
    private db:any={};
    
    send(message:Message):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(Configuration.collections.notification,{"_id":message.to.toString()},1)
            .then((data:ActionResult)=>{
                
            })
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>reject(error));
        })
    }
}