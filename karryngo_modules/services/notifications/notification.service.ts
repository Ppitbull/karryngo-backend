
import Configuration from "../../../config-files/constants";
import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { SerializableEntity } from "../../../karryngo_core/SerializableEntity";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Message } from "../chats/message";

@Service()
export class NotificationService
{
    @DBPersistence()
    private db:PersistenceManager;
    
    send(message:Message):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(Configuration.collections.notification,{"_id":message.to.toString()})
            .then((data:ActionResult)=> this.db.updateInCollection(Configuration.collections.notification,
                {"_id":message.to.toString()},{
                    $push:{ messages : message.toString()}
                }))
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>reject(error));
        })
    }
}