import { ActionResult } from "../utils/ActionResult";
import { KFileOptions } from "./KFileOptions";



export interface KarryngoFileStorage
{
    put(data: Buffer,options:KFileOptions):Promise<ActionResult>;
    get(name:string):Promise<ActionResult>;
    exist(name:string):Promise<ActionResult>;
}