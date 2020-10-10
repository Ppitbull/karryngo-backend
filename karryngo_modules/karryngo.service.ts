import { KarryngoApplicationEntity } from "../karryngo_core/KarryngoApplicationEntity";
import { KarryngoEntity } from "../karryngo_core/KarryngoEntity";

export abstract class KarryngoService extends KarryngoApplicationEntity
{
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }

}