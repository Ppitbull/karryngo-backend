import { Service, DBPersistence } from "../../../karryngo_core/decorator";
import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";

@Service()
export class CrudService
{
    @DBPersistence()
    protected db:PersistenceManager;

    add(entity:KarryngoPersistentEntity):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.db.getQueryBuilder(entity).create(entity);
        })
    }
    delete(entity:KarryngoPersistentEntity):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            
        })
    }
    update(entity:KarryngoPersistentEntity):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            
        })
    }
    get(entity:KarryngoPersistentEntity,params:any):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            
        })
    }
}