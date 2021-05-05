import { EventEmitter } from "events";
import { KarryngoCore } from "./../decorator/core.decorator"

@KarryngoCore()
export class KarryngoEventEmitter extends EventEmitter
{
    
}