import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";

@Service()
@DBPersistence()
export class CrudService
{
    protected db:any ={};

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