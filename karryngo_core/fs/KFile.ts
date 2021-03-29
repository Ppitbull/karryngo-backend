import { KarryngoPersistentEntity } from "../persistence/KarryngoPersistentEntity";

export class KFile extends KarryngoPersistentEntity {
  name:string="";
  lastModified:string="";
  size:number=0.0;
  type:string="";
  data:Buffer=Buffer.from([]);
  encoding:String="base64";

  hydrate(entity: Record<string | number,any>):void
  {
      for(const key of Object.keys(entity))
      {
          if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
      }
  }

  toString()
  {
    return {
      ...super.toString(),
      name:this.name,
      lastModified:this.lastModified,
      size:this.size,
      type:this.type,
      data:this.data
    }
  }
}