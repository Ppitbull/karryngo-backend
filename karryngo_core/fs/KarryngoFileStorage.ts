import { ActionResult } from "../utils/ActionResult";
import { KFile } from "./KFile";



export interface KarryngoFileStorage
{
    put(file:KFile):Promise<ActionResult>;
    get(name:string):Promise<ActionResult>;
    exist(name:string):Promise<ActionResult>;
}